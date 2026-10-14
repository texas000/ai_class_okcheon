"use client";

import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const plugins = [remarkGfm];
const elements = {
  a: ({ children, href, title }) => <a href={href} title={title} target="_blank" rel="noreferrer">{children}</a>,
};

// 새 답변이 스트리밍될 때 이미 완성된 이전 답변을 다시 파싱하지 않아요.
export default memo(function MessageMarkdown({ content }) {
  return <ReactMarkdown remarkPlugins={plugins} components={elements}>{content}</ReactMarkdown>;
});
