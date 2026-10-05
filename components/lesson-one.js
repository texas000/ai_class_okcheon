import Link from "next/link";
import { COURSE_SESSIONS } from "../lib/practice-guide.js";
import { SYLLABUS_DETAILS } from "../lib/lesson-one.js";

export default function LessonOne() {
  return (
    <div className="lesson-one">
      <section className="syllabus" aria-labelledby="syllabus-title">
        <div className="lesson-section-heading">
          <span className="eyebrow">SYLLABUS</span>
          <h2 id="syllabus-title">8회차, 이렇게 함께 배워요</h2>
          <p>질문하는 사람에서 만드는 사람으로. 4회차에 첫 배포를 경험하고, 마지막에는 내 앱을 직접 발표해요. 5~7회차 구성은 수업 진행에 맞춰 조정할 수 있어요.</p>
        </div>
        <div className="syllabus-table-wrap">
          <table className="syllabus-table">
            <caption className="sr-only">회차별 수업 내용과 결과물</caption>
            <thead><tr><th scope="col">회차</th><th scope="col">무엇을 배우나요?</th><th scope="col">함께 만들 결과물</th></tr></thead>
            <tbody>
              {SYLLABUS_DETAILS.map((item) => (
                <tr key={item.number}>
                  <th scope="row"><Link href={`/guide/${item.number}`}>{item.number}회차</Link></th>
                  <td><strong>{COURSE_SESSIONS.find((session) => session.number === item.number).title}</strong><span>{item.topic}</span></td>
                  <td>{item.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
