import Header from "@/components/header/header";
import SearchSection from "@/components/sections/search";
import Head from "next/head";

export default function SearchPage() {
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

      <main className="max-w-lg space-y-8 mx-auto pt-24">
        <SearchSection />
      </main>

      <footer></footer>
    </div>
  );
}
