"use client";
import { useEffect, useState } from "react";
import { injected, useAccount, useConnect, useDisconnect } from "wagmi";
import { getButtonText } from "@/utils/getButtonText";
import { getButtonColor } from "@/utils/getButtonColor";
import { Token } from "@/app/api/theGraph/interfaces";
import { getWalletTokens } from "@/services/moralis/getWalletTokens";
import WalletInfo from "@/components/walletInfo";
import BalanceList from "@/components/balanceList";

export default function Home() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { connectAsync, isError, isPending } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected, isConnecting, address, chain } = useAccount();

  const attributes = {
    buttonText: getButtonText(isConnected, isConnecting, isPending, isError),
    buttonColor: getButtonColor(isConnected, isError),
    loading: isConnecting || isPending,
    consoleErrorMsg: isConnected ? "Disconnection error" : "Connection error",
  };

  async function handleWalletButtonClick() {
    if (isConnected) {
      await disconnectAsync();
      setTokens([]);
    } else {
      await connectAsync({ connector: injected() });
    }
  }

  async function fetchTokens() {
    if (!address || !chain) return;

    setLoading(true);
    setError(null);

    try {
      const walletTokens = await getWalletTokens(`0x${chain.id}`, address);
      setTokens(walletTokens);
    } catch (err) {
      setError("Failed to fetch tokens");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTokens();
  }, [address]);

  return (
    <main>
      <WalletInfo walletAddress={address} chain={chain} attributes={attributes} handleWalletButtonClick={handleWalletButtonClick} />
      {address && <BalanceList tokens={tokens} loading={loading} error={error} />}
    </main>
  );
}
