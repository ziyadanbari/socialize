"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({ href, children, className, ...props }) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`${pathname === href ? "active" : null} ${className}`}
      {...props}>
      {children}
    </Link>
  );
}
