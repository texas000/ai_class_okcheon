import Link from "next/link";
import { COURSE_SESSIONS, GUIDE_STEPS } from "../lib/practice-guide.js";
import Icon from "./icon.js";
import LessonOne from "./lesson-one.js";
import LessonTwo from "./lesson-two.js";
import LessonThree from "./lesson-three.js";
import LessonFour from "./lesson-four.js";
import GuideCodeSteps from "./guide-code-steps.js";

// 회차의 내용은 lib/practice-guide.js에서 바꾸고, 화면 배치는 이곳에서 바꿉니다.
export default function PracticeGuide({ sessionNumber, restaurantSummary, isLoading, onPrompt, onChat }) {
  const session = COURSE_SESSIONS.find((item) => item.number === sessionNumber);
  const steps = session.stepNumbers.map((number) => GUIDE_STEPS.find((step) => step.number === number));

  const codePractice = <GuideCodeSteps steps={steps} isLoading={isLoading} onPrompt={onPrompt} />;

  return (
    <div className="guide-scroll" key={session.number}>
      <div className="guide-content course-content">
        <section className="lesson-header" aria-labelledby="lesson-title">
          <div className="lesson-meta"><span>AI CLASS · {session.number}회차 / 8회차</span><span>{session.duration ? `총 ${session.duration}분 · 활동지 포함` : session.number === 1 ? "자기소개 · 수업 안내" : "수업 자료 추가 예정"}</span></div>
          <h1 id="lesson-title">{session.title}</h1>
          <p>{session.description}</p>
          {session.number >= 5 && session.number <= 7 && <small>이 회차의 구성은 초안이며, 수업 진행에 맞게 조정할 수 있어요.</small>}
        </section>

        <div className="lesson-overview">
          <section className="lesson-card">
            <h3><Icon name="bulb" size={18} />오늘의 목표</h3>
            <ul>{session.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
          </section>
          <section className="lesson-card">
            <h3><Icon name="pen" size={18} />함께 할 활동</h3>
            <ol>{session.activities.map((activity) => <li key={activity}>{activity}</li>)}</ol>
          </section>
        </div>

        {session.number === 1 && <LessonOne />}
        {session.number === 2 && <LessonTwo isLoading={isLoading} onPrompt={onPrompt} />}
        {session.number === 3 && <LessonThree />}
        {session.number === 4 && <LessonFour codePractice={codePractice} />}

        {session.placeholders.length > 0 && <section className="lesson-materials" aria-label="수업 자료 자리">
          <h3>수업 자료와 활동지</h3>
          <p className="materials-intro">아래는 앞으로 수업 내용을 채워 넣을 자리예요.</p>
          {session.placeholders.map((placeholder) => (
            <article className="lesson-placeholder" key={placeholder.title}>
              <span className="placeholder-icon"><Icon name="book" size={20} /></span>
              <div><span className="placeholder-label">자료 준비 중</span><h4>{placeholder.title}</h4><p>{placeholder.text}</p></div>
            </article>
          ))}
        </section>}

        {session.showDataset && (
          <div className="guide-dataset">
            <span className="eyebrow">오늘의 실습 데이터</span>
            <h2>{restaurantSummary.filename}</h2>
            <p>등록 업소 {restaurantSummary.total.toLocaleString()}개 · 기준일 {restaurantSummary.dates.join(", ")}</p>
            <div className="dataset-types">
              {Object.entries(restaurantSummary.byType).map(([type, count]) => <span key={type}>{type} <strong>{count.toLocaleString()}</strong></span>)}
            </div>
            <p className="dataset-limits">사용할 수 있는 정보: 업소명·업종·도로명 주소·기준일<br />원본에 없는 정보: 메뉴·영업시간·가격·전화번호·별점</p>
          </div>
        )}
        {session.number !== 4 && codePractice}
        <div className="course-footer">
          <button className="guide-back" onClick={onChat}>AI와 대화해 보기<Icon name="chevron" size={16} /></button>
          <nav className="lesson-pagination" aria-label="이전 다음 회차">
            {session.number > 1 && <Link href={`/guide/${session.number - 1}`}>← {session.number - 1}회차</Link>}
            {session.number < 8 && <Link href={`/guide/${session.number + 1}`}>{session.number + 1}회차 →</Link>}
          </nav>
        </div>
      </div>
    </div>
  );
}
