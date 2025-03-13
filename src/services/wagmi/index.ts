import { createConfig, http } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, sepolia, bsc, fantom } from "wagmi/chains";
import { injected /*walletConnect, coinbaseWallet*/ } from "wagmi/connectors";

// const projectId = process.env.NEXT_PUBLIC_METAMASK_PROJECT_ID;

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, polygon, optimism, arbitrum, bsc, fantom],
  connectors: [
    injected(),
    // walletConnect({ projectId: "" }), //TODO: project id
    // coinbaseWallet({ appName: "" }), //TODO: app name
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [bsc.id]: http(),
    [fantom.id]: http(),
  },
  ssr: true,
});
