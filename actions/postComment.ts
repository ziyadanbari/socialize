"use server";

import { ActionError } from "@/utils/errors/serverAction.error";
import { getServerSession } from "next-auth";
import { authConfig } from "@/config/auth";
import { prisma } from "@/db";

export async function postComment(postId: string, content: string) {
  try {
    const session = await getServerSession(authConfig);
    if (!session || !session.user) {
      throw new ActionError("You must be logged in to comment");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      throw new ActionError("User not found");
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new ActionError("Post not found");
    }

    const comment = await prisma.postComment.create({
      data: {
        comment: content,
        post: {
          connect: {
            id: postId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            firstname: true,
            lastname: true,
            profilePic: true,
          },
        },
        replies: {
          include: {
            replyer: {
              select: {
                id: true,
                username: true,
                firstname: true,
                lastname: true,
                profilePic: true,
              },
            },
          },
        },
      },
    });

    return { posted: true, comment, error: null };
  } catch (error) {
    console.error("Error posting comment:", error);
    if (error instanceof ActionError) {
      return { posted: false, comment: null, error: error.message };
    }
    return { posted: false, comment: null, error: "Failed to post comment" };
  }
}
