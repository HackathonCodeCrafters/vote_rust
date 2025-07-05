"use client";

interface ProposalDescriptionProps {
  description: string;
  detailDescription?: string;
  darkMode: boolean;
}

export default function ProposalDescription({
  description,
  detailDescription,
  darkMode,
}: ProposalDescriptionProps) {
  return (
    <>
      <div className="mb-6">
        <h2
          className={`text-xl font-bold mb-3 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Short Description
        </h2>
        <p
          className={`leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      </div>

      {detailDescription && (
        <div className="mb-6">
          <h2
            className={`text-xl font-bold mb-3 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Detailed Description
          </h2>
          <p
            className={`leading-relaxed ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {detailDescription}
          </p>
        </div>
      )}
    </>
  );
}
