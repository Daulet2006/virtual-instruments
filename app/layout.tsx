import type { Metadata } from 'next'
import { Rajdhani, Cinzel } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-cinzel',
})

export const metadata: Metadata = {
  title: 'Virtual Museum of Kazakh Musical Instruments',
  description: 'Experience the ancient musical legacy of Kazakhstan through an immersive cyber-museum. Explore, play, and learn about traditional Kazakh instruments.',
  generator: 'v0.app',
  keywords: ['Kazakh music', 'dombra', 'kobyz', 'virtual museum', 'Kazakhstan', 'traditional instruments'],
  themeColor: '#0a0e1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${rajdhani.variable} ${cinzel.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
