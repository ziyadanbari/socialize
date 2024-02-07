"use client";

import { redirect } from "next/navigation";
import { useSession } from "@/exports";
export default function Home() {
  const { session, setSession, status } = useSession();
  if (status === "unauthenticated") redirect("/register");
  return <div>Hello</div>;
}
