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
        className="text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-2"
        style={{ color: "var(--gold)" }}
      >
        <span className="w-4 h-px" style={{ background: "var(--gold)" }} />
        {title}
      </h4>
      <p className="text-sm leading-relaxed font-lora" style={{ color: "var(--text-secondary)" }}>
        {content}
      </p>
    </motion.div>
  )
}

function TuningRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between py-3 border-b"
      style={{ borderColor: "rgba(200, 148, 42, 0.1)" }}
    >
      <span className="text-[10px] tracking-widest uppercase font-bold px-1" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
      <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
        {value}
      </span>
    </div>
  )
}

export function InstrumentSidebar({ instrument }: InstrumentSidebarProps) {
  return (
    <div
      className="h-full flex flex-col rounded-[24px] overflow-hidden shadow-warm border border-gold/10"
      style={{
        background: "var(--ivory)",
      }}
    >
      {/* Header */}
      <div
        className="p-6 border-b"
        style={{ borderColor: "rgba(200, 148, 42, 0.1)" }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2
              className="font-serif text-2xl font-bold leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {instrument.name}
            </h2>
            <p className="text-xs tracking-[0.2em] font-bold uppercase" style={{ color: "var(--gold)" }}>
              {instrument.kazakh}
            </p>
          </div>
          <div
            className="px-3 py-1.5 rounded-full text-[9px] tracking-widest uppercase font-bold"
            style={{
              background: "rgba(200, 148, 42, 0.1)",
              color: "var(--gold)",
              border: "1px solid rgba(200, 148, 42, 0.2)",
              whiteSpace: "nowrap",
            }}
          >
            {categoryLabels[instrument.category]}
          </div>
        </div>
        <p
          className="mt-4 text-xs leading-relaxed font-lora italic"
          style={{ color: "var(--text-secondary)" }}
        >
          {instrument.description}
        </p>
        <div
          className="mt-4 px-3 py-1.5 rounded-lg text-[10px] font-bold inline-block"
          style={{
            background: "rgba(200, 148, 42, 0.08)",
            color: "var(--gold)",
            border: "1px solid rgba(200, 148, 42, 0.1)",
          }}
        >
          {instrument.era}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="history" className="flex-1 flex flex-col min-h-0">
        <TabsList
          className="mx-6 mt-6 mb-0 grid grid-cols-3 rounded-xl h-10 p-1"
          style={{
            background: "var(--sand)",
            border: "1px solid rgba(200, 148, 42, 0.1)",
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
              className="text-[9px] tracking-widest uppercase font-bold rounded-lg data-[state=active]:bg-ivory data-[state=active]:text-gold data-[state=active]:shadow-sm transition-all"
              style={{
                color: "var(--text-muted)",
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
                className="p-4 rounded-xl shadow-inner"
                style={{ background: "var(--sand)", border: "1px solid rgba(200, 148, 42, 0.1)" }}
              >
                <p className="text-[10px] tracking-widest uppercase font-bold mb-3" style={{ color: "var(--text-muted)" }}>
                  Ішектердің орналасуы
                </p>
                <div className="flex items-center gap-2">
                  {instrument.strings.map((s) => (
                    <div
                      key={s.id}
                      className="flex-1 text-center py-2 rounded-lg text-xs font-bold shadow-sm"
                      style={{
                        background: "var(--ivory)",
                        color: "var(--text-primary)",
                        border: "1px solid rgba(200, 148, 42, 0.15)",
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
              className="p-4 rounded-xl shadow-inner"
              style={{ background: "var(--sand)", border: "1px solid rgba(200, 148, 42, 0.1)" }}
            >
              <p className="text-[10px] tracking-widest uppercase font-bold mb-3" style={{ color: "var(--text-muted)" }}>
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
                className="p-4 rounded-xl shadow-inner space-y-2"
                style={{ background: "var(--sand)", border: "1px solid rgba(200, 148, 42, 0.1)" }}
              >
                <p className="text-[10px] tracking-widest uppercase font-bold mb-4" style={{ color: "var(--text-muted)" }}>
                  Ішек жиіліктері
                </p>
                {instrument.strings.map((s) => (
                  <div key={s.id} className="flex items-center justify-between py-1 px-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: "var(--gold)" }} />
                      <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                        {s.note}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold opacity-60" style={{ color: "var(--text-muted)" }}>
                      {s.frequency.toFixed(2)} Hz
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div
              className="p-4 rounded-xl"
              style={{ background: "var(--sand)", border: "1px solid rgba(200, 148, 42, 0.1)" }}
            >
              <p className="text-[11px] font-lora italic leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Аспаптың ішектерін немесе оң жақ панельдегі түймелерді басып, әр нота қалай естілетінін тыңдап көріңіз.
              </p>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
