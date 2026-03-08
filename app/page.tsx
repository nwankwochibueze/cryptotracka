import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Zap, BarChart3, ArrowRight, Star, Wallet, ArrowRightLeft } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-32 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <Zap className="h-3.5 w-3.5" />
          Live market data powered by CoinGecko
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-3xl mb-6 leading-tight">
          Real-time crypto
          <span className="text-primary"> market data</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10">
          Track prices, manage your portfolio, and stay ahead of the market — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" asChild className="text-base px-8">
            <Link href="/markets">
              Explore Markets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-base px-8">
            <Link href="/portfolio">
              My Portfolio
            </Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12 border-t border-b">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-primary">20+</p>
            <p className="text-sm text-muted-foreground mt-1">Coins Tracked</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">Live</p>
            <p className="text-sm text-muted-foreground mt-1">Price Updates</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">Free</p>
            <p className="text-sm text-muted-foreground mt-1">No Account Needed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">Fast</p>
            <p className="text-sm text-muted-foreground mt-1">Redis Powered Cache</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to track crypto
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              CoinPeek gives you the tools to stay on top of the market without the complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Live Markets</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time prices, market caps and 7-day sparkline charts for top coins.
                </p>
                <Link href="/markets" className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all">
                  View Markets <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Watchlist</h3>
                <p className="text-sm text-muted-foreground">
                  Star your favourite coins and track them in one dedicated view.
                </p>
                <Link href="/watchlist" className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all">
                  My Watchlist <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Portfolio</h3>
                <p className="text-sm text-muted-foreground">
                  Track your holdings, total value and performance over time.
                </p>
                <Link href="/portfolio" className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all">
                  My Portfolio <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ArrowRightLeft className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Converter</h3>
                <p className="text-sm text-muted-foreground">
                  Instantly convert between crypto and fiat currencies at live rates.
                </p>
                <Link href="/converter" className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all">
                  Convert Now <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24 mt-auto">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-12 space-y-6">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Ready to start tracking?</h2>
            <p className="text-muted-foreground">
              Jump into the markets and see live crypto prices right now. No sign up required.
            </p>
            <Button size="lg" asChild className="text-base px-8">
              <Link href="/markets">
                Go to Markets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}