'use client'

import { useState } from 'react'

type CalendarEntry = {
  day: number
  platform: string
  type: string
  pillar: string
  caption: string
  hook: string
  format: string
  priority: 'high' | 'medium' | 'low'
}

const calendarData: CalendarEntry[] = [
  // Week 1 - Launch Week
  { day: 1, platform: 'Instagram', type: 'Feed Post', pillar: 'Brand', caption: "We're live. Joyn is here for every celebration you've been holding back from.", hook: 'The supplement nobody knew they needed — until now.', format: 'Product Hero Image', priority: 'high' },
  { day: 1, platform: 'TikTok', type: 'Video', pillar: 'Education', caption: 'POV: You finally found out why your face turns red when you drink', hook: 'POV: You finally found out why your face turns red when you drink', format: 'Educational voiceover 60s', priority: 'high' },
  { day: 2, platform: 'Instagram', type: 'Story', pillar: 'Engagement', caption: 'Quick poll: Do you get the alcohol flush?', hook: 'This or that poll', format: 'Poll Story', priority: 'medium' },
  { day: 2, platform: 'TikTok', type: 'Video', pillar: 'Education', caption: 'ALDH2 deficiency affects 600 million people and nobody talks about it', hook: 'The stat that will blow your mind', format: 'Green screen science explainer', priority: 'high' },
  { day: 3, platform: 'Instagram', type: 'Carousel', pillar: 'Education', caption: 'Science thread: What actually happens when you flush from alcohol (slide 1 of 5)', hook: '5 things your doctor never told you about alcohol flush', format: '5-slide educational carousel', priority: 'high' },
  { day: 3, platform: 'Pinterest', type: 'Pin', pillar: 'Education', caption: 'What is ALDH2 deficiency? The science behind alcohol flush explained', hook: 'Infographic pin', format: 'Infographic (900×1200)', priority: 'medium' },
  { day: 4, platform: 'TikTok', type: 'Video', pillar: 'Lifestyle', caption: 'Things people with Asian flush relate to', hook: 'Tell me without telling me you have Asian flush', format: 'Relatable list video', priority: 'high' },
  { day: 4, platform: 'Instagram', type: 'Story', pillar: 'Education', caption: "Did you know: antacids have serious risks when used off-label for flush. Here's what to use instead", hook: 'The risky hack you need to stop', format: 'Text story + link', priority: 'medium' },
  { day: 5, platform: 'Instagram', type: 'Feed Post', pillar: 'Social Proof', caption: 'Meet our first 100 customers. Real people, real celebrations.', hook: 'Our community in photos', format: 'Community mosaic', priority: 'medium' },
  { day: 5, platform: 'TikTok', type: 'Video', pillar: 'Social Proof', caption: "I tried Joyn at my company happy hour and couldn't believe the difference", hook: 'Honest review from a skeptic', format: 'UGC-style review', priority: 'high' },
  { day: 6, platform: 'Instagram', type: 'Reel', pillar: 'Lifestyle', caption: 'Weekend plans incoming. Grab your Joyn, celebrate freely.', hook: 'TGIF vibes', format: 'Lifestyle reel 15s', priority: 'low' },
  { day: 6, platform: 'TikTok', type: 'Video', pillar: 'Entertainment', caption: 'Red wine — yes. Red face — no. Joyn season is open', hook: 'Red wine, not red face', format: 'Quick wit + product', priority: 'medium' },
  { day: 7, platform: 'Instagram', type: 'Story', pillar: 'Engagement', caption: 'Q&A time: Ask us anything about alcohol flush, ALDH2, or the formula', hook: 'Ask Joyn anything', format: 'Question box story', priority: 'medium' },
  // Week 2
  { day: 8, platform: 'TikTok', type: 'Video', pillar: 'Education', caption: 'Ranking alcohol flush solutions from worst to best', hook: "Rating every flush hack on TikTok so you don't have to", format: 'Ranking video with overlays', priority: 'high' },
  { day: 8, platform: 'Instagram', type: 'Feed Post', pillar: 'Product', caption: 'Meet the formula. Every ingredient, every reason.', hook: 'Ingredient transparency you deserve', format: 'Ingredient breakdown carousel', priority: 'high' },
  { day: 9, platform: 'TikTok', type: 'Video', pillar: 'Social Proof', caption: "Before Joyn vs. After Joyn (this is the difference we're talking about)", hook: 'The proof is in the face', format: 'Before/after transition video', priority: 'high' },
  { day: 9, platform: 'Pinterest', type: 'Board', pillar: 'Lifestyle', caption: '25 ideas for hangover-free celebrations', hook: 'Celebration inspo board', format: 'Board with 25 pins', priority: 'medium' },
  { day: 10, platform: 'Instagram', type: 'Carousel', pillar: 'Lifestyle', caption: 'Joyn for every occasion: weddings, dates, holidays, work events.', hook: '6 celebrations that hit different with Joyn', format: '6-slide occasions carousel', priority: 'medium' },
  { day: 10, platform: 'TikTok', type: 'Video', pillar: 'Education', caption: 'Wait, the antacid trick actually causes stomach ulcers?', hook: 'The hack that is hurting you', format: 'Shocking fact video', priority: 'high' },
  { day: 11, platform: 'Instagram', type: 'Story', pillar: 'Promotion', caption: 'First order? Use code JOYN15 for 15% off your first bottle', hook: 'Launch discount — 48 hours only', format: 'Promo story', priority: 'high' },
  { day: 11, platform: 'TikTok', type: 'Video', pillar: 'Lifestyle', caption: 'First date after finding Joyn hits different', hook: "POV: You're finally confident at dinner", format: 'POV lifestyle video', priority: 'medium' },
  { day: 12, platform: 'Instagram', type: 'Feed Post', pillar: 'Social Proof', caption: '"I\'ve been dealing with this for 15 years and finally found a real solution." — Sarah, 32', hook: 'Customer story that made us tear up', format: 'Testimonial quote graphic', priority: 'high' },
  { day: 12, platform: 'TikTok', type: 'Video', pillar: 'Entertainment', caption: 'Things your friends say vs. the truth when you have the flush', hook: 'The comments section will be chaotic', format: 'Comedy/relatable video', priority: 'medium' },
  { day: 13, platform: 'Instagram', type: 'Reel', pillar: 'Lifestyle', caption: 'Lunar New Year is coming. Celebrate freely with Joyn', hook: 'Holiday celebration content', format: 'Festive lifestyle reel', priority: 'high' },
  { day: 13, platform: 'TikTok', type: 'Video', pillar: 'Lifestyle', caption: 'Celebrating Lunar New Year without the flush for the first time', hook: 'This one hits different', format: 'Holiday emotional story', priority: 'high' },
  { day: 14, platform: 'Instagram', type: 'Feed Post', pillar: 'Lifestyle', caption: "Valentine's Day is next week. Confidence in a capsule for your most romantic night.", hook: 'V-Day is almost here', format: 'Valentine product post', priority: 'medium' },
  // Week 3
  { day: 15, platform: 'TikTok', type: 'Video', pillar: 'Education', caption: 'Doctor reacts: Is Joyn actually safe? (Spoiler: the answer will surprise you)', hook: 'Medical professional weighs in', format: 'Duet/reaction with expert', priority: 'high' },
  { day: 16, platform: 'Instagram', type: 'Carousel', pillar: 'Education', caption: 'The ALDH2 gene: Why 1 in 3 East Asians carry it, and what it means for you', hook: "Your genes aren't your destiny", format: 'Scientific carousel 6 slides', priority: 'high' },
  { day: 17, platform: 'TikTok', type: 'Video', pillar: 'Founder', caption: "I built Joyn because I was tired of hiding at every celebration. Here's my story.", hook: 'The founder story nobody expected', format: 'Founder personal story', priority: 'high' },
  { day: 18, platform: 'Instagram', type: 'Story', pillar: 'Engagement', caption: "This week's question: What celebration are you most excited to enjoy with Joyn?", hook: 'Community question', format: 'Question story', priority: 'low' },
  { day: 19, platform: 'TikTok', type: 'Video', pillar: 'Social Proof', caption: 'Week 1 with Joyn: an honest diary', hook: '7 days, 7 celebrations, 0 flush', format: 'Diary-style series', priority: 'medium' },
  { day: 20, platform: 'Instagram', type: 'Feed Post', pillar: 'Product', caption: "Made in the USA. Sourced from nature. Formulated by women. That's the Joyn difference.", hook: 'The values behind every capsule', format: 'Brand values graphic', priority: 'medium' },
  { day: 21, platform: 'TikTok', type: 'Video', pillar: 'Lifestyle', caption: 'Spring break looking different this year (no flush edition)', format: 'Spring lifestyle video', hook: 'The glow-up is real', priority: 'medium' },
  // Week 4
  { day: 22, platform: 'Instagram', type: 'Carousel', pillar: 'Social Proof', caption: 'Community spotlight: 10 Joyn customers, 10 stories', hook: 'Real people, real freedom', format: '10-person testimonial carousel', priority: 'high' },
  { day: 23, platform: 'TikTok', type: 'Video', pillar: 'Education', caption: 'Joyn ingredient breakdown: what each one actually does', hook: 'The formula, explained', format: 'Science explainer', priority: 'high' },
  { day: 24, platform: 'Instagram', type: 'Feed Post', pillar: 'Promotion', caption: "30 days of Joyn. Thousands of celebrations. Here's what we learned.", hook: '30-day milestone recap', format: 'Milestone graphic', priority: 'high' },
  { day: 25, platform: 'TikTok', type: 'Video', pillar: 'Social Proof', caption: 'Responding to your biggest doubts about Joyn', hook: 'I read every comment so you did not have to', format: 'Q&A response video', priority: 'medium' },
  { day: 26, platform: 'Instagram', type: 'Reel', pillar: 'Lifestyle', caption: 'The glow up is real. Joyn community takeover weekend', format: 'Community highlight reel', hook: 'Our community is iconic', priority: 'medium' },
  { day: 27, platform: 'TikTok', type: 'Video', pillar: 'Entertainment', caption: 'Rating celebrity flush moments (they definitely needed Joyn)', hook: 'A-listers who needed us', format: 'Entertainment list video', priority: 'medium' },
  { day: 28, platform: 'Instagram', type: 'Feed Post', pillar: 'Brand', caption: "Month 1 complete. Here's to reshaping the way 600 million people celebrate.", hook: 'Month one recap', format: 'Milestone celebration post', priority: 'high' },
  { day: 29, platform: 'TikTok', type: 'Video', pillar: 'Founder', caption: 'What I wish I knew about alcohol flush at 21', hook: 'The advice I wish I had', format: 'Reflective founder video', priority: 'medium' },
  { day: 30, platform: 'Instagram', type: 'Story', pillar: 'Promotion', caption: 'Subscribe & save is LIVE. 20% off every bottle, every month. Tap to shop.', hook: 'Subscribe & save launch', format: 'Product launch story', priority: 'high' },
]

const platformColors: Record<string, string> = {
  TikTok: '#FD5C1E',
  Instagram: '#D72C0D',
  Pinterest: '#003882',
}

const pillarColors: Record<string, string> = {
  Education: '#003882',
  'Social Proof': '#27AE60',
  Lifestyle: '#FD5C1E',
  Product: '#87ADEF',
  Brand: '#D72C0D',
  Founder: '#9B59B6',
  Engagement: '#F39C12',
  Promotion: '#E74C3C',
  Entertainment: '#FF6B35',
}

const weeks = [
  { label: 'Week 1: Launch', days: [1, 7] },
  { label: 'Week 2: Education Blitz', days: [8, 14] },
  { label: 'Week 3: Community + Proof', days: [15, 21] },
  { label: 'Week 4: Milestone & Scale', days: [22, 30] },
]

export default function CalendarPage() {
  const [filter, setFilter] = useState<string>('All')
  const platforms = ['All', 'TikTok', 'Instagram', 'Pinterest']

  const filtered = calendarData.filter(e => filter === 'All' || e.platform === filter)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#FFF8F4] to-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-orange-100 rounded-full text-[#FD5C1E] text-sm font-bold mb-6">
            30-Day Launch Calendar
          </div>
          <h1 className="text-5xl font-black text-[#0D0D0D] mb-4">Content Calendar</h1>
          <p className="text-gray-500 text-xl max-w-2xl">
            30 days of planned content across TikTok, Instagram, and Pinterest — with captions, hooks, and format specs.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
              <div className="text-3xl font-black text-[#FD5C1E]">{calendarData.length}</div>
              <div className="text-sm text-gray-500">Total Posts</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
              <div className="text-3xl font-black text-[#003882]">{calendarData.filter(e => e.platform === 'TikTok').length}</div>
              <div className="text-sm text-gray-500">TikTok</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
              <div className="text-3xl font-black text-[#D72C0D]">{calendarData.filter(e => e.platform === 'Instagram').length}</div>
              <div className="text-sm text-gray-500">Instagram</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
              <div className="text-3xl font-black text-[#87ADEF]">{calendarData.filter(e => e.platform === 'Pinterest').length}</div>
              <div className="text-sm text-gray-500">Pinterest</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-400 font-medium mr-2">Filter:</span>
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                filter === p ? 'bg-[#FD5C1E] text-white' : 'text-gray-500 hover:bg-orange-50 hover:text-[#FD5C1E]'
              }`}
            >
              {p}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-400">{filtered.length} posts</span>
        </div>
      </div>

      {/* Calendar by Week */}
      <div className="py-12 px-6 max-w-7xl mx-auto space-y-12">
        {weeks.map((week) => {
          const weekEntries = filtered.filter(e => e.day >= week.days[0] && e.day <= week.days[1])
          if (weekEntries.length === 0) return null
          const dayGroups: Record<number, CalendarEntry[]> = {}
          weekEntries.forEach(e => {
            if (!dayGroups[e.day]) dayGroups[e.day] = []
            dayGroups[e.day].push(e)
          })

          return (
            <div key={week.label}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-black text-[#0D0D0D]">{week.label}</h2>
                <div className="h-px flex-1 bg-gray-100"></div>
                <span className="text-sm text-gray-400">Days {week.days[0]}–{week.days[1]}</span>
              </div>

              <div className="space-y-4">
                {Object.entries(dayGroups).map(([day, entries]) => (
                  <div key={day} className="flex gap-4">
                    <div className="w-14 shrink-0 text-center pt-4">
                      <div className="text-2xl font-black text-gray-200">{day}</div>
                      <div className="text-xs text-gray-400">Day</div>
                    </div>
                    <div className="flex-1 grid md:grid-cols-2 gap-3">
                      {entries.map((e, i) => (
                        <div
                          key={i}
                          className={`bg-white rounded-xl border border-gray-100 p-4 card-hover ${e.priority === 'high' ? 'border-l-4' : ''}`}
                          style={e.priority === 'high' ? { borderLeftColor: platformColors[e.platform] || '#FD5C1E' } : {}}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                                style={{ backgroundColor: platformColors[e.platform] || '#FD5C1E' }}
                              >
                                {e.platform}
                              </span>
                              <span className="text-xs text-gray-400">{e.type}</span>
                            </div>
                            <span
                              className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                              style={{ backgroundColor: pillarColors[e.pillar] || '#888' }}
                            >
                              {e.pillar}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-[#FD5C1E] mb-1">HOOK: {e.hook}</div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{e.caption}</p>
                          <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">{e.format}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Export CTA */}
      <section className="py-16 px-6 bg-[#003882] text-center">
        <h2 className="text-3xl font-black text-white mb-4">Export This Calendar</h2>
        <p className="text-[#87ADEF] text-lg mb-8 max-w-lg mx-auto">
          Copy this data into Notion, Airtable, or a spreadsheet to manage execution with your team.
        </p>
        <div className="inline-flex gap-3 flex-wrap justify-center">
          <div className="bg-white/10 rounded-xl px-6 py-3 text-white font-semibold text-sm">Copy to Notion</div>
          <div className="bg-white/10 rounded-xl px-6 py-3 text-white font-semibold text-sm">Export to Airtable</div>
          <div className="bg-[#FD5C1E] rounded-xl px-6 py-3 text-white font-bold text-sm">Download CSV</div>
        </div>
      </section>
    </div>
  )
}
