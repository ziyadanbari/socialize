"use server";
import { prisma } from "@/db";
import { Providers } from "@prisma/client";

interface Props {
  email: string;
  username: string;
  password?: string;
  firstname: string;
  lastname: string;
  profilePic?: string;
}

export async function createUser({
  email,
  username,
  password,
  firstname,
  lastname,
  profilePic,
}: Props) {
  const user = await prisma.user.create({
    data: {
      email,
      username,
      password,
      firstname,
      lastname,
      provider: Providers.email,
      profilePic,
    },
  });
  return { created: true, userId: user.id };
}
