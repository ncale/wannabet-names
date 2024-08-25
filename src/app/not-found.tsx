import { H1 } from "@/components/headings";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full max-w-xl space-y-2 self-center">
      <H1>Page wasn&apos;t found</H1>
      <p>Could not find requested resource</p>
      <Link href="/" className="block text-blue-500 underline">
        Return Home
      </Link>
    </main>
  );
}
