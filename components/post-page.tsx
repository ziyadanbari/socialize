"use client";
import { getPost } from "@/actions/getPost";
import { useToast } from "@/hooks/use-toast";
import { IAttachment, Post } from "@/types";
import { ActionError } from "@/utils/errors/serverAction.error";
import React, { useEffect, useState } from "react";
import LoadingCircle from "./ui/loading-circle";
import { prepareAttachments } from "@/utils/prepareAttachments";
import { useAppSelector } from "@/hooks/app";
import PostEditForm from "./posts/edit-post";
import { useSession } from "next-auth/react";
import PostContent from "./posts/post-content";

export interface IPost extends Omit<Post, "attachments"> {
  attachments?: IAttachment[];
}

const PostPage = ({ postId, editPage = false }: { postId: string, editPage?: boolean }) => {
  const {data} = useSession()
  const {user} = data || {}
  const { toast } = useToast();
  const posts = useAppSelector(state => state.postsReducer.posts)  
  const [post, setPost] = useState<IPost>();
  const isOwner = user?.id === post?.user?.id
  useEffect(() => {
    async function getPostById() {
      try {
        if (posts) {
          const post = posts.find(p => p.id === postId)
          if (post) {
            const structuredAttachments = await prepareAttachments(
              post.attachments
            );
            return setPost({...post, attachments: structuredAttachments});
          }
        }
        const { post, error } = await getPost(postId);
        if (error) throw new ActionError(error);
        if (!post) throw new ActionError("Something went wrong");
        const structuredAttachments = await prepareAttachments(
          post.attachments
        );
        setPost({ ...post, attachments: structuredAttachments });
      } catch (error: unknown) {
        console.log(error);
        toast({
          title: 
            error instanceof ActionError
              ? error.actionError
              : "Something went wrong!",
          variant: "destructive",
        });
      }
    }

    if (!postId) return;
    getPostById();
  }, [postId, posts, toast]);

  if (!postId) return <></>;

  return (
    <>
      {!post ? (
        <LoadingCircle />
      ) : isOwner && editPage ? (
        <PostEditForm post={post} onPostUpdate={setPost} />
      ) : (
        <PostContent post={post} isOwner={isOwner} />
      )}
    </>
  );
};

export default PostPage;
