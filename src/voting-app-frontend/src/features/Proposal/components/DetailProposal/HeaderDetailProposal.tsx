"use client";

import { AlertCircle, X } from "lucide-react";

interface ProposalHeaderProps {
  title: string;
  imageUrl: string;
  categoryName: string;
  authorName: string;
  isExpired: boolean;
  onClose: () => void;
}

export default function ProposalHeader({
  title,
  imageUrl,
  categoryName,
  authorName,
  isExpired,
  onClose,
}: ProposalHeaderProps) {
  return (
    <div className="relative">
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

      {/* Expired Overlay */}
      {isExpired && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-white text-center">
            <AlertCircle size={48} className="mx-auto mb-2" />
            <span className="text-2xl font-bold">PROPOSAL ENDED</span>
          </div>
        </div>
      )}

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
      >
        <X size={20} />
      </button>

      <div className="absolute bottom-4 left-4 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isExpired ? "bg-red-500" : "bg-emerald-500"
            }`}
          >
            {categoryName}
          </span>
          <span className="text-sm opacity-80">by {authorName}</span>
          {isExpired && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-600">
              EXPIRED
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    </div>
  );
}
