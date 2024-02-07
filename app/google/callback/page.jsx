"use client";
import {
  Loading,
  api,
  instance,
  refreshSession,
  toasty,
  useSession,
} from "@/exports";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { setCookie } from "cookies-next";

export default function page() {
  const { setSession } = useSession();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();
  if (!code) router.replace("/");
  useEffect(() => {
    async function fetchUserInfoWithCode() {
      try {
        const response = await instance.get(
          `${api.googleCallback}?code=${code}`
        );
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 365);
        setCookie("session-token", response.data.token, {
          expires: expirationDate,
        });
        toasty("success", response.data.message);
        await refreshSession(setSession);
      } catch (error) {
        toasty("error", error);
      } finally {
        router.replace("/");
      }
    }
    fetchUserInfoWithCode();
  }, []);
  return (
    <div className="take_screen">
      <Loading skipCheck />
    </div>
  );
}
