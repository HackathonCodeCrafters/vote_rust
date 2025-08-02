"use client";

import { Clock, TrendingUp, Users } from "lucide-react";

interface StatsDetailProposalProps {
  timeRemaining: string;
  isExpired: boolean;
  totalVoters: number;
  totalVotes: number;
  darkMode: boolean;
}

export default function StatsDetailProposal({
  timeRemaining,
  isExpired,
  totalVoters,
  totalVotes,
  darkMode,
}: StatsDetailProposalProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div
        className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
      >
        <div className="flex items-center space-x-2 mb-1">
          <Clock
            size={16}
            className={isExpired ? "text-red-500" : "text-orange-500"}
          />
          <span className="text-sm font-medium">Time Left</span>
        </div>
        <div className={`text-lg font-bold ${isExpired ? "text-red-500" : ""}`}>
          {timeRemaining}
        </div>
      </div>

      <div
        className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
      >
        <div className="flex items-center space-x-2 mb-1">
          <Users size={16} className="text-blue-500" />
          <span className="text-sm font-medium">Total Voters</span>
        </div>
        <div className="text-xl font-bold">{totalVoters.toLocaleString()}</div>
      </div>

      <div
        className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
      >
        <div className="flex items-center space-x-2 mb-1">
          <TrendingUp size={16} className="text-green-500" />
          <span className="text-sm font-medium">Total Votes</span>
        </div>
        <div className="text-xl font-bold">{totalVotes.toLocaleString()}</div>
      </div>
    </div>
  );
}
