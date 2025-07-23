import Button from "@/shared/components/Button";
import { Plus } from "lucide-react";

interface WelcomeSectionProps {
  darkMode?: boolean;
  onCreateProposal?: () => void;
}

export default function WelcomeSection({
  darkMode = false,
  onCreateProposal,
}: WelcomeSectionProps) {
  return (
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
            onClick={onCreateProposal}
            variant="gradient"
            icon={Plus}
            size="lg"
          >
            Create Proposal
          </Button>
        </div>
      </div>
    </div>
  );
}
