import {
  User,
  apiErrorHandler,
  checkAuth,
  dbConnect,
  defaultUserObjectDeselect,
} from "@/exports";

export async function GET(req) {
  try {
    await dbConnect();
    const user = await checkAuth(req);
    const url = new URL(req.url);
    const query = url.searchParams.get("q");
    if (!query) throw [400, "Invalid query"];
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedQuery, "ig");
    const users = await User.find({
      username: { $regex: regex },
    }).select(defaultUserObjectDeselect);
    const filteredUsers = users.filter(
      (fetchedUser) => fetchedUser._id.toString() !== user._id.toString()
    );
    return Response.json({ users: filteredUsers });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
