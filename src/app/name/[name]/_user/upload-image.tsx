"use client";

import { CldUploadWidget } from "next-cloudinary";
import UserAvatar from "./user-avatar";
import { NameStoneUser } from "@/lib/namestone";
import { cn } from "@/lib/utils";

export default function UploadImageButton({
  user,
  setUrl,
  disabled,
  urlOverride,
}: {
  user: NameStoneUser;
  setUrl: (url: string) => void;
  disabled?: boolean;
  urlOverride?: string;
}) {
  return (
    <CldUploadWidget
      uploadPreset="wannabet_names"
      onSuccess={(res) => {
        console.log("Upload success!", res);
        if (res.info && typeof res.info !== "string") {
          setUrl(res.info.url);
        } else {
          throw new Error("Failed to get image url");
        }
      }}
    >
      {({ open }) => (
        <span
          onClick={() => !disabled && open()}
          className={cn(
            "h-fit w-fit rounded-full shadow-xl",
            disabled ? "cursor-default" : "cursor-pointer",
          )}
        >
          <UserAvatar user={user} urlOverride={urlOverride} />
        </span>
      )}
    </CldUploadWidget>
  );
}
