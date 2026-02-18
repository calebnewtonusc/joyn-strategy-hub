function AdMockup({ type, headline, body, cta, bg, size }: {
  type: string; headline: string; body: string; cta: string; bg: string; size: string
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className={`${bg} flex flex-col justify-between p-5`} style={{ minHeight: size === 'story' ? '280px' : '160px' }}>
        <div className="text-xs font-bold text-white/50 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded self-start">Sponsored</div>
        <div>
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#FD5C1E] to-[#D72C0D] flex items-center justify-center mb-2">
            <span className="text-white font-black text-xs">J</span>
          </div>
          <p className="text-white font-black text-lg leading-tight mb-1">{headline}</p>
          <p className="text-white/70 text-xs">{body}</p>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-50">
        <div>
          <div className="text-xs text-gray-400">joynthefun.com</div>
          <div className="text-xs font-semibold text-[#0D0D0D]">{type}</div>
        </div>
        <button className="bg-[#FD5C1E] text-white text-xs font-bold px-4 py-2 rounded-lg">{cta}</button>
      </div>
    </div>
  )
}

const funnelStages = [
  {
    stage: 'AWARENESS',
    objective: 'Video Views / Reach',
    budget: '20%',
    audience: 'Broad interest: Asian-American culture, wellness, social drinking',
    creative: 'Educational TikTok-style videos. Hook in first 2 seconds.',
    kpi: 'CPM < $10',
  },
  {
    stage: 'CONSIDERATION',
    objective: 'Traffic / Engagement',
    budget: '30%',
    audience: 'Engaged with awareness ads, website visitors, IG profile visitors',
    creative: 'UGC testimonials, before/after, ingredient breakdown carousels',
    kpi: 'CTR > 2.5%',
  },
  {
    stage: 'CONVERSION',
    objective: 'Purchase',
    budget: '40%',
    audience: 'Add-to-cart abandoners, email list lookalikes (1–5%)',
    creative: 'Direct offer. Social proof + clear CTA. Discount code for cold traffic.',
    kpi: 'CPA < $35 · ROAS > 4.5x',
  },
  {
    stage: 'RETENTION',
    objective: 'Repeat Purchase',
    budget: '10%',
    audience: 'Past purchasers, subscribe & save prospects',
    creative: 'Subscribe & save offer. "How to use Joyn" content. Community posts.',
    kpi: 'LTV > $120',
  },
]

const influencers = [
  { tier: 'Nano', range: '1K–10K', count: '20–30/mo', rate: 'Free product', focus: 'Authentic UGC. No script. Let them be real.' },
  { tier: 'Micro', range: '10K–100K', count: '5–10/mo', rate: '$100–500', focus: 'Asian-American creators, wellness/fitness, lifestyle/nightlife.' },
  { tier: 'Mid', range: '100K–500K', count: '2–3/mo', rate: '$500–2.5K', focus: 'Affiliate + flat fee. Always get UGC rights for ads.' },
  { tier: 'Macro', range: '500K+', count: '1–2/quarter', rate: '$2.5K–10K+', focus: 'Major launches only. Holiday campaigns. Negotiate full UGC rights.' },
]

export default function AdsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="bg-white border-b border-gray-100 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-bold text-[#FD5C1E] uppercase tracking-widest mb-3">Paid Ads</div>
          <h1 className="text-5xl font-black text-[#0D0D0D] mb-3">How we pay to grow.</h1>
          <p className="text-gray-400 text-lg">Meta + TikTok full-funnel strategy. $5K/mo to start. Target 4.5x ROAS.</p>
        </div>
      </section>

      <div className="px-6 py-12 max-w-7xl mx-auto space-y-16">

        {/* Ad Mockups */}
        <div>
          <h2 className="text-2xl font-black text-[#0D0D0D] mb-2">Ad Creative</h2>
          <p className="text-gray-400 text-sm mb-6">What actual Joyn ads look like across placements.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AdMockup
              type="Meta — Feed Ad"
              headline="Stop flushing. Start celebrating."
              body="Naturally formulated for ALDH2 deficiency. Made in the USA."
              cta="Shop Now"
              bg="bg-gradient-to-br from-[#FD5C1E] to-[#D72C0D]"
              size="feed"
            />
            <AdMockup
              type="Meta — Retargeting"
              headline="You were looking at Joyn."
              body="15% off your first order. Code: JOYN15"
              cta="Get 15% Off"
              bg="bg-[#0D0D0D]"
              size="feed"
            />
            <AdMockup
              type="TikTok — Spark Ad"
              headline="POV: No flush at your company happy hour 🍷"
              body="600M people have this problem. We fixed it."
              cta="Learn More"
              bg="bg-gradient-to-b from-[#1a1a1a] to-[#0D0D0D]"
              size="story"
            />
            <AdMockup
              type="TikTok — Product"
              headline="Red wine ✓ Red face ✗"
              body="Joyn. Confidence in a capsule."
              cta="Shop Joyn"
              bg="bg-gradient-to-br from-[#003882] to-[#FD5C1E]"
              size="story"
            />
          </div>
        </div>

        {/* Full Funnel */}
        <div>
          <h2 className="text-2xl font-black text-[#0D0D0D] mb-2">Full Funnel</h2>
          <p className="text-gray-400 text-sm mb-6">$5K/mo split across Meta + TikTok.</p>
          <div className="space-y-3">
            {funnelStages.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 grid md:grid-cols-5 gap-4 items-start">
                <div>
                  <div className="text-xs font-black text-[#FD5C1E] uppercase tracking-widest">{s.stage}</div>
                  <div className="text-2xl font-black text-[#0D0D0D] mt-1">{s.budget}</div>
                  <div className="text-xs text-gray-400">of budget</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase mb-1">Objective</div>
                  <p className="text-sm font-semibold text-[#0D0D0D]">{s.objective}</p>
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs font-bold text-gray-400 uppercase mb-1">Audience</div>
                  <p className="text-sm text-gray-600">{s.audience}</p>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase mb-1">KPI</div>
                  <p className="text-sm font-bold text-[#003882]">{s.kpi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget breakdown */}
        <div>
          <h2 className="text-2xl font-black text-[#0D0D0D] mb-6">Budget Split</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#003882] rounded-2xl p-6 text-white">
              <div className="text-xs font-bold text-[#87ADEF] uppercase tracking-widest mb-1">Meta Ads</div>
              <div className="text-4xl font-black mb-1">$3–5K<span className="text-xl text-white/50">/mo</span></div>
              <p className="text-white/70 text-sm mb-4">Facebook + Instagram placements. Feed, Stories, Reels.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-white/60">Target ROAS</span><span className="font-bold">4.5x</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-white/60">Target CPA</span><span className="font-bold">&lt;$35</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-white/60">Target CPM</span><span className="font-bold">&lt;$15</span>
                </div>
              </div>
            </div>
            <div className="bg-[#0D0D0D] rounded-2xl p-6 text-white">
              <div className="text-xs font-bold text-[#FD5C1E] uppercase tracking-widest mb-1">TikTok Ads</div>
              <div className="text-4xl font-black mb-1">$2–3K<span className="text-xl text-white/50">/mo</span></div>
              <p className="text-white/70 text-sm mb-4">In-Feed + Spark Ads. Amplify top organic content.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-white/60">Target ROAS</span><span className="font-bold">3.5x</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-white/60">Target CPA</span><span className="font-bold">&lt;$40</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-white/60">Target CPM</span><span className="font-bold">&lt;$10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Influencer */}
        <div>
          <h2 className="text-2xl font-black text-[#0D0D0D] mb-2">Influencer Program</h2>
          <p className="text-gray-400 text-sm mb-6">Tiered creator strategy. Authentic UGC at every level.</p>
          <div className="grid md:grid-cols-4 gap-3">
            {influencers.map((inf) => (
              <div key={inf.tier} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="text-2xl font-black text-[#FD5C1E] mb-1">{inf.tier}</div>
                <div className="text-xs text-gray-400 mb-3">{inf.range} followers</div>
                <div className="space-y-2 text-sm">
                  <div><span className="font-bold text-[#0D0D0D]">Volume: </span><span className="text-gray-500">{inf.count}</span></div>
                  <div><span className="font-bold text-[#0D0D0D]">Rate: </span><span className="text-gray-500">{inf.rate}</span></div>
                  <div className="pt-2 border-t border-gray-50 text-xs text-gray-500">{inf.focus}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Creator brief */}
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            <div className="bg-green-50 rounded-xl p-5">
              <div className="text-xs font-black text-green-700 uppercase tracking-wide mb-3">Brief — Required</div>
              <ul className="space-y-1.5 text-sm text-green-800">
                <li>• Mention Joyn by name at least once</li>
                <li>• Show the product visibly</li>
                <li>• Include CTA: link in bio or promo code</li>
                <li>• Disclose: #ad or #sponsored</li>
                <li>• Film in good lighting</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl p-5">
              <div className="text-xs font-black text-red-600 uppercase tracking-wide mb-3">Brief — Avoid</div>
              <ul className="space-y-1.5 text-sm text-red-700">
                <li>• Medical claims (&ldquo;cures&rdquo; or &ldquo;treats&rdquo;)</li>
                <li>• Encouraging excessive drinking</li>
                <li>• Mentioning specific competitors</li>
                <li>• Over-scripted, salesy delivery</li>
                <li>• Under-21 use cases</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
