"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const PostModalLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const query = useSearchParams()
  const isModal = query.get("modal")
  useEffect(() => {
    if (JSON.parse(isModal || "true") === false) {
      window.location.reload()
    }
  },[isModal])
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