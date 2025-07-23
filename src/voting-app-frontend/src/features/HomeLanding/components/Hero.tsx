"use client";

import VoteVerse from "@/assets/img/logo_vote_verse.png";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Play, Vote } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface HeroProps {
  darkMode: boolean;
  onConnectWallet: () => void;
}

const stats = [
  { label: "Total Proposals", value: "127+" },
  { label: "Active Voters", value: "3.4K+" },
  { label: "Networks Supported", value: "4+" },
  { label: "Total Votes Cast", value: "15K+" },
];

const TypingText = ({
  text,
  darkMode,
}: {
  text: string;
  darkMode: boolean;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 80;
    const pauseTime = isDeleting ? 500 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      } else if (!isDeleting && currentIndex === text.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayedText.length > 0) {
        setDisplayedText((prev) => prev.slice(0, -1));
      } else if (isDeleting && displayedText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex(0);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, isDeleting, displayedText]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Heading
        as="h1"
        fontWeight="bold"
        className="text-4xl md:text-6xl bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        style={{
          minHeight: "1.2em",
          height: "11rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span>
          {displayedText}
          <motion.span
            animate={{ opacity: showCursor ? 1 : 0 }}
            transition={{ duration: 0.1 }}
            className={`${darkMode ? "text-white" : "text-gray-900"}`}
          >
            |
          </motion.span>
        </span>
      </Heading>
    </motion.div>
  );
};

export default function Hero({ darkMode, onConnectWallet }: HeroProps) {
  return (
    <Box maxW="7xl" mx="auto" px={{ base: 0 }} py={12}>
      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        gap={12}
        alignItems="center"
      >
        <Box order={{ base: 0, lg: 1 }}>
          <div className="relative">
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
                y: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0.5,
                },
              }}
            >
              <img
                src={VoteVerse || "/placeholder.svg"}
                alt="VoteVerse Dashboard"
                className="w-full rounded-2xl"
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </Box>

        <Stack
          order={{ base: 1, lg: 0 }}
          className={`space-y-8 ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="primary" className="mb-4">
                🚀 Built on Internet Computer Protocol
              </Badge>
            </motion.div>

            <TypingText
              text="Decentralized Governance Made Simple"
              darkMode={darkMode}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Text
                className={`text-xl md:text-2xl max-w-2xl ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Shape the future through transparent, on-chain voting. Your
                voice matters in building the decentralized world on Internet
                Computer.
              </Text>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onConnectWallet}
                variant="gradient"
                size="lg"
                icon={Vote}
              >
                Start Voting Now
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="https://drive.google.com/file/d/17j80rbNLFnHqLaCw9jWGp9gPvLcP0NbU/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" icon={Play}>
                  Watch Demo
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="text-2xl md:text-3xl font-bold mb-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: 1.8 + index * 0.1,
                  }}
                >
                  {stat.value}
                </motion.div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Stack>
      </Grid>
    </Box>
  );
}
