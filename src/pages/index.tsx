import type { NextPage } from "next";
import Head from "next/head";
import Header from "@/components/header/header";
import SetSubnameForm from "@/components/subnames/set-subname-form";

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

      <Header />

      <main className="max-w-lg mx-auto pt-24">
        <SetSubnameForm />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
