"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const PostModalLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <>
      <Dialog
        defaultOpen={true}
        onOpenChange={(open) => {
          if (!open) router.back();
        }}>
        <DialogContent className="sm:h-auto h-full max-w-4xl py-8">
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PostModalLayout