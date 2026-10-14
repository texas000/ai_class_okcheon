// AI 답변과 별개로 서버가 검색한 실제 CSV 행을 보여줍니다.
// 참고 자료를 펼쳐 이름과 주소를 직접 비교할 수 있습니다.
export default function RestaurantSources({ sources, info }) {
  if (!info) return null;
  return (
    <details className="restaurant-sources">
      <summary>참고한 CSV 자료 · {sources.length}곳</summary>
      <p className="source-meta">
        {info.filename} · 최신 데이터 갱신일 {info.dates.join(", ")}
        <br />
        전체 {info.total.toLocaleString()}개 업소 중 검색 조건에 맞는{" "}
        {info.matched.toLocaleString()}곳
        {info.matched > sources.length &&
          ` · 그중 ${sources.length}곳을 AI에 전달`}
      </p>
      {info.orderBy && (
        <p className="source-meta">
          인허가일자 {info.orderBy.direction === "desc" ? "내림차순" : "오름차순"} · 날짜가 유효한 {info.orderBy.validDateCount.toLocaleString()}곳 비교
          {info.orderBy.excludedDateCount > 0 && ` · 날짜 누락·오류 ${info.orderBy.excludedDateCount.toLocaleString()}곳 제외`}
          {info.orderBy.earliestDateTies > 1 && ` · 가장 이른 날짜 ${info.orderBy.earliestDate}에 ${info.orderBy.earliestDateTies}곳`}
          {info.orderBy.latestDateTies > 1 && ` · 가장 최근 날짜 ${info.orderBy.latestDate}에 ${info.orderBy.latestDateTies}곳`}
        </p>
      )}
      {info.nameSearch.length > 0 && (
        <p className="source-meta">
          업소명에 포함된 글자 검색: {info.nameSearch.join(" / ")}. 메뉴나 전문
          업종을 확인한 결과는 아닙니다.
        </p>
      )}
      {sources.length === 0 ? (
        <p className="source-empty">
          {info.orderBy && info.matched > 0
            ? "조건에 맞는 업소는 있지만 유효한 인허가일자가 없어 날짜순 순위를 확인할 수 없어요."
            : "조건에 맞는 업소를 찾지 못했어요. 지역이나 가게 이름을 바꿔 질문해 보세요."}
        </p>
      ) : (
        <ul className="source-list">
          {sources.map((source) => (
            <li key={source.id}>
              <div>
                <strong>{source.name}</strong>
                <span>
                  {source.type} · {source.status}
                </span>
              </div>
              <p>{source.address}</p>
              {source.approvedAt && <p>인허가일자 {source.approvedAt}</p>}
              {source.siteArea && <p>소재지면적 {source.siteArea}</p>}
              {source.facilityArea && <p>시설총규모 {source.facilityArea}</p>}
              {source.phone && <p>전화번호 {source.phone}</p>}
            </li>
          ))}
        </ul>
      )}
    </details>
  );
}
