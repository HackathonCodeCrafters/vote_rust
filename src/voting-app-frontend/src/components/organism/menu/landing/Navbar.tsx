"use client";

import VoteVerse from "@/assets/img/logo_vote_verse.png";
import Button from "@/components/atoms/Button";
import Logo from "@/components/molecules/Logo";
import NetworkSelector from "@/components/molecules/NetworkSelector";
import {
  DollarSign,
  Home,
  Info,
  LogOut,
  Menu,
  Moon,
  Plus,
  Shield,
  Sun,
  User,
  Vote,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";

interface AdaptiveNavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onCreateProposal: () => void;
  principal?: string;
  votingPower?: number;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const networks = [
  { name: "Ethereum", color: "bg-blue-500", icon: "⟠" },
  { name: "Polygon", color: "bg-purple-500", icon: "⬟" },
  { name: "BSC", color: "bg-yellow-500", icon: "◆" },
  { name: "Arbitrum", color: "bg-cyan-500", icon: "▲" },
];

// Navigation items for different states
const guestNavLinks = [
  { name: "Home", href: "", icon: Home },
  { name: "Pricing", href: "pricing", icon: DollarSign },
  { name: "About", href: "about", icon: Info },
];

const authenticatedNavLinks = [
  { name: "Dashboard", href: "dashboard", icon: Home },
  { name: "Active Votes", href: "votes", icon: Vote },
  { name: "Proposals", href: "proposals", icon: Plus },
  { name: "My History", href: "history", icon: User },
  { name: "Governance", href: "governance", icon: Shield },
];

export default function AdaptiveNavbar({
  darkMode,
  toggleDarkMode,
  isAuthenticated,
  onLogin,
  onLogout,
  onCreateProposal,
  principal,
  votingPower = 1250,
  currentPage = "",
  onNavigate,
}: AdaptiveNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("Ethereum");

  const navLinks = isAuthenticated ? authenticatedNavLinks : guestNavLinks;

  const handleNavigation = (href: string, name: string) => {
    if (onNavigate) {
      onNavigate(href);
    }
    setIsMenuOpen(false);
  };

  const formatPrincipal = (principalText: string) => {
    if (!principalText) return "";
    if (principalText.length <= 10) return principalText;
    return `${principalText.slice(0, 6)}...${principalText.slice(-4)}`;
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
          <Logo name="VoteVerse" imageSrc={VoteVerse} showPulse={false} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              const isActive = currentPage === link.href;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.href, link.name)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                    isActive
                      ? darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-900"
                      : darkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent size={16} />
                  <span className="font-medium">{link.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Create Proposal Button - Only for authenticated users */}
            {isAuthenticated && (
              <div className="hidden sm:block">
                <Button
                  onClick={onCreateProposal}
                  variant="gradient"
                  icon={Plus}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 shadow-purple-500/25"
                >
                  Create Proposal
                </Button>
              </div>
            )}

            {/* Voting Power - Only for authenticated users */}
            {isAuthenticated && (
              <div
                className={`hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-emerald-400"
                    : "bg-emerald-50 border-emerald-200 text-emerald-600"
                }`}
              >
                <Shield size={16} />
                <span className="text-sm font-medium">
                  {votingPower.toLocaleString()} VP
                </span>
              </div>
            )}

            {/* Network Selector - Only for authenticated users */}
            {isAuthenticated && (
              <div className="hidden sm:block">
                <NetworkSelector
                  networks={networks}
                  selectedNetwork={selectedNetwork}
                  onNetworkChange={setSelectedNetwork}
                  darkMode={darkMode}
                />
              </div>
            )}

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

            {/* Authentication Button */}
            {!isAuthenticated ? (
              <Button onClick={onLogin} variant="gradient" icon={Wallet}>
                <span className="hidden sm:inline">Connect Identity</span>
                <span className="sm:hidden">Connect</span>
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <div
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    darkMode
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium hidden sm:inline">
                    {formatPrincipal(principal || "Internet Identity")}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode
                      ? "text-gray-400 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}

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
              {/* Create Proposal Button - Mobile */}
              {isAuthenticated && (
                <Button
                  onClick={() => {
                    onCreateProposal();
                    setIsMenuOpen(false);
                  }}
                  variant="gradient"
                  icon={Plus}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600"
                >
                  Create Proposal
                </Button>
              )}

              {/* Voting Power - Mobile */}
              {isAuthenticated && (
                <div
                  className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                    darkMode
                      ? "bg-gray-800 text-emerald-400"
                      : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Shield size={16} />
                    <span className="text-sm font-medium">Voting Power</span>
                  </div>
                  <span className="font-bold">
                    {votingPower.toLocaleString()} VP
                  </span>
                </div>
              )}

              {/* Navigation Links - Mobile */}
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = currentPage === link.href;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavigation(link.href, link.name)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
                      isActive
                        ? darkMode
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-900"
                        : darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent size={18} />
                    <span className="font-medium">{link.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
