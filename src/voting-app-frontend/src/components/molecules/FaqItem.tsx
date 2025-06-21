"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  darkMode?: boolean;
}

export default function FAQItem({
  question,
  answer,
  darkMode = false,
}: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border rounded-lg ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${
          darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
        }`}
      >
        <span
          className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`transition-transform ${isOpen ? "rotate-180" : ""} ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        />
      </button>
      {isOpen && (
        <div
          className={`px-6 pb-4 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
