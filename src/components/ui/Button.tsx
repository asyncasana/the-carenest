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
          "inline-flex items-center justify-center rounded-lg px-5 py-2.5 font-medium text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500",
          variant === "primary"
            ? "bg-primary-600 text-white hover:bg-primary-700"
            : "bg-neutral-100 text-stone-500 hover:bg-neutral-200 border border-neutral-200",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
