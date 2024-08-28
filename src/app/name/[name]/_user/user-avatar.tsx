import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { NameStoneUser } from "@/lib/namestone";

export default function UserAvatar({
  user,
  urlOverride,
}: {
  user: NameStoneUser;
  urlOverride?: string;
}) {
  return (
    <Avatar className="h-32 w-32 shadow-xl">
      <AvatarImage src={urlOverride || user.text_records.avatar} alt={`${user.name} user avatar`} />
      <AvatarFallback className="text-center text-3xl text-muted-foreground">
        {user.name.slice(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
}
