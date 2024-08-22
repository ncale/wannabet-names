"use client";

import { useQuery } from "@tanstack/react-query";
import { Input } from "../ui/input";
import { useState } from "react";
import { NameStoneUser } from "@/lib/namestone";
import { useDebounce } from "@/lib/hooks";
import { Badge } from "../ui/badge";
import { subnameSchema } from "@/lib/types/subname";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  const parsedQuery = subnameSchema.safeParse(debouncedQuery);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      return data.data as NameStoneUser;
    },
    enabled: parsedQuery.success,
  });

  function handleChange(value: string): void {
    setQuery(value);
  }

  return (
    <div className="space-y-2 border rounded-xl pb-2">
      <Input
        className="text-xl rounded-xl py-6 px-4"
        type="search"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search for a subname"
      />
      <div className="*:px-4 font-semibold">
        {parsedQuery.success ? (
          isLoading ? (
            <div className="py-2">Loading...</div>
          ) : (
            <Link
              href={`/name/${parsedQuery.data}`}
              className="flex justify-between hover:bg-muted py-2"
            >
              {parsedQuery.data}.wannabet.eth
              {data ? (
                <Badge variant="destructive">Taken</Badge>
              ) : (
                <Badge variant="default">Available</Badge>
              )}
            </Link>
          )
        ) : (
          query !== "" &&
          parsedQuery.error.errors.map((error, i) => (
            <div className="text-red-700 text-sm" key={i}>
              {error.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
