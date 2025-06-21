"use client";

import type { Proposal } from "@/@types/type.proposal";
import { Clock, Users } from "lucide-react";
import Badge from "../../atoms/Badge";
import Card from "../../atoms/Card";

interface ProposalCardProps {
  proposal: Proposal;
  onClick: (proposal: Proposal) => void;
  darkMode?: boolean;
}

export default function ProposalCard({
  proposal,
  onClick,
  darkMode = false,
}: ProposalCardProps) {
  const totalVotes = proposal.votes.yes + proposal.votes.no;
  const yesPercentage =
    totalVotes > 0 ? (proposal.votes.yes / totalVotes) * 100 : 0;

  return (
    <Card
      className="p-6"
      onClick={() => onClick(proposal)}
      hover
      darkMode={darkMode}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={proposal.image || "/placeholder.svg"}
          alt={proposal.title}
          className="w-full md:w-32 h-24 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="success">{proposal.category}</Badge>
            <span
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              by {proposal.author}
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
            className={`text-sm mb-3 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {proposal.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{proposal.timeLeft}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users size={14} />
                <span>{proposal.totalVoters.toLocaleString()}</span>
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
