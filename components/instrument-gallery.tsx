"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { instruments } from "@/lib/instruments"
import type { Instrument, InstrumentCategory } from "@/lib/instruments"
import { InstrumentCard } from "@/components/instrument-card"
import { categoryLabels } from "@/lib/instruments"
import { KazakhOrnament } from "@/components/kazakh-ornament"

const ALL = "all"
type Filter = InstrumentCategory | typeof ALL

const filters: { key: Filter; label: string }[] = [
  { key: ALL,           label: "Барлығы" },
  { key: "string",      label: "Ішекті" },
  { key: "plucked",     label: "Шертіп ойналатын" },
  { key: "wind",        label: "Үрмелі" },
  { key: "percussion",  label: "Ұрмалы" },
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

      {/* Warm background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(200, 148, 42, 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Small ornament above heading */}
            <div className="flex justify-center mb-5">
              <KazakhOrnament size={48} variant="medallion" opacity={0.55} animated={false} />
            </div>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider mb-5"
              style={{
                background: "rgba(42, 123, 124, 0.08)",
                border: "1px solid rgba(42, 123, 124, 0.25)",
                color: "var(--turquoise)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--turquoise)" }}
              />
              Жинақ
            </div>

            <h2
              className="font-display text-4xl md:text-5xl font-bold text-balance mb-4"
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-playfair, serif)",
              }}
            >
              Аспаптар <span style={{ color: "var(--gold)" }}>мұрағаты</span>
            </h2>

            <p
              className="text-base max-w-xl mx-auto leading-relaxed"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-lora, serif)" }}
            >
              Қазақ даласының 8 қасиетті аспабы. Олардың әрқайсысы мыңжылдық тарихты,
              ритуалды және халықтың рухани мұрасын сақтайды.
            </p>

            {/* Decorative divider */}
            <div className="ornament-divider max-w-xs mx-auto mt-6" style={{ color: "var(--gold)" }}>
              <span style={{ fontSize: "1rem" }}>❧</span>
            </div>
          </motion.div>
        </div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-12 flex-wrap"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              id={`filter-${f.key}`}
              onClick={() => setActiveFilter(f.key)}
              className="relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background:
                  activeFilter === f.key
                    ? "rgba(200, 148, 42, 0.12)"
                    : "transparent",
                color:
                  activeFilter === f.key
                    ? "var(--gold)"
                    : "var(--text-muted)",
                border: `1px solid ${
                  activeFilter === f.key
                    ? "rgba(200, 148, 42, 0.45)"
                    : "rgba(158, 133, 114, 0.30)"
                }`,
                boxShadow:
                  activeFilter === f.key
                    ? "0 2px 12px rgba(200, 148, 42, 0.15)"
                    : "none",
              }}
            >
              {f.label}
              {activeFilter === f.key && (
                <motion.div
                  layoutId="gallery-filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "rgba(200, 148, 42, 0.06)",
                    border: "1px solid rgba(200, 148, 42, 0.35)",
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
          className="text-center mt-10 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          {instruments.length} аспаптың ішінен{" "}
          <span style={{ color: "var(--gold-muted)" }}>{filtered.length}</span>{" "}
          көрсетілуде
        </motion.p>
      </div>
    </section>
  )
}
