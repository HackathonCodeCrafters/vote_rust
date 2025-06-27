"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

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
    <motion.div
      layout
      initial={{ borderRadius: 8 }}
      className={`border rounded-lg transition-all ${
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
          className={`font-medium text-base ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown
            size={20}
            className={`${
              darkMode ? "text-gray-400" : "text-gray-600"
            } transition-transform duration-300`}
          />
        </motion.div>
      </button>

      {isOpen && (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`px-6 pb-4 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <p>{answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
