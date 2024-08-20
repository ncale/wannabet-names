"use client";

import { useAccount } from "wagmi";
import SetSubnameForm from "../subnames/set-subname-form";

export default function SetSubnameSection() {
  const { address } = useAccount();

  return (
    <section>
      <SetSubnameForm address={address} defaultValues={{ name: "" }} />
    </section>
  );
}
