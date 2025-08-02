import { FileText } from "lucide-react";

interface InfoBoxCreateProposalProps {
  darkMode?: boolean;
}

export default function InfoBoxCreateProposal({
  darkMode,
}: InfoBoxCreateProposalProps) {
  return (
    <div
      className={`p-4 rounded-lg ${
        darkMode
          ? "bg-blue-900/20 border border-blue-800"
          : "bg-blue-50 border border-blue-200"
      }`}
    >
      <div className="flex items-start space-x-3">
        <FileText size={20} className="text-blue-500 mt-0.5" />
        <div>
          <h4
            className={`font-medium ${
              darkMode ? "text-blue-300" : "text-blue-900"
            }`}
          >
            Proposal Guidelines
          </h4>
          <ul
            className={`text-sm mt-1 space-y-1 ${
              darkMode ? "text-blue-200" : "text-blue-700"
            }`}
          >
            <li>• Be clear and specific about what you're proposing</li>
            <li>• Include implementation details and timeline</li>
            <li>• Consider the impact on the community</li>
            <li>• Proposals require a minimum voting period of 3 days</li>
            <li>• Images help visualize your proposal but are optional</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
