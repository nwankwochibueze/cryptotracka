"use client"

import { useState } from "react"
import { useCoins } from "@/hooks/useCoins"
import { CoinTable } from "./CoinTable"
import { CoinCard } from "./CoinCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List } from "lucide-react"

export function CoinsView() {
  const { data: coins, isLoading, error } = useCoins(100)
  const [viewMode, setViewMode] = useState<"grid" | "table">("table")

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">
            Error Loading Coins
          </CardTitle>
        </CardHeader>
        <CardContent>
          Failed to load cryptocurrency data.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Cryptocurrency Prices</h1>
          <p className="text-muted-foreground mt-2">
            Track real-time prices of top cryptocurrencies
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
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : viewMode === "table" ? (
        <CoinTable coins={coins || []} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {coins?.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </div>
  )
}
