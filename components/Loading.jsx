"use client";
import { useLoading } from "@/exports";
import React from "react";

export default function Loading({ skipCheck }) {
  const { loading } = useLoading();
  if (!skipCheck && loading) {
    return (
      <div className="absolute z-[99999999] top-0 left-0 bg-white w-2/4 animate-move-x h-1"></div>
    );
  } else if (skipCheck) {
    return (
      <div className="absolute z-[99999999] top-0 left-0 bg-white w-2/4 animate-move-x h-1"></div>
    );
  }
}
