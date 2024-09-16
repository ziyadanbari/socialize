"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"
import { DEFAULT_PROFILE_PICTURE } from "@/constants"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className,src, ...props }, ref) => {
  const [imageSrc, setImageSrc] = React.useState(src || DEFAULT_PROFILE_PICTURE);

    // Function to validate image and fallback if necessary
    

    // When src changes, validate the new image
    React.useEffect(() => {
      function validateImage(imageUrl:string) {
        const img = new Image();
        img.src = imageUrl;

        img.onload = function () {
          setImageSrc(src || "")
        };

        img.onerror = function () {
          
          setImageSrc(DEFAULT_PROFILE_PICTURE);
        };
      }
      validateImage(src || "");
    }, [src]);

    return (
      <AvatarPrimitive.Image
        ref={ref}
        className={`aspect-square h-full w-full object-cover bg-black ${className}`}
        src={imageSrc}
        {...props}
      />
    );
})
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
