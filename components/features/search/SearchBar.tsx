"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useCoins } from "@/hooks/useCoins";

interface SearchBarProps {
  className?: string;
  onResultClick?: () => void;
}

export function SearchBar({ className, onResultClick }: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: coins } = useCoins(20);

  const searchResults = debouncedSearch
    ? (coins || []).filter(
        (coin) =>
          coin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : (coins || []).slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (coinId: string) => {
    setOpen(false);
    setSearchQuery("");
    router.push(`/coin/${coinId}`);
    if (onResultClick) onResultClick();
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search crypto..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-[200] bg-background border border-border rounded-md shadow-lg overflow-hidden">
          {searchResults.length === 0 ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">
              No cryptocurrency found.
            </div>
          ) : (
            <ul>
              {searchResults.map((coin) => (
                <li
                  key={coin.id}
                  onMouseDown={() => handleSelect(coin.id)}
                  onTouchEnd={() => handleSelect(coin.id)}
                  className="flex items-center gap-2 px-4 py-3 text-sm cursor-pointer hover:bg-accent"
                >
                  <span className="font-semibold">{coin.name}</span>
                  <span className="text-muted-foreground uppercase">{coin.symbol}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}