'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/content', label: 'Content Kit' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/ads', label: 'Paid Ads' },
  { href: '/brand', label: 'Brand' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FD5C1E] to-[#D72C0D] flex items-center justify-center">
            <span className="text-white font-black text-xs">J</span>
          </div>
          <span className="font-black text-[#0D0D0D] tracking-tight">JOYN PLAYBOOK</span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                pathname === link.href
                  ? 'bg-[#0D0D0D] text-white'
                  : 'text-gray-500 hover:text-[#0D0D0D] hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <a
          href="https://www.joynthefun.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#FD5C1E] text-white text-sm font-bold rounded-lg hover:bg-[#D72C0D] transition-colors"
        >
          Shop Joyn ↗
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
          <div className="w-5 space-y-1">
            <div className="h-0.5 bg-gray-700"></div>
            <div className="h-0.5 bg-gray-700"></div>
            <div className="h-0.5 bg-gray-700"></div>
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold ${pathname === link.href ? 'bg-[#0D0D0D] text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
