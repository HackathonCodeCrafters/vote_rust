"use client";

import { CheckCircle, XCircle } from "lucide-react";

interface VotingButtonDetailProposalProps {
  yesVotes: number;
  noVotes: number;
  yesPercentage: number;
  noPercentage: number;
  darkMode: boolean;
}

export default function VotingButtonDetailProposal({
  yesVotes,
  noVotes,
  yesPercentage,
  noPercentage,
  darkMode,
}: VotingButtonDetailProposalProps) {
  return (
    <div className="mb-6">
      <h2
        className={`text-xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Current Results
      </h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <CheckCircle size={20} className="text-green-500" />
              <span className="font-medium">Yes</span>
              <span className="text-sm text-gray-500">
                ({yesVotes.toLocaleString()} votes)
              </span>
            </div>
            <span className="text-lg font-bold text-green-500">
              {yesPercentage.toFixed(1)}%
            </span>
          </div>
          <div
            className={`w-full bg-gray-200 rounded-full h-3 ${
              darkMode ? "bg-gray-700" : ""
            }`}
          >
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${yesPercentage}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <XCircle size={20} className="text-red-500" />
              <span className="font-medium">No</span>
              <span className="text-sm text-gray-500">
                ({noVotes.toLocaleString()} votes)
              </span>
            </div>
            <span className="text-lg font-bold text-red-500">
              {noPercentage.toFixed(1)}%
            </span>
          </div>
          <div
            className={`w-full bg-gray-200 rounded-full h-3 ${
              darkMode ? "bg-gray-700" : ""
            }`}
          >
            <div
              className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${noPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
