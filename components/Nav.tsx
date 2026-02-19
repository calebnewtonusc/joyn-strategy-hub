'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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
  const isHome   = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: scrolled ? '1px solid #e5e7eb' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0 select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/joyn-logo.png" alt="Joyn" style={{ height: '28px', width: 'auto', position: 'relative', zIndex: 1 }} />
          <span className="hidden sm:inline text-gray-300 text-sm">|</span>
          <span className="hidden sm:inline text-gray-400 text-xs font-medium">2026 Social Playbook</span>
        </Link>

        {/* Section nav — scrollable on mobile */}
        {isHome && (
          <nav className="flex-1 flex items-center gap-0.5 overflow-x-auto min-w-0"
            style={{ scrollbarWidth: 'none' }}>
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
          className="text-xs font-bold text-[#FD5C1E] hover:underline shrink-0 ml-auto transition-opacity hover:opacity-80">
          joynthefun.com ↗
        </a>
      </div>
    </header>
  )
}
