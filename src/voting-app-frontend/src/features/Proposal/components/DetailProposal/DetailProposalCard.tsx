"use client";

import type { Proposal } from "@/@types/proposal";
import { useCountdown } from "@/features/Dashboard/utils/proposalTime";
import { useDarkMode } from "../../../../context/DarkModeContext";

import BackgroundOverlay from "../atoms/BackgroundOverlay";
import ProposalDescription from "./DescriptionDetailProposal";
import ProposalHeader from "./HeaderDetailProposal";
import ProposalStats from "./StatsDetailProposal";
import VotingButtons from "./VotingButtonDetailProposal";
import VotingResults from "./VotingResultDetailProposal";

interface ProposalDetailModalProps {
  proposal: Proposal | null;
  isOpen: boolean;
  onClose: () => void;
  onVote: (proposalId: string, vote: "yes" | "no") => void;
}

export default function ProposalDetailModal({
  proposal,
  isOpen,
  onClose,
  onVote,
}: ProposalDetailModalProps) {
  const { darkMode } = useDarkMode();
  const createdAtString =
    typeof proposal?.createdAt === "number"
      ? new Date(proposal.createdAt * 1000).toISOString() // Multiply by 1000 for seconds to milliseconds
      : proposal?.createdAt || new Date().toISOString();
  const durationDays =
    typeof proposal?.durationDays === "number"
      ? proposal.durationDays
      : typeof proposal?.durationDays === "string"
      ? Number.parseInt(proposal.durationDays)
      : 7;
  const timeRemaining = useCountdown(createdAtString, durationDays);

  if (!isOpen || !proposal) return null;

  // Handle both old and new Proposal structure
  const yesVotes = proposal.votes?.yes ?? proposal.yesVotes ?? 0;
  const noVotes = proposal.votes?.no ?? proposal.noVotes ?? 0;
  const totalVotes = yesVotes + noVotes;
  const yesPercentage = totalVotes > 0 ? (yesVotes / totalVotes) * 100 : 0;
  const noPercentage = totalVotes > 0 ? (noVotes / totalVotes) * 100 : 0;

  const imageUrl = proposal.image || proposal.imageUrl || "/placeholder.svg";
  const description = proposal.description;
  const detailDescription = proposal.full_description;
  const totalVotersCount = proposal.totalVoters ?? totalVotes;
  const categoryName = proposal.category ?? "General";
  const authorName = proposal.author ?? "Anonymous";

  // Format time remaining display
  const formatTimeRemaining = () => {
    if (timeRemaining.isExpired) return "Expired";
    if (timeRemaining.days > 0)
      return `${timeRemaining.days}d ${timeRemaining.hours}h`;
    if (timeRemaining.hours > 0)
      return `${timeRemaining.hours}h ${timeRemaining.minutes}m`;
    return `${timeRemaining.minutes}m`;
  };

  // Determine if voting should be disabled
  const isVotingDisabled =
    timeRemaining.isExpired || proposal.status === "ended";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <BackgroundOverlay onClose={onClose} />

        {/* Modal */}
        <div
          className={`inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform rounded-2xl shadow-xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Header - Gunakan komponen ProposalHeader */}
          <ProposalHeader
            title={proposal.title}
            imageUrl={imageUrl}
            categoryName={categoryName}
            authorName={authorName}
            isExpired={timeRemaining.isExpired}
            onClose={onClose}
          />

          {/* Content */}
          <div className="p-6">
            {/* Stats - Gunakan komponen ProposalStats */}
            <ProposalStats
              timeRemaining={formatTimeRemaining()}
              isExpired={timeRemaining.isExpired}
              totalVoters={totalVotersCount}
              totalVotes={totalVotes}
              darkMode={darkMode}
            />

            {/* Description - Gunakan komponen ProposalDescription */}
            <ProposalDescription
              description={description}
              detailDescription={detailDescription}
              darkMode={darkMode}
            />

            {/* Voting Results - Gunakan komponen VotingResults */}
            <VotingResults
              yesVotes={yesVotes}
              noVotes={noVotes}
              yesPercentage={yesPercentage}
              noPercentage={noPercentage}
              darkMode={darkMode}
            />

            {/* Vote Buttons - Gunakan komponen VotingButtons */}
            <VotingButtons
              proposalId={proposal.id}
              isVotingDisabled={isVotingDisabled}
              onVote={onVote}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
