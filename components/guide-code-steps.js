import Icon from "./icon.js";

// 여러 회차에서 같은 코드 실습을 재사용해요. 4회차에서는 화면 변경 활동 안에 배치합니다.
export default function GuideCodeSteps({ steps, isLoading, onPrompt }) {
  return <>
    {steps.length > 0 && <h3 className="lesson-practice-title">직접 해보는 코드 실습</h3>}
    {steps.map((step) => <article className="guide-step" key={step.number}>
      <span className="step-number">{step.number}</span>
      <div><h2>{step.title}</h2><p>{step.text}</p><div className="code-file"><Icon name="code" size={15} />{step.file}</div><pre><code>{step.code}</code></pre>{step.prompts && <div className="guide-prompts">{step.prompts.map((prompt) => <button key={prompt} disabled={isLoading} onClick={() => onPrompt(prompt)}><Icon name="chat" size={14} />{prompt}<Icon name="chevron" size={14} /></button>)}</div>}</div>
    </article>)}
  </>;
}
