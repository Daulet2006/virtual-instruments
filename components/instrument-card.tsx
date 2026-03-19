"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import type { Instrument } from "@/lib/instruments"
import { categoryLabels } from "@/lib/instruments"

interface InstrumentCardProps {
  instrument: Instrument
  index: number
  onPlay?: (instrument: Instrument) => void
}

/* ── Category icon (warm aesthetic) ── */
function CategoryIcon({ category }: { category: Instrument["category"] }) {
  if (category === "string" || category === "plucked") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <line x1="1" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1"   strokeLinecap="round"/>
        <line x1="1" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round"/>
      </svg>
    )
  }
  if (category === "wind") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1 7 Q4 3 7 7 Q10 11 13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <circle cx="13" cy="7" r="1.5" fill="currentColor"/>
      </svg>
    )
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="7" cy="7" r="2" fill="currentColor"/>
    </svg>
  )
}

/* ── Instrument SVG illustrations ── */
function InstrumentIllustration({ instrument }: { instrument: Instrument }) {
  const c = instrument.warmColor ?? instrument.color

  if (instrument.id === "dombra") {
    return (
      <svg width="72" height="120" viewBox="0 0 72 120" fill="none">
        <ellipse cx="36" cy="85" rx="24" ry="28"
          fill={c} fillOpacity="0.10" stroke={c} strokeWidth="1.4"/>
        {/* Neck */}
        <rect x="32" y="20" width="8" height="65" rx="4"
          fill={c} fillOpacity="0.12" stroke={c} strokeWidth="1"/>
        {/* Head */}
        <ellipse cx="36" cy="16" rx="7" ry="10"
          fill={c} fillOpacity="0.22" stroke={c} strokeWidth="1"/>
        {/* Tuning pegs */}
        <circle cx="30" cy="12" r="2" fill={c} fillOpacity="0.55"/>
        <circle cx="42" cy="12" r="2" fill={c} fillOpacity="0.55"/>
        {/* Strings */}
        <line x1="34.5" y1="16" x2="34.5" y2="88" stroke={c} strokeWidth="0.7" strokeOpacity="0.80"/>
        <line x1="37.5" y1="16" x2="37.5" y2="88" stroke={c} strokeWidth="0.7" strokeOpacity="0.60"/>
        {/* Sound hole */}
        <circle cx="36" cy="80" r="6" fill="none" stroke={c} strokeWidth="0.8" strokeOpacity="0.50"/>
        {/* Frets */}
        {[34, 42, 52, 62, 72].map((y) => (
          <line key={y} x1="32" y1={y} x2="40" y2={y}
            stroke={c} strokeWidth="0.6" strokeOpacity="0.45"/>
        ))}
        {/* Decorative soundhole ornament */}
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const r = (a * Math.PI) / 180
          return <circle key={a} cx={36 + 6 * Math.cos(r)} cy={80 + 6 * Math.sin(r)}
            r="0.8" fill={c} fillOpacity="0.40"/>
        })}
      </svg>
    )
  }

  if (instrument.id === "kobyz") {
    return (
      <svg width="72" height="120" viewBox="0 0 72 120" fill="none">
        {/* Pear-shaped body */}
        <path d="M18 72 Q12 95 36 112 Q60 95 54 72 Q50 52 36 50 Q22 52 18 72 Z"
          fill={c} fillOpacity="0.10" stroke={c} strokeWidth="1.4"/>
        {/* Neck */}
        <rect x="33" y="18" width="6" height="36" rx="3"
          fill={c} fillOpacity="0.18" stroke={c} strokeWidth="1"/>
        {/* Scroll */}
        <path d="M34 14 Q31 6 36 4 Q41 6 38 14"
          fill={c} fillOpacity="0.30" stroke={c} strokeWidth="0.9"/>
        {/* Strings */}
        <line x1="35" y1="14" x2="35" y2="96" stroke={c} strokeWidth="0.8" strokeOpacity="0.70"/>
        <line x1="37" y1="14" x2="37" y2="96" stroke={c} strokeWidth="0.8" strokeOpacity="0.50"/>
        {/* Bow */}
        <path d="M10 48 Q6 80 10 102"
          stroke={c} strokeWidth="1.2" strokeOpacity="0.35" fill="none" strokeDasharray="3 4"/>
        {/* Membrane markings */}
        <ellipse cx="36" cy="80" rx="14" ry="8" fill="none"
          stroke={c} strokeWidth="0.6" strokeOpacity="0.30" strokeDasharray="2 3"/>
      </svg>
    )
  }

  if (instrument.id === "jetigen") {
    return (
      <svg width="110" height="90" viewBox="0 0 110 90" fill="none">
        {/* Sound box */}
        <rect x="10" y="60" width="90" height="24" rx="5"
          fill={c} fillOpacity="0.10" stroke={c} strokeWidth="1.4"/>
        {/* Ascending strings */}
        {[16, 28, 40, 52, 64, 76, 88].map((x, i) => (
          <line key={x} x1={x} y1="60" x2={x} y2={8 + i * 5}
            stroke={c} strokeWidth="0.75" strokeOpacity={0.85 - i * 0.08}/>
        ))}
        {/* Tuning pegs */}
        {[16, 28, 40, 52, 64, 76, 88].map((x, i) => (
          <circle key={x} cx={x} cy={8 + i * 5} r="2.5"
            fill={c} fillOpacity="0.55"/>
        ))}
        {/* Bridge line */}
        <line x1="10" y1="60" x2="100" y2="60" stroke={c} strokeWidth="1.8"/>
        {/* Small nut markers */}
        {[16, 28, 40, 52, 64, 76, 88].map((x) => (
          <rect key={x} x={x - 2} y="57" width="4" height="4" rx="1"
            fill={c} fillOpacity="0.35"/>
        ))}
      </svg>
    )
  }

  if (instrument.id === "adyrna") {
    return (
      <svg width="90" height="120" viewBox="0 0 90 120" fill="none">
        {/* Sound box curved */}
        <path d="M8 100 Q8 116 26 116 L26 18 L8 100 Z"
          fill={c} fillOpacity="0.12" stroke={c} strokeWidth="1.4"/>
        {/* Column */}
        <line x1="26" y1="8" x2="80" y2="112"
          stroke={c} strokeWidth="3" strokeLinecap="round"/>
        {/* Neck post */}
        <line x1="26" y1="8" x2="26" y2="116"
          stroke={c} strokeWidth="1.6" strokeOpacity="0.55"/>
        {/* Strings */}
        {Array.from({ length: 8 }).map((_, i) => {
          const x1 = 26, y1 = 18 + i * 11
          const x2 = 26 + i * 7 + 6
          const y2 = 110 - i * 4
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={c} strokeWidth="0.8" strokeOpacity={0.75 - i * 0.06}/>
        })}
        {/* Peg circles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} cx="26" cy={18 + i * 11} r="2.5"
            fill={c} fillOpacity="0.40"/>
        ))}
      </svg>
    )
  }

  if (instrument.id === "dangyra") {
    return (
      <svg width="100" height="110" viewBox="0 0 100 110" fill="none">
        {/* Frame drum */}
        <circle cx="50" cy="50" r="38"
          fill={c} fillOpacity="0.08" stroke={c} strokeWidth="2.5"/>
        {/* Inner skin */}
        <circle cx="50" cy="50" r="30"
          fill={c} fillOpacity="0.05" stroke={c} strokeWidth="0.8" strokeDasharray="5 5"/>
        {/* Jingles */}
        {[0, 51.4, 102.9, 154.3, 205.7, 257.1, 308.6].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const x = 50 + 38 * Math.cos(rad)
          const y = 50 + 38 * Math.sin(rad)
          return (
            <g key={angle}>
              <circle cx={x} cy={y} r="4" fill={c} fillOpacity="0.50" stroke={c} strokeWidth="0.8"/>
            </g>
          )
        })}
        {/* Decorative cross-weave */}
        <line x1="18" y1="50" x2="82" y2="50" stroke={c} strokeWidth="0.7" strokeOpacity="0.25"/>
        <line x1="50" y1="18" x2="50" y2="82" stroke={c} strokeWidth="0.7" strokeOpacity="0.25"/>
        <line x1="23" y1="23" x2="77" y2="77" stroke={c} strokeWidth="0.5" strokeOpacity="0.18"/>
        <line x1="77" y1="23" x2="23" y2="77" stroke={c} strokeWidth="0.5" strokeOpacity="0.18"/>
        {/* Center ornament */}
        <circle cx="50" cy="50" r="8" fill={c} fillOpacity="0.22" stroke={c} strokeWidth="0.8"/>
        <circle cx="50" cy="50" r="3" fill={c} fillOpacity="0.60"/>
        {/* Handle */}
        <rect x="46" y="88" width="8" height="18" rx="4"
          fill={c} fillOpacity="0.50" stroke={c} strokeWidth="1"/>
      </svg>
    )
  }

  /* Default - sherter / generic */
  return (
    <svg width="72" height="120" viewBox="0 0 72 120" fill="none">
      <path d="M32 10 L32 88 Q32 106 44 108 Q56 110 56 98 L56 93 Q56 86 48 86 L44 86"
        stroke={c} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      {[24, 40, 58, 76].map((y) => (
        <line key={y} x1="32" y1={y} x2="52" y2={y}
          stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.70"/>
      ))}
      <circle cx="34" cy="13" r="5" fill={c} fillOpacity="0.30"/>
    </svg>
  )
}

/* ── Main card ── */
export function InstrumentCard({ instrument, index, onPlay }: InstrumentCardProps) {
  const router = useRouter()

  const handlePlay = () => {
    if (onPlay) onPlay(instrument)
    router.push(`/studio/${instrument.id}`)
  }

  /* Map each instrument to warm-palette color */
  const warmColor = instrument.warmColor ?? instrument.color

  return (
    <motion.article
      id={`instrument-card-${instrument.id}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.09 }}
      className="card-lift group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "var(--ivory)",
        border: "1px solid rgba(200, 148, 42, 0.18)",
        boxShadow: "var(--shadow-card)",
      }}
      whileHover={{ y: -5 }}
    >
      {/* Warm accent top band */}
      <div
        className="h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${warmColor}30, ${warmColor}80, ${warmColor}30)`,
        }}
      />

      {/* Subtle hover sheen */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${warmColor}10 0%, transparent 70%)`,
        }}
      />

      <div className="relative p-6 flex flex-col h-full">

        {/* Category badge + era */}
        <div className="flex items-center justify-between mb-5">
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: `${warmColor}14`,
              color: warmColor,
              border: `1px solid ${warmColor}35`,
            }}
          >
            <CategoryIcon category={instrument.category} />
            {categoryLabels[instrument.category]}
          </div>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {instrument.era.split("—")[0].trim()}
          </span>
        </div>

        {/* Illustration */}
        <div className="flex items-center justify-center h-32 mb-6 relative">
          <motion.div
            className="animate-gentle-float"
            style={{ animationDelay: `${index * 0.35}s` }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 280 }}
          >
            <InstrumentIllustration instrument={{ ...instrument, warmColor }} />
          </motion.div>
        </div>

        {/* Name */}
        <div className="mb-2">
          <h3
            className="font-display text-xl font-bold"
            style={{
              color: warmColor,
              fontFamily: "var(--font-playfair, serif)",
            }}
          >
            {instrument.name}
          </h3>
          <p
            className="text-sm mt-0.5"
            style={{
              color: "var(--text-muted)",
              fontStyle: "italic",
              fontFamily: "var(--font-lora, serif)",
            }}
          >
            {instrument.kazakh}
          </p>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mt-2 flex-1"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-lora, serif)",
          }}
        >
          {instrument.description}
        </p>

        {/* Divider */}
        <div
          className="my-4 h-px"
          style={{ background: "rgba(200, 148, 42, 0.15)" }}
        />

        {/* Play button */}
        <motion.button
          id={`play-${instrument.id}`}
          onClick={handlePlay}
          className="btn-cultural w-full py-2.5 rounded-full text-sm font-semibold overflow-hidden"
          style={{
            background: `${warmColor}12`,
            color: warmColor,
            border: `1px solid ${warmColor}45`,
          }}
          whileHover={{
            background: `${warmColor}22`,
            boxShadow: `0 4px 18px ${warmColor}28`,
          }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="flex items-center justify-center gap-2">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
              <polygon points="2,1 11,6.5 2,12"/>
            </svg>
            Ойнап зерттеу
          </span>
        </motion.button>
      </div>
    </motion.article>
  )
}
