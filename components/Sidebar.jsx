"use client";
import {
  ActiveLink,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Compass,
  Home,
  LogOut,
  Search,
  Send,
  SidebarOption,
  logout,
  refreshSession,
  useSession,
} from "@/exports";
import Image from "next/image";
export default function Sidebar() {
  const { session, status, setSession } = useSession();
  const topSidebarOptions = [
    {
      title: "Home",
      href: "/",
      icon: <Home />,
    },
    {
      title: "Search",
      href: "/search",
      icon: <Search />,
    },
    {
      title: "Explore",
      href: "/explore",
      icon: <Compass />,
    },
  ];
  const bottomSidebarOptions = [
    {
      title: session?.username,
      href: "/profile",
      icon: (
        <Avatar>
          <AvatarImage src={session?.avatar} />
          <AvatarFallback>
            {session?.username?.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ),
      validator() {
        if (session && status === "authenticated") return true;
        return false;
      },
    },
    {
      title: "Logout",
      href: "#",
      icon: <LogOut />,
      async onClick() {
        await logout();
        await refreshSession(setSession);
      },
      className: "text-red-500",
      validator() {
        if (session && status === "authenticated") return true;
        return false;
      },
    },
  ];
  return (
    <div className="h-full">
      <div className="h-full flex flex-col justify-between items-start ">
        <div className="flex flex-col gap-10">
          <div>
            <div className="flex items-center gap-2 pl-3">
              <div>
                <Image
                  src={"/logo.white.png"}
                  height={30}
                  width={30}
                  alt="logo"
                />
              </div>
              <div className="text-xl font-semibold sm:block hidden">
                Socialize
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            {topSidebarOptions.map((option, i) => {
              const { title, icon, href, validator, ...restProps } = option;
              return !validator ? (
                <ActiveLink href={href} key={i} {...restProps}>
                  <SidebarOption title={title} icon={icon} />
                </ActiveLink>
              ) : validator instanceof Function && validator() ? (
                <ActiveLink href={href} key={i} {...restProps}>
                  <SidebarOption title={title} icon={icon} />
                </ActiveLink>
              ) : null;
            })}
          </div>
        </div>
        <div className="w-full w-full flex flex-col gap-2">
          {bottomSidebarOptions.map((option, i) => {
            const { title, icon, href, validator, ...restProps } = option;
            return !validator ? (
              <ActiveLink href={href} key={i} {...restProps}>
                <SidebarOption title={title} icon={icon} />
              </ActiveLink>
            ) : validator instanceof Function && validator() ? (
              <ActiveLink href={href} key={i} {...restProps}>
                <SidebarOption title={title} icon={icon} />
              </ActiveLink>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
