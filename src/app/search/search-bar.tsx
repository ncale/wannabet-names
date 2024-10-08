"use client";

// Hooks
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/lib/hooks";

// Components
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Lib
import { subnameSchema } from "@/lib/types/subname";
import type { NameStoneUser } from "@/lib/namestone";
import { cn } from "@/lib/utils";
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
          className="rounded-xl px-4 py-6 text-xl"
          type="search"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search for a subname"
        />
      </form>
      {isReady && (
        <div className="font-semibold *:px-4">
          {parsedQuery.success ? (
            isLoading ? (
              <div className="py-2">Loading...</div>
            ) : (
              <Link
                href={`/name/${parsedQuery.data}`}
                className="flex justify-between py-2 hover:bg-muted"
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
              <div className="text-sm text-red-700" key={i}>
                {error.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
