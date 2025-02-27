import { http, createConfig } from "wagmi";
import { mainnet, polygon, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_METAMASK_PROJECT_ID;

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, polygon],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(`https://mainnet.infura.io/v3/${projectId}`),
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${projectId}`),
    [polygon.id]: http("https://polygon-rpc.com"),
  },
  ssr: true,
});
