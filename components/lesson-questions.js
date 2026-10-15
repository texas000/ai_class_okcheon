export default function LessonQuestions({ id, title, questions }) {
  return <section id={id} className="lesson-questions" aria-labelledby={`${id}-title`}>
    <h3 id={`${id}-title`}>{title}</h3>
    <p className="lesson-questions-intro">질문을 하나씩 생각하고 짝과 이야기해보세요. 필요한 내용은 개인 메모에 정리해도 좋아요.</p>
    <ol className="lesson-question-list">{questions.map(({ key, question, hint }) => <li key={key}>
      <h4>{question}</h4>
      {hint && <p>{hint}</p>}
    </li>)}</ol>
  </section>;
}
