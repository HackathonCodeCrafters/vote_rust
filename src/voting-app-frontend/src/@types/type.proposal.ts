// types/proposal.ts
export interface Proposal {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  votes: { yes: number; no: number };
  timeLeft: string;
  status: string;
  author: string;
  category: string;
  totalVoters: number;
  discussions: number;
}
