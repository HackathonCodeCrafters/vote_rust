"use client";

import { canisterId, idlFactory } from "declarations/voting-app-backend";
import { useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { DarkModeProvider, useDarkMode } from "./context/DarkModeContext";
import AboutPage from "./features/About/pages/AboutPage.js";
import ActiveVote from "./features/ActiveVotes/pages/ActiveVote.js";
import ContactPage from "./features/Contact/ContactPage.js";
import Dashboard from "./features/Dashboard/pages/HomePage.js";
import CookiePolicyPage from "./features/Footer/pages/CookiePolicy.js";
import PrivacyPolicyPage from "./features/Footer/pages/PrivacyPolicy.js";
import SecurityPolicyPage from "./features/Footer/pages/SecurityPolicy.js";
import TermsOfServicePage from "./features/Footer/pages/Terms.js";
import HomePage from "./features/HomeLanding/pages/HomePage.tsx";
import PricingPage from "./features/Pricing/pages/Pricing.js";
import ProfilePage from "./features/Profile/pages/Profile.js";
import ProposalDetailPage from "./features/Proposal/components/ProposalDetailPage";
import { useAuth } from "./hooks/useAuth";
import { useVoting } from "./hooks/useVoting";
import MainLayout from "./layouts/MainLayouts";
import DarkModeScript from "./shared/components/DarkModeScript.js";

// Loading screen component
function LoadingScreen() {
  const { darkMode, isLoading } = useDarkMode();

  // Don't show loading screen if dark mode is still loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-900 dark:text-white">
            Loading VoteVerse...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className={`text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
          Loading VoteVerse...
        </p>
      </div>
    </div>
  );
}

// Main App Component
function AppWrapper() {
  return (
    <>
      <DarkModeScript />
      <DarkModeProvider>
        <Router>
          <App />
        </Router>
      </DarkModeProvider>
    </>
  );
}

function App() {
  const auth = useAuth();
  const voting = useVoting(auth.backend, auth.principal, auth.isAuthenticated);
  const navigate = useNavigate();
  const { darkMode, isLoading: darkModeLoading } = useDarkMode();

  useEffect(() => {
    if (auth.authClient && auth.isAuthenticated && !auth.backend) {
      auth.initActor(canisterId, idlFactory);
    }
  }, [auth.authClient, auth.isAuthenticated, auth.backend]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [auth.isAuthenticated]);

  const handleWalletConnect = () => {
    if (auth.showContinue) {
      auth.continueWithSession();
      setTimeout(() => {
        if (auth.authClient) auth.initActor(canisterId, idlFactory);
      }, 100);
    } else {
      auth.login().then(() => {
        setTimeout(() => {
          if (auth.authClient) auth.initActor(canisterId, idlFactory);
        }, 100);
      });
    }
  };

  const handleWalletDisconnect = () => {
    auth.logout();
    navigate("/");
  };

  const handleCreateProposal = () => {
    if (!auth.isAuthenticated) {
      alert(
        "Please connect your Internet Identity first to create a Proposal!"
      );
      return;
    }
    console.log("Opening create Proposal modal...");
  };

  // Show loading screen while auth or dark mode is loading
  if (auth.isLoading || darkModeLoading) return <LoadingScreen />;

  return (
    <MainLayout
      isWalletConnected={auth.isAuthenticated}
      onWalletConnect={handleWalletConnect}
      onWalletDisconnect={handleWalletDisconnect}
      principal={auth.principal}
      onNavigate={(page) => navigate(page)}
      currentPage={window.location.pathname}
    >
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onConnectWallet={handleWalletConnect}
              showContinue={auth.showContinue}
              onContinueSession={auth.continueWithSession}
              tempPrincipal={auth.tempPrincipal}
              formatPrincipal={auth.formatPrincipal}
            />
          }
        />

        <Route
          path="/pricing"
          element={<PricingPage onConnectWallet={handleWalletConnect} />}
        />

        <Route
          path="/dashboard"
          element={
            auth.isAuthenticated ? (
              <Dashboard
                backend={auth.backend}
                principal={auth.principal}
                results={voting.results}
                voteFor={voting.voteFor}
                voteMsg={voting.voteMsg}
                refreshResults={voting.refreshResults}
                onCreateProposal={handleCreateProposal}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/votes"
          element={auth.isAuthenticated ? <ActiveVote /> : <Navigate to="/" />}
        />

        <Route
          path="/proposals"
          element={
            auth.isAuthenticated ? (
              <Dashboard
                backend={auth.backend}
                principal={auth.principal}
                results={voting.results}
                voteFor={voting.voteFor}
                voteMsg={voting.voteMsg}
                refreshResults={voting.refreshResults}
                onCreateProposal={handleCreateProposal}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/proposal/:principal_id/:proposalName"
          element={
            auth.isAuthenticated ? (
              <ProposalDetailPage
                backend={auth.backend}
                principal={auth.principal}
                onVote={voting.voteFor}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/profile"
          element={auth.isAuthenticated ? <ProfilePage /> : <Navigate to="/" />}
        />

        <Route path="/about" element={<AboutPage />} />

        {/* Privacy Policy Route */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/security" element={<SecurityPolicyPage />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/contact-us" element={<ContactPage />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </MainLayout>
  );
}

export default AppWrapper;
