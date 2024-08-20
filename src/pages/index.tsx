import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "./_header/header";

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

      <main></main>

      <footer></footer>
    </div>
  );
};

export default Home;
