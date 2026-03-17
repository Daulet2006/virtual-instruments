"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { instruments } from "@/lib/instruments"
import type { Instrument, InstrumentCategory } from "@/lib/instruments"
import { InstrumentCard } from "@/components/instrument-card"
import { categoryLabels } from "@/lib/instruments"

const ALL = "all"
type Filter = InstrumentCategory | typeof ALL

const filters: { key: Filter; label: string }[] = [
  { key: ALL, label: "Барлығы" },
  { key: "string", label: "Ішекті" },
  { key: "plucked", label: "Шертіп ойналатын" },
  { key: "wind", label: "Үрмелі" },
  { key: "percussion", label: "Ұрмалы" },
]

interface InstrumentGalleryProps {
  onSelectInstrument: (instrument: Instrument) => void
}

export function InstrumentGallery({ onSelectInstrument }: InstrumentGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>(ALL)

  const filtered =
    activeFilter === ALL
      ? instruments
      : instruments.filter((i) => i.category === activeFilter)

  return (
    <section className="relative py-24 px-6" id="gallery">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 50%, oklch(0.14 0.04 255 / 0.4) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-xs tracking-widest uppercase mb-6"
              style={{
                border: "1px solid oklch(0.55 0.18 255 / 0.3)",
                background: "oklch(0.55 0.18 255 / 0.06)",
                color: "oklch(0.68 0.20 240)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "oklch(0.68 0.20 240)", boxShadow: "0 0 6px oklch(0.68 0.20 240)" }}
              />
              Жинақ
            </div>
            <h2
              className="font-serif text-4xl md:text-5xl font-bold text-balance"
              style={{ color: "var(--gold)" }}
            >
              Аспаптар мұрағаты
            </h2>
            <p
              className="mt-4 text-base max-w-xl mx-auto leading-relaxed"
              style={{ color: "oklch(0.60 0.03 255)" }}
            >
              Қазақ даласының 8 қасиетті аспабы. Олардың әрқайсысы мыңжылдық тарихты, ритуалды және көркем көріністі сақтайды.
            </p>
          </motion.div>
        </div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-10 flex-wrap"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className="relative px-4 py-1.5 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all"
              style={{
                background:
                  activeFilter === f.key
                    ? "oklch(0.78 0.16 75 / 0.12)"
                    : "transparent",
                color:
                  activeFilter === f.key
                    ? "var(--gold)"
                    : "oklch(0.45 0.04 255)",
                border: `1px solid ${activeFilter === f.key ? "oklch(0.78 0.16 75 / 0.4)" : "oklch(0.22 0.04 255)"}`,
                boxShadow:
                  activeFilter === f.key
                    ? "0 0 12px oklch(0.78 0.16 75 / 0.2)"
                    : "none",
              }}
            >
              {f.label}
              {activeFilter === f.key && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-sm"
                  style={{
                    background: "oklch(0.78 0.16 75 / 0.06)",
                    border: "1px solid oklch(0.78 0.16 75 / 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map((instrument, i) => (
            <InstrumentCard
              key={instrument.id}
              instrument={instrument}
              index={i}
              onPlay={onSelectInstrument}
            />
          ))}
        </motion.div>

        {/* Count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8 text-xs tracking-widest uppercase"
          style={{ color: "oklch(0.30 0.04 255)" }}
        >
          {instruments.length} аспаптың {filtered.length} көрсетілуде
        </motion.p>
      </div>
    </section>
  )
}
