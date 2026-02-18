import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Joyn | Social Media Strategy Hub',
  description: 'Comprehensive social media strategy, brand guidelines, and content templates for Joyn — confidence in a capsule.',
  openGraph: {
    title: 'Joyn Social Strategy Hub',
    description: 'Paid + organic social strategy, brand positioning, and reusable design templates.',
    siteName: 'Joyn Strategy Hub',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#FAFAFA] text-[#0D0D0D] min-h-screen">
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
