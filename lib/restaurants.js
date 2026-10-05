// 서버 전용 파일: CSV를 읽고 질문에 관련된 업소를 찾습니다.
// 브라우저에는 전체 CSV 대신 선택한 참고 자료만 전달합니다.
import { readFile } from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse/sync";

export const RESTAURANT_FILE = "okcheon_restaurant.csv";
// [수정 7] 한 번에 AI에 전달할 최대 업소 수입니다. 전체 검색 건수는 별도로 제공합니다.
export const RESTAURANT_RESULT_LIMIT = 12;
const COLUMNS = ["연번", "업종명", "업소명", "소재지(도로명)", "데이터기준일"];

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
    const id = row["연번"].trim();
    if (ids.has(id))
      throw new Error(`식당 CSV의 중복 연번을 확인하세요: ${id}`);
    ids.add(id);
    const address = row["소재지(도로명)"].trim();
    return {
      id,
      name: row["업소명"].trim(),
      type: row["업종명"].trim(),
      address,
      date: row["데이터기준일"].trim(),
      district: address.match(/옥천군\s+(\S+[읍면])/)?.[1] || "미분류",
    };
  });
}

export async function loadRestaurants() {
  // process.cwd()는 이 프로젝트의 루트 폴더입니다.
  const csv = await readFile(path.join(process.cwd(), RESTAURANT_FILE), "utf8");
  return parseRestaurants(csv);
}

function countsBy(records, field) {
  const counts = {};
  for (const record of records)
    counts[record[field]] = (counts[record[field]] || 0) + 1;
  return counts;
}

export function getRestaurantSummary(records) {
  return {
    filename: RESTAURANT_FILE,
    total: records.length,
    dates: [...new Set(records.map((record) => record.date))].sort(),
    byType: countsBy(records, "type"),
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

function queryProfile(records, query) {
  const normalized = compact(query);
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
  const type = /제과점|빵집|베이커리/.test(query)
    ? "제과점영업"
    : /휴게음식점/.test(query)
      ? "휴게음식점"
      : /일반음식점/.test(query)
        ? "일반음식점"
        : null;
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
    "제과점영업",
    "휴게음식점",
    "일반음식점",
  ]);
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
  return { query, districts, names, groups, type, terms };
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
    !profile.terms.length
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
  return {
    sources: matches.slice(0, limit),
    info: {
      ...getRestaurantSummary(records),
      query: profile.query,
      matched: matches.length,
      shown: Math.min(matches.length, limit),
      matchedByType: countsBy(matches, "type"),
      districts: profile.districts,
      nameSearch: profile.groups.flatMap((group) => group.terms),
    },
  };
}

export function restaurantContext(result) {
  if (!result) return "";
  // 참고 자료는 명령이 아닌 JSON 데이터입니다. 원문 CSV에는 없는 사실을 추가하지 않습니다.
  return `\n\n[옥천 식당 CSV 참고 자료]\n${JSON.stringify({
    파일: result.info.filename,
    전체업소수: result.info.total,
    기준일: result.info.dates,
    전체업종별수: result.info.byType,
    전체지역별수: result.info.byDistrict,
    검색질문: result.info.query,
    검색조건에맞는업소수: result.info.matched,
    검색결과업종별수: result.info.matchedByType,
    AI에전달한업소수: result.info.shown,
    업소명으로검색한글자: result.info.nameSearch,
    업소: result.sources,
  })}\n[참고 자료 끝]\n이 자료만으로 식당 정보를 답하세요. 검색 결과가 0이면 조건에 맞는 업소를 찾지 못했다고 말하세요. 결과가 전체 목록인지 일부 예시인지 구분하세요. 카페·치킨 검색은 간판 이름의 글자 검색이며 메뉴나 전문 업종을 검증한 결과가 아닙니다.`;
}
