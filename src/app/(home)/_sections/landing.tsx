import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingSection() {
  return (
    <section className="px-4 py-8 text-center lg:px-12 lg:py-16">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-foreground md:text-5xl lg:text-6xl">
        Claim free subdomains of <span className="text-primary">wannabet.eth</span>
      </h1>
      <p className="mb-8 text-lg font-normal text-muted-foreground sm:px-16 lg:text-xl xl:px-48">
        Yep. Free. Just connect your wallet and claim.
      </p>
      <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16">
        <Button asChild size="lg" variant="default" className="mt-8">
          <Link href="/search">
            Get started
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </Button>
      </div>
    </section>
  );
}
