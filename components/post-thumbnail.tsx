"use client";
import React, { useState, useEffect } from "react";
import { generateVideoThumbnailViaUrl } from "@rajesh896/video-thumbnails-generator";
import { Post } from "@/types";
import { useRouter } from "next/navigation";
import { FastAverageColor } from "fast-average-color";

const fac = new FastAverageColor();

const PostThumbnail = ({ id, title, attachments }: Post) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("");
  const firstAttachment = attachments[0];
  const router = useRouter();

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
        } catch (error) {
          console.error("Error generating thumbnail:", error);
          setThumbnail("");
        }
      } else {
        setThumbnail(firstAttachment.attachmentLink);
      }
    };

    fetchThumbnail();
  }, [firstAttachment]);
  return (
    <div
      className="relative aspect-[8/10] rounded-md cursor-pointer hover:opacity-80"
      style={{
        backgroundColor,
        backgroundImage: `url(${thumbnail})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onClick={() => {
        router.push(`/explore/${id}`);
      }}>
      <div className="absolute bottom-5 left-2 text-2xl w-11/12 overflow-hidden text-ellipsis invert font-bold" style={{color:backgroundColor}}>
        {title}
      </div>
    </div>
  );
};

export default PostThumbnail;
