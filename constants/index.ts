import { ISidebarOption } from "@/types";
import { CircleUser, Compass, Search } from "lucide-react";

export const CREATE_USER_FAILED_MESSAGE = "Cannot create user for some reason!";
export const DEFAULT_PROFILE_PICTURE =
  "https://qfls3jg2rvliofdo.public.blob.vercel-storage.com/default_pic-owhx79E3zrwP9PwtH5nvVe2AduF9ag.png";

export const SIDEBAR_OPTIONS: ISidebarOption[] = [
  {
    pageKey: "explore",
    label: "Explorer",
    icon: Compass,
    href: "/explore",
  },
  {
    pageKey: "search",
    label: "Search",
    icon: Search,
    href: "/search",
  },
  {
    pageKey: "profile",
    label: "Profile",
    icon: CircleUser,
    href: "/profile",
  },
];
