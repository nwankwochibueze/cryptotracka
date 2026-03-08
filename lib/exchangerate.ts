const EXCHANGERATE_API_KEY = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY

export interface ExchangeRates {
  base: string
  rates: {
    [currency: string]: number
  }
}

export async function fetchExchangeRates(): Promise<ExchangeRates> {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${EXCHANGERATE_API_KEY}/latest/USD`
  )

  if (!response.ok) {
    throw new Error(`Exchange Rate API Error: ${response.status}`)
  }

  const data = await response.json()
  
  return {
    base: data.base_code,
    rates: data.conversion_rates
  }
}