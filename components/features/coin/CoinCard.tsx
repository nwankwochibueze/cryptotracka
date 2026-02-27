// components/features/coin/CoinCard.tsx
"use client";

import { Coin } from "@/types/coin";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import {
  formatCurrency,
  formatPercent,
  getPriceChangeVariant,
} from "@/lib/utils";
import { useFavoritesStore } from "@/store/useFavouritesStore";
import { MiniChart } from "./MiniChart";
import Link from "next/link";
import Image from 'next/image';

interface CoinCardProps {
  coin: Coin;
}

export function CoinCard({ coin }: CoinCardProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <Link href={`/coin/${coin.id}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-3">
           <Image src={coin.image} alt={coin.name} width={32} height={32} />
            <div>
              <h3 className="font-semibold text-lg">{coin.name}</h3>
              <p className="text-sm text-muted-foreground uppercase">
                {coin.symbol}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(coin.id);
            }}
          >
            <Star
              className={`h-5 w-5 ${
                isFavorite(coin.id) ? "fill-yellow-400 text-yellow-400" : ""
              }`}
            />
          </Button>
        </CardHeader>
      </Link>

      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              {formatCurrency(coin.current_price)}
            </span>
            <Badge
              variant={getPriceChangeVariant(coin.price_change_percentage_24h)}
            >
              {formatPercent(coin.price_change_percentage_24h)}
            </Badge>
          </div>

          {coin.sparkline_in_7d && (
            <MiniChart data={coin.sparkline_in_7d.price} />
          )}

          <div className="pt-2 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Market Cap</span>
              <span className="font-medium">
                {formatCurrency(coin.market_cap)}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-muted-foreground">Volume (24h)</span>
              <span className="font-medium">
                {formatCurrency(coin.total_volume)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
