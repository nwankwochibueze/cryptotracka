// store/useCurrencyStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

type Currency = "USD" | "EUR" | "GBP" | "JPY" | "BTC" | "ETH"

interface CurrencyStore {
  currency: Currency
  setCurrency: (currency: Currency) => void
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      currency: "USD",
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: "currency-storage",
    }
  )
)