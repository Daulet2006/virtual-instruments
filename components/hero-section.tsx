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
      {/* Background grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.55 0.18 255 / 0.06) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.55 0.18 255 / 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.18 0.05 255 / 0.5) 0%, transparent 70%)",
        }}
      />

      {/* Animated corner ornaments */}
      <motion.div
        className="absolute top-0 left-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <KazakhOrnament size={180} variant="corner" opacity={0.5} animated={false} />
      </motion.div>
      <motion.div
        className="absolute top-0 right-0 scale-x-[-1]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        style={{ transform: "scaleX(-1)" }}
      >
        <KazakhOrnament size={180} variant="corner" opacity={0.5} animated={false} />
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
        style={{ transform: "scaleY(-1)" }}
      >
        <KazakhOrnament size={180} variant="corner" opacity={0.5} animated={false} />
      </motion.div>
      <motion.div
        className="absolute bottom-0 right-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
        style={{ transform: "scale(-1,-1)" }}
      >
        <KazakhOrnament size={180} variant="corner" opacity={0.5} animated={false} />
      </motion.div>

      {/* Border ornament strips */}
      <div className="absolute top-20 left-0 right-0 flex justify-center">
        <KazakhOrnament size={800} variant="border" opacity={0.25} animated={false} />
      </div>
      <div className="absolute bottom-20 left-0 right-0 flex justify-center">
        <KazakhOrnament size={800} variant="border" opacity={0.25} animated={false} />
      </div>

      {/* Large background ornament */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <KazakhOrnament size={600} variant="full" opacity={0.08} animated={false} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <KazakhOrnament size={380} variant="center" opacity={0.12} animated />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Museum badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-xs tracking-widest uppercase"
            style={{
              border: "1px solid oklch(0.78 0.16 75 / 0.4)",
              background: "oklch(0.78 0.16 75 / 0.08)",
              color: "var(--gold)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--gold)" }}
            />
            Виртуалды мұражай · Қазақстан · 2025 ж. құрылған
          </div>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-balance mb-4 glow-text-gold"
            style={{ color: "var(--gold)" }}
          >
            Мұра
          </h1>
          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-balance glow-text-blue"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px oklch(0.68 0.20 240)",
              textShadow: "0 0 40px oklch(0.68 0.20 240 / 0.4)",
            }}
          >
            Қозғалыста
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="mt-8 text-lg md:text-xl text-balance leading-relaxed max-w-2xl"
          style={{ color: "oklch(0.72 0.04 255)" }}
        >
          Қазақ даласының ежелгі музыкалық жанына саяхат жасаңыз. Жасанды интеллектпен жұмыс істейтін иммерсивті виртуалды мұражай тәжірибесі арқылы 8 қасиетті аспапты ойнаңыз, зерттеңіз және ашыңыз.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex items-center gap-8 mt-10 mb-12"
        >
          {[
            { value: "8", label: "Аспап" },
            { value: "2000+", label: "Жылдық тарих" },
            { value: "∞", label: "Мүмкіндіктер" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span
                className="font-serif text-3xl font-bold"
                style={{ color: "var(--gold)" }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs tracking-widest uppercase mt-1"
                style={{ color: "oklch(0.55 0.04 255)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onEnter}
          className="relative group px-10 py-4 rounded-sm font-semibold tracking-widest uppercase text-sm overflow-hidden"
          style={{
            background: "linear-gradient(135deg, oklch(0.78 0.16 75) 0%, oklch(0.65 0.13 75) 100%)",
            color: "oklch(0.10 0.025 255)",
            boxShadow: "0 0 30px oklch(0.78 0.16 75 / 0.4), 0 0 60px oklch(0.78 0.16 75 / 0.15)",
          }}
        >
          <span className="relative z-10 flex items-center gap-3">
            Шеберханаға кіру
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-base"
            >
              →
            </motion.span>
          </span>
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, oklch(1 0 0 / 0.2) 50%, transparent 60%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-16 flex flex-col items-center gap-2"
          style={{ color: "oklch(0.45 0.04 255)" }}
        >
          <span className="text-xs tracking-widest uppercase">Зерттеу үшін төмен айналдырыңыз</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </div>

      {/* Scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-20"
        aria-hidden="true"
      >
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, oklch(0.68 0.20 240 / 0.6), transparent)" }}
          animate={{ y: ["0vh", "100vh"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </section>
  )
}
