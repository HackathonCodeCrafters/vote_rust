"use client";

import {
  Select as ChakraSelect,
  createListCollection,
  Field,
  Portal,
} from "@chakra-ui/react";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps {
  label: string;
  name?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  darkMode?: boolean;
}

export default function FormSelect({
  label,
  name,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  required = false,
  darkMode = false,
}: FormSelectProps) {
  const collection = createListCollection({
    items: options,
  });

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

      <ChakraSelect.Root
        name={name}
        collection={collection}
        value={[value]}
        onValueChange={(details) => {
          if (details.value[0]) {
            onChange(details.value[0]);
          }
        }}
        required={required}
        size="md"
      >
        <ChakraSelect.HiddenSelect />
        <ChakraSelect.Control>
          <ChakraSelect.Trigger
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
          >
            <ChakraSelect.ValueText placeholder={placeholder} />
            <ChakraSelect.Indicator />
          </ChakraSelect.Trigger>
        </ChakraSelect.Control>

        <Portal>
          <ChakraSelect.Positioner>
            <ChakraSelect.Content
              className={`${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } border rounded-lg shadow-lg z-50`}
            >
              {collection.items.map((item) => (
                <ChakraSelect.Item
                  key={item.value}
                  item={item}
                  className={`px-4 py-2 cursor-pointer hover:${
                    darkMode ? "bg-gray-600" : "bg-gray-100"
                  } transition-colors`}
                >
                  <ChakraSelect.ItemText>{item.label}</ChakraSelect.ItemText>
                  <ChakraSelect.ItemIndicator />
                </ChakraSelect.Item>
              ))}
            </ChakraSelect.Content>
          </ChakraSelect.Positioner>
        </Portal>
      </ChakraSelect.Root>
    </Field.Root>
  );
}
