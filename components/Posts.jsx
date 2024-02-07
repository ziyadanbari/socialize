"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  PostImage,
  SquarePen,
  Trash2,
  extractFileTypeFromBase64,
} from "@/exports";

const ICON_SIZE = 16;

export default function Posts({
  images,
  selfUser,
  deleteFunction,
  editFunction,
}) {
  const [api, setApi] = useState(null);
  const [slidesCount, setSlidesCount] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(1); // Start from first slide
  const previousImages = useRef([]);

  useEffect(() => {
    if (!api) return;

    setSlidesCount(images.length);

    if (images.length > previousImages.current.length) {
      api.scrollTo(images.length - 1, true);
      previousImages.current = images;
    }

    const handleSelect = () => {
      setCurrentSlide(api.selectedScrollSnap() + 1);
    };

    const handleSlidesChanged = () => {
      setCurrentSlide(images.length);
      if (api.selectedScrollSnap() + 1 === images.length) return;
      api.scrollTo(images.length - 1, true);
    };

    api.on("select", handleSelect);
    api.on("slidesChanged", handleSlidesChanged);

    return () => {
      api.off("select", handleSelect);
      api.off("slidesChanged", handleSlidesChanged);
    };
  }, [api, images]);

  return (
    <div>
      <Carousel setApi={setApi}>
        <div className="absolute top-3 right-3 z-50">
          <Badge className="rounded-sm">
            {currentSlide} / {slidesCount}
          </Badge>
        </div>
        <CarouselContent className="relative !m-0">
          {images.map((image, i) => {
            const { type } = extractFileTypeFromBase64(image);
            return (
              <CarouselItem key={i} className="relative !p-0">
                <PostImage imageBase64={image} />
                {selfUser && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <div>
                      <Button
                        size="icon"
                        className="text-red-600"
                        onClick={() => deleteFunction(i)}>
                        <Trash2 size={ICON_SIZE} />
                      </Button>
                    </div>
                    {type?.toLowerCase() === "image" && (
                      <div>
                        <Button size="icon" onClick={() => editFunction(i)}>
                          <SquarePen size={ICON_SIZE} />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CarouselItem>
            );
          })}
          '
        </CarouselContent>
        {slidesCount > 1 && (
          <>
            {currentSlide > 1 && <CarouselPrevious />}
            {currentSlide < slidesCount && <CarouselNext />}
          </>
        )}
      </Carousel>
    </div>
  );
}
