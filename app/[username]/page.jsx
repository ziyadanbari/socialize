"use client";
import {
  Profile,
  api,
  instance,
  toasty,
  useLoading,
  useSession,
} from "@/exports";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function User({ params }) {
  const router = useRouter();

  const { username: userRequested } = params;
  const [user, setUser] = useState(null);
  const { session, setSession } = useSession();
  const { setLoading } = useLoading();
  useEffect(() => {
    if (!userRequested) return redirect("/");
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await instance.get(
          api.getUser.replace("{username}", userRequested)
        );
        const user = response.data?.user;
        if (!user) throw new Error("User not found");
        setUser(user);
      } catch (error) {
        toasty("error", error);
        router.back();
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [userRequested, setUser]);
  if (!user) return null;
  const { username, avatar, followers, following, posts } = user;
  return (
    <div>
      <Profile
        user={user}
        username={username}
        avatar={avatar}
        following={following}
        followers={followers}
        posts={posts}
        session={session}
        setSession={setSession}
        setUser={setUser}
      />
    </div>
  );
}
