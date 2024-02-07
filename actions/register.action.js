"use server";
import { cookies } from "next/headers";
import { User, dbConnect, generateJwt, registerSchema } from "@/exports";
import { put } from "@vercel/blob";
import crypto from "crypto";
export async function register({ username, password, avatar }) {
  await dbConnect();
  const validation = registerSchema.safeParse({ username, password, avatar });
  if (!validation.success) throw new Error(validation.error);
  if (!!(await User.findOne({ username })))
    throw new Error("Cannot use this username");
  const user = new User({
    username,
    password,
  });
  if (avatar) {
    const base64Image = avatar.split("base64,")[1];
    const imageBuffer = Buffer.from(base64Image, "base64");
    const virtualName = `${crypto.randomBytes(20).toString("hex")}.png`;
    const blob = await put(virtualName, imageBuffer, {
      access: "public",
    });
    user.avatar = blob.url;
  }
  await user.save({ hashPassword: true });
  if (user) {
    const token = generateJwt({ userId: user._id });
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365);
    const cookieOptions = {
      expires: expirationDate,
    };

    cookies().set("session-token", token, cookieOptions);

    return {
      message: `Hello ${user.username}`,
    };
  } else {
    throw new Error("Internal server error");
  }
}
