import Link from 'next/link'

const sections = [
  {
    href: '/content',
    tag: 'Most Used',
    title: 'Content Kit',
    desc: 'Visual post mockups, TikTok scripts, and a ready-to-use caption bank. Grab and go.',
    bg: 'bg-[#FD5C1E]',
    stat: '39 posts ready',
  },
  {
    href: '/calendar',
    tag: 'Execute',
    title: '30-Day Calendar',
    desc: 'Visual grid calendar. See what to post every day, every platform, in one view.',
    bg: 'bg-[#003882]',
    stat: 'Days 1–30 mapped',
  },
  {
    href: '/ads',
    tag: 'Growth',
    title: 'Paid Ads',
    desc: 'Meta + TikTok ad mockups, audience targeting, and budget allocation.',
    bg: 'bg-[#0D0D0D]',
    stat: '$5K/mo → 4.5x ROAS',
  },
  {
    href: '/brand',
    tag: 'Reference',
    title: 'Brand Guide',
    desc: 'Colors, fonts, voice, and taglines. One page. Everything you need to stay on brand.',
    bg: 'bg-[#D72C0D]',
    stat: 'v1.0 locked',
  },
]

const wins = [
  { n: '600M', label: 'people with ALDH2 deficiency' },
  { n: '#1', label: 'flush-first supplement' },
  { n: '30', label: 'days to launch dominance' },
  { n: '4.5x', label: 'target paid ROAS' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero */}
      <section className="px-6 pt-24 pb-16 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FD5C1E] animate-pulse"></span>
            Social Media Strategy · Feb 2026
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-[#0D0D0D] leading-none mb-6 tracking-tight">
            The Joyn<br />
            <span style={{ WebkitTextStroke: '3px #FD5C1E', color: 'transparent' }}>Playbook.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
            Paid + organic social strategy for the supplement that gives 600 million people their confidence back.
            Everything you need to execute — in one place.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="px-6 pb-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {wins.map((w) => (
            <div key={w.label} className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="text-4xl font-black text-[#FD5C1E] mb-1">{w.n}</div>
              <div className="text-sm text-gray-500">{w.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section cards */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="group block">
              <div className={`${s.bg} rounded-2xl p-8 h-full text-white relative overflow-hidden hover:scale-[1.01] transition-transform`}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 translate-x-8 -translate-y-8"></div>
                <div className="relative">
                  <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">{s.tag}</div>
                  <h2 className="text-3xl font-black mb-3">{s.title}</h2>
                  <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold bg-white/15 px-3 py-1.5 rounded-full">{s.stat}</span>
                    <span className="text-white/60 group-hover:text-white transition-colors text-xl">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tagline */}
      <section className="px-6 pb-24 max-w-7xl mx-auto text-center">
        <div className="bg-[#0D0D0D] rounded-3xl px-8 py-16">
          <p className="text-4xl md:text-6xl font-black text-white leading-tight max-w-3xl mx-auto">
            &ldquo;Confidence in a capsule.&rdquo;
          </p>
          <p className="text-gray-500 mt-4">— Primary tagline. Use it everywhere.</p>
        </div>
      </section>
    </div>
  )
}
