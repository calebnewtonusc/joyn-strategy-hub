'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '#today',    label: 'Today' },
  { href: '#calendar', label: 'Calendar' },
  { href: '#captions', label: 'Captions' },
  { href: '#hashtags', label: 'Hashtags' },
  { href: '#ads',      label: 'Ads' },
  { href: '#brand',    label: 'Brand' },
]

export default function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-6 h-6 rounded bg-[#FD5C1E] flex items-center justify-center text-white font-black text-xs">J</span>
          <span className="font-black text-sm tracking-tight text-[#0a0a0a]">JOYN</span>
          <span className="hidden sm:inline text-gray-300 text-sm">|</span>
          <span className="hidden sm:inline text-gray-400 text-xs font-medium">2026 Social Playbook</span>
        </Link>

        {/* Section nav — scrollable on mobile */}
        {isHome && (
          <nav className="flex-1 flex items-center gap-0.5 overflow-x-auto scrollbar-hide min-w-0">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-[#0a0a0a] hover:bg-gray-50 rounded-md transition-colors whitespace-nowrap shrink-0">
                {l.label}
              </a>
            ))}
            <Link href="/setup"
              className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-[#003882] hover:text-[#0a0a0a] hover:bg-blue-50 rounded-md transition-colors whitespace-nowrap shrink-0">
              Setup
            </Link>
          </nav>
        )}

        <a href="https://www.joynthefun.com" target="_blank" rel="noopener noreferrer"
          className="text-xs font-bold text-[#FD5C1E] hover:underline shrink-0 ml-auto">
          joynthefun.com ↗
        </a>
      </div>
    </header>
  )
}
