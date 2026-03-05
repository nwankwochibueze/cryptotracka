export interface Holding {
  coinId: string
  amount: number
  buyPrice: number
  addedAt: string
}

export interface PortfolioSummary {
  totalValue: number
  totalInvested: number
  totalProfitLoss: number
  profitLossPercentage: number
}