"use client";

import { FileText, Upload, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Button from "../../atoms/Button";

interface CreateProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onCreateProposal: (proposal: any) => void;
}

export default function CreateProposalModal({
  isOpen,
  onClose,
  darkMode,
  onCreateProposal,
}: CreateProposalModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    category: "Governance",
    duration: "7",
    image: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Governance",
    "Economics",
    "Technical",
    "Funding",
    "Product",
    "Community",
    "Security",
  ];
  const durations = [
    { value: "3", label: "3 days" },
    { value: "7", label: "7 days" },
    { value: "14", label: "14 days" },
    { value: "30", label: "30 days" },
  ];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newProposal = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        fullDescription: formData.fullDescription,
        category: formData.category,
        image: formData.image || "/placeholder.svg?height=300&width=600",
        votes: { yes: 0, no: 0 },
        timeLeft: `${formData.duration} days`,
        status: "active",
        author: "You",
        totalVoters: 0,
        discussions: 0,
      };

      onCreateProposal(newProposal);
      setIsSubmitting(false);
      onClose();

      // Reset form
      setFormData({
        title: "",
        description: "",
        fullDescription: "",
        category: "Governance",
        duration: "7",
        image: "",
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div
          className={`inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform rounded-2xl shadow-xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Header */}
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Proposal Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter a clear and concise title"
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              />
            </div>

            {/* Category and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                      : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Voting Duration *
                </label>
                <select
                  required
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                      : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                >
                  {durations.map((duration) => (
                    <option key={duration.value} value={duration.value}>
                      {duration.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Short Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Brief summary that will appear in the proposal list"
                className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              />
            </div>

            {/* Full Description */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Detailed Description *
              </label>
              <textarea
                required
                rows={6}
                value={formData.fullDescription}
                onChange={(e) =>
                  handleInputChange("fullDescription", e.target.value)
                }
                placeholder="Provide a comprehensive explanation of your proposal..."
                className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Image URL (Optional)
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className={`w-full px-4 py-3 pl-12 rounded-lg border transition-colors ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
                <Upload
                  size={20}
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
            </div>

            {/* Info Box */}
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
                    <li>
                      • Proposals require a minimum voting period of 3 days
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="gradient"
                className="flex-1"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  "Create Proposal"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
