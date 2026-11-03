"use client";

import { useState } from "react";
import { Activity, LessonSection, Review } from "./lesson-blocks.js";
import { METAVERSE_PLACES, METAVERSE_SOURCE, MULTIPLAYER_PROMPT } from "../lib/lesson-eight.js";

function PromptCard({ title, prompt, children }) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setStatus("복사했어요. AI 코딩 도구에 붙여 넣어 주세요.");
    } catch {
      setStatus("자동 복사가 되지 않아요. 아래 내용을 직접 선택해서 복사해 주세요.");
    }
  }
  return <details className="build-prompt-item">
    <summary><span aria-hidden="true">↗</span><strong>{title}</strong><small>열어서 복사하기</small></summary>
    <div className="build-prompt-body">
      {children}
      <button className="lesson-action" type="button" onClick={copy}>프롬프트 전체 복사</button>
      <p className="course-note" role="status">{status}</p>
      <pre><code>{prompt}</code></pre>
    </div>
  </details>;
}

function MetaverseReference() {
  return <div className="lesson-content">
    <aside className="lesson-example"><strong>추가 학습 참고자료</strong><p><a href={METAVERSE_SOURCE} target="_blank" rel="noreferrer">바이브마피아클럽 · 3D 메타버스 제작 가이드 ↗</a>의 제작 흐름을 참고해 설명과 프롬프트를 구성했어요. 수업 후 새로운 작품을 만들어 보고 싶을 때 활용해 주세요.</p></aside>

    <LessonSection id="metaverse-map" eyebrow="참고자료 · 원리" title="3D 공간도 웹사이트예요" intro="화면을 그리는 도구에 캐릭터, 조작, 소리를 하나씩 더해요. 링크를 공유하는 것과 다른 사람의 캐릭터가 보이는 것은 서로 다른 기능이에요.">
      <div className="course-table-wrap"><table className="course-table"><caption>내 3D 웹 공간의 구성</caption><thead><tr><th>구성</th><th>하는 일</th><th>구현 예시</th></tr></thead><tbody>
        <tr><th scope="row">three.js</th><td>카메라·빛·입체 도형을 화면에 그려요.</td><td>CDN에서 불러오기</td></tr>
        <tr><th scope="row">모양과 이동</th><td>건물과 캐릭터를 만들고 좌표를 바꿔요.</td><td>기본 도형과 키보드·터치</td></tr>
        <tr><th scope="row">Web Audio</th><td>브라우저에서 소리를 만들어요.</td><td>버튼을 누른 뒤 재생</td></tr>
        <tr><th scope="row">실시간 서버</th><td>접속한 사람들의 상태를 전달해요.</td><td>함께 걷기 선택 확장</td></tr>
      </tbody></table></div>
      <aside className="lesson-takeaway"><h3>작게 완성한 뒤 확장해요</h3><p>먼저 만들 결과물은 혼자 탐험하는 공간이에요. 먼저 잘 걷고 멈추는지 확인한 뒤 꾸미기와 소리를 더합니다. 접속 주소만 같다고 다른 사람의 캐릭터가 자동으로 보이지는 않아요.</p></aside>
    </LessonSection>

    <LessonSection id="metaverse-ready" eyebrow="참고자료 · 준비" title="빈 폴더에서 시작해요" intro="아래 프롬프트는 파일을 생성하고 실행할 수 있는 AI 코딩 도구에 보내요. 이 수업 사이트의 AI Chat은 코드 파일을 직접 만들거나 실행하지 않아요.">
      <Activity title="첫 실행 준비" steps={["my-3d-world 폴더를 만들고 VS Code와 AI 코딩 도구에서 열어요.", "아래 장소 중 하나를 골라 전체 프롬프트를 복사해 첫 메시지로 보내요.", "생성된 index.html을 확인하고 AI가 안내하는 로컬 HTTP 서버로 실행해요. 필요한 도구가 없으면 설치 방법부터 요청해요.", "안내받은 localhost 주소를 열어요. CDN 라이브러리는 인터넷 연결이 필요해요."]} />
      <p className="course-note">파일 더블클릭으로 열었을 때 모듈이나 보안 오류가 나면 로컬 서버로 실행해요. 오류 화면과 브라우저 콘솔 메시지를 같은 AI 대화에 전달해요.</p>
    </LessonSection>

    <LessonSection id="metaverse-prompts" eyebrow="참고자료 · 만들기" title="다섯 장소 중 하나를 골라 만들어요" intro="각 요청에는 이동·카메라·휴대전화·소리 설정이 모두 들어 있어요. 장소 하나를 먼저 완성하고, 같은 대화에서 수정해요.">
      <div className="build-prompt-library">{METAVERSE_PLACES.map((place, index) => <PromptCard key={place.id} title={`${index + 1}. ${place.title}`} prompt={place.prompt}><p>{place.text}</p></PromptCard>)}</div>
      <Activity title="완성 순서 살펴보기" steps={["바닥·배경·조명 → 캐릭터와 이동 → 따라오는 카메라 순서로 확인해요.", "건물과 소품을 배치하고 벽이나 경계를 통과하지 않는지 확인해요.", "체험 버튼 → 소리 → 휴대전화 조작 순서로 하나씩 확인해요."]} />
    </LessonSection>

    <LessonSection id="metaverse-test" eyebrow="참고자료 · 테스트" title="걷기부터 휴대전화까지 직접 시험해요" intro="화면이 예쁜 것과 기능이 되는 것을 따로 확인해요. 문제를 발견하면 입력·기대 결과·실제 결과를 함께 알려줘요.">
      <Activity title="기본 기능 확인 목록" steps={["WASD와 방향키로 네 방향을 움직이고 대각선 속도가 갑자기 빨라지지 않는지 봐요.", "벽과 경계에 닿아도 통과하거나 화면 밖으로 사라지지 않는지 확인해요.", "체험 장소에서만 버튼이 나오고, 두 번 누르면 기본 상태로 돌아오는지 확인해요.", "소리 켜기·끄기가 작동하고 새로고침 후에는 자동으로 큰 소리가 나지 않는지 확인해요.", "창을 좁혀 화면을 확인하고, 휴대전화 접속 주소를 AI에게 안내받아 실제 터치 이동도 확인해요. 휴대전화의 localhost는 컴퓨터를 가리키지 않아요.", "로딩 실패나 빈 화면이 나오면 콘솔 오류와 실행 주소를 기록해 AI에게 전달해요."]} />
    </LessonSection>

    <LessonSection id="metaverse-remix" eyebrow="참고자료 · 응용" title="장소·캐릭터·체험·소리를 바꿔요" intro="옥천의 산책길이나 내가 꿈꾸는 작업실처럼, 네 가지를 정하면 나만의 공간이 됩니다.">
      <PromptCard title="나만의 장소로 바꾸는 요청" prompt={`현재 이동과 카메라 기능을 유지하면서 장소를 바꿔줘.
장소와 소품: [예: 포도밭 사이 산책길과 작은 쉼터]
내 캐릭터: [예: 밀짚모자를 쓴 농부]
버튼과 체험: [예: 쉼터에서 포도 바구니 들어 보기]
배경 소리: [예: 나뭇잎 흔들리는 소리]
변경 후 이동·충돌·체험 종료·휴대전화 조작을 다시 확인해줘.`} />
      <Review items={[
        { question: "캐릭터가 너무 멀리 보여요.", answer: "‘캐릭터 크기와 카메라 거리를 조정해줘. 이동 방향은 그대로 유지해줘’라고 요청하고 같은 위치에서 비교해요." },
        { question: "휴대전화에서 움직임이 끊겨요.", answer: "‘그림자·도형 수·렌더링 해상도를 줄여줘’라고 요청해요. 변경 뒤 터치 조작과 화면 회전도 다시 확인해요." },
        { question: "기능을 더하니 원래 이동이 안 돼요.", answer: "새 기능과 함께 무엇이 바뀌었는지 알려주고 이동 기능부터 복구해요. 잘되던 버전은 Git으로 기록해 두면 비교하기 좋아요." },
      ]} />
    </LessonSection>

    <LessonSection id="metaverse-together" eyebrow="참고자료 · 선택 확장" title="여러 사람이 함께 걷게 하려면?" intro="WebSocket은 연결을 유지하며 상태를 주고받고, Durable Object는 같은 방의 접속자들을 관리해요. 기본 실습이 끝났다면 아래 요청을 같은 대화에 이어서 보내요.">
      <PromptCard title="실시간 서버 연결 요청" prompt={MULTIPLAYER_PROMPT} />
      <p className="course-note">확장 실습에는 Cloudflare 계정과 별도 서버 배포가 필요해요. 로컬의 두 창에서 확인한 뒤 공개하고, 현재 요금과 사용 한도를 공식 문서에서 확인해요. 정적 화면만 Vercel에 올려서는 이 Cloudflare 서버가 함께 배포되지 않아요.</p>
      <div className="lesson-references"><span>확장 공식 문서</span><a href="https://developers.cloudflare.com/durable-objects/" target="_blank" rel="noreferrer">Durable Objects ↗</a><a href="https://developers.cloudflare.com/durable-objects/best-practices/websockets/" target="_blank" rel="noreferrer">WebSocket 연결 ↗</a><a href="https://developers.cloudflare.com/durable-objects/platform/pricing/" target="_blank" rel="noreferrer">요금 확인 ↗</a></div>
    </LessonSection>

  </div>;
}

export default function LessonEight() {
  return <div className="lesson-content">
    <LessonSection id="application-presentation" eyebrow="8회차 · 작품 발표" title="내가 만든 애플리케이션을 소개해요" intro="그동안 만든 앱을 직접 시연하고, 제작하면서 배운 점과 다음에 개선할 점을 나눠요.">
      <Activity title="발표 순서" steps={["앱 이름과 만들게 된 이유, 누구에게 도움이 되는 앱인지 소개해요.", "배포한 앱을 열어 주요 기능과 대표 동작을 직접 시연해요.", "AI에게 어떤 요청을 했고, 어떤 문제를 어떻게 고쳤는지 이야기해요.", "만들면서 배운 점과 앞으로 개선하고 싶은 점을 나눠요.", "친구의 발표를 듣고 좋았던 점과 궁금한 점을 이야기해요."]} />
      <aside className="lesson-example"><strong>작품 발표 자료 제출</strong><p>작품 발표 자료는 PDF로 변환한 뒤 <a href="mailto:texas000@naver.com">texas000@naver.com</a>으로 보내주세요.</p></aside>
    </LessonSection>

    <section className="course-section" aria-labelledby="metaverse-reference-title">
      <div className="lesson-section-heading"><span className="eyebrow">추가 참고자료</span><h2 id="metaverse-reference-title">바이브코딩으로 3D 메타버스 만들기</h2><p>발표 후 관심 있는 분들이 살펴볼 수 있는 자료예요. 제작 원리와 장소별 프롬프트, 수정 방법을 담았어요.</p></div>
      <details className="build-prompt-item">
        <summary><span aria-hidden="true">↗</span><strong>3D 메타버스 참고자료 펼치기</strong><small>선택 학습</small></summary>
        <div className="build-prompt-body"><MetaverseReference /></div>
      </details>
    </section>
  </div>;
}
