"use client";

import {
  ArrowRight,
  CheckCircle,
  Github,
  Globe,
  Heart,
  Lightbulb,
  Lock,
  Mail,
  Rocket,
  Shield,
  Target,
  Twitter,
  Users,
  Vote,
  Zap,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { useDarkMode } from "../context/DarkModeContext";

export default function AboutPage() {
  const { darkMode } = useDarkMode();

  const features = [
    {
      icon: <Vote size={24} />,
      title: "Decentralized Voting",
      description:
        "Transparent and immutable voting system built on Internet Computer Protocol",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Shield size={24} />,
      title: "Secure Authentication",
      description:
        "Internet Identity ensures your privacy while maintaining security",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Globe size={24} />,
      title: "Global Accessibility",
      description: "Participate in governance from anywhere in the world, 24/7",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Zap size={24} />,
      title: "Real-time Results",
      description:
        "See voting results update in real-time with blockchain transparency",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const values = [
    {
      icon: <Target size={24} />,
      title: "Transparency",
      description:
        "Every vote and proposal is publicly verifiable on the blockchain",
    },
    {
      icon: <Users size={24} />,
      title: "Community-Driven",
      description:
        "Decisions are made collectively by the community, for the community",
    },
    {
      icon: <Lock size={24} />,
      title: "Privacy-First",
      description: "Your identity is protected while ensuring voting integrity",
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Innovation",
      description:
        "Pushing the boundaries of decentralized governance technology",
    },
  ];

  const stats = [
    { label: "Active Users", value: "10K+", icon: <Users size={20} /> },
    { label: "Proposals Created", value: "500+", icon: <Vote size={20} /> },
    { label: "Votes Cast", value: "25K+", icon: <CheckCircle size={20} /> },
    { label: "Communities", value: "50+", icon: <Globe size={20} /> },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - VoteVerse</title>
        <meta
          name="description"
          content="Learn about VoteVerse - a decentralized governance platform built on Internet Computer Protocol. Discover our mission, values, and how we're revolutionizing digital democracy."
        />
      </Helmet>

      <div
        className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-600/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Users size={40} className="text-white" />
                </div>
              </div>
              <h1
                className={`text-5xl md:text-6xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                About{" "}
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  VoteVerse
                </span>
              </h1>
              <p
                className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Revolutionizing digital democracy through decentralized
                governance on the Internet Computer Protocol
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <ArrowRight size={20} className="ml-2" />
                </a>
                <a
                  href="#mission"
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                      : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
                  } shadow-lg hover:shadow-xl`}
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center p-6 rounded-2xl ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  } shadow-lg`}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <div
                    className={`text-3xl font-bold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div id="mission" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2
                  className={`text-4xl font-bold mb-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Our Mission
                </h2>
                <p
                  className={`text-lg mb-6 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  VoteVerse is dedicated to democratizing decision-making
                  through cutting-edge blockchain technology. We believe that
                  every voice matters and that transparent, secure governance is
                  the foundation of a better digital future.
                </p>
                <p
                  className={`text-lg mb-8 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Built on the Internet Computer Protocol, we provide a platform
                  where communities can make collective decisions with complete
                  transparency, security, and accessibility.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Heart size={20} className="text-red-500" />
                    <span
                      className={`font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Community-First
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Rocket size={20} className="text-blue-500" />
                    <span
                      className={`font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Innovation-Driven
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div
                  className={`p-8 rounded-3xl ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  } shadow-2xl`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Target size={32} className="text-white" />
                    </div>
                    <h3
                      className={`text-2xl font-bold mb-4 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Vision 2030
                    </h3>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      To become the leading platform for decentralized
                      governance, empowering millions of communities worldwide
                      to make transparent, democratic decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className={`text-4xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Why Choose VoteVerse?
              </h2>
              <p
                className={`text-xl max-w-3xl mx-auto ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Experience the future of governance with our innovative features
                designed for transparency, security, and accessibility.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-2xl ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  } shadow-lg hover:shadow-xl transition-all duration-300 group`}
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    className={`text-xl font-bold mb-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className={`text-4xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Our Values
              </h2>
              <p
                className={`text-xl max-w-3xl mx-auto ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                The principles that guide everything we do at VoteVerse
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-2xl ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  } shadow-lg`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white">
                      {value.icon}
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-bold mb-3 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {value.title}
                      </h3>
                      <p
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div
                  className={`p-8 rounded-3xl ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  } shadow-2xl`}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Globe size={40} className="text-white" />
                    </div>
                    <h3
                      className={`text-2xl font-bold mb-4 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Internet Computer Protocol
                    </h3>
                    <p
                      className={`mb-6 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Built on ICP's revolutionary blockchain technology for
                      unmatched speed, security, and scalability.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div
                        className={`p-3 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-50"
                        }`}
                      >
                        <div
                          className={`font-semibold ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Fast
                        </div>
                        <div
                          className={`${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Sub-second finality
                        </div>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-50"
                        }`}
                      >
                        <div
                          className={`font-semibold ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Secure
                        </div>
                        <div
                          className={`${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Cryptographically safe
                        </div>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-50"
                        }`}
                      >
                        <div
                          className={`font-semibold ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Scalable
                        </div>
                        <div
                          className={`${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Unlimited capacity
                        </div>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-50"
                        }`}
                      >
                        <div
                          className={`font-semibold ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Green
                        </div>
                        <div
                          className={`${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Carbon neutral
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2
                  className={`text-4xl font-bold mb-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Powered by Advanced Technology
                </h2>
                <p
                  className={`text-lg mb-6 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  VoteVerse leverages the Internet Computer Protocol to deliver
                  a governance platform that's not just decentralized, but also
                  fast, secure, and environmentally sustainable.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-700"}
                    >
                      Smart contracts (canisters) for transparent execution
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-700"}
                    >
                      Internet Identity for secure, privacy-preserving
                      authentication
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-700"}
                    >
                      Immutable voting records with real-time transparency
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-700"}
                    >
                      Global accessibility with no geographical restrictions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className={`p-12 rounded-3xl ${
                darkMode
                  ? "bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-800"
                  : "bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200"
              }`}
            >
              <h2
                className={`text-4xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Ready to Shape the Future?
              </h2>
              <p
                className={`text-xl mb-8 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Join thousands of users who are already participating in
                decentralized governance on VoteVerse.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Users size={20} className="mr-2" />
                  Start Voting Now
                </a>
                <a
                  href="mailto:support@voteverse.app"
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                      : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
                  } shadow-lg hover:shadow-xl`}
                >
                  <Mail size={20} className="mr-2" />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-16 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3
                className={`text-2xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Connect With Us
              </h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="mailto:support@voteverse.app"
                  className={`p-4 rounded-xl transition-colors ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                  }`}
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
                <a
                  href="#"
                  className={`p-4 rounded-xl transition-colors ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                  }`}
                  aria-label="Twitter"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="#"
                  className={`p-4 rounded-xl transition-colors ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                  }`}
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
