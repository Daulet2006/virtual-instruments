"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Instrument, InstrumentString } from "@/lib/instruments"
import type { Point } from "@/components/camera-view"

interface InteractiveInstrumentProps {
  instrument: Instrument
  onPlayNote: (frequency: number, stringId: string) => void
  activeNotes: Set<string>
  handLandmarks?: Point[] | null
  learningMode?: boolean
}

function StringVibrateEffect({ active, color }: { active: boolean; color: string }) {
  if (!active) return null
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.8, 0, 0.6, 0, 0.4, 0] }}
      transition={{ duration: 0.8, times: [0, 0.15, 0.3, 0.45, 0.6, 1] }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: "blur(4px)",
        }}
      />
    </motion.div>
  )
}

function DombraInstrument({ instrument, onPlayNote, activeNotes, handLandmarks, learningMode }: InteractiveInstrumentProps) {
  const strings = instrument.strings || []

  // Track previous landmarks to detect intersection
  const prevTipsRef = useRef<Point[]>([])

  useEffect(() => {
    if (!handLandmarks) return
    const tips = [4, 8, 12, 16, 20] // Fingertips
    const currentTips = tips.map(i => handLandmarks[i]).filter(Boolean)
    const prevTips = prevTipsRef.current

    if (prevTips.length > 0) {
      strings.forEach((str, i) => {
        const stringX = (87 + i * 6) / 180

        for (let t = 0; t < tips.length; t++) {
          const prev = prevTips[t]
          const curr = currentTips[t]
          const minX = Math.min(prev.x, curr.x)
          const maxX = Math.max(prev.x, curr.x)
          const crossing = stringX >= minX && stringX <= maxX
          const dist = Math.abs(curr.x - prev.x)

          if (crossing && dist > 0.01 && !activeNotes.has(`${str.frequency}`)) {
            const stringTop = 62 / 340
            const stringBottom = 242 / 340
            if (curr.y >= stringTop && curr.y <= stringBottom) {
              onPlayNote(str.frequency, str.id)
            }
          }
        }
      })
    }
    prevTipsRef.current = currentTips
  }, [handLandmarks, strings, onPlayNote, activeNotes])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <svg width="180" height="340" viewBox="0 0 180 340" fill="none" className="drop-shadow-2xl">
        {/* Body shadow */}
        <ellipse cx="90" cy="260" rx="65" ry="70" fill="oklch(0.06 0.02 255 / 0.5)" />
        {/* Body */}
        <ellipse cx="90" cy="255" rx="62" ry="67"
          fill="oklch(0.14 0.04 255)"
          stroke={instrument.color}
          strokeWidth="1.5"
        />
        {/* Body grain lines */}
        {[-30, -15, 0, 15, 30].map((x) => (
          <line key={x} x1={90 + x} y1="195" x2={90 + x * 0.6} y2="315"
            stroke={instrument.color} strokeWidth="0.3" strokeOpacity="0.2" />
        ))}
        {/* Sound hole */}
        <circle cx="90" cy="250" r="18"
          fill="oklch(0.08 0.02 255)"
          stroke={instrument.color}
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        {/* Decorative ring around sound hole */}
        <circle cx="90" cy="250" r="22" fill="none" stroke={instrument.color} strokeWidth="0.5" strokeDasharray="3 3" strokeOpacity="0.4" />
        {/* Neck */}
        <rect x="82" y="50" width="16" height="150" rx="5"
          fill="oklch(0.13 0.03 255)"
          stroke={instrument.color}
          strokeWidth="1"
        />
        {/* Frets */}
        {[70, 90, 110, 130, 150, 170].map((y) => (
          <rect key={y} x="82" y={y} width="16" height="2" rx="1"
            fill={instrument.color}
            fillOpacity="0.5"
          />
        ))}
        {/* Nut */}
        <rect x="82" y="60" width="16" height="3" rx="1" fill={instrument.color} fillOpacity="0.8" />
        {/* Head */}
        <ellipse cx="90" cy="35" rx="18" ry="28"
          fill="oklch(0.12 0.03 255)"
          stroke={instrument.color}
          strokeWidth="1.2"
        />
        {/* Tuning pegs */}
        <circle cx="80" cy="24" r="4" fill={instrument.color} fillOpacity="0.6" />
        <circle cx="100" cy="24" r="4" fill={instrument.color} fillOpacity="0.6" />
        <circle cx="80" cy="40" r="3" fill={instrument.color} fillOpacity="0.4" />
        <circle cx="100" cy="40" r="3" fill={instrument.color} fillOpacity="0.4" />
        {/* Interactive strings */}
        {strings.map((str, i) => {
          const x = 87 + i * 6
          const isActive = activeNotes.has(`${str.frequency}`)
          return (
            <g key={str.id}>
              {/* Invisible click zone */}
              <rect
                x={x - 8}
                y="62"
                width="16"
                height="180"
                fill="transparent"
                className="cursor-pointer"
                onClick={() => onPlayNote(str.frequency, str.id)}
              />
              {/* String */}
              <motion.line
                x1={x} y1="62" x2={x} y2="242"
                stroke={learningMode ? "var(--gold)" : str.color}
                strokeWidth={isActive ? 1.5 : (learningMode ? 2 : 1)}
                strokeOpacity={isActive ? 1 : (learningMode ? 0.9 : 0.7)}
                animate={isActive ? {
                  x1: [x - 3, x + 3, x - 2, x + 2, x],
                  x2: [x + 3, x - 3, x + 2, x - 2, x],
                } : { x1: x, x2: x }}
                transition={{ duration: 0.4 }}
              />
              {/* Glow when active */}
              {isActive && (
                <motion.line
                  x1={x} y1="62" x2={x} y2="242"
                  stroke={str.color}
                  strokeWidth="6"
                  strokeOpacity="0.3"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  style={{ filter: `drop-shadow(0 0 6px ${str.color})` }}
                />
              )}
            </g>
          )
        })}
        {/* Bridge */}
        <rect x="84" y="240" width="12" height="4" rx="1" fill={instrument.color} fillOpacity="0.7" />
      </svg>
      <p className="text-xs tracking-widest uppercase mt-4" style={{ color: "oklch(0.50 0.04 255)" }}>
        Click strings to play
      </p>
    </div>
  )
}

function JetigenInstrument({ instrument, onPlayNote, activeNotes, handLandmarks, learningMode }: InteractiveInstrumentProps) {
  const strings = instrument.strings || []
  const prevTipsRef = useRef<Point[]>([])

  useEffect(() => {
    if (!handLandmarks) return
    const tips = [4, 8, 12, 16, 20]
    const currentTips = tips.map(i => handLandmarks[i])
    const prevTips = prevTipsRef.current

    if (prevTips.length > 0) {
      strings.forEach((str, i) => {
        const stringX = (35 + i * 38) / 320

        for (let t = 0; t < tips.length; t++) {
          const prev = prevTips[t]
          const curr = currentTips[t]
          const minX = Math.min(prev.x, curr.x)
          const maxX = Math.max(prev.x, curr.x)
          const crossing = stringX >= minX && stringX <= maxX
          const dist = Math.abs(curr.x - prev.x)

          if (crossing && dist > 0.001) {
            const topY = 20 + i * 10
            const stringTop = topY / 220
            const stringBottom = 140 / 220
            if (curr.y >= stringTop && curr.y <= stringBottom) {
              onPlayNote(str.frequency, str.id)
            }
          }
        }
      })
    }
    prevTipsRef.current = currentTips
  }, [handLandmarks, strings, onPlayNote, activeNotes])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <svg width="320" height="220" viewBox="0 0 320 220" fill="none" className="drop-shadow-2xl">
        {/* Sound box */}
        <rect x="20" y="140" width="280" height="60" rx="8"
          fill="oklch(0.13 0.03 255)"
          stroke={instrument.color}
          strokeWidth="1.5"
        />
        {/* Bridge */}
        <rect x="20" y="138" width="280" height="5" rx="2"
          fill={instrument.color}
          fillOpacity="0.8"
        />
        {/* Grain lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={30 + i * 35} y1="143" x2={30 + i * 35} y2="198"
            stroke={instrument.color} strokeWidth="0.4" strokeOpacity="0.15" />
        ))}
        {/* Sound holes */}
        <ellipse cx="160" cy="170" rx="20" ry="8" fill="oklch(0.08 0.02 255)" stroke={instrument.color} strokeWidth="0.8" strokeOpacity="0.4" />
        {/* Strings */}
        {strings.map((str, i) => {
          const x = 35 + i * 38
          const topY = 20 + i * 10
          const isActive = activeNotes.has(`${str.frequency}`)
          return (
            <g key={str.id}>
              <rect
                x={x - 12}
                y={topY}
                width="24"
                height={140 - topY}
                fill="transparent"
                className="cursor-pointer"
                onClick={() => onPlayNote(str.frequency, str.id)}
              />
              <motion.line
                x1={x} y1={topY + 4} x2={x} y2="140"
                stroke={learningMode ? "var(--gold)" : str.color}
                strokeWidth={isActive ? 1.5 : (learningMode ? 2 : 1)}
                strokeOpacity={isActive ? 1 : (learningMode ? 0.9 : 0.7)}
                animate={isActive ? {
                  x1: [x - 3, x + 3, x - 2, x + 1, x],
                  x2: [x + 2, x - 2, x + 1, x, x],
                } : { x1: x, x2: x }}
                transition={{ duration: 0.5 }}
              />
              {isActive && (
                <motion.line
                  x1={x} y1={topY + 4} x2={x} y2="140"
                  stroke={str.color}
                  strokeWidth="8"
                  strokeOpacity="0.2"
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  style={{ filter: `drop-shadow(0 0 6px ${str.color})` }}
                />
              )}
              {/* Tuning peg */}
              <circle cx={x} cy={topY} r="5"
                fill={instrument.color}
                fillOpacity="0.5"
                stroke={instrument.color}
                strokeWidth="0.8"
              />
              {isActive && (
                <motion.circle
                  cx={x} cy={topY} r="8"
                  fill="none"
                  stroke={str.color}
                  strokeWidth="1"
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                />
              )}
            </g>
          )
        })}
      </svg>
      <p className="text-xs tracking-widest uppercase mt-4" style={{ color: "oklch(0.50 0.04 255)" }}>
        Click strings to play
      </p>
    </div>
  )
}

function AdyrnaInstrument({ instrument, onPlayNote, activeNotes, handLandmarks, learningMode }: InteractiveInstrumentProps) {
  const strings = instrument.strings || []
  const prevTipsRef = useRef<Point[]>([])

  useEffect(() => {
    if (!handLandmarks) return
    const tips = [4, 8, 12, 16, 20]
    const currentTips = tips.map(i => handLandmarks[i])
    const prevTips = prevTipsRef.current

    if (prevTips.length > 0) {
      strings.forEach((str, i) => {
        // Average X for angled string
        const x1 = 50
        const x2 = 60 + i * 18
        const stringX = ((x1 + x2) / 2) / 260

        for (let t = 0; t < tips.length; t++) {
          const prev = prevTips[t]
          const curr = currentTips[t]
          const minX = Math.min(prev.x, curr.x)
          const maxX = Math.max(prev.x, curr.x)
          const crossing = stringX >= minX && stringX <= maxX
          const dist = Math.abs(curr.x - prev.x)

          if (crossing && dist > 0.01 && !activeNotes.has(`${str.frequency}`)) {
            const stringTop = (40 + i * 30) / 320
            const stringBottom = 295 / 320
            if (curr.y >= stringTop && curr.y <= stringBottom) {
              onPlayNote(str.frequency, str.id)
            }
          }
        }
      })
    }
    prevTipsRef.current = currentTips
  }, [handLandmarks, strings, onPlayNote, activeNotes])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <svg width="260" height="320" viewBox="0 0 260 320" fill="none" className="drop-shadow-2xl">
        {/* Sound box */}
        <path d="M20 290 Q20 310 50 310 L50 60 Q50 40 35 40 L20 290 Z"
          fill="oklch(0.13 0.03 255)"
          stroke={instrument.color}
          strokeWidth="1.5"
        />
        {/* Neck column */}
        <line x1="50" y1="20" x2="200" y2="300"
          stroke={instrument.color}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Fore pillar */}
        <line x1="50" y1="20" x2="50" y2="310"
          stroke={instrument.color}
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        {/* Strings */}
        {strings.map((str, i) => {
          const y1 = 40 + i * 30
          const x2 = 60 + i * 18
          const isActive = activeNotes.has(`${str.frequency}`)
          return (
            <g key={str.id}>
              <line
                x1="50" y1={y1} x2={x2} y2="295"
                stroke="transparent"
                strokeWidth="16"
                className="cursor-pointer"
                onClick={() => onPlayNote(str.frequency, str.id)}
              />
              <motion.line
                x1="50" y1={y1} x2={x2} y2="295"
                stroke={learningMode ? "var(--gold)" : str.color}
                strokeWidth={isActive ? 1.8 : (learningMode ? 2 : 1)}
                strokeOpacity={isActive ? 1 : (learningMode ? 0.9 : 0.65)}
              />
              {isActive && (
                <motion.line
                  x1="50" y1={y1} x2={x2} y2="295"
                  stroke={str.color}
                  strokeWidth="6"
                  strokeOpacity="0.3"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  style={{ filter: `drop-shadow(0 0 4px ${str.color})` }}
                />
              )}
              <circle cx="50" cy={y1} r="4"
                fill={instrument.color}
                fillOpacity="0.6"
              />
              {isActive && (
                <motion.circle
                  cx="50" cy={y1} r="8"
                  fill="none"
                  stroke={str.color}
                  strokeWidth="1"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.7 }}
                />
              )}
            </g>
          )
        })}
        {/* Top cap */}
        <circle cx="50" cy="20" r="10"
          fill={instrument.color}
          fillOpacity="0.4"
          stroke={instrument.color}
          strokeWidth="1"
        />
      </svg>
      <p className="text-xs tracking-widest uppercase mt-2" style={{ color: "oklch(0.50 0.04 255)" }}>
        Click strings to play
      </p>
    </div>
  )
}

function SherterInstrument({ instrument, onPlayNote, activeNotes, handLandmarks, learningMode }: InteractiveInstrumentProps) {
  const strings = instrument.strings || []
  const prevTipsRef = useRef<Point[]>([])

  useEffect(() => {
    if (!handLandmarks) return
    const tips = [4, 8, 12, 16, 20]
    const currentTips = tips.map(i => handLandmarks[i])
    const prevTips = prevTipsRef.current

    if (prevTips.length > 0) {
      strings.forEach((str, i) => {
        const stringX = (76 + i * 4) / 160

        for (let t = 0; t < tips.length; t++) {
          const prev = prevTips[t]
          const curr = currentTips[t]
          const minX = Math.min(prev.x, curr.x)
          const maxX = Math.max(prev.x, curr.x)
          const crossing = stringX >= minX && stringX <= maxX
          const dist = Math.abs(curr.x - prev.x)

          if (crossing && dist > 0.01 && !activeNotes.has(`${str.frequency}`)) {
            const stringTop = 55 / 300
            const stringBottom = 225 / 300
            if (curr.y >= stringTop && curr.y <= stringBottom) {
              onPlayNote(str.frequency, str.id)
            }
          }
        }
      })
    }
    prevTipsRef.current = currentTips
  }, [handLandmarks, strings, onPlayNote, activeNotes])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <svg width="160" height="300" viewBox="0 0 160 300" fill="none" className="drop-shadow-2xl">
        {/* Spherical body */}
        <circle cx="80" cy="230" r="60"
          fill="oklch(0.13 0.03 255)"
          stroke={instrument.color}
          strokeWidth="1.5"
        />
        <circle cx="80" cy="230" r="20"
          fill="oklch(0.08 0.02 255)"
          stroke={instrument.color}
          strokeWidth="0.8"
          strokeOpacity="0.5"
        />
        {/* Neck */}
        <rect x="73" y="55" width="14" height="140" rx="4"
          fill="oklch(0.12 0.03 255)"
          stroke={instrument.color}
          strokeWidth="1"
        />
        {/* Frets */}
        {[75, 92, 110, 128, 146, 162].map((y) => (
          <line key={y} x1="73" y1={y} x2="87" y2={y} stroke={instrument.color} strokeWidth="1.5" strokeOpacity="0.5" />
        ))}
        {/* Head */}
        <ellipse cx="80" cy="40" rx="16" ry="24"
          fill="oklch(0.11 0.03 255)"
          stroke={instrument.color}
          strokeWidth="1.2"
        />
        <circle cx="73" cy="32" r="3.5" fill={instrument.color} fillOpacity="0.5" />
        <circle cx="87" cy="32" r="3.5" fill={instrument.color} fillOpacity="0.5" />
        <circle cx="73" cy="46" r="3" fill={instrument.color} fillOpacity="0.4" />
        <circle cx="87" cy="46" r="3" fill={instrument.color} fillOpacity="0.4" />
        {/* Strings */}
        {strings.map((str, i) => {
          const x = 76 + i * 4
          const isActive = activeNotes.has(`${str.frequency}`)
          return (
            <g key={str.id}>
              <rect
                x={x - 7} y="55" width="14" height="170"
                fill="transparent"
                className="cursor-pointer"
                onClick={() => onPlayNote(str.frequency, str.id)}
              />
              <motion.line
                x1={x} y1="55" x2={x} y2="225"
                stroke={learningMode ? "var(--gold)" : str.color}
                strokeWidth={isActive ? 1.5 : (learningMode ? 2 : 0.9)}
                strokeOpacity={isActive ? 1 : (learningMode ? 0.9 : 0.7)}
                animate={isActive ? {
                  x1: [x - 3, x + 3, x - 2, x + 1, x],
                  x2: [x + 2, x - 2, x + 1, x - 1, x],
                } : { x1: x, x2: x }}
                transition={{ duration: 0.4 }}
              />
              {isActive && (
                <motion.line
                  x1={x} y1="55" x2={x} y2="225"
                  stroke={str.color}
                  strokeWidth="8"
                  strokeOpacity="0.2"
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  style={{ filter: `drop-shadow(0 0 6px ${str.color})` }}
                />
              )}
            </g>
          )
        })}
        <rect x="74" y="222" width="12" height="4" rx="1" fill={instrument.color} fillOpacity="0.7" />
      </svg>
      <p className="text-xs tracking-widest uppercase mt-2" style={{ color: "oklch(0.50 0.04 255)" }}>
        Click strings to play
      </p>
    </div>
  )
}

function PercussionInstrument({ instrument, onPlayNote, activeNotes, handLandmarks, learningMode }: InteractiveInstrumentProps) {
  const [isHit, setIsHit] = useState(false)
  const prevHandRef = useRef<Point | null>(null)

  const handleHit = useCallback(() => {
    onPlayNote(110, "drum")
    setIsHit(true)
    setTimeout(() => setIsHit(false), 500)
  }, [onPlayNote])

  useEffect(() => {
    if (!handLandmarks) return
    const pt = handLandmarks[0] // wrist
    const prev = prevHandRef.current

    if (prev) {
      const indexTip = handLandmarks[8]
      const prevIndexTip = prev

      const dy = indexTip.y - prevIndexTip.y
      if (dy > 0.05 && indexTip.x > 0.2 && indexTip.x < 0.8 && indexTip.y > 0.3) {
        if (!isHit && !activeNotes.has("110")) {
          handleHit()
        }
      }
      prevHandRef.current = indexTip
    } else {
      prevHandRef.current = handLandmarks[8]
    }
  }, [handLandmarks, handleHit, isHit, activeNotes])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <motion.div
        className="cursor-pointer relative"
        whileTap={{ scale: 0.95 }}
        onClick={handleHit}
      >
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="drop-shadow-2xl">
          <circle cx="100" cy="100" r="80"
            fill="oklch(0.13 0.03 255)"
            stroke={instrument.color}
            strokeWidth="2.5"
          />
          <circle cx="100" cy="100" r="60"
            fill="oklch(0.10 0.02 255)"
            stroke={instrument.color}
            strokeWidth="1"
            strokeDasharray="6 6"
            strokeOpacity="0.5"
          />
          {/* Ritual symbols */}
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const rad = (angle * Math.PI) / 180
            const x = 100 + 70 * Math.cos(rad)
            const y = 100 + 70 * Math.sin(rad)
            return (
              <g key={angle}>
                <circle cx={x} cy={y} r="6"
                  fill={instrument.color}
                  fillOpacity={isHit ? 0.8 : 0.4}
                />
                <motion.circle
                  cx={x} cy={y} r={isHit ? 12 : 6}
                  fill="none"
                  stroke={instrument.color}
                  strokeWidth="1"
                  animate={isHit ? { r: 18, opacity: 0 } : { r: 6, opacity: 0.4 }}
                  transition={{ duration: 0.5 }}
                />
              </g>
            )
          })}
          {/* Center */}
          <motion.circle
            cx="100" cy="100" r="20"
            fill={instrument.color}
            fillOpacity={isHit ? 0.5 : 0.15}
            stroke={instrument.color}
            strokeWidth="1.5"
            animate={isHit ? { r: 35, opacity: 0 } : { r: 20, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          <circle cx="100" cy="100" r="8" fill={instrument.color} fillOpacity="0.7" />
          {/* Handle */}
          <line x1="100" y1="180" x2="100" y2="210" stroke={instrument.color} strokeWidth="6" strokeLinecap="round" />
        </svg>
        {/* Ripple on hit */}
        <AnimatePresence>
          {isHit && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ border: `2px solid ${instrument.color}` }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      <p className="text-xs tracking-widest uppercase" style={{ color: "oklch(0.50 0.04 255)" }}>
        Click to strike
      </p>
    </div>
  )
}

export function InteractiveInstrument({ instrument, onPlayNote, activeNotes, handLandmarks, learningMode }: InteractiveInstrumentProps) {
  const hint = learningMode ? (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/60 text-[oklch(0.78_0.16_75)] px-3 py-1.5 rounded-sm border border-[oklch(0.78_0.16_75)]/30 text-[10px] tracking-widest uppercase animate-pulse backdrop-blur-sm z-10 pointer-events-none text-center whitespace-nowrap">
      Үйрену режимі: Ішектерді шертіңіз<br /><span className="text-[8px] opacity-70">Learning Mode: Strike highlighted strings</span>
    </div>
  ) : null;

  let content = null;
  if (instrument.id === "dombra" || instrument.id === "kobyz") {
    content = <DombraInstrument instrument={instrument} onPlayNote={onPlayNote} activeNotes={activeNotes} handLandmarks={handLandmarks} learningMode={learningMode} />
  } else if (instrument.id === "jetigen") {
    content = <JetigenInstrument instrument={instrument} onPlayNote={onPlayNote} activeNotes={activeNotes} handLandmarks={handLandmarks} learningMode={learningMode} />
  } else if (instrument.id === "adyrna") {
    content = <AdyrnaInstrument instrument={instrument} onPlayNote={onPlayNote} activeNotes={activeNotes} handLandmarks={handLandmarks} learningMode={learningMode} />
  } else if (instrument.id === "sherter") {
    content = <SherterInstrument instrument={instrument} onPlayNote={onPlayNote} activeNotes={activeNotes} handLandmarks={handLandmarks} learningMode={learningMode} />
  } else if (instrument.id === "dangyra") {
    content = <PercussionInstrument instrument={instrument} onPlayNote={onPlayNote} activeNotes={activeNotes} handLandmarks={handLandmarks} learningMode={learningMode} />
  } else {
    // Fallback: unknown instrument — show nothing
    content = null
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {hint}
      {content}
    </div>
  )
}
