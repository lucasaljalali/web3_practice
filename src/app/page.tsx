"use client";
import { injected, useAccount, useConnect, useDisconnect } from "wagmi";
import { getButtonText } from "@/utils/getButtonText";
import { getButtonColor } from "@/utils/getButtonColor";
import BalanceList from "@/components/balanceList";
import WalletInfo from "@/components/walletInfo";

export default function Home() {
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
    } else {
      await connectAsync({ connector: injected() });
    }
  }

  return (
    <main>
      <WalletInfo walletAddress={address} chain={chain} attributes={attributes} handleWalletButtonClick={handleWalletButtonClick} />
      {chain && address && <BalanceList address={address} chainId={chain.id} />}
    </main>
  );
}
