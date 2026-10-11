import Link from "next/link";
import LessonWorksheet from "./lesson-worksheet.js";
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

      <section className="course-section" aria-labelledby="lesson-one-introduction-title">
        <div className="lesson-section-heading">
          <span className="eyebrow">INTRODUCTION</span>
          <h2 id="lesson-one-introduction-title">서로를 알아가는 자기소개 활동지</h2>
          <p>정답은 없어요. 내가 좋아하는 것과 이번 수업에서 해보고 싶은 일을 편하게 적어보세요.</p>
        </div>
        <LessonWorksheet id="lesson-1-introduction" title="1회차 · 자기소개 활동지" fields={[
          { key: "introduction", label: "나를 한 문장으로 소개해요", example: "이름, 하는 일 또는 요즘 관심 있는 일을 함께 적어보세요." },
          { key: "favorite", label: "요즘 좋아하거나 자주 하는 것", example: "취미, 음식, 장소, 앱 등 무엇이든 괜찮아요." },
          { key: "ai_experience", label: "AI를 사용해 본 경험", example: "사용한 적이 없다면 ‘처음이에요’라고 적어도 좋아요." },
          { key: "class_goal", label: "이번 수업에서 배우고 싶은 것", example: "AI에게 질문하기, 앱 만들기, 배포하기 등 기대하는 내용을 적어보세요." },
          { key: "app_idea", label: "만들어 보고 싶은 앱 아이디어", example: "누구에게 어떤 도움을 주는 앱이면 좋을까요? 아직 없다면 관심 분야를 적어보세요." },
          { key: "promise", label: "함께 지키고 싶은 수업 약속", example: "서로의 질문을 존중하기, 비밀번호를 공유하지 않기 등 한 가지를 적어보세요." },
        ]} />
      </section>

    </div>
  );
}
