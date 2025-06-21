import Faq from "@/components/templates/Homepage/Faq";
import Hero from "@/components/templates/Homepage/Hero";
import NewsLetter from "@/components/templates/Homepage/NewsLetter";
import { Helmet } from "react-helmet";
import Ecosystem from "../components/templates/Homepage/Ecosystem";
import Features from "../components/templates/Homepage/Features";
import GettingStarted from "../components/templates/Homepage/GettingStarted";

interface HomePageProps {
  darkMode?: boolean;
  onConnectWallet: () => void;
}

export default function HomePage({ darkMode, onConnectWallet }: HomePageProps) {
  return (
    <>
      <Helmet>
        <title>Homepage - VoteVerse</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <Hero darkMode={darkMode ?? false} onConnectWallet={onConnectWallet} />
        <div
          className={`text-center space-y-8 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <Features darkMode={darkMode ?? false} />
          <Ecosystem darkMode={darkMode ?? false} />
          <GettingStarted darkMode={darkMode ?? false} />
          <Faq darkMode={darkMode ?? false} />
          <NewsLetter darkMode={darkMode ?? false} />
          {/* <Stats /> */}
          {/* <StepByStep /> */}
        </div>
      </div>
    </>
  );
}
