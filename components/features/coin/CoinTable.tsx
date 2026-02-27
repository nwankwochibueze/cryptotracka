// components/features/coin/CoinTable.tsx
"use client";

import { Coin } from "@/types/coin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import {
  formatCurrency,
  formatPercent,
  formatNumber,
  getPriceChangeVariant,
} from "@/lib/utils";
import { useFavoritesStore } from "@/store/useFavouritesStore";
import { MiniChart } from "./MiniChart";
import Link from "next/link";
import Image from 'next/image';

interface CoinTableProps {
  coins: Coin[];
}

export function CoinTable({ coins }: CoinTableProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12.5"></TableHead>
            <TableHead className="w-12.5">#</TableHead>
            <TableHead>Coin</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">24h %</TableHead>
            <TableHead className="text-right">7d %</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
            <TableHead className="text-right">Volume (24h)</TableHead>
            <TableHead className="text-center">Last 7 Days</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.id} className="hover:bg-muted/50">
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(coin.id)}
                >
                  <Star
                    className={`h-4 w-4 ${
                      isFavorite(coin.id)
                        ? "fill-yellow-400 text-yellow-400"
                        : ""
                    }`}
                  />
                </Button>
              </TableCell>
              <TableCell className="font-medium">
                {coin.market_cap_rank}
              </TableCell>
              <TableCell>
                <Link
                  href={`/coin/${coin.id}`}
                  className="flex items-center gap-2 hover:underline"
                >
<Image src={coin.image} alt={coin.name} width={32} height={32} />
                  <div>
                    <div className="font-semibold">{coin.name}</div>
                    <div className="text-sm text-muted-foreground uppercase">
                      {coin.symbol}
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="text-right font-mono">
                {formatCurrency(coin.current_price)}
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  variant={getPriceChangeVariant(
                    coin.price_change_percentage_24h
                  )}
                >
                  {formatPercent(coin.price_change_percentage_24h)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  variant={getPriceChangeVariant(
                    coin.price_change_percentage_7d_in_currency || 0
                  )}
                >
                  {formatPercent(
                    coin.price_change_percentage_7d_in_currency || 0
                  )}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-mono">
                {formatNumber(coin.market_cap)}
              </TableCell>
              <TableCell className="text-right font-mono">
                {formatNumber(coin.total_volume)}
              </TableCell>
              <TableCell>
                {coin.sparkline_in_7d && (
                  <div className="flex justify-center">
                    <MiniChart
                      data={coin.sparkline_in_7d.price}
                      width={100}
                      height={40}
                    />
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
