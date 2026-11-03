"use client";

import { useState } from "react";
import { Activity, LessonSchedule, LessonSection, Review } from "./lesson-blocks.js";
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

export default function LessonEight() {
  return <div className="lesson-content">
    <aside className="lesson-example"><strong>오늘의 참고 자료</strong><p><a href={METAVERSE_SOURCE} target="_blank" rel="noreferrer">바이브마피아클럽 · 3D 메타버스 제작 가이드 ↗</a>의 제작 흐름을 참고해, 우리 수업에 맞는 설명과 프롬프트로 새로 구성했어요. 오늘은 직접 걸어 다니는 3D 웹 공간을 만듭니다.</p></aside>
    <LessonSchedule number={8} preparation="VS Code, 파일을 만들 수 있는 AI 코딩 도구, 인터넷 브라우저를 준비해요. 이전 앱과 별도로 my-3d-world 폴더를 만들어요. 함께 걷기 확장은 기본 실습을 마친 뒤 선택해요." />

    <LessonSection id="metaverse-map" eyebrow="00:00–00:10 · 원리" title="3D 공간도 웹사이트예요" intro="화면을 그리는 도구에 캐릭터, 조작, 소리를 하나씩 더해요. 링크를 공유하는 것과 다른 사람의 캐릭터가 보이는 것은 서로 다른 기능이에요.">
      <div className="course-table-wrap"><table className="course-table"><caption>내 3D 웹 공간의 구성</caption><thead><tr><th>구성</th><th>하는 일</th><th>오늘의 선택</th></tr></thead><tbody>
        <tr><th scope="row">three.js</th><td>카메라·빛·입체 도형을 화면에 그려요.</td><td>CDN에서 불러오기</td></tr>
        <tr><th scope="row">모양과 이동</th><td>건물과 캐릭터를 만들고 좌표를 바꿔요.</td><td>기본 도형과 키보드·터치</td></tr>
        <tr><th scope="row">Web Audio</th><td>브라우저에서 소리를 만들어요.</td><td>버튼을 누른 뒤 재생</td></tr>
        <tr><th scope="row">실시간 서버</th><td>접속한 사람들의 상태를 전달해요.</td><td>함께 걷기 선택 확장</td></tr>
      </tbody></table></div>
      <aside className="lesson-takeaway"><h3>작게 완성한 뒤 확장해요</h3><p>오늘의 기본 결과물은 혼자 탐험하는 공간이에요. 먼저 잘 걷고 멈추는지 확인한 뒤 꾸미기와 소리를 더합니다. 접속 주소만 같다고 다른 사람의 캐릭터가 자동으로 보이지는 않아요.</p></aside>
    </LessonSection>

    <LessonSection id="metaverse-ready" eyebrow="00:10–00:20 · 준비" title="빈 폴더에서 시작해요" intro="아래 프롬프트는 파일을 생성하고 실행할 수 있는 AI 코딩 도구에 보내요. 이 수업 사이트의 AI Chat은 코드 파일을 직접 만들거나 실행하지 않아요.">
      <Activity title="첫 실행 준비" steps={["my-3d-world 폴더를 만들고 VS Code와 AI 코딩 도구에서 열어요.", "아래 장소 중 하나를 골라 전체 프롬프트를 복사해 첫 메시지로 보내요.", "생성된 index.html을 확인하고 AI가 안내하는 로컬 HTTP 서버로 실행해요. 필요한 도구가 없으면 설치 방법부터 요청해요.", "안내받은 localhost 주소를 열어요. CDN 라이브러리는 인터넷 연결이 필요해요."]} />
      <p className="course-note">파일 더블클릭으로 열었을 때 모듈이나 보안 오류가 나면 로컬 서버로 실행해요. 오류 화면과 브라우저 콘솔 메시지를 같은 AI 대화에 전달해요.</p>
    </LessonSection>

    <LessonSection id="metaverse-prompts" eyebrow="00:20–00:50 · 만들기" title="다섯 장소 중 하나를 골라 만들어요" intro="각 요청에는 이동·카메라·휴대전화·소리 설정이 모두 들어 있어요. 장소 하나를 먼저 완성하고, 같은 대화에서 수정해요.">
      <div className="build-prompt-library">{METAVERSE_PLACES.map((place, index) => <PromptCard key={place.id} title={`${index + 1}. ${place.title}`} prompt={place.prompt}><p>{place.text}</p></PromptCard>)}</div>
      <Activity title="완성 순서 살펴보기" steps={["바닥·배경·조명 → 캐릭터와 이동 → 따라오는 카메라 순서로 확인해요.", "건물과 소품을 배치하고 벽이나 경계를 통과하지 않는지 확인해요.", "체험 버튼 → 소리 → 휴대전화 조작 순서로 하나씩 확인해요."]} />
    </LessonSection>

    <LessonSection id="metaverse-test" eyebrow="01:00–01:20 · 쉬는 시간 뒤 테스트" title="걷기부터 휴대전화까지 직접 시험해요" intro="화면이 예쁜 것과 기능이 되는 것을 따로 확인해요. 문제를 발견하면 입력·기대 결과·실제 결과를 함께 알려줘요.">
      <Activity title="기본 기능 확인 목록" steps={["WASD와 방향키로 네 방향을 움직이고 대각선 속도가 갑자기 빨라지지 않는지 봐요.", "벽과 경계에 닿아도 통과하거나 화면 밖으로 사라지지 않는지 확인해요.", "체험 장소에서만 버튼이 나오고, 두 번 누르면 기본 상태로 돌아오는지 확인해요.", "소리 켜기·끄기가 작동하고 새로고침 후에는 자동으로 큰 소리가 나지 않는지 확인해요.", "창을 좁혀 화면을 확인하고, 휴대전화 접속 주소를 AI에게 안내받아 실제 터치 이동도 확인해요. 휴대전화의 localhost는 컴퓨터를 가리키지 않아요.", "로딩 실패나 빈 화면이 나오면 콘솔 오류와 실행 주소를 기록해 AI에게 전달해요."]} />
    </LessonSection>

    <LessonSection id="metaverse-remix" eyebrow="01:20–01:35 · 내 공간으로 바꾸기" title="장소·캐릭터·체험·소리를 바꿔요" intro="옥천의 산책길이나 내가 꿈꾸는 작업실처럼, 네 가지를 정하면 나만의 공간이 됩니다.">
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

    <LessonSection id="metaverse-together" eyebrow="01:35–01:45 · 선택 확장" title="여러 사람이 함께 걷게 하려면?" intro="WebSocket은 연결을 유지하며 상태를 주고받고, Durable Object는 같은 방의 접속자들을 관리해요. 기본 실습이 끝났다면 아래 요청을 같은 대화에 이어서 보내요.">
      <PromptCard title="실시간 서버 연결 요청" prompt={MULTIPLAYER_PROMPT} />
      <p className="course-note">확장 실습에는 Cloudflare 계정과 별도 서버 배포가 필요해요. 로컬의 두 창에서 확인한 뒤 공개하고, 현재 요금과 사용 한도를 공식 문서에서 확인해요. 정적 화면만 Vercel에 올려서는 이 Cloudflare 서버가 함께 배포되지 않아요.</p>
      <div className="lesson-references"><span>확장 공식 문서</span><a href="https://developers.cloudflare.com/durable-objects/" target="_blank" rel="noreferrer">Durable Objects ↗</a><a href="https://developers.cloudflare.com/durable-objects/best-practices/websockets/" target="_blank" rel="noreferrer">WebSocket 연결 ↗</a><a href="https://developers.cloudflare.com/durable-objects/platform/pricing/" target="_blank" rel="noreferrer">요금 확인 ↗</a></div>
    </LessonSection>

    <LessonSection id="metaverse-share" eyebrow="01:45–02:00 · 공유와 발표" title="내 공간을 보여주고 제작 경험을 나눠요" intro="오늘 만든 공간 또는 이전 수업의 앱을 시연해요. 어떤 요청을 했고 무엇을 고쳤는지 함께 소개해요.">
      <Activity title="시연과 마무리" steps={["장소 이름과 고른 이유를 말하고 이동·체험 버튼을 보여줘요.", "처음 요청과 수정 요청을 비교하고, 잘된 점과 다음에 개선할 점을 나눠요.", "프롬프트·실행 방법·확인 결과를 저장하고 코드를 GitHub에 기록해요.", "혼자 걷는 정적 사이트는 7회차의 GitHub → Vercel 흐름으로 배포해요. 배포 주소에서 CDN 로딩과 이동을 다시 확인해요.", "함께 걷기를 구현했다면 Cloudflare 배포 주소를 사용하고 서로 다른 두 기기에서 같은 방에 들어가 확인해요."]} />
      <aside className="lesson-example"><strong>작품 발표 자료 제출</strong><p>작품 발표 자료는 PDF로 변환한 뒤 <a href="mailto:texas000@naver.com">texas000@naver.com</a>으로 보내주세요.</p></aside>
    </LessonSection>
  </div>;
}
