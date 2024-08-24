"use client";

import { useQuery } from "@tanstack/react-query";
import { Input } from "../../components/ui/input";
import { useMemo, useState } from "react";
import { NameStoneUser } from "@/lib/namestone";
import { useDebounce } from "@/lib/hooks";
import { Badge } from "../../components/ui/badge";
import { subnameSchema } from "@/lib/types/subname";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SearchBar() {
  console.log("rendering");

  const router = useRouter();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const parsedQuery = subnameSchema.safeParse(debouncedQuery);

  const { data, isLoading } = useQuery({
    queryKey: ["search", parsedQuery.data],
    queryFn: async () => {
      const res = await fetch(`/api/search?q=${parsedQuery.data}`);
      const data = await res.json();
      return data.data as NameStoneUser;
    },
    enabled: parsedQuery.success,
  });

  function handleChange(value: string): void {
    setQuery(value);
  }

  const isReady = query.length > 0 && debouncedQuery.length > 0;

  return (
    <div className={cn("space-y-2 rounded-xl pb-2", isReady ? "border" : "")}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submitting form");
          try {
            const parsed = subnameSchema.parse(query);
            router.push(`/name/${parsed}`);
          } catch (error) {
            toast.error("Failed to search");
          }
        }}
      >
        <Input
          className="text-xl rounded-xl py-6 px-4"
          type="search"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search for a subname"
        />
      </form>
      {isReady && (
        <div className="*:px-4 font-semibold ">
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
                  <Badge variant="search-reserved">Reserved</Badge>
                ) : (
                  <Badge variant="search-available">Available</Badge>
                )}
              </Link>
            )
          ) : (
            parsedQuery.error.errors.map((error, i) => (
              <div className="text-red-700 text-sm" key={i}>
                {error.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
