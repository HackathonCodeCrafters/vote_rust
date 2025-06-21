"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Network {
  name: string;
  color: string;
  icon: string;
}

interface NetworkSelectorProps {
  networks: Network[];
  selectedNetwork: string;
  onNetworkChange: (network: string) => void;
  darkMode?: boolean;
}

export default function NetworkSelector({
  networks,
  selectedNetwork,
  onNetworkChange,
  darkMode = false,
}: NetworkSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
        }`}
      >
        <div
          className={`w-3 h-3 rounded-full ${
            networks.find((n) => n.name === selectedNetwork)?.color
          }`}
        ></div>
        <span className="text-sm font-medium">{selectedNetwork}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 right-0 w-48 rounded-lg shadow-lg border overflow-hidden z-50 ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {networks.map((network) => (
            <button
              key={network.name}
              onClick={() => {
                onNetworkChange(network.name);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                darkMode
                  ? "hover:bg-gray-700 text-white"
                  : "hover:bg-gray-50 text-gray-900"
              }`}
            >
              <div className={`w-4 h-4 rounded-full ${network.color}`}></div>
              <span className="text-lg">{network.icon}</span>
              <span className="font-medium">{network.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
