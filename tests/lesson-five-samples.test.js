import test from "node:test";
import assert from "node:assert/strict";
import { GET } from "../app/api/lesson-five/samples/route.js";

test("DB 미설정과 잘못된 연결 정보를 안전하게 안내하고 응답을 캐시하지 않음", async () => {
  const original = process.env.DATABASE_URL;
  try {
    delete process.env.DATABASE_URL;
    const missing = await GET();
    assert.equal(missing.status, 503);
    assert.equal(missing.headers.get("Cache-Control"), "no-store");
    assert.match((await missing.json()).error, /DATABASE_URL/);

    const secret = "secret-that-must-not-reach-browser";
    process.env.DATABASE_URL = `invalid://${secret}`;
    const failed = await GET();
    assert.equal(failed.status, 503);
    assert.equal(failed.headers.get("Cache-Control"), "no-store");
    const body = await failed.text();
    assert.match(body, /샘플 데이터를 가져오지 못했어요/);
    assert.ok(!body.includes(secret));
    assert.ok(!body.includes("invalid://"));
  } finally {
    if (original === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = original;
  }
});
