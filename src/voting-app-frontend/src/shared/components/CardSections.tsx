"use client";

import type React from "react";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  darkMode?: boolean;
  gradient?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function Card({
  children,
  className = "",
  onClick,
  hover = false,
  darkMode = false,
  gradient = "",
  icon,
  title = "",
  description = "",
  titleClassName = "",
  descriptionClassName = "",
}: CardProps) {
  const baseClasses =
    "rounded-2xl border bcakdrop-blur-sm transition-all duration-300";
  const interactiveClasses = hover ? "hover:scale-[1.02] cursor-pointer" : "";
  const themeClasses = darkMode
    ? "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70"
    : "bg-white/50";

  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${themeClasses} ${className}`}
      onClick={onClick}
    >
      <div className="p-6 text-center">
        {icon && (
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} mb-4 mx-auto flex items-center justify-center`}
          >
            {icon}
          </div>
        )}

        {title && (
          <h3 className={`mb-2 ${titleClassName || "text-xl font-bold"}`}>
            {title}
          </h3>
        )}

        {description && (
          <p
            className={
              descriptionClassName ||
              (darkMode ? "text-gray-400" : "text-gray-600")
            }
          >
            {description}
          </p>
        )}

        {children}
      </div>
    </div>
  );
}
