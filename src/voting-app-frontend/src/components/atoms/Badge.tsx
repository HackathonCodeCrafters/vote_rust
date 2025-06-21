"use client";

import type React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({
  children,
  variant = "primary",
  size = "md",
  className = "",
}: BadgeProps) {
  const baseClasses = "inline-flex items-center font-medium rounded-full";

  const variants = {
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-2.5 py-0.5 text-sm",
  };

  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
