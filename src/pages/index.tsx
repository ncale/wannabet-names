import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Wannabet Subnames</title>
        <meta
          content="Claim free subdomains of wannabet.eth"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        <ConnectButton />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
