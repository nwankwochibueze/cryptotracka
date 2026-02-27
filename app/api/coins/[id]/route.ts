import { NextResponse } from "next/server"
import { CoinDetail } from "@/types/coin"

const mockCoins: Record<string, CoinDetail> = {
  bitcoin: {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    description: { en: "Bitcoin is the first and most well-known cryptocurrency, created in 2009 by the pseudonymous Satoshi Nakamoto." },
    image: {
      thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
      small: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
      large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    },
    market_data: {
      current_price: { usd: 94234.50 },
      market_cap: { usd: 1856234000000 },
      total_volume: { usd: 45234000000 },
      high_24h: { usd: 95100.00 },
      low_24h: { usd: 93200.00 },
      price_change_percentage_24h: 2.34,
      price_change_percentage_7d: 5.67,
      price_change_percentage_30d: 10.2,
      price_change_percentage_1y: 120.5,
      circulating_supply: 19700000,
      total_supply: 21000000,
      max_supply: 21000000,
    },
    sparkline_in_7d: { price: [93000, 93500, 94000, 93800, 94100, 94500, 94234] },
  },
  ethereum: {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    description: { en: "Ethereum is a decentralized, open-source blockchain with smart contract functionality." },
    image: {
      thumb: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
      small: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      large: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    },
    market_data: {
      current_price: { usd: 3421.75 },
      market_cap: { usd: 411234000000 },
      total_volume: { usd: 20123000000 },
      high_24h: { usd: 3500.00 },
      low_24h: { usd: 3380.00 },
      price_change_percentage_24h: -1.23,
      price_change_percentage_7d: 3.45,
      price_change_percentage_30d: 8.1,
      price_change_percentage_1y: 45.3,
      circulating_supply: 120000000,
      total_supply: null,
      max_supply: null,
    },
    sparkline_in_7d: { price: [3400, 3450, 3425, 3380, 3410, 3430, 3421] },
  },
  solana: {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    description: { en: "Solana is a high-performance blockchain known for its fast transaction speeds and low fees." },
    image: {
      thumb: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png",
      small: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
      large: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    },
    market_data: {
      current_price: { usd: 187.32 },
      market_cap: { usd: 89234000000 },
      total_volume: { usd: 5234000000 },
      high_24h: { usd: 192.00 },
      low_24h: { usd: 181.00 },
      price_change_percentage_24h: 5.67,
      price_change_percentage_7d: 12.34,
      price_change_percentage_30d: 20.1,
      price_change_percentage_1y: 340.5,
      circulating_supply: 450000000,
      total_supply: null,
      max_supply: null,
    },
    sparkline_in_7d: { price: [175, 178, 182, 180, 185, 189, 187] },
  },
  cardano: {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    description: { en: "Cardano is a proof-of-stake blockchain platform founded on peer-reviewed research and evidence-based methods." },
    image: {
      thumb: "https://assets.coingecko.com/coins/images/975/thumb/cardano.png",
      small: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
      large: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    },
    market_data: {
      current_price: { usd: 0.89 },
      market_cap: { usd: 31234000000 },
      total_volume: { usd: 1234000000 },
      high_24h: { usd: 0.93 },
      low_24h: { usd: 0.86 },
      price_change_percentage_24h: -2.34,
      price_change_percentage_7d: 1.23,
      price_change_percentage_30d: -5.4,
      price_change_percentage_1y: 12.8,
      circulating_supply: 35000000000,
      total_supply: 45000000000,
      max_supply: 45000000000,
    },
    sparkline_in_7d: { price: [0.87, 0.88, 0.90, 0.89, 0.88, 0.90, 0.89] },
  },
  ripple: {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    description: { en: "XRP is the native cryptocurrency of the XRP Ledger, designed for fast, low-cost international payments." },
    image: {
      thumb: "https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png",
      small: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      large: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    },
    market_data: {
      current_price: { usd: 2.45 },
      market_cap: { usd: 140234000000 },
      total_volume: { usd: 8234000000 },
      high_24h: { usd: 2.52 },
      low_24h: { usd: 2.35 },
      price_change_percentage_24h: 3.45,
      price_change_percentage_7d: 8.90,
      price_change_percentage_30d: 15.3,
      price_change_percentage_1y: 280.4,
      circulating_supply: 57000000000,
      total_supply: 100000000000,
      max_supply: 100000000000,
    },
    sparkline_in_7d: { price: [2.30, 2.35, 2.40, 2.38, 2.42, 2.48, 2.45] },
  },
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const coin = mockCoins[id]

  if (!coin) {
    return NextResponse.json({ error: "Coin not found" }, { status: 404 })
  }

  return NextResponse.json(coin)
}