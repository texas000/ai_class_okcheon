import test from "node:test";
import assert from "node:assert/strict";
import {
  getRestaurantSummary,
  loadRestaurants,
  parseRestaurants,
  restaurantContext,
  searchRestaurants,
} from "../lib/restaurants.js";

test("CSV는 BOM, 따옴표 안의 쉼표와 줄바꿈을 보존", () => {
  const rows = parseRestaurants(
    '\ufeff연번,업종명,업소명,소재지(도로명),데이터기준일\r\n1,일반음식점,"테스트,식당","충청북도 옥천군 옥천읍 테스트로 1,\n2층",2026-09-16\r\n',
  );
  assert.equal(rows[0].name, "테스트,식당");
  assert.equal(rows[0].address, "충청북도 옥천군 옥천읍 테스트로 1,\n2층");
  assert.equal(rows[0].district, "옥천읍");
});

test("필수 컬럼, 빈 데이터·값과 중복 연번을 검증", () => {
  assert.throws(() => parseRestaurants("이름,주소\n식당,옥천"), /필수 컬럼/);
  assert.throws(
    () => parseRestaurants("연번,업종명,업소명,소재지(도로명),데이터기준일\n"),
    /데이터가 없습니다/,
  );
  assert.throws(
    () =>
      parseRestaurants(
        "연번,업종명,업소명,소재지(도로명),데이터기준일\n1,일반음식점,,옥천,2026-09-16",
      ),
    /빈 값/,
  );
  assert.throws(
    () =>
      parseRestaurants(
        "연번,업종명,업소명,소재지(도로명),데이터기준일\n1,일반음식점,A,옥천,2026-09-16\n1,일반음식점,B,옥천,2026-09-16",
      ),
    /중복 연번/,
  );
});

const records = await loadRestaurants();
const ask = (query) =>
  searchRestaurants(records, [{ role: "user", content: query }]);

test("실제 CSV의 업종별·지역별 집계 합계가 전체와 일치", () => {
  const summary = getRestaurantSummary(records);
  assert.equal(summary.total, 1013);
  assert.deepEqual(summary.byType, {
    일반음식점: 811,
    휴게음식점: 184,
    제과점영업: 18,
  });
  assert.deepEqual(summary.dates, ["2026-09-16"]);
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
    assert.equal(result.info.matched, 57);
    assert.ok(result.sources.every((row) => row.district === "청산면"));
  }
  assert.equal(
    ask("옥천읍에 어떤 식당이 있는지 5곳 알려줘.").info.matched,
    672,
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

test("카페 이름 검색과 제과점 업종 검색을 구분", () => {
  const cafes = ask("옥천읍에 이름에 카페나 커피가 들어간 업소 3곳 알려줘.");
  assert.ok(cafes.info.matched > 0);
  assert.ok(
    cafes.sources.every(
      (row) =>
        row.district === "옥천읍" && /카페|커피|coffee|cafe/i.test(row.name),
    ),
  );
  const bakeries = ask("옥천읍에 빵집 알려줘.");
  assert.equal(bakeries.info.matched, 14);
  assert.ok(bakeries.sources.every((row) => row.type === "제과점영업"));
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
  assert.equal(newArea.info.matched, 57);
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
  const result = ask("풍미당 영업시간과 메뉴 가격 알려줘.");
  const context = restaurantContext(result);
  assert.match(context, /okcheon_restaurant.csv/);
  assert.match(context, /중앙로 23-1/);
  assert.match(context, /AI에전달한업소수/);
  assert.equal(result.sources[0].menu, undefined);
  assert.equal(result.sources[0].hours, undefined);
});
