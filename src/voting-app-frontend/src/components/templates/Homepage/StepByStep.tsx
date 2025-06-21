interface DarkModeProps {
  darkMode?: boolean;
}

const works = [
  {
    step: "01",
    title: "Connect Wallet",
    description: "Connect your Web3 wallet to access the governance platform",
  },
  {
    step: "02",
    title: "Browse Proposals",
    description: "Explore active proposals and read detailed descriptions",
  },
  {
    step: "03",
    title: "Cast Your Vote",
    description: "Vote on proposals that matter to you and the community",
  },
];

export default function StepByStep({ darkMode = false }: DarkModeProps) {
  return (
    <div className="pt-16">
      <h2 className="text-3xl font-bold mb-12">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {works.map((step, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
              {step.step}
            </div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
