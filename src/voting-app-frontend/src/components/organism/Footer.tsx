"use client";

import VoteVerse from "@/assets/img/logo_vote_verse.png";
import Logo from "@/components/molecules/Logo";
import { Github, MessageCircle, Twitter } from "lucide-react";

interface FooterProps {
  darkMode?: boolean;
}

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Documentation", href: "#docs" },
    { name: "API", href: "#api" },
  ],
  company: [
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Careers", href: "#careers" },
    { name: "Contact", href: "#contact" },
  ],
  resources: [
    { name: "Community", href: "#community" },
    { name: "Help Center", href: "#help" },
    { name: "Partners", href: "#partners" },
    { name: "Status", href: "#status" },
  ],
  legal: [
    { name: "Privacy", href: "#privacy" },
    { name: "Terms", href: "#terms" },
    { name: "Security", href: "#security" },
    { name: "Cookies", href: "#cookies" },
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
                href="#"
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
                    <a
                      href={link.href}
                      className={`text-sm transition-colors ${
                        darkMode
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {link.name}
                    </a>
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
                <div className="w-6 h-6 rounded bg-gradient-to-r from-purple-500 to-pink-500"></div>
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
