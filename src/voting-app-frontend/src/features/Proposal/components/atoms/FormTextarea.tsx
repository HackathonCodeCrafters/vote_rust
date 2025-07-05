// FormText.tsx
"use client";

import { Field, Textarea } from "@chakra-ui/react";

interface FormTextProps {
  label: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  darkMode?: boolean;
}

export default function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  rows = 3,
  darkMode = false,
}: FormTextProps) {
  return (
    <Field.Root>
      <Field.Label
        className={`block text-sm font-medium mb-2 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {label}
        {required && " *"}
      </Field.Label>
      <Textarea
        name={name}
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
        } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
      />
    </Field.Root>
  );
}
