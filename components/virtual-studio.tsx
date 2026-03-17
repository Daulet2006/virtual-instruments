"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft } from "lucide-react"
import type { Instrument } from "@/lib/instruments"
import { InteractiveInstrument } from "@/components/interactive-instrument"
import { GestureHUD } from "@/components/gesture-hud"
import { CameraView, type Point } from "@/components/camera-view"
import { InstrumentSidebar } from "@/components/instrument-sidebar"
import { AudioControlPanel } from "@/components/audio-control-panel"
import { useAudioEngine } from "@/hooks/use-audio-engine"
import { KazakhOrnament } from "@/components/kazakh-ornament"

interface VirtualStudioProps {
  instrument: Instrument
  onClose: () => void
}

export function VirtualStudio({ instrument, onClose }: VirtualStudioProps) {
  const {
    playNote,
    controls,
    setVolume,
    setPitch,
    setReverb,
    setMuted,
    isReady,
    activeNotes,
  } = useAudioEngine()

  const [lastPlayed, setLastPlayed] = useState<string | null>(null)
  const [handLandmarks, setHandLandmarks] = useState<Point[] | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [learningMode, setLearningMode] = useState(false)

  const handlePlayNote = useCallback(
    (frequency: number, stringId: string) => {
      playNote(frequency)
      setLastPlayed(stringId)
      setTimeout(() => setLastPlayed(null), 800)
    },
    [playNote]
  )

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: "oklch(0.07 0.025 255)" }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.55 0.18 255 / 0.04) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.55 0.18 255 / 0.04) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Background ornament */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <KazakhOrnament size={700} variant="full" opacity={0.04} animated={false} />
        </div>

        {/* Top bar */}
        <div
          className="relative z-10 flex items-center justify-between px-6 py-3 border-b"
          style={{
            borderColor: "oklch(0.20 0.04 255)",
            background: "oklch(0.09 0.025 255 / 0.95)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-xs tracking-widest uppercase transition-colors"
              style={{ color: "oklch(0.45 0.04 255)" }}
              aria-label="Close studio"
            >
              <ChevronLeft size={14} />
              Галерея
            </button>
            <div
              className="w-px h-4"
              style={{ background: "oklch(0.25 0.04 255)" }}
            />
            <div className="flex items-center gap-2">
              <span className="text-xs tracking-widest uppercase" style={{ color: "oklch(0.35 0.04 255)" }}>
                Виртуалды студия
              </span>
              <span className="text-xs mx-2" style={{ color: "oklch(0.25 0.04 255)" }}>/</span>
              <span
                className="font-serif text-sm font-semibold tracking-wider"
                style={{ color: instrument.color }}
              >
                {instrument.name}
              </span>
              <span className="text-xs" style={{ color: "oklch(0.40 0.04 255)" }}>
                {instrument.kazakh}
              </span>
            </div>
          </div>

          {/* Status indicators */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: "oklch(0.70 0.20 145)",
                  boxShadow: "0 0 6px oklch(0.70 0.20 145)",
                  animation: "pulse 2s infinite",
                }}
              />
              <span className="text-xs font-mono" style={{ color: "oklch(0.45 0.04 255)" }}>
                ҚОСЫЛУЛЫ
              </span>
            </div>
            {activeNotes.size > 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-1.5"
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--gold)" }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                />
                <span className="text-xs font-mono" style={{ color: "var(--gold)" }}>
                  ОЙНАЛУДА
                </span>
              </motion.div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-sm transition-colors"
              style={{ color: "oklch(0.40 0.04 255)" }}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Main content — 3 column layout */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[320px_1fr_280px] gap-0 min-h-0 overflow-hidden">

          {/* LEFT: Sidebar info */}
          <div
            className="hidden lg:flex flex-col p-4 border-r overflow-hidden"
            style={{ borderColor: "oklch(0.16 0.04 255)" }}
          >
            <InstrumentSidebar instrument={instrument} />
          </div>

          {/* CENTER: Interactive instrument + webcam */}
          <div className="flex flex-col gap-2 p-3 overflow-auto">
            
            {/* TOP: Camera View — compact 16:9 at 420px */}
            <div className="flex-shrink-0 w-full max-w-[420px] mx-auto">
              <CameraView onHandCoordinates={setHandLandmarks} />
            </div>

            {/* MIDDLE: AI Vision panel — compact at 420px */}
            <div
              className="rounded-sm overflow-hidden flex-shrink-0 w-full max-w-[420px] mx-auto"
              style={{ height: "120px" }}
            >
              <div
                className="flex items-center justify-between px-2 py-1 border-b"
                style={{
                  background: "oklch(0.10 0.03 255 / 0.9)",
                  borderColor: "oklch(0.55 0.18 255 / 0.2)",
                }}
              >
                <span className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: "oklch(0.55 0.18 255)" }}>
                  AI Көру
                </span>
                <div className="flex gap-1">
                  {["#", "◉"].map((s) => (
                    <span key={s} className="text-[9px]" style={{ color: "oklch(0.30 0.04 255)" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <GestureHUD handLandmarks={handLandmarks} />
            </div>

            {/* BOTTOM: Interactive instrument */}
            <div
              className="flex-1 rounded-sm overflow-hidden w-full max-w-[720px] mx-auto"
              style={{
                background: "oklch(0.10 0.03 255 / 0.8)",
                border: `1px solid ${instrument.color}25`,
                backdropFilter: "blur(8px)",
                minHeight: "300px",
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-2.5 border-b"
                style={{ borderColor: `${instrument.color}20` }}
              >
                <span
                  className="text-xs tracking-widest uppercase font-semibold"
                  style={{ color: instrument.color }}
                >
                  Интерактивті · {instrument.name}
                </span>
                <span className="text-xs font-mono" style={{ color: "oklch(0.35 0.04 255)" }}>
                  {instrument.strings ? `${instrument.strings.length} ІШЕК` : "ҰРМАЛЫ"}
                </span>
              </div>

              <div className="flex items-center justify-center p-4 h-[calc(100%-44px)]">
                <InteractiveInstrument
                  instrument={instrument}
                  onPlayNote={handlePlayNote}
                  activeNotes={activeNotes}
                  handLandmarks={handLandmarks}
                  learningMode={learningMode}
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Audio controls */}
          <div
            className="hidden lg:flex flex-col p-4 gap-4 border-l overflow-auto"
            style={{ borderColor: "oklch(0.16 0.04 255)" }}
          >
            <AudioControlPanel
              volume={controls.volume}
              pitch={controls.pitch}
              reverb={controls.reverb}
              muted={controls.muted}
              onVolumeChange={setVolume}
              onPitchChange={setPitch}
              onReverbChange={setReverb}
              onMuteToggle={() => setMuted(!controls.muted)}
              isReady={isReady}
            />

            {/* Quick notes */}
            {instrument.strings && (
              <div
                className="rounded-sm p-4 space-y-3"
                style={{
                  background: "oklch(0.11 0.03 255 / 0.9)",
                  border: "1px solid oklch(0.20 0.04 255)",
                }}
              >
                <p className="text-xs tracking-widest uppercase" style={{ color: "oklch(0.40 0.04 255)" }}>
                  Жылдам ойнау
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {instrument.strings.map((s) => (
                    <motion.button
                      key={s.id}
                      onClick={() => handlePlayNote(s.frequency, s.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="py-2 px-3 rounded-sm text-xs font-mono font-semibold tracking-wider transition-all"
                      style={{
                        background: activeNotes.has(`${s.frequency}`) ? `${s.color}25` : "oklch(0.15 0.04 255)",
                        color: s.color,
                        border: `1px solid ${activeNotes.has(`${s.frequency}`) ? s.color : `${s.color}40`}`,
                        boxShadow: activeNotes.has(`${s.frequency}`) ? `0 0 12px ${s.color}40` : "none",
                      }}
                    >
                      {s.note}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Last played indicator */}
            <AnimatePresence>
              {lastPlayed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-sm px-4 py-3 text-center"
                  style={{
                    background: `${instrument.color}12`,
                    border: `1px solid ${instrument.color}30`,
                  }}
                >
                  <p className="text-xs tracking-widest uppercase" style={{ color: instrument.color }}>
                    Нота ойнатылды
                  </p>
                  <p className="text-xs font-mono mt-1" style={{ color: "oklch(0.55 0.04 255)" }}>
                    {lastPlayed}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* HUD ornament */}
            <div className="flex justify-center opacity-20">
              <KazakhOrnament size={80} variant="center" opacity={1} animated />
            </div>
          </div>
        </div>

        {/* Mobile bottom bar */}
        <div
          className="lg:hidden flex items-center justify-around px-4 py-3 border-t"
          style={{ borderColor: "oklch(0.20 0.04 255)", background: "oklch(0.09 0.025 255 / 0.95)" }}
        >
          <button
            className="text-xs tracking-widest uppercase"
            style={{ color: "oklch(0.45 0.04 255)" }}
            onClick={onClose}
          >
            Галерея
          </button>
          <div
            className="w-px h-4"
            style={{ background: "oklch(0.25 0.04 255)" }}
          />
          <button
            onClick={() => setMuted(!controls.muted)}
            className="text-xs tracking-widest uppercase"
            style={{ color: controls.muted ? "oklch(0.70 0.18 350)" : "var(--gold)" }}
          >
            {controls.muted ? "Дыбысты қосу" : "Дыбысты өшіру"}
          </button>
        </div>

        {/* Onboarding Dialog */}
        <AnimatePresence>
          {showOnboarding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
            >
              <div 
                className="relative max-w-md w-full mx-4 p-8 rounded-lg shadow-2xl flex flex-col items-center text-center"
                style={{
                  background: "oklch(0.12 0.03 255)",
                  border: "1px solid var(--gold)",
                }}
              >
                <div className="absolute top-0 right-0 p-2 opacity-50 pointer-events-none">
                  <KazakhOrnament size={60} variant="corner" animated={false} />
                </div>
                <div className="absolute bottom-0 left-0 p-2 opacity-50 pointer-events-none rotate-180">
                  <KazakhOrnament size={60} variant="corner" animated={false} />
                </div>
                
                <h2 className="text-xl font-serif mb-4" style={{ color: "var(--gold)" }}>
                  Қазақ аспаптарында ойнауды білесіз бе?
                  <br />
                  <span className="text-sm opacity-80">(Do you know how to play Kazakh instruments?)</span>
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
                  <button
                    onClick={() => {
                      setLearningMode(false)
                      setShowOnboarding(false)
                    }}
                    className="flex-1 py-3 px-4 rounded border transition-colors"
                    style={{
                      borderColor: "oklch(0.30 0.04 255)",
                      color: "oklch(0.80 0.04 255)",
                    }}
                  >
                    Иә (Yes)
                  </button>
                  <button
                    onClick={() => {
                      setLearningMode(true)
                      setShowOnboarding(false)
                    }}
                    className="flex-1 py-3 px-4 rounded border font-semibold transition-all hover:scale-105"
                    style={{
                      background: "var(--gold)",
                      borderColor: "var(--gold)",
                      color: "oklch(0.10 0.03 255)",
                      boxShadow: "0 0 15px var(--gold-glow)",
                    }}
                  >
                    Жоқ, үйрету (No, show me)
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </AnimatePresence>
  )
}
