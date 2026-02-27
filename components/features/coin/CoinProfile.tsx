"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, ArrowLeft, TrendingUp, TrendingDown } from "lucide-react"
import { useFavoritesStore } from "@/store/useFavouritesStore"
import { formatCurrency, formatPercent, getPriceChangeVariant } from "@/lib/utils"
import { CoinDetail } from "@/types/coin"
import { MiniChart } from "./MiniChart"
import Image from "next/image"
import Link from "next/link"

async function fetchCoin(id: string): Promise<CoinDetail> {
  const res = await fetch(`/api/coins/${id}`)
  if (!res.ok) throw new Error("Coin not found")
  return res.json()
}

export function CoinProfile({ id }: { id: string }) {
  const { isFavorite, toggleFavorite } = useFavoritesStore()

  const { data: coin, isLoading, error } = useQuery({
    queryKey: ["coin", id],
    queryFn: () => fetchCoin(id),
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error || !coin) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Coin Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            We could not find data for {id}.
          </p>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  const price = coin.market_data.current_price.usd
  const marketCap = coin.market_data.market_cap.usd
  const volume = coin.market_data.total_volume.usd
  const high24h = coin.market_data.high_24h.usd
  const low24h = coin.market_data.low_24h.usd
  const change24h = coin.market_data.price_change_percentage_24h
  const change7d = coin.market_data.price_change_percentage_7d
  const circulatingSupply = coin.market_data.circulating_supply
  const maxSupply = coin.market_data.max_supply
  const isPositive24h = change24h >= 0
  const isPositive7d = change7d >= 0

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link href="/">
        <Button variant="ghost" className="pl-0 hover:bg-transparent">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Markets
        </Button>
      </Link>

      {/* Hero header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{coin.name}</h1>
              <span className="text-lg text-muted-foreground uppercase font-mono">
                {coin.symbol}
              </span>
            </div>
            <p className="text-4xl font-bold mt-1">
              {formatCurrency(price)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={getPriceChangeVariant(change24h)} className="text-sm px-3 py-1">
            {isPositive24h
              ? <TrendingUp className="mr-1 h-4 w-4 inline" />
              : <TrendingDown className="mr-1 h-4 w-4 inline" />}
            {formatPercent(change24h)} (24h)
          </Badge>
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleFavorite(coin.id)}
          >
            <Star
              className={`h-5 w-5 ${
                isFavorite(coin.id) ? "fill-yellow-400 text-yellow-400" : ""
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Chart */}
      {coin.sparkline_in_7d && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium text-muted-foreground">
              7-Day Price Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MiniChart data={coin.sparkline_in_7d.price} />
          </CardContent>
        </Card>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              24h High / Low
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{formatCurrency(high24h)}</p>
            <p className="text-sm text-muted-foreground">{formatCurrency(low24h)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Market Cap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{formatCurrency(marketCap)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              24h Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{formatCurrency(volume)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              7d Change
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={getPriceChangeVariant(change7d)}>
              {isPositive7d
                ? <TrendingUp className="mr-1 h-3 w-3 inline" />
                : <TrendingDown className="mr-1 h-3 w-3 inline" />}
              {formatPercent(change7d)}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Circulating Supply
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">
              {circulatingSupply.toLocaleString()} {coin.symbol.toUpperCase()}
            </p>
            {maxSupply && (
              <p className="text-sm text-muted-foreground">
                Max: {maxSupply.toLocaleString()}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      {coin.description.en && (
        <Card>
          <CardHeader>
            <CardTitle>About {coin.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {coin.description.en}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}