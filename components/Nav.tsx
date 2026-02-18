'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '#today', label: 'Today' },
  { href: '#captions', label: 'Captions' },
  { href: '#hashtags', label: 'Hashtags' },
  { href: '#calendar', label: 'Calendar' },
  { href: '#ads', label: 'Ads' },
  { href: '#brand', label: 'Brand' },
]

export default function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded bg-[#FD5C1E] flex items-center justify-center text-white font-black text-xs">J</span>
          <span className="font-black text-sm tracking-tight text-[#0a0a0a]">JOYN</span>
          <span className="text-gray-300 text-sm">|</span>
          <span className="text-gray-400 text-xs font-medium">2026 Social Playbook</span>
        </Link>

        {isHome && (
          <nav className="hidden lg:flex items-center gap-0.5">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-[#0a0a0a] hover:bg-gray-50 rounded-md transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
        )}

        <a href="https://www.joynthefun.com" target="_blank" rel="noopener noreferrer"
          className="text-xs font-bold text-[#FD5C1E] hover:underline">
          joynthefun.com ↗
        </a>
      </div>
    </header>
  )
}
