// components/features/search/search.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils"; // <-- Make sure this import is present

// --- CHANGE 1: Add { className }: { className?: string } to the function's props ---
export function SearchBar({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const router = useRouter();

  const searchResults = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH" },
    { id: "solana", name: "Solana", symbol: "SOL" },
    { id: "cardano", name: "Cardano", symbol: "ADA" },
    { id: "ripple", name: "XRP", symbol: "XRP" },
  ].filter((coin) =>
    coin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleSelect = (coinId: string) => {
    setOpen(false);
    setSearchQuery("");
    router.push(`/coin/${coinId}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          // --- CHANGE 2: Use the cn() function to merge classes ---
          className={cn("w-full justify-between", className)}
        >
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <span className="text-muted-foreground">Search crypto...</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search cryptocurrency..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No cryptocurrency found.</CommandEmpty>
            <CommandGroup>
              {searchResults.map((coin) => (
                <CommandItem
                  key={coin.id}
                  value={coin.id}
                  onSelect={() => handleSelect(coin.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{coin.name}</span>
                    <span className="text-sm text-muted-foreground uppercase">
                      {coin.symbol}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}