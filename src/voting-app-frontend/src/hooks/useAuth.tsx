"use client";

import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { useEffect, useState } from "react";

interface UseAuthReturn {
  // Auth states
  authClient: any;
  backend: any;
  principal: string;
  isAuthenticated: boolean;
  showContinue: boolean;
  tempPrincipal: string;

  // Auth methods
  login: () => Promise<void>;
  logout: () => Promise<void>;
  continueWithSession: () => void;
  initActor: (canisterId: string, idlFactory: any) => void;

  // Utility methods
  formatPrincipal: (principalText: string) => string;
}

export function useAuth(): UseAuthReturn {
  const [authClient, setAuthClient] = useState<any>(null);
  const [backend, setBackend] = useState<any>(null);
  const [principal, setPrincipal] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [tempPrincipal, setTempPrincipal] = useState("");

  // Initialize Auth Client
  useEffect(() => {
    const initAuth = async () => {
      try {
        const client = await AuthClient.create();
        setAuthClient(client);

        const isAuth = await client.isAuthenticated();
        if (isAuth) {
          const p = client.getIdentity().getPrincipal().toText();
          setTempPrincipal(p);
          setShowContinue(true);
        }
      } catch (error) {
        console.error("Failed to initialize auth client:", error);
      }
    };

    initAuth();
  }, []);

  // Initialize Actor - now accepts canisterId and idlFactory as parameters
  const initActor = (canisterId: string, idlFactory: any) => {
    if (!authClient) {
      console.error("Auth client not available");
      return;
    }

    try {
      const identity = authClient.getIdentity();
      const agent = new HttpAgent({ identity });

      if (import.meta.env.VITE_DFX_NETWORK === "local") {
        agent.fetchRootKey();
      }

      const actor = Actor.createActor(idlFactory, { agent, canisterId });
      console.log("Actor created:", actor);
      setBackend(actor);
    } catch (error) {
      console.error("Failed to initialize actor:", error);
    }
  };

  // Continue with existing session
  const continueWithSession = () => {
    if (!authClient || !tempPrincipal) return;

    setPrincipal(tempPrincipal);
    setIsAuthenticated(true);
    setShowContinue(false);
    setTempPrincipal("");

    console.log("Session continued successfully");
  };

  // Login function
  const login = async () => {
    if (!authClient) {
      console.error("Auth client not initialized");
      return;
    }

    try {
      await authClient.login({
        identityProvider: "http://vt46d-j7777-77774-qaagq-cai.localhost:4943",
        onSuccess: async () => {
          const p = authClient.getIdentity().getPrincipal().toText();
          setPrincipal(p);
          setIsAuthenticated(true);
          setShowContinue(false);
          setTempPrincipal("");

          console.log("Login successful:", p);
        },
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Logout function
  const logout = async () => {
    if (!authClient) return;

    try {
      await authClient.logout();
      setIsAuthenticated(false);
      setPrincipal("");
      setShowContinue(false);
      setTempPrincipal("");
      setBackend(null);

      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Format principal for display
  const formatPrincipal = (principalText: string): string => {
    if (!principalText) return "";
    if (principalText.length <= 10) return principalText;
    return `${principalText.slice(0, 6)}...${principalText.slice(-4)}`;
  };

  return {
    // States
    authClient,
    backend,
    principal,
    isAuthenticated,
    showContinue,
    tempPrincipal,

    // Methods
    login,
    logout,
    continueWithSession,
    initActor,
    formatPrincipal,
  };
}
