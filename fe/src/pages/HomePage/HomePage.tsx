import React from "react";
import { Link } from "react-router-dom";

type Post = {
  id: string;
  title: string;
  body: string;
};

export const HomePage: React.FC = () => {
  const posts: Post[] = [
    {
      id: "1",
      title: "Title",
      body: "",
    },
  ];

  return (
    <div className="home-page">
      <div className="container">
        {posts.map((post) => {
          return <Link to={`/posts/${post.id}`}><div className="post">{post.title}</div></Link>;
        })}
      </div>
    </div>
  );
};
