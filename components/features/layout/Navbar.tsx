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
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-sm border-b border-border"
            : "bg-transparent"
        }`}
      ></header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden ${
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
            <Button
              variant="ghost"
              onClick={closeMobileMenu}
              aria-label="Close navigation menu"
            >
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
