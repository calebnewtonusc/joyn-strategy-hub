import Link from 'next/link'

const pillars = [
  {
    icon: '🎯',
    title: 'Brand Positioning',
    desc: 'Refined messaging, tone of voice, and visual identity guidelines that make Joyn unmistakably you.',
    href: '/brand',
    color: 'from-[#FD5C1E] to-[#D72C0D]',
  },
  {
    icon: '📣',
    title: 'Organic Strategy',
    desc: 'Content pillars, posting cadence, platform-specific tactics for TikTok, Instagram, and Pinterest.',
    href: '/strategy',
    color: 'from-[#003882] to-[#0052CC]',
  },
  {
    icon: '💰',
    title: 'Paid Strategy',
    desc: 'Meta Ads, TikTok Ads, and influencer frameworks built to convert at every stage of the funnel.',
    href: '/strategy#paid',
    color: 'from-[#D72C0D] to-[#FF6B35]',
  },
  {
    icon: '🖼️',
    title: 'Design Templates',
    desc: 'Reusable Figma-ready templates for posts, Stories, Reels covers, and ads — all on-brand.',
    href: '/templates',
    color: 'from-[#87ADEF] to-[#003882]',
  },
  {
    icon: '📅',
    title: 'Content Calendar',
    desc: '30-day launch calendar with platform breakdowns, copy prompts, and campaign timing.',
    href: '/calendar',
    color: 'from-[#FD5C1E] to-[#87ADEF]',
  },
]

const metrics = [
  { label: 'Target Monthly Reach', value: '2M+', sub: 'across all platforms' },
  { label: 'Paid ROAS Target', value: '4.5x', sub: 'Meta + TikTok Ads' },
  { label: 'Content Pieces/Month', value: '120+', sub: 'organic + paid' },
  { label: 'Global Addressable Market', value: '600M', sub: 'people with flush sensitivity' },
]

const platforms = [
  { name: 'TikTok', role: 'Primary Growth Engine', icon: '🎵', priority: 'HIGH' },
  { name: 'Instagram', role: 'Brand Hub & Conversions', icon: '📸', priority: 'HIGH' },
  { name: 'Pinterest', role: 'Evergreen Discovery', icon: '📌', priority: 'MEDIUM' },
  { name: 'Meta Ads', role: 'Paid Acquisition', icon: '💼', priority: 'HIGH' },
  { name: 'TikTok Ads', role: 'Viral Amplification', icon: '🚀', priority: 'HIGH' },
  { name: 'Email/SMS', role: 'Retention & LTV', icon: '✉️', priority: 'MEDIUM' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF8F4] via-white to-[#EEF3FF] px-6 py-24 text-center">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-[#FD5C1E] blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-[#003882] blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full text-sm font-medium text-[#FD5C1E] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#FD5C1E] animate-pulse"></span>
            Social Media Strategy Hub — Feb 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#0D0D0D] leading-none mb-6 tracking-tight">
            Reshape the way<br />
            <span className="joyn-gradient-text">you celebrate.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Comprehensive paid + organic social strategy, brand positioning, and reusable design templates
            to make Joyn the #1 supplement brand for social drinkers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/strategy"
              className="px-8 py-4 bg-gradient-to-r from-[#FD5C1E] to-[#D72C0D] text-white font-bold rounded-xl text-lg hover:opacity-90 transition-opacity shadow-lg shadow-orange-200"
            >
              View Strategy →
            </Link>
            <Link
              href="/brand"
              className="px-8 py-4 bg-white border-2 border-[#003882] text-[#003882] font-bold rounded-xl text-lg hover:bg-[#003882] hover:text-white transition-colors"
            >
              Brand Guidelines
            </Link>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="bg-[#003882] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-1">{m.value}</div>
                <div className="text-[#87ADEF] text-sm font-semibold uppercase tracking-wide">{m.label}</div>
                <div className="text-blue-300 text-xs mt-1">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy Pillars */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#0D0D0D] mb-4">Strategy Overview</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Five interconnected pillars that work together to grow Joyn from a hidden gem to a household name.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <Link key={p.title} href={p.href} className="group card-hover">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl mb-4`}>
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0D0D0D] mb-2 group-hover:text-[#FD5C1E] transition-colors">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                <div className="mt-4 text-[#FD5C1E] text-sm font-semibold">Explore →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Platform Map */}
      <section className="py-20 px-6 bg-[#FFF8F4]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-[#0D0D0D] mb-3 text-center">Platform Ecosystem</h2>
          <p className="text-gray-500 text-center mb-12">Each platform plays a distinct role in the full-funnel strategy.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {platforms.map((p) => (
              <div key={p.name} className="bg-white rounded-xl p-5 border border-orange-100 card-hover">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{p.icon}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    p.priority === 'HIGH'
                      ? 'bg-red-50 text-[#D72C0D]'
                      : 'bg-blue-50 text-[#003882]'
                  }`}>{p.priority}</span>
                </div>
                <div className="font-bold text-[#0D0D0D] mb-1">{p.name}</div>
                <div className="text-sm text-gray-500">{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center bg-gradient-to-r from-[#FD5C1E] to-[#D72C0D]">
        <h2 className="text-4xl font-black text-white mb-4">Ready to launch?</h2>
        <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
          Explore each section of the strategy hub to see exactly how we are going to make Joyn go viral.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/calendar"
            className="px-8 py-4 bg-white text-[#D72C0D] font-bold rounded-xl hover:bg-orange-50 transition-colors"
          >
            30-Day Launch Calendar
          </Link>
          <Link
            href="/templates"
            className="px-8 py-4 bg-white/20 text-white border-2 border-white/50 font-bold rounded-xl hover:bg-white/30 transition-colors"
          >
            Design Templates
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D0D0D] text-gray-500 py-8 px-6 text-center text-sm">
        <p>Joyn Strategy Hub — Built for Brynn Evans &amp; the Joyn team</p>
        <p className="mt-1">
          <a href="https://www.joynthefun.com" target="_blank" rel="noopener noreferrer" className="text-[#FD5C1E] hover:underline">joynthefun.com</a>
        </p>
      </footer>
    </div>
  )
}
