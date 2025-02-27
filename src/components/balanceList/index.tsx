import { useEvmWalletTokenBalances } from "@moralisweb3/next";
import { Typography } from "@mui/material";
import Image from "next/image";
import styles from "./index.module.css";

interface IBalanceList {
  chainId: string | number;
  address: string;
}

export default function BalanceList({ chainId, address }: IBalanceList) {
  const { data: walletBalances } = useEvmWalletTokenBalances({ chain: `0x${chainId.toString(16)}`, address });
  const tokensList = walletBalances?.filter((item) => !item.token?.possibleSpam) || [];

  return (
    <div className={styles.balanceList}>
      {tokensList.map((item) => (
        <div key={item.token?.contractAddress.lowercase} className={styles.balanceListItem}>
          <div className={styles.tokenContainer}>
            <Image
              className={styles.logo}
              src={item.token?.logo || "/MetaMask_Fox.png"}
              alt={`${item.token?.name} logo`}
              width={40}
              height={40}
              priority
            />

            <Typography variant="body1" title={item.token?.name || ""}>
              {item.token?.symbol || ""}
            </Typography>
          </div>

          <div className={styles.valueContainer}>
            <Typography variant="body2" className={styles.valueItem}>
              {`${item.value?.slice(0, 7) || ""} ${item.token?.symbol || ""}`}
            </Typography>

            <Typography variant="body2" className={styles.valueItem}>
              {`${item.value?.slice(0, 7) || ""} ${item.token?.symbol || ""}`}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
}
