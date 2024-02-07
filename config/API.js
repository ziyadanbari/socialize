export default {
  baseURL: "/api",
  register: "/auth/register",
  getSession: "/auth/session",
  googleCallback: "/auth/google/callback",
  searchUsers: "/search",
  followUser: "/user/{username}/follow",
  unFollowUser: "/user/{username}/unfollow",
  getUser: "/user/{username}",
};
