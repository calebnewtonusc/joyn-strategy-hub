'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const homeLinks = [
  { href: '#today',    label: 'Today' },
  { href: '#calendar', label: 'Calendar' },
  { href: '#captions', label: 'Captions' },
  { href: '#hashtags', label: 'Hashtags' },
  { href: '#ads',      label: 'Ads' },
  { href: '#brand',    label: 'Brand' },
]

const strategyLinks = [
  { href: '#pillars',          label: 'Pillars' },
  { href: '#calendar-overview', label: 'Calendar' },
  { href: '#voice',            label: 'Voice' },
  { href: '#competitors',      label: 'Competitors' },
  { href: '#metrics',          label: 'Metrics' },
  { href: '#platforms',        label: 'Platforms' },
]

export default function Nav() {
  const pathname = usePathname()
  const isHome     = pathname === '/'
  const isStrategy = pathname === '/strategy'
  const isBrand    = pathname === '/brand'

  const [scrolled,   setScrolled]   = useState(false)
  const [activeHash, setActiveHash] = useState('')
  const [menuOpen,   setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active hash for highlighting
  useEffect(() => {
    if (!isHome && !isStrategy) return
    const sections = (isHome ? homeLinks : strategyLinks).map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveHash('#' + entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [isHome, isStrategy])

  const links = isHome ? homeLinks : isStrategy ? strategyLinks : []

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid #e5e7eb' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.07)' : 'none',
      }}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 select-none group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/joyn-logo.png"
            alt="Joyn"
            style={{ height: '26px', width: 'auto' }}
            className="group-hover:opacity-80 transition-opacity"
          />
          <span className="hidden sm:inline text-gray-200 text-sm">|</span>
          <span className="hidden sm:inline text-gray-400 text-xs font-medium">2026 Playbook</span>
        </Link>

        {/* Page switcher pills */}
        <div className="hidden md:flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full p-1 mx-2 shrink-0">
          <Link href="/"
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${isHome ? 'bg-white text-[#0a0a0a] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
            Calendar
          </Link>
          <Link href="/strategy"
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${isStrategy ? 'bg-white text-[#0a0a0a] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
            Strategy
          </Link>
          <Link href="/brand"
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${isBrand ? 'bg-white text-[#0a0a0a] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
            Brand
          </Link>
        </div>

        {/* Section nav - scrollable */}
        {links.length > 0 && (
          <nav
            className="flex-1 flex items-center gap-0.5 overflow-x-auto min-w-0 pl-1"
            style={{ scrollbarWidth: 'none' }}>
            {links.map(l => (
              <a key={l.href} href={l.href}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                  activeHash === l.href
                    ? 'text-[#FD5C1E] bg-orange-50'
                    : 'text-gray-400 hover:text-[#0a0a0a] hover:bg-gray-50'
                }`}>
                {l.label}
              </a>
            ))}
          </nav>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto shrink-0">
          {/* Setup link */}
          <Link href="/setup"
            className="hidden sm:inline text-xs font-semibold text-gray-300 hover:text-gray-500 transition-colors px-2 py-1.5 rounded-md hover:bg-gray-50">
            Setup
          </Link>

          {/* Download CTA */}
          <button
            onClick={() => window.print()}
            className="hidden sm:flex items-center gap-1.5 bg-[#0a0a0a] text-white text-xs font-black px-3.5 py-2 rounded-full hover:bg-gray-800 transition-colors">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 16L7 11h3V4h4v7h3l-5 5z"/>
              <path d="M5 20h14v-2H5v2z"/>
            </svg>
            Download
          </button>

          {/* External link */}
          <a href="https://www.joynthefun.com" target="_blank" rel="noopener noreferrer"
            className="text-xs font-bold text-[#FD5C1E] hover:underline transition-opacity hover:opacity-80 whitespace-nowrap">
            joynthefun.com ↗
          </a>

          {/* Mobile menu */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-gray-50 transition-colors">
            <span className={`w-4 h-0.5 bg-gray-600 rounded-full transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-4 h-0.5 bg-gray-600 rounded-full transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-4 h-0.5 bg-gray-600 rounded-full transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          <div className="flex gap-2 mb-3">
            <Link href="/" onClick={() => setMenuOpen(false)}
              className={`flex-1 text-center py-2 rounded-xl text-xs font-bold transition-all ${isHome ? 'bg-[#FD5C1E] text-white' : 'bg-gray-50 text-gray-500'}`}>
              Calendar
            </Link>
            <Link href="/strategy" onClick={() => setMenuOpen(false)}
              className={`flex-1 text-center py-2 rounded-xl text-xs font-bold transition-all ${isStrategy ? 'bg-[#FD5C1E] text-white' : 'bg-gray-50 text-gray-500'}`}>
              Strategy
            </Link>
            <Link href="/brand" onClick={() => setMenuOpen(false)}
              className={`flex-1 text-center py-2 rounded-xl text-xs font-bold transition-all ${isBrand ? 'bg-[#FD5C1E] text-white' : 'bg-gray-50 text-gray-500'}`}>
              Brand
            </Link>
          </div>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 text-xs font-semibold text-gray-500 hover:text-[#0a0a0a] hover:bg-gray-50 rounded-lg transition-colors">
              {l.label}
            </a>
          ))}
          <div className="pt-2 border-t border-gray-50 flex gap-2">
            <button onClick={() => { window.print(); setMenuOpen(false) }}
              className="flex-1 text-center py-2.5 bg-[#0a0a0a] text-white rounded-xl text-xs font-black">
              Download
            </button>
            <Link href="/setup" onClick={() => setMenuOpen(false)}
              className="flex-1 text-center py-2.5 bg-gray-50 text-gray-500 rounded-xl text-xs font-semibold">
              Setup
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
