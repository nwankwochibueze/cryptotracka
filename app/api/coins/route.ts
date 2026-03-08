import { NextResponse } from "next/server"
import { getCached, setCached } from "@/lib/redis"
import { Coin } from "@/types/coin"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get("limit") || "50")
  const cacheKey = `coins:list:${limit}`

  // 1. Check Redis cache first
  const cached = await getCached<Coin[]>(cacheKey)
  if (cached) {
    console.log(`✅ Cache hit for ${cacheKey}`)
    return NextResponse.json(cached)
  }

  // 2. Fetch from CoinGecko
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=7d&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`,
    { next: { revalidate: 300 } }
  )

  if (!response.ok) {
    console.log(`❌ CoinGecko error: ${response.status}`)
    return NextResponse.json(
      { error: `CoinGecko API error: ${response.status}` },
      { status: response.status }
    )
  }

  const coins: Coin[] = await response.json()

  // 3. Cache for 5 minutes
  await setCached(cacheKey, coins, 300)
  console.log(`✅ Cached ${coins.length} coins`)

  return NextResponse.json(coins)
}