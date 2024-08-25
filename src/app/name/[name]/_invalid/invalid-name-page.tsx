import { H1 } from "@/components/headings";
import Link from "next/link";

export default function InvalidNamePage() {
  return (
    <main className="mx-auto max-w-xl pt-24">
      <H1>Invalid name</H1>
      <Link href="/" className="block text-blue-500 underline">
        Return home?
      </Link>
    </main>
  );
}
