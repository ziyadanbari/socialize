import React, { ReactNode, useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import { IAttachment, SetState } from "@/types";
import { Badge } from "./ui/badge";

const AttachmentSlider = ({
  customDom,
  attachments,
  setCarouselApi,
  carouselApi,
  showSlideIndex = true,
  aspectRatio,
}: {
  customDom?: (file: IAttachment, index: number) => ReactNode;
  setCarouselApi: SetState<CarouselApi>;
  carouselApi: CarouselApi;
  attachments: IAttachment[];
  showSlideIndex?: boolean;
  aspectRatio?: number;
}) => {
  const [currentAttachmentIndex, setCurrentAttachmentIndex] =
    useState<number>();
  useEffect(() => {
    carouselApi?.on("select", (api) => {
      setCurrentAttachmentIndex(api.selectedScrollSnap());
    });
    carouselApi?.on("slidesChanged", (api) => {
      setCurrentAttachmentIndex(api.selectedScrollSnap());
    });
  }, [carouselApi]);
  currentAttachmentIndex;
  return (
    <Carousel className="w-full h-full mx-auto" setApi={setCarouselApi}>
      {showSlideIndex ? (
        <div className="absolute  top-4 left-4 z-50">
          <Badge variant={"secondary"}>
            {(currentAttachmentIndex || 0) + 1} / {attachments.length}
          </Badge>
        </div>
      ) : null}
      <CarouselContent>
        {attachments.map((file, index) => (
          <CarouselItem
            className="w-full aspect-[9/5] relative select-none"
            style={{
              background: file.backgroundColor ?? "black",
              aspectRatio: aspectRatio,
            }}
            key={index}>
            <div className="relative w-full h-full">
              {file.type === "image" ? (
                <Image
                  src={file.file}
                  alt={`Preview ${index}`}
                  layout="fill"
                  objectFit="contain"
                />
              ) : (
                <video src={file.file} controls className="w-full h-full" />
              )}
            </div>
            {customDom ? customDom(file, index) : null}
          </CarouselItem>
        ))}
      </CarouselContent>
      {attachments.length > 1 ? (
        <>
          <CarouselPrevious />
          <CarouselNext />{" "}
        </>
      ) : null}
    </Carousel>
  );
};

export default AttachmentSlider;
