import type { Metadata, Viewport } from 'next'
import { Lora, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const lora = Lora({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Қазақ Музыкалық Аспаптарының Виртуалды Мұражайы',
  description:
    'Қазақстанның ежелгі музыкалық мұрасын виртуалды мұражай арқылы зерттеңіз. Домбыра, қобыз, жетіген және басқа да дәстүрлі аспаптармен танысыңыз.',
  keywords: ['Қазақ музыкасы', 'домбыра', 'қобыз', 'виртуалды мұражай', 'Қазақстан', 'дәстүрлі аспаптар'],
  themeColor: '#C8942A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="kk">
      <body className={`${lora.variable} ${playfair.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
