'use client'

import { useState } from 'react'

const organicPillars = [
  {
    name: 'Education & Science',
    pct: 30,
    color: '#003882',
    desc: 'Explain ALDH2 deficiency, alcohol flush science, ingredient transparency',
    formats: ['Carousel explainers', 'TikTok voiceover', 'Pinterest infographics'],
    examples: ['What causes alcohol flush?', "The science behind Joyn's formula", 'Why antacids are dangerous for flush'],
  },
  {
    name: 'Social Proof & UGC',
    pct: 25,
    color: '#FD5C1E',
    desc: 'Before/after stories, customer testimonials, real celebrations',
    formats: ['TikTok reactions', 'Instagram before/after', 'Reposted UGC'],
    examples: ['First time drinking without the flush', 'Customer takeover at her birthday', 'Before Joyn vs. After Joyn'],
  },
  {
    name: 'Lifestyle & Culture',
    pct: 25,
    color: '#D72C0D',
    desc: 'Celebration moments, Asian-American culture, dating, milestones',
    formats: ['Reels/TikTok lifestyle', 'Stories polls', 'Community content'],
    examples: ['Wedding szn hits different with Joyn', 'First date energy', 'Lunar New Year without the flush'],
  },
  {
    name: 'Product & Brand',
    pct: 15,
    color: '#87ADEF',
    desc: 'Product showcases, behind-the-scenes, founder story',
    formats: ['Product photography', 'BTS Reels', 'Founder Q&A'],
    examples: ["Meet the founder: Brynn's story", 'How we source our ingredients', 'Unboxing experience'],
  },
  {
    name: 'Entertainment & Hooks',
    pct: 5,
    color: '#FF6B35',
    desc: 'Trending audio, humor, relatable content that stops the scroll',
    formats: ['TikTok trends', 'Memes', 'POV content'],
    examples: ['POV: You finally found the solution', 'Rating our competitors', 'Things people with ALDH2 relate to'],
  },
]

const platforms = [
  {
    name: 'TikTok',
    icon: '🎵',
    role: 'Primary Growth Engine',
    audience: '18–34 social drinkers, Asian-American communities, wellness enthusiasts',
    cadence: '1–2 posts/day',
    formats: ['Educational voiceover (60s)', 'Before/After reactions', 'POV hooks', 'Trending audio + product'],
    kpis: ['Followers: 0 → 50K in 90 days', 'Views: 500K+/month', 'CTR to shop: >3%'],
    tactics: [
      'Hook in first 2 seconds: problem-statement style',
      'Trending sounds layered with flush education',
      'Comment-baiting: "Who else does this?"',
      'Stitch & Duet campaigns with micro-influencers',
      'Green screen overlay with science visuals',
    ],
    organic: true,
    paid: true,
  },
  {
    name: 'Instagram',
    icon: '📸',
    role: 'Brand Hub & Conversion Driver',
    audience: '25–40 wellness-forward, urban professionals, celebration moments',
    cadence: '1 Feed post + 5–7 Stories/day',
    formats: ['Product carousels', 'Reels (30–60s)', 'Stories polls/Q&A', 'Collab posts'],
    kpis: ['Followers: 0 → 20K in 90 days', 'Story view rate: >15%', 'Profile visits to website: >5%'],
    tactics: [
      'Aesthetic grid: orange-navy-white pattern',
      'Stories: daily engagement mechanics (polls, questions)',
      'Reels repurposed from TikTok (no watermark)',
      'Highlight covers: Testimonials, Science, How-To, Press',
      'Link in bio: direct to shop',
    ],
    organic: true,
    paid: true,
  },
  {
    name: 'Pinterest',
    icon: '📌',
    role: 'Evergreen SEO Discovery',
    audience: 'Women 25–45 searching health, celebrations, wellness hacks',
    cadence: '3–5 pins/day',
    formats: ['Infographic carousels', 'How-to pins', 'Recipe/lifestyle boards'],
    kpis: ['Monthly impressions: 500K+', 'Click-through to shop: >1%', 'Board saves: 2K+/month'],
    tactics: [
      'SEO-optimized pin titles and descriptions',
      'Boards: "Hangover-Free Celebrations", "ALDH2 Science", "Joyn Lifestyle"',
      'Repurpose Instagram carousels as Pinterest collections',
      'Rich Pins for product catalog integration',
    ],
    organic: true,
    paid: false,
  },
]

const paidChannels = [
  {
    channel: 'Meta Ads (Facebook/Instagram)',
    budget: '$3,000–5,000/mo to start',
    objective: 'Website conversions → Purchase',
    audiences: [
      'Lookalike from email list (1%, 2%, 5%)',
      'Interest: Asian-American culture, wellness, social drinking',
      'Retargeting: site visitors, add-to-cart, video viewers',
      'Behavioral: Online shoppers, supplement buyers',
    ],
    creatives: [
      'UGC-style testimonial (lo-fi wins)',
      'Before/After flush comparison',
      'Founder story (long-form for warm audiences)',
      'Fast-cut product benefit (cold traffic)',
    ],
    funnel: [
      { stage: 'Awareness', type: 'Video Views', budget: '20%', creative: 'Educational hook videos' },
      { stage: 'Consideration', type: 'Traffic / Engagement', budget: '30%', creative: 'UGC testimonials, carousels' },
      { stage: 'Conversion', type: 'Purchase', budget: '40%', creative: 'DPA, before/after, discount offers' },
      { stage: 'Retention', type: 'Retargeting', budget: '10%', creative: 'Repeat purchase, subscribe & save' },
    ],
    kpis: { roas: '4.5x', cpa: '<$35', ctr: '>2.5%', cpm: '<$15' },
  },
  {
    channel: 'TikTok Ads',
    budget: '$2,000–3,000/mo to start',
    objective: 'Traffic + Conversions (TikTok Shop integration)',
    audiences: [
      'Custom: TikTok video engagers',
      'Lookalike: customer email list',
      'Interest: Wellness, Asian culture, nightlife',
      'Behavioral: E-commerce purchasers',
    ],
    creatives: [
      'Spark Ads from top organic posts',
      'TopView for product launches',
      'UGC creator whitelisting',
      'In-Feed native-style ads (no watermark feel)',
    ],
    funnel: [
      { stage: 'Discovery', type: 'In-Feed / Spark Ads', budget: '50%', creative: 'Top organic posts boosted' },
      { stage: 'Click', type: 'Traffic to Shop', budget: '30%', creative: 'Product demos, before/after' },
      { stage: 'Purchase', type: 'TikTok Shop / Web', budget: '20%', creative: 'Promo code CTAs' },
    ],
    kpis: { roas: '3.5x', cpa: '<$40', ctr: '>3%', cpm: '<$10' },
  },
]

const influencerTiers = [
  {
    tier: 'Nano (1K–10K)',
    count: '20–30/month',
    rate: '$0 (product seeding)',
    focus: 'Authentic UGC, community trust',
    strategy: 'Send product, brief loosely, let them create authentically',
  },
  {
    tier: 'Micro (10K–100K)',
    count: '5–10/month',
    rate: '$100–500/post',
    focus: 'Niche authority, targeted reach',
    strategy: 'Asian-American creators, wellness/fitness, lifestyle/nightlife',
  },
  {
    tier: 'Mid-tier (100K–500K)',
    count: '2–3/month',
    rate: '$500–2,500/post',
    focus: 'Significant reach boost, credibility',
    strategy: 'Affiliate commissions + flat fee, UGC rights',
  },
  {
    tier: 'Macro (500K+)',
    count: '1–2/quarter',
    rate: '$2,500–10,000+',
    focus: 'Brand awareness spikes',
    strategy: 'Reserved for major launches/holidays, negotiate UGC rights for ads',
  },
]

export default function StrategyPage() {
  const [activeTab, setActiveTab] = useState<'organic' | 'paid' | 'influencer'>('organic')

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#FFF8F4] to-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-orange-100 rounded-full text-[#FD5C1E] text-sm font-bold mb-6">Full-Funnel Social Strategy</div>
          <h1 className="text-5xl font-black text-[#0D0D0D] mb-4">Social Media Playbook</h1>
          <p className="text-gray-500 text-xl max-w-2xl">
            Paid + organic strategy to take Joyn from 0 to a recognizable brand name among the 600M people who need us.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 px-6">
        <div className="max-w-7xl mx-auto flex gap-1 py-3">
          {(['organic', 'paid', 'influencer'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-[#FD5C1E] text-white'
                  : 'text-gray-500 hover:text-[#FD5C1E] hover:bg-orange-50'
              }`}
            >
              {tab === 'organic' ? 'Organic' : tab === 'paid' ? 'Paid Ads' : 'Influencer'}
            </button>
          ))}
        </div>
      </div>

      {/* Organic Strategy */}
      {activeTab === 'organic' && (
        <div className="py-16 px-6 max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-black text-[#0D0D0D] mb-3">Content Pillars</h2>
            <p className="text-gray-500 mb-10">Every piece of content maps to one of five strategic themes.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organicPillars.map((p) => (
                <div key={p.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover">
                  <div className="h-2" style={{ backgroundColor: p.color }}></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-black text-[#0D0D0D] text-lg">{p.name}</h3>
                      <span className="text-2xl font-black" style={{ color: p.color }}>{p.pct}%</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{p.desc}</p>
                    <div className="mb-3">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Formats</div>
                      <div className="flex flex-wrap gap-1">
                        {p.formats.map((f) => (
                          <span key={f} className="text-xs px-2 py-1 bg-gray-50 rounded-full text-gray-600">{f}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Example Content</div>
                      <ul className="space-y-1">
                        {p.examples.map((e) => (
                          <li key={e} className="text-xs text-gray-600 flex items-start gap-1.5">
                            <span style={{ color: p.color }} className="mt-0.5">→</span>
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black text-[#0D0D0D] mb-3">Platform Tactics</h2>
            <p className="text-gray-500 mb-10">Platform-specific execution for each channel.</p>
            <div className="space-y-8">
              {platforms.map((p) => (
                <div key={p.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{p.icon}</span>
                      <div>
                        <h3 className="text-2xl font-black text-[#0D0D0D]">{p.name}</h3>
                        <p className="text-gray-500 text-sm">{p.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {p.organic && <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">ORGANIC</span>}
                      {p.paid && <span className="px-3 py-1 bg-orange-50 text-[#FD5C1E] text-xs font-bold rounded-full">PAID</span>}
                    </div>
                  </div>
                  <div className="p-6 grid md:grid-cols-4 gap-6">
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase mb-2">Audience</div>
                      <p className="text-sm text-gray-600">{p.audience}</p>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase mb-2">Cadence</div>
                      <p className="text-sm font-semibold text-[#FD5C1E]">{p.cadence}</p>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase mb-2">Formats</div>
                      <ul className="space-y-1">
                        {p.formats.map((f) => <li key={f} className="text-sm text-gray-600">• {f}</li>)}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase mb-2">90-Day KPIs</div>
                      <ul className="space-y-1">
                        {p.kpis.map((k) => <li key={k} className="text-sm text-gray-600">✓ {k}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <div className="text-xs font-bold text-gray-400 uppercase mb-3">Key Tactics</div>
                    <div className="flex flex-wrap gap-2">
                      {p.tactics.map((t) => (
                        <span key={t} className="text-xs px-3 py-1.5 bg-[#FFF8F4] border border-orange-100 rounded-full text-gray-700">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Paid Strategy */}
      {activeTab === 'paid' && (
        <div id="paid" className="py-16 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-[#0D0D0D] mb-3">Paid Advertising Strategy</h2>
          <p className="text-gray-500 mb-12">Full-funnel paid media across Meta and TikTok to drive efficient customer acquisition.</p>

          <div className="space-y-12">
            {paidChannels.map((ch) => (
              <div key={ch.channel} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#003882] to-[#0052CC] p-6 text-white">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h3 className="text-2xl font-black">{ch.channel}</h3>
                      <p className="text-blue-200 text-sm mt-1">{ch.objective}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-blue-200 uppercase font-bold">Budget</div>
                      <div className="text-xl font-black">{ch.budget}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    {Object.entries(ch.kpis).map(([k, v]) => (
                      <div key={k} className="text-center bg-[#FFF8F4] rounded-xl p-4">
                        <div className="text-2xl font-black text-[#FD5C1E]">{v}</div>
                        <div className="text-xs font-bold text-gray-400 uppercase mt-1">{k.toUpperCase()}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-8">
                    <div className="text-sm font-bold text-gray-400 uppercase mb-4">Campaign Funnel</div>
                    <div className="space-y-3">
                      {ch.funnel.map((f, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                          <div className="w-24 shrink-0">
                            <div className="text-xs font-bold text-[#FD5C1E] uppercase">{f.stage}</div>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-[#0D0D0D]">{f.type}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{f.creative}</div>
                          </div>
                          <div className="text-lg font-black text-[#003882]">{f.budget}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm font-bold text-gray-400 uppercase mb-3">Target Audiences</div>
                      <ul className="space-y-2">
                        {ch.audiences.map((a) => (
                          <li key={a} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-[#FD5C1E] mt-0.5">→</span>{a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-400 uppercase mb-3">Creative Mix</div>
                      <ul className="space-y-2">
                        {ch.creatives.map((c) => (
                          <li key={c} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-[#003882] mt-0.5">→</span>{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Influencer Strategy */}
      {activeTab === 'influencer' && (
        <div className="py-16 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-[#0D0D0D] mb-3">Influencer Strategy</h2>
          <p className="text-gray-500 mb-12">Tiered creator program from nano to macro — authentic UGC at every level.</p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {influencerTiers.map((t) => (
              <div key={t.tier} className="bg-white rounded-2xl border border-gray-100 p-6 card-hover">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-[#0D0D0D]">{t.tier}</h3>
                  <span className="text-sm font-bold text-[#FD5C1E] bg-orange-50 px-3 py-1 rounded-full">{t.count}</span>
                </div>
                <div className="mb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase">Rate: </span>
                  <span className="text-sm font-semibold text-[#0D0D0D]">{t.rate}</span>
                </div>
                <div className="mb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase">Focus: </span>
                  <span className="text-sm text-gray-600">{t.focus}</span>
                </div>
                <div className="bg-[#FFF8F4] rounded-xl p-4">
                  <div className="text-xs font-bold text-[#FD5C1E] uppercase mb-1">Strategy</div>
                  <p className="text-sm text-gray-700">{t.strategy}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0D0D0D] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-black mb-6">Creator Brief Template</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-[#FD5C1E] font-bold mb-3">Required</div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Mention Joyn by name at least once</li>
                  <li>• Show the product visibly</li>
                  <li>• Include CTA: link in bio or promo code</li>
                  <li>• Disclose partnership (#ad or #sponsored)</li>
                  <li>• Film in good lighting (no blurry product shots)</li>
                </ul>
              </div>
              <div>
                <div className="text-[#87ADEF] font-bold mb-3">Avoid</div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Medical claims (&ldquo;cures&rdquo; or &ldquo;treats&rdquo;)</li>
                  <li>• Encouraging excessive drinking</li>
                  <li>• Comparing to specific competitor products</li>
                  <li>• Overly scripted / sales-y delivery</li>
                  <li>• Mentioning under-21 use cases</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
