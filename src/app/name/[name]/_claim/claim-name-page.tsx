import { H1 } from "@/components/ui/headings";

import dynamic from "next/dynamic";
const ClaimButton = dynamic(() => import("./claim-button"), { ssr: false });

/**
 * This page is displayed when no user has been found
 * and it assumes schema validation has already been performed
 * on the name.
 */

export default function ClaimNamePage({ name }: { name: string }) {
  return (
    <>
      <section className="flex flex-col items-center space-y-2">
        <H1 className="">{name}.wannabet.eth</H1>
        <p className="pb-10">This name is available!</p>
        <div className="flex flex-col items-center">
          <ClaimButton name={name} />
        </div>
      </section>
    </>
  );
}
