"use server";

import { authConfig } from "@/config/auth";
import { prisma } from "@/db";
import { uploadPostSchema } from "@/schemas/upload.schema";
import { ActionError } from "@/utils/errors/serverAction.error";
import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { z } from "zod";
import crypto from "crypto";
import { PostAttachment } from "@prisma/client";

interface Params extends z.infer<typeof uploadPostSchema> {}
interface IUploadedAttachment {
  type: "video" | "image";
  link: string;
}

async function uploadAttachments(attachments: Params["attachments"]) {
  try {
    const uploadedAttachments: IUploadedAttachment[] = [];
    for (const attachment of attachments) {
      // eslint-disable-next-line prefer-const
      let { type, file } = attachment;
      const fileName = `${crypto.randomBytes(10).toString("hex")}.${
        type === "video" ? "mp4" : "png"
      }`;
      file = (file as string).replace(/^data:(image|video)\/\w+;base64,/, "");
      const fileBuffer = Buffer.from(file, "base64");
      const blob = await put(fileName, fileBuffer, {
        access: "public",
      });
      uploadedAttachments.push({
        type,
        link: blob.url,
      });
    }
    return { uploaded: true, attachments: uploadedAttachments };
  } catch (error) {
    return { uploaded: false };
  }
}

export async function uploadPost({ title, description, attachments }: Params) {
  try {
    const session = await getServerSession(authConfig);
    if (!session || !session.user)
      throw new ActionError("Unauthorized to upload a post");
    const { user } = session;
    const newPost = await prisma.post.create({
      data: {
        title,
        description,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    const uploadedAttachments = await uploadAttachments(attachments);
    if (!uploadedAttachments.uploaded || !uploadedAttachments.attachments)
      throw new ActionError("Cannot upload attachments for some reason");
    const newAttachments: PostAttachment[] = [];
    for (const uploadedAttachment of uploadedAttachments.attachments) {
      const createdAttachment = await prisma.postAttachment.create({
        data: {
          post: {
            connect: { id: newPost.id },
          },
          attachmentLink: uploadedAttachment.link,
          type: uploadedAttachment.type,
        },
      });
      newAttachments.push(createdAttachment);
    }

    return {
      created: true,
      message: "Post uploaded successfully",
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      created: false,
      error:
        error instanceof ActionError
          ? error.actionError
          : "Something went wrong",
    };
  }
}
