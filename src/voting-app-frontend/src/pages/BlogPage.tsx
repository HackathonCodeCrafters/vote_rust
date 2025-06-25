"use client";

import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Globe,
  Heart,
  MessageCircle,
  Search,
  Share2,
  Shield,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { useDarkMode } from "../context/DarkModeContext";

export default function BlogPage() {
  const { darkMode } = useDarkMode();

  const featuredPost = {
    id: 1,
    title:
      "The Future of Decentralized Governance: VoteVerse's Vision for 2025",
    excerpt:
      "Explore how VoteVerse is revolutionizing digital democracy through blockchain technology and community-driven decision making.",
    content:
      "As we step into 2025, the landscape of governance is rapidly evolving. VoteVerse stands at the forefront of this transformation...",
    author: "VoteVerse Team",
    date: "2025-01-15",
    readTime: "8 min read",
    category: "Vision",
    tags: ["Governance", "Blockchain", "Future", "Democracy"],
    image: "/placeholder.svg?height=400&width=800",
    featured: true,
  };

  const blogPosts = [
    {
      id: 2,
      title: "How to Create Your First Proposal on VoteVerse",
      excerpt:
        "A step-by-step guide to creating effective proposals that engage your community and drive meaningful decisions.",
      author: "Sarah Chen",
      date: "2025-01-10",
      readTime: "5 min read",
      category: "Tutorial",
      tags: ["Guide", "Proposals", "Getting Started"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 3,
      title:
        "Understanding Internet Computer Protocol: The Technology Behind VoteVerse",
      excerpt:
        "Deep dive into ICP's revolutionary blockchain technology and how it powers secure, scalable governance.",
      author: "Alex Rodriguez",
      date: "2025-01-08",
      readTime: "12 min read",
      category: "Technology",
      tags: ["ICP", "Blockchain", "Technology"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 4,
      title: "Community Spotlight: How DAOs Are Using VoteVerse",
      excerpt:
        "Real-world case studies of decentralized organizations leveraging VoteVerse for transparent governance.",
      author: "Maria Santos",
      date: "2025-01-05",
      readTime: "7 min read",
      category: "Community",
      tags: ["DAOs", "Case Study", "Community"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 5,
      title: "Security Best Practices for Blockchain Voting",
      excerpt:
        "Essential security measures and best practices to ensure safe and secure voting on decentralized platforms.",
      author: "David Kim",
      date: "2025-01-03",
      readTime: "10 min read",
      category: "Security",
      tags: ["Security", "Best Practices", "Voting"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 6,
      title: "The Economics of Decentralized Governance",
      excerpt:
        "Analyzing the economic models and incentive structures that make decentralized governance sustainable.",
      author: "Emma Thompson",
      date: "2024-12-28",
      readTime: "15 min read",
      category: "Economics",
      tags: ["Economics", "Governance", "Incentives"],
      image: "/placeholder.svg?height=300&width=500",
    },
  ];

  const categories = [
    { name: "All", count: 25, icon: <BookOpen size={16} /> },
    { name: "Technology", count: 8, icon: <Zap size={16} /> },
    { name: "Tutorial", count: 6, icon: <BookOpen size={16} /> },
    { name: "Community", count: 5, icon: <MessageCircle size={16} /> },
    { name: "Security", count: 4, icon: <Shield size={16} /> },
    { name: "Vision", count: 2, icon: <Globe size={16} /> },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Technology: "from-blue-500 to-cyan-500",
      Tutorial: "from-green-500 to-emerald-500",
      Community: "from-purple-500 to-pink-500",
      Security: "from-red-500 to-orange-500",
      Vision: "from-yellow-500 to-orange-500",
      Economics: "from-indigo-500 to-purple-500",
    };
    return (
      colors[category as keyof typeof colors] || "from-gray-500 to-gray-600"
    );
  };

  return (
    <>
      <Helmet>
        <title>Blog - VoteVerse</title>
        <meta
          name="description"
          content="Stay updated with the latest insights, tutorials, and news from VoteVerse. Learn about decentralized governance, blockchain technology, and community building."
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
                  <BookOpen size={40} className="text-white" />
                </div>
              </div>
              <h1
                className={`text-5xl md:text-6xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                VoteVerse{" "}
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Blog
                </span>
              </h1>
              <p
                className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Insights, tutorials, and updates from the world of decentralized
                governance
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search
                    size={20}
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-colors ${
                      darkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-lg`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="py-8 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    category.name === "All"
                      ? darkMode
                        ? "bg-purple-600 text-white"
                        : "bg-purple-600 text-white"
                      : darkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700"
                      : "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-300"
                  } shadow-lg hover:shadow-xl`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      category.name === "All"
                        ? "bg-white/20 text-white"
                        : darkMode
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2
                className={`text-3xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Featured Article
              </h2>
            </div>
            <div
              className={`rounded-3xl overflow-hidden shadow-2xl ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getCategoryColor(
                        featuredPost.category
                      )}`}
                    >
                      {featuredPost.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <User
                        size={16}
                        className={darkMode ? "text-gray-400" : "text-gray-500"}
                      />
                      <span
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {featuredPost.author}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar
                        size={16}
                        className={darkMode ? "text-gray-400" : "text-gray-500"}
                      />
                      <span
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock
                        size={16}
                        className={darkMode ? "text-gray-400" : "text-gray-500"}
                      />
                      <span
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                  <h3
                    className={`text-2xl lg:text-3xl font-bold mb-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {featuredPost.title}
                  </h3>
                  <p
                    className={`text-lg mb-6 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-sm ${
                          darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span>Read Full Article</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2
                className={`text-3xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Latest Articles
              </h2>
              <div className="flex items-center space-x-2">
                <TrendingUp size={20} className="text-purple-500" />
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Trending
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getCategoryColor(
                          post.category
                        )}`}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3 text-sm">
                      <div className="flex items-center space-x-1">
                        <User
                          size={14}
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        />
                        <span
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        >
                          {post.author}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar
                          size={14}
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        />
                        <span
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        >
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <h3
                      className={`text-xl font-bold mb-3 group-hover:text-purple-500 transition-colors ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {post.title}
                    </h3>
                    <p
                      className={`mb-4 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 rounded-full text-xs ${
                            darkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Clock
                          size={14}
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        />
                        <span
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {post.readTime}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode
                              ? "hover:bg-gray-700 text-gray-400"
                              : "hover:bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Heart size={16} />
                        </button>
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode
                              ? "hover:bg-gray-700 text-gray-400"
                              : "hover:bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
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
                Stay Updated
              </h2>
              <p
                className={`text-xl mb-8 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Get the latest insights and updates from VoteVerse delivered to
                your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`flex-1 px-6 py-4 rounded-xl border transition-colors ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
                <button className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
