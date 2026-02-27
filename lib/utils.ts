import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// shadcn's cn function (already created)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



// Format currency
export function formatCurrency(
  value: number,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: value < 1 ? 6 : 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value)
}

// Format large numbers (1M, 1B, etc.)
export function formatNumber(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`
  return `$${value.toFixed(2)}`
}

// Format percentage
export function formatPercent(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
}

// Get color class for price change
export function getPriceChangeColor(change: number): string {
  return change >= 0 ? "text-green-500" : "text-red-500"
}

// Get variant for badge based on price change
export function getPriceChangeVariant(
  change: number
): "default" | "destructive" | "outline" | "secondary" {
  return change >= 0 ? "default" : "destructive"
}