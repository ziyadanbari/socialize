import { LucideIcon } from "lucide-react";
import { ElementType } from "react";

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

export type ISidebarKeys = "explore" | "search" | "profile";

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
