import { NextResponse } from "next/server"
import { fetchExchangeRates } from "@/lib/exchangerate"
import { getCached, setCached } from "@/lib/redis"

export async function GET() {
  const cacheKey = "exchange-rates:usd"

  try {
    // Check Redis cache
    const cached = await getCached(cacheKey)
    if (cached) {
      console.log("✅ Cache hit for exchange rates")
      return NextResponse.json(cached)
    }

    console.log("❌ Cache miss for exchange rates")

    // Fetch from Exchange Rate API
    const rates = await fetchExchangeRates()

    // Cache for 1 hour (exchange rates don't change that often)
    await setCached(cacheKey, rates, 3600)

    return NextResponse.json(rates)
  } catch (error) {
    console.error("Error fetching exchange rates:", error)
    
    // Fallback to hardcoded rates if API fails
    const fallbackRates = {
      base: "USD",
      rates: {
        USD: 1,
        EUR: 0.93,
        GBP: 0.79,
        JPY: 149.50,
      }
    }
    
    return NextResponse.json(fallbackRates)
  }
}