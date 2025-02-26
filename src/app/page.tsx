"use client";
import { useMemo } from "react";
import { Config, injected, useAccount, useConnect, useDisconnect } from "wagmi";
import { ConnectMutateAsync, DisconnectMutate } from "wagmi/query";
import { sepolia } from "viem/chains";
import { OverridableStringUnion } from "@mui/types";
import { Typography } from "@mui/material";
import Button, { ButtonPropsColorOverrides } from "@mui/material/Button";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const { connectAsync, isError, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, isConnecting, address } = useAccount();

  const attributes = useMemo(
    () => ({
      buttonText: getButtonText(isConnected, isConnecting, isPending, isError),
      buttonColor: getButtonColor(isConnected, isError),
      loading: isConnecting || isPending,
      consoleErrorMsg: isConnected ? "Disconnection error" : "Connection error",
    }),
    [isConnected, isConnecting, isPending, isError]
  );

  async function handleWalletButtonClick() {
    if (attributes.loading) return;

    try {
      await handleWalletAction(isConnected, disconnect, connectAsync);
    } catch (error) {
      console.error(attributes.consoleErrorMsg, error);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image className={styles.logo} src="/MetaMask_Fox.png" alt="Metamask logo" width={180} height={180} priority />
        <Button
          variant="outlined"
          color={attributes.buttonColor}
          onClick={handleWalletButtonClick}
          loadingPosition="start"
          loading={attributes.loading}
        >
          {attributes.buttonText}
        </Button>
        <Typography>{address || ""}</Typography>
      </main>
    </div>
  );
}

function getButtonText(isConnected: boolean, isConnecting: boolean, isPending: boolean, isError: boolean) {
  if (isConnected) return "Disconnect Wallet";
  if (isPending) return "Waiting confirmation...";
  if (isConnecting) return "Connecting...";
  if (isError) return "Try Again!";
  return "Connect Wallet";
}

function getButtonColor(isConnected: boolean, isError: boolean) {
  return (isConnected ? "warning" : isError ? "error" : "primary") as OverridableStringUnion<
    "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
    ButtonPropsColorOverrides
  >;
}

async function handleWalletAction(
  isConnected: boolean,
  disconnect: DisconnectMutate<unknown>,
  connectAsync: ConnectMutateAsync<Config, unknown>
) {
  if (isConnected) {
    disconnect();
  } else {
    await connectAsync({ chainId: sepolia.id, connector: injected() });
  }
}
