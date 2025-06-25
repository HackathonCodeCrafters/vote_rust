"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  darkMode?: boolean;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
  darkMode = false,
  className = "",
}: PaginationProps) {
  // Generate page numbers to display
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate start and end pages
      let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      // Adjust start if we're near the end
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      // Add first page and ellipsis if needed
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push("...");
        }
      }

      // Add visible pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis and last page if needed
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number" && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* First page button */}
      {showFirstLast && currentPage > 1 && (
        <Button
          onClick={() => onPageChange(1)}
          variant="outline"
          size="sm"
          className={`px-1 ${
            darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : ""
          }`}
        >
          First
        </Button>
      )}

      {/* Previous button */}
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
        icon={ChevronLeft}
        className={`px-1 ${
          darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700 px-2" : ""
        }`}
      >
        <span className="sr-only">Previous</span>
      </Button>

      {/* Page numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <div
                key={`ellipsis-${index}`}
                className={`px-3 py-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <MoreHorizontal size={16} />
              </div>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg"
                  : darkMode
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        variant="outline"
        size="sm"
        icon={ChevronRight}
        className={`px-1 ${
          darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : ""
        }`}
      >
        <span className="sr-only">Next</span>
      </Button>

      {/* Last page button */}
      {showFirstLast && currentPage < totalPages && (
        <Button
          onClick={() => onPageChange(totalPages)}
          variant="outline"
          size="sm"
          className={`px-1 ${
            darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : ""
          }`}
        >
          Last
        </Button>
      )}
    </div>
  );
}
