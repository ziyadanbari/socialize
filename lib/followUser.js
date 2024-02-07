"use client";

import { api, instance, toasty } from "@/exports";

export async function followUser(username, users) {
  try {
    const response = await instance.get(
      api.followUser.replace("{username}", username)
    );
    const followedUser = response.data;
    if (users && followedUser) {
      users = users.map((user) =>
        user._id === followedUser._id ? followedUser : user
      );
    }
    return { actionUser: followedUser, users };
  } catch (error) {
    toasty("error", error);
  }
}
