"use client";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { motion } from "framer-motion";
import {
  Coins,
  ExternalLink,
  Gamepad2,
  Globe,
  Shield,
  Users,
} from "lucide-react";
import type React from "react";

interface EcosystemApp {
  title: string;
  description: string;
  link: string;
  category: string;
  network: string;
  icon: React.ReactNode;
  color: string;
}

const ecosystemApps: EcosystemApp[] = [
  {
    title: "OpenChat",
    description:
      "Decentralized messaging platform for community discussions and governance coordination",
    link: "https://oc.app",
    category: "Social",
    network: "Internet Computer",
    icon: <Users className="w-8 h-8" />,
    color: "bg-blue-500",
  },
  {
    title: "NNS Dapp",
    description:
      "Network Nervous System interface for Internet Computer governance and neuron management",
    link: "https://nns.ic0.app",
    category: "Governance",
    network: "Internet Computer",
    icon: <Shield className="w-8 h-8" />,
    color: "bg-gray-700",
  },
  {
    title: "ICPSwap",
    description:
      "Decentralized exchange built on Internet Computer for seamless token trading",
    link: "https://icpswap.com",
    category: "DeFi",
    network: "Internet Computer",
    icon: <Coins className="w-8 h-8" />,
    color: "bg-green-500",
  },
  {
    title: "Entrepot",
    description:
      "NFT marketplace and platform for digital collectibles on Internet Computer",
    link: "https://entrepot.app",
    category: "NFT",
    network: "Internet Computer",
    icon: <Globe className="w-8 h-8" />,
    color: "bg-purple-500",
  },
  {
    title: "DSCVR",
    description:
      "Social media platform for Web3 communities and content creators",
    link: "https://dscvr.one",
    category: "Social",
    network: "Internet Computer",
    icon: <Users className="w-8 h-8" />,
    color: "bg-indigo-500",
  },
  {
    title: "Sonic",
    description:
      "Gaming platform and metaverse built on Internet Computer Protocol",
    link: "https://sonic.ooo",
    category: "Gaming",
    network: "Internet Computer",
    icon: <Gamepad2 className="w-8 h-8" />,
    color: "bg-orange-500",
  },
];

interface MultiEcosystemProps {
  darkMode?: boolean;
}

export default function MultiEcosystem({
  darkMode = false,
}: MultiEcosystemProps) {
  const displayedApps = ecosystemApps;

  return (
    <div className={`py-16 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-center mb-12 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Web3 Ecosystem
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Discover amazing applications across different blockchain networks
          </p>
        </motion.div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedApps.map((app, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`group hover:shadow-lg rounded-lg transition-all duration-300 cursor-pointer border-0 ${
                darkMode
                  ? "bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm"
                  : "bg-white hover:shadow-xl"
              }`}
              onClick={() => window.open(app.link, "_blank")}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${app.color} p-3 rounded-lg text-white`}>
                    {app.icon}
                  </div>
                  <ExternalLink
                    className={`w-5 h-5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    } group-hover:text-blue-500 transition-colors`}
                  />
                </div>

                <div className="mb-3">
                  <h3
                    className={`text-xl text-left font-semibold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {app.title}
                  </h3>
                  <div className="flex gap-2 mb-3">
                    <Badge
                      variant="primary"
                      className={`text-xs ${
                        darkMode
                          ? "border-gray-600 text-gray-600"
                          : "border-gray-300 text-gray-200"
                      }`}
                    >
                      {app.network}
                    </Badge>
                  </div>
                </div>

                <p
                  className={`text-sm text-left leading-relaxed mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {app.description}
                </p>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span
                    className={`text-xs font-medium ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Visit {app.title} →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visit Other Ecosystem Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mt-16 text-center ${
            darkMode ? "bg-gray-800/50" : "bg-white"
          } rounded-2xl p-8 border ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h3
            className={`text-2xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Discover More Applications
          </h3>
          <p
            className={`text-lg mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Explore the complete Internet Computer ecosystem with hundreds of
            innovative dApps
          </p>
          <Button
            onClick={() =>
              window.open("https://internetcomputer.org/ecosystem", "_blank")
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium"
          >
            Visit Other Ecosystem
            <ExternalLink className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
