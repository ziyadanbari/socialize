"use client";
import { useRef } from "react";
import { Button } from "@/exports";
import Cropper from "react-cropper";
export default function ImageCropper({ image, setImage }) {
  const cropperRef = useRef(null);

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-50 bg-black/50">
      <div className="flex flex-col gap-3">
        <Cropper
          src={image}
          width={"270px"}
          height={"100%"}
          minCanvasHeight={"100%"}
          background={false}
          minCropBoxHeight={"100%"}
          className=" w-postWidth aspect-[9/16]"
          ref={cropperRef}
          zoomable={false}
          rotatable
        />
        <div className="self-end">
          <Button
            onClick={() =>
              setImage(
                cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
              )
            }>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
