"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Button } from "./ui/button";

export default function ConnectButton() {
  const { openConnectModal } = useConnectModal();
  return <Button onClick={openConnectModal}>Connect</Button>;
}
