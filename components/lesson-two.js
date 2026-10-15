import { Activity, LessonSchedule, LessonSection, Review } from "./lesson-blocks.js";
import LessonQuestions from "./lesson-questions.js";

const TIMER_PROMPT = `비개발자도 사용할 수 있는 간단한 타이머 웹 앱을 만들어줘.

필수 기능
- 시간을 분과 초로 입력할 수 있어야 해.
- 시작, 일시정지, 다시 시작, 초기화 버튼이 있어야 해.
- 남은 시간을 큰 글자로 보여줘.
- 시간이 끝나면 화면으로 알려줘.
- 휴대전화와 컴퓨터에서 모두 보기 편하게 만들어줘.

먼저 작은 첫 버전만 만들어줘.
완성되면 실행 방법과 확인할 항목을 쉬운 말로 알려줘.`;

export default function LessonTwo() {
  return <div className="lesson-content">
    <LessonSchedule number={2} />

    <LessonSection id="vibe-review" eyebrow="00:00–00:10 · 돌아보기" title="우리가 만든 것은 타이머 앱이에요" intro="AI에게 원하는 결과를 말하고, 나온 앱을 실행해 확인하고, 다시 고쳐 달라고 요청하는 과정을 직접 경험했어요.">
      <div className="input-output-map">
        <div><span>REQUEST</span><h3>요청하기</h3><p>원하는 기능과 화면을<br />쉬운 말로 설명해요.</p></div>
        <span aria-hidden="true">→</span>
        <div><span>BUILD</span><h3>만들기</h3><p>AI가 코드를 만들거나<br />기존 코드를 고쳐요.</p></div>
        <span aria-hidden="true">→</span>
        <div><span>CHECK</span><h3>확인하기</h3><p>직접 눌러 보고<br />부족한 점을 찾아요.</p></div>
      </div>
      <aside className="lesson-takeaway"><h3>2회차 결과물</h3><p>시작·일시정지·다시 시작·초기화가 동작하는 타이머 앱을 만들고, 직접 테스트한 뒤 원하는 부분 하나를 수정했어요.</p></aside>
    </LessonSection>

    <LessonSection id="vibe-method" eyebrow="00:10–00:25 · 방법" title="바이브 코딩은 대화와 확인을 반복하는 일이에요" intro="코드를 모두 외우지 않아도 돼요. 대신 무엇을 만들지 분명히 말하고, AI가 만든 결과를 직접 확인해야 해요.">
      <div className="prompt-recipe">
        <div><span>01</span><strong>작게 요청</strong><p>첫 버전의 핵심 기능만 말해요.</p></div>
        <div><span>02</span><strong>실행</strong><p>브라우저에서 앱을 열어요.</p></div>
        <div><span>03</span><strong>테스트</strong><p>버튼을 하나씩 눌러봐요.</p></div>
        <div><span>04</span><strong>수정</strong><p>한 번에 한 가지씩 고쳐요.</p></div>
      </div>
      <div className="teaching-grid">
        <article><h3>좋은 요청</h3><p>“5분을 입력하고 시작을 누르면 4:59, 4:58처럼 줄어들게 해줘.”처럼 행동과 결과를 함께 말해요.</p></article>
        <article><h3>좋은 피드백</h3><p>“초기화를 눌렀는데 입력한 시간으로 돌아가지 않아. 이 문제만 고치고 확인 방법을 알려줘.”처럼 관찰한 현상을 말해요.</p></article>
        <article><h3>꼭 지킬 것</h3><p>AI가 ‘완성됐다’고 해도 직접 실행해요. 오류가 나면 숨기지 말고 오류 문구 전체를 AI에게 보여줘요.</p></article>
      </div>
    </LessonSection>

    <LessonSection id="timer-plan" eyebrow="00:25–00:40 · 계획" title="타이머의 완료 모습을 먼저 정해요" intro="프롬프트를 쓰기 전에 사용자가 무엇을 입력하고, 어떤 버튼을 누르고, 무엇을 보게 될지 정해요.">
      <LessonQuestions id="lesson-2-timer-plan" title="타이머 앱 계획 질문" questions={[
        { key: "user", question: "이 타이머는 누가 언제 사용하나요?", hint: "예: 요리하는 사람이 면 삶는 시간을 잴 때 사용해요." },
        { key: "input", question: "사용자는 무엇을 입력하거나 누르나요?", hint: "분·초 입력, 시작, 일시정지, 다시 시작, 초기화" },
        { key: "output", question: "화면에는 어떤 결과가 보여야 하나요?", hint: "남은 시간, 실행 상태, 종료 안내" },
        { key: "success", question: "무엇이 되면 완성이라고 할까요?", hint: "시간이 정확히 줄고 모든 버튼이 예상대로 동작해요." },
      ]} />
    </LessonSection>

    <LessonSection id="timer-build" eyebrow="00:40–01:05 · 만들기" title="첫 프롬프트로 타이머 앱을 만들어요" intro="처음부터 모든 기능을 넣기보다, 꼭 필요한 기능이 동작하는 작은 버전부터 시작해요.">
      <div className="lesson-code-example"><span className="code-file">AI 코딩 도구에 보내는 예시</span><pre><code>{TIMER_PROMPT}</code></pre></div>
      <Activity title="AI와 함께 첫 버전 만들기" steps={[
        "새 프로젝트 폴더를 열고 위 프롬프트를 AI 코딩 도구에 보내요.",
        "AI가 파일을 만들기 전에 무엇을 바꿀지 설명하는지 확인해요.",
        "AI가 알려준 실행 명령을 사용하고 브라우저의 로컬 주소를 열어요.",
        "화면이 열리지 않으면 터미널의 오류 문구를 그대로 AI에게 전달해요.",
      ]} />
    </LessonSection>

    <LessonSection id="timer-test" eyebrow="01:15–01:35 · 테스트" title="사용자처럼 하나씩 눌러봐요" intro="화면이 예쁘게 보이는 것과 기능이 올바르게 동작하는 것은 달라요. 예상 결과를 적고 실제 결과와 비교해요.">
      <div className="course-table-wrap"><table className="course-table"><caption>타이머 기본 테스트</caption><thead><tr><th>해볼 일</th><th>기대하는 결과</th><th>확인</th></tr></thead><tbody>
        <tr><th scope="row">1분 입력 후 시작</th><td>1:00에서 0:59, 0:58처럼 줄어들어요.</td><td>□</td></tr>
        <tr><th scope="row">일시정지</th><td>표시된 시간이 더 줄어들지 않아요.</td><td>□</td></tr>
        <tr><th scope="row">다시 시작</th><td>멈춘 시간부터 다시 줄어들어요.</td><td>□</td></tr>
        <tr><th scope="row">초기화</th><td>처음 입력한 시간으로 돌아가요.</td><td>□</td></tr>
        <tr><th scope="row">0초 또는 빈칸에서 시작</th><td>앱이 망가지지 않고 입력 안내가 보여요.</td><td>□</td></tr>
      </tbody></table></div>
      <Activity title="문제를 AI에게 정확히 전달하기" steps={["동작하지 않는 항목이 있다면 ‘누른 버튼 / 실제로 일어난 일 / 원했던 결과’를 적어요.", "오류 문구가 있다면 줄이거나 바꾸지 말고 그대로 붙여 넣어요.", "다른 기능은 바꾸지 말고 발견한 문제만 고쳐 달라고 요청해요."]} />
    </LessonSection>

    <LessonSection id="timer-change" eyebrow="01:35–01:50 · 한 가지 개선" title="한 번에 한 가지를 더 좋아지게 만들어요" intro="색상, 글자 크기, 종료 알림처럼 가장 아쉬운 점 하나를 고르고 수정해요.">
      <div className="teaching-grid">
        <article><h3>화면 개선 예시</h3><p>“남은 시간을 화면 중앙에 더 크게 보여주고, 10초 이하가 되면 숫자를 빨간색으로 바꿔줘.”</p></article>
        <article><h3>기능 개선 예시</h3><p>“시간이 끝나면 ‘타이머가 끝났어요’라는 메시지를 보여줘. 기존 버튼 동작은 유지해줘.”</p></article>
      </div>
      <Activity title="수정 전과 후를 비교해요" steps={["가장 필요한 변경 한 가지를 문장으로 적어요.", "바꾸려는 부분과 유지할 부분을 함께 말해요.", "AI가 수정한 뒤 기본 테스트를 다시 실행해요."]} />
    </LessonSection>

    <LessonSection id="timer-review" eyebrow="01:50–02:00 · 정리" title="만든 과정까지 내 결과물이에요" intro="프롬프트, 실행 결과, 테스트 기록을 함께 남기면 다음 앱을 만들 때 다시 사용할 수 있어요.">
      <Review items={[
        { question: "바이브 코딩은 AI에게 한 번 부탁하면 끝나는 일인가요?", answer: "아니요. 작게 요청하고, 실행하고, 직접 테스트하고, 구체적으로 수정하는 과정을 반복해요." },
        { question: "AI가 완성됐다고 말하면 테스트하지 않아도 되나요?", answer: "아니요. 시작·일시정지·다시 시작·초기화와 잘못된 입력을 사용자가 직접 확인해야 해요." },
        { question: "여러 문제가 보이면 어떻게 요청하나요?", answer: "가장 중요한 문제부터 한 번에 하나씩 요청해요. 실제 결과와 원하는 결과를 함께 말하면 좋아요." },
      ]} />
      <aside className="lesson-example"><strong>다음 시간 준비</strong><p>타이머 앱이 내 컴퓨터에서 실행되는지 마지막으로 확인하고 프로젝트 폴더를 그대로 보관하세요. 3회차에는 이 코드를 GitHub에 올리고 Vercel에서 누구나 열 수 있는 주소로 배포해요.</p></aside>
    </LessonSection>
  </div>;
}
