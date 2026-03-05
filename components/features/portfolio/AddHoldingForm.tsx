"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePortfolioStore } from "@/store/usePortfolioStore"
import { useCoins } from "@/hooks/useCoins"
import { Plus } from "lucide-react"
import { toast } from "sonner"

// Define form validation schema
const holdingSchema = z.object({
  coinId: z.string().min(1, "Please select a coin"),
  amount: z.number().positive("Amount must be greater than 0"),
  buyPrice: z.number().positive("Buy price must be greater than 0"),
})

type FormValues = z.infer<typeof holdingSchema>

export function AddHoldingForm() {
  const [open, setOpen] = useState(false)
  const { addHolding } = usePortfolioStore()
  const { data: coins } = useCoins(50)

  const form = useForm<FormValues>({
    resolver: zodResolver(holdingSchema),
    defaultValues: {
      coinId: "",
      amount: 0,
      buyPrice: 0,
    },
  })

  const onSubmit = (data: FormValues) => {
    addHolding({
      coinId: data.coinId,
      amount: data.amount,
      purchasePrice: data.buyPrice,
      purchaseDate: new Date().toISOString(),
    })

    toast.success("Holding added successfully!")
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Holding
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Add Holding</DialogTitle>
          <DialogDescription>
            Add a cryptocurrency to your portfolio
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Coin Select */}
          <div className="space-y-2">
            <Label htmlFor="coinId">Coin</Label>
            <select
              id="coinId"
              {...form.register("coinId")}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a coin</option>
              {coins?.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </option>
              ))}
            </select>
            {form.formState.errors.coinId && (
              <p className="text-sm text-red-500">
                {form.formState.errors.coinId.message}
              </p>
            )}
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.00000001"
              placeholder="0.5"
              {...form.register("amount", { valueAsNumber: true })}
            />
            {form.formState.errors.amount && (
              <p className="text-sm text-red-500">
                {form.formState.errors.amount.message}
              </p>
            )}
          </div>

          {/* Buy Price */}
          <div className="space-y-2">
            <Label htmlFor="buyPrice">Buy Price (USD)</Label>
            <Input
              id="buyPrice"
              type="number"
              step="0.01"
              placeholder="50000"
              {...form.register("buyPrice", { valueAsNumber: true })}
            />
            {form.formState.errors.buyPrice && (
              <p className="text-sm text-red-500">
                {form.formState.errors.buyPrice.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Holding</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}