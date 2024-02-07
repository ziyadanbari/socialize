"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  FollowButton,
  useSession,
} from "@/exports";
import Link from "next/link";

export default function UserPaper({ user, ...props }) {
  const { username, avatar } = user;
  const { session, setSession } = useSession();
  return (
    <div
      className="flex items-center justify-between hover:bg-white/10 rounded w-full p-2"
      {...props}>
      <Link href={`/${username}`} className="flex-1">
        <div className="flex items-center gap-3">
          <div>
            <Avatar>
              <AvatarImage src={avatar} />
              <AvatarFallback>
                {username.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>{username}</div>
        </div>
      </Link>
      <div>
        <FollowButton
          user={user}
          session={session}
          setSession={setSession}
          username={username}
        />
      </div>
    </div>
  );
}
