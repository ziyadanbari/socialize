"use server";

import { prisma } from "@/db";

interface Props {
  email?: string;
  username?: string;
}

export async function checkUserAvailability({ email, username }: Props) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    return {
      available: !user,
      ...(user
        ? {
            error: {
              inputPath: user?.email === email ? "email" : "username",
              message: "Already in use",
            },
          }
        : {}),
    };
  } catch (error) {
    return { available: false, error: { message: "Something went wrong" } };
  }
}
