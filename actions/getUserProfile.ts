"use server";

import { prisma } from "@/db";
import { UserProfile } from "@/types";
import { ActionError } from "@/utils/errors/serverAction.error";
import { userProfilePopulate } from "@/utils/userProfilePopulate";

export async function getUserProfile(userId: string) {
  try {
    if (!userId) throw new ActionError("User id is missed!");
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        ...userProfilePopulate,
      },
    });
    return { user: user as unknown as UserProfile };
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
