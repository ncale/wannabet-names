import { H1 } from "@/components/headings";
import Link from "next/link";

export default function InvalidNamePage() {
  return (
    <main className="max-w-xl mx-auto pt-24">
      <H1>Invalid name</H1>
      <Link href="/" className="text-blue-500 underline block">
        Return home?
      </Link>
    </main>
  );
}
