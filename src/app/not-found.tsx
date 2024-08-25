import { H1 } from "@/components/headings";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-xl w-full self-center space-y-2">
      <H1>Page wasn&apos;t found</H1>
      <p>Could not find requested resource</p>
      <Link href="/" className="text-blue-500 underline block">
        Return Home
      </Link>
    </main>
  );
}
