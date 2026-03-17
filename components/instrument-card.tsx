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

function CategoryIcon({ category }: { category: Instrument["category"] }) {
  if (category === "string" || category === "plucked") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
      </svg>
    )
  }
  if (category === "wind") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 8 Q4 5 8 8 Q12 11 14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="14" cy="8" r="1.5" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="2" fill="currentColor" />
    </svg>
  )
}

function InstrumentIllustration({ instrument }: { instrument: Instrument }) {
  const color = instrument.color

  if (instrument.id === "dombra") {
    return (
      <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
        {/* Body */}
        <ellipse cx="40" cy="85" rx="26" ry="30" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.2" />
        {/* Neck */}
        <rect x="36" y="20" width="8" height="65" rx="3" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1" />
        {/* Head */}
        <ellipse cx="40" cy="16" rx="7" ry="10" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1" />
        {/* Strings */}
        <line x1="38" y1="18" x2="38" y2="88" stroke={color} strokeWidth="0.8" strokeOpacity="0.8" />
        <line x1="42" y1="18" x2="42" y2="88" stroke={color} strokeWidth="0.8" strokeOpacity="0.6" />
        {/* Sound hole */}
        <circle cx="40" cy="82" r="6" fill="none" stroke={color} strokeWidth="0.8" strokeOpacity="0.5" />
        {/* Frets */}
        {[35, 42, 50, 58, 66].map((y) => (
          <line key={y} x1="36" y1={y} x2="44" y2={y} stroke={color} strokeWidth="0.6" strokeOpacity="0.5" />
        ))}
      </svg>
    )
  }

  if (instrument.id === "kobyz") {
    return (
      <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
        {/* Body - rounded bowl */}
        <path
          d="M20 75 Q15 95 40 110 Q65 95 60 75 Q55 55 40 52 Q25 55 20 75 Z"
          fill={color}
          fillOpacity="0.12"
          stroke={color}
          strokeWidth="1.2"
        />
        {/* Neck */}
        <rect x="37" y="18" width="6" height="38" rx="2" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1" />
        {/* Scroll */}
        <path d="M38 14 Q35 8 40 6 Q45 8 42 14" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="0.8" />
        {/* Strings */}
        <line x1="39" y1="16" x2="39" y2="95" stroke={color} strokeWidth="0.9" strokeOpacity="0.7" />
        <line x1="41" y1="16" x2="41" y2="95" stroke={color} strokeWidth="0.9" strokeOpacity="0.5" />
        {/* Bow arc hint */}
        <path d="M12 50 Q8 80 12 100" stroke={color} strokeWidth="1" strokeOpacity="0.3" fill="none" strokeDasharray="2 3" />
      </svg>
    )
  }

  if (instrument.id === "jetigen") {
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        {/* Sound box */}
        <rect x="15" y="60" width="70" height="25" rx="4" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.2" />
        {/* Bridge */}
        <line x1="15" y1="60" x2="85" y2="60" stroke={color} strokeWidth="1.5" />
        {/* Strings ascending */}
        {[20, 30, 40, 50, 60, 70, 80].map((x, i) => (
          <line key={x} x1={x} y1="60" x2={x} y2={10 + i * 4} stroke={color} strokeWidth="0.7" strokeOpacity={0.8 - i * 0.08} />
        ))}
        {/* Tuning pegs */}
        {[20, 30, 40, 50, 60, 70, 80].map((x, i) => (
          <circle key={x} cx={x} cy={10 + i * 4} r="2" fill={color} fillOpacity="0.6" />
        ))}
      </svg>
    )
  }

  if (instrument.id === "adyrna") {
    return (
      <svg width="90" height="120" viewBox="0 0 90 120" fill="none">
        {/* Sound box */}
        <path d="M10 100 Q10 115 30 115 L30 20 L10 100 Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.2" />
        {/* Column */}
        <line x1="30" y1="10" x2="80" y2="110" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        {/* Neck */}
        <line x1="30" y1="10" x2="30" y2="115" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
        {/* Strings */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const x1 = 30
          const y1 = 20 + i * 11
          const x2 = 30 + i * 6 + 8
          const y2 = 108 - i * 3
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.7" strokeOpacity={0.7 - i * 0.05} />
        })}
      </svg>
    )
  }

  if (instrument.id === "dangyra") {
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="38" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="2" />
        <circle cx="50" cy="50" r="28" fill={color} fillOpacity="0.05" stroke={color} strokeWidth="0.8" strokeDasharray="4 4" />
        {/* Jingles */}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const x = 50 + 38 * Math.cos(rad)
          const y = 50 + 38 * Math.sin(rad)
          return (
            <g key={angle}>
              <circle cx={x} cy={y} r="3.5" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="0.8" />
            </g>
          )
        })}
        {/* Handle */}
        <line x1="50" y1="88" x2="50" y2="105" stroke={color} strokeWidth="4" strokeLinecap="round" />
        {/* Cross pattern */}
        <line x1="20" y1="50" x2="80" y2="50" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="50" y1="20" x2="50" y2="80" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" />
        <circle cx="50" cy="50" r="6" fill={color} fillOpacity="0.3" />
      </svg>
    )
  }

  // Default illustration for shankobyz / syrnai / sherter
  return (
    <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
      <path
        d="M35 10 L35 90 Q35 105 45 108 Q55 110 55 100 L55 95 Q55 88 48 88 L45 88"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {[25, 40, 55, 70].map((y) => (
        <line key={y} x1="35" y1={y} x2="52" y2={y} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
      ))}
      <circle cx="37" cy="13" r="4" fill={color} fillOpacity="0.3" />
    </svg>
  )
}

export function InstrumentCard({ instrument, index, onPlay }: InstrumentCardProps) {
  const router = useRouter()

  const handlePlay = () => {
    if (onPlay) onPlay(instrument)
    router.push(`/studio/${instrument.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative rounded-sm overflow-hidden cursor-pointer"
      style={{
        background: "oklch(0.12 0.03 255 / 0.8)",
        border: "1px solid oklch(0.22 0.04 255)",
        backdropFilter: "blur(12px)",
      }}
      whileHover={{ y: -4 }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${instrument.glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Corner accents */}
      <div
        className="absolute top-0 left-0 w-4 h-4"
        style={{
          borderTop: `1px solid ${instrument.color}`,
          borderLeft: `1px solid ${instrument.color}`,
        }}
      />
      <div
        className="absolute top-0 right-0 w-4 h-4"
        style={{
          borderTop: `1px solid ${instrument.color}`,
          borderRight: `1px solid ${instrument.color}`,
        }}
      />

      <div className="relative p-6 flex flex-col h-full">
        {/* Header: category + era */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-sm text-xs tracking-wider uppercase"
            style={{
              background: `${instrument.color}18`,
              color: instrument.color,
              border: `1px solid ${instrument.color}40`,
            }}
          >
            <CategoryIcon category={instrument.category} />
            {categoryLabels[instrument.category]}
          </div>
          <span
            className="text-xs"
            style={{ color: "oklch(0.45 0.04 255)" }}
          >
            {instrument.era.split("—")[0].trim()}
          </span>
        </div>

        {/* Illustration */}
        <div className="flex items-center justify-center h-32 mb-5 relative">
          <motion.div
            className="animate-float"
            style={{ animationDelay: `${index * 0.3}s` }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <InstrumentIllustration instrument={instrument} />
          </motion.div>
        </div>

        {/* Name */}
        <div className="mb-1">
          <h3
            className="font-serif text-xl font-bold tracking-wide"
            style={{ color: instrument.color }}
          >
            {instrument.name}
          </h3>
          <p
            className="text-sm font-light tracking-widest"
            style={{ color: "oklch(0.55 0.04 255)" }}
          >
            {instrument.kazakh}
          </p>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mt-2 flex-1"
          style={{ color: "oklch(0.65 0.03 255)" }}
        >
          {instrument.description}
        </p>

        {/* Play button */}
        <motion.button
          onClick={handlePlay}
          className="mt-5 w-full py-2.5 rounded-sm text-sm font-semibold tracking-widest uppercase relative overflow-hidden"
          style={{
            background: "transparent",
            color: instrument.color,
            border: `1px solid ${instrument.color}60`,
          }}
          whileHover={{
            background: `${instrument.color}15`,
            boxShadow: `0 0 20px ${instrument.color}30`,
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <polygon points="3,2 11,7 3,12" />
            </svg>
            Play &amp; Learn
          </span>
        </motion.button>
      </div>
    </motion.div>
  )
}
