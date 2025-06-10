import { AuthClient } from "@dfinity/auth-client";
import { useState, useEffect } from "react";

export default function App() {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState("");
  const [showAutoLogin, setShowAutoLogin] = useState(false);
  const [tempPrincipal, setTempPrincipal] = useState("");

  useEffect(() => {
    AuthClient.create().then(async (client) => {
      setAuthClient(client);
      const authenticated = await client.isAuthenticated();
      if (authenticated) {
        setShowAutoLogin(true);
        setTempPrincipal(client.getIdentity().getPrincipal().toText());
      }
    });
  }, []);

  const continueWithSession = () => {
    setIsAuthenticated(true);
    setPrincipal(tempPrincipal);
  };

  const login = async () => {
    await authClient.login({
      identityProvider: "http://v27v7-7x777-77774-qaaha-cai.localhost:4943",
      onSuccess: () => {
        setIsAuthenticated(true);
        setPrincipal(authClient.getIdentity().getPrincipal().toText());
      },
    });
  };

  const logout = () => {
    authClient.logout();
    setIsAuthenticated(false);
    setPrincipal("");
    setShowAutoLogin(false);
    setTempPrincipal("");
  };

  return (
    <div>
      <h1>🔐 ICP Login Demo</h1>

      {isAuthenticated ? (
        <>
          <p>✅ Logged in as: {principal}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : showAutoLogin ? (
        <button onClick={continueWithSession}>
          Continue as {tempPrincipal}
        </button>
      ) : (
        <button onClick={login}>Login with Internet Identity</button>
      )}
    </div>
  );
}
