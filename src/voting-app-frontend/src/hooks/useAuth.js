import { AuthClient } from "@dfinity/auth-client";

export async function initAuth() {
  const authClient = await AuthClient.create();

  if (!await authClient.isAuthenticated()) {
    await authClient.login({
      identityProvider: process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app"
        : "http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai",
      onSuccess: () => {
        console.log("✅ Login success");
      },
    });
  }

  return authClient;
}
