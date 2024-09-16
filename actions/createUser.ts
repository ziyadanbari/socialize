"use server";
import { prisma } from "@/db";
import { signUpFirstStepSchema } from "@/schemas/auth.schema";
import { Providers } from "@prisma/client";
import { checkUserAvailability } from "./checkUserAvailability";
import crypto from "crypto";
import { DEFAULT_PROFILE_PICTURE } from "@/constants";
import bcrypt from "bcrypt";
import { uploadFile } from "@/utils/server/uploadFile";
interface Props {
  email: string;
  username: string;
  password: string;
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
  try {
    const formCheck = signUpFirstStepSchema.safeParse({
      email,
      username,
      password,
      firstname,
      lastname,
    });
    if (!formCheck.success) {
      const error = formCheck.error.message;
      return { userCreated: false, error };
    }

    const { available: isUserAvailable, error } = await checkUserAvailability({
      email,
      username,
    });
    if (!isUserAvailable) return { created: false, error: error?.message };
    if (profilePic) {
      const cleanBase64ProfilePic = (profilePic as string).replace(
        /^data:image\/\w+;base64,/,
        ""
      );
      const fileName = `${crypto.randomBytes(10).toString("hex")}.png`;
      const { uploaded, blob } = await uploadFile({
        fileName,
        base64: cleanBase64ProfilePic,
      });
      if (uploaded && blob) profilePic = blob.url;
    }
    const user = await prisma.user.create({
      data: {
        email,
        username: username.startsWith("@") ? username : `@${username}`,
        password: bcrypt.hashSync(password, 10),
        firstname,
        lastname,
        provider: Providers.email,
        profilePic: profilePic || DEFAULT_PROFILE_PICTURE,
      },
    });
    return { created: true, userId: user.id };
  } catch (error: unknown) {
    console.log(error);
    return {
      created: false,
      error: "Cannot create your user for some reason!",
    };
  }
}
