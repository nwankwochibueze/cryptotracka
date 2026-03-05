import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Holding {
  coinId: string
  amount: number
  purchasePrice: number
  purchaseDate: string
}

interface PortfolioStore {
  holdings: Holding[]
  addHolding: (holding: Holding) => void
  removeHolding: (coinId: string) => void
  updateHolding: (coinId: string, holding: Partial<Holding>) => void
  getHolding: (coinId: string) => Holding | undefined
  getTotalValue: (prices: { [coinId: string]: number }) => number
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      holdings: [],

      addHolding: (holding) =>
        set((state) => ({
          holdings: [...state.holdings, holding],
        })),

      removeHolding: (coinId) =>
        set((state) => ({
          holdings: state.holdings.filter((h) => h.coinId !== coinId),
        })),

      updateHolding: (coinId, updates) =>
        set((state) => ({
          holdings: state.holdings.map((h) =>
            h.coinId === coinId ? { ...h, ...updates } : h
          ),
        })),

      getHolding: (coinId) => {
        return get().holdings.find((h) => h.coinId === coinId)
      },

      getTotalValue: (prices) => {
        return get().holdings.reduce((total, holding) => {
          const currentPrice = prices[holding.coinId] || 0
          return total + holding.amount * currentPrice
        }, 0)
      },
    }),
    {
      name: "portfolio-storage",
    }
  )
)