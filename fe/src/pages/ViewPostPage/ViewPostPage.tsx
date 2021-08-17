import React from "react";
import { Markdown } from "../../components/Markdown";

export const ViewPostPage: React.FC = () => {
  const post = {
    id: "1",
    title: "Title",
    body: "## This is a heading 2 <a href='https://google.ca'>Google</a>",
  };

  return (
    <div className="home-page">
      <div className="container">
        <h1>{post.title}</h1>
        <Markdown body={post.body} />
      </div>
    </div>
  );
};
