"use client";

import {
  Building,
  Clock,
  Globe,
  Headphones,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Newspaper,
  Send,
  Users,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { useDarkMode } from "../../context/DarkModeContext";

export default function ContactPage() {
  const { darkMode } = useDarkMode();

  const contactSections = [
    {
      id: "general",
      title: "💡 General Inquiries",
      description:
        "For general questions about how VoteVerse works or how to get started:",
      icon: <Lightbulb size={24} />,
      contacts: [
        {
          type: "Email",
          value: "support@voteverse.app",
          href: "mailto:support@voteverse.app",
          icon: <Mail size={20} />,
        },
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "technical",
      title: "🛠️ Technical Support",
      description:
        "Encountering issues or bugs? Our dev team is ready to assist you.",
      icon: <Headphones size={24} />,
      contacts: [
        {
          type: "Tech Support",
          value: "support@voteverse.app",
          href: "mailto:support@voteverse.app",
          icon: <Mail size={20} />,
        },
        {
          type: "Community Discord",
          value: "Coming soon",
          href: "#",
          icon: <MessageCircle size={20} />,
          disabled: true,
        },
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "partnerships",
      title: "🤝 Partnerships & Collaboration",
      description:
        "Interested in working together or integrating with VoteVerse?",
      icon: <Users size={24} />,
      contacts: [
        {
          type: "Business Inquiries",
          value: "partners@voteverse.app",
          href: "mailto:partners@voteverse.app",
          icon: <Mail size={20} />,
        },
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "media",
      title: "📣 Media & Press",
      description: "For interviews, press kits, or media-related matters:",
      icon: <Newspaper size={24} />,
      contacts: [
        {
          type: "Press Contact",
          value: "press@voteverse.app",
          href: "mailto:press@voteverse.app",
          icon: <Mail size={20} />,
        },
      ],
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - VoteVerse</title>
        <meta
          name="description"
          content="Get in touch with the VoteVerse team. We're here to help with questions, support, partnerships, and more."
        />
      </Helmet>

      <div
        className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Mail size={40} className="text-white" />
                </div>
              </div>
              <h1
                className={`text-5xl md:text-6xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                📬 Contact Us
              </h1>
              <p
                className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                We'd love to hear from you.
              </p>
              <p
                className={`text-lg max-w-4xl mx-auto ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Whether you have a question, feedback, or just want to say
                hello, the VoteVerse team is always open to connecting with our
                community.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Sections */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contactSections.map((section) => (
                <div
                  key={section.id}
                  className={`p-8 rounded-2xl ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  } shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-r ${section.color}`}
                    >
                      <div className="text-white">{section.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-xl font-bold mb-2 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {section.title}
                      </h3>
                      <p
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {section.contacts.map((contact, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-4 rounded-lg ${
                          darkMode ? "bg-gray-700/50" : "bg-gray-50"
                        } ${contact.disabled ? "opacity-50" : ""}`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            darkMode ? "bg-gray-600" : "bg-white"
                          }`}
                        >
                          <div
                            className={
                              contact.disabled
                                ? "text-gray-400"
                                : "text-blue-500"
                            }
                          >
                            {contact.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div
                            className={`font-medium ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {contact.type}
                          </div>
                          {contact.disabled ? (
                            <div
                              className={`text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {contact.value}
                            </div>
                          ) : (
                            <a
                              href={contact.href}
                              className={`text-sm transition-colors ${
                                darkMode
                                  ? "text-blue-300 hover:text-blue-200"
                                  : "text-blue-600 hover:text-blue-800"
                              }`}
                            >
                              {contact.value}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location & Info Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Location Info */}
              <div
                className={`p-8 rounded-2xl ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                } shadow-lg`}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-500">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      🗺️ Where We're Based
                    </h3>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      VoteVerse is a global remote-first project built by
                      contributors from around the world.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock size={20} className="text-blue-500" />
                    <div>
                      <div
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Time Zone
                      </div>
                      <div
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        GMT+7 (Jakarta, Indonesia)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe size={20} className="text-purple-500" />
                    <div>
                      <div
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Platform
                      </div>
                      <div
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        100% decentralized — we exist on the blockchain
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback Form */}
              <div
                className={`p-8 rounded-2xl ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                } shadow-lg`}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                    <Lightbulb size={24} className="text-white" />
                  </div>
                  <div>
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      💡 Have a suggestion?
                    </h3>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      We'd love to hear your feature requests and feedback!
                    </p>
                  </div>
                </div>

                <form className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                      } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                      } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                      placeholder="Tell us about your suggestion or feedback..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Send size={20} className="mr-2" />
                    Send Feedback
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact CTA */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className={`p-12 rounded-3xl ${
                darkMode
                  ? "bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800"
                  : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
              }`}
            >
              <h2
                className={`text-4xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Need Immediate Help?
              </h2>
              <p
                className={`text-xl mb-8 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                For urgent matters or quick questions, reach out directly to our
                support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@voteverse.app"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Mail size={20} className="mr-2" />
                  Email Support
                </a>
                <a
                  href="/about"
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                      : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
                  } shadow-lg hover:shadow-xl`}
                >
                  <Building size={20} className="mr-2" />
                  Learn More About Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
