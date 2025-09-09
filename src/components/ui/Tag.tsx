import React from "react";
import { cn } from "@/lib/utils";

export function Tag({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-full bg-primary-100 text-primary-800 px-3 py-1 text-sm font-medium mr-2 mb-2",
        className
      )}
    >
      {children}
    </span>
  );
}
