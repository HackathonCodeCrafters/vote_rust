// @/@types/proposal.ts

export interface Proposal {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  yesVotes: number;
  noVotes: number;
  createdAt: number;
  durationDays: number;
  // UI computed fields
  timeLeft?: string;
  status?: string;
  totalVoters?: number;
  // Additional fields for UI compatibility
  fullDescription?: string;
  image?: string;
  votes?: { yes: number; no: number };
  author?: string;
  category?: string;
  discussions?: number;
}

// @/@types/canister.ts
export interface CanisterProposal {
  id: bigint;
  title: string;
  description: string;
  imageUrl?: string;
  yesVotes: number;
  noVotes: number;
  createdAt: bigint;
  durationDays: number;
}

export interface ProposalStats {
  totalProposals: bigint;
  totalYesVotes: bigint;
  totalNoVotes: bigint;
  totalVotes: bigint;
}

export enum VoteChoice {
  Yes = "Yes",
  No = "No",
}

export type VoteResult = { Ok: null } | { Err: string };

// @/@types/window.d.ts
interface Window {
  ic?: {
    plug?: {
      agent?: {
        query: (params: {
          canisterId: string;
          methodName: string;
          args: any[];
        }) => Promise<any>;
        update: (params: {
          canisterId: string;
          methodName: string;
          args: any[];
        }) => Promise<any>;
      };
    };
  };
}
