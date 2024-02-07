import { apiErrorHandler, dbConnect, generateJwt, User } from "@/exports";
import { OAuth2Client } from "google-auth-library";

export async function GET(req) {
  try {
    await dbConnect();
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
      process.env;
    const {
      nextUrl: { search },
    } = req;
    const urlSearchParams = new URLSearchParams(search);
    const code = urlSearchParams.get("code");
    const oAuth2Client = new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_CALLBACK_URL
    );
    const r = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(r.tokens);
    const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${oAuth2Client.credentials.access_token}`;
    const res = await oAuth2Client.request({ url });
    const data = res.data;
    const { name: username, picture: avatar } = data;
    let user = await User.findOne({ username });
    if (!user) {
      user = new User({
        username,
        avatar,
        provider: "google",
      });
      await user.save();
    }
    if (!user) throw [500, "Internal server error"];
    const token = generateJwt({ userId: user?._id });
    return Response.json({ token, message: `Hello ${user.username}` });
  } catch (error) {
    if (error.message === "invalid_grant") {
      return Response.json({ message: "Code expired" }, { status: 400 });
    }
    return apiErrorHandler(error);
  }
}
