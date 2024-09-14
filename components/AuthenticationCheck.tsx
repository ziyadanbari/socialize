"use client"
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ReactNode } from 'react'

const AuthenticationCheck = ({children}: {children:ReactNode}) => {
  const { status } = useSession();
  const router = useRouter();
  if (status === "loading") return <Loading />;
  if (status === "unauthenticated") router.replace("/signin");
  return children;
}

export default AuthenticationCheck