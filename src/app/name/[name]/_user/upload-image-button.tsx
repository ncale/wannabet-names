"use client";

import { CldUploadWidget } from "next-cloudinary";
import UserAvatar from "./user-avatar";
import { NameStoneUser } from "@/lib/namestone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "@radix-ui/react-icons";

export default function UploadImageButton({
  setUrl,
  disabled,
}: {
  setUrl: (url: string) => void;
  disabled?: boolean;
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
        <Button
          onClick={() => open()}
          variant="outline"
          type="button"
          disabled={disabled}
          size="sm"
          className="h-fit w-fit space-x-2 text-base font-semibold"
        >
          <UploadIcon />
          <span>Upload</span>
        </Button>
      )}
    </CldUploadWidget>
  );
}
