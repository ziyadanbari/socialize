"use client";

import { useSession, Profile as UserProfile, AddPostButton } from "@/exports";
import { redirect } from "next/navigation";

export default function Profile() {
  const { session, setSession, status } = useSession();
  if (status === "unauthenticated") return redirect("/login");
  if (status !== "authenticated") return;
  const { username, avatar, followers, following, posts } = session;
  return (
    <div className="h-full flex justify-center">
      <div className="inline-flex flex-col gap-16 items-center h-full">
        <div>
          <UserProfile
            username={username}
            avatar={avatar}
            followers={followers}
            following={following}
            posts={posts}
            selfProfile
          />
        </div>
        <div className="w-full flex-1 flex flex-col gap-2">
          <div className="self-end">
            <AddPostButton />
          </div>
        </div>
      </div>
    </div>
  );
}
