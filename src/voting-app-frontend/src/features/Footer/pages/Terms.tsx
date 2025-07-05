"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  FileText,
  Globe,
  Lock,
  Mail,
  Scale,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function TermsOfServicePage() {
  const { darkMode } = useDarkMode();

  const sections = [
    {
      id: "definitions",
      title: "1. Definitions",
      icon: <FileText size={24} />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`p-4 rounded-lg ${
                darkMode
                  ? "bg-blue-900/20 border border-blue-800"
                  : "bg-blue-50 border border-blue-200"
              }`}
            >
              <h4
                className={`font-semibold mb-2 ${
                  darkMode ? "text-blue-300" : "text-blue-800"
                }`}
              >
                VoteVerse
              </h4>
              <p
                className={`text-sm ${
                  darkMode ? "text-blue-200" : "text-blue-700"
                }`}
              >
                A voting application based on the Internet Computer Protocol
                (ICP).
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
                User
              </h4>
              <p
                className={`text-sm ${
                  darkMode ? "text-green-200" : "text-green-700"
                }`}
              >
                You, the individual using this application via Internet Identity
                authentication.
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
                Canister
              </h4>
              <p
                className={`text-sm ${
                  darkMode ? "text-purple-200" : "text-purple-700"
                }`}
              >
                The smart contract used by VoteVerse to store and process voting
                data on-chain.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "access-authentication",
      title: "2. Access and Authentication",
      icon: <Lock size={24} />,
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              To access certain features, you must connect using Internet
              Identity.
            </li>
            <li>
              You are responsible for safeguarding your identity and private
              access credentials.
            </li>
            <li>
              Any activity conducted under your Principal ID is considered your
              personal responsibility.
            </li>
          </ul>
          <div
            className={`p-4 rounded-lg ${
              darkMode
                ? "bg-yellow-900/20 border border-yellow-800"
                : "bg-yellow-50 border border-yellow-200"
            }`}
          >
            <div className="flex items-start space-x-2">
              <AlertTriangle size={20} className="text-yellow-500 mt-0.5" />
              <p
                className={`text-sm ${
                  darkMode ? "text-yellow-200" : "text-yellow-700"
                }`}
              >
                <strong>Important:</strong> Keep your Internet Identity secure.
                We cannot recover lost access or reverse actions taken under
                your Principal ID.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "usage-rules",
      title: "3. Usage Rules",
      icon: <CheckCircle size={24} />,
      content: (
        <div className="space-y-4">
          <p>By using VoteVerse, you agree to:</p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-green-500 mt-0.5" />
              <p>
                Not abuse the voting system (e.g., spamming, manipulation, or
                disruption).
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-green-500 mt-0.5" />
              <p>
                Not use the platform to spread false information, hate speech,
                or engage in illegal activity.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-green-500 mt-0.5" />
              <p>
                Respect the decentralized system and collective decisions made
                by the community.
              </p>
            </div>
          </div>
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
              Prohibited Activities
            </h4>
            <ul
              className={`text-sm space-y-1 ${
                darkMode ? "text-red-200" : "text-red-700"
              }`}
            >
              <li>• Creating fake or misleading proposals</li>
              <li>• Attempting to manipulate voting outcomes</li>
              <li>• Harassing other community members</li>
              <li>• Violating applicable laws or regulations</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "responsibility-limitations",
      title: "4. Responsibility and Limitations",
      icon: <AlertTriangle size={24} />,
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              VoteVerse is an experimental platform built on decentralized
              technology.
            </li>
            <li>
              We do not guarantee 100% uptime or continuous availability of
              canisters.
            </li>
            <li>
              We are not responsible for data loss, voting outcomes, or
              consequences arising from platform usage.
            </li>
          </ul>
          <div
            className={`p-4 rounded-lg ${
              darkMode
                ? "bg-orange-900/20 border border-orange-800"
                : "bg-orange-50 border border-orange-200"
            }`}
          >
            <h4
              className={`font-semibold mb-2 ${
                darkMode ? "text-orange-300" : "text-orange-800"
              }`}
            >
              Platform Limitations
            </h4>
            <p
              className={`text-sm ${
                darkMode ? "text-orange-200" : "text-orange-700"
              }`}
            >
              As a decentralized platform, VoteVerse operates on blockchain
              technology which may experience network congestion, delays, or
              temporary unavailability. Users acknowledge these inherent
              limitations.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "content-rights",
      title: "5. Content Rights",
      icon: <Globe size={24} />,
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              All proposals, votes, and data you create are public and permanent
              on the blockchain.
            </li>
            <li>
              You understand that there is no way to delete data once it is
              recorded on-chain.
            </li>
            <li>
              VoteVerse does not claim ownership over proposals or
              user-generated content.
            </li>
          </ul>
          <div
            className={`p-4 rounded-lg ${
              darkMode
                ? "bg-blue-900/20 border border-blue-800"
                : "bg-blue-50 border border-blue-200"
            }`}
          >
            <h4
              className={`font-semibold mb-2 ${
                darkMode ? "text-blue-300" : "text-blue-800"
              }`}
            >
              Blockchain Permanence
            </h4>
            <p
              className={`text-sm ${
                darkMode ? "text-blue-200" : "text-blue-700"
              }`}
            >
              By submitting content to VoteVerse, you acknowledge that it will
              be permanently stored on the Internet Computer blockchain and
              cannot be modified or deleted. Please consider this carefully
              before submitting.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "service-changes",
      title: "6. Service Changes",
      icon: <Settings size={24} />,
      content: (
        <p>
          We reserve the right to modify, suspend, or discontinue services at
          any time, with or without notice, for technical, security, or
          developmental reasons.
        </p>
      ),
    },
    {
      id: "termination",
      title: "7. Termination of Access",
      icon: <Shield size={24} />,
      content: (
        <div className="space-y-4">
          <p>
            We reserve the right to limit or block your access if we detect a
            violation of these terms and conditions, without the obligation to
            provide prior notice.
          </p>
          <div
            className={`p-4 rounded-lg ${
              darkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-gray-50 border border-gray-200"
            }`}
          >
            <h4
              className={`font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Enforcement Actions
            </h4>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Violations may result in warnings, temporary suspension, or
              permanent access restriction depending on severity. We aim to be
              fair but prioritize community safety and platform integrity.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "governing-law",
      title: "8. Governing Law",
      icon: <Scale size={24} />,
      content: (
        <div className="space-y-4">
          <p>
            These Terms and Conditions are governed by and interpreted under
            international laws applicable to blockchain-based applications. Any
            disputes will be resolved through community mechanisms or official
            VoteVerse contact channels.
          </p>
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
              Dispute Resolution
            </h4>
            <p
              className={`text-sm ${
                darkMode ? "text-purple-200" : "text-purple-700"
              }`}
            >
              We encourage resolving disputes through community discussion and
              mediation before pursuing formal legal action. Our support team is
              available to facilitate resolution.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "contact",
      title: "9. Contact",
      icon: <Mail size={24} />,
      content: (
        <div className="space-y-4">
          <p>
            If you have any questions or complaints regarding the service,
            please contact us:
          </p>
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
        <title>Terms of Service - VoteVerse</title>
        <meta
          name="description"
          content="VoteVerse Terms of Service - Read our terms and conditions for using our decentralized governance platform."
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
                  darkMode ? "bg-blue-900/30" : "bg-blue-100"
                }`}
              >
                <FileText size={48} className="text-blue-500" />
              </div>
            </div>
            <h1
              className={`text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              📜 Terms of Service
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
              By accessing and using the VoteVerse platform, you agree to comply
              with and be bound by the terms and conditions outlined in this
              document. If you do not agree with any part of these terms, please
              refrain from using VoteVerse.
            </p>
          </div>

          {/* Agreement Notice */}
          <div
            className={`p-6 rounded-xl mb-8 ${
              darkMode
                ? "bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800"
                : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
            }`}
          >
            <div className="flex items-start space-x-3">
              <CheckCircle size={24} className="text-blue-500 mt-1" />
              <div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Agreement to Terms
                </h3>
                <p
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  By using VoteVerse, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms of Service.
                  These terms apply to all users of the platform.
                </p>
              </div>
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
                  <div className="text-blue-500">{section.icon}</div>
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
                      darkMode ? "bg-blue-900/30" : "bg-blue-100"
                    }`}
                  >
                    <div className="text-blue-500">{section.icon}</div>
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

          {/* Acceptance Footer */}
          <div
            className={`mt-12 p-8 rounded-xl text-center ${
              darkMode
                ? "bg-gradient-to-r from-blue-900/30 to-green-900/30 border border-blue-800"
                : "bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200"
            }`}
          >
            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
            <h3
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Ready to Get Started?
            </h3>
            <p
              className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              By continuing to use VoteVerse, you confirm your acceptance of
              these Terms of Service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dashboard"
                className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } shadow-lg hover:shadow-xl`}
              >
                <Users size={20} className="mr-2" />
                Start Voting
              </a>
              <a
                href="mailto:support@voteverse.app"
                className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
                } shadow-lg hover:shadow-xl`}
              >
                <Mail size={20} className="mr-2" />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
