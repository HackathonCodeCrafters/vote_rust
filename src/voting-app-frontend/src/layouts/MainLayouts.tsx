"use client";

import Footer from "@/components/organism/Footer";
import AdaptiveNavbar from "@/components/organism/menu/Navbar";
import React, { type ReactNode } from "react";
import { useDarkMode } from "../context/DarkModeContext";

interface MainLayoutProps {
  children: ReactNode;
  isWalletConnected: boolean;
  onWalletConnect: () => void;
  onWalletDisconnect: () => void;
  principal?: string;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export default function MainLayout({
  children,
  isWalletConnected,
  onWalletConnect,
  onWalletDisconnect,
  principal,
  currentPage = "",
  onNavigate,
}: MainLayoutProps) {
  const { darkMode, toggleDarkMode, isLoading } = useDarkMode();

  const handleCreateProposal = () => {
    if (!isWalletConnected) {
      alert(
        "Please connect your Internet Identity first to create a proposal!"
      );
      return;
    }
    console.log("Opening create proposal modal...");
  };

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      // Fallback navigation
      if (page === "") {
        window.location.hash = "";
      } else {
        window.location.hash = page;
      }
    }
  };

  // Helper function to format principal for display
  const formatPrincipal = (principalText: string) => {
    if (!principalText) return "";
    if (principalText.length <= 10) return principalText;
    return `${principalText.slice(0, 6)}...${principalText.slice(-4)}`;
  };

  // Don't render until dark mode is loaded to prevent flash
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-900 dark:text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Adaptive Navbar */}
      <AdaptiveNavbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isAuthenticated={isWalletConnected}
        onLogin={onWalletConnect}
        onLogout={onWalletDisconnect}
        onCreateProposal={handleCreateProposal}
        principal={principal}
        votingPower={1250}
        currentPage={currentPage}
        onNavigate={handleNavigation}
      />

      {/* Main Content */}
      <main className="min-h-[calc(100vh-200px)]">
        {/* Pass darkMode and other props to children */}
        {React.isValidElement(children) && typeof children.type !== "string"
          ? React.cloneElement(children as React.ReactElement<any>, {
              darkMode,
              isWalletConnected,
              onConnectWallet: onWalletConnect,
              onCreateProposal: handleCreateProposal,
              principal,
              formatPrincipal,
            })
          : children}
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
}
