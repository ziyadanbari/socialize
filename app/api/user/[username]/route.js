import {
  User,
  apiErrorHandler,
  checkAuth,
  dbConnect,
  defaultUserObjectDeselect,
} from "@/exports";

export async function GET(req, params) {
  try {
    await dbConnect();
    const user = await checkAuth(req);
    const {
      params: { username },
    } = params;
    if (!username) throw [400, "Invalid Username"];
    const requestedUser = await User.findOne({ username }).select(
      defaultUserObjectDeselect
    );
    if (requestedUser._id.toString() === user._id.toString())
      throw [400, "You cannot request your profile"];
    return Response.json({ user: requestedUser });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
