"use client";
import React from "react";
import PostPage from "@/components/post-page";

const Post = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <PostPage postId={id} />
    </>
  );
};

export default Post;
