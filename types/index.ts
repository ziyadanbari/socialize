import { AttachmentType } from "@prisma/client";
import { LucideIcon } from "lucide-react";
import { Dispatch, ElementType, SetStateAction } from "react";

export type ISidebarKeys = "explore" | "search" | "profile" | "upload";
export type SetState<T> = Dispatch<SetStateAction<T>>;
export type IAttachment = {
  id?: string;
  type: AttachmentType;
  file: string;
  backgroundColor?: string;
};

export interface RegisterForm {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  username: string;
  profilePic?: File;
}

export interface ICreationUserStatus {
  currentStep: number;
  userCreated: boolean;
  error: string;
}

export interface IRegisterStepsReducer
  extends RegisterForm,
    ICreationUserStatus {}

export interface LoadingIndicatorProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export interface ISidebarOption {
  label: string;
  pageKey: ISidebarKeys;
  icon: LucideIcon | ElementType;
  href?: string;
  action?: (...args: unknown[]) => unknown;
}

export interface ISidebarReducer {
  open?: boolean;
  activePage?: ISidebarKeys;
  pages: ISidebarOption[];
}

// Define types for individual items in arrays
export interface Follower {
  follower: {
    username: string;
    profilePic: string | null;
    firstname: string;
    lastname: string;
  };
}

export interface Following {
  following: {
    username: string;
    profilePic: string | null;
    firstname: string;
    lastname: string;
  };
}

export interface Attachment {
  id: string;
  type: AttachmentType;
  attachmentLink: string;
}

export interface Post {
  id: string;
  title: string;
  description: string | null;
  attachments: Attachment[];
  user?: Partial<UserProfile>;
}

// Define the main UserProfile type using the new types
export interface UserProfile {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  profilePic: string | null;
  followers: Follower[];
  followings: Following[];
  posts: Post[];
}
