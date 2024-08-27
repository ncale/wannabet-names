import { H1 } from "@/components/ui/headings";
import Link from "next/link";

export default function InvalidNamePage() {
  return (
    <>
      <H1>Invalid name</H1>
      <Link href="/" className="block text-blue-500 underline">
        Return home?
      </Link>
    </>
  );
}
