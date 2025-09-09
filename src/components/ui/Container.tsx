import React from "react";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-5xl mx-auto px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
