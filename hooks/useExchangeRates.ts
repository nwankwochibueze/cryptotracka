import { useQuery } from "@tanstack/react-query"

interface ExchangeRates {
  base: string
  rates: {
    [currency: string]: number
  }
}

export function useExchangeRates() {
  return useQuery<ExchangeRates>({
    queryKey: ["exchange-rates"],
    queryFn: async () => {
      const response = await fetch("/api/exchange-rates")
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates")
      }
      return response.json()
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    refetchInterval: 60 * 60 * 1000, // Refetch every hour
  })
}