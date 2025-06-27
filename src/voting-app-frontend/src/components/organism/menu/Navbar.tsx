"use client";

import VoteVerse from "@/assets/img/logo_vote_verse.png";
import Button from "@/components/atoms/Button";
import Logo from "@/components/molecules/Logo";
import {
  BookOpen,
  DollarSign,
  Home,
  Info,
  LogOut,
  Mail,
  Menu,
  Moon,
  Sun,
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

// Navigation Link Type
type NavLink = {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  external?: boolean;
};

const guestNavLinks: NavLink[] = [
  { name: "Home", href: "", icon: Home },
  { name: "Pricing", href: "pricing", icon: DollarSign },
  { name: "About", href: "about", icon: Info },
  { name: "Contact Us", href: "contact-us", icon: Mail },
  {
    name: "Blog",
    href: "https://blog-voteverse.netlify.app/blog",
    icon: BookOpen,
    external: true,
  },
];

const authenticatedNavLinks: NavLink[] = [
  { name: "Dashboard", href: "dashboard", icon: Home },
  { name: "Active Votes", href: "votes", icon: Vote },
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
  const navLinks = isAuthenticated ? authenticatedNavLinks : guestNavLinks;

  const handleNavigation = (href: string) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank");
      return;
    }

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
          <Logo name="VoteVerse" imageSrc={VoteVerse} showPulse={false} />

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              const isActive = currentPage === link.href;

              return link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                    darkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent size={16} />
                  <span className="font-medium">{link.name}</span>
                </a>
              ) : (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.href)}
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

          <div className="flex items-center space-x-4">
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

        {isMenuOpen && (
          <div
            className={`md:hidden border-t ${
              darkMode ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = currentPage === link.href;

                return link.external ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
                      darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent size={18} />
                    <span className="font-medium">{link.name}</span>
                  </a>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => handleNavigation(link.href)}
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
