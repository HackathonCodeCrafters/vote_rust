import { Globe, Shield, TrendingUp, Users, Vote, Zap } from "lucide-react";
import CardItem from "../../molecules/Card";

interface DarkModeProps {
  darkMode?: boolean;
}

const features = [
  {
    title: "Decentralized Voting",
    description: "Participate in transparent, on-chain governance decisions",
    icon: Vote,
    gradient: "from-emerald-500 to-green-500",
  },
  {
    title: "Secure & Transparent",
    description:
      "All votes are recorded on blockchain for complete transparency",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Community Driven",
    description: "Shape the future of the protocol with your voice",
    icon: Users,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Real-time Results",
    description: "See voting results update in real-time as votes are cast",
    icon: TrendingUp,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Gas Optimized",
    description: "Efficient smart contracts minimize transaction costs",
    icon: Zap,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    title: "Cross-chain Support",
    description: "Vote across multiple blockchain networks seamlessly",
    icon: Globe,
    gradient: "from-indigo-500 to-purple-500",
  },
];

export default function Features({ darkMode = false }: DarkModeProps) {
  return (
    <div className="pt-16">
      <h2 className="text-3xl font-bold mb-12">Why Choose VoteChain?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <CardItem
              key={index}
              gradient={feature.gradient}
              icon={<IconComponent size={24} className="text-white" />}
              title={feature.title}
              description={feature.description}
              hover
              darkMode={darkMode}
            />
          );
        })}
      </div>
    </div>
  );
}
