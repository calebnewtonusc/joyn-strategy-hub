'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const COLORS = [
  { name: 'Joyn Orange', hex: '#FD5C1E', use: 'CTAs, hero, energy', pantone: 'PMS 172 C' },
  { name: 'Joyn Red',    hex: '#D72C0D', use: 'Urgency, gradients',  pantone: 'PMS 485 C' },
  { name: 'Navy',        hex: '#003882', use: 'Trust, authority',    pantone: 'PMS 288 C' },
  { name: 'Sky Blue',    hex: '#87ADEF', use: 'Soft accent',         pantone: 'PMS 292 C' },
  { name: 'Cream',       hex: '#FFF8F4', use: 'Page backgrounds',    pantone: 'Warm White' },
  { name: 'Dark',        hex: '#0D0D0D', use: 'Primary text',        pantone: 'Black C' },
]

const TAGLINES = [
  { line: 'Confidence in a capsule.',                   note: 'Primary — use everywhere',     tag: 'PRIMARY' },
  { line: 'Reshape the way you celebrate.',             note: 'Brand mission statement',       tag: null },
  { line: 'Red wine. Not red face.',                    note: 'TikTok hooks, short-form',      tag: 'HOOK' },
  { line: 'More confident nights, brighter mornings.',  note: 'Full benefit arc',              tag: null },
  { line: 'Confidence you can see. Redness you cannot.', note: 'Visual contrast ads',          tag: 'ADS' },
  { line: 'Celebrate without limits.',                  note: 'Campaign tagline',              tag: null },
  { line: 'For the 600M who\'ve been ignored.',         note: 'Community-facing, movement',    tag: 'MOVEMENT' },
]

const DO_DONTS = [
  {
    category: 'Headlines',
    do:   'Confidence in a capsule.',
    dont: 'We think this might help with redness...',
    doWhy:   'Three words. Maximum confidence. No hedging. The brand knows what it is.',
    dontWhy: 'Hedging language destroys authority. Joyn never qualifies itself.',
  },
  {
    category: 'Short-form hooks',
    do:   'Red wine. Not red face. 🍷',
    dont: 'Please try our supplement for alcohol flush.',
    doWhy:   'The contrast communicates everything in 5 words. Product benefit implied, not stated.',
    dontWhy: 'Begging energy. Joyn leads with the outcome, never the ask.',
  },
  {
    category: 'Customer language',
    do:   'You deserve to show up fully.',
    dont: 'Fix your embarrassing flush reaction.',
    doWhy:   'Empowerment over shame. Joyn always celebrates the customer, never makes them the problem.',
    dontWhy: 'Shame-based marketing. The word "embarrassing" makes the customer feel bad. Never use it.',
  },
  {
    category: 'Product claims',
    do:   'Formulated to support ALDH2 enzyme activity.',
    dont: 'It just works, trust us.',
    doWhy:   'Science-backed specificity builds trust. ALDH2 is the differentiator — always use it.',
    dontWhy: 'Vague claims build zero trust. Every claim needs the science behind it.',
  },
  {
    category: 'Brand proof points',
    do:   'Woman-founded. USA-made. Third-party tested.',
    dont: 'A great supplement from a cool company!',
    doWhy:   'Three specific, verifiable proof points. Concrete beats adjectives every time.',
    dontWhy: 'Meaningless. "Great" and "cool" say nothing about why Joyn is different.',
  },
  {
    category: 'Audience definition',
    do:   '600 million people have been waiting for this.',
    dont: 'Great for anyone who drinks!',
    doWhy:   'The specific number creates urgency and purpose. This is a movement for a defined community.',
    dontWhy: 'Too broad, no identity. The 600M is the brand\'s superpower — never dilute it.',
  },
]

const VOICE_TRAITS = [
  { trait: 'Confident', desc: 'Joyn knows exactly what it is and who it\'s for. No hedging, no apologizing.', icon: '⚡' },
  { trait: 'Science-First', desc: 'Every claim is grounded in ALDH2 biology. Specific > vague, always.', icon: '🔬' },
  { trait: 'Celebratory', desc: 'This is about showing up, not hiding. Energy is warm, joyful, aspirational.', icon: '🥂' },
  { trait: 'Inclusive', desc: 'Not just East Asian. The 600M spans backgrounds. Welcome everyone with the gene.', icon: '💛' },
  { trait: 'Never Shameful', desc: 'The flush is not an embarrassment — it\'s a genetic condition. Joyn never mocks or shames.', icon: '🧡' },
]

function ColorSwatch({ c }: { c: typeof COLORS[0] }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(c.hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button onClick={copy} className="group text-left">
      <div className="h-16 sm:h-20 rounded-xl mb-2.5 relative overflow-hidden shadow-sm transition-transform group-hover:scale-[1.03]"
        style={{ backgroundColor: c.hex }}>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 flex items-center justify-center">
          <motion.span
            initial={false}
            animate={{ opacity: copied ? 1 : 0, scale: copied ? 1 : 0.8 }}
            className="text-white text-xs font-black bg-black/30 px-2.5 py-1 rounded-full">
            {copied ? 'Copied!' : 'Copy'}
          </motion.span>
        </div>
      </div>
      <div className="font-bold text-[#0D0D0D] text-xs">{c.name}</div>
      <div className="text-xs font-mono text-gray-400">{c.hex}</div>
      <div className="text-[10px] text-gray-400 mt-0.5">{c.use}</div>
    </button>
  )
}

function SectionLabel({ text }: { text: string }) {
  return <div className="text-[10px] font-black text-[#FD5C1E] uppercase tracking-[0.2em] mb-3">{text}</div>
}

export default function BrandPage() {
  const [activeDoDont, setActiveDoDont] = useState(0)
  const [showDont, setShowDont]         = useState(false)
  const [activeTagline, setActiveTagline] = useState<number | null>(null)
  const [copiedTag, setCopiedTag]       = useState<number | null>(null)

  const copyTagline = (i: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedTag(i)
    setTimeout(() => setCopiedTag(null), 1800)
  }

  const current = DO_DONTS[activeDoDont]

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-14">

      {/* ── HERO ── */}
      <section className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-16 py-14 sm:py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}>
            <SectionLabel text="Brand Guide" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0D0D0D] leading-tight mb-4">
              How Joyn looks.<br />
              <span className="text-gradient">How Joyn sounds.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
              One page. Every brand decision. Stay on-voice across every touchpoint, every platform, every post.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-16 py-14 sm:py-20 space-y-20 sm:space-y-28">

        {/* ── COLORS ── */}
        <section id="colors">
          <SectionLabel text="Color System" />
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D0D0D] mb-2">The palette.</h2>
          <p className="text-gray-400 text-sm mb-8">Click any swatch to copy the hex code.</p>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 mb-6">
            {COLORS.map((c, i) => (
              <motion.div key={c.hex}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}>
                <ColorSwatch c={c} />
              </motion.div>
            ))}
          </div>

          {/* Gradients */}
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: 'Warm Gradient — Primary CTA', from: '#FD5C1E', to: '#D72C0D' },
              { label: 'Navy Gradient — Trust, Authority', from: '#003882', to: '#0052CC' },
              { label: 'Full Brand Gradient — Hero Moments', from: '#FD5C1E', via: '#D72C0D', to: '#003882' },
            ].map(g => (
              <div key={g.label}
                className="h-14 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-sm"
                style={{ background: g.via
                  ? `linear-gradient(135deg, ${g.from}, ${g.via}, ${g.to})`
                  : `linear-gradient(135deg, ${g.from}, ${g.to})` }}>
                {g.label}
              </div>
            ))}
          </div>
        </section>

        {/* ── TYPOGRAPHY ── */}
        <section id="typography">
          <SectionLabel text="Typography" />
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D0D0D] mb-8">Inter, all weights.</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {[
              { label: 'Hero / Display — Black 900', cls: 'text-5xl font-black text-[#0D0D0D] leading-none', t: 'Confidence.' },
              { label: 'Heading — ExtraBold 800', cls: 'text-3xl font-extrabold text-[#0D0D0D]', t: 'Reshape the way you celebrate.' },
              { label: 'Subheading — Bold 700', cls: 'text-xl font-bold text-[#0D0D0D]', t: 'The supplement nobody knew they needed.' },
              { label: 'Body — Regular 400', cls: 'text-base text-gray-600 leading-relaxed', t: 'ALDH2 deficiency affects 600 million people worldwide. Joyn is the first supplement formulated specifically for them.' },
              { label: 'Small / Caption — Medium 500', cls: 'text-sm text-gray-500', t: 'Woman-founded. USA-made. Third-party tested.' },
              { label: 'Label — SemiBold Uppercase', cls: 'text-xs font-semibold uppercase tracking-[0.2em] text-gray-400', t: 'CONFIDENCE · FLUSH-FREE · USA MADE' },
            ].map((row, i) => (
              <div key={row.label}
                className={`px-6 sm:px-8 py-5 ${i < 5 ? 'border-b border-gray-50' : ''}`}>
                <div className="text-[10px] text-gray-300 font-medium mb-2">{row.label}</div>
                <p className={row.cls}>{row.t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── VOICE TRAITS ── */}
        <section id="voice">
          <SectionLabel text="Voice & Tone" />
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D0D0D] mb-2">
            Joyn is <span className="text-gradient">confident, celebratory, inclusive, witty, and science-backed.</span>
          </h2>
          <p className="text-gray-400 text-sm mb-8">Five traits. Every post should hit at least two.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-14">
            {VOICE_TRAITS.map((v, i) => (
              <motion.div key={v.trait}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                className="bg-white border border-gray-100 rounded-2xl p-5 card-hover">
                <div className="text-2xl mb-3">{v.icon}</div>
                <div className="font-black text-[#0D0D0D] text-sm mb-2">{v.trait}</div>
                <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Interactive DO/DON'T */}
          <div className="bg-[#0a0a0a] rounded-3xl p-6 sm:p-10">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Brand Voice Examples</div>
                <h3 className="text-xl sm:text-2xl font-black text-white">DO / DON'T</h3>
              </div>
              <div className="flex items-center gap-2 bg-white/10 p-1 rounded-full">
                <button
                  onClick={() => setShowDont(false)}
                  className={`px-5 py-2 rounded-full text-sm font-black transition-all ${!showDont ? 'bg-green-500 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}>
                  DO
                </button>
                <button
                  onClick={() => setShowDont(true)}
                  className={`px-5 py-2 rounded-full text-sm font-black transition-all ${showDont ? 'bg-red-500 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}>
                  DON'T
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 items-start">
              {/* Category list */}
              <div className="space-y-2">
                {DO_DONTS.map((item, i) => (
                  <button
                    key={item.category}
                    onClick={() => setActiveDoDont(i)}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                      activeDoDont === i
                        ? showDont
                          ? 'border-red-500/40 bg-red-950/20'
                          : 'border-green-500/40 bg-green-950/20'
                        : 'border-white/10 hover:border-white/20'
                    }`}>
                    <div className="text-[10px] font-black uppercase tracking-widest mb-1"
                      style={{ color: activeDoDont === i ? (showDont ? '#f87171' : '#4ade80') : '#6b7280' }}>
                      {item.category}
                    </div>
                    <p className={`text-sm font-semibold transition-colors ${activeDoDont === i ? 'text-white' : 'text-gray-500'}`}>
                      "{showDont ? item.dont : item.do}"
                    </p>
                  </button>
                ))}
              </div>

              {/* Preview */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeDoDont}-${showDont}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className={`rounded-2xl p-7 sm:p-8 border-2 ${showDont ? 'border-red-500/30 bg-red-950/10' : 'border-green-500/30 bg-green-950/10'}`}>
                  <div className={`text-xs font-black uppercase tracking-widest mb-5 ${showDont ? 'text-red-400' : 'text-green-400'}`}>
                    {showDont ? "DON'T — Off-brand" : 'DO — This is Joyn'}
                  </div>
                  <blockquote className="text-xl sm:text-2xl font-black text-white leading-snug mb-6">
                    "{showDont ? current.dont : current.do}"
                  </blockquote>
                  <div className={`text-xs leading-relaxed p-4 rounded-xl ${showDont ? 'bg-red-950/30 text-red-200' : 'bg-green-950/30 text-green-200'}`}>
                    <div className="font-bold mb-1">{showDont ? 'Why this fails:' : 'Why this works:'}</div>
                    {showDont ? current.dontWhy : current.doWhy}
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <div className="text-[10px] text-gray-500 font-medium">Context</div>
                    <div className="text-xs text-gray-400 mt-1">{current.category}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── TAGLINES ── */}
        <section id="taglines">
          <SectionLabel text="Tagline Bank" />
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D0D0D] mb-2">Seven taglines. One primary.</h2>
          <p className="text-gray-400 text-sm mb-8">Click any tagline to expand context. Click copy to grab it.</p>

          <div className="space-y-2">
            {TAGLINES.map((t, i) => (
              <motion.div
                key={t.line}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}>
                <button
                  onClick={() => setActiveTagline(activeTagline === i ? null : i)}
                  className={`w-full text-left flex items-center gap-4 bg-white rounded-2xl border px-5 sm:px-6 py-4 sm:py-5 group transition-all ${
                    activeTagline === i
                      ? 'border-[#FD5C1E] shadow-sm'
                      : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
                  }`}>
                  <span className="text-2xl font-black text-gray-100 w-8 shrink-0 text-right">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-black text-sm sm:text-base leading-snug transition-colors ${activeTagline === i ? 'text-[#FD5C1E]' : 'text-[#0D0D0D] group-hover:text-[#0D0D0D]'}`}>
                      {t.line}
                    </p>
                    {activeTagline === i && (
                      <p className="text-xs text-gray-400 mt-1">{t.note}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {t.tag && (
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                        t.tag === 'PRIMARY'
                          ? 'bg-[#FD5C1E] text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {t.tag}
                      </span>
                    )}
                    <button
                      onClick={e => { e.stopPropagation(); copyTagline(i, t.line) }}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                        copiedTag === i
                          ? 'bg-green-50 text-green-600 border-green-200'
                          : 'border-gray-200 text-gray-400 hover:border-[#FD5C1E] hover:text-[#FD5C1E]'
                      }`}>
                      {copiedTag === i ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── POSITIONING ── */}
        <section id="positioning">
          <SectionLabel text="Brand Positioning" />
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D0D0D] mb-8">The one-page brief.</h2>

          <div className="bg-[#003882] rounded-3xl p-8 sm:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              <div className="space-y-6">
                {[
                  { label: 'For', text: 'Young adults (21–40) with ALDH2 deficiency who want to socialize without embarrassment or compromise' },
                  { label: 'Who are frustrated by', text: 'Off-label hacks (Pepcid) that cause real health damage and don\'t actually address the genetic root cause' },
                  { label: 'Joyn is the only', text: 'Proactive, flush-first supplement — woman-founded, USA-made, built for the 600M who\'ve been ignored by every other brand' },
                  { label: 'Unlike alternatives', text: 'Joyn addresses ALDH2 enzyme activity directly — not masking symptoms, not hangover recovery, but targeted metabolic support' },
                ].map(row => (
                  <div key={row.label}>
                    <div className="text-[10px] font-black text-[#87ADEF] uppercase tracking-[0.2em] mb-1.5">{row.label}</div>
                    <p className="text-sm font-semibold leading-relaxed text-blue-50">{row.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex-1 bg-gradient-to-br from-[#FD5C1E] to-[#D72C0D] rounded-2xl p-7 flex items-center justify-center text-center">
                  <p className="text-2xl sm:text-3xl font-black leading-tight">"Reshape the way<br />you celebrate."</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-5 text-center">
                  <div className="text-[10px] font-black text-[#87ADEF] uppercase tracking-widest mb-2">Primary Tagline</div>
                  <p className="text-lg font-black">"Confidence in a capsule."</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['Woman-Founded', 'USA-Made', 'Third-Party Tested'].map(badge => (
                    <div key={badge} className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-[10px] font-black text-blue-200 leading-snug">{badge}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── USAGE RULES ── */}
        <section id="rules">
          <SectionLabel text="Usage Rules" />
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D0D0D] mb-8">Always. Sometimes. Never.</h2>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                type: 'Always',
                color: '#10b981',
                bg: '#ecfdf5',
                border: '#a7f3d0',
                items: [
                  'Use "ALDH2 deficiency" — not "Asian glow" as a brand term',
                  'Lead with the science — DHM, NAC, ALDH2',
                  'Attribute to 600 million people worldwide (not just East Asian)',
                  'Include "woman-founded" in launch-era content',
                  'Use warm orange and cream for primary brand moments',
                ],
              },
              {
                type: 'Sometimes',
                color: '#f59e0b',
                bg: '#fffbeb',
                border: '#fde68a',
                items: [
                  '"Asian Glow" as an audience-understood search term (not a brand word)',
                  'Humor — when it\'s solidarity, never mockery',
                  'Navy for trust-building content (ingredient, science posts)',
                  'Sky Blue as a soft accent for educational content',
                  '"Hangover" adjacent keywords for SEO/search discovery only',
                ],
              },
              {
                type: 'Never',
                color: '#ef4444',
                bg: '#fef2f2',
                border: '#fecaca',
                items: [
                  'Shame-based language — never make the customer feel broken',
                  'Unverified medical claims without third-party backing',
                  'Fabricated testimonials or placeholder content posted live',
                  '"Cure" or "treat" — regulatory risk',
                  'Compare directly to Pepcid by name in paid ads (organic OK)',
                ],
              },
            ].map(col => (
              <motion.div key={col.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
                className="rounded-2xl border-2 p-6"
                style={{ borderColor: col.border, backgroundColor: col.bg }}>
                <div className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: col.color }}>
                  {col.type}
                </div>
                <ul className="space-y-2.5">
                  {col.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-700 leading-relaxed">
                      <span style={{ color: col.color }} className="mt-0.5 shrink-0 font-black text-base leading-none">
                        {col.type === 'Always' ? '✓' : col.type === 'Never' ? '✗' : '→'}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
