import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';

import "./PostPage.scss";


SyntaxHighlighter.registerLanguage('javascript', js);


export const PostPage: React.FC = () => {
  const textAreaRef = createRef<HTMLTextAreaElement>();

  const post = {
    title: "Hello World",
    body: "This is my first post",
  };

  const [body, setBody] = useState(post.body);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (!textArea) {
      return;
    }

    const handleDrop = async (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const data = await handleUploadImage(e.dataTransfer.files[0]);

        const imageMarkdown = `![](/${data.link})`;
        const updatedBody =
          body.substr(0, textArea.selectionStart) +
          imageMarkdown +
          body.substr(textArea.selectionStart);

        setBody(updatedBody);

        const nextSelection = textArea.selectionStart + 2;
        textArea.setSelectionRange(nextSelection, nextSelection);

        e.dataTransfer.clearData();
      }
    };

    textArea.addEventListener("drop", handleDrop);

    return () => {
      textArea.removeEventListener("drop", handleDrop);
    };
  }, [textAreaRef]);

  function handleTextChanged(e: any) {
    setBody(e.currentTarget.value);
  }

  async function handleUploadImage(file: File) {
    let formData = new FormData();

    formData.append("image", file);

    const res = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });

    const jsonData = await res.json();
    return jsonData.data;
  }

  return (
    <div className="post-page">
      <div className="container">
        <h1 className="text-center" contentEditable suppressContentEditableWarning>
          {post.title}
        </h1>
      </div>
      <div className="split-view">
        <textarea
          ref={textAreaRef}
          className="post-page__body"
          onChange={handleTextChanged}
          value={body}
          rows={40}
        ></textarea>
        <div className="rendered">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                console.log(match && match[1])
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
            {body}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
