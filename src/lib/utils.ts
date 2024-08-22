import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Address, Hex } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Abbreviate an address by replacing the middle with "..." */
export function abbreviateHex(hex?: Hex, numChars: number = 3) {
  if (!hex) return "";
  return `${hex.slice(0, numChars + 2)}...${hex.slice(numChars * -1)}`;
}

export function isSameAddress(a: Address, b: Address) {
  return a.toLowerCase() === b.toLowerCase();
}
