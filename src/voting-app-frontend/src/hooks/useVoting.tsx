"use client";

import { useEffect, useState } from "react";

interface UseVotingReturn {
  results: any[];
  voteMsg: string;
  refreshResults: () => Promise<void>;
  voteFor: (name: string) => Promise<void>;
}

export function useVoting(
  backend: any,
  principal: string,
  isAuthenticated: boolean
): UseVotingReturn {
  const [results, setResults] = useState<any[]>([]);
  const [voteMsg, setVoteMsg] = useState("");

  // Refresh results when backend is available
  useEffect(() => {
    if (isAuthenticated && backend) {
      console.log("Auto-refreshing results...");
      refreshResults();
    }
  }, [isAuthenticated, backend]);

  // Refresh voting results
  const refreshResults = async () => {
    if (!backend) return;

    try {
      const res = await backend.get_results();
      console.log("Voting results:", res);
      setResults(res);
    } catch (error) {
      console.error("Failed to refresh results:", error);
    }
  };

  // Vote for a candidate
  const voteFor = async (name: string) => {
    if (!isAuthenticated) {
      alert("Please login first!");
      return;
    }

    if (!backend) {
      alert("Backend not connected!");
      return;
    }

    try {
      // Add candidates (this might be temporary for testing)
      await backend.add_candidate("bawang goreng");
      await backend.add_candidate("bawang putih");

      const msg = await backend.vote(name, principal);
      setVoteMsg(msg);
      await refreshResults();
    } catch (error) {
      console.error("Voting failed:", error);
      setVoteMsg("Voting failed. Please try again.");
    }
  };

  return {
    results,
    voteMsg,
    refreshResults,
    voteFor,
  };
}
