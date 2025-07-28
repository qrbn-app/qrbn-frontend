'use client';

import React from "react";
import { Config, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XellarKitProvider, defaultConfig, darkTheme } from "@xellar/kit";
import { polygonAmoy } from "viem/chains";

// Note: Replace with your actual WalletConnect project ID
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "YOUR_WALLET_CONNECT_PROJECT_ID";
const xellarAppId = "fa0c9416-cbee-4ebc-bda7-03d146734f77";

const config = defaultConfig({
  appName: "QRBN App",
  walletConnectProjectId,
  xellarAppId,
  xellarEnv: "sandbox",
  chains: [polygonAmoy],
}) as Config;

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider theme={darkTheme}>
          {children}
        </XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
