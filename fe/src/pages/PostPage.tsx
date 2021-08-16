import React from "react";
import { useEffect } from "react";
import Quill from "quill";

export const PostPage: React.FC = () => {
  const post = {
    title: "Hello World",
    body: "This is my first post",
  };

  useEffect(() => {
    new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      },
    })
  }, [])

  return (
    <div className="post-page">
      <div className="container">
        <h1>{post.title}</h1>
        <div id="editor" className="post-page__body">{post.body}</div>
      </div>
    </div>
  );
};
