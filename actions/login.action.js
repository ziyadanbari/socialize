"use server";

import { User, dbConnect, generateJwt, loginSchema } from "@/exports";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
export async function login(username, password) {
  await dbConnect();
  const validation = loginSchema.safeParse({ username, password });
  if (!validation.success) throw new Error(validation.error);
  const user = await User.findOne({ username });
  if (!user) throw new Error("Username or password incorrect");
  const userPassword = user.password;
  if (!userPassword) throw new Error("Username or password incorrect");
  const isPasswordMatched = bcrypt.compareSync(password, userPassword);
  if (!isPasswordMatched) throw new Error("Username or password incorrect");
  const token = generateJwt({ userId: user._id });
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 365);
  cookies().set("session-token", token, {
    expires: expirationDate,
  });

  return { message: `Welcome ${user?.username}` };
}
