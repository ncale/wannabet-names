import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { NameStoneUser } from "@/lib/namestone";

export default function UserAvatar({ user }: { user: NameStoneUser }) {
  return (
    <Avatar className="w-32 h-32">
      <AvatarImage
        src={user.text_records.avatar_url}
        alt={`${user.name} user avatar`}
      />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
}
