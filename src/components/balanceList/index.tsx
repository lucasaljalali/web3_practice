import { Typography, CircularProgress, Alert } from "@mui/material";
import { Token } from "@/app/api/theGraph/interfaces";
import Image from "next/image";
import styles from "./index.module.css";

interface IBalanceList {
  tokens: Token[];
  loading: boolean;
  error: string | null;
}

export default function BalanceList({ tokens, loading, error }: IBalanceList) {
  if (loading) {
    return (
      <div className={styles.balanceList}>
        <CircularProgress />
        <Typography>Loading tokens...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.balanceList}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  if (!tokens.length) {
    return (
      <div className={styles.balanceList}>
        <Typography>No tokens found.</Typography>
      </div>
    );
  }

  return (
    <div className={styles.balanceList}>
      {tokens.map((token) => (
        <div key={token.id} className={styles.balanceListItem}>
          <div className={styles.tokenContainer}>
            <Image className={styles.logo} src="/MetaMask_Fox.png" alt={`${token.name} logo`} width={40} height={40} priority />
            <Typography variant="body1" title={token.name}>
              {token.symbol}
            </Typography>
          </div>

          <div className={styles.valueContainer}>
            <Typography variant="body2">{`${token.derivedETH} ETH`}</Typography>
          </div>
        </div>
      ))}
    </div>
  );
}
