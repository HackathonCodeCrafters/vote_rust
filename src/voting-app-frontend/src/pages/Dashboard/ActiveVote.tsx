"use client";

import type { Proposal } from "@/@types";
import Card from "@/components/atoms/Card";
import Pagination from "@/components/atoms/Pagination";
import PaginationInfo from "@/components/molecules/PaginationInfo";
import ProposalDetailModal from "@/components/organism/proposal/DetailProposalCard";
import ProposalCard from "@/components/organism/proposal/ProposalCard";
import { useDarkMode } from "@/context/DarkModeContext";
import { useAuth } from "@/hooks/useAuth";
import { usePagination } from "@/hooks/usePagination";
import { ArrowUpDown, ChevronDown, Filter, SearchIcon, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { voting_app_backend as backend } from "../../../../declarations/voting-app-backend";

export default function ActiveVote() {
  const { darkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [proposals, setProposals] = useState<Proposal.Proposal[]>([]);
  const [selectedProposal, setSelectedProposal] =
    useState<Proposal.Proposal | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { principal } = useAuth();

  const categories = [
    { name: "All", count: 0, color: "from-gray-500 to-gray-600" },
    { name: "Governance", count: 0, color: "from-blue-500 to-cyan-500" },
    { name: "Economics", count: 0, color: "from-green-500 to-emerald-500" },
    { name: "Technical", count: 0, color: "from-purple-500 to-pink-500" },
    { name: "Funding", count: 0, color: "from-yellow-500 to-orange-500" },
    { name: "Product", count: 0, color: "from-red-500 to-pink-500" },
    { name: "Community", count: 0, color: "from-indigo-500 to-purple-500" },
    { name: "Security", count: 0, color: "from-orange-500 to-red-500" },
  ];

  const statusOptions = [
    { name: "All", count: 0 },
    { name: "Active", count: 0 },
    { name: "Ended", count: 0 },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "most_votes", label: "Most Votes" },
    { value: "least_votes", label: "Least Votes" },
    { value: "ending_soon", label: "Ending Soon" },
  ];

  // Calculate time left and status
  const calculateTimeLeft = (
    createdAt: number,
    durationDays: number
  ): string => {
    const now = Date.now() / 1000;
    const endTime = createdAt + durationDays * 86400;
    const timeLeft = endTime - now;

    if (timeLeft <= 0) return "Ended";
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    if (days > 0) return `${days} days`;
    if (hours > 0) return `${hours} hours`;
    return "Less than 1 hour";
  };

  const getProposalStatus = (
    createdAt: number,
    durationDays: number
  ): string => {
    const now = Date.now() / 1000;
    const endTime = createdAt + durationDays * 86400;
    return now < endTime ? "active" : "ended";
  };

  // Fetch proposals from backend
  const fetchProposals = async () => {
    try {
      setIsLoading(true);
      const rawProposals = await backend.get_proposals();
      console.log("Raw proposals from backend:", rawProposals);

      const parsedProposals: Proposal.Proposal[] = rawProposals.map(
        (p: any) => {
          const yesVotes = Number(p.yes_votes || 0);
          const noVotes = Number(p.no_votes || 0);
          const totalVoters = yesVotes + noVotes;
          const createdAt = Number(p.created_at);
          const durationDays = Number(p.duration_days || 7);
          const status = getProposalStatus(createdAt, durationDays);

          // Debug logging
          console.log("Proposal data:", {
            id: p.id,
            title: p.title,
            category: p.category,
            status: status,
            raw_category: p.category,
            raw_status: p.status,
          });

          const proposal = {
            id: p.id?.toString() || Math.random().toString(),
            title: p.title || "Untitled Proposal",
            description: p.description || "",
            full_description: p.full_description || p.description || "",
            image_url: p.image_url,
            image: p.image || p.image_url || "/placeholder.svg",
            votes: p.votes || {
              yes: yesVotes,
              no: noVotes,
            },
            yes_votes: yesVotes,
            no_votes: noVotes,
            created_at: createdAt,
            duration_days: durationDays,
            time_left:
              p.time_left || calculateTimeLeft(createdAt, durationDays),
            status: status,
            author: p.author || "Unknown",
            category: p.category || "General",
            total_voters: p.total_voters || totalVoters,
            discussions: p.discussions || 0,
            voters: [],

            // CamelCase compatibility
            yesVotes: yesVotes,
            noVotes: noVotes,
            createdAt: createdAt,
            durationDays: durationDays,
          };

          console.log("Parsed proposal:", {
            id: proposal.id,
            title: proposal.title,
            category: proposal.category,
            status: proposal.status,
          });

          return proposal;
        }
      );

      console.log("All parsed proposals:", parsedProposals);
      setProposals(parsedProposals);
    } catch (err) {
      console.error("Failed to fetch proposals:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort proposals
  // Filter and sort proposals
  const filteredAndSortedProposals = useMemo(() => {
    let filtered = [...proposals]; // Create a shallow copy first

    console.log("Starting filter with proposals:", filtered.length);
    console.log("Search query:", searchQuery);
    console.log("Selected category:", selectedCategory);
    console.log("Selected status:", selectedStatus);

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (proposal) =>
          (proposal.title && proposal.title.toLowerCase().includes(query)) ||
          (proposal.description &&
            proposal.description.toLowerCase().includes(query))
      );
      console.log(`After search filter: ${filtered.length} proposals`);
    }

    // Filter by category
    if (selectedCategory !== "All") {
      console.log("Filtering by category:", selectedCategory);
      console.log(
        "Proposals before category filter:",
        filtered.map((p) => ({
          id: p.id,
          category: p.category,
          categoryType: typeof p.category,
          categoryLength: p.category?.length,
        }))
      );

      filtered = filtered.filter((proposal) => {
        // Normalize both strings for comparison
        const proposalCategory = String(proposal.category).trim();
        const selectedCat = String(selectedCategory).trim();

        console.log(`Comparing: "${proposalCategory}" === "${selectedCat}"`);
        console.log(
          `Types: ${typeof proposalCategory} vs ${typeof selectedCat}`
        );
        console.log(
          `Lengths: ${proposalCategory.length} vs ${selectedCat.length}`
        );

        const matches = proposalCategory === selectedCat;
        console.log(
          `Proposal ${proposal.id} category "${proposalCategory}" matches "${selectedCat}":`,
          matches
        );
        return matches;
      });

      console.log(
        "Proposals after category filter:",
        filtered.map((p) => ({ id: p.id, category: p.category }))
      );
    }

    // Filter by status
    if (selectedStatus !== "All") {
      console.log("Filtering by status:", selectedStatus);
      console.log(
        "Proposals before status filter:",
        filtered.map((p) => ({
          id: p.id,
          status: p.status,
          statusType: typeof p.status,
          statusLength: p.status?.length,
        }))
      );

      filtered = filtered.filter((proposal) => {
        // Normalize both strings for comparison
        const proposalStatus = String(proposal.status).trim();
        const selectedStat = String(selectedStatus).toLowerCase().trim();

        let matches = false;
        if (selectedStat === "active") {
          matches = proposalStatus === "active";
        } else if (selectedStat === "ended") {
          matches = proposalStatus === "ended";
        }

        console.log(
          `Proposal ${proposal.id} status "${proposalStatus}" matches "${selectedStatus}":`,
          matches
        );
        return matches;
      });

      console.log(
        "Proposals after status filter:",
        filtered.map((p) => ({ id: p.id, status: p.status }))
      );
    }

    // Sort proposals
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.createdAt - a.createdAt;
        case "oldest":
          return a.createdAt - b.createdAt;
        case "most_votes":
          return b.yesVotes + b.noVotes - (a.yesVotes + a.noVotes);
        case "least_votes":
          return a.yesVotes + a.noVotes - (b.yesVotes + b.noVotes);
        case "ending_soon":
          const aTimeLeft =
            a.createdAt + a.durationDays * 86400 - Date.now() / 1000;
          const bTimeLeft =
            b.createdAt + b.durationDays * 86400 - Date.now() / 1000;
          return aTimeLeft - bTimeLeft;
        default:
          return b.createdAt - a.createdAt;
      }
    });

    console.log("Final sorted proposals:", sorted.length);
    return sorted;
  }, [proposals, searchQuery, selectedCategory, selectedStatus, sortBy]);

  // Update category counts with debugging - FIXED VERSION
  const categoriesWithCounts = useMemo(() => {
    console.log("Calculating category counts...");
    console.log(
      "All proposals:",
      proposals.map((p) => ({
        id: p.id,
        category: p.category,
        categoryType: typeof p.category,
        categoryTrimmed: String(p.category).trim(),
      }))
    );

    const result = categories.map((category) => {
      let count = 0;
      if (category.name === "All") {
        count = proposals.length;
      } else {
        // Use consistent string comparison with trimming
        const matchingProposals = proposals.filter((p) => {
          const proposalCategory = String(p.category || "").trim();
          const categoryName = String(category.name).trim();
          const matches = proposalCategory === categoryName;

          if (matches) {
            console.log(
              `✓ Found proposal "${p.title}" with category "${proposalCategory}" matching "${categoryName}"`
            );
          } else {
            console.log(
              `✗ Proposal "${p.title}" category "${proposalCategory}" doesn't match "${categoryName}"`
            );
          }
          return matches;
        });

        count = matchingProposals.length;
        console.log(
          `Category "${category.name}" has ${count} proposals:`,
          matchingProposals.map((p) => p.title)
        );
      }

      return {
        ...category,
        count: count,
      };
    });

    console.log(
      "Final category counts:",
      result.map((r) => ({ name: r.name, count: r.count }))
    );
    return result;
  }, [proposals]);

  // Update status counts with debugging - FIXED VERSION
  const statusWithCounts = useMemo(() => {
    console.log("Calculating status counts...");
    console.log(
      "All proposals status:",
      proposals.map((p) => ({
        id: p.id,
        status: p.status,
        statusType: typeof p.status,
        statusTrimmed: String(p.status).trim(),
      }))
    );

    const result = statusOptions.map((status) => {
      let count = 0;
      if (status.name === "All") {
        count = proposals.length;
      } else {
        // Use consistent string comparison with case-insensitive matching
        const matchingProposals = proposals.filter((p) => {
          const proposalStatus = String(p.status || "")
            .trim()
            .toLowerCase();
          const statusName = String(status.name).trim().toLowerCase();
          const matches = proposalStatus === statusName;

          if (matches) {
            console.log(
              `✓ Found proposal "${p.title}" with status "${proposalStatus}" matching "${statusName}"`
            );
          } else {
            console.log(
              `✗ Proposal "${p.title}" status "${proposalStatus}" doesn't match "${statusName}"`
            );
          }
          return matches;
        });

        count = matchingProposals.length;
        console.log(
          `Status "${status.name}" has ${count} proposals:`,
          matchingProposals.map((p) => p.title)
        );
      }

      return {
        ...status,
        count: count,
      };
    });

    console.log(
      "Final status counts:",
      result.map((r) => ({ name: r.name, count: r.count }))
    );
    return result;
  }, [proposals]);

  // Pagination
  const {
    currentPage,
    totalPages,
    currentData: currentProposals,
    goToPage,
    startIndex,
    endIndex,
    totalItems,
  } = usePagination({
    data: filteredAndSortedProposals,
    itemsPerPage: 10,
    initialPage: 1,
  });

  // Handle voting
  const handleVote = async (proposalId: string, vote: "yes" | "no") => {
    try {
      const voteChoice = vote === "yes" ? { Yes: null } : { No: null };
      const result = await backend.vote_proposal(
        proposalId,
        principal,
        voteChoice
      );

      if ("Ok" in result) {
        console.log(`Voted ${vote} on proposal ${proposalId}`);
        setIsDetailModalOpen(false);
        await fetchProposals();
      } else {
        alert(`Vote failed: ${result.Err}`);
      }
    } catch (err) {
      console.error("Voting error:", err);
      alert("Something went wrong during voting.");
    }
  };

  const handleProposalClick = (proposal: Proposal.Proposal) => {
    setSelectedProposal(proposal);
    setIsDetailModalOpen(true);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSortBy("newest");
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <>
      <Helmet>
        <title>Search Proposals - VoteVerse</title>
        <meta
          name="description"
          content="Search and filter through all proposals on VoteVerse. Find proposals by category, status, and keywords."
        />
      </Helmet>

      <div
        className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1
                className={`text-3xl font-bold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Search Proposals
              </h1>
              <p
                className={`text-base ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Find and explore proposals across all categories
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Search & Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Search Bar */}
                <div
                  className={`p-4 rounded-xl ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  } shadow-sm`}
                >
                  <h3
                    className={`text-sm font-semibold mb-3 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Search
                  </h3>
                  <div className="relative">
                    <SearchIcon
                      size={16}
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Search proposals..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-9 pr-8 py-2.5 rounded-lg border text-sm transition-colors ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                      } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-0.5 rounded-full transition-colors ${
                          darkMode
                            ? "hover:bg-gray-600 text-gray-400"
                            : "hover:bg-gray-200 text-gray-500"
                        }`}
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Compact Filters */}
                <div
                  className={`p-4 rounded-xl ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  } shadow-sm`}
                >
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`w-full flex items-center justify-between text-sm font-semibold mb-3 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Filter size={16} />
                      <span>Filters & Sort</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        showFilters ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showFilters && (
                    <div className="space-y-4">
                      {/* Categories */}
                      <div>
                        <h4
                          className={`text-xs font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Category
                        </h4>
                        <div className="space-y-1">
                          {categoriesWithCounts.slice(0, 8).map((category) => (
                            <button
                              key={category.name}
                              onClick={() => setSelectedCategory(category.name)}
                              className={`w-full flex items-center justify-between p-2 rounded-md text-xs font-medium transition-all ${
                                selectedCategory === category.name
                                  ? darkMode
                                    ? "bg-purple-600 text-white"
                                    : "bg-purple-600 text-white"
                                  : darkMode
                                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                              }`}
                            >
                              <span>{category.name}</span>
                              <span
                                className={`px-1.5 py-0.5 rounded-full text-xs ${
                                  selectedCategory === category.name
                                    ? "bg-white/20 text-white"
                                    : darkMode
                                    ? "bg-gray-600 text-gray-400"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                              >
                                {category.count}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <h4
                          className={`text-xs font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Status
                        </h4>
                        <div className="space-y-1">
                          {statusWithCounts.map((status) => (
                            <button
                              key={status.name}
                              onClick={() => setSelectedStatus(status.name)}
                              className={`w-full flex items-center justify-between p-2 rounded-md text-xs font-medium transition-all ${
                                selectedStatus === status.name
                                  ? darkMode
                                    ? "bg-blue-600 text-white"
                                    : "bg-blue-600 text-white"
                                  : darkMode
                                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                              }`}
                            >
                              <span>{status.name}</span>
                              <span
                                className={`px-1.5 py-0.5 rounded-full text-xs ${
                                  selectedStatus === status.name
                                    ? "bg-white/20 text-white"
                                    : darkMode
                                    ? "bg-gray-600 text-gray-400"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                              >
                                {status.count}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sort */}
                      <div>
                        <h4
                          className={`text-xs font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Sort By
                        </h4>
                        <div className="space-y-1">
                          {sortOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => setSortBy(option.value)}
                              className={`w-full flex items-center justify-between p-2 rounded-md text-xs font-medium transition-all ${
                                sortBy === option.value
                                  ? darkMode
                                    ? "bg-green-600 text-white"
                                    : "bg-green-600 text-white"
                                  : darkMode
                                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                              }`}
                            >
                              <span>{option.label}</span>
                              {sortBy === option.value && (
                                <ArrowUpDown size={12} />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Clear Filters */}
                      <button
                        onClick={clearFilters}
                        className={`w-full flex items-center justify-center space-x-2 p-2 rounded-md text-xs font-medium transition-all ${
                          darkMode
                            ? "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        <X size={12} />
                        <span>Clear All</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Main Content - Search Results */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <h2
                    className={`text-xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Search Results
                    {searchQuery && (
                      <span className="text-purple-500">
                        {" "}
                        for "{searchQuery}"
                      </span>
                    )}
                  </h2>
                  <PaginationInfo
                    startIndex={startIndex}
                    endIndex={endIndex}
                    totalItems={totalItems}
                    darkMode={darkMode}
                    className="mt-1"
                  />
                </div>

                {/* Active Filters */}
                {(selectedCategory !== "All" ||
                  selectedStatus !== "All" ||
                  searchQuery) && (
                  <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
                    {searchQuery && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          darkMode
                            ? "bg-purple-900/30 text-purple-300"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        "{searchQuery}"
                      </span>
                    )}
                    {selectedCategory !== "All" && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          darkMode
                            ? "bg-blue-900/30 text-blue-300"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {selectedCategory}
                      </span>
                    )}
                    {selectedStatus !== "All" && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          darkMode
                            ? "bg-green-900/30 text-green-300"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {selectedStatus}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Loading State */}
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Loading proposals...
                  </p>
                </div>
              ) : (
                <>
                  {/* Proposals Grid */}
                  {currentProposals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {currentProposals.map((proposal) => (
                        <ProposalCard
                          key={proposal.id}
                          proposal={proposal}
                          onClick={handleProposalClick}
                        />
                      ))}
                    </div>
                  ) : (
                    <Card className="p-8 text-center" darkMode={darkMode}>
                      <div className="max-w-md mx-auto">
                        <SearchIcon
                          size={32}
                          className={`mx-auto mb-4 ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <h3
                          className={`text-lg font-semibold mb-2 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          No proposals found
                        </h3>
                        <p
                          className={`mb-4 text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          Try adjusting your search terms or filters.
                        </p>
                        <button
                          onClick={clearFilters}
                          className="px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                        >
                          Clear Filters
                        </button>
                      </div>
                    </Card>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <PaginationInfo
                        startIndex={startIndex}
                        endIndex={endIndex}
                        totalItems={totalItems}
                        darkMode={darkMode}
                        className="order-2 sm:order-1"
                      />
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goToPage}
                        darkMode={darkMode}
                        className="order-1 sm:order-2"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Proposal Detail Modal */}
        <ProposalDetailModal
          proposal={selectedProposal}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          onVote={handleVote}
        />
      </div>
    </>
  );
}
