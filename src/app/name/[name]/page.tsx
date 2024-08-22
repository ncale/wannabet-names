import { H1 } from "@/components/headings";
import { Button } from "@/components/ui/button";
import { type NameStoneUser, nameStoneService } from "@/lib/namestone";
import { subnameSchema } from "@/lib/types/subname";
import Link from "next/link";
import ClaimButton from "./claim-button";

export async function generateStaticParams() {
  // Empty array means static pages will be generated on first visit
  return [];
}

async function getNameStoneUser(
  name: string
): Promise<NameStoneUser | undefined> {
  try {
    return await nameStoneService.searchName(name);
  } catch (error) {
    return;
  }
}

export default async function NamePage({
  params,
}: {
  params: { name: string };
}) {
  const parsed = subnameSchema.safeParse(params.name);
  if (parsed.success === false) {
    return <InvalidNamePage />;
  }

  const user = await getNameStoneUser(params.name);

  if (!!user) {
    return (
      <main className="max-w-xl mx-auto pt-24">
        <H1 className="text-center">{user.name}.wannabet.eth</H1>
        <p className="text-center">Owner: {user.address}</p>
      </main>
    );
  } else {
    return (
      <main className="max-w-xl flex flex-col items-center mx-auto pt-24 space-y-2">
        <H1 className="text-center">{params.name}.wannabet.eth</H1>
        <p className="text-center pb-10">This name is available!</p>
        <div className="flex flex-col items-center">
          <ClaimButton name={params.name} />
        </div>
      </main>
    );
  }
}

function InvalidNamePage() {
  return (
    <main className="max-w-xl mx-auto pt-24">
      <H1>Invalid name</H1>
      <Link href="/" className="text-blue-500 underline block">
        Return home?
      </Link>
    </main>
  );
}
