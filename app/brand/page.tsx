export default function BrandPage() {
  const colors = [
    { name: 'Joyn Orange', hex: '#FD5C1E', usage: 'Primary CTAs, hero accents, energy', text: 'white' },
    { name: 'Joyn Red', hex: '#D72C0D', usage: 'Urgency, power statements, gradients', text: 'white' },
    { name: 'Joyn Navy', hex: '#003882', usage: 'Trust, stability, dark backgrounds', text: 'white' },
    { name: 'Joyn Blue', hex: '#87ADEF', usage: 'Softness, accessibility, light accents', text: 'dark' },
    { name: 'Joyn Cream', hex: '#FFF8F4', usage: 'Page backgrounds, warmth', text: 'dark' },
    { name: 'Pure White', hex: '#FFFFFF', usage: 'Cards, clean space, contrast', text: 'dark' },
  ]

  const typography = [
    { name: 'Display / Hero', weight: '900 Black', size: '64–96px', use: 'Hero headlines, campaign statements' },
    { name: 'Heading 1', weight: '800 ExtraBold', size: '40–56px', use: 'Section titles, page headers' },
    { name: 'Heading 2', weight: '700 Bold', size: '24–32px', use: 'Card titles, sub-sections' },
    { name: 'Body Large', weight: '400 Regular', size: '18–20px', use: 'Lead paragraphs, hero subtitles' },
    { name: 'Body', weight: '400 Regular', size: '14–16px', use: 'General body copy, descriptions' },
    { name: 'Label / Caption', weight: '600 SemiBold', size: '10–12px', use: 'Tags, chips, metadata' },
  ]

  const voiceTraits = [
    { trait: 'Confident', desc: 'Joyn speaks with authority. No hedging, no apologies.', doEx: 'Confidence in a capsule.', dontEx: 'We think this might help with redness...' },
    { trait: 'Celebratory', desc: 'Every post feels like a toast. Life is meant to be enjoyed.', doEx: 'Cheers to every moment — with zero flush.', dontEx: 'Reduce the symptoms of your drinking problem.' },
    { trait: 'Inclusive', desc: 'Built for the 600M. No shame, no judgment — just solutions.', doEx: 'You deserve to show up fully.', dontEx: 'Fix your embarrassing flush.' },
    { trait: 'Witty', desc: 'Sharp, not snarky. Clever hooks that make people stop scrolling.', doEx: 'Red wine, not red face.', dontEx: 'Please buy our supplement for alcohol flush.' },
    { trait: 'Science-Backed', desc: 'Earned authority through ingredient transparency and research.', doEx: 'Formulated to support ALDH2 enzyme activity.', dontEx: 'It just works, trust us.' },
  ]

  const taglines = [
    { line: 'Confidence in a capsule.', context: 'Primary tagline — product core benefit' },
    { line: 'Reshape the way you celebrate.', context: 'Brand mission — lifestyle shift' },
    { line: 'More confident nights, brighter mornings.', context: 'Full benefit arc — night + next day' },
    { line: 'Confidence you can see. Redness you cannot.', context: 'Visual contrast — clever wordplay' },
    { line: 'Red wine. Not red face.', context: 'Social / TikTok hook — punchy & shareable' },
    { line: 'Celebrate without limits.', context: 'Aspirational — freedom positioning' },
    { line: 'For the 600 million who deserve to celebrate freely.', context: 'Awareness / educational content' },
  ]

  const competitors = [
    { name: 'Morning Recovery', pos: 'Hangover recovery', gap: 'Reactive, not proactive. No flush focus.' },
    { name: 'Cheers', pos: 'Party wellness', gap: 'Bro-culture, less inclusive, weak on flush.' },
    { name: 'Thrive+', pos: 'Alcohol detox', gap: 'Medical-heavy, not celebratory.' },
    { name: 'Antacids (Pepcid)', pos: 'Off-label flush hack', gap: 'Not designed for this. Real health risks.' },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0D0D0D] to-[#1a1a2e] px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-white/60 text-sm font-medium mb-6">Brand Guidelines v1.0</div>
          <h1 className="text-5xl font-black text-white mb-4">Brand Identity</h1>
          <p className="text-gray-400 text-lg">The visual and verbal language of Joyn — how we look, sound, and feel across every touchpoint.</p>
        </div>
      </section>

      {/* Mission & Positioning */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-[#0D0D0D] mb-6">Brand Positioning</h2>
            <div className="space-y-4">
              <div className="bg-[#FFF8F4] rounded-xl p-5 border-l-4 border-[#FD5C1E]">
                <div className="text-xs font-bold text-[#FD5C1E] uppercase tracking-wide mb-1">Category</div>
                <div className="font-semibold text-[#0D0D0D]">Proactive wellness supplement for social drinkers</div>
              </div>
              <div className="bg-[#EEF3FF] rounded-xl p-5 border-l-4 border-[#003882]">
                <div className="text-xs font-bold text-[#003882] uppercase tracking-wide mb-1">Target Customer</div>
                <div className="font-semibold text-[#0D0D0D]">Young adults (21–40) with ALDH2 deficiency who want to socialize without embarrassment or discomfort</div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Core Promise</div>
                <div className="font-semibold text-[#0D0D0D]">Joyn gives you the freedom to celebrate fully — no flush, no hangover, no holding back</div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Reason to Believe</div>
                <div className="font-semibold text-[#0D0D0D]">Naturally-sourced, USA-made formula specifically designed to support alcohol metabolism — not an off-label hack</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#FD5C1E] to-[#003882] rounded-3xl p-8 text-white">
            <div className="text-6xl font-black opacity-20 mb-4">&ldquo;</div>
            <p className="text-2xl font-bold leading-snug mb-6">Joyn is the first supplement built specifically for the 600 million people who flush when they drink — designed to make celebration feel like celebration again.</p>
            <div className="text-orange-200 text-sm">— Brand Manifesto</div>
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="py-20 px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-[#0D0D0D] mb-3">Color Palette</h2>
          <p className="text-gray-500 mb-10">Warm energy meets trustworthy depth. Orange confidence, navy authority.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {colors.map((c) => (
              <div key={c.hex} className="group card-hover">
                <div
                  className="h-24 rounded-xl mb-3 flex items-end p-3"
                  style={{ backgroundColor: c.hex }}
                >
                  <span className={`text-xs font-mono font-bold ${c.text === 'white' ? 'text-white' : 'text-gray-700'} opacity-80`}>
                    {c.hex}
                  </span>
                </div>
                <div className="font-semibold text-sm text-[#0D0D0D]">{c.name}</div>
                <div className="text-xs text-gray-500 mt-1">{c.usage}</div>
              </div>
            ))}
          </div>
          {/* Gradient Examples */}
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            <div className="h-20 rounded-xl bg-gradient-to-r from-[#FD5C1E] to-[#D72C0D] flex items-center justify-center">
              <span className="text-white font-bold">Joyn Warm — Primary CTA</span>
            </div>
            <div className="h-20 rounded-xl bg-gradient-to-r from-[#003882] to-[#0052CC] flex items-center justify-center">
              <span className="text-white font-bold">Joyn Navy — Trust Strip</span>
            </div>
            <div className="h-20 rounded-xl bg-gradient-to-br from-[#FD5C1E] to-[#003882] flex items-center justify-center">
              <span className="text-white font-bold">Joyn Full — Hero Gradient</span>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-[#0D0D0D] mb-3">Typography</h2>
        <p className="text-gray-500 mb-10">Inter — clean, modern, and versatile. Weight does the heavy lifting.</p>
        <div className="space-y-4">
          {typography.map((t) => (
            <div key={t.name} className="flex items-center gap-6 p-5 bg-white rounded-xl border border-gray-100">
              <div className="w-40 shrink-0">
                <div className="text-sm font-semibold text-[#0D0D0D]">{t.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{t.weight}</div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-400 mb-1">{t.size} · {t.use}</div>
                <div
                  className="text-[#0D0D0D] leading-tight truncate"
                  style={{
                    fontSize: t.name.includes('Display') ? '36px' : t.name.includes('Heading 1') ? '28px' : t.name.includes('Heading 2') ? '20px' : t.name.includes('Large') ? '18px' : t.name.includes('Label') ? '11px' : '15px',
                    fontWeight: t.name.includes('Display') ? 900 : t.name.includes('Heading 1') ? 800 : t.name.includes('Heading 2') ? 700 : t.name.includes('Label') ? 600 : 400
                  }}
                >
                  Confidence in a capsule.
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Voice & Tone */}
      <section className="py-20 px-6 bg-[#FFF8F4]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-[#0D0D0D] mb-3">Voice &amp; Tone</h2>
          <p className="text-gray-500 mb-10">Five traits that define how Joyn communicates on every channel.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {voiceTraits.map((v) => (
              <div key={v.trait} className="bg-white rounded-2xl p-6 border border-orange-100">
                <h3 className="text-xl font-black text-[#0D0D0D] mb-2">{v.trait}</h3>
                <p className="text-gray-500 text-sm mb-4">{v.desc}</p>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-green-500 font-bold text-xs shrink-0 mt-0.5">DO</span>
                    <span className="text-sm text-[#0D0D0D] italic">&ldquo;{v.doEx}&rdquo;</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-red-400 font-bold text-xs shrink-0 mt-0.5">DON&apos;T</span>
                    <span className="text-sm text-gray-400 line-through italic">&ldquo;{v.dontEx}&rdquo;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Taglines */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-[#0D0D0D] mb-3">Tagline Library</h2>
        <p className="text-gray-500 mb-10">Approved copy — use across ads, posts, email, and packaging.</p>
        <div className="space-y-3">
          {taglines.map((t, i) => (
            <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 group card-hover">
              <span className="text-2xl font-black text-[#FD5C1E] w-8 shrink-0">{i + 1}</span>
              <div className="flex-1">
                <div className="text-xl font-bold text-[#0D0D0D] group-hover:text-[#FD5C1E] transition-colors">{t.line}</div>
                <div className="text-sm text-gray-400 mt-0.5">{t.context}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Competitive Landscape */}
      <section className="py-20 px-6 bg-[#003882]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-3">Competitive Landscape</h2>
          <p className="text-[#87ADEF] mb-10">Where Joyn wins — the gap no one else is filling.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {competitors.map((c) => (
              <div key={c.name} className="bg-white/10 rounded-xl p-6 border border-white/20">
                <div className="font-bold text-white text-lg mb-1">{c.name}</div>
                <div className="text-[#87ADEF] text-sm mb-3">Positioned as: {c.pos}</div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FD5C1E] font-bold text-xs mt-0.5">JOYN WINS:</span>
                  <span className="text-white/80 text-sm">{c.gap}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-gradient-to-r from-[#FD5C1E] to-[#D72C0D] rounded-2xl p-6 text-center">
            <div className="text-white font-black text-2xl mb-2">Joyn&apos;s Unfair Advantage</div>
            <div className="text-orange-100 text-lg">The only proactive, flush-first supplement — woman-founded, USA-made, and built for a community that has been ignored.</div>
          </div>
        </div>
      </section>
    </div>
  )
}
