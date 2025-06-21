"use client";

// Type definitions for backend if needed
export interface VotingBackend {
  get_results: () => Promise<any[]>;
  vote: (candidate: string, principal: string) => Promise<string>;
  add_candidate: (name: string) => Promise<void>;
}

export interface VoteResult {
  candidate: string;
  votes: number;
}
