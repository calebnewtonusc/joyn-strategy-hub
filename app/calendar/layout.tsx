import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Content Calendar — Joyn 2026 Social Playbook',
  description: '30-day content calendar for the Joyn February 2026 launch campaign.',
}

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
