"use client";

import { TrendingUp, Users, Vote } from "lucide-react";

interface Activity {
  type: "vote" | "create" | "member";
  action: string;
  proposal: string;
  time: string;
}

interface RecentActivityItemProps {
  activity: Activity;
  darkMode?: boolean;
}

export default function RecentActivityItem({
  activity,
  darkMode = false,
}: RecentActivityItemProps) {
  const iconClass = `w-8 h-8 rounded-full flex items-center justify-center ${
    activity.type === "vote"
      ? "bg-green-100 text-green-600"
      : activity.type === "create"
      ? "bg-blue-100 text-blue-600"
      : "bg-purple-100 text-purple-600"
  }`;

  const Icon =
    activity.type === "vote"
      ? Vote
      : activity.type === "create"
      ? TrendingUp
      : Users;

  return (
    <div className="flex items-start space-x-3">
      <div className={iconClass}>
        <Icon size={16} />
      </div>
      <div className="flex-1">
        <p
          className={`text-sm font-medium ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {activity.action}
        </p>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          {activity.proposal}
        </p>
        <p className="text-xs text-gray-500">{activity.time}</p>
      </div>
    </div>
  );
}
