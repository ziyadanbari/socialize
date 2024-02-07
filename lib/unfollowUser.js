"use client";

import { api, instance, toasty } from "@/exports";

export async function unFollowUser(username, users) {
  try {
    const response = await instance.get(
      api.unFollowUser.replace("{username}", username)
    );
    const unFollowedUser = response.data;
    if (users && unFollowedUser) {
      users = users.map((user) =>
        user._id === unFollowedUser._id ? unFollowedUser : user
      );
    }
    return { actionUser: unFollowedUser, users };
  } catch (error) {
    toasty("error", error);
  }
}
