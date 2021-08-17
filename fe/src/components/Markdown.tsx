import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';

SyntaxHighlighter.registerLanguage('javascript', js);

type MarkdownProps = {
  body: string;
}

export const Markdown: React.FC<MarkdownProps> = (props) => {
  return (<ReactMarkdown
    rehypePlugins={[rehypeRaw]}
    remarkPlugins={[remarkGfm]}
    components={{
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, "")}
            style={docco}
            language={match[1]}
            PreTag="div"
            // {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      },
    }}
  >
    {props.body}
  </ReactMarkdown>)
}