"use client"
import { useSession } from "next-auth/react";


export default function Home() {
  const session = useSession()
  console.log(session)
  return (
    <div className="w-full h-screen flex items-center justify-center text-4xl font-bold">
      Welcome to socialize 
    </div>
  );
}
