"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadPostSchema } from "@/schemas/upload.schema";
import { IAttachment } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { ActionError } from "@/utils/errors/serverAction.error";
import { prepareAttachments } from "@/utils/prepareAttachments";
import { useAppDispatch } from "@/hooks/app";
import { editPost } from "@/store/reducers/postsReducer";
import { editPost as editPostAction } from "@/actions/editPost";
import AttachmentSlider from "@/components/attachment-slider";
import { CarouselApi } from "@/components/ui/carousel";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Trash2Icon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IPost } from "../post-page";

type FormType = Omit<z.infer<typeof uploadPostSchema>, "attachments"> & {
  attachments: IAttachment[];
  removedAttachments: string[];
};

interface PostEditFormProps {
  post: IPost;
  onPostUpdate: (updatedPost: IPost) => void;
}

const PostEditForm: React.FC<PostEditFormProps> = ({ post, onPostUpdate }) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(uploadPostSchema),
    defaultValues: {
      title: post.title || "",
      description: post.description || "",
      attachments: post.attachments || [],
      removedAttachments: [],
    },
  });
  const formState = form.watch();
  const { title, description, attachments, removedAttachments } = formState


  useEffect(() => {
    form.setValue(
      "attachments",
      attachments.filter((item) => !removedAttachments.includes(item?.id as string))
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removedAttachments, form]);

  const changePostValue = (key: keyof typeof formState, newValue: unknown) => {
    const valueType = formState[key]
    form.setValue(key, newValue as typeof valueType);
  };

  const onSubmit = async (values: FormType) => {
    try {
      setIsLoading(true);
      const response = await editPostAction({ ...values, removedAttachments, postId: post.id });
      if (!response.updated || !response.post) throw new Error(response.error);
      
      const preparedAttachments = await prepareAttachments(response.post.attachments || []);
      const updatedPostWithAttachments = { ...response.post, attachments: preparedAttachments };
      
      onPostUpdate(updatedPostWithAttachments);
      dispatch(editPost({ id: response.post.id, post: response.post }));
      
      toast({ title: "Post updated successfully" });
    } catch (error) {
      toast({
        title: error instanceof ActionError ? error.actionError : "Something went wrong!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex items-start justify-center md:flex-row flex-col [&>*]:flex-1 gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="w-full h-full rounded-md overflow-hidden relative">
          <AttachmentSlider
            aspectRatio={9 / 8}
            attachments={attachments || []}
            setCarouselApi={setCarouselApi}
            carouselApi={carouselApi}
            showSlideIndex={attachments.length > 1}
            customDom={(file) => attachments.length > 1 && (
              <div
                className="absolute top-4 right-4"
                onClick={() => {
                  if (attachments.length > 1)
                    form.setValue("removedAttachments", [
                      ...removedAttachments,
                      file?.id as string,
                    ]);
                }}
              >
                <Button type="button" size={"icon"} variant={"destructive"}>
                  <Trash2Icon />
                </Button>
              </div>
            )}
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <FormField
            name="title"
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    value={title}
                    onChange={(e) => {
                      changePostValue("title", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    value={description as string}
                    onChange={(e) => {
                      changePostValue("description", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button loading={isLoading} className="gap-3 w-full">
            <div>
              <Edit />
            </div>
            <div>Save</div>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostEditForm;