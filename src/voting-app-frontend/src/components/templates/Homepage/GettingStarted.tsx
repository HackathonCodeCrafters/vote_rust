import Card from "@/components/atoms/Card";
import { CheckCircle, Shield, Users, Vote } from "lucide-react";

interface GettingStartedStep {
  darkMode?: boolean;
}

const gettingStartedSteps = [
  {
    step: "01",
    title: "Create Internet Identity",
    description: "Set up your secure, anonymous identity on Internet Computer",
    icon: Shield,
  },
  {
    step: "02",
    title: "Connect to VoteChain",
    description:
      "Link your Internet Identity to access the governance platform",
    icon: Vote,
  },
  {
    step: "03",
    title: "Explore Proposals",
    description: "Browse active proposals and join community discussions",
    icon: Users,
  },
  {
    step: "04",
    title: "Cast Your Vote",
    description: "Make your voice heard by voting on proposals that matter",
    icon: CheckCircle,
  },
];

export default function GettingStarted({
  darkMode = false,
}: GettingStartedStep) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div
        className={`text-center mb-16 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Getting Started</h2>
        <p
          className={`text-xl max-w-3xl mx-auto ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Join the governance revolution in four simple steps
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {gettingStartedSteps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <Card
              key={index}
              className="p-6 text-center"
              hover
              darkMode={darkMode}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                {step.step}
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 mb-4 mx-auto flex items-center justify-center">
                <IconComponent className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                {step.description}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
