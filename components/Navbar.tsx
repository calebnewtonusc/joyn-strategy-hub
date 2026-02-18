'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Overview' },
  { href: '/brand', label: 'Brand' },
  { href: '/strategy', label: 'Strategy' },
  { href: '/templates', label: 'Templates' },
  { href: '/calendar', label: 'Calendar' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FD5C1E] to-[#D72C0D] flex items-center justify-center">
            <span className="text-white font-bold text-sm">J</span>
          </div>
          <span className="font-bold text-[#0D0D0D] text-lg tracking-tight">joyn</span>
          <span className="text-xs text-gray-400 font-medium hidden sm:block">strategy hub</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-[#FD5C1E] text-white'
                  : 'text-gray-600 hover:text-[#FD5C1E] hover:bg-orange-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://www.joynthefun.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block px-4 py-2 bg-gradient-to-r from-[#FD5C1E] to-[#D72C0D] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Visit Joyn →
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-600"
          aria-label="Menu"
        >
          <div className="w-5 h-0.5 bg-current mb-1"></div>
          <div className="w-5 h-0.5 bg-current mb-1"></div>
          <div className="w-5 h-0.5 bg-current"></div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                pathname === link.href
                  ? 'bg-[#FD5C1E] text-white'
                  : 'text-gray-700 hover:bg-orange-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
