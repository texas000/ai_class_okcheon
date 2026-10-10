"use client";

import { useState } from "react";

const CHECKS = ["GitHub 가입과 로그인을 마쳤어요.", "NVIDIA Build에서 개인용 API 키를 발급받았어요.", "수업용 저장소 이름을 확인했어요.", "Vercel에 NVIDIA_API_KEY를 입력했어요.", "Vercel 배포 상태가 Ready예요.", "완성된 앱에서 질문과 답변을 확인했어요.", "내 Vercel 앱 주소를 안전하게 기록했어요."];

export default function DeploymentChecklist() {
  const [checked, setChecked] = useState([]);
  return <div className="deployment-checklist"><div><h3>하나씩 확인해요</h3><span role="status">{checked.length} / {CHECKS.length} 확인</span></div><p>끝난 항목에만 표시해요. 이 표에는 API 키를 적지 않습니다. 페이지를 나가면 표시는 초기화돼요.</p><ul>{CHECKS.map((item, index) => <li key={item}><label><input type="checkbox" checked={checked.includes(index)} onChange={(event) => setChecked((previous) => event.target.checked ? [...previous, index] : previous.filter((value) => value !== index))} /><span>{item}</span></label></li>)}</ul></div>;
}
