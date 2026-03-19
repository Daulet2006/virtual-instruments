"use client"

import { motion } from "framer-motion"
import { Volume2, VolumeX, Music2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { KazakhOrnament } from "@/components/kazakh-ornament"

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
      className="text-[10px] tracking-widest uppercase font-bold"
      style={{ color: "var(--text-muted)" }}
    >
      {children}
    </span>
  )
}

function ValueDisplay({ value, unit = "%" }: { value: string | number; unit?: string }) {
  return (
    <span
      className="font-bold text-xs tabular-nums"
      style={{ color: "var(--gold)" }}
    >
      {value}
      {unit}
    </span>
  )
}

function AudioBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-end gap-1 h-12 bg-sand/20 p-2 rounded-xl">
      {Array.from({ length: 15 }).map((_, i) => {
        const barValue = (i + 1) / 15
        const active = barValue <= value
        return (
          <motion.div
            key={i}
            className="flex-1 rounded-full"
            style={{
              height: `${30 + i * 4}%`,
              background: active ? color : "rgba(200, 148, 42, 0.1)",
            }}
            animate={active ? { opacity: [0.8, 1, 0.8] } : { opacity: 0.3 }}
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
      className="rounded-2xl p-6 space-y-6 shadow-warm border border-gold/10"
      style={{
        background: "var(--ivory)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <KazakhOrnament size={20} variant="medallion" opacity={0.6} animated={false} />
          <span
            className="text-[10px] tracking-widest uppercase font-bold"
            style={{ color: "var(--gold)" }}
          >
            Дыбыс баптаулары
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: isReady ? "var(--turquoise)" : "var(--gold)",
              boxShadow: isReady ? "0 0 6px var(--turquoise)" : "none",
            }}
          />
          <span className="text-[9px] font-bold tracking-wider" style={{ color: "var(--text-muted)" }}>
            {isReady ? "БЕЛСЕНДІ" : "ЖҮКТЕЛУДЕ"}
          </span>
        </div>
      </div>

      {/* Audio bars visualizer */}
      <AudioBar value={muted ? 0 : volume} color="var(--gold)" />

      {/* Volume */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onMuteToggle}
              className="p-1.5 rounded-full hover:bg-gold/5 transition-colors"
              style={{ color: muted ? "var(--crimson)" : "var(--gold)" }}
              aria-label={muted ? "Дыбысты қосу" : "Дыбысты өшіру"}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <HUDLabel>Дыбыс қаттылығы</HUDLabel>
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
        />
      </div>

      {/* Pitch */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-1.5">
            <Music2 size={14} style={{ color: "var(--turquoise)" }} />
            <HUDLabel>Үн биіктігі</HUDLabel>
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
        <div className="flex justify-between text-[9px] font-bold px-1" style={{ color: "var(--text-muted)" }}>
          <span>-12</span>
          <span>Орташа</span>
          <span>+12</span>
        </div>
      </div>

      {/* Reverb */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-1.5">
            <div className="w-3.5 h-3.5 flex items-center justify-center" style={{ color: "var(--gold)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 12c4-4 8 8 12 0s4-4 4-4" />
              </svg>
            </div>
            <HUDLabel>Жаңғырық</HUDLabel>
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

      {/* Divider */}
      <div className="pt-2 border-t border-gold/10 flex justify-center">
        <div className="flex gap-1.5 py-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i} 
              className="w-1 h-1 rounded-full bg-gold/20"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

