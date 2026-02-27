import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get("limit") || "50")

  const mockCoins = [
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      current_price: 94234.50,
      market_cap: 1856234000000,
      market_cap_rank: 1,
      total_volume: 45234000000,
      price_change_percentage_24h: 2.34,
      price_change_percentage_7d_in_currency: 5.67,
      sparkline_in_7d: { price: [93000, 93500, 94000, 93800, 94100, 94500, 94234] }
    },
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      current_price: 3421.75,
      market_cap: 411234000000,
      market_cap_rank: 2,
      total_volume: 20123000000,
      price_change_percentage_24h: -1.23,
      price_change_percentage_7d_in_currency: 3.45,
      sparkline_in_7d: { price: [3400, 3450, 3425, 3380, 3410, 3430, 3421] }
    },
    {
      id: "solana",
      symbol: "sol",
      name: "Solana",
      image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
      current_price: 187.32,
      market_cap: 89234000000,
      market_cap_rank: 5,
      total_volume: 5234000000,
      price_change_percentage_24h: 5.67,
      price_change_percentage_7d_in_currency: 12.34,
      sparkline_in_7d: { price: [175, 178, 182, 180, 185, 189, 187] }
    },
    {
      id: "cardano",
      symbol: "ada",
      name: "Cardano",
      image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
      current_price: 0.89,
      market_cap: 31234000000,
      market_cap_rank: 9,
      total_volume: 1234000000,
      price_change_percentage_24h: -2.34,
      price_change_percentage_7d_in_currency: 1.23,
      sparkline_in_7d: { price: [0.87, 0.88, 0.90, 0.89, 0.88, 0.90, 0.89] }
    },
    {
      id: "ripple",
      symbol: "xrp",
      name: "XRP",
      image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
      current_price: 2.45,
      market_cap: 140234000000,
      market_cap_rank: 3,
      total_volume: 8234000000,
      price_change_percentage_24h: 3.45,
      price_change_percentage_7d_in_currency: 8.90,
      sparkline_in_7d: { price: [2.30, 2.35, 2.40, 2.38, 2.42, 2.48, 2.45] }
    },
  ]

  const coins = mockCoins.slice(0, Math.min(limit, mockCoins.length))
  console.log(`✅ Returning ${coins.length} mock coins`)
  return NextResponse.json(coins)
}