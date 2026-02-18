'use client'

import { useState } from 'react'

type Post = {
  platform: 'TikTok' | 'Instagram' | 'Pinterest'
  type: string
  hook: string
  format: string
  priority: 'high' | 'medium'
}

type Day = {
  day: number
  theme: string
  posts: Post[]
}

const calendarData: Day[] = [
  { day: 1, theme: 'Launch Day', posts: [
    { platform: 'Instagram', type: 'Feed', hook: "We're live. Joyn is here for every celebration you've been holding back from.", format: 'Product hero', priority: 'high' },
    { platform: 'TikTok', type: 'Video', hook: 'POV: You finally found out why your face turns red when you drink', format: 'Educational voiceover 60s', priority: 'high' },
  ]},
  { day: 2, theme: 'Science Drop', posts: [
    { platform: 'Instagram', type: 'Story', hook: 'Quick poll: Do you get the alcohol flush?', format: 'Poll story', priority: 'medium' },
    { platform: 'TikTok', type: 'Video', hook: 'ALDH2 deficiency affects 600 million people and nobody talks about it', format: 'Green screen science', priority: 'high' },
  ]},
  { day: 3, theme: 'Education', posts: [
    { platform: 'Instagram', type: 'Carousel', hook: '5 things your doctor never told you about alcohol flush', format: '5-slide carousel', priority: 'high' },
    { platform: 'Pinterest', type: 'Pin', hook: 'What is ALDH2 deficiency? The science explained', format: 'Infographic 900×1200', priority: 'medium' },
  ]},
  { day: 4, theme: 'Community', posts: [
    { platform: 'TikTok', type: 'Video', hook: 'Things people with Asian flush relate to 😭', format: 'Relatable list video', priority: 'high' },
    { platform: 'Instagram', type: 'Story', hook: 'The antacid hack that\'s actually hurting you →', format: 'Text story + link', priority: 'medium' },
  ]},
  { day: 5, theme: 'Social Proof', posts: [
    { platform: 'Instagram', type: 'Feed', hook: 'Meet our first 100 customers. Real people, real celebrations.', format: 'Community mosaic', priority: 'medium' },
    { platform: 'TikTok', type: 'Video', hook: "I tried Joyn at my company happy hour and couldn't believe the difference", format: 'UGC-style review', priority: 'high' },
  ]},
  { day: 6, theme: 'Weekend', posts: [
    { platform: 'Instagram', type: 'Reel', hook: 'Weekend plans incoming. Grab your Joyn.', format: 'Lifestyle reel 15s', priority: 'medium' },
    { platform: 'TikTok', type: 'Video', hook: 'Red wine. Not red face. 🍷', format: 'Quick wit + product', priority: 'medium' },
  ]},
  { day: 7, theme: 'Q&A', posts: [
    { platform: 'Instagram', type: 'Story', hook: 'Ask us anything about alcohol flush or the formula 👇', format: 'Question box story', priority: 'medium' },
  ]},
  { day: 8, theme: 'Authority', posts: [
    { platform: 'TikTok', type: 'Video', hook: 'Ranking alcohol flush "solutions" from worst to best', format: 'Ranking video', priority: 'high' },
    { platform: 'Instagram', type: 'Feed', hook: 'Meet the formula. Every ingredient, every reason.', format: 'Ingredient carousel', priority: 'high' },
  ]},
  { day: 9, theme: 'Proof', posts: [
    { platform: 'TikTok', type: 'Video', hook: 'Before Joyn vs. After Joyn (this is the difference)', format: 'Before/after transition', priority: 'high' },
    { platform: 'Pinterest', type: 'Board', hook: '25 ideas for hangover-free celebrations', format: 'Board with 25 pins', priority: 'medium' },
  ]},
  { day: 10, theme: 'Occasions', posts: [
    { platform: 'Instagram', type: 'Carousel', hook: '6 celebrations that hit different with Joyn', format: '6-slide carousel', priority: 'medium' },
    { platform: 'TikTok', type: 'Video', hook: 'The antacid trick causes stomach ulcers? 😳', format: 'Shocking fact video', priority: 'high' },
  ]},
  { day: 11, theme: 'Promo', posts: [
    { platform: 'Instagram', type: 'Story', hook: 'First order? Use code JOYN15 for 15% off 🍊', format: 'Promo story', priority: 'high' },
    { platform: 'TikTok', type: 'Video', hook: 'First date after finding Joyn hits different 🥂', format: 'POV lifestyle video', priority: 'medium' },
  ]},
  { day: 12, theme: 'Testimonial', posts: [
    { platform: 'Instagram', type: 'Feed', hook: '"I\'ve been dealing with this for 15 years." — Sarah, 32', format: 'Testimonial quote', priority: 'high' },
    { platform: 'TikTok', type: 'Video', hook: 'Things your friends say vs. the truth when you have the flush', format: 'Comedy video', priority: 'medium' },
  ]},
  { day: 13, theme: 'Lunar New Year', posts: [
    { platform: 'Instagram', type: 'Reel', hook: 'Lunar New Year is coming. Celebrate freely with Joyn 🧧', format: 'Festive lifestyle reel', priority: 'high' },
    { platform: 'TikTok', type: 'Video', hook: 'Celebrating Lunar New Year without the flush for the first time', format: 'Holiday emotional story', priority: 'high' },
  ]},
  { day: 14, theme: "Valentine's", posts: [
    { platform: 'Instagram', type: 'Feed', hook: "Valentine's Day is next week. Your most confident night. 💕", format: 'Valentine product post', priority: 'medium' },
  ]},
  { day: 15, theme: 'Expert', posts: [
    { platform: 'TikTok', type: 'Video', hook: 'Doctor reacts: Is Joyn actually safe?', format: 'Expert duet/reaction', priority: 'high' },
  ]},
  { day: 16, theme: 'Science Deep', posts: [
    { platform: 'Instagram', type: 'Carousel', hook: 'The ALDH2 gene: Why 1 in 3 East Asians carry it', format: 'Scientific carousel 6 slides', priority: 'high' },
  ]},
  { day: 17, theme: 'Founder', posts: [
    { platform: 'TikTok', type: 'Video', hook: "I built Joyn because I was tired of hiding at every celebration.", format: 'Founder personal story', priority: 'high' },
  ]},
  { day: 18, theme: 'Community', posts: [
    { platform: 'Instagram', type: 'Story', hook: 'What celebration are you most excited to enjoy with Joyn?', format: 'Question story', priority: 'medium' },
  ]},
  { day: 19, theme: 'Diary', posts: [
    { platform: 'TikTok', type: 'Video', hook: 'Week 1 with Joyn: an honest diary 📓', format: 'Diary-style series part 1', priority: 'medium' },
  ]},
  { day: 20, theme: 'Values', posts: [
    { platform: 'Instagram', type: 'Feed', hook: 'Made in the USA. Sourced from nature. Formulated by women.', format: 'Brand values graphic', priority: 'medium' },
  ]},
  { day: 21, theme: 'Spring', posts: [
    { platform: 'TikTok', type: 'Video', hook: 'Spring break looking different this year 🌴 (no flush edition)', format: 'Spring lifestyle video', priority: 'medium' },
    { platform: 'Pinterest', type: 'Pin', hook: 'Spring celebrations, zero flush: the Joyn guide', format: 'Spring lifestyle board', priority: 'medium' },
  ]},
  { day: 22, theme: 'Community Spotlight', posts: [
    { platform: 'Instagram', type: 'Carousel', hook: 'Community spotlight: 10 Joyn customers, 10 stories', format: '10-person testimonial carousel', priority: 'high' },
  ]},
  { day: 23, theme: 'Formula', posts: [
    { platform: 'TikTok', type: 'Video', hook: 'Joyn ingredient breakdown: what each one actually does', format: 'Science explainer', priority: 'high' },
  ]},
  { day: 24, theme: '30 Days', posts: [
    { platform: 'Instagram', type: 'Feed', hook: '30 days of Joyn. Thousands of celebrations. Here\'s what we learned.', format: 'Milestone graphic', priority: 'high' },
    { platform: 'TikTok', type: 'Video', hook: 'Responding to your biggest doubts about Joyn', format: 'Q&A response video', priority: 'medium' },
  ]},
  { day: 25, theme: 'Doubters', posts: [
    { platform: 'TikTok', type: 'Video', hook: 'I read every skeptical comment about Joyn so you didn\'t have to', format: 'Comment response', priority: 'medium' },
  ]},
  { day: 26, theme: 'Community', posts: [
    { platform: 'Instagram', type: 'Reel', hook: 'Joyn community takeover weekend 🔥', format: 'Community highlight reel', priority: 'medium' },
  ]},
  { day: 27, theme: 'Fun', posts: [
    { platform: 'TikTok', type: 'Video', hook: 'Rating celebrity flush moments (they definitely needed Joyn)', format: 'Entertainment list video', priority: 'medium' },
  ]},
  { day: 28, theme: 'Milestone', posts: [
    { platform: 'Instagram', type: 'Feed', hook: "Month 1 done. Here's to reshaping the way 600M people celebrate. 🥂", format: 'Milestone celebration post', priority: 'high' },
    { platform: 'TikTok', type: 'Video', hook: 'What I wish I knew about alcohol flush at 21', format: 'Reflective founder video', priority: 'medium' },
  ]},
  { day: 29, theme: 'Subscribe', posts: [
    { platform: 'Instagram', type: 'Story', hook: 'Subscribe & save is LIVE. 20% off every bottle. 🍊', format: 'Product launch story', priority: 'high' },
  ]},
  { day: 30, theme: 'Next Chapter', posts: [
    { platform: 'TikTok', type: 'Video', hook: 'Month 2 starts now. Here\'s what\'s coming. 👀', format: 'Teaser video', priority: 'high' },
    { platform: 'Instagram', type: 'Feed', hook: 'Thank you for 30 days of celebrating freely. This is just the start.', format: 'Community appreciation post', priority: 'high' },
  ]},
]

const platformColor: Record<string, string> = {
  TikTok: '#FD5C1E',
  Instagram: '#D72C0D',
  Pinterest: '#003882',
}

const platformDot: Record<string, string> = {
  TikTok: 'bg-[#FD5C1E]',
  Instagram: 'bg-[#D72C0D]',
  Pinterest: 'bg-[#003882]',
}

export default function CalendarPage() {
  const [selected, setSelected] = useState<Day | null>(null)

  const totalPosts = calendarData.reduce((acc, d) => acc + d.posts.length, 0)

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="bg-white border-b border-gray-100 px-6 py-12">
        <div className="max-w-7xl mx-auto flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs font-bold text-[#FD5C1E] uppercase tracking-widest mb-3">Content Calendar</div>
            <h1 className="text-5xl font-black text-[#0D0D0D] mb-2">30-Day Launch.</h1>
            <p className="text-gray-400">Click any day to see the content. {totalPosts} posts planned.</p>
          </div>
          <div className="flex items-center gap-4">
            {Object.entries(platformColor).map(([p, c]) => (
              <div key={p} className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c }}></div>
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="px-6 py-10 max-w-7xl mx-auto">
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
            <div key={d} className="text-center text-xs font-bold text-gray-300 uppercase py-2">{d}</div>
          ))}
        </div>
        {/* Offset: starts on Wednesday (index 2) */}
        <div className="grid grid-cols-7 gap-2">
          <div></div><div></div>
          {calendarData.map((day) => (
            <button
              key={day.day}
              onClick={() => setSelected(selected?.day === day.day ? null : day)}
              className={`p-2 rounded-xl text-left transition-all hover:scale-[1.02] ${
                selected?.day === day.day
                  ? 'bg-[#0D0D0D] text-white ring-2 ring-[#FD5C1E]'
                  : 'bg-white border border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className={`text-sm font-black mb-1 ${selected?.day === day.day ? 'text-white' : 'text-[#0D0D0D]'}`}>
                {day.day}
              </div>
              <div className={`text-xs mb-2 truncate ${selected?.day === day.day ? 'text-white/60' : 'text-gray-400'}`}>
                {day.theme}
              </div>
              <div className="flex gap-0.5 flex-wrap">
                {day.posts.map((p, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${platformDot[p.platform]}`}></div>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Day Detail */}
        {selected && (
          <div className="mt-6 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="bg-[#0D0D0D] px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-white font-black text-xl">Day {selected.day}</span>
                <span className="text-gray-400 text-sm ml-3">{selected.theme}</span>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {selected.posts.map((post, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-gray-50">
                  <div
                    className="w-1 rounded-full shrink-0"
                    style={{ backgroundColor: platformColor[post.platform] }}
                  ></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: platformColor[post.platform] }}
                      >
                        {post.platform}
                      </span>
                      <span className="text-xs text-gray-400">{post.type}</span>
                      {post.priority === 'high' && (
                        <span className="text-xs font-bold text-[#FD5C1E] ml-auto">PRIORITY</span>
                      )}
                    </div>
                    <p className="font-semibold text-[#0D0D0D] text-sm mb-1">{post.hook}</p>
                    <p className="text-xs text-gray-400">{post.format}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Week Themes */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { week: 'Week 1', theme: 'Launch + Science', days: '1–7', color: 'bg-[#FD5C1E]' },
            { week: 'Week 2', theme: 'Social Proof Blitz', days: '8–14', color: 'bg-[#003882]' },
            { week: 'Week 3', theme: 'Community + Founder', days: '15–21', color: 'bg-[#D72C0D]' },
            { week: 'Week 4', theme: 'Milestone + Scale', days: '22–30', color: 'bg-[#0D0D0D]' },
          ].map((w) => (
            <div key={w.week} className={`${w.color} rounded-xl p-4 text-white`}>
              <div className="text-xs font-bold opacity-50 mb-1">{w.week} · Days {w.days}</div>
              <div className="font-black">{w.theme}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
