"use client";

import Faq from "@/components/templates/Homepage/Faq";
import Hero from "@/components/templates/Homepage/Hero";
import NewsLetter from "@/components/templates/Homepage/NewsLetter";
import { Helmet } from "react-helmet";
import Ecosystem from "../components/templates/Homepage/Ecosystem";
import Features from "../components/templates/Homepage/Features";
import GettingStarted from "../components/templates/Homepage/GettingStarted";
import { useDarkMode } from "../context/DarkModeContext";

interface HomePageProps {
  onConnectWallet: () => void;
  showContinue?: boolean;
  onContinueSession?: () => void;
  tempPrincipal?: string;
  formatPrincipal?: (principal: string) => string;
}

export default function HomePage({
  onConnectWallet,
  showContinue,
  onContinueSession,
  tempPrincipal,
  formatPrincipal,
}: HomePageProps) {
  const { darkMode } = useDarkMode();

  return (
    <>
      <Helmet>
        <title>Homepage - VoteVerse</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <Hero darkMode={darkMode} onConnectWallet={onConnectWallet} />
        <div
          className={`text-center space-y-8 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <Features darkMode={darkMode} />
          <Ecosystem darkMode={darkMode} />
          <GettingStarted darkMode={darkMode} />
          <Faq darkMode={darkMode} />
          <NewsLetter darkMode={darkMode} />
        </div>
      </div>
    </>
  );
}
