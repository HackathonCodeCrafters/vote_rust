"use client";

import { useDarkMode } from "@/context/DarkModeContext";
import { Check, Crown, Star, Zap } from "lucide-react";
import { Helmet } from "react-helmet";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";

interface PricingPageProps {
  onConnectWallet?: () => void;
}

const pricingPlans = [
  {
    name: "Community",
    price: "Free",
    description: "Perfect for individual voters and small communities",
    icon: Star,
    gradient: "from-green-500 to-emerald-500",
    features: [
      "Up to 5 proposals per month",
      "Basic voting features",
      "Community support",
      "Standard Proposal templates",
      "Basic analytics",
      "Email notifications",
    ],
    limitations: ["Limited customization", "Basic reporting"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Ideal for growing DAOs and organizations",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Unlimited proposals",
      "Advanced voting mechanisms",
      "Priority support",
      "Custom Proposal templates",
      "Advanced analytics & insights",
      "Multi-channel notifications",
      "Delegation features",
      "Custom branding",
      "API access",
    ],
    limitations: [],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with specific needs",
    icon: Crown,
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Everything in Pro",
      "White-label solution",
      "Dedicated support manager",
      "Custom integrations",
      "Advanced security features",
      "SLA guarantees",
      "On-premise deployment",
      "Custom development",
      "Training & onboarding",
    ],
    limitations: [],
    popular: false,
  },
];

const faqs = [
  {
    question: "How does the pricing work?",
    answer:
      "Our pricing is based on the features and scale you need. The Community plan is free forever, Pro is a monthly subscription, and Enterprise is custom-priced based on your requirements.",
  },
  {
    question: "Can I change plans anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and cryptocurrency payments including ICP tokens for a discount.",
  },
  {
    question: "Is there a free trial for Pro features?",
    answer:
      "Yes, we offer a 14-day free trial of all Pro features. No credit card required to start your trial.",
  },
  {
    question: "Do you offer discounts for non-profits?",
    answer:
      "Yes, we offer special pricing for registered non-profit organizations and educational institutions. Contact us for details.",
  },
];

export default function PricingPage({ onConnectWallet }: PricingPageProps) {
  const { darkMode } = useDarkMode();
  return (
    <>
      <Helmet>
        <title>Pricing - VoteVerse</title>
      </Helmet>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className={`text-center space-y-8 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <div className="space-y-4">
            <Badge variant="primary" className="mb-4">
              💎 Transparent Pricing
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            <p
              className={`text-xl md:text-2xl max-w-3xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Start free and scale as your governance needs grow. All plans
              include core voting features.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card
                key={index}
                className={`p-8 relative ${
                  plan.popular ? "ring-2 ring-blue-500 scale-105" : ""
                }`}
                darkMode={darkMode}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant="primary" className="bg-blue-500 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} mb-4 mx-auto flex items-center justify-center`}
                  >
                    <IconComponent className="text-white" size={32} />
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span
                      className={`text-4xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        className={`text-lg ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <Check
                        size={20}
                        className="text-green-500 mt-0.5 flex-shrink-0"
                      />
                      <span
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div
                      key={limitIndex}
                      className="flex items-start space-x-3 opacity-60"
                    >
                      <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                      </div>
                      <span
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {limitation}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={plan.popular ? "gradient" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  {plan.name === "Comming Soon"
                    ? "Comming Soon"
                    : "Comming Soon"}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Features Comparison */}
      <div className={`py-16 ${darkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Compare Features
            </h2>
            <p
              className={`text-xl ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              See what's included in each plan
            </p>
          </div>

          <Card className="overflow-hidden" darkMode={darkMode}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className={`border-b ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <th
                      className={`text-left p-6 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Features
                    </th>
                    <th
                      className={`text-center p-6 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Community
                    </th>
                    <th
                      className={`text-center p-6 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Pro
                    </th>
                    <th
                      className={`text-center p-6 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Monthly Proposals", "5", "Unlimited", "Unlimited"],
                    ["Voting Mechanisms", "Basic", "Advanced", "Custom"],
                    ["Analytics", "Basic", "Advanced", "Custom"],
                    ["Support", "Community", "Priority", "Dedicated"],
                    ["API Access", "❌", "✅", "✅"],
                    ["Custom Branding", "❌", "✅", "✅"],
                    ["White Label", "❌", "❌", "✅"],
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <td
                        className={`p-6 font-medium ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {row[0]}
                      </td>
                      <td
                        className={`p-6 text-center ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {row[1]}
                      </td>
                      <td
                        className={`p-6 text-center ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {row[2]}
                      </td>
                      <td
                        className={`p-6 text-center ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {row[3]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className={`text-center mb-16 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing FAQ</h2>
          <p
            className={`text-xl ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Common questions about our pricing
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-lg p-6 ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3
                className={`font-semibold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {faq.question}
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="p-8 md:p-12 text-center" darkMode={darkMode}>
          <div
            className={`space-y-6 ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Join thousands of organizations using VoteVerse for their
              governance needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Button
                onClick={onConnectWallet}
                variant="gradient"
                size="lg"
                className="flex-1"
              >
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                Contact Sales
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
