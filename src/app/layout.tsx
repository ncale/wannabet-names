import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";

import Providers from "./providers";
import { Toaster } from "sonner";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Wannabet Subnames",
  description: "Claim free subdomains of wannabet.eth",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background">
        <Providers>
          <div className="relative mx-auto flex min-h-screen max-w-screen-lg flex-col space-y-16 px-4 md:space-y-24">
            <Header />

            {children}

            <Footer />
            <Toaster richColors position="top-center" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
