"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      children,
      childrenBackground,
      ...props
    },
    ref
  ) => (
    <div className="relative">
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-white/60",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )}
        {...props}
      />
      <div
        className="absolute left-2/4 -translate-x-2/4 px-3 top-0 -translate-y-2/4 bg-background text-white/60 text-sm"
        style={{
          background: childrenBackground
            ? `${childrenBackground} !important`
            : null,
        }}>
        {children}
      </div>
    </div>
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
