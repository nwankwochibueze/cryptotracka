import { CoinProfile } from "@/components/features/coin/CoinProfile"

export default async function CoinPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="container px-4 py-8">
      <CoinProfile id={id} />
    </div>
  )
}