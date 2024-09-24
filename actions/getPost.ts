"use server";

import { prisma } from "@/db";
import { ActionError } from "@/utils/errors/serverAction.error";

export async function getPost(id: string) {
  try {
    if (!id) throw new ActionError("Post id is required!");
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            profilePic: true,
            username: true,
            firstname: true,
            lastname: true,
          },
        },
        attachments: true,
      },
    });
    return { post };
  } catch (error: unknown) {
    console.log(error);
    return {
      error:
        error instanceof ActionError
          ? error.actionError
          : "Something went wrong!",
    };
  }
}
