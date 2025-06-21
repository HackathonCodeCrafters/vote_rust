import EcosystemCard from "@/components/molecules/EcosystemCard";

interface EcosystemCardProps {
  darkMode?: boolean;
}

const ecosystemApps = [
  {
    title: "OpenChat",
    description:
      "Decentralized messaging platform for community discussions and governance coordination",
    image:
      "https://kzmih9v6f7dd687ylj5h.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    link: "https://oc.app",
    category: "Social",
  },
  {
    title: "NNS Dapp",
    description:
      "Network Nervous System interface for Internet Computer governance and neuron management",
    image:
      "https://kzmih9v6f7dd687ylj5h.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    link: "https://nns.ic0.app",
    category: "Governance",
  },
  {
    title: "ICPSwap",
    description:
      "Decentralized exchange built on Internet Computer for seamless token trading",
    image:
      "https://kzmih9v6f7dd687ylj5h.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    link: "https://icpswap.com",
    category: "DeFi",
  },
  {
    title: "Entrepot",
    description:
      "NFT marketplace and platform for digital collectibles on Internet Computer",
    image:
      "https://kzmih9v6f7dd687ylj5h.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    link: "https://entrepot.app",
    category: "NFT",
  },
  {
    title: "DSCVR",
    description:
      "Social media platform for Web3 communities and content creators",
    image:
      "https://kzmih9v6f7dd687ylj5h.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    link: "https://dscvr.one",
    category: "Social",
  },
  {
    title: "Sonic",
    description:
      "Gaming platform and metaverse built on Internet Computer Protocol",
    image:
      "https://kzmih9v6f7dd687ylj5h.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    link: "https://sonic.ooo",
    category: "Gaming",
  },
];

export default function Ecosystem({ darkMode = false }: EcosystemCardProps) {
  return (
    <div className={`py-16 ${darkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Internet Computer Ecosystem
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Discover amazing applications built on the same protocol powering
            VoteChain
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ecosystemApps.map((app, index) => (
            <EcosystemCard key={index} {...app} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </div>
  );
}
