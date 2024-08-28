"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NameStoneUser } from "@/lib/namestone";
import Link from "next/link";
// import { ChevronDown } from "lucide-react";

export default function ProfileDropdown({
  openAccountModal,
  backupName,
  namestoneRecord,
}: {
  openAccountModal: () => void;
  backupName: string;
  namestoneRecord?: NameStoneUser;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="profile"
          className="flex min-w-28 items-center justify-start gap-x-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={namestoneRecord?.text_records.avatar} />
            <AvatarFallback>
              {namestoneRecord?.name.slice(0, 2) || backupName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>{namestoneRecord ? namestoneRecord.name : backupName}</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl *:rounded-xl">
        <DropdownMenuItem asChild disabled={!namestoneRecord}>
          <Link href={`/name/${namestoneRecord?.name}`} className="p-2 font-semibold">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openAccountModal} className="p-2 font-semibold">
          Wallet
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
