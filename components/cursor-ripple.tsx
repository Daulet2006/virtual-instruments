"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Ripple {
  id: number
  x: number
  y: number
}

/**
 * Soft warm ripple that follows the cursor — replaces the cyberpunk neon ring.
 * The ripple is a gentle gold circle expanding outward like a water drop in sand.
 */
export function CursorRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const counterRef = useRef(0)
  const lastPos = useRef({ x: 0, y: 0 })
  const throttleRef = useRef(0)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const now = Date.now()
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > 70 && now - throttleRef.current > 200) {
        throttleRef.current = now
        lastPos.current = { x: e.clientX, y: e.clientY }
        const id = counterRef.current++
        setRipples((prev) => [...prev.slice(-5), { id, x: e.clientX, y: e.clientY }])
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id))
        }, 1200)
      }
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
              border: "1px solid rgba(200, 148, 42, 0.35)",
              background: "rgba(200, 148, 42, 0.04)",
            }}
            initial={{ width: 6, height: 6, opacity: 0.7 }}
            animate={{ width: 48, height: 48, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
