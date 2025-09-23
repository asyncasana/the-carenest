import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium text-lg transition-all duration-200 ease-in-out border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95",
          variant === "primary"
            ? "bg-accent text-text-main border-accent hover:bg-[#e5e1d1] hover:shadow-md focus-visible:ring-accent/20"
            : "bg-neutral-100 text-stone-500 hover:bg-neutral-200 border border-neutral-200 hover:shadow-sm focus-visible:ring-neutral-400/20",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
