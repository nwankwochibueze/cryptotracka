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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* Gradient blob — lives inside navbar so it's never clipped */}
        <div className="absolute top-0 left-0 -z-10 pointer-events-none overflow-visible">
          <div className="w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <span className="font-bold text-xl">CoinPeek</span>
              </Link>
            </div>

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

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm md:hidden ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={closeMobileMenu}
            >
              <span className="font-bold text-xl">CoinPeek</span>
            </Link>
            <Button variant="ghost" onClick={closeMobileMenu}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <div className="mb-8">
              <SearchBar className="w-full" onResultClick={closeMobileMenu} />
            </div>
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start h-14 text-lg"
                asChild
              >
                <Link href="/markets" onClick={closeMobileMenu}>
                  <TrendingUp className="h-5 w-5 mr-3" />
                  Markets
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start h-14 text-lg"
                asChild
              >
                <Link href="/watchlist" onClick={closeMobileMenu}>
                  <Star className="h-5 w-5 mr-3" />
                  Watchlist
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start h-14 text-lg"
                asChild
              >
                <Link href="/portfolio" onClick={closeMobileMenu}>
                  <Wallet className="h-5 w-5 mr-3" />
                  Portfolio
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start h-14 text-lg"
                asChild
              >
                <Link href="/converter" onClick={closeMobileMenu}>
                  <ArrowRightLeft className="h-5 w-5 mr-3" />
                  Converter
                </Link>
              </Button>
            </nav>
          </div>
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
