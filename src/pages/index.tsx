import type { NextPage } from "next";
import Head from "next/head";
import Header from "@/components/header/header";
import LandingSection from "@/components/sections/landing";

const Home: NextPage = () => {
  return (
    <div className="px-4">
      <Head>
        <title>Wannabet Subnames</title>
        <meta
          content="Claim free subdomains of wannabet.eth"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Header />

      <main className="pt-24">
        <LandingSection />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
