import { LESSON_PLANS } from "../lib/lesson-plans.js";

export function LessonSection({ id, eyebrow, title, intro, children }) {
  return <section id={id} className="course-section" aria-labelledby={`${id}-title`}>
    <div className="lesson-section-heading"><span className="eyebrow">{eyebrow}</span><h2 id={`${id}-title`}>{title}</h2>{intro && <p>{intro}</p>}</div>
    {children}
  </section>;
}

function clock(minutes) {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

export function LessonSchedule({ number, preparation }) {
  const plan = LESSON_PLANS[number];
  const total = plan.reduce((sum, block) => sum + block.minutes, 0);
  return <LessonSection id="lesson-schedule" eyebrow="TODAY’S PLAN" title="2시간, 이렇게 진행해요" intro={`총 ${total}분 · 휴식 10분 포함 · 시간은 수업 시작 시점 기준이에요. 제목을 누르면 해당 내용으로 이동해요.`}>
    <ol className="lesson-timeline">{plan.map((block, index) => {
      const start = plan.slice(0, index).reduce((sum, item) => sum + item.minutes, 0);
      return <li key={block.title} className={block.kind === "휴식" ? "is-break" : ""}>
        <span className="timeline-time">{clock(start)}–{clock(start + block.minutes)}<small>{block.minutes}분 · {block.kind}</small></span>
        <div>{block.target ? <a href={`#${block.target}`}>{block.title} <span aria-hidden="true">↗</span></a> : <strong>{block.title}</strong>}<p>{block.activity}</p></div>
      </li>;
    })}</ol>
    <aside className="lesson-example"><strong>수업 준비</strong><p>{preparation || "인터넷이 연결된 컴퓨터, 이 수업 페이지, 메모 도구를 준비해요. 채팅 실험은 강사가 API 연결을 확인한 앱에서 진행해요. 연결이 어려우면 질문을 작성하고 짝이 답변을 맡아 같은 활동을 해볼 수 있어요."}</p></aside>
  </LessonSection>;
}

export function Activity({ title, steps, children }) {
  return <article className="class-activity"><span className="activity-tag">함께 해보기</span><h3>{title}</h3><ol>{steps.map((step) => <li key={step}>{step}</li>)}</ol>{children}</article>;
}

export function Review({ items }) {
  return <div className="lesson-review">{items.map((item, index) => <details key={item.question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{item.question}</summary><p>{item.answer}</p></details>)}</div>;
}
