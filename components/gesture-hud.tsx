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
  const [scanStatus, setScanStatus] = useState("БАҚЫЛАУДА")
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
        setScanStatus(Math.random() > 0.1 ? "БАҚЫЛАУДА" : "ІЗДЕУДЕ")
      }

      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Scanlines
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = `oklch(0.55 0.18 255 / ${0.02 + Math.sin(y * 0.1 + t) * 0.01})`
        ctx.fillRect(0, y, W, 1)
      }

      // Targeting reticle
      const cx = W * 0.5 + Math.sin(t * 0.5) * W * 0.15
      const cy = H * 0.65 + Math.cos(t * 0.3) * H * 0.05

      // Outer crosshair
      const goldColor = "oklch(0.78 0.16 75)"
      const blueColor = "oklch(0.68 0.20 240)"

      ctx.strokeStyle = `oklch(0.78 0.16 75 / 0.5)`
      ctx.lineWidth = 1
      ctx.setLineDash([5, 10])
      ctx.beginPath()
      ctx.arc(cx, cy, 80, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])

      // Crosshair lines
      ctx.strokeStyle = `oklch(0.78 0.16 75 / 0.6)`
      ctx.lineWidth = 0.8
      const lines = [
        [cx - 90, cy, cx - 60, cy],
        [cx + 60, cy, cx + 90, cy],
        [cx, cy - 90, cx, cy - 60],
        [cx, cy + 60, cx, cy + 90],
      ] as const
      lines.forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      })

      // Hand skeleton
      // If we have actual handLandmarks, map them to canvas space.
      // Top boundary is Y=0 instead of pt.y so the skeleton appears higher and projects down.
      // Actually let's use the actual Y if we want to show connection.
      const landmarks = handLandmarks 
        ? handLandmarks.map(pt => ({
            x: pt.x * W,
            y: pt.y * H,
          }))
        : generateHandLandmarks(t, W, H)

      // Draw connections
      HAND_CONNECTIONS.forEach(([a, b]) => {
        const p1 = landmarks[a]
        const p2 = landmarks[b]
        if (!p1 || !p2) return
        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
        grad.addColorStop(0, "oklch(0.68 0.20 240 / 0.7)")
        grad.addColorStop(1, "oklch(0.78 0.16 75 / 0.5)")
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      })

      // Draw finger nodes
      landmarks.forEach((pt, i) => {
        const isFingerTip = [4, 8, 12, 16, 20].includes(i)
        const r = isFingerTip ? 5 : 3

        if (isFingerTip) {
          // Glow ring
          const grd = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r * 4)
          grd.addColorStop(0, "oklch(0.78 0.16 75 / 0.4)")
          grd.addColorStop(1, "oklch(0.78 0.16 75 / 0)")
          ctx.fillStyle = grd
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, r * 4, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = isFingerTip
          ? "oklch(0.78 0.16 75 / 0.9)"
          : "oklch(0.68 0.20 240 / 0.8)"
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2)
        ctx.fill()

        // Motion indicator lines for fingertips
        if (isFingerTip) {
          ctx.strokeStyle = "oklch(0.78 0.16 75 / 0.3)"
          ctx.lineWidth = 0.5
          ctx.setLineDash([2, 4])
          ctx.beginPath()
          ctx.moveTo(pt.x, pt.y)
          ctx.lineTo(
            pt.x + Math.sin(t + i) * 15,
            pt.y + Math.cos(t * 1.3 + i) * 10
          )
          ctx.stroke()
          ctx.setLineDash([])
          
          // Projection downward lines
          if (handLandmarks) {
            // Pulse effect for the scanning beam
            const pulse = (Math.sin(t * 5 + i) + 1) * 0.5
            
            // Draw gradient line from top to bottom
            const grad = ctx.createLinearGradient(pt.x, 0, pt.x, H)
            grad.addColorStop(0, `rgba(255, 215, 0, ${0.8 * pulse})`)
            grad.addColorStop(0.5, `rgba(100, 200, 255, ${0.4 * pulse})`)
            grad.addColorStop(1, `rgba(255, 215, 0, 0)`)
            
            ctx.strokeStyle = grad
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(pt.x, 0)
            ctx.lineTo(pt.x, H)
            ctx.stroke()
            
            // Draw a bright dot at the top edge
            ctx.fillStyle = `rgba(255, 215, 0, ${0.9 * pulse})`
            ctx.beginPath()
            ctx.arc(pt.x, 0, 4, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      })

      // Velocity indicators
      const wrist = landmarks[0]
      const vx = Math.sin(t * 0.5) * W * 0.05
      const vy = Math.cos(t * 0.3) * H * 0.03
      const speed = Math.sqrt(vx * vx + vy * vy)
      if (speed > 1) {
        ctx.strokeStyle = `oklch(0.78 0.16 75 / ${Math.min(speed * 0.05, 0.5)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(wrist.x, wrist.y)
        ctx.lineTo(wrist.x + vx * 3, wrist.y + vy * 3)
        ctx.stroke()
      }

      // Corner HUD brackets
      const corners = [
        [10, 10, 1, 1],
        [W - 10, 10, -1, 1],
        [10, H - 10, 1, -1],
        [W - 10, H - 10, -1, -1],
      ] as const

      ctx.strokeStyle = "oklch(0.78 0.16 75 / 0.4)"
      ctx.lineWidth = 1.5
      corners.forEach(([x, y, sx, sy]) => {
        ctx.beginPath()
        ctx.moveTo(x + sx * 20, y)
        ctx.lineTo(x, y)
        ctx.lineTo(x, y + sy * 20)
        ctx.stroke()
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <div
      className="relative w-full h-full rounded-sm overflow-hidden"
      style={{
        background: "oklch(0.07 0.02 255)",
        border: "1px solid oklch(0.55 0.18 255 / 0.3)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        width={720}
        height={180}
      />

      {/* HUD overlays */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ background: scanStatus === "БАҚЫЛАУДА" ? "oklch(0.70 0.20 145)" : "oklch(0.78 0.16 75)" }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-xs font-mono tracking-widest" style={{ color: "oklch(0.78 0.16 75)" }}>
          AI КӨРУ · {scanStatus}
        </span>
      </div>

      <div className="absolute top-3 right-3 text-right">
        <div className="text-xs font-mono" style={{ color: "oklch(0.55 0.18 255)" }}>
          ҚИМЫЛ
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={gestureLabel}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="text-sm font-semibold tracking-widest"
            style={{ color: "var(--gold)" }}
          >
            {gestureLabel}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-3 left-3">
        <div className="text-xs font-mono" style={{ color: "oklch(0.40 0.04 255)" }}>
          СЕНІМДІЛІК
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <div className="h-1.5 w-24 rounded-full overflow-hidden" style={{ background: "oklch(0.20 0.04 255)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--gold)", width: `${confidence}%` }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs font-mono" style={{ color: "var(--gold)" }}>
            {confidence}%
          </span>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 text-right">
        <span className="text-xs font-mono" style={{ color: "oklch(0.35 0.04 255)" }}>
          21 ТҮЙІН · 60 FPS
        </span>
      </div>
    </div>
  )
}
