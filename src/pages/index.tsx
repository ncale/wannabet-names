import type { NextPage } from "next";
import Head from "next/head";
import Header from "@/components/header/header";
import ViewSubnameSection from "@/components/sections/view-subname";
import SetSubnameSection from "@/components/sections/set-subname";

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

      <main className="max-w-lg space-y-12 mx-auto pt-24">
        <ViewSubnameSection />
        <SetSubnameSection />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
