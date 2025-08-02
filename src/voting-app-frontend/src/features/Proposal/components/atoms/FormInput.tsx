import { Field, Input } from "@chakra-ui/react";

interface FormInputProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  darkMode?: boolean;
}

export default function FormInput({
  label,
  value,
  onChange,
  name,
  placeholder,
  type,
  disabled = false,
  darkMode = false,
}: FormInputProps) {
  return (
    <Field.Root>
      <Field.Label
        className={`block text-sm font-medium mb-2 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {label}
      </Field.Label>
      <Input
        id={name}
        type={type || "text"}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
        } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
      />
    </Field.Root>
  );
}
