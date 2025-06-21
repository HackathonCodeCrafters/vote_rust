"use client";

import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import StatCard from "@/components/molecules/StatCard";
import CreateProposalModal from "@/components/organism/proposal/CreateProposalCard";
import ProposalDetailModal from "@/components/organism/proposal/DetailProposalCard";
import ProposalCard from "@/components/organism/proposal/ProposalCard";
import { Activity, Award, Plus, TrendingUp, Users, Vote } from "lucide-react";
import { useState } from "react";

interface DashboardProps {
  darkMode: boolean;
  onCreateProposal: () => void;
}

interface Proposal {
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

const mockProposals: Proposal[] = [
  {
    id: 1,
    title: "Increase Block Reward by 15%",
    description:
      "Proposal to increase mining rewards to incentivize network security and attract more validators to the network.",
    fullDescription:
      "This proposal aims to increase the block reward by 15% to enhance network security and incentivize more validators to participate in the consensus mechanism. The current reward structure has been in place for over a year, and with the growing network demands and increased operational costs, this adjustment will help maintain a robust and secure blockchain infrastructure.",
    image:
      "https://kzmfrt2bnrjspbfml2m2.lite.vusercontent.net/placeholder.svg?height=300&width=600",
    votes: { yes: 1250, no: 340 },
    timeLeft: "2 days",
    status: "active",
    author: "CoreDev Team",
    category: "Economics",
    totalVoters: 1590,
    discussions: 45,
  },
  {
    id: 2,
    title: "Implement EIP-4844 (Proto-Danksharding)",
    description:
      "Technical upgrade to improve scalability and reduce gas fees through proto-danksharding implementation.",
    fullDescription:
      "EIP-4844 introduces proto-danksharding, a significant scaling solution that will dramatically reduce transaction costs for Layer 2 solutions. This upgrade introduces a new transaction type called 'blob-carrying transactions' which allows L2s to store data more efficiently.",
    image:
      "https://kzmfrt2bnrjspbfml2m2.lite.vusercontent.net/placeholder.svg?height=300&width=600",
    votes: { yes: 2100, no: 890 },
    timeLeft: "5 days",
    status: "active",
    author: "Ethereum Foundation",
    category: "Technical",
    totalVoters: 2990,
    discussions: 127,
  },
];

const stats = [
  {
    label: "Total Proposals",
    value: "127",
    icon: Vote,
    color: "from-blue-500 to-cyan-500",
    change: "+12%",
  },
  {
    label: "Active Voters",
    value: "3,456",
    icon: Users,
    color: "from-emerald-500 to-green-500",
    change: "+8%",
  },
  {
    label: "My Voting Power",
    value: "1,250",
    icon: Award,
    color: "from-purple-500 to-pink-500",
    change: "+5%",
  },
  {
    label: "Participation Rate",
    value: "78%",
    icon: Activity,
    color: "from-orange-500 to-red-500",
    change: "+3%",
  },
];

const recentActivity = [
  {
    action: "Voted Yes",
    proposal: "Increase Block Reward",
    time: "2 hours ago",
    type: "vote",
  },
  {
    action: "Created Proposal",
    proposal: "New Staking Mechanism",
    time: "1 day ago",
    type: "create",
  },
  {
    action: "Voted No",
    proposal: "Fee Structure Change",
    time: "2 days ago",
    type: "vote",
  },
  {
    action: "Delegated VP",
    proposal: "To CoreDev Team",
    time: "3 days ago",
    type: "delegate",
  },
];

export default function Dashboard({
  darkMode,
  onCreateProposal,
}: DashboardProps) {
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleProposalClick = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsDetailModalOpen(true);
  };

  const handleVote = (proposalId: number, vote: "yes" | "no") => {
    console.log(`Voting ${vote} on proposal ${proposalId}`);
    setIsDetailModalOpen(false);
  };

  const handleCreateProposal = (newProposal: Proposal) => {
    setProposals((prev) => [newProposal, ...prev]);
    console.log("New proposal created:", newProposal);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className={`mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Voter! 👋</h1>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Here's what's happening in the governance space
            </p>
          </div>

          <div className="hidden md:block">
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              variant="gradient"
              icon={Plus}
              size="lg"
            >
              Create Proposal
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} darkMode={darkMode} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Proposals */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Active Proposals
            </h2>
            <div className="md:hidden">
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                variant="gradient"
                icon={Plus}
              >
                Create
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {proposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onClick={handleProposalClick}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2
            className={`text-2xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Recent Activity
          </h2>
          <Card className="p-6" darkMode={darkMode}>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "vote"
                        ? "bg-green-100 text-green-600"
                        : activity.type === "create"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {activity.type === "vote" ? (
                      <Vote size={16} />
                    ) : activity.type === "create" ? (
                      <TrendingUp size={16} />
                    ) : (
                      <Users size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {activity.action}
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {activity.proposal}
                    </p>
                    <p
                      className={`text-xs ${
                        darkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <ProposalDetailModal
        proposal={selectedProposal}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        darkMode={darkMode}
        onVote={handleVote}
      />

      <CreateProposalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        darkMode={darkMode}
        onCreateProposal={handleCreateProposal}
      />
    </div>
  );
}
