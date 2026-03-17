"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Instrument } from "@/lib/instruments"
import { categoryLabels } from "@/lib/instruments"

interface InstrumentSidebarProps {
  instrument: Instrument
}

function InfoSection({ title, content }: { title: string; content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-2"
    >
      <h4
        className="text-xs tracking-widest uppercase font-semibold flex items-center gap-2"
        style={{ color: "var(--gold)" }}
      >
        <span className="w-3 h-px" style={{ background: "var(--gold)" }} />
        {title}
      </h4>
      <p className="text-sm leading-relaxed" style={{ color: "oklch(0.68 0.03 255)" }}>
        {content}
      </p>
    </motion.div>
  )
}

function TuningRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between py-2 border-b"
      style={{ borderColor: "oklch(0.20 0.04 255)" }}
    >
      <span className="text-xs tracking-wider uppercase" style={{ color: "oklch(0.45 0.04 255)" }}>
        {label}
      </span>
      <span className="text-xs font-mono" style={{ color: "oklch(0.75 0.12 75)" }}>
        {value}
      </span>
    </div>
  )
}

export function InstrumentSidebar({ instrument }: InstrumentSidebarProps) {
  return (
    <div
      className="h-full flex flex-col rounded-sm overflow-hidden"
      style={{
        background: "oklch(0.11 0.03 255 / 0.9)",
        border: "1px solid oklch(0.22 0.04 255)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Header */}
      <div
        className="p-5 border-b"
        style={{ borderColor: "oklch(0.20 0.04 255)" }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2
              className="font-serif text-2xl font-bold"
              style={{ color: instrument.color }}
            >
              {instrument.name}
            </h2>
            <p className="text-sm tracking-widest" style={{ color: "oklch(0.45 0.04 255)" }}>
              {instrument.kazakh}
            </p>
          </div>
          <div
            className="px-2 py-1 rounded-sm text-xs tracking-wider uppercase"
            style={{
              background: `${instrument.color}18`,
              color: instrument.color,
              border: `1px solid ${instrument.color}40`,
              whiteSpace: "nowrap",
            }}
          >
            {categoryLabels[instrument.category]}
          </div>
        </div>
        <p
          className="mt-3 text-xs leading-relaxed"
          style={{ color: "oklch(0.58 0.03 255)" }}
        >
          {instrument.description}
        </p>
        <div
          className="mt-3 px-3 py-1.5 rounded-sm text-xs font-mono inline-block"
          style={{
            background: "oklch(0.16 0.04 255)",
            color: "oklch(0.55 0.08 255)",
          }}
        >
          {instrument.era}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="history" className="flex-1 flex flex-col min-h-0">
        <TabsList
          className="mx-4 mt-4 mb-0 grid grid-cols-3 rounded-sm h-9"
          style={{
            background: "oklch(0.14 0.04 255)",
            border: "1px solid oklch(0.20 0.04 255)",
          }}
        >
          {[
            { id: "history", label: "Тарихы" },
            { id: "cultural", label: "Мәдениет" },
            { id: "tuning", label: "Бұрауы" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="text-xs tracking-wider uppercase rounded-sm data-[state=active]:text-foreground"
              style={{
                color: "oklch(0.45 0.04 255)",
              }}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <ScrollArea className="flex-1 px-4 pb-4">
          <TabsContent value="history" className="mt-4 space-y-4">
            <InfoSection title="Тарихи шығу тегі" content={instrument.history} />
            {instrument.strings && (
              <div
                className="p-3 rounded-sm"
                style={{ background: "oklch(0.13 0.03 255)", border: "1px solid oklch(0.20 0.04 255)" }}
              >
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "oklch(0.40 0.04 255)" }}>
                  Ішектердің орналасуы
                </p>
                <div className="flex items-center gap-2">
                  {instrument.strings.map((s) => (
                    <div
                      key={s.id}
                      className="flex-1 text-center py-1.5 rounded-sm text-xs font-mono font-semibold"
                      style={{
                        background: `${s.color}15`,
                        color: s.color,
                        border: `1px solid ${s.color}40`,
                      }}
                    >
                      {s.note}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cultural" className="mt-4 space-y-4">
            <InfoSection title="Мәдени маңызы" content={instrument.cultural} />
            <div
              className="p-3 rounded-sm"
              style={{ background: "oklch(0.13 0.03 255)", border: "1px solid oklch(0.20 0.04 255)" }}
            >
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "oklch(0.40 0.04 255)" }}>
                Аспап туралы мәлімет
              </p>
              <div className="space-y-1.5">
                <TuningRow label="Санат" value={categoryLabels[instrument.category]} />
                <TuningRow label="Дәуірі" value={instrument.era.split("—")[0].trim()} />
                <TuningRow label="Шығу тегі" value="Қазақстан / Орталық Азия" />
                <TuningRow label="Ішектер саны" value={instrument.strings ? `${instrument.strings.length}` : "Жоқ"} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tuning" className="mt-4 space-y-4">
            <InfoSection title="Бұрау және шкала" content={instrument.tuning} />
            {instrument.strings && (
              <div
                className="p-3 rounded-sm space-y-1.5"
                style={{ background: "oklch(0.13 0.03 255)", border: "1px solid oklch(0.20 0.04 255)" }}
              >
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "oklch(0.40 0.04 255)" }}>
                  Ішек жиіліктері
                </p>
                {instrument.strings.map((s) => (
                  <div key={s.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                      <span className="text-xs font-mono font-semibold" style={{ color: s.color }}>
                        {s.note}
                      </span>
                    </div>
                    <span className="text-xs font-mono" style={{ color: "oklch(0.45 0.04 255)" }}>
                      {s.frequency.toFixed(2)} Hz
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div
              className="p-3 rounded-sm"
              style={{ background: `${instrument.color}08`, border: `1px solid ${instrument.color}25` }}
            >
              <p className="text-xs" style={{ color: "oklch(0.55 0.04 255)" }}>
                Аспаптың ішектерін немесе оң жақ панельдегі түймелерді басып, әр нота қалай естілетінін тыңдап көріңіз.
              </p>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
