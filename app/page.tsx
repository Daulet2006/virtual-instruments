"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SiteNav } from "@/components/site-nav"
import { HeroSection } from "@/components/hero-section"
import { InstrumentGallery } from "@/components/instrument-gallery"
import { KazakhOrnament } from "@/components/kazakh-ornament"
import { CursorRipple } from "@/components/cursor-ripple"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  return (
    <main className="min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      <CursorRipple />
      
      {/* Navigation */}
      <SiteNav onEnterGallery={() => {}} />

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center px-4 py-20 overflow-hidden">
        <HeroSection onEnter={() => {}} />
      </section>

      {/* Ornament divider */}
      <motion.div
        className="relative h-32 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <KazakhOrnament width={120} height={120} />
        </motion.div>
      </motion.div>

      {/* Instrument Gallery Section */}
      <section className="relative w-full px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2
              className="font-serif text-4xl md:text-5xl font-bold mb-4 glow-text-gold text-balance"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Жинақты зерттеңіз
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Виртуалды мұражайға кіріп, Қазақстанның ең қадірлі аспаптарының ежелгі үндерін ашыңыз. Ойнау және үйрену үшін кез келген аспапты басыңыз.
            </motion.p>
          </div>

          <InstrumentGallery onSelectInstrument={() => {}} />
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        className="relative w-full px-4 py-16 border-t border-border"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Museum Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-serif text-lg font-bold text-gold mb-3 glow-text-gold">Бұл мұражай туралы</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Иммерсивті технологиялар мен ежелгі даналық арқылы Қазақстанның музыкалық мұрасын дәріптейтін виртуалды киелі мекен.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-serif text-lg font-bold text-gold mb-3 glow-text-gold">Санаттар</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><a href="#string" className="hover:text-gold transition-colors">Ішекті аспаптар</a></li>
                <li><a href="#wind" className="hover:text-gold transition-colors">Үрмелі аспаптар</a></li>
                <li><a href="#percussion" className="hover:text-gold transition-colors">Ұрмалы аспаптар</a></li>
                <li><a href="#plucked" className="hover:text-gold transition-colors">Шертіп ойналатын аспаптар</a></li>
              </ul>
            </motion.div>

            {/* Cultural Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-serif text-lg font-bold text-gold mb-3 glow-text-gold">Мәдени мұра</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Бұл аспаптар қазақ мәдениетінің, көшпелілер даналығының және болашақ ұрпақ үшін сақталған көркем көріністің мыңжылдықтарын білдіреді.
              </p>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            className="text-center pt-8 border-t border-border text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>Қазақ музыкалық аспаптарының виртуалды мұражайы © 2025 | Технология арқылы мәдени мұраны сақтау</p>
          </motion.div>
        </div>
      </motion.footer>
    </main>
  )
}
