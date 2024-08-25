import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";
import { env } from "./env";

export const config = getDefaultConfig({
  appName: "Wannabet Names",
  projectId: env.NEXT_PUBLIC_WC_APP_ID,
  chains: [mainnet, ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : [])],
  ssr: true,
});
