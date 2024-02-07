"use server";
import { User, checkAuth } from "@/exports";
import { cookies } from "next/headers";

export async function logout() {
  try {
    const sessionToken = cookies().get("session-token");
    const user = await checkAuth(null, sessionToken);
    if (!user) throw new Error("User not found");
    const status = await User.updateOne(
      { _id: user._id },
      { $push: { blackListTokens: sessionToken.value } }
    );
  } catch (error) {
    throw new Error(error instanceof Array ? error[1] : error.message);
  } finally {
    cookies().delete("session-token");
    return { message: "Good bye!" };
  }
}
