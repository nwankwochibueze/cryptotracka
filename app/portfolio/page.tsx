"use client";

import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useCoins } from "@/hooks/useCoins";
import { AddHoldingForm } from "@/components/features/portfolio/AddHoldingForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Trash2, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function PortfolioPage() {
  const { holdings, removeHolding, getTotalValue } = usePortfolioStore();
  const { data: coins, isLoading } = useCoins(100);

  // Calculate current prices for holdings
  const prices: { [key: string]: number } = {};
  coins?.forEach((coin) => {
    prices[coin.id] = coin.current_price;
  });

  const totalValue = getTotalValue(prices);
  const totalInvested = holdings.reduce(
    (sum, h) => sum + h.amount * h.purchasePrice,
    0,
  );
  const totalProfit = totalValue - totalInvested;
  const profitPercentage =
    totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

  const handleRemove = (coinId: string) => {
    removeHolding(coinId);
    toast.success("Holding removed from portfolio");
  };

  if (isLoading) {
    return (
      <div className="container px-4 py-8">
        <Skeleton className="h-10 w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  // Empty state
  if (holdings.length === 0) {
    return (
      <div className="container px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">My Portfolio</h1>
            <p className="text-muted-foreground mt-2">
              Track your cryptocurrency holdings
            </p>
          </div>
          <AddHoldingForm />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              No Holdings Yet
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <div className="max-w-md mx-auto space-y-4">
              <Wallet className="h-16 w-16 mx-auto text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                You haven&apos;t added any holdings to your portfolio yet.
              </p>
              <p className="text-sm text-muted-foreground">
                Click &quot;Add Holding&quot; to start tracking your crypto
                investments.
              </p>
              <AddHoldingForm />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">My Portfolio</h1>
          <p className="text-muted-foreground mt-2">
            {holdings.length} {holdings.length === 1 ? "holding" : "holdings"}
          </p>
        </div>
        <AddHoldingForm />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Value */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(totalValue)}
            </div>
          </CardContent>
        </Card>

        {/* Total Invested */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Invested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(totalInvested)}
            </div>
          </CardContent>
        </Card>

        {/* Profit/Loss */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Profit/Loss
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div
                className={`text-3xl font-bold ${
                  totalProfit >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {totalProfit >= 0 ? "+" : ""}
                {formatCurrency(totalProfit)}
              </div>
              {totalProfit >= 0 ? (
                <TrendingUp className="h-6 w-6 text-green-500" />
              ) : (
                <TrendingDown className="h-6 w-6 text-red-500" />
              )}
            </div>
            <p
              className={`text-sm mt-1 ${
                totalProfit >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {totalProfit >= 0 ? "+" : ""}
              {profitPercentage.toFixed(2)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Coin</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Buy Price</TableHead>
                  <TableHead className="text-right">Current Price</TableHead>
                  <TableHead className="text-right">Current Value</TableHead>
                  <TableHead className="text-right">Profit/Loss</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdings.map((holding) => {
                  const coin = coins?.find((c) => c.id === holding.coinId);
                  const currentPrice = prices[holding.coinId] || 0;
                  const currentValue = holding.amount * currentPrice;
                  const invested = holding.amount * holding.purchasePrice;
                  const profit = currentValue - invested;
                  const profitPercent =
                    invested > 0 ? (profit / invested) * 100 : 0;

                  return (
                    <TableRow key={holding.coinId}>
                      <TableCell>
                        <Link
                          href={`/coin/${holding.coinId}`}
                          className="flex items-center gap-2 hover:underline"
                        >
                          {coin && (
                            <Image
                              src={coin.image}
                              alt={coin.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                          )}
                          <div>
                            <div className="font-semibold">
                              {coin?.name || holding.coinId}
                            </div>
                            <div className="text-sm text-muted-foreground uppercase">
                              {coin?.symbol || ""}
                            </div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatNumber(holding.amount)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(holding.purchasePrice)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(currentPrice)}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold">
                        {formatCurrency(currentValue)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          className={`font-mono font-bold ${
                            profit >= 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {profit >= 0 ? "+" : ""}
                          {formatCurrency(profit)}
                        </div>
                        <div
                          className={`text-sm ${
                            profit >= 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {profit >= 0 ? "+" : ""}
                          {profitPercent.toFixed(2)}%
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(holding.coinId)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
