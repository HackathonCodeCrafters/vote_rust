"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  darkMode?: boolean;
  gradient?: string;
}

export default function Card({
  children,
  className = "",
  onClick,
  hover = false,
  darkMode = false,
  gradient,
}: CardProps) {
  const baseClasses =
    "rounded-2xl border backdrop-blur-sm transition-all duration-300";
  const interactiveClasses = hover ? "hover:scale-[1.02] cursor-pointer" : "";
  const themeClasses = darkMode
    ? "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70"
    : "bg-white/50 border-gray-200 hover:bg-white/70";

  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${themeClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
