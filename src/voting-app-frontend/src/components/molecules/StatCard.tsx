"use client";

import type { LucideIcon } from "lucide-react";
import Card from "../atoms/Card";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  change: string;
  darkMode?: boolean;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  color,
  change,
  darkMode = false,
}: StatCardProps) {
  return (
    <Card className="p-6" hover darkMode={darkMode}>
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center`}
        >
          <Icon className="text-white" size={24} />
        </div>
        <span className="text-green-500 text-sm font-medium">{change}</span>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div
        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
      >
        {label}
      </div>
    </Card>
  );
}
