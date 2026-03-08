import { useQuery } from "@tanstack/react-query"
import { Coin } from "@/types/coin"

export function useCoins(limit: number = 20) {
  return useQuery<Coin[]>({
    queryKey: ["coins", limit],
    queryFn: async () => {
      const response = await fetch(`/api/coins?limit=${limit}`)
      if (!response.ok) {
        throw new Error("Failed to fetch coins")
      }
      return response.json()
    },
    staleTime: 10 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  })
}