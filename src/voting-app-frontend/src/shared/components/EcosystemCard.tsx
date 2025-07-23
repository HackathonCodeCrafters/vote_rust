"use client";

import { ExternalLink } from "lucide-react";
import Card from "@/shared/components/Card";

interface EcosystemCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  darkMode?: boolean;
}

export default function EcosystemCard({
  title,
  description,
  image,
  link,
  category,
  darkMode = false,
}: EcosystemCardProps) {
  return (
    <Card className="p-6 group" hover darkMode={darkMode}>
      <div className="flex flex-col h-full">
        <div className="relative mb-4">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute top-3 left-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                category === "DeFi"
                  ? "bg-green-100 text-green-800"
                  : category === "NFT"
                  ? "bg-purple-100 text-purple-800"
                  : category === "Gaming"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {category}
            </span>
          </div>
        </div>
        <div className="flex-1">
          <h3
            className={`text-xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-sm mb-4 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {description}
          </p>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center space-x-2 text-sm font-medium transition-colors group-hover:text-blue-500 ${
            darkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          <span>Learn More</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </Card>
  );
}
