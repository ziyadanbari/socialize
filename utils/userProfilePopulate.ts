import { Prisma } from "@prisma/client";

export const userProfilePopulate: Prisma.UserSelect = {
  id: true,
  username: true,
  firstname: true,
  lastname: true,
  profilePic: true,
  followers: {
    select: {
      follower: {
        select: {
          username: true,
          profilePic: true,
          firstname: true,
          lastname: true,
        },
      },
    },
  },
  followings: {
    select: {
      following: {
        select: {
          username: true,
          profilePic: true,
          firstname: true,
          lastname: true,
        },
      },
    },
  },
  posts: {
    select: {
      id: true,
      title: true,
      description: true,
      attachments: true,
      user: {
        select: {
          id: true,
          username: true,
          profilePic: true,
          firstname: true,
          lastname: true,
        },
      },
    },
  },
};
