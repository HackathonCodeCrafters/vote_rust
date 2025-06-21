"use client";

import type { LucideIcon } from "lucide-react";
import type React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "gradient" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon: Icon,
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
    gradient:
      "bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 focus:ring-emerald-500",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm rounded-lg",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-6 py-3 text-lg rounded-xl",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && (
        <Icon
          size={size === "sm" ? 16 : size === "lg" ? 20 : 18}
          className="mr-2"
        />
      )}
      {children}
    </button>
  );
}
