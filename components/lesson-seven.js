import { Activity, LessonSection, Review } from "./lesson-blocks.js";

const FINAL_CHECKS = [
  "최종 Vercel 주소가 휴대전화와 컴퓨터에서 열려요.",
  "에이전트 이름·첫인사·예시 질문이 내 설계와 같아요.",
  "대표 질문의 답변이 원본 데이터와 일치해요.",
  "데이터에 없는 질문에는 추측하지 않고 안내해요.",
  "6회차에 개선한 기능이 배포 주소에서 동작해요.",
  "API 키나 개인정보가 화면과 GitHub에 보이지 않아요.",
];

export default function LessonSeven() {
  return <div className="lesson-content">
    <LessonSection id="final-deploy-check" eyebrow="00:00–00:30 · 최종 배포 점검" title="발표에 사용할 최종 주소를 확정해요" intro="더 이상 기능을 추가하기 전에 데이터, 답변, 화면과 배포 주소가 안정적으로 동작하는지 확인합니다.">
      <Activity title="최종 점검표" steps={FINAL_CHECKS} />
      <aside className="lesson-example"><strong>발표용 주소는 하나만</strong><p>여러 미리보기 주소 중 실제 발표에서 열 최종 Vercel 주소 하나를 정해 메모합니다. 발표 직전에 새 기능을 추가하면 정상 버전을 잃을 수 있으므로 점검이 끝난 뒤에는 꼭 필요한 수정만 해요.</p></aside>
    </LessonSection>

    <LessonSection id="final-answer-check" eyebrow="00:30–00:50 · 답변 리허설" title="발표에서 보여줄 질문을 확정해요" intro="짧은 시간 안에 에이전트의 목적과 데이터 사용 방식을 잘 보여주는 질문을 고릅니다.">
      <div className="course-table-wrap"><table className="course-table"><caption>발표용 질문 세트</caption><thead><tr><th>질문</th><th>보여줄 내용</th></tr></thead><tbody><tr><th scope="row">대표 질문</th><td>에이전트가 누구를 어떻게 돕는지 보여주는 질문</td></tr><tr><th scope="row">조건 질문</th><td>데이터에서 필요한 결과를 골라 답하는 모습</td></tr><tr><th scope="row">없는 정보 질문</th><td>추측하지 않고 한계를 안내하는 모습</td></tr></tbody></table></div>
      <Activity title="질문과 답변 미리 확인하기" steps={["각 질문을 실제 배포 주소에서 실행해요.", "답변이 너무 길면 발표에서 보여줄 핵심 부분을 정해요.", "참고 자료를 펼쳐 원본과 답변이 같은지 다시 확인해요.", "오류가 날 경우 사용할 예비 질문 하나를 준비해요."]} />
    </LessonSection>

    <LessonSection id="presentation-story" eyebrow="01:00–01:25 · 발표 구성" title="앱을 만든 이야기를 다섯 장면으로 정리해요" intro="기술 용어를 많이 말하기보다 문제, 데이터, 에이전트, 개선, 결과 순서로 설명합니다.">
      <div className="release-pipeline" aria-label="문제, 데이터, 에이전트, 개선, 결과 중 핵심 네 단계"><article><span>01</span><h3>문제</h3><p>누구의 무엇을 돕나요?</p></article><article><span>02</span><h3>데이터</h3><p>어떤 사실을 사용하나요?</p></article><article><span>03</span><h3>시연</h3><p>질문과 답변을 보여줘요</p></article><article><span>04</span><h3>배운 점</h3><p>개선과 다음 계획을 말해요</p></article></div>
      <Activity title="발표 메모 만들기" steps={["앱 이름과 사용자를 한 문장으로 소개해요.", "사용한 데이터와 그 데이터로 알 수 없는 정보를 말해요.", "대표 질문으로 실제 앱을 시연해요.", "6회차 바이브코딩으로 바꾼 한 가지와 확인 방법을 설명해요.", "가장 어려웠던 점과 다음에 개선하고 싶은 것을 한 문장으로 정리해요."]} />
    </LessonSection>

    <LessonSection id="presentation-rehearsal" eyebrow="01:25–01:50 · 짝 발표 연습" title="3분 안에 시연하고 피드백을 받아요" intro="한 사람은 발표하고 한 사람은 처음 사용하는 관객이 되어 화면과 설명을 확인합니다.">
      <Activity title="3분 발표 연습" steps={["30초: 앱 이름, 사용자와 해결할 문제를 소개해요.", "30초: 데이터와 AI의 역할을 설명해요.", "1분: 대표 질문으로 앱을 시연하고 참고 자료를 보여줘요.", "30초: 바이브코딩으로 개선한 부분을 보여줘요.", "30초: 배운 점과 다음 계획을 말해요.", "짝은 이해하기 어려웠던 말 한 가지와 좋았던 점 한 가지를 알려줘요."]} />
    </LessonSection>

    <LessonSection id="presentation-ready" eyebrow="01:50–02:00 · 발표 준비 완료" title="내일 바로 열 수 있게 준비해요" intro="발표 순서와 링크를 마지막으로 확인하고 더 이상 코드를 변경하지 않습니다.">
      <Activity title="발표 전 저장할 것" steps={["최종 Vercel 주소를 쉽게 열 수 있는 곳에 저장해요.", "대표 질문과 예비 질문을 메모해요.", "발표 순서와 3분 시간을 확인해요.", "충전기와 인터넷 연결 등 발표 환경을 확인해요."]} />
      <Review items={[
        { question: "발표 중 앱이 열리지 않으면 어떻게 하나요?", answer: "미리 저장한 화면 캡처로 앱의 목적과 결과를 설명하고, 시연 질문과 예상 답변을 말해요." },
        { question: "모든 기능을 보여줘야 하나요?", answer: "아니요. 대표 질문 하나와 개선한 기능 하나를 안정적으로 보여주는 편이 더 이해하기 쉬워요." },
        { question: "7회차 결과물은 무엇인가요?", answer: "확정된 최종 배포 주소, 대표·예비 질문, 3분 발표 순서와 점검을 마친 앱이에요." },
      ]} />
    </LessonSection>
  </div>;
}
