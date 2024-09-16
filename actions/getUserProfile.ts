"use server";

import { prisma } from "@/db";
import { UserProfile } from "@/types";
import { ActionError } from "@/utils/errors/serverAction.error";

export async function getUserProfile(userId: string) {
  try {
    if (!userId) throw new ActionError("User id is missed!");
    const user: UserProfile | null = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        firstname: true,
        lastname: true,
        profilePic: true,
        followers: {
          where: {
            follower: {
              id: userId,
            },
          },
          select: {
            follower: {
              select: {
                username: true,
                profilePic: true,
                firstname: true,
                lastname: true,
              },
            },
          },
        },
        followings: {
          where: {
            following: {
              id: userId,
            },
          },
          select: {
            following: {
              select: {
                username: true,
                profilePic: true,
                firstname: true,
                lastname: true,
              },
            },
          },
        },
        posts: {
          select: {
            id: true,
            title: true,
            description: true,
            attachments: true,
          },
        },
      },
    });
    return { user };
  } catch (error: unknown) {
    return {
      error:
        error instanceof ActionError
          ? error.actionError
          : "Something went wrong!",
    };
  }
}
