"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SiteNav } from "@/components/site-nav"
import { HeroSection } from "@/components/hero-section"
import { InstrumentGallery } from "@/components/instrument-gallery"
import { KazakhOrnament } from "@/components/kazakh-ornament"
import { CursorRipple } from "@/components/cursor-ripple"

import { VirtualStudio } from "@/components/virtual-studio"
import type { Instrument } from "@/lib/instruments"

export default function Home() {
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null)

  const handleEnterGallery = () => {
    const gallery = document.getElementById("gallery")
    gallery?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <main
      className="min-h-screen w-full overflow-x-hidden"
      style={{ background: "var(--ivory)", color: "var(--text-primary)" }}
    >
      <CursorRipple />

      {/* Navigation */}
      <SiteNav onEnterGallery={handleEnterGallery} />

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen w-full flex items-center justify-center px-4 overflow-hidden">
        <HeroSection onEnter={handleEnterGallery} />
      </section>

      {/* ── Cultural Intro Section ── */}
      <motion.section
        id="about"
        className="relative w-full px-6 py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          background:
            "linear-gradient(180deg, var(--ivory) 0%, var(--beige) 50%, var(--ivory) 100%)",
        }}
      >
        {/* Decorative ornament strips */}
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <KazakhOrnament width={1200} height={24} variant="border" opacity={0.28} animated={false} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <KazakhOrnament width={1200} height={24} variant="border" opacity={0.28} animated={false} />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Section heading */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-xs tracking-widest uppercase font-medium mb-4"
              style={{ color: "var(--turquoise)" }}
            >
              Мәдени мұра
            </p>
            <h2
              className="font-display text-4xl md:text-5xl font-bold mb-6"
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-playfair, serif)",
              }}
            >
              Дала рухын сезіну
            </h2>
            <div className="ornament-divider max-w-xs mx-auto" style={{ color: "var(--gold)" }}>
              <span style={{ fontSize: "1.2rem" }}>✦</span>
            </div>
          </motion.div>

          {/* Three-column cultural facts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎵",
                title: "Мыңжылдық дауыс",
                text: "Қазақ аспаптары 2000 жылдан астам тарихы бар. Олар ежелгі жыраулардың жырлары мен бақсылардың рухани рәсімдерінде туды.",
                color: "var(--gold)",
                delay: 0.1,
              },
              {
                icon: "🌿",
                title: "Табиғат пен рух",
                text: "Қобыз пен домбыра дала, жел және аспан арқылы шабыт алады. Әр нота — табиғатпен тілдесу, болмыспен байланыс.",
                color: "var(--turquoise)",
                delay: 0.2,
              },
              {
                icon: "🔥",
                title: "Тірі мұра",
                text: "Бүгінде бұл аспаптар ЮНЕСКО мұрасы болып танылған. Жас буын оларды сақтап, жаңа рухпен жаңғыртуда.",
                color: "var(--crimson)",
                delay: 0.3,
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                className="relative rounded-2xl p-7 text-center"
                style={{
                  background: "var(--ivory)",
                  border: "1px solid rgba(200, 148, 42, 0.18)",
                  boxShadow: "var(--shadow-card)",
                }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: item.delay }}
                whileHover={{ y: -4, boxShadow: "var(--shadow-warm)" }}
              >
                <div
                  className="text-4xl mb-4 block"
                  style={{ lineHeight: 1 }}
                >
                  {item.icon}
                </div>
                <h3
                  className="font-display text-lg font-bold mb-3"
                  style={{
                    color: item.color,
                    fontFamily: "var(--font-playfair, serif)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-lora, serif)",
                  }}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Ornament divider ── */}
      <motion.div
        className="relative h-28 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          className="absolute left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(200,148,42,0.25), transparent)" }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <KazakhOrnament size={96} variant="center" opacity={0.38} animated={false} />
        </motion.div>
      </motion.div>

      {/* ── Instrument Gallery ── */}
      <section id="gallery" className="relative w-full px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto"
        >
          <InstrumentGallery onSelectInstrument={setSelectedInstrument} />
        </motion.div>
      </section>

      {/* ── Virtual Studio Overlay ── */}
      <AnimatePresence>
        {selectedInstrument && (
          <VirtualStudio
            instrument={selectedInstrument}
            onClose={() => setSelectedInstrument(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Quote section ── */}
      <motion.section
        id="culture"
        className="relative w-full px-6 py-24 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ background: "var(--sand)" }}
      >
        {/* Large background ornament */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
          <KazakhOrnament size={600} variant="full" opacity={1} animated={false} />
        </div>

        {/* Corner ornaments */}
        <div className="absolute top-0 left-0">
          <KazakhOrnament size={140} variant="corner" opacity={0.30} animated={false} />
        </div>
        <div className="absolute top-0 right-0" style={{ transform: "scaleX(-1)" }}>
          <KazakhOrnament size={140} variant="corner" opacity={0.30} animated={false} />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <KazakhOrnament size={56} variant="medallion" opacity={0.60} animated={false} className="mx-auto mb-8" />

            <blockquote
              className="font-display text-2xl md:text-3xl font-medium leading-relaxed mb-6"
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-playfair, serif)",
                fontStyle: "italic",
              }}
            >
              «Домбыраның үні — қазақтың жаны.
              <br />Оны сезінсең, далада тұрғандай боласың.»
            </blockquote>

            <div className="ornament-divider max-w-48 mx-auto mb-4" style={{ color: "var(--gold)" }}>
              <span style={{ fontSize: "0.9rem" }}>✦</span>
            </div>

            <p
              className="text-sm tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              — Қазақ халық даналығы
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Footer ── */}
      <motion.footer
        className="relative w-full px-6 py-16"
        style={{
          background: "var(--beige)",
          borderTop: "1px solid rgba(200, 148, 42, 0.18)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Top border ornament */}
        <div className="flex justify-center mb-10">
          <KazakhOrnament width={600} height={20} variant="border" opacity={0.30} animated={false} />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Museum info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <KazakhOrnament size={24} variant="medallion" opacity={0.65} animated={false} />
              <h3
                className="font-display text-base font-bold"
                style={{ color: "var(--gold)", fontFamily: "var(--font-playfair, serif)" }}
              >
                Бұл мұражай туралы
              </h3>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-lora, serif)" }}
            >
              Иммерсивті технологиялар мен ежелгі даналық арқылы Қазақстанның 
              музыкалық мұрасын дәріптейтін виртуалды киелі мекен.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3
              className="font-display text-base font-bold mb-4"
              style={{ color: "var(--gold)", fontFamily: "var(--font-playfair, serif)" }}
            >
              Санаттар
            </h3>
            <ul className="space-y-2">
              {[
                { href: "#string",     label: "Ішекті аспаптар" },
                { href: "#wind",       label: "Үрмелі аспаптар" },
                { href: "#percussion", label: "Ұрмалы аспаптар" },
                { href: "#plucked",    label: "Шертіп ойналатын аспаптар" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Cultural note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3
              className="font-display text-base font-bold mb-4"
              style={{ color: "var(--gold)", fontFamily: "var(--font-playfair, serif)" }}
            >
              Мәдени мұра
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-lora, serif)" }}
            >
              Бұл аспаптар қазақ мәдениетінің, көшпелілер даналығының және 
              болашақ ұрпақ үшін сақталған рухани мұраның мыңжылдық тарихын бейнелейді.
            </p>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="text-center pt-8"
          style={{ borderTop: "1px solid rgba(200, 148, 42, 0.15)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p
            className="text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            Қазақ Музыкалық Аспаптарының Виртуалды Мұражайы © 2025
            <span
              className="mx-2"
              style={{ color: "rgba(200, 148, 42, 0.40)" }}
            >
              ✦
            </span>
            Технология арқылы мәдени мұраны сақтау
          </p>
        </motion.div>
      </motion.footer>
    </main>
  )
}
