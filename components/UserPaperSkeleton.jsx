"use client";

export default function UserPaper({ className, ...props }) {
  return (
    <div className={`w-full p-2 ${className}`} {...props}>
      <div className="flex items-center gap-3 flex-1">
        <div className="w-12 h-12 bg-slate-400 rounded-full animate-pulse"></div>
        <div className="flex flex-col gap-1">
          <div className="w-32 h-3 rounded-lg bg-slate-400 animate-pulse"></div>
          <div className="w-24 h-2 rounded-lg bg-slate-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
