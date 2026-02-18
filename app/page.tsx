import Link from 'next/link'

/* ─── data ─────────────────────────────────────────────────── */

const platforms = [
  {
    name: 'TikTok',
    role: 'Primary growth engine',
    cadence: '1–2 videos / day',
    why: 'Algorithm favors education + emotion. ALDH2 content triggers saves and shares — massive organic reach potential.',
    tactics: ['Hook in first 2 s', 'Green screen science explainer', 'POV / reaction format', 'Trending audio + product'],
    kpis: ['50K followers in 90 days', '500K+ views/month', '>3% CTR to shop'],
    color: '#FD5C1E',
  },
  {
    name: 'Instagram',
    role: 'Brand hub + conversion',
    cadence: '1 feed post + 7 stories / day',
    why: 'Visual brand building, DMs, and product discovery. Best for testimonials, before/after, and community building.',
    tactics: ['Orange-navy-white grid aesthetic', 'Reels repurposed from TikTok', 'Daily story poll mechanics', 'Highlight: Proof / Science / How-To'],
    kpis: ['20K followers in 90 days', '>15% story view rate', '>5% profile → website'],
    color: '#D72C0D',
  },
  {
    name: 'Pinterest',
    role: 'Evergreen discovery',
    cadence: '3–5 pins / day',
    why: 'Users search "alcohol flush remedy" and "hangover help" constantly. SEO-rich pins drive compounding traffic for months.',
    tactics: ['Keyword-optimized pin titles', '"Hangover-Free Celebrations" board', 'Infographic carousels', 'Rich Pins for product catalog'],
    kpis: ['500K impressions/month', '>1% click-through to shop', '2K+ saves/month'],
    color: '#003882',
  },
]

const pillars = [
  { pct: '30%', name: 'Education & Science', desc: 'Explain ALDH2 deficiency. What it is, who has it, why antacids are dangerous. This is why Joyn exists.', examples: ['Why does your face turn red when you drink?', '5 things your doctor never told you about alcohol flush', 'ALDH2 affects 600M people. Here\'s what that means.'] },
  { pct: '25%', name: 'Social Proof', desc: 'Real customer stories. Before/after experiences. UGC. The most powerful conversion content.', examples: ['"I stayed until midnight for the first time." — Sarah, 32', 'Before Joyn vs. After Joyn (wedding edition)', 'Honest 7-day diary with Joyn'] },
  { pct: '25%', name: 'Lifestyle & Culture', desc: 'Celebration moments. Asian-American community. Dates, weddings, holidays. Joyn belongs in every toast.', examples: ['Lunar New Year without the flush — first time ever', 'First date energy when you\'re not hiding your face', 'Open bar at a wedding with zero anxiety'] },
  { pct: '15%', name: 'Product & Founder', desc: 'Ingredient transparency. Brynn\'s story. Behind the scenes. Earned authority through radical honesty.', examples: ['Meet the formula — every ingredient, every reason', 'Why I spent a decade building Joyn', 'Made in the USA, formulated by women'] },
  { pct: '5%', name: 'Entertainment', desc: 'Trending audio, humor, relatable content. Stop the scroll. Build the brand.', examples: ['Red wine ✓  Red face ✗', 'Rating every flush "cure" from worst to best', 'Things people with Asian flush relate to 😭'] },
]

const calendarWeeks = [
  {
    week: 'Week 1', theme: 'Launch + Science',
    days: [
      { day: 1, posts: [{ p: 'IG', hook: 'We\'re live.' }, { p: 'TK', hook: 'POV: You found out why your face turns red' }] },
      { day: 2, posts: [{ p: 'IG', hook: 'Do you get the flush? [poll]' }, { p: 'TK', hook: '600M people have this. Nobody talks about it.' }] },
      { day: 3, posts: [{ p: 'IG', hook: '5 things your doctor never told you [carousel]' }, { p: 'PT', hook: 'What is ALDH2 deficiency? [infographic]' }] },
      { day: 4, posts: [{ p: 'TK', hook: 'Things people with Asian flush relate to 😭' }, { p: 'IG', hook: 'The antacid hack that\'s actually hurting you →' }] },
      { day: 5, posts: [{ p: 'IG', hook: 'Meet our first 100 customers' }, { p: 'TK', hook: 'I tried Joyn at my work happy hour' }] },
      { day: 6, posts: [{ p: 'IG', hook: 'Weekend plans incoming. Grab Joyn.' }, { p: 'TK', hook: 'Red wine. Not red face. 🍷' }] },
      { day: 7, posts: [{ p: 'IG', hook: 'Q&A: Ask us anything 👇' }] },
    ]
  },
  {
    week: 'Week 2', theme: 'Social Proof Blitz',
    days: [
      { day: 8, posts: [{ p: 'TK', hook: 'Ranking every flush cure from worst to best' }, { p: 'IG', hook: 'Every ingredient, every reason [carousel]' }] },
      { day: 9, posts: [{ p: 'TK', hook: 'Before Joyn vs. After Joyn' }, { p: 'PT', hook: '25 hangover-free celebration ideas' }] },
      { day: 10, posts: [{ p: 'IG', hook: '6 celebrations that hit different with Joyn' }, { p: 'TK', hook: 'Antacids cause stomach ulcers?? 😳' }] },
      { day: 11, posts: [{ p: 'IG', hook: 'JOYN15 — 15% off your first order [story]' }, { p: 'TK', hook: 'First date after finding Joyn hits different' }] },
      { day: 12, posts: [{ p: 'IG', hook: '"15 years. Finally a real solution." — Sarah' }, { p: 'TK', hook: 'Things your friends say vs. the truth' }] },
      { day: 13, posts: [{ p: 'IG', hook: 'Lunar New Year. Celebrate freely. 🧧' }, { p: 'TK', hook: 'LNY without the flush for the first time' }] },
      { day: 14, posts: [{ p: 'IG', hook: 'Valentine\'s Day is next week. Confidence ready.' }] },
    ]
  },
  {
    week: 'Week 3', theme: 'Community + Founder',
    days: [
      { day: 15, posts: [{ p: 'TK', hook: 'Doctor reacts: Is Joyn actually safe?' }] },
      { day: 16, posts: [{ p: 'IG', hook: 'ALDH2: Why 1 in 3 East Asians carry it [6 slides]' }] },
      { day: 17, posts: [{ p: 'TK', hook: 'I built Joyn because I was tired of hiding.' }] },
      { day: 18, posts: [{ p: 'IG', hook: 'What celebration are you most excited for? [story]' }] },
      { day: 19, posts: [{ p: 'TK', hook: '7 days, 7 celebrations, 0 flush — diary' }] },
      { day: 20, posts: [{ p: 'IG', hook: 'Made in the USA. By women. For everyone.' }] },
      { day: 21, posts: [{ p: 'TK', hook: 'Spring break. No flush edition. 🌴' }, { p: 'PT', hook: 'Spring celebrations, zero flush guide' }] },
    ]
  },
  {
    week: 'Week 4', theme: 'Milestone + Scale',
    days: [
      { day: 22, posts: [{ p: 'IG', hook: 'Community spotlight: 10 customers, 10 stories' }] },
      { day: 23, posts: [{ p: 'TK', hook: 'Joyn ingredient breakdown: what each one does' }] },
      { day: 24, posts: [{ p: 'IG', hook: '30 days. Thousands of celebrations. 🥂' }, { p: 'TK', hook: 'Responding to your biggest doubts about Joyn' }] },
      { day: 25, posts: [{ p: 'TK', hook: 'I read every skeptical comment so you didn\'t have to' }] },
      { day: 26, posts: [{ p: 'IG', hook: 'Community takeover weekend 🔥' }] },
      { day: 27, posts: [{ p: 'TK', hook: 'Rating celebrity flush moments 😭 (they needed us)' }] },
      { day: 28, posts: [{ p: 'IG', hook: 'Month 1 done. Here\'s to the 600M. 🥂' }, { p: 'TK', hook: 'What I wish I knew about flush at 21' }] },
      { day: 29, posts: [{ p: 'IG', hook: 'Subscribe & save LIVE — 20% off every bottle [story]' }] },
      { day: 30, posts: [{ p: 'TK', hook: 'Month 2 starts now. Here\'s what\'s coming. 👀' }, { p: 'IG', hook: 'Thank you. This is just the start.' }] },
    ]
  },
]

const pCol: Record<string, string> = { TK: '#FD5C1E', IG: '#D72C0D', PT: '#003882' }
const pLabel: Record<string, string> = { TK: 'TikTok', IG: 'Instagram', PT: 'Pinterest' }

const brandColors = [
  { name: 'Orange', hex: '#FD5C1E', use: 'CTAs, hero, energy' },
  { name: 'Red', hex: '#D72C0D', use: 'Urgency, gradients' },
  { name: 'Navy', hex: '#003882', use: 'Trust, authority' },
  { name: 'Sky', hex: '#87ADEF', use: 'Soft accent' },
  { name: 'Cream', hex: '#FFF8F4', use: 'Page backgrounds' },
  { name: 'Dark', hex: '#0D0D0D', use: 'Primary text' },
]

const taglines = [
  { line: 'Confidence in a capsule.', use: 'Primary tagline — everywhere' },
  { line: 'Reshape the way you celebrate.', use: 'Brand mission' },
  { line: 'More confident nights, brighter mornings.', use: 'Full benefit arc' },
  { line: 'Red wine. Not red face.', use: 'TikTok hooks, social copy' },
  { line: 'Confidence you can see. Redness you cannot.', use: 'Visual contrast copy' },
  { line: 'Celebrate without limits.', use: 'Campaign tagline' },
]

/* ─── page ──────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main>

      {/* ① COVER */}
      <section className="min-h-screen flex flex-col justify-between px-6 lg:px-16 pt-28 pb-16 border-b border-gray-100">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-10">
            Joyn · Social Strategy · February 2026
          </p>
          <h1 className="text-[clamp(56px,10vw,140px)] font-black leading-[0.9] tracking-tight text-[#0a0a0a] max-w-5xl">
            Reshape<br />
            the way<br />
            you<br />
            <span className="text-[#FD5C1E]">celebrate.</span>
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-gray-100">
          {[
            ['600M', 'people with ALDH2 deficiency'],
            ['0', 'real solutions before Joyn'],
            ['30 days', 'to launch dominance'],
            ['4.5×', 'target paid ROAS'],
          ].map(([n, l]) => (
            <div key={n}>
              <div className="text-3xl lg:text-4xl font-black text-[#0a0a0a]">{n}</div>
              <div className="text-sm text-gray-400 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ② THE OPPORTUNITY */}
      <section id="opportunity" className="section-anchor px-6 lg:px-16 py-24 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">01 — The Opportunity</p>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-5xl lg:text-6xl font-black leading-tight mb-8">
                600 million people.<br />
                <span className="text-gray-300">Zero good solutions.</span>
              </h2>
              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                <p>ALDH2 deficiency is one of the most common genetic variants on Earth. 1 in 3 East Asians carry it. Millions more worldwide — across all backgrounds — experience the flush.</p>
                <p>For years, the &ldquo;solution&rdquo; has been Pepcid AC — an antacid used off-label that masks the symptom while causing genuine stomach damage. There is no branded, proactive, flush-first supplement on the market.</p>
                <p className="font-bold text-[#0a0a0a]">Joyn is the first. Woman-founded. USA-made. Actually formulated for this.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Competitive Gap</p>
                <div className="space-y-3">
                  {[
                    ['Morning Recovery', 'Reactive hangover. Not flush-first.'],
                    ['Cheers', 'Bro-culture. Weak on ALDH2.'],
                    ['Thrive+', 'Medical-heavy. Not celebratory.'],
                    ['Antacids (Pepcid)', 'Off-label. Real health risks.'],
                  ].map(([brand, gap]) => (
                    <div key={brand} className="flex items-start gap-3 py-2 border-t border-gray-200">
                      <span className="text-sm font-bold text-[#0a0a0a] w-36 shrink-0">{brand}</span>
                      <span className="text-sm text-gray-500">{gap}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#FD5C1E] rounded-2xl p-6 text-white">
                <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2">Joyn wins because</p>
                <p className="text-xl font-bold">First proactive, flush-first supplement — not an off-label hack. Built specifically for ALDH2. That&apos;s the story nobody else can tell.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ③ PLATFORMS */}
      <section id="platforms" className="section-anchor px-6 lg:px-16 py-24 bg-[#0a0a0a] border-b border-gray-800">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-[0.2em] mb-6">02 — Platform Strategy</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-16 max-w-2xl">Three platforms. Three distinct jobs.</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {platforms.map((p) => (
              <div key={p.name} className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-white">{p.name}</h3>
                    <p className="text-sm mt-0.5" style={{ color: p.color }}>{p.role}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></div>
                </div>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">{p.why}</p>
                <div className="mb-6">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">Cadence</p>
                  <p className="text-white font-bold">{p.cadence}</p>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">Key Tactics</p>
                  <ul className="space-y-1.5">
                    {p.tactics.map(t => (
                      <li key={t} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: p.color }}></span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto pt-6 border-t border-white/10">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">90-Day KPIs</p>
                  <ul className="space-y-1">
                    {p.kpis.map(k => <li key={k} className="text-xs text-gray-400">{k}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ④ CONTENT SYSTEM */}
      <section id="content" className="section-anchor px-6 lg:px-16 py-24 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">03 — Content System</p>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0a0a0a] mb-4">Five pillars. Every post earns its place.</h2>
          <p className="text-gray-500 text-lg mb-16 max-w-2xl">Every piece of content maps to one of these themes. No random posting. Every post has a job.</p>

          <div className="space-y-0">
            {pillars.map((p, i) => (
              <div key={p.name} className={`grid lg:grid-cols-12 gap-8 py-8 ${i < pillars.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="lg:col-span-1">
                  <span className="text-3xl font-black text-gray-100">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="lg:col-span-2">
                  <span className="text-2xl font-black text-[#FD5C1E]">{p.pct}</span>
                  <p className="text-xs text-gray-400 mt-0.5">of content</p>
                </div>
                <div className="lg:col-span-3">
                  <h3 className="text-xl font-black text-[#0a0a0a] mb-2">{p.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Example Content</p>
                  <ul className="space-y-2">
                    {p.examples.map(e => (
                      <li key={e} className="text-sm text-gray-700 flex items-start gap-2.5">
                        <span className="text-[#FD5C1E] shrink-0 mt-0.5">→</span>
                        <span>&ldquo;{e}&rdquo;</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑤ PAID STRATEGY */}
      <section id="paid" className="section-anchor px-6 lg:px-16 py-24 bg-gray-50 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">04 — Paid Strategy</p>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0a0a0a] mb-16 max-w-2xl">$5K/month. 4.5× ROAS target. Full funnel.</h2>

          {/* Funnel */}
          <div className="grid lg:grid-cols-4 gap-4 mb-16">
            {[
              { stage: 'Awareness', pct: '20%', ch: 'Video Views', audience: 'Broad: Asian-American, wellness, social drinkers', creative: 'Educational hook videos. Problem-first.', kpi: 'CPM < $10' },
              { stage: 'Consideration', pct: '30%', ch: 'Traffic / Engagement', audience: 'Engaged video viewers, profile visitors', creative: 'UGC testimonials, before/after, carousels', kpi: 'CTR > 2.5%' },
              { stage: 'Conversion', pct: '40%', ch: 'Purchase', audience: 'Cart abandoners, email lookalikes (1–5%)', creative: 'Direct offer. Social proof. Discount code.', kpi: 'CPA < $35 · ROAS > 4.5×' },
              { stage: 'Retention', pct: '10%', ch: 'Repeat Purchase', audience: 'Past buyers', creative: 'Subscribe & save. How-to content.', kpi: 'LTV > $120' },
            ].map((s, i) => (
              <div key={s.stage} className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-xl font-black text-[#0a0a0a] mb-1">{s.stage}</h3>
                <div className="text-3xl font-black text-[#FD5C1E] mb-4">{s.pct}</div>
                <div className="space-y-3 text-sm">
                  <div><span className="font-bold">Channel: </span><span className="text-gray-500">{s.ch}</span></div>
                  <div><span className="font-bold">Audience: </span><span className="text-gray-500">{s.audience}</span></div>
                  <div><span className="font-bold">Creative: </span><span className="text-gray-500">{s.creative}</span></div>
                  <div className="pt-3 border-t border-gray-100 font-bold text-[#003882] text-xs">{s.kpi}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Channels + Influencer */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-[#003882] rounded-2xl p-7 text-white">
              <h3 className="font-black text-xl mb-1">Meta Ads</h3>
              <div className="text-3xl font-black mb-4">$3–5K<span className="text-base font-normal text-white/50">/mo</span></div>
              <div className="space-y-2 text-sm text-white/70">
                <p>Facebook + Instagram. Feed, Stories, Reels.</p>
                <p>Spark top organic posts. Whitelist creator UGC.</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
                <div><div className="text-white font-black text-lg">4.5×</div><div className="text-white/50">ROAS</div></div>
                <div><div className="text-white font-black text-lg">&lt;$35</div><div className="text-white/50">CPA</div></div>
                <div><div className="text-white font-black text-lg">&lt;$15</div><div className="text-white/50">CPM</div></div>
              </div>
            </div>
            <div className="bg-[#0a0a0a] rounded-2xl p-7 text-white">
              <h3 className="font-black text-xl mb-1">TikTok Ads</h3>
              <div className="text-3xl font-black mb-4">$2–3K<span className="text-base font-normal text-white/50">/mo</span></div>
              <div className="space-y-2 text-sm text-white/70">
                <p>In-Feed + Spark Ads. Amplify top organics.</p>
                <p>TikTok Shop integration. Promo code CTAs.</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
                <div><div className="text-white font-black text-lg">3.5×</div><div className="text-white/50">ROAS</div></div>
                <div><div className="text-white font-black text-lg">&lt;$40</div><div className="text-white/50">CPA</div></div>
                <div><div className="text-white font-black text-lg">&lt;$10</div><div className="text-white/50">CPM</div></div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <h3 className="font-black text-xl text-[#0a0a0a] mb-1">Influencer Program</h3>
              <p className="text-sm text-gray-500 mb-5">Four tiers. Nano → Macro.</p>
              <div className="space-y-3">
                {[
                  ['Nano 1K–10K', '20–30/mo', 'Free product → UGC'],
                  ['Micro 10K–100K', '5–10/mo', '$100–500/post'],
                  ['Mid 100K–500K', '2–3/mo', '$500–2,500 + affiliate'],
                  ['Macro 500K+', '1–2/quarter', '$2,500–10K+'],
                ].map(([tier, count, rate]) => (
                  <div key={tier} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 text-sm">
                    <span className="font-semibold text-[#0a0a0a]">{tier}</span>
                    <span className="text-gray-400 text-xs">{count}</span>
                    <span className="text-[#FD5C1E] font-bold text-xs">{rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⑥ 30-DAY CALENDAR */}
      <section id="calendar" className="section-anchor px-6 lg:px-16 py-24 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">05 — 30-Day Launch Calendar</p>
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <h2 className="text-4xl lg:text-5xl font-black text-[#0a0a0a]">What to post, every day.</h2>
            <div className="flex items-center gap-5">
              {Object.entries(pLabel).map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pCol[k] }}></span>
                  {v}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-0">
            {calendarWeeks.map((wk, wi) => (
              <div key={wk.week}>
                <div className="flex items-center gap-4 py-4 border-b border-gray-200">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400 w-20 shrink-0">{wk.week}</span>
                  <span className="text-sm font-bold text-[#0a0a0a]">{wk.theme}</span>
                </div>
                <div className="grid grid-cols-7 divide-x divide-gray-100">
                  {wk.days.map((d) => (
                    <div key={d.day} className="p-3 min-h-[100px] border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="text-xs font-black text-gray-300 mb-2">Day {d.day}</div>
                      <div className="space-y-1.5">
                        {d.posts.map((post, pi) => (
                          <div key={pi}>
                            <div className="text-xs font-bold mb-0.5" style={{ color: pCol[post.p] }}>{pLabel[post.p]}</div>
                            <div className="text-xs text-gray-600 leading-tight">{post.hook}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {/* Pad Week 4 (9 days → fills 2 rows of 7) */}
                  {wi === 3 && Array.from({ length: 7 - (wk.days.length % 7) }).map((_, i) => (
                    <div key={`pad-${i}`} className="p-3 min-h-[100px] border-b border-gray-100 bg-gray-50/50"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑦ BRAND */}
      <section id="brand" className="section-anchor px-6 lg:px-16 py-24">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">06 — Brand Guidelines</p>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0a0a0a] mb-16 max-w-xl">How Joyn looks. How Joyn sounds.</h2>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              {/* Colors */}
              <div className="mb-12">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Color Palette</h3>
                <div className="grid grid-cols-3 gap-3">
                  {brandColors.map(c => (
                    <div key={c.hex}>
                      <div className="h-16 rounded-xl mb-2" style={{ backgroundColor: c.hex }}></div>
                      <div className="font-bold text-sm text-[#0a0a0a]">{c.name}</div>
                      <div className="text-xs font-mono text-gray-400">{c.hex}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{c.use}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="h-10 rounded-lg bg-gradient-to-r from-[#FD5C1E] to-[#D72C0D]"></div>
                  <div className="h-10 rounded-lg bg-gradient-to-r from-[#003882] to-[#0052CC]"></div>
                  <div className="h-10 rounded-lg bg-gradient-to-br from-[#FD5C1E] to-[#003882]"></div>
                </div>
              </div>

              {/* Type */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Typography — Inter</h3>
                <div className="space-y-4">
                  <div className="py-3 border-t border-gray-100">
                    <div className="text-xs text-gray-400 mb-1">Hero — 900 Black</div>
                    <p className="text-4xl font-black text-[#0a0a0a] leading-none">Confidence.</p>
                  </div>
                  <div className="py-3 border-t border-gray-100">
                    <div className="text-xs text-gray-400 mb-1">Heading — 800 ExtraBold</div>
                    <p className="text-2xl font-extrabold text-[#0a0a0a]">Reshape the way you celebrate.</p>
                  </div>
                  <div className="py-3 border-t border-gray-100">
                    <div className="text-xs text-gray-400 mb-1">Body — 400 Regular</div>
                    <p className="text-base text-gray-600">Naturally-sourced supplement for the 600M with ALDH2 deficiency.</p>
                  </div>
                  <div className="py-3 border-t border-gray-100">
                    <div className="text-xs text-gray-400 mb-1">Label — 600 SemiBold, Uppercase</div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Confidence · USA Made · Flush-Free</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {/* Voice */}
              <div className="mb-12">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Voice — DO / DON&apos;T</h3>
                <div className="space-y-4">
                  {[
                    ['Confidence in a capsule.', 'We think this might help with redness...'],
                    ['Red wine. Not red face.', 'Please buy our supplement for flush.'],
                    ['You deserve to show up fully.', 'Fix your embarrassing flush reaction.'],
                    ['Formulated for ALDH2 enzyme activity.', 'It just works, trust us.'],
                  ].map(([doEx, dontEx], i) => (
                    <div key={i} className="grid grid-cols-2 gap-2">
                      <div className="bg-green-50 rounded-xl p-4">
                        <div className="text-xs font-bold text-green-600 mb-1.5">DO</div>
                        <p className="text-sm font-semibold text-[#0a0a0a]">&ldquo;{doEx}&rdquo;</p>
                      </div>
                      <div className="bg-red-50 rounded-xl p-4">
                        <div className="text-xs font-bold text-red-400 mb-1.5">DON&apos;T</div>
                        <p className="text-sm text-gray-400 line-through">&ldquo;{dontEx}&rdquo;</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Taglines */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Approved Taglines</h3>
                <div className="space-y-0">
                  {taglines.map((t, i) => (
                    <div key={i} className="flex items-baseline gap-4 py-4 border-b border-gray-100 last:border-0">
                      <span className="text-xs font-black text-gray-200 w-5 shrink-0">{i + 1}</span>
                      <div className="flex-1">
                        <p className="font-bold text-[#0a0a0a]">{t.line}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{t.use}</p>
                      </div>
                      {i === 0 && (
                        <span className="text-xs bg-[#FD5C1E] text-white px-2 py-0.5 rounded-full font-bold shrink-0">PRIMARY</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-16 py-10 bg-[#0a0a0a] border-t border-gray-800">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-white font-black">JOYN · 2026 Social Strategy</div>
            <div className="text-gray-600 text-xs mt-1">Prepared February 2026</div>
          </div>
          <a href="https://www.joynthefun.com" target="_blank" rel="noopener noreferrer" className="text-[#FD5C1E] text-sm font-bold hover:underline">
            joynthefun.com ↗
          </a>
        </div>
      </footer>

    </main>
  )
}
