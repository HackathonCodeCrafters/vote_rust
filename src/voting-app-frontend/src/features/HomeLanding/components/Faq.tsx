"use client";

import FAQItem from "@/features/HomeLanding/components/FaqItem";
import { motion } from "framer-motion";

interface FAQItemProps {
  darkMode?: boolean;
}

const faqs = [
  {
    question: "What is VoteVerse and how does it work?",
    answer:
      "VoteVerse is a decentralized governance platform built on Internet Computer Protocol. It allows communities to create, discuss, and vote on proposals in a transparent and secure manner using blockchain technology.",
  },
  {
    question: "How do I participate in voting?",
    answer:
      "To participate, you need to connect your Internet Identity or supported wallet. Once connected, you can browse active proposals, read details, and cast your votes. Your voting power may depend on your token holdings or community membership.",
  },
  {
    question: "Is my vote private and secure?",
    answer:
      "Yes, all votes are cryptographically secured and recorded on the blockchain. While the voting results are transparent, your individual vote can remain private depending on the Proposal settings.",
  },
  {
    question: "Can I create my own proposals?",
    answer:
      "Connected users can create proposals by providing a title, description, and relevant details. Proposals go through a review process before becoming active for voting.",
  },
  {
    question: "What makes Internet Computer different?",
    answer:
      "Internet Computer offers web-speed performance, low costs, and can host entire applications on-chain. This means faster voting, lower fees, and a more seamless user experience compared to other blockchains.",
  },
  {
    question: "Are there any fees for voting?",
    answer:
      "Voting on VoteVerse has minimal fees thanks to Internet Computer's efficient architecture. Most voting actions cost fractions of a cent, making governance accessible to everyone.",
  },
];

export default function Faq({ darkMode = false }: FAQItemProps) {
  return (
    <motion.div
      className={`py-16 ${darkMode ? "bg-gray-800/50" : "bg-gray-50"}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p
            className={`text-xl ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Everything you need to know about VoteVerse
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
