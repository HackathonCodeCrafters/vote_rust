"use client";

import type { Proposal } from "@/@types/proposal";
import { useCountdown } from "@/features/Dashboard/utils/proposalTime";
import Button from "@/shared/components/Button";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDarkMode } from "../../../context/DarkModeContext";

interface ProposalDetailPageProps {
  backend?: any;
  principal?: string;
  onVote: (proposalId: string, vote: "yes" | "no") => void;
}

export default function ProposalDetailPage({
  backend,
  principal,
  onVote,
}: ProposalDetailPageProps) {
  const { darkMode } = useDarkMode();
  const { principal_id, proposalName } = useParams();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch proposal data based on URL parameters
  useEffect(() => {
    const fetchProposal = async () => {
      if (!backend || !principal_id || !proposalName) {
        setError("Missing required parameters");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Convert URL-friendly name back to title (replace hyphens with spaces)
        const proposalTitle = proposalName.replace(/-/g, " ");

        // Fetch proposals from backend
        const proposals = await backend.getProposals();

        // Find the proposal by title and principal ID
        // Use the principal_id from URL params first, then fallback to authenticated principal
        const foundProposal = proposals.find((p: Proposal) => {
          const titleMatches =
            p.title.toLowerCase() === proposalTitle.toLowerCase();

          // Try different principal matching strategies
          const principalMatches =
            p.principalId === principal_id ||
            p.author_principal === principal_id ||
            p.author_principal === principal_id ||
            // If principal_id from URL doesn't match, try using authenticated principal
            (principal &&
              (p.principalId === principal ||
                p.author_principal === principal ||
                p.author_principal === principal));

          return titleMatches && principalMatches;
        });

        if (foundProposal) {
          setProposal(foundProposal);
        } else {
          // If no proposal found with principal_id from URL, try finding by title only
          const proposalByTitle = proposals.find(
            (p: Proposal) =>
              p.title.toLowerCase() === proposalTitle.toLowerCase()
          );

          if (proposalByTitle) {
            setProposal(proposalByTitle);
            console.warn(
              `Proposal found by title only. URL principal_id: ${principal_id}, Found proposal principal: ${
                proposalByTitle.principalId || proposalByTitle.author_principal
              }`
            );
          } else {
            setError("Proposal not found");
            console.error(
              "Available proposals:",
              proposals.map(
                (p: {
                  title: any;
                  principalId: any;
                  author_principal: any;
                  authorPrincipal: any;
                }) => ({
                  title: p.title,
                  principalId: p.principalId,
                  author_principal: p.author_principal,
                  authorPrincipal: p.authorPrincipal,
                })
              )
            );
          }
        }
      } catch (err) {
        console.error("Error fetching proposal:", err);
        setError("Failed to load proposal");
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [backend, principal_id, proposalName, principal]); // Added principal to dependencies

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
            Loading proposal...
          </p>
        </div>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h1
            className={`text-2xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Proposal Not Found
          </h1>
          <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {error || "The proposal you're looking for doesn't exist."}
          </p>
          <div className="space-y-2 mb-6 text-sm text-gray-500">
            <p>URL Principal ID: {principal_id}</p>
            <p>Authenticated Principal: {principal}</p>
            <p>Proposal Name: {proposalName}</p>
          </div>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="gradient"
            icon={ArrowLeft}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

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
  const discussionsCount = proposal.discussions ?? 0;
  const categoryName = proposal.category ?? "General";
  const authorName = proposal.author ?? "Anonymous";

  // Get duration days, fallback to parsing duration string
  const durationDays =
    typeof proposal.durationDays === "number"
      ? proposal.durationDays
      : proposal.durationDays !== undefined && proposal.durationDays !== null
      ? parseInt(String(proposal.durationDays))
      : 7;

  // Use countdown hook for real-time updates
  const createdAtString =
    typeof proposal.createdAt === "number"
      ? new Date(proposal.createdAt).toISOString()
      : proposal.createdAt || new Date().toISOString();

  const timeRemaining = useCountdown(createdAtString, durationDays);

  // Format time remaining display
  const formatTimeRemaining = () => {
    if (timeRemaining.isExpired) return "Expired";
    if (timeRemaining.days > 0) {
      return `${timeRemaining.days} day${
        timeRemaining.days !== 1 ? "s" : ""
      }, ${timeRemaining.hours} hour${timeRemaining.hours !== 1 ? "s" : ""}`;
    }
    if (timeRemaining.hours > 0) {
      return `${timeRemaining.hours} hour${
        timeRemaining.hours !== 1 ? "s" : ""
      }, ${timeRemaining.minutes} minute${
        timeRemaining.minutes !== 1 ? "s" : ""
      }`;
    }
    return `${timeRemaining.minutes} minute${
      timeRemaining.minutes !== 1 ? "s" : ""
    }`;
  };

  // Determine if voting should be disabled
  const isVotingDisabled =
    timeRemaining.isExpired || proposal.status === "ended";

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            icon={ArrowLeft}
            className="mb-4"
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Main Content */}
        <div
          className={`rounded-2xl shadow-xl overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Header */}
          <div className="relative">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={proposal.title}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* Expired Overlay */}
            {timeRemaining.isExpired && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-center">
                  <AlertCircle size={48} className="mx-auto mb-2" />
                  <span className="text-2xl font-bold">PROPOSAL ENDED</span>
                </div>
              </div>
            )}

            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center space-x-2 mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    timeRemaining.isExpired ? "bg-red-500" : "bg-emerald-500"
                  }`}
                >
                  {categoryName}
                </span>
                <span className="text-base opacity-90">by {authorName}</span>
                {timeRemaining.isExpired && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-600">
                    EXPIRED
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold leading-tight">
                {proposal.title}
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div
                className={`p-5 rounded-xl ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Clock
                    size={18}
                    className={
                      timeRemaining.isExpired
                        ? "text-red-500"
                        : "text-orange-500"
                    }
                  />
                  <span className="text-sm font-medium">Time Left</span>
                </div>
                <div
                  className={`text-xl font-bold ${
                    timeRemaining.isExpired ? "text-red-500" : ""
                  }`}
                >
                  {formatTimeRemaining()}
                </div>
              </div>
              <div
                className={`p-5 rounded-xl ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Users size={18} className="text-blue-500" />
                  <span className="text-sm font-medium">Total Voters</span>
                </div>
                <div className="text-xl font-bold">
                  {totalVotersCount.toLocaleString()}
                </div>
              </div>
              <div
                className={`p-5 rounded-xl ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp size={18} className="text-green-500" />
                  <span className="text-sm font-medium">Total Votes</span>
                </div>
                <div className="text-xl font-bold">
                  {totalVotes.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2
                className={`text-2xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Short Description
              </h2>
              <p
                className={`text-lg leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {description}
              </p>
            </div>

            {detailDescription && (
              <div className="mb-8">
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Detailed Description
                </h2>
                <p
                  className={`text-lg leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {detailDescription}
                </p>
              </div>
            )}

            {/* Voting Results */}
            <div className="mb-8">
              <h2
                className={`text-2xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Current Results
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle size={24} className="text-green-500" />
                      <span className="text-lg font-medium">Yes</span>
                      <span className="text-sm text-gray-500">
                        ({yesVotes.toLocaleString()} votes)
                      </span>
                    </div>
                    <span className="text-xl font-bold text-green-500">
                      {yesPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div
                    className={`w-full bg-gray-200 rounded-full h-4 ${
                      darkMode ? "bg-gray-700" : ""
                    }`}
                  >
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${yesPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-3">
                      <XCircle size={24} className="text-red-500" />
                      <span className="text-lg font-medium">No</span>
                      <span className="text-sm text-gray-500">
                        ({noVotes.toLocaleString()} votes)
                      </span>
                    </div>
                    <span className="text-xl font-bold text-red-500">
                      {noPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div
                    className={`w-full bg-gray-200 rounded-full h-4 ${
                      darkMode ? "bg-gray-700" : ""
                    }`}
                  >
                    <div
                      className="bg-gradient-to-r from-red-500 to-pink-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${noPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vote Buttons */}
            {!isVotingDisabled && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => onVote(proposal.id, "yes")}
                  variant="gradient"
                  icon={CheckCircle}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-500/25 text-lg py-4"
                >
                  Vote Yes
                </Button>
                <Button
                  onClick={() => onVote(proposal.id, "no")}
                  variant="gradient"
                  icon={XCircle}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 shadow-red-500/25 text-lg py-4"
                >
                  Vote No
                </Button>
              </div>
            )}

            {isVotingDisabled && (
              <div className="text-center p-6 bg-gray-100 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <AlertCircle size={24} className="text-red-500" />
                  <span className="text-lg font-medium text-red-500">
                    Voting Ended
                  </span>
                </div>
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
