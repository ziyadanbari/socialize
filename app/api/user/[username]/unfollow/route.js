import {
  User,
  apiErrorHandler,
  checkAuth,
  defaultUserObjectDeselect,
} from "@/exports";

export async function GET(req, params) {
  try {
    const user = await checkAuth(req);
    const {
      params: { username },
    } = params;
    if (!username) throw [400, "Username missed"];
    const unFollowedUser = await User.findOne({ username }).select(
      defaultUserObjectDeselect
    );
    unFollowedUser.followers = unFollowedUser.followers.filter(
      (follower) => follower.userId.toString() !== user._id.toString()
    );
    await unFollowedUser.save();
    user.following = user.following.filter(
      (follow) => follow.userId.toString() !== unFollowedUser._id.toString()
    );
    await user.save();
    return Response.json({ ...unFollowedUser._doc, message: "ok" });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
