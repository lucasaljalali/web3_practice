import { useBalance } from "wagmi";
import { Typography } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import { Chain } from "viem";
import Button, { ButtonPropsColorOverrides } from "@mui/material/Button";
import Image from "next/image";
import styles from "./index.module.css";

interface IBalanceList {
  chain?: Chain;
  walletAddress?: `0x${string}`;
  attributes: {
    buttonText: string;
    buttonColor: OverridableStringUnion<
      "error" | "warning" | "primary" | "inherit" | "secondary" | "success" | "info",
      ButtonPropsColorOverrides
    >;
    loading: boolean;
    consoleErrorMsg: string;
  };
  handleWalletButtonClick: () => Promise<void>;
}

export default function WalletInfo({ chain, walletAddress, attributes, handleWalletButtonClick }: IBalanceList) {
  const { data } = useBalance({ address: walletAddress, chainId: chain?.id });

  function formatValue(value?: BigInt, decimals?: number) {
    if (!value || !decimals) return 0;
    return (Number(value) / 10 ** decimals).toString().slice(0, 7);
  }

  return (
    <div className={styles.walletInfo}>
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

      {chain && walletAddress && (
        <>
          <Typography variant="body1">{`${data?.symbol || chain?.name}: ${formatValue(data?.value, data?.decimals)}`}</Typography>

          <Typography variant="body2">{walletAddress || ""}</Typography>

          <Typography>Current Network: {chain?.name}</Typography>
        </>
      )}
    </div>
  );
}
