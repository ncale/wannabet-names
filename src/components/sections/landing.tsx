import Link from "next/link";
import { Button } from "../ui/button";

export default function LandingSection() {
  return (
    <section className="bg-white dark:bg-gray-900 max-w-screen-lg mx-auto py-8 px-4 text-center lg:py-16 lg:px-12">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Claim free subdomains of{" "}
        <span className="text-primary">wannabet.eth</span>
      </h1>
      <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Yep. Free. Just connect your wallet and claim.
      </p>
      <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <Button
          asChild
          size="lg"
          variant="default"
          className="mt-8 font-bold text-base rounded-xl"
        >
          <Link href="/search">
            Get started
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Link>
        </Button>
      </div>
    </section>
  );
}
