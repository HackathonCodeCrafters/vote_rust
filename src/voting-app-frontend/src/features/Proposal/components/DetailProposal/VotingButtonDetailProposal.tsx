"use client";

import Button from "@/shared/components/Button";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface VotingButtonDetailProposalProps {
  darkMode?: boolean;
  proposalId: string;
  isVotingDisabled: boolean;
  onVote: (proposalId: string, vote: "yes" | "no") => void;
}

export default function VotingButtonDetailProposal({
  darkMode,
  proposalId,
  isVotingDisabled,
  onVote,
}: VotingButtonDetailProposalProps) {
  if (!isVotingDisabled) {
    return (
      <div className="flex space-x-4">
        <Button
          onClick={() => onVote(proposalId, "yes")}
          variant="gradient"
          icon={CheckCircle}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-500/25"
        >
          Vote Yes
        </Button>
        <Button
          onClick={() => onVote(proposalId, "no")}
          variant="gradient"
          icon={XCircle}
          className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 shadow-red-500/25"
        >
          Vote No
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`text-center p-4 rounded-lg ${
        darkMode ? "bg-gray-700" : "bg-gray-100"
      }`}
    >
      <div className="flex items-center justify-center space-x-2 mb-2">
        <AlertCircle size={20} className="text-red-500" />
        <span className="font-medium text-red-500">Voting Ended</span>
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        This proposal has ended and is no longer accepting votes.
      </p>
    </div>
  );
}
