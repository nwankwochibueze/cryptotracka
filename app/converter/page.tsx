"use client"

import { useState } from "react"
import { useCoins } from "@/hooks/useCoins"
import { useExchangeRates } from "@/hooks/useExchangeRates"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowRightLeft, TrendingUp } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Fiat currencies we support
const SUPPORTED_FIATS = [
  { id: "usd", name: "US Dollar", symbol: "USD" },
  { id: "eur", name: "Euro", symbol: "EUR" },
  { id: "gbp", name: "British Pound", symbol: "GBP" },
  { id: "jpy", name: "Japanese Yen", symbol: "JPY" },
]

export default function ConverterPage() {
  const { data: coins, isLoading: coinsLoading } = useCoins(50)
  const { data: exchangeRates, isLoading: ratesLoading } = useExchangeRates()
  
  const [fromAmount, setFromAmount] = useState<string>("1")
  const [fromCurrency, setFromCurrency] = useState<string>("bitcoin")
  const [toCurrency, setToCurrency] = useState<string>("usd")

  const isLoading = coinsLoading || ratesLoading

  // Get all available currencies (crypto + fiat)
  const allCurrencies = [
    ...(coins?.map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price, // Price in USD
      isCrypto: true
    })) || []),
    ...SUPPORTED_FIATS.map(fiat => ({
      id: fiat.id,
      name: fiat.name,
      symbol: fiat.symbol,
      // Convert to USD value (1 / exchange rate)
      price: fiat.id === "usd" 
        ? 1 
        : 1 / (exchangeRates?.rates[fiat.symbol.toUpperCase()] || 1),
      isCrypto: false
    }))
  ]

  // Get prices
  const fromPrice = allCurrencies.find(c => c.id === fromCurrency)?.price || 0
  const toPrice = allCurrencies.find(c => c.id === toCurrency)?.price || 1

  // Calculate conversion directly (no useEffect needed!)
  const calculateResult = (): number => {
    const amount = parseFloat(fromAmount) || 0
    
    if (fromCurrency === toCurrency) {
      return amount
    }
    
    // Convert to USD first, then to target currency
    const usdValue = fromPrice * amount
    return usdValue / toPrice
  }

  const result = calculateResult()

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-10 w-64 mb-8" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Currency Converter</h1>
        <p className="text-muted-foreground mt-2">
          Convert between cryptocurrencies and fiat currencies
        </p>
      </div>

      {/* Converter Card */}
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Crypto Converter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* From Section */}
            <div className="space-y-2">
              <Label htmlFor="from-amount">From</Label>
              <div className="flex gap-2">
                <Input
                  id="from-amount"
                  type="number"
                  step="0.00000001"
                  placeholder="1.0"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="flex-1"
                />
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="w-45">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-2 py-1.5 text-sm font-semibold">
                      Cryptocurrencies
                    </div>
                    {allCurrencies
                      .filter(c => c.isCrypto)
                      .map((currency) => (
                        <SelectItem key={currency.id} value={currency.id}>
                          {currency.symbol}
                        </SelectItem>
                      ))}
                    <div className="px-2 py-1.5 text-sm font-semibold border-t mt-2">
                      Fiat Currencies
                    </div>
                    {allCurrencies
                      .filter(c => !c.isCrypto)
                      .map((currency) => (
                        <SelectItem key={currency.id} value={currency.id}>
                          {currency.symbol}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwap}
                className="rounded-full"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            {/* To Section */}
            <div className="space-y-2">
              <Label htmlFor="to-amount">To</Label>
              <div className="flex gap-2">
                <Input
                  id="to-amount"
                  type="text"
                  value={result.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 8,
                  })}
                  readOnly
                  className="flex-1 font-mono text-lg font-bold"
                />
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger className="w-45">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-2 py-1.5 text-sm font-semibold">
                      Cryptocurrencies
                    </div>
                    {allCurrencies
                      .filter(c => c.isCrypto)
                      .map((currency) => (
                        <SelectItem key={currency.id} value={currency.id}>
                          {currency.symbol}
                        </SelectItem>
                      ))}
                    <div className="px-2 py-1.5 text-sm font-semibold border-t mt-2">
                      Fiat Currencies
                    </div>
                    {allCurrencies
                      .filter(c => !c.isCrypto)
                      .map((currency) => (
                        <SelectItem key={currency.id} value={currency.id}>
                          {currency.symbol}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Exchange Rate Info */}
            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Exchange Rate</span>
                <span className="font-mono">
                  1 {allCurrencies.find(c => c.id === fromCurrency)?.symbol} ={" "}
                  {(fromPrice / toPrice).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 8,
                  })}{" "}
                  {allCurrencies.find(c => c.id === toCurrency)?.symbol}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Conversions */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Quick Conversions ({allCurrencies.find(c => c.id === fromCurrency)?.symbol})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[1, 10, 100, 1000].map((amount) => {
                const converted = (fromPrice / toPrice) * amount
                return (
                  <div
                    key={amount}
                    className="flex justify-between text-sm py-2 border-b last:border-0"
                  >
                    <span className="font-mono">
                      {amount} {allCurrencies.find(c => c.id === fromCurrency)?.symbol}
                    </span>
                    <span className="font-mono font-semibold">
                      {converted.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      {allCurrencies.find(c => c.id === toCurrency)?.symbol}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}