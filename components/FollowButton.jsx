"use client";

import { Button, followUser, refreshSession, unFollowUser } from "@/exports";
import { Cagliostro } from "next/font/google";

export default function FollowButton({
  username,
  setSession,
  session,
  user,
  variant,
  className,
  callback,
  ...props
}) {
  if (!username) throw new Error("Username missed");
  if (!session) throw new Error("Session missed");
  if (!user) throw new Error("User missed");
  if (!setSession) throw new Error("setSession missed");
  if (!(setSession instanceof Function))
    throw new TypeError("setSession is not a function");
  const isFollowed = session.following.some(
    (follow) => follow.userId === user._id
  );
  return (
    <Button
      variant={variant || "link"}
      className={`font-semibold ${className}`}
      onClick={async () => {
        if (typeof isFollowed !== "boolean") return;
        const actionUser = (
          isFollowed ? await unFollowUser(username) : await followUser(username)
        )?.actionUser;
        if (actionUser && callback) {
          if (!(callback instanceof Function))
            throw new TypeError("Callback function is not a function");
          callback(actionUser);
        }
        await refreshSession(setSession);
      }}
      {...props}>
      {isFollowed ? (
        <div className="text-red-500">Unfollow</div>
      ) : (
        <div className="text-blue-500 ">Follow</div>
      )}
    </Button>
  );
}
