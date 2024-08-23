import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import Providers from "./providers";
import Header from "@/components/header/header";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Wannabet Subnames",
  description: "Claim free subdomains of wannabet.eth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background">
        <Providers>
          <div className="px-4">
            <Header />

            {children}
            <Toaster richColors position="top-center" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
