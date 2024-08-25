import { type NameStoneUser, nameStoneService } from "@/lib/namestone";
import { subnameSchema } from "@/lib/types/subname";
import InvalidNamePage from "./_invalid/invalid-name-page";
import ClaimNamePage from "./_claim/claim-name-page";
import UserPage from "./_user/user-page";

// export async function generateStaticParams() {
//   // Empty array means static pages will be generated on first visit
//   return [];
// }

async function getNameStoneUser(name: string): Promise<NameStoneUser | undefined> {
  try {
    return await nameStoneService.searchName(name);
  } catch (error) {
    return;
  }
}

export default async function NamePage({ params }: { params: { name: string } }) {
  const parsed = subnameSchema.safeParse(params.name);
  if (parsed.success === false) {
    return <InvalidNamePage />;
  }

  const user = await getNameStoneUser(params.name);

  if (!!user) {
    return <UserPage user={user} />;
  } else {
    return <ClaimNamePage name={params.name} />;
  }
}
