import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "no-store" };

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return Response.json({ error: "서버에 DATABASE_URL을 설정한 뒤 다시 조회해 주세요." }, { status: 503, headers });
  }

  try {
    const sql = neon(process.env.DATABASE_URL, {
      fetchOptions: { signal: AbortSignal.timeout(10000), cache: "no-store" },
    });
    // 공개 수업용 테이블의 정해진 컬럼만 조회합니다. 쓰기 기능은 제공하지 않습니다.
    const [rows, columns, totals] = await sql.transaction([
      sql`SELECT id, title, category, status, created_at FROM public.lesson_five_samples ORDER BY id LIMIT 20`,
      sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'lesson_five_samples' ORDER BY ordinal_position`,
      sql`SELECT count(*)::int AS total FROM public.lesson_five_samples`,
    ]);
    return Response.json({ table: "lesson_five_samples", rows, columns, total: totals[0].total, fetchedAt: new Date().toISOString() }, { headers });
  } catch {
    // 연결 주소·비밀번호·내부 오류는 응답이나 로그로 노출하지 않습니다.
    return Response.json({ error: "샘플 데이터를 가져오지 못했어요. 서버의 DB 연결과 샘플 테이블 준비 상태를 확인해 주세요." }, { status: 503, headers });
  }
}
