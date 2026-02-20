import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brand Kit — Joyn 2026 Social Playbook',
  description: 'Joyn brand guidelines: colors, typography, voice, taglines, and usage rules.',
}

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return children
}
