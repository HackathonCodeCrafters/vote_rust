"use client";

import type { Proposal } from "@/@types/proposal";
import { useCountdown } from "@/features/Dashboard/utils/proposalTime";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import { AlertCircle, Clock, ExternalLink, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../../context/DarkModeContext";

interface ProposalCardProps {
  proposal: Proposal;
  onClick: (proposal: Proposal) => void;
}

export default function ProposalCard({ proposal, onClick }: ProposalCardProps) {
  const { darkMode } = useDarkMode();

  // Handle both old and new Proposal structure
  const yesVotes = proposal.votes?.yes ?? proposal.yesVotes ?? 0;
  const noVotes = proposal.votes?.no ?? proposal.noVotes ?? 0;
  const totalVotes = yesVotes + noVotes;
  const yesPercentage = totalVotes > 0 ? (yesVotes / totalVotes) * 100 : 0;

  const imageUrl = proposal.image || proposal.imageUrl || "/placeholder.svg";
  const totalVotersCount = proposal.totalVoters ?? totalVotes;
  const categoryName = proposal.category ?? "General";
  const authorName = proposal.author ?? "Anonymous";

  const navigate = useNavigate();

  const handleViewProposal = () => {
    // Format nama proposal untuk URL (ganti spasi dengan hyphen)
    const urlFriendlyName = proposal.title.replace(/\s+/g, "-").toLowerCase();

    // Navigate ke detail proposal
    navigate(
      `/proposal/${
        proposal.principalId || proposal.author_principal
      }/${urlFriendlyName}`
    );
  };

  // Get duration days, fallback to parsing duration string
  const durationDays =
    typeof proposal.durationDays === "number"
      ? proposal.durationDays
      : typeof proposal.durationDays === "string"
      ? parseInt(proposal.durationDays)
      : 7;

  // FIX: Convert UNIX timestamp from seconds to milliseconds
  const createdAtString =
    typeof proposal.createdAt === "number"
      ? new Date(proposal.createdAt * 1000).toISOString() // Multiply by 1000 for seconds to milliseconds
      : proposal.createdAt || new Date().toISOString();

  const timeRemaining = useCountdown(createdAtString, durationDays);

  // Determine status color based on time remaining
  const getTimeColor = () => {
    if (timeRemaining.isExpired) return "text-red-500";
    if (timeRemaining.days === 0 && timeRemaining.hours < 24)
      return "text-orange-500";
    if (timeRemaining.days <= 1) return "text-yellow-500";
    return darkMode ? "text-gray-400" : "text-gray-600";
  };

  // Format time remaining display
  const formatTimeRemaining = () => {
    if (timeRemaining.isExpired) return "Expired";
    if (timeRemaining.days > 0)
      return `${timeRemaining.days}d ${timeRemaining.hours}h`;
    if (timeRemaining.hours > 0)
      return `${timeRemaining.hours}h ${timeRemaining.minutes}m`;
    return `${timeRemaining.minutes}m`;
  };

  return (
    <Card
      className="p-6 cursor-pointer relative"
      onClick={() => onClick(proposal)}
      hover
      darkMode={darkMode}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={proposal.title}
            className="w-full md:w-32 h-24 object-cover rounded-lg"
          />
          {timeRemaining.isExpired && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-semibold">ENDED</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant={timeRemaining.isExpired ? "error" : "success"}>
              {categoryName}
            </Badge>
            <span
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              by {authorName}
            </span>
            {timeRemaining.isExpired && (
              <div className="flex items-center space-x-1">
                <AlertCircle size={12} className="text-red-500" />
                <span className="text-xs text-red-500 font-medium">
                  EXPIRED
                </span>
              </div>
            )}
          </div>
          <h3
            className={`text-lg font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            } ${timeRemaining.isExpired ? "opacity-75" : ""}`}
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
                <Clock size={14} className={getTimeColor()} />
                <span className={getTimeColor()}>{formatTimeRemaining()}</span>
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
          <div>
            <Button onClick={handleViewProposal} className="mt-4">
              <span>Open in new tab</span>
              <ExternalLink />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
