"use client";
import {
  base64ToBlobUrl,
  extractFileTypeFromBase64,
  isBase64,
} from "@/exports";
import getAverageColor from "get-average-color";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function PostImage({ imageBase64, averageBackgroundColor = true }) {
  const [image, setImage] = useState(imageBase64);
  const [averageColor, setAverageColor] = useState({ r: 0, g: 0, b: 0 });
  const { r, g, b } = averageColor;
  const [mediaType, setMediaType] = useState(null);
  useEffect(() => {
    (function convertBase64ToBlob() {
      try {
        if (!imageBase64) return;
        let isBase64Image;
        try {
          isBase64Image = isBase64(imageBase64);
        } catch (error) {
          isBase64Image = true;
        }
        if (!isBase64Image) return;
        const { mimeType, type } = extractFileTypeFromBase64(imageBase64);
        if (!mimeType && !type) return;
        setMediaType(type);
        const blob = base64ToBlobUrl(imageBase64, mimeType);
        console.log(blob);
        setImage(blob);
      } catch (error) {
        console.log(error);
        return;
      }
    })();

    const fetchData = async () => {
      if (averageBackgroundColor) {
        try {
          const isBase64Image = isBase64(image);
          if (isBase64Image) {
            const imageUrl = base64ToBlobUrl(image);
            try {
              const rgb = await getAverageColor(imageUrl);
              setAverageColor(rgb);
            } catch (error) {
              console.error("Error getting average color:", error);
              setAverageColor({ r: 0, g: 0, b: 0 });
            }
          }
        } catch (error) {
          return null;
        }
      }
    };

    fetchData();
  }, [imageBase64, averageBackgroundColor]);
  return (
    <div
      className="w-postWidth aspect-post relative"
      style={{
        backgroundColor: `rgb(${r}, ${g}, ${b})`,
      }}>
      {mediaType ? (
        mediaType.toLowerCase() === "video" ? (
          <video
            src={image}
            alt="Post_video"
            className="object-contain w-full h-full"
          />
        ) : (
          <Image
            src={image || imageBase64}
            alt="Post"
            fill
            className="object-contain"
          />
        )
      ) : null}
    </div>
  );
}

export function Post({ image, profile, description }) {
  return (
    <div>
      <div>
        <PostImage imageBase64={image} />
      </div>
    </div>
  );
}
