"use client"

import { motion } from "framer-motion"
import { KazakhOrnament } from "@/components/kazakh-ornament"
import { ChevronDown } from "lucide-react"

interface HeroSectionProps {
  onEnter: () => void
}

export function HeroSection({ onEnter }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Background warm gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(240, 223, 168, 0.55) 0%, rgba(250, 246, 238, 0) 70%)",
        }}
      />

      {/* ── Subtle textile-like texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C8942A' fill-opacity='0.04'%3E%3Cpath d='M20 20 L26 14 L32 20 L26 26 Z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Corner ornaments ── */}
      {[ 
        { corner: "top-0 left-0",    transform: "none" },
        { corner: "top-0 right-0",   transform: "scaleX(-1)" },
        { corner: "bottom-0 left-0", transform: "scaleY(-1)" },
        { corner: "bottom-0 right-0",transform: "scale(-1,-1)" },
      ].map(({ corner, transform }, i) => (
        <motion.div
          key={corner}
          className={`absolute ${corner}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: i * 0.15, ease: "easeOut" }}
          style={{ transform }}
        >
          <KazakhOrnament size={160} variant="corner" opacity={0.40} animated={false} />
        </motion.div>
      ))}

      {/* ── Top border ornament strip ── */}
      <div className="absolute top-16 left-0 right-0 flex justify-center overflow-hidden">
        <KazakhOrnament width={900} height={24} variant="border" opacity={0.30} animated={false} />
      </div>
      <div className="absolute bottom-16 left-0 right-0 flex justify-center overflow-hidden">
        <KazakhOrnament width={900} height={24} variant="border" opacity={0.30} animated={false} />
      </div>

      {/* ── Large background medallion ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <KazakhOrnament size={560} variant="full" opacity={0.07} animated={false} />
      </div>

      {/* ── Slowly rotating center medallion ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          <KazakhOrnament size={300} variant="center" opacity={0.10} animated={false} />
        </motion.div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">

        {/* Museum badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mb-10"
        >
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-xs font-medium tracking-wider"
            style={{
              background: "rgba(200, 148, 42, 0.10)",
              border: "1px solid rgba(200, 148, 42, 0.32)",
              color: "var(--gold-muted)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--gold)", opacity: 0.85 }}
            />
            Виртуалды Мұражай · Қазақстан · 2025
          </div>
        </motion.div>

        {/* Main titles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.65 }}
          className="mb-6"
        >
          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
            style={{
              fontFamily: "var(--font-playfair, serif)",
              color: "var(--gold)",
            }}
          >
            Мұра
          </h1>
          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mt-1"
            style={{
              fontFamily: "var(--font-playfair, serif)",
              color: "transparent",
              WebkitTextStroke: "1.5px var(--turquoise)",
            }}
          >
            Қозғалыста
          </h1>
        </motion.div>

        {/* Ornament divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="ornament-divider w-full max-w-sm mb-8"
          style={{ color: "var(--gold)" }}
        >
          <span style={{ fontSize: "1.2rem" }}>✦</span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="text-base md:text-lg leading-relaxed max-w-xl"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-lora, serif)",
          }}
        >
          Қазақ даласының ежелгі музыкалық жанына саяхат жасаңыз. 
          Домбыра, қобыз, жетіген және тағы басқа аспаптарды зерттеңіз, 
          ойнаңыз және ашыңыз.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.25 }}
          className="flex items-center gap-10 mt-10 mb-12"
        >
          {[
            { value: "8",     label: "Аспап" },
            { value: "2000+", label: "Жылдық тарих" },
            { value: "∞",     label: "Мүмкіндіктер" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center">
              {i !== 0 && (
                <div className="absolute -left-5 h-8 w-px" style={{ background: "rgba(200,148,42,0.25)" }} />
              )}
              <span
                className="font-display text-3xl font-bold"
                style={{
                  color: "var(--gold)",
                  fontFamily: "var(--font-playfair, serif)",
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs tracking-wider uppercase mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.45 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onEnter}
          className="btn-cultural relative group px-10 py-4 rounded-full font-semibold text-base overflow-hidden"
          style={{
            background: "linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-muted) 100%)",
            color: "var(--ivory)",
            boxShadow: "0 6px 30px rgba(200, 148, 42, 0.35), 0 2px 8px rgba(107, 76, 48, 0.20)",
            fontFamily: "var(--font-lora, serif)",
          }}
        >
          <span className="relative z-10 flex items-center gap-3">
            Шеберханаға кіру
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </span>
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-16 flex flex-col items-center gap-2"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="text-xs tracking-wider uppercase">
            Зерттеу үшін айналдырыңыз
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
