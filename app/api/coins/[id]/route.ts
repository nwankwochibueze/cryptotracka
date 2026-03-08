import { NextResponse } from "next/server"
import { CoinDetail } from "@/types/coin"
import { getCached, setCached } from "@/lib/redis"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const cacheKey = `coin:${id}`

  // 1. Check Redis cache first
  const cached = await getCached<CoinDetail>(cacheKey)
  if (cached) {
    console.log(`✅ Cache hit for ${cacheKey}`)
    return NextResponse.json(cached)
  }

  // 2. Cache miss — fetch from CoinGecko
  const response = await fetch(
  `https://api.coingecko.com/api/v3/coins/${id}?sparkline=true&localization=false&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`,
)

  if (!response.ok) {
    return NextResponse.json(
      { error: "Coin not found" },
      { status: response.status }
    )
  }

  const coin: CoinDetail = await response.json()

  // 3. Save to Redis for 60 seconds
  await setCached(cacheKey, coin, 300) // 300 seconds = 5 minutes
  console.log(`✅ Cache set for ${cacheKey}`)

  return NextResponse.json(coin)
}