import { NextResponse } from "next/server";
import { api, dbConnect, instance } from "@/exports";

export async function middleware(req, event) {
  const cookies = req.cookies;
  const sessionToken = cookies.get("session-token").value;
  const loginUrl = new URL("/login", req.url).href;
  if (!sessionToken) return NextResponse.redirect(loginUrl);
  const fetchSession = async () => {
    const response = await fetch(new URL("/api/auth/session", req.url).href, {
      headers: {
        Cookie: `session-token=${sessionToken}`,
      },
    });
    return response;
  };

  const response = await fetchSession();
  if (!response.ok) return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/", "/search", "/profile", "/:username"],
};
