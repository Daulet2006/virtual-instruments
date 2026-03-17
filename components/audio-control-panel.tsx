"use client"

import { motion } from "framer-motion"
import { Volume2, VolumeX, Music2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface AudioControlPanelProps {
  volume: number
  pitch: number
  reverb: number
  muted: boolean
  onVolumeChange: (v: number) => void
  onPitchChange: (v: number) => void
  onReverbChange: (v: number) => void
  onMuteToggle: () => void
  isReady: boolean
}

function HUDLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xs tracking-widest uppercase font-semibold"
      style={{ color: "oklch(0.55 0.04 255)" }}
    >
      {children}
    </span>
  )
}

function ValueDisplay({ value, unit = "%" }: { value: string | number; unit?: string }) {
  return (
    <span
      className="font-mono text-xs tabular-nums"
      style={{ color: "var(--gold)" }}
    >
      {value}
      {unit}
    </span>
  )
}

function AudioBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-end gap-px h-8">
      {Array.from({ length: 12 }).map((_, i) => {
        const barValue = (i + 1) / 12
        const active = barValue <= value
        return (
          <motion.div
            key={i}
            className="w-1.5 rounded-t-sm"
            style={{
              height: `${40 + i * 5}%`,
              background: active ? color : "oklch(0.20 0.04 255)",
              boxShadow: active ? `0 0 4px ${color}60` : "none",
            }}
            animate={active ? { opacity: [0.7, 1, 0.7] } : { opacity: 0.4 }}
            transition={{ duration: 1.5, delay: i * 0.05, repeat: Infinity }}
          />
        )
      })}
    </div>
  )
}

export function AudioControlPanel({
  volume,
  pitch,
  reverb,
  muted,
  onVolumeChange,
  onPitchChange,
  onReverbChange,
  onMuteToggle,
  isReady,
}: AudioControlPanelProps) {
  return (
    <div
      className="rounded-sm p-5 space-y-5 animate-hud-flicker"
      style={{
        background: "oklch(0.11 0.03 255 / 0.9)",
        border: "1px solid oklch(0.78 0.16 75 / 0.3)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: isReady ? "oklch(0.70 0.20 145)" : "oklch(0.78 0.16 75)",
              boxShadow: isReady
                ? "0 0 8px oklch(0.70 0.20 145 / 0.8)"
                : "0 0 8px oklch(0.78 0.16 75 / 0.4)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <span
            className="text-xs tracking-widest uppercase font-semibold"
            style={{ color: "var(--gold)" }}
          >
            Аудио қозғалтқыш
          </span>
        </div>
        <span className="text-xs font-mono" style={{ color: "oklch(0.40 0.04 255)" }}>
          {isReady ? "ҚОСЫЛУЛЫ" : "ҚОСЫЛУДА"}
        </span>
      </div>

      {/* Audio bars visualizer */}
      <AudioBar value={muted ? 0 : volume} color="oklch(0.78 0.16 75)" />

      {/* Volume */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onMuteToggle}
              className="transition-colors"
              style={{ color: muted ? "oklch(0.70 0.18 350)" : "var(--gold)" }}
              aria-label={muted ? "Дыбысты қосу" : "Дыбысты өшіру"}
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <HUDLabel>Дыбыс деңгейі</HUDLabel>
          </div>
          <ValueDisplay value={Math.round(volume * 100)} />
        </div>
        <Slider
          value={[volume * 100]}
          min={0}
          max={100}
          step={1}
          onValueChange={([v]) => onVolumeChange(v / 100)}
          className="w-full"
          style={
            {
              "--slider-track": "oklch(0.20 0.04 255)",
              "--slider-range": "oklch(0.78 0.16 75)",
              "--slider-thumb": "oklch(0.78 0.16 75)",
            } as React.CSSProperties
          }
        />
      </div>

      {/* Pitch */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music2 size={14} style={{ color: "oklch(0.68 0.20 240)" }} />
            <HUDLabel>Нота биіктігі</HUDLabel>
          </div>
          <ValueDisplay value={pitch > 0 ? `+${pitch}` : pitch} unit=" st" />
        </div>
        <Slider
          value={[pitch + 12]}
          min={0}
          max={24}
          step={1}
          onValueChange={([v]) => onPitchChange(v - 12)}
          className="w-full"
        />
        <div className="flex justify-between text-xs" style={{ color: "oklch(0.35 0.04 255)" }}>
          <span>-12 st</span>
          <span>0</span>
          <span>+12 st</span>
        </div>
      </div>

      {/* Reverb */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "oklch(0.65 0.18 180)" }}>
              <path d="M2 7 Q4 4 7 7 Q10 10 12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M1 10 Q3.5 6 7 10 Q10.5 14 13 10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" strokeOpacity="0.5" />
            </svg>
            <HUDLabel>Реверберация</HUDLabel>
          </div>
          <ValueDisplay value={Math.round(reverb * 100)} />
        </div>
        <Slider
          value={[reverb * 100]}
          min={0}
          max={100}
          step={1}
          onValueChange={([v]) => onReverbChange(v / 100)}
          className="w-full"
        />
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between pt-2 border-t"
        style={{ borderColor: "oklch(0.22 0.04 255)" }}
      >
        <span className="text-xs font-mono" style={{ color: "oklch(0.35 0.04 255)" }}>
          WEB AUDIO API v2
        </span>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ background: "var(--gold)" }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
