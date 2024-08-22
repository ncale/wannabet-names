import { H1 } from "@/components/headings";
import { type NameStoneUser, nameStoneService } from "@/lib/namestone";
import { subnameSchema } from "@/lib/types/subname";
import Link from "next/link";
import ClaimButton from "./claim-button";
import { abbreviateHex } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
      <main className="max-w-xl flex flex-col items-center space-y-2 mx-auto pt-24">
        <Avatar className="w-32 h-32">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <H1 className="">{user.name}.wannabet.eth</H1>
        <p className="">Owner: {abbreviateHex(user.address, 4)}</p>
        <div className="w-full max-w-md pt-6 space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea placeholder="Text here" id="bio"></Textarea>
        </div>
      </main>
    );
  } else {
    return (
      <main className="max-w-xl flex flex-col items-center mx-auto pt-24 space-y-2">
        <H1 className="">{params.name}.wannabet.eth</H1>
        <p className="pb-10">This name is available!</p>
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
