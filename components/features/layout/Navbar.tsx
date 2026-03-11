"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
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

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <SearchBar />
              </div>
              <ThemeToggle />
              <Button
                variant="ghost"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
