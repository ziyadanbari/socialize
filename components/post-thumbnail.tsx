"use client";
import React, { useState, useEffect } from "react";
import { generateVideoThumbnailViaUrl } from "@rajesh896/video-thumbnails-generator";
import { Post } from "@/types";
import { FastAverageColor } from "fast-average-color";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

const fac = new FastAverageColor();

const PostThumbnail = ({ id, title, attachments }: Post) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("");
  const firstAttachment = attachments[0];
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchBackgroundColor = async () => {
      if (thumbnail) {
        try {
          const bgColor = await fac.getColorAsync(thumbnail);
          setBackgroundColor(bgColor.rgba);
        } catch (error) {
          console.error("Error generating thumbnail:", error);
          setBackgroundColor("");
        }
      }
    };

    fetchBackgroundColor();
  }, [thumbnail]);
  useEffect(() => {
    const fetchThumbnail = async () => {
      if (firstAttachment && firstAttachment.type === "video") {
        try {
          const thumb = await generateVideoThumbnailViaUrl(
            firstAttachment.attachmentLink,
            1
          );
          setThumbnail(thumb);
          setIsLoading(false)
        } catch (error) {
          console.error("Error generating thumbnail:", error);
          setThumbnail("");
        }
      } else {
        setThumbnail(firstAttachment.attachmentLink);
        setIsLoading(false)
      }
    };

    fetchThumbnail();
  }, [firstAttachment]);
  return (
    <Link
      href={`/post/${id}`}
      className="relative aspect-[8/10] rounded-md cursor-pointer hover:opacity-80"
      style={{
        backgroundColor,
        backgroundImage: `url(${thumbnail})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      >
      {isLoading ? (
        <Skeleton className="w-full h-full absolute top-0 left-0 rounded-md z-20" />
      ) : (
        <>
          <div
            className="absolute bottom-5 left-2 text-2xl w-11/12 overflow-hidden text-ellipsis invert font-bold"
            style={{ color: backgroundColor }}>
            {title}
          </div>
        </>
      )}
    </Link>
  );
};

export default PostThumbnail;
