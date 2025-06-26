"use client";

import type { Proposal } from "@/@types/proposal";
import {
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { useDarkMode } from "../../../context/DarkModeContext";
import Button from "../../atoms/Button";

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

  if (!isOpen || !proposal) return null;

  // Handle both old and new proposal structure
  const yesVotes = proposal.votes?.yes ?? proposal.yesVotes ?? 0;
  const noVotes = proposal.votes?.no ?? proposal.noVotes ?? 0;
  const totalVotes = yesVotes + noVotes;
  const yesPercentage = totalVotes > 0 ? (yesVotes / totalVotes) * 100 : 0;
  const noPercentage = totalVotes > 0 ? (noVotes / totalVotes) * 100 : 0;

  const imageUrl = proposal.image || proposal.imageUrl || "/placeholder.svg";
  const description = proposal.description;
  const detailDescription = proposal.fullDescription;
  const totalVotersCount = proposal.totalVoters ?? totalVotes;
  const discussionsCount = proposal.discussions ?? 0;
  const categoryName = proposal.category ?? "General";
  const authorName = proposal.author ?? "Anonymous";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div
          className={`inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform rounded-2xl shadow-xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Header */}
          <div className="relative">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={proposal.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500">
                  {categoryName}
                </span>
                <span className="text-sm opacity-80">by {authorName}</span>
              </div>
              <h1 className="text-3xl font-bold">{proposal.title}</h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Clock size={16} className="text-orange-500" />
                  <span className="text-sm font-medium">Time Left</span>
                </div>
                <div className="text-xl font-bold">
                  {proposal.durationDays || "Unknown"}
                </div>
              </div>
              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Users size={16} className="text-blue-500" />
                  <span className="text-sm font-medium">Total Voters</span>
                </div>
                <div className="text-xl font-bold">
                  {totalVotersCount.toLocaleString()}
                </div>
              </div>
              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp size={16} className="text-green-500" />
                  <span className="text-sm font-medium">Total Votes</span>
                </div>
                <div className="text-xl font-bold">
                  {totalVotes.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2
                className={`text-xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Short Description
              </h2>
              <p
                className={`leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {description}
              </p>
            </div>

            <div className="mb-6">
              <h2
                className={`text-xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Detail Description
              </h2>
              <p
                className={`leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {detailDescription}
              </p>
            </div>

            {/* Voting Results */}
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

            {/* Vote Buttons */}
            {proposal.status !== "ended" && (
              <div className="flex space-x-4">
                <Button
                  onClick={() => onVote(proposal.id, "yes")}
                  variant="gradient"
                  icon={CheckCircle}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-500/25"
                >
                  Vote Yes
                </Button>
                <Button
                  onClick={() => onVote(proposal.id, "no")}
                  variant="gradient"
                  icon={XCircle}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 shadow-red-500/25"
                >
                  Vote No
                </Button>
              </div>
            )}

            {proposal.status === "ended" && (
              <div className="text-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400">
                  This proposal has ended and is no longer accepting votes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
