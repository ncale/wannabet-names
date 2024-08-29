"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

//parent component should have position:relative or absolute
export const CopyToClipboard: React.FC<{ children: string; className?: string }> = ({
  children,
  className,
}) => {
  const [copied, setCopiedState] = useState(false);

  return (
    <>
      <Button
        className={cn("space-x-1 backdrop-blur-2xl dark:border-neutral-800", className)}
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => {
          if (copied) return;
          navigator.clipboard.writeText(children);

          setCopiedState(true);
          setTimeout(() => {
            setCopiedState(false);
          }, 1000);
        }}
      >
        <div>{children}</div>
        {copied ? <CheckMark /> : <ClipBoard />}
      </Button>
    </>
  );
};

const ClipBoard = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={"scale-[0.70] stroke-neutral-800 dark:stroke-neutral-400"}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);
const CheckMark = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={"scale-[0.70] stroke-neutral-800 dark:stroke-neutral-400"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
