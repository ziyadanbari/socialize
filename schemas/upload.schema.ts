import { z } from "zod";

export const attachmentSchema = z.object({
  type: z.enum(["image", "video"]).default("image"),
  file: z.any(),
});

export const uploadPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required").optional(),
  attachments: attachmentSchema
    .array()
    .min(1, "You need to upload at least one media file"),
});
