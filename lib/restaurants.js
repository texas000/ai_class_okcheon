// 서버 전용 파일: CSV를 읽고 질문에 관련된 업소를 찾습니다.
// 브라우저에는 전체 CSV 대신 선택한 참고 자료만 전달합니다.
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse/sync";

export const RESTAURANT_FILE = "okcheon_restaurant.csv";
// [수정 7] 한 번에 AI에 전달할 최대 업소 수입니다. 전체 검색 건수는 별도로 제공합니다.
export const RESTAURANT_RESULT_LIMIT = 12;
const COLUMNS = [
  "관리번호",
  "사업장명",
  "업태구분명",
  "도로명주소",
  "영업상태명",
  "데이터갱신시점",
];

// CSV는 쉼표로 나뉜 표입니다. 따옴표 안의 쉼표와 줄바꿈도 라이브러리가 처리합니다.
export function parseRestaurants(csv) {
  const rows = parse(csv, {
    bom: true, // 엑셀에서 저장한 UTF-8 BOM도 읽습니다.
    columns: (columns) => {
      const headers = columns.map((column) => column.trim());
      if (COLUMNS.some((column) => !headers.includes(column))) {
        throw new Error(
          "식당 CSV의 필수 컬럼을 확인하세요: " + COLUMNS.join(", "),
        );
      }
      return headers;
    },
    skip_empty_lines: true,
    trim: true,
    max_record_size: 10_000,
  });
  if (!rows.length) throw new Error("식당 CSV에 데이터가 없습니다.");
  const ids = new Set();
  return rows.map((row, index) => {
    if (COLUMNS.some((column) => !row[column]?.trim())) {
      throw new Error(`식당 CSV ${index + 2}행의 빈 값을 확인하세요.`);
    }
    const id = row["관리번호"].trim();
    if (ids.has(id))
      throw new Error(`식당 CSV의 중복 관리번호를 확인하세요: ${id}`);
    ids.add(id);
    const address = row["도로명주소"].trim();
    const details = Object.fromEntries(
      Object.entries(row)
        .map(([key, value]) => [key, value?.trim()])
        .filter(([, value]) => value),
    );
    return {
      id,
      name: row["사업장명"].trim(),
      type: row["업태구분명"].trim(),
      address,
      status: row["영업상태명"].trim(),
      phone: row["전화번호"]?.trim() || null,
      approvedAt: row["인허가일자"]?.trim() || null,
      closedAt: row["폐업일자"]?.trim() || null,
      siteArea: row["소재지면적"]?.trim() || null,
      facilityArea: row["시설총규모"]?.trim() || null,
      parcelAddress: row["지번주소"]?.trim() || null,
      updatedAt: row["데이터갱신시점"].trim(),
      district: address.match(/옥천군\s+(\S+[읍면])/)?.[1] || "미분류",
      details,
    };
  });
}

let restaurantCache;

// 같은 서버에서 CSV를 매번 파싱하지 않아요. 파일이 바뀌면 다음 요청에서 다시 읽어요.
export async function loadRestaurants(filePath = path.join(process.cwd(), RESTAURANT_FILE)) {
  // process.cwd()는 이 프로젝트의 루트 폴더입니다.
  const info = await stat(filePath, { bigint: true });
  const fingerprint = `${filePath}:${info.ino}:${info.size}:${info.mtimeNs}:${info.ctimeNs}`;
  if (restaurantCache?.fingerprint === fingerprint) return restaurantCache.records;
  const entry = {
    fingerprint,
    records: readFile(filePath, "utf8").then(parseRestaurants),
  };
  restaurantCache = entry;
  try {
    return await entry.records;
  } catch (cause) {
    if (restaurantCache === entry) restaurantCache = undefined;
    throw cause;
  }
}

function countsBy(records, field) {
  const counts = {};
  for (const record of records)
    counts[record[field]] = (counts[record[field]] || 0) + 1;
  return counts;
}

export function getRestaurantSummary(records) {
  const latestUpdate = records
    .map((record) => record.updatedAt)
    .sort()
    .at(-1);
  return {
    filename: RESTAURANT_FILE,
    total: records.length,
    dates: latestUpdate ? [latestUpdate.slice(0, 10)] : [],
    latestUpdate,
    byType: countsBy(records, "type"),
    byStatus: countsBy(records, "status"),
    byDistrict: countsBy(records, "district"),
  };
}

// 띄어쓰기와 대소문자가 달라도 업소명을 찾을 수 있게 만듭니다.
function compact(text) {
  return text
    .normalize("NFC")
    .toLowerCase()
    .replace(/[^가-힣a-z0-9]/g, "");
}

const GENERAL_NAMES = new Set(["옥천", "식당", "카페", "커피", "치킨"]);
const RESTAURANT_INTENT =
  /옥천|식당|음식점|맛집|업소|카페|커피|빵집|제과점|베이커리|치킨|통닭|okcheon_restaurant/i;
const STOP_WORDS = new Set(
  "식당 식당들 음식점 업소 업소들 맛집 목록 종류 어떤 어디 어디야 어디에 있는 있어 있나 있나요 있니 있습니까 추천 추천해줘 알려줘 알려주세요 보여줘 소개해줘 찾아줘 해줘 주세요 부탁해 부탁드려요 좀 좋은 괜찮은 맛있는 유명한 가볼만한 총 전체 모두 몇 몇개 몇곳 얼마나 개수 수 곳 개 데이터 csv 파일 기준 기준일 주소 위치 도로명 도로명주소 영업시간 시간 메뉴 가격 전화 전화번호 있으면 찾고 싶어 나는 우리 동네 지역 근처 주변 충청북도 옥천 옥천군 그 그곳 거기 그중 여기 이곳 그러면 그럼 또 다른 더 가게 가게들 등록된 등록 등록되어 등록되어있는 등록돼 확인 설명 대답 대답해줘 간단히 간단하게 짧게 자세히 자세하게 한 두 세 문장 문장씩 정확한 정확하게 실제 정도 만 군데 가지 참고 참고해서 참고해 기반 자료 사용 이용 이름 간판 글자 들어간 들어있는 포함 포함된 있는지 있을까 몇개야 몇곳이야 개야 뭐 뭐야 무엇 그곳의 거기의 그중에서 정리 정리해줘 추천해주세요 알려주세요 가르쳐줘 알려줄래 정리해줄래".split(
    " ",
  ),
);

// 카페는 별도 CSV 컬럼이 없으므로 업소명에 이 글자가 있는 후보만 검색합니다.
const NAME_GROUPS = [
  {
    query: /카페|커피|coffee|cafe/i,
    terms: ["카페", "커피", "coffee", "cafe"],
  },
  { query: /치킨|통닭/, terms: ["치킨", "통닭"] },
];

// "가장 오래된"은 추측이 아니라 인허가일자 ASC 정렬 요청으로 해석해요.
function wantsOldest(query) {
  return /가장오래|제일오래|오래된(?:식당|음식점|업소|가게|곳|순)|인허가일자(?:asc|오름차순)|인허가(?:일자|날짜)?(?:가장|제일)?(?:빠른|이른)|가장먼저(?:생긴|개업|허가)/.test(compact(query));
}

function validApprovalDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || value.startsWith("0000")) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function queryProfile(records, query) {
  const normalized = compact(query);
  const oldest = wantsOldest(query);
  const districts = [
    ...new Set(records.map((record) => record.district)),
  ].filter(
    (district) =>
      district !== "미분류" && normalized.includes(compact(district)),
  );
  const names = records.filter((record) => {
    const name = compact(record.name);
    return (
      name.length >= 2 && !GENERAL_NAMES.has(name) && normalized.includes(name)
    );
  });
  let remaining = query.toLowerCase();
  for (const district of districts)
    remaining = remaining.replaceAll(district, " ");
  remaining = remaining.replace(
    /(?:충청북도|옥천군|옥천)(?:에는|에서|에|의|은|는)?/g,
    " ",
  );
  const groups = NAME_GROUPS.filter((group) => group.query.test(query));
  const type = [...new Set(records.map((record) => record.type))].find(
    (value) => compact(value).length >= 2 && normalized.includes(compact(value)),
  );
  const status = /폐업|문.?닫/.test(query)
    ? "폐업"
    : /영업.?중|영업.?정상|현재.?영업/.test(query)
      ? "영업/정상"
      : null;
  remaining = remaining.replace(
    /(?:(?:현재\s*)?영업\s*(?:중|정상)(?:인)?|현재\s*영업|폐업|문\s*닫(?:은|은곳|은 곳)?)/g,
    " ",
  );
  const categoryTerms = new Set([
    "카페",
    "커피",
    "coffee",
    "cafe",
    "치킨",
    "통닭",
    "제과점",
    "빵집",
    "베이커리",
    "일반음식점",
    "영업",
    "영업중",
    "현재",
    "지금",
    "정상",
    "폐업",
    ...new Set(records.map((record) => record.type)),
  ]);
  if (oldest) {
    remaining = remaining.replace(/(?:가장|제일)?\s*오래된\s*(?=식당|음식점|업소|가게|곳|순)/g, " ");
    // 정렬 지시를 가게 이름·주소의 검색어로 취급하지 않아요.
    for (const word of ["가장", "제일", "가장오래된", "제일오래된", "오래된", "오래된순", "순", "순서", "오름차순", "먼저", "생긴", "개업", "개업한", "인허가", "허가", "허가일자", "인허가일자", "날짜", "일찍", "이른", "빠른", "order", "by", "asc"]) categoryTerms.add(word);
  }
  const terms = remaining
    .split(/[\s,?!。.!·:;()[\]"']+/)
    .map((term) =>
      term
        .replace(/(?:인가요|일까요|이에요|예요|야|요)$/, "")
        .replace(
          /(?:으로|에서|에는|에있는|의|을|를|은|는|이|가|에|도|과|와|나)$/,
          "",
        ),
    )
    .filter(
      (term) =>
        term.length >= 2 &&
        !STOP_WORDS.has(term) &&
        !categoryTerms.has(term) &&
        !/^\d+(?:곳|개|군데|가지)?(?:만|씩)?$/.test(term) &&
        !/^(?:알려|추천|보여|소개|찾아|검색|확인|설명|정리|대답)/.test(term),
    );
  return { query, districts, names, groups, type, status, terms, oldest };
}

// 수업용 키워드 검색입니다. 의미 검색(임베딩)이나 인터넷 검색을 사용하지 않습니다.
export function searchRestaurants(
  records,
  messages,
  limit = RESTAURANT_RESULT_LIMIT,
) {
  const questions = messages
    .filter((message) => message.role === "user")
    .map((message) => message.content);
  const question = questions.at(-1) || "";
  let profile = queryProfile(records, question);
  const followup =
    /그|거기|여기|그러면|그럼|또|더|주소|위치|영업시간|메뉴|가격|전화/.test(
      question,
    );
  // '그곳 주소는?' 같은 후속 질문은 이전 사용자의 식당 질문을 함께 검색합니다.
  if (
    followup &&
    !profile.names.length &&
    !profile.districts.length &&
    !profile.groups.length &&
    !profile.type &&
    !profile.status &&
    !profile.terms.length &&
    (!profile.oldest || /그중|그곳|거기|그럼|그러면/.test(question))
  ) {
    const previous = questions
      .slice(0, -1)
      .reverse()
      .find((query) => {
        const earlier = queryProfile(records, query);
        return (
          RESTAURANT_INTENT.test(query) ||
          earlier.names.length ||
          earlier.districts.length
        );
      });
    if (previous) profile = queryProfile(records, previous + " " + question);
  }
  const relevant =
    profile.oldest ||
    RESTAURANT_INTENT.test(profile.query) ||
    profile.names.length > 0 ||
    profile.districts.length > 0 ||
    (/csv|데이터|파일/i.test(profile.query) &&
      /기준일|건수|등록|업소|몇|총/.test(profile.query));
  if (!relevant) return null;

  // 지역, 업종, 정확한 업소명, 키워드를 함께 적용합니다.
  const matches = records.filter((record) => {
    if (
      profile.districts.length &&
      !profile.districts.includes(record.district)
    )
      return false;
    if (profile.type && profile.type !== record.type) return false;
    if (profile.status && profile.status !== record.status) return false;
    if (profile.names.length)
      return profile.names.some(
        (name) => compact(name.name) === compact(record.name),
      );
    if (
      profile.groups.some(
        (group) =>
          !group.terms.some((term) =>
            compact(record.name).includes(compact(term)),
          ),
      )
    )
      return false;
    if (profile.terms.length) {
      const searchable = compact(record.name + " " + record.address);
      return profile.terms.every((term) => searchable.includes(compact(term)));
    }
    return true;
  });
  // SQL의 WHERE → ORDER BY 인허가일자 ASC → LIMIT 순서와 같아요.
  // 날짜 없는 행과 실제 달력에 존재하지 않는 날짜는 순위에서 제외합니다.
  // matches는 새 배열이므로 원본 CSV와 캐시의 순서를 바꾸지 않아요.
  const ordered = profile.oldest
    ? matches.filter((record) => validApprovalDate(record.approvedAt)).sort(
      (a, b) => a.approvedAt.localeCompare(b.approvedAt) || a.id.localeCompare(b.id),
    )
    : matches;
  const orderBy = profile.oldest ? {
    field: "인허가일자",
    direction: "asc",
    validDateCount: ordered.length,
    excludedDateCount: matches.length - ordered.length,
    earliestDate: ordered[0]?.approvedAt || null,
    earliestDateTies: ordered.filter((record) => record.approvedAt === ordered[0]?.approvedAt).length,
  } : undefined;
  return {
    sources: ordered.slice(0, limit),
    info: {
      ...getRestaurantSummary(records),
      query: profile.query,
      matched: matches.length,
      shown: Math.min(ordered.length, limit),
      orderBy,
      matchedByType: countsBy(matches, "type"),
      matchedByStatus: countsBy(matches, "status"),
      districts: profile.districts,
      nameSearch: profile.groups.flatMap((group) => group.terms),
    },
  };
}

export function restaurantContext(result) {
  if (!result) return "";
  // 주소·목록 질문에는 안내에 필요한 필드만 보냅니다. 상세 질문은 원본 필드를 유지해요.
  // 화면의 참고 자료에는 항상 검색한 행의 전체 원본이 남습니다.
  const basicFields = new Set([
    "사업장명", "업태구분명", "도로명주소", "영업상태명", "전화번호", "데이터갱신시점",
  ]);
  // 순위 답변은 압축된 자료에도 정렬 근거 날짜를 반드시 포함해요.
  if (result.info.orderBy) basicFields.add("인허가일자");
  const query = result.info.query;
  const detailed = /인허가|허가|폐업일|폐업.{0,2}날|면적|크기|규모|우편|급수|종사|직원|좌표|홈페이지|최종.{0,2}수정|상세|자세|모든|원본|컬럼|필드|항목|정보|소개|대해/.test(query)
    || !/주소|어디|위치|전화|연락|목록|식당|음식점|업소|카페|커피|맛집|몇|건수|개수|기준일|갱신/.test(query)
    || result.sources.some(({ details }) => Object.keys(details).some(
      (field) => !basicFields.has(field) && query.includes(field),
    ));
  // 참고 자료는 명령이 아닌 JSON 데이터입니다. 원문 CSV에는 없는 사실을 추가하지 않습니다.
  return `\n\n[옥천 식당 CSV 참고 자료]\n${JSON.stringify({
    파일: result.info.filename,
    전체업소수: result.info.total,
    최신데이터갱신시점: result.info.latestUpdate,
    전체업태별수: result.info.byType,
    전체영업상태별수: result.info.byStatus,
    전체지역별수: result.info.byDistrict,
    검색질문: result.info.query,
    검색조건에맞는업소수: result.info.matched,
    검색결과업종별수: result.info.matchedByType,
    검색결과영업상태별수: result.info.matchedByStatus,
    AI에전달한업소수: result.info.shown,
    업소명으로검색한글자: result.info.nameSearch,
    정렬: result.info.orderBy,
    자료범위: detailed ? "값이 있는 전체 원본 필드" : `기본 안내 필드 (사업장명·업태·도로명주소·영업상태·전화번호·갱신시점${result.info.orderBy ? "·인허가일자" : ""})`,
    업소: result.sources.map(({ details }) => ({
      원본CSV필드: detailed ? details : Object.fromEntries(
        Object.entries(details).filter(([field]) => basicFields.has(field)),
      ),
    })),
  })}\n[참고 자료 끝]\n이 자료만으로 식당 정보를 답하세요. 검색 결과가 0이면 조건에 맞는 업소를 찾지 못했다고 말하세요. 결과가 전체 목록인지 일부 예시인지 구분하세요. 카페·치킨 검색은 간판 이름의 글자 검색이며 메뉴나 전문 업종을 검증한 결과가 아닙니다.`;
}
