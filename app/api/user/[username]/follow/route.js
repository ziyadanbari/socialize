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
    if (!username) throw [400, "Username missed"];
    const followedUser = await User.findOne({ username }).select(
      defaultUserObjectDeselect
    );
    if (!followedUser) throw [404, "User not found"];
    const isFollowed = followedUser.followers.some(
      ({ userId }) => userId.toString() === user._id.toString()
    );
    if (isFollowed) throw [400, "You are already following him"];
    followedUser.followers.push({
      userId: user._id,
    });
    await followedUser.save();
    user.following.push({
      userId: followedUser._id,
    });
    await user.save();
    return Response.json({ ...followedUser._doc, message: "ok" });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
