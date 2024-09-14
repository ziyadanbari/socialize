'use client'
import { SIDEBAR_OPTIONS } from '@/constants'
import React from 'react'
import { Button, buttonVariants } from './button'
import { VariantProps } from 'class-variance-authority';
import { ISidebarOption } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/app';
import { useRouter } from 'next/navigation';
import { setActivePage } from '@/store/reducers/sidebarReducer';

type SidebarOption = Partial<
  ISidebarOption & {
    isActive: boolean;
    buttonVariant: VariantProps<typeof buttonVariants>["variant"];
  }
>;

const SidebarOption = ({
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
    </Button>
  );
};
const SidebarMobile = () => {
  const sidebar = useAppSelector((state) => state.sidebarReducer);
  console.log(sidebar)
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <div className='h-16 bg-white border-t border-black/20 p-4 justify-between flex items-center gap-3'>
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
  )
}

export default SidebarMobile