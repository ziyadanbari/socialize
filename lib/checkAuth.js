import { User, dbConnect, decodeJwt } from "@/exports";

export async function checkAuth(req, sessionToken) {
  await dbConnect();
  if (!sessionToken) {
    sessionToken = req.cookies.get("session-token");
  }
  const data = decodeJwt(sessionToken?.value);
  const { userId } = data || {};
  if (!userId) throw [401, "Invalid token"];
  const user = await User.findById(userId);
  if (!user) throw [401, "Unauthorized"];
  if (user?.blackListTokens?.includes(sessionToken?.value))
    throw [401, "Unauthorized"];
  user.blackListTokens = undefined;
  return user;
}
