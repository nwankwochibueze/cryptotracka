// store/useFavoritesStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FavoritesStore {
  favorites: string[]
  addFavorite: (coinId: string) => void
  removeFavorite: (coinId: string) => void
  isFavorite: (coinId: string) => boolean
  toggleFavorite: (coinId: string) => void
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (coinId) =>
        set((state) => ({
          favorites: [...state.favorites, coinId],
        })),

      removeFavorite: (coinId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== coinId),
        })),

      isFavorite: (coinId) => get().favorites.includes(coinId),

      toggleFavorite: (coinId) => {
        const { isFavorite, addFavorite, removeFavorite } = get()
        if (isFavorite(coinId)) {
          removeFavorite(coinId)
        } else {
          addFavorite(coinId)
        }
      },
    }),
    {
      name: "favorites-storage",
    }
  )
)