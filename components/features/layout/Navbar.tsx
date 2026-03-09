// components/features/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/features/common/ThemeToggle";
import { SearchBar } from "@/components/features/search/SearchBar";
import {
  TrendingUp,
  Star,
  Wallet,
  ArrowRightLeft,
  Menu,
  X,
} from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Side: Logo and Nav Links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              {/* <TrendingUp className="h-6 w-6" /> */}
              <span className="font-bold text-xl">CoinPeek</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Button variant="ghost" asChild>
                <Link href="/markets">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Markets
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/watchlist">
                  <Star className="h-4 w-4 mr-2" />
                  Watchlist
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/portfolio">
                  <Wallet className="h-4 w-4 mr-2" />
                  Portfolio
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/converter">
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  Converter
                </Link>
              </Button>
            </nav>
          </div>

          {/* Right Side: Search, Theme Toggle, and Mobile Menu Button */}
          <div className="flex items-center gap-2">
            {/* SearchBar for desktop and larger screens */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            <ThemeToggle />

            {/* Mobile Menu Hamburger Button */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* --- ADD SEARCH BAR FOR MOBILE HERE --- */}
              <SearchBar className="w-full" />

              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Markets
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/watchlist" onClick={() => setMobileMenuOpen(false)}>
                  <Star className="h-4 w-4 mr-2" />
                  Watchlist
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)}>
                  <Wallet className="h-4 w-4 mr-2" />
                  Portfolio
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/converter" onClick={() => setMobileMenuOpen(false)}>
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  Converter
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}