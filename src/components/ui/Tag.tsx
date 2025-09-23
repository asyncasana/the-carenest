import React from "react";
import { cn } from "@/lib/utils";

const tagVariants = {
  default: "bg-neutral-100 text-neutral-800",
  category: "bg-amber-50 text-amber-800 border border-amber-200",
  cost: "bg-blue-50 text-blue-800 border border-blue-200",
  area: "bg-stone-50 text-stone-800 border border-stone-200",
};

export function Tag({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof tagVariants;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2",
        tagVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
