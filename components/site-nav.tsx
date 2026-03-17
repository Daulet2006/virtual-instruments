"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { KazakhOrnament } from "@/components/kazakh-ornament"

interface SiteNavProps {
  onEnterGallery: () => void
}

export function SiteNav({ onEnterGallery }: SiteNavProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 transition-all duration-300"
      style={{
        background: scrolled ? "oklch(0.09 0.025 255 / 0.92)" : "transparent",
        borderBottom: scrolled ? "1px solid oklch(0.20 0.04 255)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <KazakhOrnament size={28} variant="center" opacity={0.8} animated={false} />
        <div>
          <div
            className="font-serif text-sm font-bold tracking-wider"
            style={{ color: "var(--gold)" }}
          >
            Қазақ мұражайы
          </div>
          <div className="text-xs tracking-widest uppercase" style={{ color: "oklch(0.40 0.04 255)" }}>
            Виртуалды мұрағат
          </div>
        </div>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-6">
        {[
          { label: "Жинақ", href: "#gallery" },
          { label: "Біз туралы", href: "#about" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-xs tracking-widest uppercase font-semibold transition-colors"
            style={{ color: "oklch(0.50 0.04 255)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.50 0.04 255)")}
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={onEnterGallery}
          className="px-4 py-1.5 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all"
          style={{
            background: "oklch(0.78 0.16 75 / 0.12)",
            color: "var(--gold)",
            border: "1px solid oklch(0.78 0.16 75 / 0.35)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "oklch(0.78 0.16 75 / 0.2)"
            e.currentTarget.style.boxShadow = "0 0 16px oklch(0.78 0.16 75 / 0.3)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "oklch(0.78 0.16 75 / 0.12)"
            e.currentTarget.style.boxShadow = "none"
          }}
        >
          Шеберханаға кіру
        </button>
      </div>
    </motion.nav>
  )
}
