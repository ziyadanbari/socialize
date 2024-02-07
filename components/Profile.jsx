import { Avatar, AvatarFallback, AvatarImage, FollowButton } from "@/exports";

export default function Profile({
  user,
  setUser,
  username,
  avatar,
  posts,
  followers,
  following,
  selfProfile,
  session,
  setSession,
}) {
  const data = [
    {
      subTitle: "Posts",
      value: posts.length,
    },
    {
      subTitle: "Followers",
      value: followers.length,
    },
    {
      subTitle: "Following",
      value: following.length,
    },
  ];
  return (
    <div className="flex justify-center">
      <div className="flex md:flex-row md:justify-between justify-normal flex-col gap-5">
        <div className="flex md:gap-14 sm:gap-10 gap-6 items-start">
          <Avatar className="md:h-32 md:w-32 sm:h-24 sm:w-24 w-16 h-16 ">
            <AvatarImage src={avatar} />
            <AvatarFallback className="sm:text-4xl text-2xl">
              {username.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-4">
            <div className="md:text-4xl sm:text-3xl text-2xl font-semibold">
              {username}
            </div>
            <div className="flex items-center gap-3 justify-between">
              {data?.map(({ subTitle, value }, i) => {
                return (
                  <div className="text-center" key={i}>
                    <div className="text-3xl font-medium">{value}</div>
                    <div className="text-base text-gray-300/50">{subTitle}</div>
                  </div>
                );
              })}
            </div>
            <div>
              {!selfProfile && (
                <FollowButton
                  variant={"default"}
                  className={"w-full"}
                  user={user}
                  username={username}
                  setSession={setSession}
                  session={session}
                  callback={(actionUser) => {
                    setUser(actionUser);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
