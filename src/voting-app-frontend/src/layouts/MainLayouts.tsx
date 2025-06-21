"use client";

import Footer from "@/components/organism/Footer";
import AdaptiveNavbar from "@/components/organism/menu/landing/Navbar";
import React, { useEffect, useState, type ReactNode } from "react";

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
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    } else {
      setDarkMode(prefersDark);
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Adaptive Navbar - Satu navbar untuk semua state */}
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

      {/* Main Content - Changes per page */}
      <main className="min-h-[calc(100vh-200px)]">
        {/* Pass props to children if needed */}
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

      {/* Footer - Always visible */}
      <Footer darkMode={darkMode} />
    </div>
  );
}
