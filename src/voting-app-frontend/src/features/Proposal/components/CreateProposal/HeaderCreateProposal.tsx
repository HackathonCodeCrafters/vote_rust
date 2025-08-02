import { X } from "lucide-react";

interface HeaderCreateProposalProps {
  darkMode: boolean;
  onClose: () => void;
}

export default function HeaderCreateProposal({
  darkMode,
  onClose,
}: HeaderCreateProposalProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
      <h2
        className={`text-2xl font-bold ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Create New Proposal
      </h2>
      <button
        onClick={onClose}
        className={`p-2 rounded-lg transition-colors ${
          darkMode
            ? "hover:bg-gray-700 text-gray-400"
            : "hover:bg-gray-100 text-gray-600"
        }`}
      >
        <X size={20} />
      </button>
    </div>
  );
}
