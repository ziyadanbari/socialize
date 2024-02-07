"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Plus, PostImage, Posts, getBase64 } from "@/exports";
import ImageCropper from "./ImageCropper";

function AddImageButton({ register, onFileChange, variant, className }) {
  return (
    <>
      <input
        type="file"
        hidden
        id="post_input"
        {...register("images", {
          required: true,
          onChange: onFileChange,
        })}
      />
      <Button
        className={`border-[1px] border-dotted border-gray-400 ${className}`}
        variant={variant || "ghost"}>
        <label
          htmlFor="post_input"
          className="block w-full h-full cursor-pointer">
          <div className="flex items-center gap-2">
            <div>
              <Plus />
            </div>
            <div>Add your image post</div>
          </div>
        </label>
      </Button>
    </>
  );
}

export default function AddPostForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const [images, setImages] = useState([]);
  const [showCropping, setShowCropping] = useState(false);
  const [croppingImage, setCroppingImage] = useState("");
  const onFileChange = async (e) => {
    const media = e.target.files[0];
    const base64 = await getBase64(media);
    if (!base64) return;
    const typeOfMedia = media.type.split("/")[0];
    if (typeOfMedia === "image") {
      setCroppingImage(base64);
      setShowCropping(true);
    } else if (typeOfMedia === "video") {
      addImage(base64);
    }
    setValue("images", null);
  };
  const addImage = (image) => setImages((prevImages) => [...prevImages, image]);
  const deleteImage = (index) =>
    setImages((prevImages) => prevImages.filter((image, i) => i !== index));
  const editImage = (index) => {
    setCroppingImage(images[index] || null);
    setShowCropping(true);
  };
  const setEditedImage = (base64Image) => {
    if (images.includes(croppingImage)) {
      setImages((prevImages) =>
        prevImages.map((image) => {
          return image === croppingImage ? base64Image : image;
        })
      );
    } else {
      addImage(base64Image);
    }
    setShowCropping(false);
    setCroppingImage("");
  };
  return (
    <div className="h-full">
      <div className="flex flex-col gap-3">
        <div className="w-postWidth aspect-post rounded relative bg-black">
          {images.length ? (
            <div>
              <Posts
                images={images}
                selfUser
                deleteFunction={deleteImage}
                editFunction={editImage}
              />
            </div>
          ) : (
            <div className="absolute top-2/4 left-2/4 z-10 -translate-x-2/4 -translate-y-2/4">
              <AddImageButton register={register} onFileChange={onFileChange} />
            </div>
          )}
        </div>
        <div>
          {images.length ? (
            <AddImageButton
              variant={"default"}
              className={"border-none"}
              register={register}
              onFileChange={onFileChange}
            />
          ) : null}
        </div>
      </div>
      {showCropping && croppingImage ? (
        <ImageCropper image={croppingImage} setImage={setEditedImage} />
      ) : null}
    </div>
  );
}
