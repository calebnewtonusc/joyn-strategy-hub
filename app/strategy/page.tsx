'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

// ── Types ──────────────────────────────────────────────────────────────────────
type Pillar = {
  id: string
  icon: string
  title: string
  subtitle: string
  color: string
  colorLight: string
  platforms: string[]
  cadence: string
  formats: string[]
  goal: string
  example: string
  metrics: string
}

type Competitor = {
  name: string
  audience: string
  tone: string
  science: string
  price: string
  founder: string
  aldh2: string
  note: string
}

// ── Data ──────────────────────────────────────────────────────────────────────
const PILLARS: Pillar[] = [
  {
    id: 'education',
    icon: '🧬',
    title: 'Education',
    subtitle: 'The science others won\'t explain',
    color: '#003882',
    colorLight: '#EEF3FC',
    platforms: ['TikTok', 'Instagram'],
    cadence: '3x / week',
    formats: ['Green screen explainers', 'Carousels', 'Save-worthy infographics'],
    goal: 'Build trust as the authority on ALDH2 deficiency. Establish Joyn as the only brand that actually understands the science.',
    example: '"Why your face turns red when you drink — the genetic truth nobody told you" → 60s TikTok with ALDH2 enzyme diagram overlay.',
    metrics: 'Saves rate > 8%, shares > 3%, profile visits after watch',
  },
  {
    id: 'relatable',
    icon: '😭',
    title: 'Relatable Moments',
    subtitle: 'Community built on shared experience',
    color: '#E1306C',
    colorLight: '#FDF2F8',
    platforms: ['TikTok', 'Instagram'],
    cadence: '2x / week',
    formats: ['List posts', 'Duets', 'Comment bait', 'Story polls'],
    goal: 'Make the 600M feel seen and found. Drive comment engagement, saves, and community identity formation.',
    example: '"Things people with Asian flush relate to (a thread) 😭" — trending audio, text list on screen, high comment rate.',
    metrics: 'Comments per post > 50, comment replies, saves, shares with "tagging a friend"',
  },
  {
    id: 'lifestyle',
    icon: '🥂',
    title: 'Lifestyle & Aspiration',
    subtitle: 'What confidence actually looks like',
    color: '#FD5C1E',
    colorLight: '#FFF4F0',
    platforms: ['TikTok', 'Instagram', 'Pinterest'],
    cadence: '2x / week',
    formats: ['Cinematic b-roll', 'Before/after', 'Day-in-the-life', 'Pinterest boards'],
    goal: 'Show the emotional outcome — what life looks like without the mental math. Drive aspiration and brand desire.',
    example: '"Open bar at a wedding with zero anxiety" — cinematic clips, toasts, dancing. Voiceover. Pure aspiration.',
    metrics: 'Link-in-bio clicks, saves to Pinterest boards, story swipe-ups',
  },
  {
    id: 'product',
    icon: '🧡',
    title: 'Product & Brand',
    subtitle: 'Transparent, honest, science-first',
    color: '#D72C0D',
    colorLight: '#FFF1F0',
    platforms: ['Instagram', 'TikTok'],
    cadence: '1–2x / week',
    formats: ['Ingredient breakdowns', 'Founder story', 'UGC reposts', 'Testimonials'],
    goal: 'Build brand trust through radical transparency. Show the formula, tell the founder story, share real customer moments.',
    example: '"Every ingredient in Joyn and exactly why it\'s there 🔬" — green screen ingredient reveal, no proprietary blends.',
    metrics: 'Profile link clicks, DMs, saves, add-to-cart events from link-in-bio',
  },
  {
    id: 'community',
    icon: '💛',
    title: 'Community & Advocacy',
    subtitle: 'Turn customers into the brand',
    color: '#0a7c5c',
    colorLight: '#ECFDF5',
    platforms: ['Instagram', 'TikTok'],
    cadence: '1x / week',
    formats: ['Customer spotlights', 'DM story reposts', 'Q&As', 'Community polls'],
    goal: 'Activate the 600M as brand advocates. Make every customer feel like a co-founder of the movement.',
    example: '"You sent us your stories this month. We can\'t stop reading them." — real DM screenshots, real names (with permission).',
    metrics: 'UGC submissions per month, story reply rate, DM volume',
  },
]

const VOICE_EXAMPLES = [
  {
    do: 'Confidence in a capsule.',
    dont: 'We think this might help with redness...',
    context: 'Primary tagline. Every touchpoint.',
  },
  {
    do: 'Red wine. Not red face. 🍷',
    dont: 'Please buy our supplement for alcohol flush.',
    context: 'Short-form hooks. TikTok CTAs.',
  },
  {
    do: 'You deserve to show up fully.',
    dont: 'Fix your embarrassing flush reaction.',
    context: 'Aspirational copy. Never shame-based.',
  },
  {
    do: 'Formulated to support ALDH2 enzyme activity.',
    dont: 'It just works, trust us.',
    context: 'Product claims. Always science-first.',
  },
  {
    do: 'Woman-founded. USA-made. Third-party tested.',
    dont: 'A great supplement from a cool company!',
    context: 'Brand proof points. Specific > vague.',
  },
  {
    do: '600 million people have been waiting for this.',
    dont: 'Great for anyone who drinks!',
    context: 'Audience definition. Speak to the specific.',
  },
]

const COMPETITORS: Competitor[] = [
  {
    name: 'Joyn',
    audience: '600M with ALDH2 deficiency',
    tone: 'Confident, science-first, celebratory',
    science: 'ALDH2-specific formula, DHM + NAC + B-vitamins',
    price: 'Premium, subscription model',
    founder: 'Woman-founded, ALDH2-affected founder',
    aldh2: 'Core positioning',
    note: 'Only brand built FOR this condition',
  },
  {
    name: 'Pepcid (off-label)',
    audience: 'Anyone who Googles "Asian glow"',
    tone: 'None — not designed for this',
    science: 'H2 blocker — masks symptoms only',
    price: '$10–15 / month',
    founder: 'Big pharma',
    aldh2: 'Does not address',
    note: 'Long-term stomach risk, off-label use',
  },
  {
    name: 'Generic "Hangover" Supplements',
    audience: 'College students, party market',
    tone: 'Party, recovery, bro-culture',
    science: 'Generic antioxidants, no ALDH2 focus',
    price: 'Budget — $15–25',
    founder: 'N/A',
    aldh2: 'Not mentioned',
    note: 'Wrong audience, wrong problem',
  },
  {
    name: 'Morning Recovery',
    audience: 'Hangover cure market',
    tone: 'Recovery-focused, lifestyle',
    science: 'DHM-based but hangover-framed',
    price: '$5–7 / serving',
    founder: 'N/A',
    aldh2: 'Not core positioning',
    note: 'Pre/during, not flush-specific',
  },
]

const METRICS = [
  { label: 'Month 1 Followers', start: 0, end: 2500, suffix: '', prefix: '' },
  { label: 'Month 3 Followers', start: 0, end: 8000, suffix: '+', prefix: '' },
  { label: 'Avg. Engagement Rate', start: 0, end: 6.2, suffix: '%', prefix: '', decimal: true },
  { label: 'Monthly Link Clicks', start: 0, end: 3200, suffix: '+', prefix: '' },
  { label: 'Month 6 Revenue Impact', start: 0, end: 85000, suffix: '+', prefix: '$' },
  { label: 'Target CPM (Meta)', start: 0, end: 10, suffix: '', prefix: '<$' },
]

const CALENDAR_GRID = [
  // Week 1 launch
  { day: 'Mon 2/20', posts: [{ plat: 'Instagram', type: 'Launch Post', color: '#E1306C' }] },
  { day: 'Tue 2/21', posts: [{ plat: 'TikTok', type: 'ALDH2 Education', color: '#FD5C1E' }] },
  { day: 'Wed 2/22', posts: [{ plat: 'Instagram', type: 'Carousel (6)', color: '#E1306C' }] },
  { day: 'Thu 2/23', posts: [{ plat: 'TikTok', type: 'Relatable List', color: '#FD5C1E' }] },
  { day: 'Fri 2/24', posts: [{ plat: 'TikTok', type: 'Story Format', color: '#FD5C1E' }] },
  { day: 'Sat 2/25', posts: [{ plat: 'TikTok', type: 'Short Hook', color: '#FD5C1E' }, { plat: 'Pinterest', type: 'Pin', color: '#E60023' }] },
  { day: 'Sun 2/26', posts: [{ plat: 'Instagram', type: 'Q&A Prompt', color: '#E1306C' }] },
  // Week 2
  { day: 'Mon 2/27', posts: [{ plat: 'TikTok', type: 'Tier List', color: '#FD5C1E' }] },
  { day: 'Tue 2/28', posts: [{ plat: 'TikTok', type: 'Before/After', color: '#FD5C1E' }] },
  { day: 'Wed 3/1',  posts: [{ plat: 'TikTok', type: 'Pepcid Warning', color: '#FD5C1E' }] },
  { day: 'Thu 3/2',  posts: [{ plat: 'TikTok', type: 'Lifestyle', color: '#FD5C1E' }] },
  { day: 'Fri 3/3',  posts: [{ plat: 'Instagram', type: 'Customer Story', color: '#E1306C' }] },
  { day: 'Sat 3/4',  posts: [{ plat: 'Instagram', type: "Women's History", color: '#E1306C' }] },
  { day: 'Sun 3/5',  posts: [{ plat: 'Instagram', type: 'Spring Post', color: '#E1306C' }] },
]

// ── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ end, suffix = '', prefix = '', decimal = false }: {
  end: number; suffix?: string; prefix?: string; decimal?: boolean
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const steps = 60
    const increment = end / steps
    let current = 0
    let step = 0
    const timer = setInterval(() => {
      step++
      current = Math.min(increment * step, end)
      setCount(parseFloat(current.toFixed(decimal ? 1 : 0)))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, end, decimal])

  return (
    <span ref={ref}>
      {prefix}{decimal ? count.toFixed(1) : count.toLocaleString()}{suffix}
    </span>
  )
}

// ── Section header ──────────────────────────────────────────────────────────
function SectionHeader({ label, title, sub }: { label: string; title: string; sub?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }} className="mb-10 sm:mb-14">
      <div className="text-xs font-black text-[#FD5C1E] uppercase tracking-[0.2em] mb-3">{label}</div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0a0a0a] leading-tight mb-4">{title}</h2>
      {sub && <p className="text-gray-500 text-base sm:text-lg max-w-2xl leading-relaxed">{sub}</p>}
    </motion.div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function StrategyPage() {
  const [activePillar, setActivePillar] = useState<string | null>(null)
  const [voiceIndex, setVoiceIndex]     = useState(0)
  const [showDont, setShowDont]         = useState(false)
  const [hoveredComp, setHoveredComp]  = useState<string | null>(null)
  const [downloaded, setDownloaded]     = useState(false)

  const currentVoice = VOICE_EXAMPLES[voiceIndex]
  const expandedPillar = PILLARS.find(p => p.id === activePillar)

  const handleDownload = () => {
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 3000)
    // In production, this would trigger a PDF download
    window.print()
  }

  return (
    <main className="min-h-screen bg-white pt-14">

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #FD5C1E 0%, transparent 50%), radial-gradient(circle at 80% 20%, #003882 0%, transparent 50%)' }} />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{ background: 'linear-gradient(135deg, #FD5C1E 0%, transparent 60%)' }} />

        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-16 py-20 sm:py-28 lg:py-36">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#FD5C1E]" />
              <span className="text-xs font-black text-[#FD5C1E] uppercase tracking-[0.25em]">2026 Social Strategy</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.95] mb-6 max-w-4xl">
              Confidence<br />
              <span style={{ WebkitTextStroke: '2px #FD5C1E', color: 'transparent' }}>in a capsule.</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-xl max-w-xl leading-relaxed mb-10">
              The complete social media strategy for Joyn — the first supplement
              formulated specifically for ALDH2 deficiency. 600 million people are waiting.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a href="#pillars"
                className="inline-flex items-center gap-2 bg-[#FD5C1E] text-white px-6 sm:px-8 py-3.5 rounded-full font-black text-sm btn-brand transition-all hover:bg-[#e54d18]">
                Explore Strategy
                <span className="text-lg">↓</span>
              </a>
              <button
                onClick={handleDownload}
                className={`inline-flex items-center gap-2 border px-6 sm:px-8 py-3.5 rounded-full font-black text-sm transition-all ${downloaded ? 'border-green-500 text-green-400' : 'border-white/20 text-white/70 hover:border-white/50 hover:text-white'}`}>
                {downloaded ? '✓ Downloading...' : 'Download Full Strategy'}
                <span>{downloaded ? '' : '↗'}</span>
              </button>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-16 sm:mt-20 pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
            {[
              { n: '600M', label: 'People with ALDH2 deficiency' },
              { n: '1 in 3', label: 'East Asians carry the gene' },
              { n: '28', label: 'Posts. Feb–Mar 2026' },
              { n: '3', label: 'Platforms. One brand voice.' },
            ].map(({ n, label }) => (
              <div key={label}>
                <div className="text-2xl sm:text-3xl font-black text-white mb-1">{n}</div>
                <div className="text-xs text-gray-500 leading-snug">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT PILLARS ─────────────────────────────────────────────── */}
      <section id="pillars" className="section-anchor px-4 sm:px-6 lg:px-16 py-16 sm:py-24 bg-[#fafafa] border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <SectionHeader
            label="Content Pillars"
            title="Five pillars. One brand voice."
            sub="Every post belongs to a pillar. Every pillar serves a mission. Click each to see the full strategy."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
            {PILLARS.map((pillar, i) => (
              <motion.button
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                onClick={() => setActivePillar(activePillar === pillar.id ? null : pillar.id)}
                className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                  activePillar === pillar.id
                    ? 'border-transparent shadow-lg scale-[1.02]'
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
                }`}
                style={activePillar === pillar.id ? {
                  backgroundColor: pillar.colorLight,
                  borderColor: pillar.color,
                } : undefined}>
                <div className="text-2xl mb-3">{pillar.icon}</div>
                <div className="font-black text-[#0a0a0a] text-sm mb-1">{pillar.title}</div>
                <div className="text-xs text-gray-500 leading-snug mb-3">{pillar.subtitle}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: pillar.color }}>
                  {pillar.cadence}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex gap-1">
                    {pillar.platforms.map(p => (
                      <span key={p} className="text-[9px] font-bold px-1.5 py-0.5 bg-white/80 rounded-full text-gray-500 border border-gray-100">
                        {p.slice(0, 2).toUpperCase()}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{activePillar === pillar.id ? '↑' : '↓'}</span>
                </div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {expandedPillar && (
              <motion.div
                key={expandedPillar.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="overflow-hidden">
                <div className="rounded-2xl border-2 p-6 sm:p-8"
                  style={{ borderColor: expandedPillar.color, backgroundColor: expandedPillar.colorLight }}>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: expandedPillar.color }}>Mission</div>
                      <p className="text-sm text-gray-700 leading-relaxed">{expandedPillar.goal}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: expandedPillar.color }}>Formats</div>
                      <ul className="space-y-1">
                        {expandedPillar.formats.map(f => (
                          <li key={f} className="text-xs text-gray-600 flex items-start gap-1.5">
                            <span style={{ color: expandedPillar.color }} className="mt-0.5 shrink-0">→</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: expandedPillar.color }}>Example Post</div>
                      <p className="text-xs text-gray-600 leading-relaxed italic">{expandedPillar.example}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: expandedPillar.color }}>Success Metrics</div>
                      <p className="text-xs text-gray-600 leading-relaxed">{expandedPillar.metrics}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CALENDAR GRID MOCKUP ─────────────────────────────────────────── */}
      <section id="calendar-overview" className="section-anchor px-4 sm:px-6 lg:px-16 py-16 sm:py-24 border-b border-gray-100 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <SectionHeader
            label="Content Calendar"
            title="Two weeks. Launch to momentum."
            sub="Feb 20 – Mar 5 mapped post by post. Every day has a purpose."
          />

          <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {CALENDAR_GRID.map((cell, i) => (
              <motion.div
                key={cell.day}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3, delay: i * 0.03, ease: EASE }}
                className="bg-white border border-gray-100 rounded-xl p-2 sm:p-3 min-h-[80px] sm:min-h-[100px] hover:border-gray-300 transition-colors group">
                <div className="text-[9px] sm:text-[10px] text-gray-400 font-medium mb-2">{cell.day}</div>
                {cell.posts.map((post, pi) => (
                  <div key={pi} className="mb-1.5">
                    <div className="text-[8px] sm:text-[9px] font-black text-white px-1.5 py-0.5 rounded-md leading-tight"
                      style={{ backgroundColor: post.color }}>
                      {post.plat.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="text-[8px] sm:text-[9px] text-gray-500 mt-0.5 leading-tight line-clamp-2">{post.type}</div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-6 flex-wrap">
            {[
              { label: 'TikTok', color: '#FD5C1E' },
              { label: 'Instagram', color: '#E1306C' },
              { label: 'Pinterest', color: '#E60023' },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: color }} />
                {label}
              </div>
            ))}
            <a href="/" className="ml-auto text-xs font-bold text-[#FD5C1E] hover:underline">
              Open full calendar →
            </a>
          </div>
        </div>
      </section>

      {/* ── BRAND VOICE ─────────────────────────────────────────────────── */}
      <section id="voice" className="section-anchor px-4 sm:px-6 lg:px-16 py-16 sm:py-24 bg-[#0a0a0a] border-b border-gray-900">
        <div className="max-w-screen-xl mx-auto">
          <SectionHeader
            label="Brand Voice"
            title={<span className="text-white">Confident. <span style={{ color: '#FD5C1E' }}>Science-first.</span> Never apologetic.</span> as any}
            sub=""
          />

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Voice navigator */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setShowDont(false)}
                  className={`px-4 py-2 rounded-full text-sm font-black transition-all ${!showDont ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}>
                  DO
                </button>
                <button
                  onClick={() => setShowDont(true)}
                  className={`px-4 py-2 rounded-full text-sm font-black transition-all ${showDont ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}>
                  DON'T
                </button>
                <span className="text-xs text-gray-600 ml-2">Toggle to compare</span>
              </div>

              <div className="space-y-2">
                {VOICE_EXAMPLES.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => setVoiceIndex(i)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      voiceIndex === i
                        ? showDont
                          ? 'border-red-500/50 bg-red-950/20'
                          : 'border-green-500/50 bg-green-950/20'
                        : 'border-white/10 hover:border-white/20'
                    }`}>
                    <p className={`text-sm font-semibold transition-all ${voiceIndex === i ? 'text-white' : 'text-gray-500'}`}>
                      "{showDont ? ex.dont : ex.do}"
                    </p>
                    <p className="text-[10px] text-gray-600 mt-1">{ex.context}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview card */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${voiceIndex}-${showDont}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className={`rounded-2xl p-8 sm:p-10 border-2 ${showDont ? 'border-red-500/30 bg-red-950/10' : 'border-green-500/30 bg-green-950/10'}`}>
                  <div className={`text-xs font-black uppercase tracking-widest mb-6 ${showDont ? 'text-red-400' : 'text-green-400'}`}>
                    {showDont ? "DON'T — This is off-brand" : 'DO — This is Joyn'}
                  </div>
                  <blockquote className="text-2xl sm:text-3xl font-black text-white leading-snug mb-6">
                    "{showDont ? currentVoice.dont : currentVoice.do}"
                  </blockquote>
                  <p className="text-sm text-gray-400">{currentVoice.context}</p>

                  {!showDont && (
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <p className="text-xs text-gray-500 mb-3">Why this works:</p>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {voiceIndex === 0 && 'Three words. Maximum confidence. No hedging. This is the brand.'}
                        {voiceIndex === 1 && 'The contrast does the work. Product benefit communicated in 5 words.'}
                        {voiceIndex === 2 && 'Empowerment, not shame. Joyn never makes the customer feel like the problem.'}
                        {voiceIndex === 3 && 'Science-backed credibility. ALDH2 specificity sets Joyn apart from every competitor.'}
                        {voiceIndex === 4 && 'Three specific proof points. Concrete > vague every time.'}
                        {voiceIndex === 5 && 'The specific number creates urgency and purpose. This is a movement, not a product.'}
                      </p>
                    </div>
                  )}
                  {showDont && (
                    <div className="mt-8 pt-6 border-t border-red-500/20">
                      <p className="text-xs text-red-400 mb-3">Why this fails:</p>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {voiceIndex === 0 && 'Hedging language destroys confidence. Joyn knows what it is.'}
                        {voiceIndex === 1 && 'Weak, begging energy. Joyn leads with the outcome, never the ask.'}
                        {voiceIndex === 2 && 'Shame-based marketing. Joyn is empowerment-first, always.'}
                        {voiceIndex === 3 && 'Vague claims build zero trust. Every claim needs science behind it.'}
                        {voiceIndex === 4 && 'Meaningless superlatives. Joyn uses proof, not adjectives.'}
                        {voiceIndex === 5 && 'Too broad, no identity. The 600M defines the movement.'}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPETITOR TABLE ─────────────────────────────────────────────── */}
      <section id="competitors" className="section-anchor px-4 sm:px-6 lg:px-16 py-16 sm:py-24 bg-white border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <SectionHeader
            label="Competitive Landscape"
            title="No one else is doing this."
            sub="Hover each competitor to see the full comparison. Joyn's moat is clear."
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="text-left py-4 pr-6 text-xs font-black text-gray-300 uppercase tracking-widest w-1/5">Brand</th>
                  <th className="text-left py-4 pr-6 text-xs font-black text-gray-300 uppercase tracking-widest">ALDH2 Focus</th>
                  <th className="text-left py-4 pr-6 text-xs font-black text-gray-300 uppercase tracking-widest">Science</th>
                  <th className="text-left py-4 pr-6 text-xs font-black text-gray-300 uppercase tracking-widest">Audience</th>
                  <th className="text-left py-4 text-xs font-black text-gray-300 uppercase tracking-widest">Risk</th>
                </tr>
              </thead>
              <tbody>
                {COMPETITORS.map((comp, i) => {
                  const isJoyn = comp.name === 'Joyn'
                  const isHovered = hoveredComp === comp.name
                  return (
                    <motion.tr
                      key={comp.name}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                      onMouseEnter={() => setHoveredComp(comp.name)}
                      onMouseLeave={() => setHoveredComp(null)}
                      className={`border-b border-gray-50 transition-all duration-200 cursor-default ${
                        isJoyn ? 'bg-[#FFF4F0]' : isHovered ? 'bg-gray-50' : ''
                      }`}>
                      <td className="py-5 pr-6">
                        <div className={`font-black text-sm ${isJoyn ? 'text-[#FD5C1E]' : 'text-[#0a0a0a]'}`}>
                          {comp.name}
                          {isJoyn && <span className="ml-2 text-[9px] bg-[#FD5C1E] text-white px-1.5 py-0.5 rounded-full font-black">US</span>}
                        </div>
                        {isHovered && !isJoyn && (
                          <div className="text-[10px] text-gray-400 mt-0.5">{comp.note}</div>
                        )}
                      </td>
                      <td className="py-5 pr-6">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          isJoyn
                            ? 'bg-[#FD5C1E] text-white'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {comp.aldh2}
                        </span>
                      </td>
                      <td className="py-5 pr-6">
                        <p className="text-xs text-gray-600 leading-snug max-w-[180px]">{comp.science}</p>
                      </td>
                      <td className="py-5 pr-6">
                        <p className="text-xs text-gray-500 leading-snug max-w-[160px]">{comp.audience}</p>
                      </td>
                      <td className="py-5">
                        {isJoyn ? (
                          <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">Low</span>
                        ) : (
                          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                            {i === 1 ? 'High' : 'Med'}
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-[#0a0a0a] rounded-2xl">
            <p className="text-sm font-black text-white mb-2">The Joyn Moat</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              No competitor addresses ALDH2 deficiency as the core positioning. The category is unclaimed.
              Joyn's first-mover advantage — woman-founded, science-backed, community-led — is a durable differentiator.
              The window to own "flush supplement" in social search is open right now.
            </p>
          </div>
        </div>
      </section>

      {/* ── METRICS PROJECTIONS ──────────────────────────────────────────── */}
      <section id="metrics" className="section-anchor px-4 sm:px-6 lg:px-16 py-16 sm:py-24 bg-[#FFF8F4] border-b border-orange-50">
        <div className="max-w-screen-xl mx-auto">
          <SectionHeader
            label="Projections"
            title="What success looks like."
            sub="Six-month targets built on platform benchmarks and launch-brand comps in the supplement space."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="bg-white rounded-2xl border border-orange-100 p-5 sm:p-6">
                <div className="text-2xl sm:text-3xl font-black text-[#FD5C1E] mb-1">
                  <AnimatedCounter end={m.end} suffix={m.suffix} prefix={m.prefix} decimal={m.decimal} />
                </div>
                <div className="text-xs text-gray-500 font-medium leading-snug">{m.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Growth bar visualization */}
          <div className="bg-white rounded-2xl border border-orange-100 p-6 sm:p-8">
            <h3 className="text-sm font-black text-[#0a0a0a] mb-6">Follower Growth Trajectory</h3>
            <div className="space-y-4">
              {[
                { month: 'Month 1 (Launch)', followers: 2500, max: 20000, note: 'Launch push, paid seeding' },
                { month: 'Month 2', followers: 5200, max: 20000, note: 'Organic compounding begins' },
                { month: 'Month 3', followers: 8000, max: 20000, note: 'First viral post expected' },
                { month: 'Month 4', followers: 12000, max: 20000, note: 'Creator collab traffic' },
                { month: 'Month 5', followers: 16500, max: 20000, note: 'Spring season peak' },
                { month: 'Month 6', followers: 20000, max: 20000, note: 'Target: 20K across platforms' },
              ].map((row, i) => (
                <div key={row.month} className="flex items-center gap-4">
                  <div className="text-xs text-gray-500 w-28 sm:w-36 shrink-0">{row.month}</div>
                  <div className="flex-1 h-2.5 bg-orange-50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(row.followers / row.max) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #FD5C1E, #D72C0D)' }}
                    />
                  </div>
                  <div className="text-xs font-bold text-[#FD5C1E] w-14 text-right shrink-0">{row.followers.toLocaleString()}</div>
                  <div className="text-[9px] text-gray-400 hidden sm:block w-40 shrink-0">{row.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PLATFORM STRATEGY ────────────────────────────────────────────── */}
      <section id="platforms" className="section-anchor px-4 sm:px-6 lg:px-16 py-16 sm:py-24 bg-white border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <SectionHeader
            label="Platform Breakdown"
            title="Right content. Right platform. Right time."
            sub="Each platform requires a distinct approach. Same brand, different format."
          />

          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                platform: 'TikTok',
                color: '#FD5C1E',
                role: 'Primary growth engine',
                cadence: '4–5x / week',
                formats: ['60s educational hooks', 'Green screen explainers', 'Trend-driven relatable content', 'First-person stories'],
                audience: '18–35, AAPI community, health-curious',
                goal: 'Reach + awareness. Get found by the 600M who haven\'t discovered their condition.',
                kpi: '10K followers by Month 3',
              },
              {
                platform: 'Instagram',
                color: '#E1306C',
                role: 'Community & conversion',
                cadence: '3–4x / week',
                formats: ['6-slide carousels', 'Founder content', 'Customer spotlights', 'Story polls + Q&As'],
                audience: '25–40, wellness-oriented, AAPI professionals',
                goal: 'Build community. Drive link-in-bio traffic. Turn followers into customers.',
                kpi: '6K followers, 5%+ engagement',
              },
              {
                platform: 'Pinterest',
                color: '#E60023',
                role: 'Long-tail SEO',
                cadence: '2–3x / week',
                formats: ['Educational infographics', 'Lifestyle boards', 'Ingredient breakdowns', 'Celebration inspiration'],
                audience: '25–45, research-intent, purchase-ready',
                goal: 'Capture high-intent search traffic. "Alcohol flush remedy" is a top search term.',
                kpi: 'Monthly impressions > 50K by Month 4',
              },
            ].map((plat, i) => (
              <motion.div
                key={plat.platform}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 transition-colors card-hover">
                <div className="p-1">
                  <div className="rounded-xl p-5 sm:p-6 text-white" style={{ backgroundColor: plat.color }}>
                    <div className="text-xs font-black uppercase tracking-widest opacity-70 mb-1">{plat.role}</div>
                    <div className="text-xl font-black">{plat.platform}</div>
                    <div className="text-sm opacity-80 mt-1">{plat.cadence}</div>
                  </div>
                </div>
                <div className="p-5 sm:p-6 space-y-4">
                  <div>
                    <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">Formats</div>
                    <ul className="space-y-1">
                      {plat.formats.map(f => (
                        <li key={f} className="text-xs text-gray-600 flex items-start gap-1.5">
                          <span className="mt-0.5 shrink-0 text-gray-300">·</span>{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Goal</div>
                    <p className="text-xs text-gray-500 leading-relaxed">{plat.goal}</p>
                  </div>
                  <div className="pt-2 border-t border-gray-50">
                    <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: plat.color }}>6-Month KPI</div>
                    <p className="text-xs font-semibold text-[#0a0a0a]">{plat.kpi}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ───────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-16 py-16 sm:py-24"
        style={{ background: 'linear-gradient(135deg, #FD5C1E 0%, #D72C0D 50%, #003882 100%)' }}>
        <div className="max-w-screen-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}>
            <div className="text-xs font-black text-white/60 uppercase tracking-[0.25em] mb-4">Ready to Execute</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              600 million people<br />are waiting.
            </h2>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-10">
              The strategy is built. The calendar is mapped. The brand voice is defined.
              The only thing left is to post.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="/"
                className="inline-flex items-center gap-2 bg-white text-[#FD5C1E] px-7 py-3.5 rounded-full font-black text-sm hover:bg-[#FFF4F0] transition-colors">
                Open Content Calendar
                <span>→</span>
              </a>
              <button
                onClick={handleDownload}
                className={`inline-flex items-center gap-2 border-2 border-white/40 text-white px-7 py-3.5 rounded-full font-black text-sm hover:border-white hover:bg-white/10 transition-all ${downloaded ? 'border-white/80 bg-white/10' : ''}`}>
                {downloaded ? '✓ Downloading...' : 'Download Strategy PDF'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
