"use client";

import IC from "@/assets/img/icp.png";
import VoteVerse from "@/assets/img/logo_vote_verse.png";
import Logo from "@/components/molecules/Logo";
import { Image } from "@chakra-ui/react";
import {
  BookOpen,
  Cookie,
  DollarSign,
  FileText,
  Github,
  Info,
  Lock,
  Mail,
  MessageCircle,
  Shield,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

interface FooterProps {
  darkMode?: boolean;
}

const footerLinks = {
  product: [
    { name: "Features", href: "#features", icon: "" },
    { name: "Pricing", href: "/pricing", icon: <DollarSign size={14} /> },
    { name: "Documentation", href: "#docs", icon: "" },
    { name: "API", href: "#api", icon: "" },
  ],
  company: [
    { name: "About", href: "/about", icon: <Info size={14} /> },
    { name: "Blog", href: "/blog", icon: <BookOpen size={14} /> },
    { name: "Contact", href: "/contact-us", icon: <Mail size={14} /> },
  ],
  resources: [
    { name: "Community", href: "#community", icon: "" },
    { name: "Help Center", href: "#help", icon: "" },
    { name: "Partners", href: "#partners", icon: "" },
    { name: "Status", href: "#status", icon: "" },
  ],
  legal: [
    {
      name: "Privacy Policy",
      href: "/privacy-policy",
      icon: <Shield size={14} />,
    },
    { name: "Cookie Policy", href: "/cookies", icon: <Cookie size={14} /> },
    { name: "Security Policy", href: "/security", icon: <Lock size={14} /> },
    { name: "Terms of Service", href: "/terms", icon: <FileText size={14} /> },
  ],
};

export default function Footer({ darkMode = false }: FooterProps) {
  return (
    <footer
      className={`border-t ${
        darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Logo imageSrc={VoteVerse} name="VoteVerse" showPulse={false} />
            </div>
            <p
              className={`text-sm mb-4 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Empowering decentralized governance through transparent, secure,
              and efficient voting mechanisms on the Internet Computer Protocol.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className={`p-2 rounded-lg transition-colors ${
                  darkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://github.com/HackathonCodeCrafters"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  darkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className={`p-2 rounded-lg transition-colors ${
                  darkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3
                className={`font-semibold mb-4 capitalize ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className={`text-sm transition-colors flex items-center space-x-2 ${
                        darkMode
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className={`border-t mt-12 pt-8 ${
            darkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              © {new Date().getFullYear()} VoteVerse. All rights reserved. Built
              on Internet Computer Protocol.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Powered by
              </span>
              <div className="flex items-center space-x-2">
                <div className="rounded ">
                  <Image src={IC} alt="Internet Computer" className="h-6" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Internet Computer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
