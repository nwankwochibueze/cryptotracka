"use client"

import { useCoins } from "@/hooks/useCoins"
import { useFavoritesStore } from "@/store/useFavouritesStore"
import { CoinTable } from "@/components/features/coin/CoinTable"
import { CoinCard } from "@/components/features/coin/CoinCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { LayoutGrid, List, Star } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function WatchlistPage() {
  const { data: coins, isLoading } = useCoins(100)
  const { favorites } = useFavoritesStore()
  const [viewMode, setViewMode] = useState<"grid" | "table">("table")

  // Filter coins to only show favorites
  const watchlistCoins = coins?.filter((coin) => favorites.includes(coin.id))

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="container px-4 py-8 space-y-8">
          <Skeleton className="h-10 w-64" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    )
  }

  // Empty state - no favorites
  if (favorites.length === 0) {
    return (
      <div className="container px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">My Watchlist</h1>
            <p className="text-muted-foreground mt-2">
              Track your favorite cryptocurrencies
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              No Coins in Watchlist
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <div className="max-w-md mx-auto space-y-4">
              <Star className="h-16 w-16 mx-auto text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                 haven&apos;t added any coins to your watchlist yet.
              </p>
              <p className="text-sm text-muted-foreground">
                Click the star icon on any coin to add it to your watchlist and
                track it here.
              </p>
              <Button asChild className="mt-4">
                <Link href="/">Browse Cryptocurrencies</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">My Watchlist</h1>
          <p className="text-muted-foreground mt-2">
            Tracking {favorites.length} {favorites.length === 1 ? "coin" : "coins"}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("table")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "table" ? (
        <CoinTable coins={watchlistCoins || []} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {watchlistCoins?.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </div>
  )
}