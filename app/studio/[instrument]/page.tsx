"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { instruments } from "@/lib/instruments"
import type { Instrument } from "@/lib/instruments"
import { SiteNav } from "@/components/site-nav"
import { VirtualStudio } from "@/components/virtual-studio"
import { CursorRipple } from "@/components/cursor-ripple"

interface StudioPageProps {
  params: Promise<{ instrument: string }>
}

export default function StudioPage({ params }: StudioPageProps) {
  const router = useRouter()
  const [instrument, setInstrument] = useState<Instrument | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    params.then((p) => {
      const found = instruments.find((inst) => inst.id === p.instrument)
      if (found) {
        setInstrument(found)
        setError(null)
      } else {
        setError("Instrument not found")
      }
      setIsLoading(false)
    })
  }, [params])

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center"
        >
          <div className="text-3xl font-serif text-gold mb-4 glow-text-gold">
            Tuning instrument...
          </div>
          <div className="animate-pulse text-muted-foreground">
            Preparing the studio
          </div>
        </motion.div>
      </div>
    )
  }

  if (error || !instrument) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-serif text-gold mb-4">{error || "Instrument not found"}</h1>
          <motion.button
            onClick={() => router.push("/")}
            className="px-6 py-2 rounded-sm border border-gold text-gold hover:bg-gold hover:text-background transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Return to Museum
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      <CursorRipple />
      <SiteNav onEnterGallery={() => router.push("/")} />
      <VirtualStudio 
        instrument={instrument}
        onClose={() => router.push("/")}
      />
    </main>
  )
}
