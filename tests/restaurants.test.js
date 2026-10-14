import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  getRestaurantSummary,
  loadRestaurants,
  parseRestaurants,
  restaurantContext,
  searchRestaurants,
  sampleRestaurants,
  facilityAreaNumber,
} from "../lib/restaurants.js";
import { RECOMMENDATION_PROMPTS, restaurantTypeLabel } from "../lib/chat-config.js";

test("CSV는 BOM, 따옴표 안의 쉼표와 줄바꿈을 보존", () => {
  const rows = parseRestaurants(
    '\ufeff관리번호,사업장명,업태구분명,도로명주소,영업상태명,데이터갱신시점\r\n1,"테스트,식당",한식,"충청북도 옥천군 옥천읍 테스트로 1,\n2층",영업/정상,2026-10-09 12:00:00\r\n',
  );
  assert.equal(rows[0].name, "테스트,식당");
  assert.equal(rows[0].address, "충청북도 옥천군 옥천읍 테스트로 1,\n2층");
  assert.equal(rows[0].district, "옥천읍");
});

test("필수 컬럼, 빈 데이터·값과 중복 관리번호를 검증", () => {
  assert.throws(() => parseRestaurants("이름,주소\n식당,옥천"), /필수 컬럼/);
  assert.throws(
    () => parseRestaurants("관리번호,사업장명,업태구분명,도로명주소,영업상태명,데이터갱신시점\n"),
    /데이터가 없습니다/,
  );
  assert.throws(
    () =>
      parseRestaurants(
        "관리번호,사업장명,업태구분명,도로명주소,영업상태명,데이터갱신시점\n1,,한식,옥천,영업/정상,2026-10-09",
      ),
    /빈 값/,
  );
  assert.throws(
    () =>
      parseRestaurants(
        "관리번호,사업장명,업태구분명,도로명주소,영업상태명,데이터갱신시점\n1,A,한식,옥천,영업/정상,2026-10-09\n1,B,한식,옥천,영업/정상,2026-10-09",
      ),
    /중복 관리번호/,
  );
});

test("CSV 캐시는 같은 파일을 재사용하고 수정·파싱 실패 후에는 새 데이터를 읽음", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "ai-class-csv-"));
  const filename = path.join(directory, "restaurants.csv");
  const header = "관리번호,사업장명,업태구분명,도로명주소,영업상태명,데이터갱신시점\n";
  try {
    await writeFile(filename, header + "1,처음식당,한식,옥천군 옥천읍,영업/정상,2026-10-14\n");
    const [first, concurrent] = await Promise.all([loadRestaurants(filename), loadRestaurants(filename)]);
    assert.strictEqual(first, concurrent);
    assert.strictEqual(await loadRestaurants(filename), first);
    await writeFile(filename, header + "1,수정한식당,한식,옥천군 옥천읍,영업/정상,2026-10-14\n");
    const updated = await loadRestaurants(filename);
    assert.notStrictEqual(updated, first);
    assert.equal(updated[0].name, "수정한식당");
    await writeFile(filename, "잘못된,컬럼\n");
    await assert.rejects(loadRestaurants(filename), /필수 컬럼/);
    await writeFile(filename, header + "1,복구식당,한식,옥천군 옥천읍,영업/정상,2026-10-14\n");
    assert.equal((await loadRestaurants(filename))[0].name, "복구식당");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

const records = await loadRestaurants();
const ask = (query) =>
  searchRestaurants(records, [{ role: "user", content: query }]);

test("가장 큰 식당은 전체 CSV 시설총규모를 숫자 DESC로 비교하고 m² 단위 전달", () => {
  for (const query of ["가장 큰 식당 알려줘.", "제일 넓은 식당은?", "가장큰식당 알려줘.", "규모가 가장 큰 식당 알려줘.", "시설총규모 내림차순으로 식당 알려줘.", "order by 시설총규모 desc"]) {
    const result = ask(query);
    assert.equal(result.info.matched, records.length, query);
    assert.equal(result.sources[0].name, "(주)그린에셀", query);
    assert.equal(result.sources[0].facilityArea, "1328.5");
    assert.equal(result.sources[0].status, "폐업");
    assert.equal(result.info.orderBy.field, "시설총규모");
    assert.equal(result.info.orderBy.direction, "desc");
    assert.equal(result.info.orderBy.unit, "m²");
    assert.equal(result.info.orderBy.largestArea, 1328.5);
    assert.ok(result.sources.every((row, index, rows) => !index || facilityAreaNumber(rows[index - 1].facilityArea) >= facilityAreaNumber(row.facilityArea)));
    assert.match(restaurantContext(result), /"시설총규모":"1328.5"/);
  }
  assert.equal(ask("풍미당 시설총규모 알려줘.").info.orderBy, undefined);
});

test("시설총규모 순위는 지역·영업 조건을 적용하고 날짜 순위와 후속 전환", () => {
  const open = ask("영업 중인 가장 큰 식당 알려줘.");
  assert.equal(open.sources[0].name, "명가 하우스웨딩(웨딩홀)");
  assert.equal(open.sources[0].facilityArea, "926.64");
  assert.ok(open.sources.every((row) => row.status === "영업/정상"));
  const local = ask("청산면에서 가장 큰 식당 알려줘.");
  assert.ok(local.sources.length);
  assert.ok(local.sources.every((row) => row.district === "청산면"));
  for (const [previous, current, field, direction] of [
    ["청산면에서 가장 오래된 식당 알려줘.", "그중 가장 큰 식당은?", "시설총규모", "desc"],
    ["청산면에서 가장 큰 식당 알려줘.", "그중 가장 오래된 식당은?", "인허가일자", "asc"],
    ["청산면에서 가장 큰 식당 알려줘.", "그중 가장 최근에 생긴 식당은?", "인허가일자", "desc"],
  ]) {
    const result = searchRestaurants(records, [{ role: "user", content: previous }, { role: "assistant", content: "청산면 검색 결과" }, { role: "user", content: current }]);
    assert.equal(result.info.orderBy.field, field);
    assert.equal(result.info.orderBy.direction, direction);
    assert.ok(result.sources.length);
    assert.ok(result.sources.every((row) => row.district === "청산면"));
  }
});

test("면적 숫자 비교는 제한 전에 수행하며 결측·오류·0·소수·동률 처리", () => {
  for (const value of [null, undefined, "", " ", "-1", "NaN", "Infinity", "1,2", "12m²"]) assert.equal(facilityAreaNumber(value), null);
  assert.equal(facilityAreaNumber("1,328.50"), 1328.5);
  assert.equal(facilityAreaNumber("0"), 0);
  const areas = [...Array(13).fill("99"), "1000.5", "1000.50", "", "oops", "-3", "0"];
  const fixture = parseRestaurants("관리번호,사업장명,업태구분명,도로명주소,영업상태명,데이터갱신시점,시설총규모,소재지면적\n" + areas.map((area, index) => `${index},테스트${index},한식,옥천군 옥천읍,영업/정상,2026-10-14,${area},9999`).join("\n"));
  const result = searchRestaurants(fixture, [{ role: "user", content: "가장 큰 식당 알려줘." }], 1);
  assert.equal(result.sources[0].facilityArea, "1000.5");
  assert.equal(result.sources.length, 1);
  assert.equal(result.info.orderBy.largestAreaTies, 2);
  assert.equal(result.info.orderBy.excludedAreaCount, 3);
  assert.equal(result.info.orderBy.validAreaCount, 16);
  assert.equal(fixture[0].facilityArea, "99");
  const empty = searchRestaurants(fixture.filter((row) => facilityAreaNumber(row.facilityArea) === null), [{ role: "user", content: "가장 큰 식당 알려줘." }]);
  assert.equal(empty.sources.length, 0);
  assert.equal(empty.info.orderBy.largestArea, null);
  assert.equal(empty.info.orderBy.validAreaCount, 0);
});

test("추천 버튼은 업종별 전체 영업 중 후보에서 중복 없이 3곳 선택", () => {
  const predicates = [
    (row) => row.type.includes("식육"),
    (row) => row.type === "호프/통닭" || /치킨|통닭/.test(row.name),
    (row) => row.type === "한식",
    (row) => row.type === "분식",
    (row) => row.type === "중국식",
  ];
  for (const [index, button] of RECOMMENDATION_PROMPTS.entries()) {
    const result = ask(button.prompt);
    const eligible = records.filter((row) => row.status === "영업/정상" && predicates[index](row));
    assert.equal(result.info.matched, eligible.length);
    assert.equal(result.sources.length, Math.min(3, eligible.length));
    assert.equal(new Set(result.sources.map((row) => row.id)).size, result.sources.length);
    assert.ok(result.sources.every((row) => eligible.includes(row)));
    assert.equal(result.info.selection.method, "random");
    assert.equal(result.info.shown, result.sources.length);
    assert.ok(!button.title.includes("식육"));
  }
  assert.equal(restaurantTypeLabel("식육(숯불구이)"), "고깃집(숯불구이)");
});

test("추첨은 제한 이전의 전체 후보를 사용하며 원본과 빈 후보를 안전하게 처리", () => {
  const fixture = Array.from({ length: 30 }, (_, id) => ({ id }));
  const before = [...fixture];
  assert.deepEqual(sampleRestaurants(fixture, 3, (length) => length - 1).map((row) => row.id), [29, 28, 27]);
  assert.deepEqual(fixture, before);
  assert.deepEqual(sampleRestaurants([], 3), []);
  assert.equal(sampleRestaurants(fixture.slice(0, 2), 3).length, 2);
  const result = ask("안남면 영업 중인 한식 식당 랜덤으로 3곳 추천해줘.");
  assert.ok(result.sources.length > 0);
  assert.ok(result.sources.every((row) => row.district === "안남면" && row.type === "한식" && row.status === "영업/정상"));
});

test("무작위 추천의 주소 후속 질문은 직전 답변의 업소를 다시 추첨하지 않음", () => {
  const selected = ask(RECOMMENDATION_PROMPTS[0].prompt).sources;
  const result = searchRestaurants(records, [
    { role: "user", content: RECOMMENDATION_PROMPTS[0].prompt },
    { role: "assistant", content: selected.map((row) => row.name).join(" / ") },
    { role: "user", content: "그곳 주소는?" },
  ]);
  assert.equal(result.info.selection, undefined);
  assert.deepEqual(new Set(result.sources.map((row) => row.name)), new Set(selected.map((row) => row.name)));
});

test("실제 CSV의 업종별·지역별 집계 합계가 전체와 일치", () => {
  const summary = getRestaurantSummary(records);
  assert.equal(summary.total, 1493);
  assert.equal(summary.byType["한식"], 823);
  assert.equal(summary.byType["호프/통닭"], 137);
  assert.deepEqual(summary.byStatus, { "영업/정상": 803, 폐업: 690 });
  assert.deepEqual(summary.dates, ["2026-10-09"]);
  assert.ok(records.every((row) => row.address.includes("옥천군")));
  assert.equal(
    Object.values(summary.byDistrict).reduce((sum, count) => sum + count, 0),
    summary.total,
  );
});

test("전체 질문에는 일부 행과 정확한 전체 건수를 구분해서 제공", () => {
  const result = ask("옥천에 어떤 식당이 있는지 CSV를 참고해서 5곳 알려줘.");
  assert.equal(result.info.matched, records.length);
  assert.equal(result.sources.length, 12);
  assert.equal(result.info.shown, 12);
});

test("지역과 자연스러운 한국어 조사로 검색", () => {
  for (const query of [
    "청산면에 등록된 업소는 몇 개야?",
    "청산면에 어떤 식당이 있는지 3곳과 주소를 알려줘.",
  ]) {
    const result = ask(query);
    assert.equal(result.info.matched, 85);
    assert.ok(result.sources.every((row) => row.district === "청산면"));
  }
  assert.equal(
    ask("옥천읍에 어떤 식당이 있는지 5곳 알려줘.").info.matched,
    987,
  );
});

test("새로 합친 일반음식점을 이름과 주소로 검색", () => {
  const result = ask("옥이네 밥집 주소 알려줘.");
  const added = result.sources.find((row) => row.name === "옥이네 밥집");
  assert.ok(added);
  assert.equal(added.type, "한식");
  assert.equal(added.status, "영업/정상");
  assert.equal(
    added.address,
    "충청북도 옥천군 군북면 비야대정로 236",
  );
});

test("정확한 업소명, 주소 키워드, 존재하지 않는 이름을 검색", () => {
  const result = ask("풍미당의 주소 알려줘.");
  assert.equal(result.info.matched, 1);
  assert.equal(result.sources[0].address, "충청북도 옥천군 옥천읍 중앙로 23-1");
  const street = ask("옥천읍 중앙로에 있는 식당 알려줘.");
  assert.ok(street.info.matched > 0);
  assert.ok(street.sources.every((row) => row.address.includes("중앙로")));
  assert.equal(ask("옥천 우주정거장식당 주소 알려줘.").info.matched, 0);
});

test("카페 이름 검색과 업태·영업 상태 검색을 구분", () => {
  const cafes = ask("옥천읍에 이름에 카페나 커피가 들어간 업소 3곳 알려줘.");
  assert.ok(cafes.info.matched > 0);
  assert.ok(
    cafes.sources.every(
      (row) =>
        row.district === "옥천읍" && /카페|커피|coffee|cafe/i.test(row.name),
    ),
  );
  const korean = ask("옥천읍에 한식 영업 중 식당 알려줘.");
  assert.equal(korean.info.matched, 263);
  assert.ok(
    korean.sources.every(
      (row) => row.type === "한식" && row.status === "영업/정상",
    ),
  );
});

test("후속 주소 질문은 이전 식당을 검색하고 새 지역은 이전 조건을 덮어씀", () => {
  const history = [
    { role: "user", content: "풍미당에 대해 알려줘." },
    { role: "assistant", content: "풍미당을 소개합니다." },
  ];
  const followup = searchRestaurants(records, [
    ...history,
    { role: "user", content: "그곳 주소는?" },
  ]);
  assert.equal(followup.sources[0].name, "풍미당");
  const newArea = searchRestaurants(records, [
    ...history,
    { role: "user", content: "청산면 식당 알려줘." },
  ]);
  assert.equal(newArea.info.matched, 85);
});

test("일반 코딩·CSV 개념 질문에는 식당 참고 자료를 추가하지 않음", () => {
  assert.equal(ask("코딩을 처음 배우려고 해."), null);
  assert.equal(
    ask(
      "CSV가 무엇인지, AI에게 파일의 내용을 알려줘야 하는 이유를 초보자도 이해하기 쉽게 설명해줘.",
    ),
    null,
  );
  assert.equal(restaurantContext(null), "");
});

test("참고 프롬프트에 원본 필드와 집계를 넣고 없는 메뉴·영업시간은 만들지 않음", () => {
  const result = ask("풍미당 인허가일자와 면적, 영업시간을 알려줘.");
  const context = restaurantContext(result);
  assert.match(context, /okcheon_restaurant.csv/);
  assert.match(context, /중앙로 23-1/);
  assert.match(context, /AI에전달한업소수/);
  assert.match(context, /영업\/정상/);
  assert.match(context, /0437321827/);
  assert.equal(result.sources[0].approvedAt, "1978-12-02");
  assert.equal(result.sources[0].siteArea, "12.50");
  assert.equal(result.sources[0].facilityArea, "12.5");
  assert.equal(
    result.sources[0].details["지번주소"],
    "충청북도 옥천군 옥천읍 금구리 146",
  );
  assert.match(context, /"인허가일자":"1978-12-02"/);
  assert.match(context, /"소재지면적":"12.50"/);
  assert.match(context, /"시설총규모":"12.5"/);
  assert.match(context, /"좌표정보\(X\)":"250921.256390189"/);
  assert.equal(result.sources[0].menu, undefined);
  assert.equal(result.sources[0].hours, undefined);
});

test("목록·주소 질문은 기본 필드로 압축하고 화면의 전체 원본과 집계는 보존", () => {
  const result = ask("옥천읍에 어떤 식당이 있는지 5곳 알려줘.");
  const text = restaurantContext(result);
  const context = JSON.parse(text.split("[옥천 식당 CSV 참고 자료]\n")[1].split("\n[참고 자료 끝]")[0]);
  assert.equal(context.검색조건에맞는업소수, result.info.matched);
  assert.equal(context.AI에전달한업소수, result.sources.length);
  assert.equal(context.업소.length, result.sources.length);
  for (const [index, row] of context.업소.entries()) {
    assert.equal(row.원본CSV필드.사업장명, result.sources[index].name);
    assert.equal(row.원본CSV필드.도로명주소, result.sources[index].address);
    assert.equal(row.원본CSV필드.영업상태명, result.sources[index].status);
    assert.equal(row.원본CSV필드.데이터갱신시점, result.sources[index].updatedAt);
    assert.equal(row.원본CSV필드["좌표정보(X)"], undefined);
    assert.equal(row.address, undefined); // 같은 값의 별칭을 중복으로 보내지 않아요.
  }
  assert.ok(result.sources.some((row) => row.details["인허가일자"]));
});

test("상세 필드·일반 소개·후속 상세 질문에는 전체 원본 정보를 유지", () => {
  for (const question of ["풍미당 인허가일자와 면적 알려줘.", "풍미당 좌표 알려줘.", "풍미당에 대해 알려줘.", "풍미당 최종수정시점 알려줘."]) {
    assert.match(restaurantContext(ask(question)), /"좌표정보\(X\)":"250921.256390189"/);
  }
  const result = searchRestaurants(records, [
    { role: "user", content: "풍미당에 대해 알려줘." },
    { role: "assistant", content: "풍미당입니다." },
    { role: "user", content: "그곳 주소는?" },
  ]);
  assert.match(restaurantContext(result), /"인허가일자":"1978-12-02"/);
});

test("가장 오래된 질문은 CSV 전체를 인허가일자 ASC로 정렬하고 폐업 기록도 포함", () => {
  const before = records.map((record) => record.id);
  for (const query of [
    "가장 오래된 식당 알려줘.",
    "가장오래된식당 알려줘.",
    "제일 오래된식당은?",
    "옥천에서 제일 오래된 식당은?",
    "오래된 순으로 식당 3곳 알려줘.",
    "인허가일자 오름차순으로 식당 알려줘.",
    "order by 인허가일자 asc",
  ]) {
    const result = ask(query);
    assert.equal(result.info.matched, 1493);
    assert.equal(result.sources[0].name, "송정집");
    assert.equal(result.sources[0].approvedAt, "1977-03-28");
    assert.equal(result.sources[0].status, "폐업");
    assert.equal(result.info.orderBy.direction, "asc");
    assert.equal(result.info.orderBy.validDateCount, 1493);
    assert.equal(result.info.orderBy.earliestDate, "1977-03-28");
    assert.match(restaurantContext(result), /"인허가일자":"1977-03-28"/);
    assert.match(restaurantContext(result), /"정렬":\{"field":"인허가일자","direction":"asc"/);
    assert.ok(result.sources.every((row, index, rows) => index === 0 || rows[index - 1].approvedAt <= row.approvedAt));
  }
  assert.deepEqual(records.map((record) => record.id), before);
});

test("지역·영업 조건을 적용한 뒤 가장 오래된 업소를 찾음", () => {
  const open = ask("현재 영업 중인 가장 오래된 식당 알려줘.");
  assert.equal(open.sources[0].name, "중앙식당");
  assert.equal(open.sources[0].approvedAt, "1977-06-20");
  assert.ok(open.sources.every((row) => row.status === "영업/정상"));
  const local = ask("옥천읍에서 가장 오래된 식당 알려줘.");
  assert.equal(local.sources[0].name, "풍미당");
  assert.ok(local.sources.every((row) => row.district === "옥천읍"));
  const history = [{ role: "user", content: "청산면 식당 알려줘." }, { role: "assistant", content: "청산면의 목록입니다." }];
  const followup = searchRestaurants(records, [...history, { role: "user", content: "그중 가장 오래된 식당은?" }]);
  assert.equal(followup.sources[0].name, "선광집");
  assert.ok(followup.sources.every((row) => row.district === "청산면"));
  // 새 전체 순위 질문은 앞서 물었던 지역·업소로 범위를 좁히지 않아요.
  const reset = searchRestaurants(records, [...history, { role: "user", content: "가장 오래된 식당 주소 알려줘." }]);
  assert.equal(reset.sources[0].name, "송정집");
});

test("인허가 날짜 정렬은 결과 개수 제한 전에 수행", () => {
  const fixture = parseRestaurants(
    "관리번호,사업장명,업태구분명,도로명주소,영업상태명,데이터갱신시점,인허가일자\n" +
    Array.from({ length: 16 }, (_, index) => `${index},테스트${index},한식,옥천군 옥천읍,영업/정상,2026-10-14,${index === 15 ? "1950-01-01" : "2000-01-01"}`).join("\n"),
  );
  const result = searchRestaurants(fixture, [{ role: "user", content: "가장 오래된 식당 알려줘." }], 1);
  assert.equal(result.sources.length, 1);
  assert.equal(result.sources[0].name, "테스트15");
  assert.equal(result.info.orderBy.validDateCount, 16);
});

test("날짜 누락·오류를 제외하고 동일한 가장 이른 날짜의 업소를 함께 식별", () => {
  const header = "관리번호,사업장명,업태구분명,도로명주소,영업상태명,데이터갱신시점,인허가일자\n";
  const make = (dates) => parseRestaurants(header + dates.map((date, index) => `${index},테스트${index},한식,옥천군 옥천읍,영업/정상,2026-10-14,${date}`).join("\n"));
  const dates = ["", "2026-02-30", "1900-02-29", "날짜없음", "0000-01-01", "2000-02-29", "1980-01-01", "1980-01-01"];
  const result = searchRestaurants(make(dates), [{ role: "user", content: "가장 오래된 식당 알려줘." }]);
  assert.equal(result.info.matched, 8);
  assert.equal(result.info.shown, 3);
  assert.equal(result.info.orderBy.excludedDateCount, 5);
  assert.equal(result.info.orderBy.earliestDateTies, 2);
  assert.deepEqual(result.sources.map((row) => row.approvedAt), ["1980-01-01", "1980-01-01", "2000-02-29"]);
  const noDate = searchRestaurants(make(["", "2026-02-30"]), [{ role: "user", content: "가장 오래된 식당 알려줘." }]);
  assert.equal(noDate.sources.length, 0);
  assert.equal(noDate.info.matched, 2);
  assert.equal(noDate.info.orderBy.validDateCount, 0);
  assert.equal(noDate.info.orderBy.earliestDate, null);
});

test("최근에 생긴·최신·새로 생긴 요청은 인허가일자 DESC로 전체 검색", () => {
  for (const query of [
    "가장 최근에 생긴 식당 알려줘.",
    "제일 최근에 생긴 식당은?",
    "최근생긴식당 알려줘.",
    "최신 식당 알려줘.",
    "새로 생긴 식당 알려줘.",
    "최근 순으로 식당 3곳 알려줘.",
    "인허가일자 내림차순으로 식당 알려줘.",
    "order by 인허가일자 desc",
  ]) {
    const result = ask(query);
    assert.equal(result.info.matched, 1493, query);
    assert.equal(result.sources[0].name, "제이파운드케이크", query);
    assert.equal(result.sources[0].approvedAt, "2026-10-08");
    assert.equal(result.info.orderBy.direction, "desc");
    assert.equal(result.info.orderBy.latestDate, "2026-10-08");
    assert.equal(result.info.orderBy.latestDateTies, 1);
    assert.ok(result.sources.every((row, index, rows) => index === 0 || rows[index - 1].approvedAt >= row.approvedAt));
    assert.match(restaurantContext(result), /"인허가일자":"2026-10-08"/);
  }
  assert.equal(ask("옥천 식당의 최근 데이터 갱신일 알려줘.").info.orderBy, undefined);
});

test("최근 순은 지역·영업 상태를 먼저 적용하고 후속 질문에서 방향을 전환", () => {
  const open = ask("현재 영업 중인 가장 최근에 생긴 식당 알려줘.");
  assert.equal(open.sources[0].name, "제이파운드케이크");
  assert.ok(open.sources.every((row) => row.status === "영업/정상"));
  const local = ask("청산면에서 가장 최근에 생긴 식당 알려줘.");
  assert.ok(local.sources.length > 0);
  assert.ok(local.sources.every((row) => row.district === "청산면"));
  for (const [previous, current, expected] of [
    ["청산면에서 가장 오래된 식당 알려줘.", "그중 가장 최근에 생긴 식당은?", "desc"],
    ["청산면에서 가장 최근에 생긴 식당 알려줘.", "그중 가장 오래된 식당은?", "asc"],
  ]) {
    const result = searchRestaurants(records, [{ role: "user", content: previous }, { role: "assistant", content: "청산면의 결과입니다." }, { role: "user", content: current }]);
    assert.equal(result.info.orderBy.direction, expected);
    assert.ok(result.sources.length > 0);
    assert.ok(result.sources.every((row) => row.district === "청산면"));
  }
});

test("DESC는 최신 날짜가 뒤쪽에 있어도 제한 전에 선택하며 오류 날짜와 동률 처리", () => {
  const dates = [...Array(13).fill("1980-01-01"), "2026-02-30", "", "2026-10-14", "2026-10-14"];
  const fixture = parseRestaurants("관리번호,사업장명,업태구분명,도로명주소,영업상태명,데이터갱신시점,인허가일자\n" + dates.map((date, index) => `${index},테스트${index},한식,옥천군 옥천읍,영업/정상,2026-10-14,${date}`).join("\n"));
  const result = searchRestaurants(fixture, [{ role: "user", content: "가장 최근에 생긴 식당 알려줘." }], 1);
  assert.equal(result.sources.length, 1);
  assert.equal(result.sources[0].approvedAt, "2026-10-14");
  assert.equal(result.info.orderBy.latestDateTies, 2);
  assert.equal(result.info.orderBy.excludedDateCount, 2);
  assert.equal(result.info.orderBy.validDateCount, 15);
  const empty = searchRestaurants(fixture.filter((row) => !row.approvedAt || row.approvedAt === "2026-02-30"), [{ role: "user", content: "최신 식당 알려줘." }]);
  assert.equal(empty.info.orderBy.latestDate, null);
  assert.equal(empty.info.orderBy.validDateCount, 0);
  assert.equal(empty.sources.length, 0);
});
