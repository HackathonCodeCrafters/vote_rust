"use client";

import type { Proposal } from "@/@types/proposal";
import { Clock, Users } from "lucide-react";
import { useDarkMode } from "../../../context/DarkModeContext";
import Badge from "../../atoms/Badge";
import Card from "../../atoms/Card";

interface ProposalCardProps {
  proposal: Proposal;
  onClick: (proposal: Proposal) => void;
}

export default function ProposalCard({ proposal, onClick }: ProposalCardProps) {
  const { darkMode } = useDarkMode();

  // Handle both old and new proposal structure
  const yesVotes = proposal.votes?.yes ?? proposal.yesVotes ?? 0;
  const noVotes = proposal.votes?.no ?? proposal.noVotes ?? 0;
  const totalVotes = yesVotes + noVotes;
  const yesPercentage = totalVotes > 0 ? (yesVotes / totalVotes) * 100 : 0;

  const imageUrl = proposal.image || proposal.imageUrl || "/placeholder.svg";
  const totalVotersCount = proposal.totalVoters ?? totalVotes;
  const categoryName = proposal.category ?? "General";
  const authorName = proposal.author ?? "Anonymous";

  return (
    <Card
      className="p-6 cursor-pointer"
      onClick={() => onClick(proposal)}
      hover
      darkMode={darkMode}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={proposal.title}
          className="w-full md:w-32 h-24 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="success">{categoryName}</Badge>
            <span
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              by {authorName}
            </span>
          </div>
          <h3
            className={`text-lg font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {proposal.title}
          </h3>
          <p
            className={`text-sm mb-3 line-clamp-2 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {proposal.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{proposal.durationDays || "Unknown"}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users size={14} />
                <span>{totalVotersCount.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-green-500">
                {yesPercentage.toFixed(1)}% Yes
              </div>
              <div className="text-xs text-gray-500">
                {totalVotes.toLocaleString()} votes
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
