"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Point } from "@/components/camera-view"

const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
  [0, 5], [5, 6], [6, 7], [7, 8], // Index
  [5, 9], [9, 10], [10, 11], [11, 12], // Middle
  [9, 13], [13, 14], [14, 15], [15, 16], // Ring
  [13, 17], [17, 18], [18, 19], [19, 20], // Pinky
  [0, 17] // Palm
]

function generateHandLandmarks(t: number, width: number, height: number) {
  // Simulate a natural hand motion
  const baseX = width * 0.5 + Math.sin(t * 0.5) * width * 0.15
  const baseY = height * 0.65 + Math.cos(t * 0.3) * height * 0.05

  const wave = Math.sin(t * 2) * 8

  return [
    // Wrist
    { x: baseX, y: baseY + 50 },
    // Thumb
    { x: baseX - 40, y: baseY + 30 },
    { x: baseX - 55, y: baseY + 15 },
    { x: baseX - 62, y: baseY },
    { x: baseX - 66, y: baseY - 10 },
    // Index
    { x: baseX - 20, y: baseY - 10 },
    { x: baseX - 22, y: baseY - 40 + wave * 0.3 },
    { x: baseX - 22, y: baseY - 62 + wave * 0.5 },
    { x: baseX - 22, y: baseY - 78 + wave },
    // Middle
    { x: baseX, y: baseY - 15 },
    { x: baseX, y: baseY - 48 + wave * 0.3 },
    { x: baseX, y: baseY - 70 + wave * 0.6 },
    { x: baseX, y: baseY - 86 + wave },
    // Ring
    { x: baseX + 20, y: baseY - 10 },
    { x: baseX + 22, y: baseY - 42 + wave * 0.2 },
    { x: baseX + 22, y: baseY - 62 + wave * 0.5 },
    { x: baseX + 22, y: baseY - 76 + wave * 0.8 },
    // Pinky
    { x: baseX + 38, y: baseY - 5 },
    { x: baseX + 42, y: baseY - 32 + wave * 0.2 },
    { x: baseX + 44, y: baseY - 48 + wave * 0.4 },
    { x: baseX + 45, y: baseY - 60 + wave * 0.6 },
  ]
}

export function GestureHUD({ handLandmarks }: { handLandmarks?: Point[] | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const [scanStatus, setScanStatus] = useState("БЕЛСЕНДІ")
  const [gestureLabel, setGestureLabel] = useState("АШЫҚ АЛАҚАН")
  const [confidence, setConfidence] = useState(94)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let t = 0

    const gestures = ["АШЫҚ АЛАҚАН", "ШЕРТУ", "ҚАҒУ", "ҚЫСУ", "СЫПЫРУ"]
    let gestureTimer = 0

    const animate = () => {
      t += 0.02
      gestureTimer++

      if (gestureTimer % 120 === 0) {
        setGestureLabel(gestures[Math.floor(Math.random() * gestures.length)])
        setConfidence(Math.floor(88 + Math.random() * 10))
      }
      if (gestureTimer % 60 === 0) {
        setScanStatus(Math.random() > 0.1 ? "БЕЛСЕНДІ" : "ІЗДЕУДЕ")
      }

      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Background subtle texture
      ctx.fillStyle = "rgba(245, 237, 216, 0.1)"
      ctx.fillRect(0, 0, W, H)

      // Natural motion center
      const cx = W * 0.5 + Math.sin(t * 0.5) * W * 0.15
      const cy = H * 0.65 + Math.cos(t * 0.3) * H * 0.05

      // Decorative central ornament (ghosted)
      const goldColor = "#C8942A"
      const turquoiseColor = "#2A7B7C"

      // Outer soft ring instead of crosshair
      ctx.strokeStyle = "rgba(200, 148, 42, 0.15)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(cx, cy, 90 + Math.sin(t) * 5, 0, Math.PI * 2)
      ctx.stroke()

      // Hand skeleton
      const landmarks = handLandmarks 
        ? handLandmarks.map(pt => ({
            x: pt.x * W,
            y: pt.y * H,
          }))
        : generateHandLandmarks(t, W, H)

      // Draw connections with organic gradient
      HAND_CONNECTIONS.forEach(([a, b]) => {
        const p1 = landmarks[a]
        const p2 = landmarks[b]
        if (!p1 || !p2) return
        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
        grad.addColorStop(0, "rgba(42, 123, 124, 0.6)") // Turquoise
        grad.addColorStop(1, "rgba(200, 148, 42, 0.45)") // Gold
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      })

      // Draw finger nodes (soft pearls)
      landmarks.forEach((pt, i) => {
        const isFingerTip = [4, 8, 12, 16, 20].includes(i)
        const r = isFingerTip ? 6 : 4

        if (isFingerTip) {
          // Warm glow
          const grd = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r * 3)
          grd.addColorStop(0, "rgba(200, 148, 42, 0.3)")
          grd.addColorStop(1, "rgba(200, 148, 42, 0)")
          ctx.fillStyle = grd
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, r * 3, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = isFingerTip ? goldColor : turquoiseColor
        ctx.shadowBlur = 4
        ctx.shadowColor = "rgba(0,0,0,0.1)"
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // Soft flow lines
        if (isFingerTip && handLandmarks) {
          const pulse = (Math.sin(t * 4 + i) + 1) * 0.5
          const grad = ctx.createLinearGradient(pt.x, pt.y, pt.x, H)
          grad.addColorStop(0, `rgba(200, 148, 42, ${0.4 * pulse})`)
          grad.addColorStop(1, `rgba(200, 148, 42, 0)`)
          
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(pt.x, pt.y)
          ctx.lineTo(pt.x, H)
          ctx.stroke()
        }
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [handLandmarks])

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner bg-sand/30 border border-gold/10"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        width={720}
        height={320}
      />

      {/* Overlays */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ background: "var(--gold)" }}
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-[10px] tracking-widest uppercase font-bold" style={{ color: "var(--text-muted)" }}>
          СЕЗІМ · {scanStatus}
        </span>
      </div>

      <div className="absolute top-4 right-4 text-right">
        <div className="text-[9px] tracking-widest uppercase font-bold opacity-50" style={{ color: "var(--text-muted)" }}>
          ҚИМЫЛ ТҮРІ
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={gestureLabel}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="text-xs font-bold tracking-wider mt-0.5"
            style={{ color: "var(--gold-muted)" }}
          >
            {gestureLabel}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 right-4 text-right">
        <span className="text-[9px] tracking-widest uppercase font-bold opacity-40" style={{ color: "var(--text-muted)" }}>
          DARHAN AI · VISION v3
        </span>
      </div>
    </div>
  )
}

