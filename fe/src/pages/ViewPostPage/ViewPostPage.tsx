import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { postApi } from "../../apis/PostApi";
import { Markdown } from "../../components/Markdown";
import { Post } from "../../types/Post";

type ViewPostPageParams = {
  id: string;
}

export const ViewPostPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null)
  const params = useParams<ViewPostPageParams>();

  useEffect(() => {
    postApi.getPost(params.id).then(setPost)
  }, [params.id]);

  if (!post) {
    return null;
  }

  return (
    <div className="home-page">
      <div className="container">
        <h1>{post.title}</h1>
        <Markdown body={post.body} />
      </div>
    </div>
  );
};
