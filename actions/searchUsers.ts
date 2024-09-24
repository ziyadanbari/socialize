"use server";
import { prisma } from "@/db";
import { UserProfile } from "@/types";
import { ActionError } from "@/utils/errors/serverAction.error";
import { userProfilePopulate } from "@/utils/userProfilePopulate";

export async function searchUsers(query: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            firstname: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            lastname: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            username: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        ...userProfilePopulate,
      },
    });
    return { users: users as unknown as UserProfile[] };
  } catch (error) {
    return {
      error:
        error instanceof ActionError
          ? error.actionError
          : "Something went wrong",
    };
  }
}
