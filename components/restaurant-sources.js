// AI 답변과 별개로 서버가 검색한 실제 CSV 행을 보여줍니다.
// 참고 자료를 펼쳐 이름과 주소를 직접 비교할 수 있습니다.
export default function RestaurantSources({ sources, info }) {
  if (!info) return null;
  return (
    <details className="restaurant-sources">
      <summary>참고한 CSV 자료 · {sources.length}곳</summary>
      <p className="source-meta">
        {info.filename} · 기준일 {info.dates.join(", ")}
        <br />
        전체 {info.total.toLocaleString()}개 업소 중 검색 조건에 맞는{" "}
        {info.matched.toLocaleString()}곳
        {info.matched > sources.length &&
          ` · 그중 ${sources.length}곳을 AI에 전달`}
      </p>
      {info.nameSearch.length > 0 && (
        <p className="source-meta">
          업소명에 포함된 글자 검색: {info.nameSearch.join(" / ")}. 메뉴나 전문
          업종을 확인한 결과는 아닙니다.
        </p>
      )}
      {sources.length === 0 ? (
        <p className="source-empty">
          조건에 맞는 업소를 찾지 못했어요. 지역이나 가게 이름을 바꿔 질문해
          보세요.
        </p>
      ) : (
        <ul className="source-list">
          {sources.map((source) => (
            <li key={source.id}>
              <div>
                <strong>{source.name}</strong>
                <span>
                  연번 {source.id} · {source.type}
                </span>
              </div>
              <p>{source.address}</p>
            </li>
          ))}
        </ul>
      )}
    </details>
  );
}
