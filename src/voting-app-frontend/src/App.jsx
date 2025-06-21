"use client";

import { canisterId, idlFactory } from "declarations/voting-app-backend";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useRouter } from "./hooks/useRouter";
import { useVoting } from "./hooks/useVoting";
import MainLayout from "./layouts/MainLayouts";
import Dashboard from "./pages/Dashboard/HomePage";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/Pricing";

export default function App() {
  // Custom hooks
  const auth = useAuth();
  const router = useRouter();
  const voting = useVoting(auth.backend, auth.principal, auth.isAuthenticated);

  // Initialize actor when auth is ready
  useEffect(() => {
    if (auth.authClient && auth.isAuthenticated && !auth.backend) {
      console.log("Initializing actor...");
      auth.initActor(canisterId, idlFactory);
    }
  }, [auth.authClient, auth.isAuthenticated, auth.backend]);

  // Auto-redirect to dashboard after authentication
  useEffect(() => {
    if (auth.isAuthenticated && router.currentPage === "landing") {
      console.log("Authentication detected, redirecting to dashboard...");
      router.navigate("dashboard");
    }
  }, [auth.isAuthenticated, router.currentPage]);

  // Handle wallet connection
  const handleWalletConnect = () => {
    if (auth.showContinue) {
      auth.continueWithSession();
      // Initialize actor after continuing session
      setTimeout(() => {
        if (auth.authClient) {
          auth.initActor(canisterId, idlFactory);
        }
      }, 100);
    } else {
      auth.login().then(() => {
        // Initialize actor after login
        setTimeout(() => {
          if (auth.authClient) {
            auth.initActor(canisterId, idlFactory);
          }
        }, 100);
      });
    }
  };

  // Handle wallet disconnection
  const handleWalletDisconnect = () => {
    auth.logout();
    router.navigate("landing");
  };

  // Handle navigation
  const handleNavigation = (page) => {
    router.handleNavigation(page, auth.isAuthenticated);
  };

  // Handle create proposal
  const handleCreateProposal = () => {
    if (!auth.isAuthenticated) {
      alert(
        "Please connect your Internet Identity first to create a proposal!"
      );
      return;
    }
    console.log("Opening create proposal modal...");
  };

  // Render different pages based on current page
  const renderPage = () => {
    console.log(
      "Rendering page:",
      router.currentPage,
      "isAuthenticated:",
      auth.isAuthenticated
    );

    switch (router.currentPage) {
      case "pricing":
        return <PricingPage onConnectWallet={handleWalletConnect} />;

      case "dashboard":
        if (auth.isAuthenticated) {
          return (
            <Dashboard
              backend={auth.backend}
              principal={auth.principal}
              results={voting.results}
              voteFor={voting.voteFor}
              voteMsg={voting.voteMsg}
              refreshResults={voting.refreshResults}
              onCreateProposal={handleCreateProposal}
            />
          );
        } else {
          // Redirect to landing if not authenticated
          router.navigate("landing");
          return (
            <HomePage
              onConnectWallet={handleWalletConnect}
              showContinue={auth.showContinue}
              onContinueSession={auth.continueWithSession}
              tempPrincipal={auth.tempPrincipal}
              formatPrincipal={auth.formatPrincipal}
            />
          );
        }

      case "votes":
      case "proposals":
        return auth.isAuthenticated ? (
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
          <HomePage
            onConnectWallet={handleWalletConnect}
            showContinue={auth.showContinue}
            onContinueSession={auth.continueWithSession}
            tempPrincipal={auth.tempPrincipal}
            formatPrincipal={auth.formatPrincipal}
          />
        );

      case "about":
        return (
          <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8">About VoteChain</h1>
            <p className="text-lg text-gray-600">
              VoteChain is a decentralized governance platform built on Internet
              Computer Protocol...
            </p>
          </div>
        );

      default:
        return (
          <HomePage
            onConnectWallet={handleWalletConnect}
            showContinue={auth.showContinue}
            onContinueSession={auth.continueWithSession}
            tempPrincipal={auth.tempPrincipal}
            formatPrincipal={auth.formatPrincipal}
          />
        );
    }
  };

  return (
    <MainLayout
      isWalletConnected={auth.isAuthenticated}
      onWalletConnect={handleWalletConnect}
      onWalletDisconnect={handleWalletDisconnect}
      principal={auth.principal}
      currentPage={router.currentPage}
      onNavigate={handleNavigation}
    >
      {renderPage()}
    </MainLayout>
  );
}
