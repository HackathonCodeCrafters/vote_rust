"use client";

import { useEffect, useState } from "react";
import Web3Navbar from "../menu/navbar";

export default function App() {
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

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Web3Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className={`text-center space-y-8 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Welcome to Web3Hub
            </h1>
            <p
              className={`text-xl md:text-2xl ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Your gateway to the decentralized future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: "DeFi Trading",
                description:
                  "Trade tokens across multiple DEXs with the best rates",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "NFT Marketplace",
                description: "Discover, buy, and sell unique digital assets",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                title: "Yield Farming",
                description: "Earn rewards by providing liquidity to protocols",
                gradient: "from-green-500 to-emerald-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                  darkMode
                    ? "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70"
                    : "bg-white/50 border-gray-200 hover:bg-white/70"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4 mx-auto`}
                ></div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105">
              Start Building on Web3
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
