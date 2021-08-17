import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { postApi } from "../../apis/PostApi";
import { Post } from "../../types/Post";

export const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    postApi.getPosts().then(setPosts)
  }, [])

  return (
    <div className="home-page">
      <div className="container">
        {posts.map((post) => {
          return <Link to={`/posts/${post._id}`}><div className="post">{post.title}</div></Link>;
        })}
      </div>
    </div>
  );
};
