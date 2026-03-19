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
        style={{ 
          background: "var(--ivory)",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm66-3c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-46-45c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm54 0c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM57 7c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-32 5c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-18 6c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm34 2c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm0 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm0-5c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm0-10c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm0-10c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm0-10c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm0-10c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm0-10c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm0-10c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm0-10c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23C8942A' fill-opacity='0.10' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      >
        {/* Decorative corner ornaments */}
        <div className="absolute top-0 left-0 pointer-events-none opacity-20">
          <KazakhOrnament size={200} variant="corner" animated={false} />
        </div>
        <div className="absolute bottom-0 right-0 pointer-events-none opacity-20 rotate-180">
          <KazakhOrnament size={200} variant="corner" animated={false} />
        </div>

        {/* Top bar */}
        <div
          className="relative z-10 flex items-center justify-between px-6 py-4 border-b"
          style={{
            borderColor: "rgba(200, 148, 42, 0.20)",
            background: "rgba(250, 246, 238, 0.85)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center gap-6">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-bold transition-all hover:text-gold"
              style={{ color: "var(--text-muted)" }}
              aria-label="Close studio"
            >
              <ChevronLeft size={16} />
              Галерея
            </button>
            <div
              className="w-px h-6"
              style={{ background: "rgba(200, 148, 42, 0.25)" }}
            />
            <div className="flex items-center gap-3">
              <KazakhOrnament size={24} variant="medallion" opacity={0.8} animated={false} />
              <div className="flex flex-col">
                <span className="text-[10px] tracking-widest uppercase font-bold" style={{ color: "var(--gold)" }}>
                  Шеберхана
                </span>
                <span
                  className="font-serif text-lg font-bold leading-none"
                  style={{ color: "var(--text-primary)" }}
                >
                  {instrument.kazakh}
                </span>
              </div>
            </div>
          </div>

          {/* Status indicators */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-beige/30 px-3 py-1.5 rounded-full border border-gold/10">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: "var(--turquoise)",
                  boxShadow: "0 0 12px rgba(42, 123, 124, 0.4)",
                }}
              />
              <span className="text-[10px] tracking-widest uppercase font-bold" style={{ color: "var(--text-secondary)" }}>
                БАЙЛАНЫС ОРНАТЫЛДЫ
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gold/10 transition-colors"
              style={{ color: "var(--text-muted)" }}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main content — 3 column layout */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[340px_1fr_300px] gap-0 min-h-0 overflow-hidden">

          {/* LEFT: Sidebar info */}
          <div
            className="hidden lg:flex flex-col p-6 border-r overflow-y-auto"
            style={{ 
              borderColor: "rgba(200, 148, 42, 0.15)",
              background: "rgba(237, 224, 196, 0.2)" 
            }}
          >
            <InstrumentSidebar instrument={instrument} />
          </div>

          {/* CENTER: Interactive instrument + webcam */}
          <div className="flex flex-col gap-6 p-6 overflow-auto items-center">
            
            <div className="w-full max-w-4xl space-y-6">
              {/* Vision and Camera panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Camera View */}
                <div className="rounded-2xl overflow-hidden shadow-warm border border-gold/10 bg-ivory/50 p-2">
                  <div className="text-[10px] tracking-widest uppercase font-bold mb-2 px-2 flex justify-between items-center">
                    <span style={{ color: "var(--text-muted)" }}>Камера</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-turquoise animate-pulse" />
                  </div>
                  <CameraView onHandCoordinates={setHandLandmarks} />
                </div>

                {/* AI Vision panel */}
                <div className="rounded-2xl overflow-hidden shadow-warm border border-gold/10 bg-ivory/50 p-2 flex flex-col">
                  <div className="text-[10px] tracking-widest uppercase font-bold mb-2 px-2 flex justify-between items-center">
                    <span style={{ color: "var(--text-muted)" }}>Қозғалысты тану</span>
                    <span className="text-[9px] opacity-50" style={{ color: "var(--gold)" }}>✦ ✦ ✦</span>
                  </div>
                  <div className="flex-1 min-h-[160px]">
                    <GestureHUD handLandmarks={handLandmarks} />
                  </div>
                </div>
              </div>

              {/* Interactive instrument */}
              <div
                className="rounded-3xl overflow-hidden w-full shadow-gold border-2 border-gold/20 bg-ivory relative"
                style={{
                  minHeight: "450px",
                }}
              >
                {/* Decorative ornaments in instrument box */}
                <div className="absolute top-4 left-4 opacity-10 pointer-events-none">
                  <KazakhOrnament size={80} variant="corner" animated={false} />
                </div>
                <div className="absolute top-4 right-4 opacity-10 pointer-events-none rotate-90">
                  <KazakhOrnament size={80} variant="corner" animated={false} />
                </div>

                <div
                  className="flex items-center justify-between px-8 py-5 border-b"
                  style={{ borderColor: "rgba(200, 148, 42, 0.1)" }}
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] tracking-widest uppercase font-bold" style={{ color: "var(--gold)" }}>
                      Интерактивті аспап
                    </span>
                    <span className="font-serif text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                      {instrument.name}
                    </span>
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-gold/5 border border-gold/10">
                    <span className="text-xs font-semibold" style={{ color: "var(--gold-muted)" }}>
                      {instrument.strings ? `${instrument.strings.length} ІШЕК` : "ҰРМАЛЫ"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center p-8 h-[calc(100%-80px)]">
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
          </div>

          {/* RIGHT: Audio controls */}
          <div
            className="hidden lg:flex flex-col p-6 gap-6 border-l overflow-y-auto"
            style={{ 
              borderColor: "rgba(200, 148, 42, 0.15)",
              background: "rgba(237, 224, 196, 0.2)" 
            }}
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
                className="rounded-2xl p-6 space-y-4 shadow-warm border border-gold/10"
                style={{
                  background: "var(--ivory)",
                }}
              >
                <p className="text-[10px] tracking-widest uppercase font-bold" style={{ color: "var(--text-muted)" }}>
                  Жылдам ойнау
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {instrument.strings.map((s) => (
                    <motion.button
                      key={s.id}
                      onClick={() => handlePlayNote(s.frequency, s.id)}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="py-3 px-4 rounded-xl text-xs font-bold tracking-wider transition-all border shadow-sm"
                      style={{
                        background: activeNotes.has(`${s.frequency}`) ? "var(--gold)" : "var(--sand)",
                        color: activeNotes.has(`${s.frequency}`) ? "var(--ivory)" : "var(--text-primary)",
                        borderColor: activeNotes.has(`${s.frequency}`) ? "var(--gold)" : "rgba(200, 148, 42, 0.15)",
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="rounded-2xl px-6 py-4 text-center border shadow-gold"
                  style={{
                    background: "var(--gold)",
                    color: "var(--ivory)",
                    borderColor: "var(--gold)",
                  }}
                >
                  <p className="text-[10px] tracking-widest uppercase font-bold opacity-80">
                    Ойналған нота
                  </p>
                  <p className="text-lg font-serif font-bold mt-1">
                    {lastPlayed}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom ornament */}
            <div className="flex justify-center mt-auto py-4 opacity-30">
              <KazakhOrnament size={100} variant="center" opacity={1} animated />
            </div>
          </div>
        </div>

        {/* Mobile bottom bar */}
        <div
          className="lg:hidden flex items-center justify-around px-4 py-4 border-t"
          style={{ borderColor: "rgba(200, 148, 42, 0.20)", background: "var(--ivory)" }}
        >
          <button
            className="text-[10px] tracking-widest uppercase font-bold"
            style={{ color: "var(--text-muted)" }}
            onClick={onClose}
          >
            Галерея
          </button>
          <div
            className="w-px h-6"
            style={{ background: "rgba(200, 148, 42, 0.25)" }}
          />
          <button
            onClick={() => setMuted(!controls.muted)}
            className="text-[10px] tracking-widest uppercase font-bold"
            style={{ color: controls.muted ? "var(--crimson)" : "var(--gold)" }}
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
              className="absolute inset-0 z-50 flex items-center justify-center bg-sand/40 backdrop-blur-xl p-6"
            >
              <div 
                className="relative max-w-lg w-full p-10 rounded-[32px] shadow-2xl flex flex-col items-center text-center overflow-hidden"
                style={{
                  background: "var(--ivory)",
                  border: "2px solid var(--gold)",
                }}
              >
                {/* Decorative backgrounds */}
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <KazakhOrnament size={120} variant="corner" animated={false} />
                </div>
                <div className="absolute bottom-0 left-0 p-4 opacity-10 pointer-events-none rotate-180">
                  <KazakhOrnament size={120} variant="corner" animated={false} />
                </div>
                
                <KazakhOrnament size={64} variant="medallion" opacity={0.6} animated={false} className="mb-8" />

                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                  Қазақ аспаптарының әлеміне қош келдіңіз!
                </h2>
                <p className="text-base font-lora mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Виртуалды шеберханада сіз аспаптардың үнін сезініп, ойнауды үйрене аласыз. Қимыл-қозғалыс арқылы музыка тудырыңыз.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full relative z-10">
                  <button
                    onClick={() => {
                      setLearningMode(false)
                      setShowOnboarding(false)
                    }}
                    className="flex-1 py-4 px-6 rounded-2xl border-2 transition-all font-bold text-sm tracking-wide"
                    style={{
                      borderColor: "rgba(200, 148, 42, 0.3)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Мен білемін
                  </button>
                  <button
                    onClick={() => {
                      setLearningMode(true)
                      setShowOnboarding(false)
                    }}
                    className="flex-1 py-4 px-6 rounded-2xl font-bold text-sm tracking-wide shadow-gold transition-all hover:scale-[1.02]"
                    style={{
                      background: "var(--gold)",
                      color: "var(--ivory)",
                    }}
                  >
                    Үйретуді бастау
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

