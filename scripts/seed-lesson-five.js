import env from "@next/env";
import { neon } from "@neondatabase/serverless";
import { readFile } from "node:fs/promises";

env.loadEnvConfig(process.cwd());

try {
  if (!process.env.DATABASE_URL) throw new Error("missing configuration");
  const sql = neon(process.env.DATABASE_URL, {
    fetchOptions: { signal: AbortSignal.timeout(15000) },
  });
  const source = await readFile(new URL("../db/lesson-five-samples.sql", import.meta.url), "utf8");
  // 이 파일의 고정 SQL만 실행합니다. 사용자 입력은 받지 않습니다.
  const statements = source.split(";").filter((statement) => statement.trim());
  await sql.transaction(statements.map((statement) => sql.query(statement)));
  const rows = await sql`SELECT id, title, category, status FROM public.lesson_five_samples ORDER BY id LIMIT 20`;
  console.log(JSON.stringify({ table: "lesson_five_samples", rows }, null, 2));
} catch {
  // 연결 정보가 포함될 수 있는 드라이버 오류는 출력하지 않습니다.
  console.error("샘플 DB 준비에 실패했어요. DATABASE_URL과 DB 연결 상태를 확인해 주세요.");
  process.exitCode = 1;
}
