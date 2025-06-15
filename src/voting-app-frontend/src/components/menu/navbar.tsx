"use client";

import VoteVerse from "@/assets/img/logo_vote_verse.png";
import {
  ChevronDown,
  Coins,
  Globe,
  Menu,
  Moon,
  Shield,
  Sun,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import Logo from "./logo";


interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Web3Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("Ethereum");
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);

  const networks = [
    { name: "Ethereum", color: "bg-blue-500", icon: "⟠" },
    { name: "Polygon", color: "bg-purple-500", icon: "⬟" },
    { name: "BSC", color: "bg-yellow-500", icon: "◆" },
    { name: "Arbitrum", color: "bg-cyan-500", icon: "▲" },
  ];

  const navLinks = [
    { name: "DeFi", href: "#", icon: Coins },
    { name: "NFTs", href: "#", icon: Shield },
    { name: "Staking", href: "#", icon: Zap },
    { name: "Bridge", href: "#", icon: Globe },
  ];

  const connectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        darkMode
          ? "bg-gray-900/80 border-gray-800"
          : "bg-white/80 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          {/* <div className="flex items-center space-x-2">
            <div className="relative">
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center`}
              >
                <span className="text-white font-bold text-sm">VV</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <span
              className={`font-bold text-xl bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent`}
            >
              VoteVerse
            </span>
          </div> */}
          <Logo name="VoteVerse" imageSrc={VoteVerse} showPulse={false} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                    darkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent size={18} />
                  <span className="font-medium">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Network Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsNetworkOpen(!isNetworkOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    networks.find((n) => n.name === selectedNetwork)?.color
                  }`}
                ></div>
                <span className="text-sm font-medium">{selectedNetwork}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isNetworkOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isNetworkOpen && (
                <div
                  className={`absolute top-full mt-2 right-0 w-48 rounded-lg shadow-lg border overflow-hidden ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {networks.map((network) => (
                    <button
                      key={network.name}
                      onClick={() => {
                        setSelectedNetwork(network.name);
                        setIsNetworkOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                        darkMode
                          ? "hover:bg-gray-700 text-white"
                          : "hover:bg-gray-50 text-gray-900"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full ${network.color}`}
                      ></div>
                      <span className="text-lg">{network.icon}</span>
                      <span className="font-medium">{network.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                darkMode
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Wallet Connection */}
            <button
              onClick={connectWallet}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                isWalletConnected
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25"
                  : "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              }`}
            >
              <Wallet size={18} />
              <span className="hidden sm:inline">
                {isWalletConnected ? "0x1234...5678" : "Connect Wallet"}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                darkMode
                  ? "text-white hover:bg-gray-800"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden border-t ${
              darkMode ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent size={18} />
                    <span className="font-medium">{link.name}</span>
                  </a>
                );
              })}

              {/* Mobile Network Selector */}
              <div className="pt-2">
                <div
                  className={`px-3 py-2 text-sm font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Network
                </div>
                {networks.map((network) => (
                  <button
                    key={network.name}
                    onClick={() => setSelectedNetwork(network.name)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      selectedNetwork === network.name
                        ? darkMode
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-900"
                        : darkMode
                        ? "text-gray-300 hover:bg-gray-800"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${network.color}`}
                    ></div>
                    <span className="text-lg">{network.icon}</span>
                    <span className="font-medium">{network.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
