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
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(250, 246, 238, 0.92)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(200, 148, 42, 0.20)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled
          ? "0 2px 20px rgba(107, 76, 48, 0.08)"
          : "none",
      }}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <KazakhOrnament size={30} variant="medallion" opacity={0.75} animated={false} />
        <div>
          <div
            className="font-display text-sm font-bold leading-tight"
            style={{ color: "var(--gold)", fontFamily: "var(--font-playfair, serif)" }}
          >
            Қазақ Мұражайы
          </div>
          <div
            className="text-xs tracking-wider uppercase"
            style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}
          >
            Виртуалды Мұрағат
          </div>
        </div>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-6">
        {[
          { label: "Жинақ", href: "#gallery" },
          { label: "Тарих", href: "#about" },
          { label: "Мәдениет", href: "#culture" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm font-medium transition-colors duration-250"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--gold)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            {link.label}
          </a>
        ))}

        <motion.button
          onClick={onEnterGallery}
          className="btn-cultural px-5 py-2 rounded-full text-sm font-semibold transition-all"
          style={{
            background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-muted) 100%)",
            color: "var(--ivory)",
            boxShadow: "0 2px 12px rgba(200, 148, 42, 0.28)",
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Шеберханаға кіру
        </motion.button>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Мәзір"
        style={{ color: "var(--gold)" }}
      >
        <span className="block w-6 h-0.5 rounded-full" style={{ background: "var(--gold)" }} />
        <span className="block w-4 h-0.5 rounded-full" style={{ background: "var(--gold)" }} />
        <span className="block w-6 h-0.5 rounded-full" style={{ background: "var(--gold)" }} />
      </button>
    </motion.nav>
  )
}
