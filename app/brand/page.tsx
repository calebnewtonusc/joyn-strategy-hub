import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brand Kit — Joyn 2026 Social Playbook',
  description: 'Joyn brand guidelines: colors, typography, voice, and taglines.',
}

export default function BrandPage() {
  const colors = [
    { name: 'Joyn Orange', hex: '#FD5C1E', use: 'CTAs, hero, energy' },
    { name: 'Joyn Red', hex: '#D72C0D', use: 'Urgency, gradients' },
    { name: 'Navy', hex: '#003882', use: 'Trust, authority' },
    { name: 'Sky', hex: '#87ADEF', use: 'Soft accent' },
    { name: 'Cream', hex: '#FFF8F4', use: 'Backgrounds, warmth' },
    { name: 'Dark', hex: '#0D0D0D', use: 'Text, dark sections' },
  ]

  const taglines = [
    'Confidence in a capsule.',
    'Reshape the way you celebrate.',
    'More confident nights, brighter mornings.',
    'Red wine. Not red face.',
    'Celebrate without limits.',
    'Confidence you can see. Redness you cannot.',
  ]

  const dodonts = [
    { do: 'Confidence in a capsule.', dont: 'We think this might help with redness...' },
    { do: 'Red wine. Not red face.', dont: 'Please buy our supplement for alcohol flush.' },
    { do: 'You deserve to show up fully.', dont: 'Fix your embarrassing flush reaction.' },
    { do: 'Formulated to support ALDH2 enzyme activity.', dont: 'It just works, trust us.' },
  ]

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="bg-white border-b border-gray-100 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-bold text-[#FD5C1E] uppercase tracking-widest mb-3">Brand Guide</div>
          <h1 className="text-5xl font-black text-[#0D0D0D] mb-3">How Joyn looks. How Joyn sounds.</h1>
          <p className="text-gray-400 text-lg max-w-xl">One page. Everything you need to stay on brand across every touchpoint.</p>
        </div>
      </section>

      <div className="px-6 py-12 max-w-7xl mx-auto space-y-16">

        {/* Colors */}
        <div>
          <h2 className="text-2xl font-black text-[#0D0D0D] mb-6">Colors</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {colors.map((c) => (
              <div key={c.hex}>
                <div className="h-20 rounded-xl mb-2" style={{ backgroundColor: c.hex }}></div>
                <div className="font-semibold text-sm text-[#0D0D0D]">{c.name}</div>
                <div className="text-xs font-mono text-gray-400">{c.hex}</div>
                <div className="text-xs text-gray-400 mt-0.5">{c.use}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="h-12 rounded-xl bg-gradient-to-r from-[#FD5C1E] to-[#D72C0D] flex items-center justify-center">
              <span className="text-white text-xs font-bold">Warm Gradient — Primary CTA</span>
            </div>
            <div className="h-12 rounded-xl bg-gradient-to-r from-[#003882] to-[#0052CC] flex items-center justify-center">
              <span className="text-white text-xs font-bold">Navy Gradient — Trust</span>
            </div>
            <div className="h-12 rounded-xl bg-gradient-to-br from-[#FD5C1E] to-[#003882] flex items-center justify-center">
              <span className="text-white text-xs font-bold">Full Gradient — Hero</span>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div>
          <h2 className="text-2xl font-black text-[#0D0D0D] mb-6">Typography — Inter</h2>
          <div className="space-y-4 bg-white rounded-2xl border border-gray-100 p-6">
            <div className="border-b border-gray-50 pb-4">
              <div className="text-xs text-gray-400 mb-1">Hero / Display — 900 Black</div>
              <p className="text-5xl font-black text-[#0D0D0D]">Confidence in a capsule.</p>
            </div>
            <div className="border-b border-gray-50 pb-4">
              <div className="text-xs text-gray-400 mb-1">Heading — 800 ExtraBold</div>
              <p className="text-3xl font-extrabold text-[#0D0D0D]">Reshape the way you celebrate.</p>
            </div>
            <div className="border-b border-gray-50 pb-4">
              <div className="text-xs text-gray-400 mb-1">Subheading — 700 Bold</div>
              <p className="text-xl font-bold text-[#0D0D0D]">The supplement nobody knew they needed.</p>
            </div>
            <div className="border-b border-gray-50 pb-4">
              <div className="text-xs text-gray-400 mb-1">Body — 400 Regular</div>
              <p className="text-base text-gray-600">JOYN is a naturally-sourced supplement designed to reduce alcohol flush and support alcohol metabolism for the 600 million people with ALDH2 deficiency.</p>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Label / Tag — 600 Semibold, Uppercase</div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">CONFIDENCE · FLUSH-FREE · USA MADE</p>
            </div>
          </div>
        </div>

        {/* Voice */}
        <div>
          <h2 className="text-2xl font-black text-[#0D0D0D] mb-2">Voice &amp; Tone</h2>
          <p className="text-gray-400 mb-6 text-sm">Joyn is <strong className="text-[#0D0D0D]">confident, celebratory, inclusive, witty, and science-backed.</strong></p>
          <div className="space-y-3">
            {dodonts.map((d) => (
              <div key={d.do} className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-2">DO</div>
                  <p className="text-sm font-semibold text-[#0D0D0D]">&ldquo;{d.do}&rdquo;</p>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                  <div className="text-xs font-bold text-red-400 uppercase tracking-wide mb-2">DON&apos;T</div>
                  <p className="text-sm text-gray-400 line-through">&ldquo;{d.dont}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Taglines */}
        <div>
          <h2 className="text-2xl font-black text-[#0D0D0D] mb-6">Tagline Bank</h2>
          <div className="space-y-2">
            {taglines.map((t, i) => (
              <div key={t} className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 px-5 py-4 group hover:border-[#FD5C1E] transition-colors">
                <span className="text-2xl font-black text-gray-100 w-8 shrink-0">{i + 1}</span>
                <p className="text-lg font-bold text-[#0D0D0D] flex-1">{t}</p>
                {i === 0 && <span className="text-xs bg-[#FD5C1E] text-white px-2 py-0.5 rounded-full font-bold">PRIMARY</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Positioning */}
        <div className="bg-[#003882] rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-black mb-6">Positioning Statement</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <div className="text-xs font-bold text-[#87ADEF] uppercase tracking-widest mb-1">For</div>
                <p className="font-semibold">Young adults (21–40) with ALDH2 deficiency who want to socialize without embarrassment</p>
              </div>
              <div>
                <div className="text-xs font-bold text-[#87ADEF] uppercase tracking-widest mb-1">Who are frustrated by</div>
                <p className="font-semibold">Off-label hacks (Pepcid) that cause real health damage and don&apos;t actually fix the problem</p>
              </div>
              <div>
                <div className="text-xs font-bold text-[#87ADEF] uppercase tracking-widest mb-1">Joyn is the only</div>
                <p className="font-semibold">Proactive, flush-first supplement — woman-founded, USA-made, built for the 600M who&apos;ve been ignored</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#FD5C1E] to-[#D72C0D] rounded-xl p-6 flex items-center justify-center text-center">
              <p className="text-2xl font-black leading-tight">&ldquo;Reshape the way you celebrate.&rdquo;</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
