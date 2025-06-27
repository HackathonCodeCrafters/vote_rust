"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import {
  AlertTriangle,
  Bug,
  Calendar,
  CheckCircle,
  Eye,
  FileText,
  Globe,
  Lock,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function SecurityPolicyPage() {
  const { darkMode } = useDarkMode();

  const sections = [
    {
      id: "decentralization",
      title: "1. Decentralization and Smart Contracts (Canisters)",
      icon: <Globe size={24} />,
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              VoteVerse operates on the Internet Computer (ICP) network, which
              is decentralized and serverless.
            </li>
            <li>
              All application logic — including proposal management, voting, and
              result recording — is handled by transparent and immutable smart
              contracts (canisters).
            </li>
            <li>
              Voting results cannot be modified or deleted once recorded on the
              blockchain.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "authentication",
      title: "2. Secure Authentication with Internet Identity",
      icon: <Lock size={24} />,
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              VoteVerse uses Internet Identity (II) as the primary
              authentication system.
            </li>
            <li>
              Your identity is never stored locally or by VoteVerse — we only
              log your Principal ID to associate activities with your account.
            </li>
            <li>
              II uses device-based WebAuthn (Face ID, fingerprint, passkey,
              etc.) for high-level security.
            </li>
          </ul>
          <div
            className={`p-4 rounded-lg ${
              darkMode
                ? "bg-green-900/20 border border-green-800"
                : "bg-green-50 border border-green-200"
            }`}
          >
            <div className="flex items-start space-x-2">
              <CheckCircle size={20} className="text-green-500 mt-0.5" />
              <p
                className={`text-sm ${
                  darkMode ? "text-green-200" : "text-green-700"
                }`}
              >
                Your private keys never leave your device and are never shared
                with VoteVerse.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "data-storage",
      title: "3. No Storage of Sensitive Personal Data",
      icon: <Eye size={24} />,
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              We do not store sensitive personal data such as full names, email
              addresses, or user passwords.
            </li>
            <li>
              All user data is public and verifiable by anyone on the network.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "voting-security",
      title: "4. Voting Security",
      icon: <Users size={24} />,
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              Each user can only cast one vote per proposal, based on their
              unique Principal ID.
            </li>
            <li>
              Voting results cannot be altered unilaterally by anyone, including
              VoteVerse developers.
            </li>
            <li>
              All voting processes take place on-chain and can be publicly
              audited in real-time.
            </li>
          </ul>
          <div
            className={`p-4 rounded-lg ${
              darkMode
                ? "bg-blue-900/20 border border-blue-800"
                : "bg-blue-50 border border-blue-200"
            }`}
          >
            <div className="flex items-start space-x-2">
              <Shield size={20} className="text-blue-500 mt-0.5" />
              <p
                className={`text-sm ${
                  darkMode ? "text-blue-200" : "text-blue-700"
                }`}
              >
                Every vote is cryptographically signed and permanently recorded
                on the blockchain.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "attack-mitigation",
      title: "5. Mitigation of Common Attacks",
      icon: <Zap size={24} />,
      content: (
        <div className="space-y-4">
          <p>We apply strategies to prevent:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-lg ${
                darkMode
                  ? "bg-red-900/20 border border-red-800"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <h4
                className={`font-semibold mb-2 ${
                  darkMode ? "text-red-300" : "text-red-800"
                }`}
              >
                Replay attacks
              </h4>
              <p
                className={`text-sm ${
                  darkMode ? "text-red-200" : "text-red-700"
                }`}
              >
                Prevented by using timestamp and Principal as voting parameters.
              </p>
            </div>
            <div
              className={`p-4 rounded-lg ${
                darkMode
                  ? "bg-yellow-900/20 border border-yellow-800"
                  : "bg-yellow-50 border border-yellow-200"
              }`}
            >
              <h4
                className={`font-semibold mb-2 ${
                  darkMode ? "text-yellow-300" : "text-yellow-800"
                }`}
              >
                Double voting
              </h4>
              <p
                className={`text-sm ${
                  darkMode ? "text-yellow-200" : "text-yellow-700"
                }`}
              >
                Prevented by logging unique votes based on Principal.
              </p>
            </div>
            <div
              className={`p-4 rounded-lg ${
                darkMode
                  ? "bg-purple-900/20 border border-purple-800"
                  : "bg-purple-50 border border-purple-200"
              }`}
            >
              <h4
                className={`font-semibold mb-2 ${
                  darkMode ? "text-purple-300" : "text-purple-800"
                }`}
              >
                Front-running
              </h4>
              <p
                className={`text-sm ${
                  darkMode ? "text-purple-200" : "text-purple-700"
                }`}
              >
                Voting canisters are designed to equalize submission times with
                no priority order.
              </p>
            </div>
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
                Proposal/voting spam
              </h4>
              <p
                className={`text-sm ${
                  darkMode ? "text-green-200" : "text-green-700"
                }`}
              >
                Time limits and fees may be introduced if needed in the future.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "auditing",
      title: "6. Auditing and Transparency",
      icon: <FileText size={24} />,
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              VoteVerse's source code is open-source (where applicable) and can
              be audited by anyone in the community.
            </li>
            <li>
              We welcome responsible disclosure if you discover a security
              vulnerability — please contact us via the email listed below.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "responsible-disclosure",
      title: "7. Responsible Disclosure Policy",
      icon: <Bug size={24} />,
      content: (
        <div className="space-y-4">
          <p>If you discover a security vulnerability in VoteVerse:</p>
          <div
            className={`p-6 rounded-lg ${
              darkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-gray-50 border border-gray-200"
            }`}
          >
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong>Do not exploit the vulnerability.</strong>
              </li>
              <li>
                <strong>Report it in detail</strong> via email to{" "}
                <a
                  href="mailto:security@voteverse.app"
                  className={`font-medium ${
                    darkMode
                      ? "text-blue-300 hover:text-blue-200"
                      : "text-blue-600 hover:text-blue-800"
                  } transition-colors`}
                >
                  security@voteverse.app
                </a>
                .
              </li>
              <li>
                <strong>We will investigate</strong> within a maximum of 72
                hours.
              </li>
              <li>
                <strong>If confirmed valid,</strong> you will receive
                appreciation and credit (can be made public with your
                permission).
              </li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: "security-updates",
      title: "8. Security Updates",
      icon: <AlertTriangle size={24} />,
      content: (
        <div className="space-y-4">
          <p>
            We regularly update our canister logic to fix bugs, enhance security
            features, and align with evolving standards on the Internet Computer
            network.
          </p>
          <p>
            If you have further questions regarding VoteVerse's security, feel
            free to contact us at:{" "}
            <a
              href="mailto:security@voteverse.app"
              className={`font-medium ${
                darkMode
                  ? "text-blue-300 hover:text-blue-200"
                  : "text-blue-600 hover:text-blue-800"
              } transition-colors`}
            >
              security@voteverse.app
            </a>
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Security Policy - VoteVerse</title>
        <meta
          name="description"
          content="VoteVerse Security Policy - Learn about our security practices and how we protect your data and voting integrity."
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
                  darkMode ? "bg-red-900/30" : "bg-red-100"
                }`}
              >
                <Shield size={48} className="text-red-500" />
              </div>
            </div>
            <h1
              className={`text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              🔐 Security Policy
            </h1>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Calendar
                size={16}
                className={darkMode ? "text-gray-400" : "text-gray-500"}
              />
              <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                Last updated: June 4, 2025
              </span>
            </div>
            <p
              className={`text-lg mt-4 max-w-2xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              At VoteVerse, we are committed to protecting your data, identity,
              and the integrity of voting results. This policy outlines the
              security practices we implement to safeguard you and our system.
            </p>
          </div>

          {/* Security Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div
              className={`p-6 rounded-xl text-center ${
                darkMode
                  ? "bg-green-900/20 border border-green-800"
                  : "bg-green-50 border border-green-200"
              }`}
            >
              <Globe size={32} className="text-green-500 mx-auto mb-3" />
              <h3
                className={`font-semibold mb-2 ${
                  darkMode ? "text-green-300" : "text-green-800"
                }`}
              >
                Decentralized
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-green-200" : "text-green-700"
                }`}
              >
                Built on Internet Computer Protocol for maximum security
              </p>
            </div>
            <div
              className={`p-6 rounded-xl text-center ${
                darkMode
                  ? "bg-blue-900/20 border border-blue-800"
                  : "bg-blue-50 border border-blue-200"
              }`}
            >
              <Lock size={32} className="text-blue-500 mx-auto mb-3" />
              <h3
                className={`font-semibold mb-2 ${
                  darkMode ? "text-blue-300" : "text-blue-800"
                }`}
              >
                Internet Identity
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-blue-200" : "text-blue-700"
                }`}
              >
                Secure authentication without storing personal data
              </p>
            </div>
            <div
              className={`p-6 rounded-xl text-center ${
                darkMode
                  ? "bg-purple-900/20 border border-purple-800"
                  : "bg-purple-50 border border-purple-200"
              }`}
            >
              <Eye size={32} className="text-purple-500 mx-auto mb-3" />
              <h3
                className={`font-semibold mb-2 ${
                  darkMode ? "text-purple-300" : "text-purple-800"
                }`}
              >
                Transparent
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-purple-200" : "text-purple-700"
                }`}
              >
                All voting processes are publicly auditable
              </p>
            </div>
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
                  <div className="text-red-500">{section.icon}</div>
                  <span className="text-sm font-medium">{section.title}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
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
                      darkMode ? "bg-red-900/30" : "bg-red-100"
                    }`}
                  >
                    <div className="text-red-500">{section.icon}</div>
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
                    darkMode ? "prose-invert" : "prose-gray"
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

          {/* Security Contact CTA */}
          <div
            className={`mt-12 p-8 rounded-xl text-center ${
              darkMode
                ? "bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-800"
                : "bg-gradient-to-r from-red-50 to-orange-50 border border-red-200"
            }`}
          >
            <Shield size={48} className="text-red-500 mx-auto mb-4" />
            <h3
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Found a Security Issue?
            </h3>
            <p
              className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              We take security seriously. Report vulnerabilities responsibly and
              help us keep VoteVerse secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:security@voteverse.app"
                className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                } shadow-lg hover:shadow-xl`}
              >
                <Bug size={20} className="mr-2" />
                Report Security Issue
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
