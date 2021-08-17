import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { postApi } from "../../apis/PostApi";

type Post = {
  id: string;
  title: string;
  body: string;
};

export const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    postApi.getPosts().then(setPosts)
  }, [])

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
