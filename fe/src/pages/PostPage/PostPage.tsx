import './PostPage.scss';

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createRef } from 'react';

import { Markdown } from '../../components/Markdown';


export const PostPage: React.FC = () => {
  const textAreaRef = createRef<HTMLTextAreaElement>();
  const titleRef = createRef<HTMLDivElement>();

  const [body, setBody] = useState("");

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

  async function handleSavePressed() {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: titleRef.current?.innerText,
        body
      }),
    });
  }

  return (
    <div className="post-page">
      <div className="container">
        <h1 ref={titleRef} contentEditable suppressContentEditableWarning></h1>
        <button className="text-right" onClick={handleSavePressed}>Save</button>
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
          <Markdown
            body={body}
          />
        </div>
      </div>
    </div>
  );
};
