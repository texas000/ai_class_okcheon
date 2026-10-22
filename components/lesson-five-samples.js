"use client";

import { useEffect, useState } from "react";

const initialState = { loading: true, data: null, error: "" };

export default function LessonFiveSamples() {
  const [state, setState] = useState(initialState);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/lesson-five/samples", { cache: "no-store", signal: controller.signal });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "샘플 데이터를 가져오지 못했어요.");
        if (!controller.signal.aborted) setState({ loading: false, data, error: "" });
      } catch (error) {
        if (!controller.signal.aborted) setState({ loading: false, data: null, error: error.message === "Failed to fetch" ? "서버에 연결하지 못했어요. 인터넷 연결을 확인하고 다시 조회해 주세요." : error.message });
      }
    }
    load();
    return () => controller.abort();
  }, [revision]);

  const { loading, data, error } = state;
  return <div className="db-samples" aria-busy={loading}>
    <p className="course-note">이 표는 예시를 화면에 적어 둔 것이 아니라, 서버가 Neon DB에서 직접 읽은 결과예요. 아래 조회 버튼을 누르면 DB에서 다시 가져와요.</p>
    <p><button type="button" className="lesson-action" disabled={loading} onClick={() => { setState(initialState); setRevision((value) => value + 1); }}>{loading ? "DB에서 조회하는 중…" : "DB에서 다시 조회하기 ↻"}</button></p>
    <div role="status" aria-live="polite">
      {loading && <p>브라우저 → 앱 서버 → Neon DB로 샘플 데이터를 요청하고 있어요.</p>}
      {error && <p>{error}</p>}
      {data && <p><strong>DB 조회 성공 · 총 {data.total}건</strong> · 조회 시각 {new Date(data.fetchedAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })} (한국 시간)</p>}
    </div>
    {data && <>
      <div className="course-table-wrap"><table className="course-table">
        <caption>실제 DB 테이블: {data.table} · 최대 20건 표시</caption>
        <thead><tr><th scope="col">ID</th><th scope="col">할 일</th><th scope="col">분류</th><th scope="col">상태</th><th scope="col">DB에 저장된 시각 (한국 시간)</th></tr></thead>
        <tbody>{data.rows.map((row) => <tr key={row.id}><td>{row.id}</td><td>{row.title}</td><td>{row.category}</td><td>{row.status}</td><td>{new Date(row.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</td></tr>)}</tbody>
      </table></div>
      {data.rows.length === 0 && <p>테이블은 연결됐지만 저장된 데이터가 없어요.</p>}
      <details className="db-sample-columns"><summary>이 테이블에는 어떤 정보가 들어 있나요?</summary><ul>{data.columns.map((column) => <li key={column.column_name}><code>{column.column_name}</code> · {column.data_type}</li>)}</ul><p>한 줄(행)은 할 일 한 건이고, 각 칸(열)은 ID·제목·분류·상태·생성 시각이에요.</p></details>
    </>}
    <aside className="lesson-example"><strong>직접 확인해 보세요</strong><p>Neon 콘솔에서 <code>lesson_five_samples</code>의 샘플 제목이나 상태를 바꾼 뒤 ‘DB에서 다시 조회하기’를 눌러 보세요. 화면도 같은 값으로 바뀌면 DB → 서버 → 화면의 연결을 확인한 거예요. 이 표에는 수업용 가상 데이터만 넣어 주세요.</p></aside>
  </div>;
}
