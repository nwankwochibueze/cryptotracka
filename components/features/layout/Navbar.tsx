// components/features/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/features/common/ThemeToggle";
import { SearchBar } from "@/components/features/search/SearchBar"; // Ensure this path is correct
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

  // Helper function to close the mobile menu
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-transparent border-b border-b-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left Side: Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <span className="font-bold text-xl">CoinPeek</span>
              </Link>
            </div>

            {/* Center: Navigation Links */}
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

            {/* Right Side: Search, Theme Toggle, and Mobile Menu Button */}
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <SearchBar /> {/* Desktop SearchBar - no callback needed */}
              </div>

              <ThemeToggle />

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
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
              <span className="font-bold text-xl">CoinPeek</span>
            </Link>
            <Button variant="ghost" onClick={closeMobileMenu} aria-label="Close navigation menu">
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-auto p-6">
            {/* --- CHANGE 3: Pass the closeMobileMenu function to SearchBar --- */}
            <div className="mb-8">
              <SearchBar className="w-full" onResultClick={closeMobileMenu} />
            </div>

            {/* Navigation Links */}
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start h-14 text-lg" asChild>
                <Link href="/markets" onClick={closeMobileMenu}>
                  <TrendingUp className="h-5 w-5 mr-3" />
                  Markets
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-14 text-lg" asChild>
                <Link href="/watchlist" onClick={closeMobileMenu}>
                  <Star className="h-5 w-5 mr-3" />
                  Watchlist
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-14 text-lg" asChild>
                <Link href="/portfolio" onClick={closeMobileMenu}>
                  <Wallet className="h-5 w-5 mr-3" />
                  Portfolio
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-14 text-lg" asChild>
                <Link href="/converter" onClick={closeMobileMenu}>
                  <ArrowRightLeft className="h-5 w-5 mr-3" />
                  Converter
                </Link>
              </Button>
            </nav>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-border">
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}