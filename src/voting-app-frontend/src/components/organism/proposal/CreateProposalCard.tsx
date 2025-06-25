"use client";

import { FileText, ImageIcon, Trash2, Upload, X } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { useDarkMode } from "../../../context/DarkModeContext";
import Button from "../../atoms/Button";

interface CreateProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProposal: (proposal: any) => void;
}

export default function CreateProposalModal({
  isOpen,
  onClose,
  onCreateProposal,
}: CreateProposalModalProps) {
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    category: "Governance",
    duration: "7",
    image: "",
    author: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Convert file to base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert file to base64"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle file upload
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (PNG, JPG, GIF, etc.)");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      const base64String = await convertToBase64(file);
      setFormData((prev) => ({ ...prev, image: base64String }));
      setImagePreview(base64String);
    } catch (error) {
      console.error("Error converting image:", error);
      alert("Failed to process image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Remove uploaded image
  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle URL input
  const handleImageUrlChange = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const proposalData = {
        title: formData.title,
        description: formData.description,
        full_description: formData.fullDescription,
        category: formData.category,
        duration: formData.duration,
        image_url:
          formData.image && !formData.image.startsWith("data:")
            ? formData.image
            : "",
        image:
          formData.image && formData.image.startsWith("data:")
            ? formData.image
            : "",
        author: formData.author,
      };

      console.log("Passing proposal data to parent:", proposalData);
      await onCreateProposal(proposalData);

      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        fullDescription: "",
        category: "Governance",
        duration: "7",
        image: "",
        author: "",
      });
      setImagePreview("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Failed to submit proposal:", err);
      if (err instanceof Error) {
        alert(`Failed to submit proposal: ${err.message}`);
      } else {
        alert("Failed to submit proposal. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
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
            {/* Author */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                placeholder="Enter Your Name"
              />
            </div>

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

            {/* Image Upload Section */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Proposal Image (Optional)
              </label>

              {/* Upload Options */}
              <div className="space-y-4">
                {/* File Upload */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      darkMode
                        ? "border-gray-600 hover:border-purple-500 bg-gray-700/50"
                        : "border-gray-300 hover:border-purple-500 bg-gray-50"
                    } ${isUploading ? "pointer-events-none opacity-50" : ""}`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      {isUploading ? (
                        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Upload
                          size={24}
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        />
                      )}
                      <div className="text-center">
                        <p
                          className={`text-sm font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {isUploading ? "Uploading..." : "Upload Image"}
                        </p>
                        <p
                          className={`text-xs ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* OR Separator */}
                <div className="flex items-center">
                  <div
                    className={`flex-1 border-t ${
                      darkMode ? "border-gray-600" : "border-gray-300"
                    }`}
                  ></div>
                  <span
                    className={`px-3 text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    OR
                  </span>
                  <div
                    className={`flex-1 border-t ${
                      darkMode ? "border-gray-600" : "border-gray-300"
                    }`}
                  ></div>
                </div>

                {/* URL Input */}
                <div className="relative">
                  <input
                    type="url"
                    value={
                      formData.image.startsWith("data:") ? "" : formData.image
                    }
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className={`w-full px-4 py-3 pl-12 rounded-lg border transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                  />
                  <ImageIcon
                    size={20}
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                </div>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <div className="relative inline-block">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="max-w-full h-32 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p
                    className={`text-xs mt-2 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {formData.image.startsWith("data:")
                      ? "Uploaded image"
                      : "Image from URL"}
                  </p>
                </div>
              )}
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
                    <li>
                      • Images help visualize your proposal but are optional
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
                disabled={isSubmitting || isUploading}
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
