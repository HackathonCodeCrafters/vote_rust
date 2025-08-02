"use client";

import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useState } from "react";

interface NewsLetterProps {
  darkMode?: boolean;
  onConnectWallet?: () => void;
}

export default function NewsLetter({
  darkMode = false,
  onConnectWallet,
}: NewsLetterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
    >
      <Card className="p-8 md:p-12 text-center" darkMode={darkMode}>
        <div
          className={`space-y-6 ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Make Your Voice Heard?
          </h2>
          <p
            className={`text-xl max-w-2xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Join thousands of voters shaping the future of decentralized
            governance
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Button
              onClick={onConnectWallet}
              variant="gradient"
              size="lg"
              className="flex-1"
            >
              Start Voting
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => (window.location.hash = "pricing")}
            >
              View Pricing
            </Button>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  required
                />
              </div>
              <Button type="submit" variant="gradient" icon={Mail}>
                {isSubscribed ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>
            {isSubscribed && (
              <p className="text-green-500 text-sm mt-2">
                Thank you for subscribing to our newsletter!
              </p>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
