import { prisma } from "@/db";
import { User } from "@prisma/client";

interface Props {
  email?: string;
  id?: string;
  username?: string;
}

export async function getUser({
  id,
  email,
  username,
}: Props): Promise<User | false> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ id }, { email }, { username }],
      },
    });
    return user || false;
  } catch (error) {
    return false;
  }
}
