"use client";
import { uploadPostSchema } from "@/schemas/upload.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, Trash2Icon } from "lucide-react";
import { FastAverageColor } from "fast-average-color";
import { type CarouselApi } from "@/components/ui/carousel";
import axios from "axios";
import { fileToBase64 } from "@/utils/fileToBase64";
import { useToast } from "@/hooks/use-toast";
import { ActionError } from "@/utils/errors/serverAction.error";
import AttachmentSlider from "@/components/attachment-slider";
import { useRouter } from "next/navigation";

type FormType = z.infer<typeof uploadPostSchema>;

const fac = new FastAverageColor();
const MAX_SIZE_MB = 10; // Maximum size in MB

const Upload = () => {
  const uploadForm = useForm<FormType>({
    resolver: zodResolver(uploadPostSchema),
    defaultValues: {
      title: "",
      description: "",
      attachments: [],
    },
  });
  const router = useRouter()
  const { toast } = useToast();
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>();
  const [previewFiles, setPreviewFiles] = useState<{
    type: "video" | "image";
    file: string;
    backgroundColor?: string;
    base64: string;
    size?: number; // Size in bytes
  }[]>([]);
  const lastPreviewFilesLength = useRef(previewFiles.length);

  const onSubmit = async (values: FormType) => {
    try {
      setIsLoading(true);
      const request = await axios.post("/api/upload", values, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) /
              (progressEvent.total || JSON.stringify(values).length)
          );
          setUploadProgress(percentCompleted);
        },
      });
      const response = request.data as {
        created: boolean;
        message?: string;
        error?: undefined;
        postId?: string
      };
      if (!response.created)
        throw new ActionError(response?.error || "Something went wrong!");
      toast({
        title: "Post uploaded successfully",
        variant: "success",
      });
      router.push(`/explore/${response.postId}`)
    } catch (error: unknown) {
      toast({
        title: (error as ActionError).actionError || "",
        variant: "destructive",
      });
    } finally {
      setUploadProgress(undefined);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    lastPreviewFilesLength.current = previewFiles.length;
    if (
      !previewFiles.length ||
      !carouselApi ||
      previewFiles.length < lastPreviewFilesLength.current
    )
      return;
    carouselApi?.scrollTo(previewFiles.length - 1, true);
  }, [previewFiles, carouselApi]);

  useEffect(() => {
    uploadForm.setValue("attachments", [
      ...previewFiles.map(({ type, base64 }) => ({ type, file: base64 })),
    ]);
  }, [previewFiles, uploadForm]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      // Calculate the total size of existing files
      const existingSize = previewFiles.reduce((acc, file) => acc + (file.size || 0), 0);
      let newSize = existingSize;

      const newFiles = await Promise.all(
        Array.from(files).map(async (file) => {
          const fileType = file.type.startsWith("video") ? "video" : "image";
          const fileSize = file.size; // Size in bytes
          newSize += fileSize;

          // Check if new total size exceeds the limit
          if (newSize > MAX_SIZE_MB * 1024 * 1024) {
            toast({
              title: "Total file size exceeds 10MB limit",
              variant: "destructive",
            });
            return null;
          }

          const fileUrl = URL.createObjectURL(file);
          const fileBase64 = await fileToBase64(file);

          let backgroundColor;
          if (fileType === "image")
            backgroundColor = (await fac.getColorAsync(fileUrl)).rgba;
          return {
            type: fileType as "video" | "image",
            file: fileUrl,
            base64: fileBase64,
            backgroundColor,
            size: fileSize
          };
        })
      );

      // Filter out any null values (files that exceed the limit)
      const validFiles = newFiles.filter((file) => file !== null);
      setPreviewFiles([...previewFiles, ...validFiles]);
    }
    event.target.value = "";
  };

  return (
    <div className="w-full h-full md:px-20 sm:px-10 px-4">
      <Form {...uploadForm}>
        <form
          onSubmit={uploadForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-4">
          {previewFiles.length > 0 && (
            <AttachmentSlider
              customDom={
                (_file,index) => (
                  <>
                    <div className="absolute top-4 right-4">
                      <Button
                        variant={"destructive"}
                        size={"icon"}
                        type="button"
                        onClick={() => {
                          setPreviewFiles(
                            previewFiles.filter((_, i) => index !== i)
                          );
                        }}>
                        <Trash2Icon />
                      </Button>
                    </div>
                  </>
                )
              }
              attachments={previewFiles}
              setCarouselApi={setCarouselApi}
              carouselApi={carouselApi}
            />
          )}
          {!previewFiles.length ? (
            <FormField
              control={uploadForm.control}
              name="attachments"
              render={() => (
                <FormItem>
                  <FormControl>
                    <Input
                      hidden
                      type="file"
                      accept="image/*, video/*"
                      multiple
                      id="attachment_input_upload"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </FormControl>
                  <div className="max:w-64 w-full aspect-[9/4] border border-dashed border-black/30 flex justify-center items-center rounded-md bg-accent">
                    <Button type="button" className="p-0">
                      <label
                        htmlFor="attachment_input_upload"
                        className="flex justify-center items-center gap-3 px-4 py-2 cursor-pointer">
                        <div>
                          <CloudUpload />
                        </div>
                        <div>Upload Image/Video</div>
                      </label>
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={uploadForm.control}
              name="attachments"
              render={() => (
                <FormItem className="flex items-center xs:justify-start justify-center">
                  <FormControl>
                    <Input
                      hidden
                      type="file"
                      accept="image/*, video/*"
                      multiple
                      id="attachment_input_upload"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </FormControl>
                  <Button type="button" className="p-0">
                    <label
                      htmlFor="attachment_input_upload"
                      className="flex justify-center items-center gap-3 px-4 py-2 cursor-pointer">
                      <div>
                        <CloudUpload />
                      </div>
                      <div>Upload Image/Video</div>
                    </label>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={uploadForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={uploadForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    className="min-h-24"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            loading={
              uploadProgress === undefined || uploadProgress === 100
                ? isLoading
                : false
            }
            className="gap-3"
            style={{
              background:
                uploadProgress === undefined || uploadProgress === 100
                  ? ""
                  : `linear-gradient(to right,  green ${uploadProgress}%, black ${uploadProgress}%)`,
            }}>
            {uploadProgress !== undefined && isLoading ? (
              `${uploadProgress}%`
            ) : (
              <>
                <CloudUpload />
                <span>Upload</span>
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Upload;
