import { Activity, LessonSection } from "./lesson-blocks.js";
import { DATABASE_DESIGN_PROMPT, LARGE_DATA_PROMPT } from "../lib/database-prompts.js";

function ExampleTable({ caption, columns, rows }) {
  return <div className="course-table-wrap"><table className="course-table">
    <caption>{caption}</caption>
    <thead><tr>{columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead>
    <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, column) => <td key={column}>{cell}</td>)}</tr>)}</tbody>
  </table></div>;
}

export default function LessonFiveDataGuide() {
  return <>
    <LessonSection id="db-normalization" eyebrow="개념 더 보기 · 데이터 정리" title="정규화와 비정규화 · 기준표와 조회용 사본" intro="같은 내용을 여러 곳에 적으면 수정할 때 빠뜨리기 쉬워요. 어디에 원본을 두고, 어떤 정보를 함께 보여줄지 정하는 것이 DB 설계의 중요한 부분이에요.">
      <aside className="lesson-example"><strong>팀별 할 일 장부를 만든다고 생각해 보세요</strong><p>이 예시에서는 팀마다 기본 작업실이 하나씩 있어요. 할 일을 적을 때마다 팀 이름과 작업실까지 반복해서 적으면, 기획팀의 작업실이 바뀔 때 여러 줄을 고쳐야 해요. 한 줄만 놓치면 같은 팀의 작업실이 서로 다르게 보일 수 있어요. 아래 표는 개념 설명용 가상 자료예요.</p></aside>
      <ExampleTable caption="나누기 전 · 같은 팀 정보가 반복되는 할 일 장부" columns={["할 일", "담당 팀", "기본 작업실"]} rows={[
        ["안내문 만들기", "기획팀", "A실"], ["발표 자료 만들기", "기획팀", "A실"], ["장비 점검하기", "운영팀", "B실"],
      ]} />
      <article className="db-concept-explanation"><h3>정규화 · 정보의 성격에 맞게 나누고 고유 번호로 연결해요</h3><p>반복되는 팀 정보는 ‘팀 기준표’ 한 곳에 두고, 할 일에는 담당 팀의 ID(고유 번호)만 적어요. 작업실이 바뀌면 팀 기준표의 한 칸을 고치면 돼요. 이런 식으로 정보 사이의 관계에 맞게 표를 나누어 중복과 수정 실수를 줄이는 것을 정규화라고 해요.</p></article>
      <div className="db-normalized-tables">
        <ExampleTable caption="팀 기준표 · 팀 정보의 원본" columns={["팀 ID", "팀 이름", "기본 작업실"]} rows={[["T01", "기획팀", "A실"], ["T02", "운영팀", "B실"]]} />
        <ExampleTable caption="할 일 표 · 담당 팀은 ID로 연결" columns={["할 일", "담당 팀 ID"]} rows={[["안내문 만들기", "T01"], ["발표 자료 만들기", "T01"], ["장비 점검하기", "T02"]]} />
      </div>
      <p className="course-note">할 일의 T01 → 팀 기준표의 T01 → 기획팀·A실. 화면을 보여줄 때 두 표를 연결해 읽는 것을 JOIN(조인)이라고 해요. 여러 할 일이 같은 팀을 가리킬 수 있어요. 존재하지 않는 팀 ID를 넣지 못하게 하는 규칙은 외래 키라고 불러요.</p>
      <article className="db-concept-explanation"><h3>비정규화 · 자주 보는 정보를 의도적으로 함께 저장해요</h3><p>화면을 열 때마다 정보를 연결하거나 합계를 계산하는 일이 실제로 느리다면, 팀 이름·작업실·할 일 건수를 묶은 조회용 표를 따로 저장할 수 있어요. 원본에서 가져온 정보나 계산 결과를 일부러 중복 저장해 읽기 작업을 줄이는 방식이 비정규화예요. 화면에서 두 표를 한 번 합쳐 보여주는 것만으로 비정규화한 것은 아니에요.</p></article>
      <ExampleTable caption="비정규화 예시 · 원본에서 만들어 별도 저장한 팀별 요약표" columns={["팀 ID", "팀 이름", "기본 작업실", "할 일 건수"]} rows={[["T01", "기획팀", "A실", "2건"], ["T02", "운영팀", "B실", "1건"]]} />
      <aside className="lesson-takeaway"><h3>빠르게 읽는 대신, 사본을 갱신할 책임이 생겨요</h3><p>팀 작업실이 바뀌거나 할 일을 추가·삭제하면 요약표도 갱신해야 해요. 갱신을 놓치면 오래된 작업실이나 잘못된 건수가 보여요. ‘원본이 무엇인지, 원본 변경 때 즉시 갱신할지 또는 몇 분마다 갱신할지, 마지막 갱신 시각을 어떻게 표시할지’를 함께 정해야 해요.</p><p>처음에는 중복을 줄여 관리하고, 느린 조회가 확인되면 검색 조건과 인덱스(책 뒤의 찾아보기 같은 기능)를 먼저 점검해요. 필요한 화면에만 비정규화를 검토해요. 데이터가 많다고 무조건 비정규화하는 것은 아니며, 빨라지는 정도도 실제 측정으로 확인해야 해요.</p></aside>
      <div className="lesson-references"><span>개념 참고</span><a href="https://support.microsoft.com/en-us/access/database-design-basics" target="_blank" rel="noreferrer">Microsoft · DB 설계와 정규화 ↗</a><a href="https://www.postgresql.org/docs/current/rules-materializedviews.html" target="_blank" rel="noreferrer">PostgreSQL · 조회 결과 저장과 갱신 ↗</a></div>
    </LessonSection>
    <LessonSection id="db-large-data-prompts" eyebrow="응용 · AI에게 요청하기" title="데이터가 많아지면 프롬프트도 구체적으로 써요" intro="프롬프트는 AI에게 주는 작업 요청서예요. DB 전체를 붙여 넣기보다, 무엇을 알고 싶은지와 필요한 데이터를 고르는 기준을 알려주세요.">
      <aside className="lesson-example"><strong>‘10만 건을 전부 읽고 분석해줘’에서 한 걸음 더</strong><p>AI가 한 번에 참고할 수 있는 글의 양에는 한계가 있고, 많은 자료를 보내면 시간과 비용도 늘 수 있어요. 표 구조와 필요한 범위를 알려주고, DB에서 검색·계산한 결과를 가져오도록 요청해요. DB 주소를 프롬프트에 적는다고 AI가 자동으로 연결되는 것은 아니며, 실제 조회 도구와 권한이 필요해요.</p></aside>
      <Activity title="많은 데이터로 질문할 때 적을 여섯 가지" steps={[
        "목표: 어떤 결정을 내리려는지 적어요. 예: ‘팀별 미완료 할 일이 많은 곳을 찾고 싶어요.’",
        "구조: 표 이름·각 칸의 뜻·표를 연결하는 ID를 알려줘요. 형식 설명용 가상 샘플 3~5건이면 시작할 수 있어요.",
        "범위: 날짜·시간대·팀·상태 등 조건을 정해요. 전체 통계인지, 최근 일부 기록을 살펴보는 질문인지 구분해요.",
        "처리: 합계·건수·평균은 대상 전체를 DB에서 계산하고, AI에는 집계 결과를 보내요. 상세 목록은 필요한 칸만 골라 페이지로 나누어 가져와요.",
        "답변: 표의 항목·정렬 순서·요약 길이를 정하고, 데이터 기준 시각과 실제 조회 건수도 표시하게 해요.",
        "확인: 누락·중복·모르는 값을 어떻게 처리할지 적어요. 샘플만 보았다면 전체 결과를 추정하지 않게 하고, 실제 개인정보와 비밀값은 빼요.",
      ]} />
      <aside className="lesson-takeaway"><h3>DB를 정리하는 일과 AI에 보낼 자료를 줄이는 일은 달라요</h3><p>정규화·비정규화는 DB에 데이터를 저장하는 구조를 정하는 방법이에요. 프롬프트를 위한 검색·필터·집계는 그중 이번 질문에 필요한 자료를 고르는 방법이에요. 정규화된 DB에서도 필요한 정보를 연결·집계해서 AI에 전달할 수 있어요.</p><p>전체 완료율은 해당 조건의 전체 데이터로 계산해야 해요. 최근 5건은 설명용 예시일 뿐이에요. 긴 문서를 분석할 때는 질문과 관련된 부분을 출처와 함께 찾아 보내고, 전체 검토가 필요하면 범위를 나누어 누락 여부를 확인하도록 요청해요.</p></aside>
      <h3 className="db-prompt-heading">① AI 코딩 도구에 DB 구조·성능 점검을 요청할 때</h3>
      <p className="course-note">현재 앱 프로젝트를 연 코딩 도구에 전달해요. 대괄호 안은 내 상황으로 바꾸고, 모르는 항목은 먼저 확인해 달라고 요청해요.</p>
      <div className="lesson-code-example"><span className="code-file">복사해서 내 앱에 맞게 바꿔 쓰는 프롬프트</span><pre><code>{DATABASE_DESIGN_PROMPT}</code></pre></div>
      <h3 className="db-prompt-heading">② 많은 데이터에서 필요한 분석을 요청할 때</h3>
      <p className="course-note">아래 팀·할 일 구조는 가상 예시예요. 실제 앱의 표 구조로 바꿔요. 일반 채팅에서는 직접 조회한 집계 파일을 주고, DB 연결 도구가 있는 환경에서는 허용된 범위의 조회를 요청해요.</p>
      <div className="lesson-code-example"><span className="code-file">전체 통계와 상세 예시를 구분하는 프롬프트</span><pre><code>{LARGE_DATA_PROMPT}</code></pre></div>
      <div className="lesson-references"><span>프롬프트 구성 참고</span><a href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" target="_blank" rel="noreferrer">Anthropic · 질문에 필요한 맥락 고르기 ↗</a></div>
    </LessonSection>
  </>;
}
