"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Cookie,
  Eye,
  Mail,
  Settings,
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function CookiePolicyPage() {
  const { darkMode } = useDarkMode();

  const sections = [
    {
      id: "what-are-cookies",
      title: "1. What Are Cookies?",
      icon: <Cookie size={24} />,
      content: (
        <p>
          Cookies are small text files stored on your device when you visit a
          website. They allow the site to recognize your device and remember
          certain preferences (e.g., dark mode, login status, or the last
          visited page).
        </p>
      ),
    },
    {
      id: "types-of-cookies",
      title: "2. Types of Cookies We Use",
      icon: <Settings size={24} />,
      content: (
        <div className="space-y-6">
          <div>
            <h4
              className={`text-lg font-semibold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              a. Functional Cookies (Essential Cookies)
            </h4>
            <p className="mb-3">
              Used to enable core application functions, such as:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Saving dark/light mode preferences</li>
              <li>
                Storing your login status with Internet Identity (locally only)
              </li>
              <li>Remembering the last page you visited</li>
            </ul>
            <div
              className={`mt-4 p-4 rounded-lg ${
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
                  👉 These cookies do not store personal or sensitive identity
                  information.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4
              className={`text-lg font-semibold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              b. Analytics Cookies (Optional)
            </h4>
            <p className="mb-3">
              Currently, VoteVerse does not use any third-party tracking or
              analytics cookies such as Google Analytics. All activity is
              client-side and decentralized.
            </p>
            <div
              className={`p-4 rounded-lg ${
                darkMode
                  ? "bg-blue-900/20 border border-blue-800"
                  : "bg-blue-50 border border-blue-200"
              }`}
            >
              <p
                className={`text-sm ${
                  darkMode ? "text-blue-200" : "text-blue-700"
                }`}
              >
                If we use analytics cookies in the future, you will be given an
                opt-in choice before any cookies are enabled.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "how-we-use-cookies",
      title: "3. How We Use Cookies",
      icon: <Eye size={24} />,
      content: (
        <div className="space-y-4">
          <p>We use cookies solely to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              Enhance user experience, such as remembering display mode and
              Internet Identity session status
            </li>
            <li>Preserve session continuity during page reloads</li>
            <li>
              <strong>Not</strong> for advertising, cross-site tracking, or
              selling user data
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "managing-cookies",
      title: "4. Managing Cookies",
      icon: <Settings size={24} />,
      content: (
        <div className="space-y-4">
          <p>
            You can manage your cookie preferences through your browser
            settings. Most browsers allow you to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Delete all cookies</li>
            <li>Block all cookies or only third-party cookies</li>
            <li>Set notifications before a cookie is stored</li>
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
                If you disable functional cookies, some features of VoteVerse
                may not work properly, such as dark mode or login status.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "policy-updates",
      title: "5. Cookie Policy Updates",
      icon: <AlertTriangle size={24} />,
      content: (
        <p>
          We may update this Cookie Policy from time to time. Changes will be
          posted on this page, and the update date will be revised accordingly.
        </p>
      ),
    },
    {
      id: "contact",
      title: "6. Contact Us",
      icon: <Mail size={24} />,
      content: (
        <div className="space-y-4">
          <p>
            If you have any questions about VoteVerse's use of cookies, please
            contact us at:
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
                href="mailto:privacy@voteverse.app"
                className={`font-medium ${
                  darkMode
                    ? "text-blue-300 hover:text-blue-200"
                    : "text-blue-600 hover:text-blue-800"
                } transition-colors`}
              >
                privacy@voteverse.app
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
        <title>Cookie Policy - VoteVerse</title>
        <meta
          name="description"
          content="VoteVerse Cookie Policy - Learn how we use cookies and similar tracking technologies on our platform."
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
                  darkMode ? "bg-orange-900/30" : "bg-orange-100"
                }`}
              >
                <Cookie size={48} className="text-orange-500" />
              </div>
            </div>
            <h1
              className={`text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              🍪 Cookies Policy
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
              This document explains how VoteVerse uses cookies and similar
              tracking technologies when you access and use our platform.
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
                  <div className="text-orange-500">{section.icon}</div>
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
                      darkMode ? "bg-orange-900/30" : "bg-orange-100"
                    }`}
                  >
                    <div className="text-orange-500">{section.icon}</div>
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

          {/* Footer CTA */}
          <div
            className={`mt-12 p-8 rounded-xl text-center ${
              darkMode
                ? "bg-gradient-to-r from-orange-900/30 to-yellow-900/30 border border-orange-800"
                : "bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200"
            }`}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Need Help Managing Cookies?
            </h3>
            <p
              className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Our team can help you understand and manage your cookie
              preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:privacy@voteverse.app"
                className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                    : "bg-orange-600 hover:bg-orange-700 text-white"
                } shadow-lg hover:shadow-xl`}
              >
                <Mail size={20} className="mr-2" />
                Contact Privacy Team
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
