const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3"
const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY

interface FetchOptions {
  cache?: RequestCache
  revalidate?: number
}

async function apiCall(endpoint: string, options: FetchOptions = {}) {
  const response = await fetch(`${COINGECKO_BASE_URL}${endpoint}`, {
    headers: {
      "x-cg-demo-api-key": API_KEY!,
    },
    next: { revalidate: options.revalidate || 60 },
    cache: options.cache || "default",
  })

  if (!response.ok) {
    throw new Error(`CoinGecko API Error: ${response.status}`)
  }

  return response.json()
}

// Fetch top coins
export async function fetchTopCoins(limit: number = 100) {
  return apiCall(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h,7d`
  )
}

// Fetch single coin details
export async function fetchCoinById(id: string) {
  return apiCall(
    `/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true`
  )
}

// Fetch trending coins
export async function fetchTrendingCoins() {
  return apiCall("/search/trending")
}

// Fetch chart data
export async function fetchChartData(id: string, days: number = 7) {
  return apiCall(`/coins/${id}/market_chart?vs_currency=usd&days=${days}`)
}

// Search coins
export async function searchCoins(query: string) {
  return apiCall(`/search?query=${encodeURIComponent(query)}`)
}

// Fetch global market data
export async function fetchGlobalData() {
  return apiCall("/global")
}