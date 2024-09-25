"use client";
import React, { useState } from "react";
import { IPost } from "../post-page";
import AttachmentSlider from "../attachment-slider";
import { CarouselApi } from "../ui/carousel";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import CommentSection from "./comments-section";

const PostContent = ({ post, isOwner = false }: { post: IPost, isOwner?: boolean }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const { title, attachments = [] } = post;

  return (
    <div className="flex flex-col md:flex-row gap-3 [&>*]:flex-1">
      <div className="w-full rounded-md overflow-hidden">
        <AttachmentSlider
          aspectRatio={9 / 8}
          attachments={attachments}
          setCarouselApi={setCarouselApi}
          carouselApi={carouselApi}
          showSlideIndex={attachments.length > 1}
        />
      </div>
      <div className="w-full flex flex-col gap-3 md:h-auto ">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{title}</h1>
          <div>
            {isOwner ? <Link replace href={`/post/edit/${post.id}`}>
              <Button className="w-8 h-8" variant="outline" size="icon">
                <Pencil size={16}/>
              </Button>
            </Link> : null}
          </div>
        </div>
        <div className="flex-1 bg-accent rounded-md">
          <CommentSection comments={post.comments || []} postId={post.id}/>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
