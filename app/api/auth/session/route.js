import { apiErrorHandler, checkAuth, dbConnect } from "@/exports";

export async function GET(req) {
  try {
    await dbConnect();
    const user = await checkAuth(req);
    return Response.json({
      ...user._doc,
      password: undefined,
      _id: undefined,
      __v: undefined,
    });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
