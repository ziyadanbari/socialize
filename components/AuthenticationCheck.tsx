"use client";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from 'react';

const AuthenticationCheck = ({ children }: { children: ReactNode }) => {
  const { status} = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin");
    }
  }, [status, router]);

  if (status === "loading") return <Loading />;
  
  return children;
}

export default AuthenticationCheck;
