import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <Link href="/" className="block text-2xl font-bold">
        wannabet 🤝
      </Link>
      <ConnectButton showBalance={false} />
    </header>
  );
}
