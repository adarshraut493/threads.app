import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../../app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads',
  description: 'new app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black `}>{children}</body>
    </html>
  )
}
