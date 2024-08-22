import { H1 } from "@/components/headings";
import ClaimButton from "./claim-button";

/**
 * This page is displayed when no user has been found
 * and it assumes schema validation has already been performed
 * on the name.
 */

export default function ClaimNamePage({ name }: { name: string }) {
  return (
    <main className="max-w-xl flex flex-col items-center mx-auto pt-24 space-y-2">
      <H1 className="">{name}.wannabet.eth</H1>
      <p className="pb-10">This name is available!</p>
      <div className="flex flex-col items-center">
        <ClaimButton name={name} />
      </div>
    </main>
  );
}
