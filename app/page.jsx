"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { session, status } = useSession();
  if (!session && status === "unauthenticated") {
    redirect("/signin");
  }
}
