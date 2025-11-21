import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tally Prime TDL Editor',
  description: 'Interactive Tally Definition Language editor and reference',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
