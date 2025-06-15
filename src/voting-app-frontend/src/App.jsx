import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, idlFactory } from "declarations/voting-app-backend";
import { useEffect, useState } from "react";
import Layout from "./components/layout/mainLayout";

export default function App() {
  const [authClient, setAuthClient] = useState(null);
  const [backend, setBackend] = useState(null);
  const [principal, setPrincipal] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [tempPrincipal, setTempPrincipal] = useState("");

  // Inisialisasi Auth & Actor
  useEffect(() => {
    AuthClient.create().then(async (client) => {
      setAuthClient(client);
      const auth = await client.isAuthenticated();
      if (auth) {
        const p = client.getIdentity().getPrincipal().toText();
        setTempPrincipal(p);
        setShowContinue(true);
      }
    });
  }, []);

  const initActor = (identity) => {
    const agent = new HttpAgent({ identity });
    if (process.env.DFX_NETWORK === "local") agent.fetchRootKey();
    const actor = Actor.createActor(idlFactory, { agent, canisterId });
    console.log("Actor created:", actor);
    setBackend(actor);
  };

  useEffect(() => {
    if (isAuthenticated && backend) {
      console.log("refreshResults triggered");
      refreshResults();
    }
  }, [isAuthenticated, backend]);

  const continueWithSession = () => {
    setPrincipal(tempPrincipal);
    setIsAuthenticated(true);
    initActor(authClient.getIdentity());
  };

  // const login = async () => {
  //   await authClient.login({
  //     identityProvider:
  //       "http://v27v7-7x777-77774-qaaha-cai.localhost:4943",
  //     onSuccess: () => {
  //       const p = authClient.getIdentity().getPrincipal().toText();
  //       setPrincipal(p);
  //       setIsAuthenticated(true);
  //       initActor(authClient.getIdentity());
  //     },
  //   });
  // };

  const login = async () => {
    await authClient.login({
      identityProvider: "http://vt46d-j7777-77774-qaagq-cai.localhost:4943",
      onSuccess: async () => {
        const p = authClient.getIdentity().getPrincipal().toText();
        setPrincipal(p);
        setIsAuthenticated(true);
        initActor(authClient.getIdentity());
      },
    });
  };

  const logout = async () => {
    await authClient.logout();
    setIsAuthenticated(false);
    setPrincipal("");
    setShowContinue(false);
    setTempPrincipal("");
    setBackend(null);
  };

  const [results, setResults] = useState([]);
  const [voteMsg, setVoteMsg] = useState("");

  const refreshResults = async () => {
    if (backend) {
      const res = await backend.get_results();
      console.log("RAW result from backend:", res);
      if (res.length > 0) {
        console.log("First item keys:", Object.keys(res[0]));
      }
      setResults(res);
    }
  };

  const voteFor = async (name) => {
    if (!isAuthenticated) return alert("Login dulu!");
    await backend.add_candidate("bawang goreng");
    await backend.add_candidate("bawang putih");

    const msg = await backend.vote(name, principal);
    setVoteMsg(msg);
    refreshResults();
  };

  useEffect(() => {
    if (isAuthenticated && backend) refreshResults();
  }, [isAuthenticated, backend]);

  console.log("results", results);

  return (
    <>
      <Layout />
    </>
    // <div>
    //   <h1>🗳️ Voting App + ICP Login</h1>

    //   {isAuthenticated ? (
    //     <>
    //       <p>🔐 Logged in as: {principal}</p>
    //       <button onClick={logout}>Logout</button>
    //     </>
    //   ) : showContinue ? (
    //     <button onClick={continueWithSession}>
    //       Continue as {tempPrincipal}
    //     </button>
    //   ) : (
    //     <button onClick={login}>Login with Internet Identity</button>
    //   )}

    //   <hr />

    //   <ul>
    //     {results.map((c) => (
    //       <li key={c.name}>
    //         {c.name}: {c.votes} votes{" "}
    //         <button onClick={() => voteFor(c.name)}>Vote</button>
    //       </li>
    //     ))}
    //   </ul>

    //   {voteMsg && <p>{voteMsg}</p>}
    // </div>
  );
}
