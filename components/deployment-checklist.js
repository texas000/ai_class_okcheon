"use client";

import { useState } from "react";

const CHECKS = ["내 GitLab 프로젝트에 화면 수정 커밋이 있어요.", "Vercel 배포가 Ready이며 커밋 기록이 일치해요.", "배포 주소에서 이름·첫 인사·색상이 보여요.", "풍미당 주소 답변이 조금씩 표시되고 CSV 근거를 확인했어요.", "휴대폰에서도 입력창·버튼·답변을 사용할 수 있어요.", "첫 인사를 다시 커밋하고 새 배포에 반영된 것을 확인했어요."];

export default function DeploymentChecklist() {
  const [checked, setChecked] = useState([]);
  return <div className="deployment-checklist"><div><h3>내가 확인한 배포 점검표</h3><span role="status">{checked.length} / {CHECKS.length} 확인</span></div><p>실제 앱에서 확인한 항목만 표시해요. 이 체크는 배포를 실행하거나 성공 여부를 자동 검사하지 않아요. 페이지를 나가면 초기화됩니다.</p><ul>{CHECKS.map((item, index) => <li key={item}><label><input type="checkbox" checked={checked.includes(index)} onChange={(event) => setChecked((previous) => event.target.checked ? [...previous, index] : previous.filter((value) => value !== index))} /><span>{item}</span></label></li>)}</ul></div>;
}
