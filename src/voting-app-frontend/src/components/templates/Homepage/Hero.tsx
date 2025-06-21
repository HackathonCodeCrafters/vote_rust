import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Play, Vote } from "lucide-react";

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

export default function Hero({ darkMode, onConnectWallet }: HeroProps) {
  return (
    <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }} py={12}>
      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        gap={12}
        alignItems="center"
      >
        <Stack
          spacing={8}
          className={`space-y-8 ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          <div className="space-y-4">
            <Badge variant="primary" className="mb-4">
              🚀 Built on Internet Computer Protocol
            </Badge>
            <Heading
              as="h1"
              fontWeight="bold"
              className="text-4xl md:text-6xl bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              Decentralized Governance Made Simple
            </Heading>
            <Text
              className={`text-xl md:text-2xl max-w-2xl ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Shape the future through transparent, on-chain voting. Your voice
              matters in building the decentralized world on Internet Computer.
            </Text>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onConnectWallet}
              variant="gradient"
              size="lg"
              icon={Vote}
            >
              Start Voting Now
            </Button>
            <Button variant="outline" size="lg" icon={Play}>
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1">
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
        </Stack>

        <div className="relative">
          <div className="relative z-10">
            <img
              src="https://kzmih9v6f7dd687ylj5h.lite.vusercontent.net/placeholder.svg?height=600&width=800"
              alt="VoteChain Dashboard"
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-3xl"></div>
        </div>
      </Grid>
    </Box>
  );
}
