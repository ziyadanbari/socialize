"use client";
import { SIDEBAR_OPTIONS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks/app";
import { ISidebarOption } from "@/types";
import React from "react";
import { Button, buttonVariants } from "./button";
import { useRouter } from "next/navigation";
import { VariantProps } from "class-variance-authority";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { setActivePage } from "@/store/reducers/sidebarReducer";

type SidebarOption = Partial<
  ISidebarOption & {
    isActive: boolean;
    buttonVariant: VariantProps<typeof buttonVariants>["variant"];
  }
>;

const SidebarOption = ({
  label,
  icon: Icon,
  isActive,
  buttonVariant,
  action,
}: SidebarOption) => {

  return (
    <Button
      onClick={() => (action ? action() : null)}
      variant={buttonVariant || "ghost"}
      className={`gap-4 justify-start font-medium ${buttonVariant ? "" : "hover:bg-accent-foreground/20"} ${isActive ? "bg-accent-foreground/20" : ""}`}>
      <div>{Icon && <Icon size={18} />}</div>
      <div>{label}</div>
    </Button>
  );
};

const Sidebar = () => {
  const sidebar = useAppSelector((state) => state.sidebarReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <div className="min-w-44 border-r border-r-black/10 h-full flex justify-center py-4 flex-col justify-between">
      <div className="flex flex-col gap-3 px-2 w-full">
        {SIDEBAR_OPTIONS.map((option) => (
          <SidebarOption
            key={option.pageKey}
            isActive={sidebar.activePage === option.pageKey}
            action={() => {
              dispatch(setActivePage(option.pageKey));
              if (option.href) {
                router.push(option.href);
              }
            }}
            {...option}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3 px-2 w-full">
        <SidebarOption
          label="Logout"
          icon={LogOut}
          buttonVariant={"destructive"}
          action={() => signOut()}
        />
      </div>
    </div>
  );
};

export default Sidebar;
