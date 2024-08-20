import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  return (
    <header className="flex items-center max-w-screen-lg mx-auto justify-between py-6">
      <a className="block text-2xl font-bold">wannabet 🤝</a>
      <ConnectButton />
    </header>
  );
}
