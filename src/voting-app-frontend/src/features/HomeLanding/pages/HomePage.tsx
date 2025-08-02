"use client";

import Faq from "@/features/HomeLanding/components/Faq";
import Hero from "@/features/HomeLanding/components/Hero";
import NewsLetter from "@/features/HomeLanding/components/NewsLetter";
import { Helmet } from "react-helmet";
import Ecosystem from "../components/Ecosystem";
import Features from "../components/Features";
import GettingStarted from "../components/GettingStarted";
import { useDarkMode } from "../../../context/DarkModeContext";

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
        <div
          className={`text-center space-y-8 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <Hero darkMode={darkMode} onConnectWallet={onConnectWallet} />
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
