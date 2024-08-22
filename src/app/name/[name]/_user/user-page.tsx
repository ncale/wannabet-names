import { type NameStoneUser } from "@/lib/namestone";
import { H1 } from "@/components/headings";
import { abbreviateHex } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function UserPage({ user }: { user: NameStoneUser }) {
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
}
