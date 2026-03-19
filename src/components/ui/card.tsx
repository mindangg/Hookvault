import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-black border border-white/[0.08] text-white rounded-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
