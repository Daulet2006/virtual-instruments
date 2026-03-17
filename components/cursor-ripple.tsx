"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Ripple {
  id: number
  x: number
  y: number
}

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

      if (dist > 60 && now - throttleRef.current > 150) {
        throttleRef.current = now
        lastPos.current = { x: e.clientX, y: e.clientY }
        const id = counterRef.current++
        setRipples((prev) => [...prev.slice(-8), { id, x: e.clientX, y: e.clientY }])
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id))
        }, 1000)
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
              border: "1px solid oklch(0.78 0.16 75 / 0.4)",
            }}
            initial={{ width: 4, height: 4, opacity: 0.8 }}
            animate={{ width: 40, height: 40, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
