"use client";

interface PaginationInfoProps {
  startIndex: number;
  endIndex: number;
  totalItems: number;
  darkMode?: boolean;
  className?: string;
}

export default function PaginationInfo({
  startIndex,
  endIndex,
  totalItems,
  darkMode = false,
  className = "",
}: PaginationInfoProps) {
  return (
    <div
      className={`text-sm ${
        darkMode ? "text-gray-400" : "text-gray-600"
      } ${className}`}
    >
      Showing <span className="font-medium">{startIndex}</span> to{" "}
      <span className="font-medium">{endIndex}</span> of{" "}
      <span className="font-medium">{totalItems}</span> results
    </div>
  );
}
