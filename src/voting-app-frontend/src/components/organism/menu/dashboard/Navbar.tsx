"use client";

import VoteVerse from "@/assets/img/logo_vote_verse.png";
import Logo from "@/components/molecules/Logo";
import { Button, Link } from "@chakra-ui/react";
import {
  FileText,
  History,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Sun,
  TrendingUp,
  User,
  Users,
  Vote,
  X,
} from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isAuthenticated: boolean;
  principal: string;
  onLogin: () => void;
  onLogout: () => void;
  showContinue: boolean;
  onContinueSession: () => void;
  tempPrincipal: string;
  formatPrincipal: (principal: string) => string;
  onCreateProposal: () => void;

  isWalletConnected: boolean;
  onWalletConnect: () => void;
  onWalletDisconnect: () => void;
  walletAddress: string;
  votingPower: number;
}

export default function Web3VotingNavbar({
  darkMode,
  toggleDarkMode,
  isAuthenticated,
  principal,
  onLogin,
  onLogout,
  showContinue,
  onContinueSession,
  tempPrincipal,
  formatPrincipal,
  onCreateProposal,
  isWalletConnected,
  onWalletConnect,
  onWalletDisconnect,
  walletAddress,
  votingPower,
}: NavbarProps) {
  // State to manage mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Active Votes", href: "#", icon: Vote },
    { name: "Proposals", href: "#", icon: FileText },
    { name: "My History", href: "#", icon: History },
    { name: "Governance", href: "#", icon: Users },
    { name: "Analytics", href: "#", icon: TrendingUp },
  ];

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
          <Logo name="VoteVerse" imageSrc={VoteVerse} showPulse={false} />

          {/* Desktop Navigation - Only show when authenticated */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                      darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent size={18} />
                    <span className="font-medium text-sm">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              size="sm"
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                darkMode
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            {/* Authentication Controls */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* User Principal Display */}
                <div
                  className={`hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    darkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <User size={16} />
                  <span className="text-sm font-mono">
                    {formatPrincipal(principal)}
                  </span>
                </div>

                {/* Logout Button */}
                <Button
                  onClick={onLogout}
                  variant="ghost"
                  size="sm"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                    darkMode
                      ? "bg-red-900/20 text-red-400 hover:bg-red-900/30 border border-red-500/20"
                      : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                  }`}
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : showContinue ? (
              <Button
                onClick={onContinueSession}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                  darkMode
                    ? "bg-blue-900/20 text-blue-400 hover:bg-blue-900/30 border border-blue-500/20"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                }`}
              >
                <User size={18} />
                <span className="hidden sm:inline">
                  Continue as {formatPrincipal(tempPrincipal)}
                </span>
                <span className="sm:hidden">Continue</span>
              </Button>
            ) : (
              <Button
                onClick={onLogin}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <LogIn size={18} />
                <span className="hidden sm:inline">Login with ICP</span>
                <span className="sm:hidden">Login</span>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="sm"
              className={`md:hidden p-2 rounded-lg ${
                darkMode
                  ? "text-white hover:bg-gray-800"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
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
              {/* Mobile Navigation Links - Only show when authenticated */}
              {isAuthenticated &&
                navLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
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
                    </Link>
                  );
                })}

              {/* Mobile Authentication Section */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div
                      className={`px-3 py-2 text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Logged in as:
                    </div>
                    <div
                      className={`px-3 py-2 font-mono text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {formatPrincipal(principal)}
                    </div>
                    <Button
                      onClick={onLogout}
                      variant="ghost"
                      className={`w-full justify-start space-x-2 ${
                        darkMode
                          ? "text-red-400 hover:bg-red-900/20"
                          : "text-red-600 hover:bg-red-50"
                      }`}
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </Button>
                  </div>
                ) : showContinue ? (
                  <Button
                    onClick={onContinueSession}
                    variant="ghost"
                    className={`w-full justify-start space-x-2 ${
                      darkMode
                        ? "text-blue-400 hover:bg-blue-900/20"
                        : "text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <User size={18} />
                    <span>Continue as {formatPrincipal(tempPrincipal)}</span>
                  </Button>
                ) : (
                  <Button
                    onClick={onLogin}
                    variant="ghost"
                    className="w-full justify-start space-x-2 text-white bg-gradient-to-r from-cyan-500 to-purple-600"
                  >
                    <LogIn size={18} />
                    <span>Login with ICP</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
