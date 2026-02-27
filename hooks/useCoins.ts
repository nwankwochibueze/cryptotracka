import { useQuery } from "@tanstack/react-query"
import { Coin } from "@/types/coin"

export function useCoins(limit: number = 100) {
  return useQuery<Coin[]>({
    queryKey: ["coins", limit],
    queryFn: async () => {
      const response = await fetch(`/api/coins?limit=${limit}`)
      if (!response.ok) {
        throw new Error("Failed to fetch coins")
      }
      return response.json()
    },
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 30 * 1000, // Refetch every 30 seconds for live prices
  })
}