"use client";

import { Globe, Shield, TrendingUp, Users, Vote, Zap } from "lucide-react";
import {
  cubicBezier,
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import CardItem from "../../../shared/components/CardSections";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -100]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: cubicBezier(0.42, 0, 0.58, 1),
      },
    },
  };

  return (
    <motion.div className="pt-16" ref={ref} style={{ y }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h2
          className={`text-3xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Why Choose VoteVerse?
        </h2>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100px" } : { width: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto mt-4 rounded-full"
        />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <motion.div key={index} variants={itemVariants}>
              <CardItem
                gradient={feature.gradient}
                icon={<IconComponent size={24} className="text-white" />}
                title={feature.title}
                description={feature.description}
                hover
                darkMode={darkMode}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
