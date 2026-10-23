import { FEATURE_IDEAS } from "../lib/feature-ideas.js";

export default function FeatureIdeas() {
  return <div className="build-prompt-library">
    {FEATURE_IDEAS.map((app, index) => <details className="build-prompt-item" key={app.title}>
      <summary><span>{index + 1}</span><strong>{app.title}</strong><small>추천 기능 4개 펼치기</small></summary>
      <div className="build-prompt-body">
        {app.features.map((feature) => <article className="lesson-example" key={feature.title}>
          <h3>{feature.title}</h3>
          <p><strong>연결 기술:</strong> {feature.technology}</p>
          <p>{feature.description}</p>
          <p><strong>사용 흐름:</strong> {feature.flow}</p>
          <p className="course-note"><strong>함께 생각할 점:</strong> {feature.note}</p>
        </article>)}
      </div>
    </details>)}
  </div>;
}
