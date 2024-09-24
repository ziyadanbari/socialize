"use server";

import { authConfig } from "@/config/auth";
import { prisma } from "@/db";
import { ActionError } from "@/utils/errors/serverAction.error";
import { getServerSession } from "next-auth";

interface Params {
  title?: string;
  description?: string;
  removedAttachments?: string[];
  postId: string;
}
export async function editPost({
  title,
  description,
  removedAttachments,
  postId,
}: Params) {
  try {
    if (!postId) throw new ActionError("Post id is required");
    const session = await getServerSession(authConfig);
    const { user: sessionUser } = session || {};
    if (!sessionUser?.id) throw new ActionError("Unauthorized");
    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
    });
    if (!user) throw new ActionError("Unauthorized");
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        user: {
          select: {
            profilePic: true,
            username: true,
            firstname: true,
            lastname: true,
          },
        },
        attachments: true,
      },
    });
    if (!post) throw new ActionError("Post id is required");
    if (removedAttachments && (post?.attachments?.length || 0) > 1) {
      await prisma.postAttachment.deleteMany({
        where: {
          id: {
            in: removedAttachments,
          },
        },
      });
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
        user: {
          id: user?.id,
        },
      },
      data: {
        title,
        description,
      },
      include: {
        user: {
          select: {
            profilePic: true,
            username: true,
            firstname: true,
            lastname: true,
          },
        },
        attachments: true,
      },
    });

    return { updated: true, post: updatedPost };
  } catch (error) {
    return {
      updated: false,
      error:
        error instanceof ActionError
          ? error.actionError
          : "Something went wrong!",
    };
  }
}
