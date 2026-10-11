import { Activity, LessonSection, Review } from "./lesson-blocks.js";

const VIBE_PROMPT = `나는 비개발자이고, 지금 배포된 앱을 조금 개선하고 싶어요.

현재 앱: 옥천 식당 정보를 찾아주는 챗봇
바꾸고 싶은 것: [한 가지만 구체적으로 작성]
사용자가 보게 될 결과: [원하는 화면이나 동작]

기존 기능과 NVIDIA_API_KEY는 그대로 유지해 주세요.
수정할 파일과 위치를 먼저 알려주고, 한 번에 한 단계씩 설명해 주세요.
수정 후 내가 확인할 방법도 쉬운 말로 알려주세요.`;

const FINAL_CHECKS = [
  "배포 주소가 휴대전화와 컴퓨터에서 열려요.",
  "대표 질문을 보내면 답변과 참고 자료가 보여요.",
  "API 키나 개인정보가 화면과 GitHub에 보이지 않아요.",
  "내가 바꾼 한 가지 기능이 예상대로 동작해요.",
  "발표에서 사용할 주소와 질문을 따로 기록했어요.",
];

export default function LessonSeven() {
  return <div className="lesson-content">
    <LessonSection id="final-check" eyebrow="00:00–00:20 · 현재 상태 확인" title="바꾸기 전에 지금 앱부터 확인해요" intro="먼저 정상적으로 동작하는 기준점을 만듭니다. 문제가 생기면 변경 전과 비교해 어디서 달라졌는지 찾을 수 있어요.">
      <Activity title="최종 배포 주소 점검하기" steps={["4회차에 만든 Vercel 앱 주소를 열어요.", "‘풍미당 주소 알려줘’처럼 결과를 알고 있는 질문을 보내요.", "답변과 참고 자료가 맞는지 확인하고 현재 화면을 캡처해요.", "작동하지 않는 부분이 있다면 새 기능을 만들기 전에 먼저 기록해요."]} />
      <aside className="lesson-takeaway"><h3>오늘의 바이브코딩 범위</h3><p>앱 전체를 새로 만들지 않고, 발표에서 보여줄 수 있는 <b>작은 변화 한 가지</b>를 완성해요. 챗봇 제목, 첫 인사, 안내 문구, 질문 카드, 색상처럼 눈으로 바로 확인할 수 있는 변화가 좋아요.</p></aside>
    </LessonSection>

    <LessonSection id="vibe-basics" eyebrow="00:20–00:40 · 바이브코딩 준비" title="원하는 결과를 AI에게 설명해요" intro="바이브코딩은 원하는 기능을 자연어로 설명하고 AI의 도움을 받아 코드를 만들거나 고치는 방식이에요. 어떤 AI 서비스를 사용해도 진행 순서는 같습니다.">
      <div className="teaching-grid"><article><h3>사용할 수 있는 AI 서비스</h3><p>ChatGPT, Claude, Gemini, Copilot 등 내가 이미 사용하는 서비스를 열어요. 서비스마다 화면과 답변은 다르지만, 현재 상황과 원하는 결과를 구체적으로 알려주는 것이 중요해요.</p></article><article><h3>좋은 첫 요청</h3><p>무엇을 바꿀지 한 가지만 말하고, 비개발자도 따라 할 수 있게 한 단계씩 설명해 달라고 요청해요. 기존 기능과 비밀 키를 유지해야 한다는 조건도 함께 알려줘요.</p></article></div>
      <div className="lesson-code-example"><span className="code-file">AI 서비스에 복사해 사용할 요청 양식</span><pre><code>{VIBE_PROMPT}</code></pre></div>
      <Activity title="나의 작은 변화 정하기" steps={["현재 앱에서 가장 바꾸고 싶은 한 가지를 고릅니다.", "누가 보게 되는지, 지금 무엇이 불편한지, 바뀐 뒤 어떤 모습이면 성공인지 적어요.", "위 요청 양식의 대괄호 부분을 내 내용으로 바꿔 AI 서비스에 보내요."]} />
    </LessonSection>

    <LessonSection id="vibe-lab" eyebrow="00:50–01:20 · AI와 함께 수정" title="한 번에 하나씩 적용하고 확인해요" intro="AI의 답변을 그대로 모두 적용하지 말고, 수정할 파일과 위치를 확인하면서 작은 단계로 진행합니다.">
      <div className="release-pipeline" aria-label="요청, 확인, 적용, 시험 순서"><article><span>01</span><h3>요청</h3><p>원하는 변화 한 가지 설명</p></article><article><span>02</span><h3>확인</h3><p>수정 파일과 범위 확인</p></article><article><span>03</span><h3>적용</h3><p>제안된 변경 반영</p></article><article><span>04</span><h3>시험</h3><p>화면과 기존 기능 확인</p></article></div>
      <Activity title="바이브코딩 실습" steps={["AI가 제안한 내용에서 수정할 파일 이름과 바뀌는 부분을 먼저 찾습니다.", "API 키, 비밀번호, 개인정보는 AI 대화나 코드에 붙여 넣지 않아요.", "한 단계만 적용한 뒤 미리보기나 배포 화면에서 결과를 확인해요.", "오류가 나면 오류 문구와 직전에 한 변경을 AI에게 알려주고 해결 방법을 한 단계씩 요청해요.", "원하는 결과가 나오면 무엇을 바꿨는지 한 문장으로 기록해요."]} />
      <aside className="lesson-example"><strong>AI가 제안해도 확인이 필요한 것</strong><p>기존 파일 전체를 지우라는 요청, API 키를 코드에 넣는 방법, 이해하지 못한 여러 파일의 큰 변경은 바로 적용하지 않아요. 강사에게 화면을 보여주고 변경 범위를 줄여 다시 요청합니다.</p></aside>
    </LessonSection>

    <LessonSection id="final-deploy" eyebrow="01:20–01:45 · 최종 배포" title="변경한 앱을 최종 주소에 반영해요" intro="변경을 저장한 뒤 Vercel 배포가 완료될 때까지 기다리고, 기존 기능과 새 기능을 함께 확인합니다.">
      <Activity title="배포 후 다섯 가지 확인" steps={FINAL_CHECKS} />
      <Review items={[
        { question: "새 기능은 보이는데 챗봇 답변이 안 나와요", answer: "Vercel의 NVIDIA_API_KEY가 유지됐는지 확인해요. 키 값을 화면이나 AI 대화에 복사하지 말고, 환경변수 이름과 배포 상태만 확인합니다." },
        { question: "AI가 너무 많은 파일을 바꾸라고 해요", answer: "원하는 변화를 더 작게 나누고 ‘기존 구조를 유지하고 가장 적은 파일만 수정해 달라’고 다시 요청해요." },
        { question: "수정 전으로 돌아가고 싶어요", answer: "새 변경을 더 추가하지 말고 강사에게 GitHub의 변경 기록을 보여주세요. 정상 동작했던 버전을 기준으로 되돌린 뒤 다시 한 단계씩 진행합니다." },
      ]} />
    </LessonSection>

    <LessonSection id="presentation-ready" eyebrow="01:45–02:00 · 발표 준비" title="3분 시연 순서를 만들어요" intro="기능을 많이 설명하기보다 앱이 누구를 돕고, 어떤 질문에 어떻게 답하며, 오늘 무엇을 개선했는지 보여주세요.">
      <Activity title="발표 순서 연습하기" steps={["30초: 앱 이름과 누구의 어떤 문제를 돕는지 소개해요.", "1분: 준비한 대표 질문으로 앱을 직접 시연해요.", "30초: 참고 자료나 결과를 어떻게 확인하는지 보여줘요.", "30초: AI 서비스와 함께 바꾼 한 가지와 확인 방법을 말해요.", "30초: 가장 어려웠던 점과 다음에 개선하고 싶은 것을 이야기해요."]} />
      <aside className="lesson-takeaway"><h3>7회차 결과물</h3><p>최종 Vercel 주소, 대표 시연 질문, 바이브코딩으로 바꾼 한 가지, 3분 발표 순서를 준비하면 완료예요.</p></aside>
    </LessonSection>
  </div>;
}
