"use client";

import {
  AlertCircle,
  Calendar,
  Eye,
  FileText,
  Lock,
  Mail,
  Shield,
  Users,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { useDarkMode } from "../../context/DarkModeContext";

export default function PrivacyPolicyPage() {
  const { darkMode } = useDarkMode();

  const sections = [
    {
      id: "information-collection",
      title: "1. Information We Collect",
      icon: <Eye size={24} />,
      content: (
        <div className="space-y-4">
          <p>
            Since VoteVerse is built on the Internet Computer Protocol (ICP) and
            focuses on decentralization, we do not collect personal information
            directly, except for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Your Internet Identity Principal ID</li>
            <li>Your voting activities and proposals you create</li>
            <li>Access times and activity data recorded on-chain</li>
          </ul>
          <div
            className={`p-4 rounded-lg ${
              darkMode
                ? "bg-green-900/20 border border-green-800"
                : "bg-green-50 border border-green-200"
            }`}
          >
            <h4
              className={`font-semibold mb-2 ${
                darkMode ? "text-green-300" : "text-green-800"
              }`}
            >
              We DO NOT access:
            </h4>
            <ul
              className={`list-disc list-inside space-y-1 ${
                darkMode ? "text-green-200" : "text-green-700"
              }`}
            >
              <li>Full name</li>
              <li>Email</li>
              <li>Location</li>
              <li>Other personal information</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "data-usage",
      title: "2. How We Use Your Data",
      icon: <Users size={24} />,
      content: (
        <div className="space-y-4">
          <p>The collected data is only used to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Display voting results and user participation history</li>
            <li>
              Provide voting features, proposal creation, and dashboard display
            </li>
            <li>
              Improve performance and system transparency through on-chain data
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "storage-security",
      title: "3. Storage and Security",
      icon: <Lock size={24} />,
      content: (
        <div className="space-y-4">
          <p>
            Your data is stored on-chain in the Internet Computer (ICP) network.
            We do not store any data on a centralized server. Each interaction
            is recorded via smart contract (canister) and cannot be modified
            arbitrarily.
          </p>
          <p>
            We implement best practices in canister security and identity
            management.
          </p>
        </div>
      ),
    },
    {
      id: "user-rights",
      title: "4. Your Rights",
      icon: <Shield size={24} />,
      content: (
        <div className="space-y-4">
          <p>As a user:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>You control your identity via Internet Identity</li>
            <li>
              You can delete or revoke access by disconnecting your Internet
              Identity
            </li>
            <li>
              Because the system is public & immutable, voting data cannot be
              deleted, but remains anonymous
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "third-party",
      title: "5. Third-Party Services",
      icon: <FileText size={24} />,
      content: (
        <p>
          If we use third-party services in the future (e.g., analytics,
          payments, or image storage), this section will be updated.
        </p>
      ),
    },
    {
      id: "policy-changes",
      title: "6. Changes to Privacy Policy",
      icon: <AlertCircle size={24} />,
      content: (
        <p>
          This policy may be updated at any time. Changes will be announced on
          the homepage or user settings page.
        </p>
      ),
    },
    {
      id: "contact",
      title: "7. Contact Us",
      icon: <Mail size={24} />,
      content: (
        <div className="space-y-4">
          <p>For privacy-related questions, please contact us via email:</p>
          <div
            className={`p-4 rounded-lg ${
              darkMode
                ? "bg-blue-900/20 border border-blue-800"
                : "bg-blue-50 border border-blue-200"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Mail size={20} className="text-blue-500" />
              <a
                href="mailto:support@voteverse.app"
                className={`font-medium ${
                  darkMode
                    ? "text-blue-300 hover:text-blue-200"
                    : "text-blue-600 hover:text-blue-800"
                } transition-colors`}
              >
                support@voteverse.app
              </a>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy - VoteVerse</title>
        <meta
          name="description"
          content="VoteVerse Privacy Policy - Learn how we protect your privacy and handle your data on our decentralized governance platform."
        />
      </Helmet>

      <div
        className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div
                className={`p-4 rounded-full ${
                  darkMode ? "bg-purple-900/30" : "bg-purple-100"
                }`}
              >
                <Shield size={48} className="text-purple-500" />
              </div>
            </div>
            <h1
              className={`text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              🛡️ Privacy Policy
            </h1>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Calendar
                size={16}
                className={darkMode ? "text-gray-400" : "text-gray-500"}
              />
              <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                Last updated: 4 June 2025
              </span>
            </div>
            <p
              className={`text-lg mt-4 max-w-2xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Welcome to VoteVerse! Your privacy is important to us.
              This Privacy Policy explains how we collect, use, and protect your information while using the VoteVerse platform.
            </p>
          </div>

          {/* Table of Contents */}
          <div
            className={`p-6 rounded-xl mb-8 ${
              darkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            } shadow-sm`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Table of Contents
            </h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    darkMode
                      ? "hover:bg-gray-700 text-gray-300 hover:text-white"
                      : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div className="text-purple-500">{section.icon}</div>
                  <span className="text-sm font-medium">{section.title}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={`p-8 rounded-xl ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                } shadow-sm`}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div
                    className={`p-3 rounded-lg ${
                      darkMode ? "bg-purple-900/30" : "bg-purple-100"
                    }`}
                  >
                    <div className="text-purple-500">{section.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h2
                      className={`text-2xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {section.title}
                    </h2>
                  </div>
                </div>
                <div
                  className={`prose prose-lg max-w-none ${
                    darkMode ? "prose-invert prose-purple" : "prose-gray"
                  }`}
                >
                  <div
                    className={`leading-relaxed ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {section.content}
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Footer CTA */}
          <div
            className={`mt-12 p-8 rounded-xl text-center ${
              darkMode
                ? "bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-800"
                : "bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200"
            }`}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Still Have Questions?
            </h3>
            <p
              className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Our team is ready to help you better understand our privacy policy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@voteverse.app"
                className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                } shadow-lg hover:shadow-xl`}
              >
                <Mail size={20} className="mr-2" />
                Contact Support
              </a>
              <a
                href="/"
                className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
                } shadow-lg hover:shadow-xl`}
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
