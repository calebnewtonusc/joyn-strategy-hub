'use client'

import { useState } from 'react'

// --- Post mockup components ---

function IGPost({ bg, textColor = 'text-white', headline, subtext, tag, likes, handle = 'joynthefun' }: {
  bg: string; textColor?: string; headline: string; subtext?: string; tag?: string; likes: string; handle?: string
}) {
  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-50">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FD5C1E] to-[#D72C0D] flex items-center justify-center text-white text-xs font-black">J</div>
        <span className="text-xs font-semibold text-[#0D0D0D]">{handle}</span>
        <span className="ml-auto text-gray-300 text-lg leading-none">···</span>
      </div>
      <div className={`aspect-square ${bg} flex flex-col items-center justify-center p-5 text-center`}>
        {tag && <div className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">{tag}</div>}
        <p className={`font-black text-lg leading-tight ${textColor}`}>{headline}</p>
        {subtext && <p className={`text-xs mt-2 opacity-70 ${textColor}`}>{subtext}</p>}
      </div>
      <div className="px-3 py-2">
        <div className="flex gap-3 text-gray-400 text-sm mb-1">
          <span>♡</span><span>💬</span><span>↗</span><span className="ml-auto">🔖</span>
        </div>
        <p className="text-xs font-semibold text-[#0D0D0D]">{likes} likes</p>
      </div>
    </div>
  )
}

function TikTokPost({ hook, caption, tag }: { hook: string; caption: string; tag?: string }) {
  return (
    <div className="w-full bg-black rounded-2xl overflow-hidden shadow-sm border border-gray-800 hover:shadow-md transition-shadow" style={{ aspectRatio: '9/16' }}>
      <div className="h-full relative bg-gradient-to-b from-[#1a1a1a] to-black flex flex-col justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FD5C1E] to-[#D72C0D] flex items-center justify-center text-white text-xs font-black">J</div>
          <span className="text-white text-xs font-semibold">@joynthefun</span>
          {tag && <span className="ml-auto text-xs bg-white/10 text-white px-2 py-0.5 rounded-full">{tag}</span>}
        </div>
        <div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            <div className="text-center">
              <div className="text-white text-xl">♡</div>
              <div className="text-white/50 text-xs">28K</div>
            </div>
            <div className="text-center">
              <div className="text-white text-xl">💬</div>
              <div className="text-white/50 text-xs">412</div>
            </div>
            <div className="text-center">
              <div className="text-white text-xl">↗</div>
              <div className="text-white/50 text-xs">3.1K</div>
            </div>
          </div>
          <div className="pr-10">
            <p className="text-white font-black text-base leading-tight mb-2">{hook}</p>
            <p className="text-white/60 text-xs leading-relaxed line-clamp-2">{caption}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Copy Bank ---

type CopyItem = {
  platform: string
  pillar: string
  hook: string
  caption: string
  cta: string
}

const copyBank: CopyItem[] = [
  {
    platform: 'TikTok',
    pillar: 'Education',
    hook: 'POV: You just found out why your face turns red when you drink 🤯',
    caption: 'ALDH2 deficiency affects 600 MILLION people. Your body produces acetaldehyde faster than it can process it — that\'s the flush. And no, antacids don\'t fix it. Joyn does. Link in bio.',
    cta: 'Link in bio → joynthefun.com',
  },
  {
    platform: 'TikTok',
    pillar: 'Social Proof',
    hook: 'I went to a wedding and didn\'t flush once. Here\'s what I took.',
    caption: 'Been embarrassed at every family dinner, every first date, every work happy hour for 10 years. Tried Joyn before my cousin\'s wedding and I cannot explain how free I felt. This is not an ad. I just need you to know this exists.',
    cta: 'Shop at joynthefun.com',
  },
  {
    platform: 'TikTok',
    pillar: 'Education',
    hook: 'Ranking every "cure" for alcohol flush from worst to best 🚨',
    caption: 'Antacids — dangerous (causes ulcers). Water — lol no. Avoiding alcohol — valid but sad. Joyn — the only supplement actually formulated for this. Made in the USA, natural ingredients, real results.',
    cta: 'Get yours at joynthefun.com',
  },
  {
    platform: 'TikTok',
    pillar: 'Lifestyle',
    hook: 'Lunar New Year without the flush for the first time in my life',
    caption: 'My parents always noticed. My relatives always asked. I always made excuses to leave early. Not this year. Joyn changed the way I celebrate my own culture. This one\'s personal.',
    cta: 'joynthefun.com — link in bio',
  },
  {
    platform: 'TikTok',
    pillar: 'Entertainment',
    hook: 'Red wine ✅ Red face ❌',
    caption: 'Joyn season is officially open. No more leaving happy hour early. No more hiding in photos. No more explaining your face to everyone at the table. Confidence in a capsule. Period.',
    cta: 'Link in bio',
  },
  {
    platform: 'Instagram',
    pillar: 'Education',
    hook: '5 things nobody told you about alcohol flush (save this)',
    caption: '1. It\'s genetic — not a sign you\'re a "lightweight"\n2. It affects 1 in 3 East Asians, and millions more globally\n3. The real cause is ALDH2 enzyme deficiency\n4. Antacids mask it but cause stomach damage\n5. Joyn is the first supplement formulated specifically for this\n\nYou\'ve been doing this wrong. We fixed it. 🔗 Link in bio.',
    cta: 'Shop link in bio',
  },
  {
    platform: 'Instagram',
    pillar: 'Social Proof',
    hook: '"I\'ve been hiding at parties for 15 years. Not anymore."',
    caption: '"I used to leave events early because I was embarrassed about my face. I tried Joyn before my work holiday party and stayed until midnight for the first time ever. I cried on the way home. This product gave me something back." — Sarah, 32, NYC\n\n📩 DM us your story. We want to hear it.',
    cta: 'Try Joyn → joynthefun.com',
  },
  {
    platform: 'Instagram',
    pillar: 'Product',
    hook: 'Meet the formula. Every ingredient, every reason.',
    caption: 'We don\'t hide what\'s in Joyn. Every ingredient was chosen because of the science — not the margins.\n\n✓ Natural sourced\n✓ Made in the USA\n✓ Formulated by women\n✓ Designed for ALDH2 deficiency\n\nConfidence in a capsule. 🍊 Link in bio.',
    cta: 'Shop Joyn → joynthefun.com',
  },
  {
    platform: 'Instagram',
    pillar: 'Lifestyle',
    hook: 'Wedding season is coming. You\'re ready.',
    caption: 'Open bar at a wedding. Toasts. Dancing. Photos. The things you\'ve been dreading for years.\n\nNot anymore.\n\nJoyn was made for every celebration you\'ve been holding back from. This is your season. 🥂',
    cta: 'Get Joyn → joynthefun.com',
  },
  {
    platform: 'Pinterest',
    pillar: 'Education',
    hook: 'What is ALDH2 deficiency? The science behind alcohol flush',
    caption: 'Alcohol flush reaction is caused by a genetic variant that affects how your body breaks down acetaldehyde. Over 600 million people worldwide carry this variant — most of them don\'t know it has a name, let alone a solution. Joyn was designed specifically for them.',
    cta: 'Learn more at joynthefun.com',
  },
  {
    platform: 'Pinterest',
    pillar: 'Lifestyle',
    hook: '12 celebrations that hit different with Joyn',
    caption: 'Weddings. First dates. Work happy hours. Holiday parties. Birthdays. Brunches. Wine tastings. Reunions. New Year\'s Eve. Lunar New Year. Graduation parties. Bachelorettes.\n\nEvery single one. With Joyn.',
    cta: 'Shop at joynthefun.com',
  },
]

export default function ContentPage() {
  const [filter, setFilter] = useState('All')
  const [copied, setCopied] = useState<string | null>(null)

  const platforms = ['All', 'TikTok', 'Instagram', 'Pinterest']

  const filtered = copyBank.filter(c => filter === 'All' || c.platform === filter)

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const platformColor: Record<string, string> = {
    TikTok: '#FD5C1E',
    Instagram: '#D72C0D',
    Pinterest: '#003882',
  }

  const pillarColor: Record<string, string> = {
    Education: '#003882',
    'Social Proof': '#16a34a',
    Lifestyle: '#FD5C1E',
    Product: '#7c3aed',
    Entertainment: '#D72C0D',
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-bold text-[#FD5C1E] uppercase tracking-widest mb-3">Content Kit</div>
          <h1 className="text-5xl font-black text-[#0D0D0D] mb-3">What to post.</h1>
          <p className="text-gray-400 text-lg">Visual mockups + ready-to-copy captions for every platform and content type.</p>
        </div>
      </section>

      {/* Instagram Post Grid */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-[#0D0D0D]">Instagram Posts</h2>
          <span className="text-sm text-gray-400">1 feed post/day · 5-7 stories/day</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <IGPost
            bg="bg-gradient-to-br from-[#FD5C1E] to-[#D72C0D]"
            headline="Confidence in a capsule."
            subtext="Zero flush. All celebration."
            tag="Product Launch"
            likes="8,241"
          />
          <IGPost
            bg="bg-[#003882]"
            headline="5 things nobody told you about alcohol flush"
            subtext="SAVE THIS. You need it."
            tag="Education"
            likes="14,382"
          />
          <IGPost
            bg="bg-[#FFF8F4]"
            textColor="text-[#0D0D0D]"
            headline={'"I stayed until midnight for the first time ever."'}
            subtext="— Sarah, 32, NYC"
            tag="Customer Story"
            likes="6,104"
          />
          <IGPost
            bg="bg-gradient-to-br from-[#0D0D0D] to-[#1a1a2e]"
            headline="Red wine ✓ Red face ✗"
            subtext="Joyn season is open."
            tag="Brand"
            likes="19,847"
          />
          <IGPost
            bg="bg-gradient-to-br from-[#003882] to-[#0052CC]"
            headline="ALDH2 affects 600 MILLION people."
            subtext="Most don't know it has a solution."
            tag="Awareness"
            likes="32,100"
          />
          <IGPost
            bg="bg-gradient-to-br from-[#FD5C1E] via-[#D72C0D] to-[#003882]"
            headline="Every ingredient. Every reason. No secrets."
            subtext="Made in the USA. Formulated by women."
            tag="Transparency"
            likes="4,892"
          />
          <IGPost
            bg="bg-[#FFF8F4]"
            textColor="text-[#0D0D0D]"
            headline="Wedding season. Open bar. Zero anxiety."
            subtext="This is your year."
            tag="Lifestyle"
            likes="11,560"
          />
          <IGPost
            bg="bg-[#0D0D0D]"
            headline="Reshape the way you celebrate."
            subtext="joynthefun.com"
            tag="Brand"
            likes="7,331"
          />
        </div>
      </section>

      {/* TikTok Scripts */}
      <section className="px-6 py-12 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-white">TikTok Scripts</h2>
            <span className="text-sm text-gray-500">1-2 posts/day · 30-60s each</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TikTokPost
              hook="POV: You found out why your face turns red 🤯"
              caption="ALDH2 deficiency. 600 million people have it. Here's what it actually is..."
              tag="Education"
            />
            <TikTokPost
              hook="I went to a wedding and didn't flush once"
              caption="Been embarrassed for 10 years. Tried Joyn. Changed everything. Not sponsored."
              tag="Proof"
            />
            <TikTokPost
              hook="Rating every 'flush cure' from worst to best 🚨"
              caption="Antacids = dangerous. Water = lol. Joyn = the only one made for this..."
              tag="Education"
            />
            <TikTokPost
              hook="Lunar New Year without the flush for the first time"
              caption="My parents always noticed. My relatives always asked. Not this year."
              tag="Lifestyle"
            />
          </div>
        </div>
      </section>

      {/* Copy Bank */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#0D0D0D]">Copy Bank</h2>
            <p className="text-sm text-gray-400 mt-1">Click any caption to copy. Ready to paste.</p>
          </div>
          <div className="flex gap-1">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setFilter(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filter === p ? 'bg-[#0D0D0D] text-white' : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-50">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: platformColor[item.platform] }}>
                  {item.platform}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: pillarColor[item.pillar] || '#888' }}>
                  {item.pillar}
                </span>
                <span className="ml-auto text-xs text-gray-400">{item.cta}</span>
              </div>
              <div className="p-4">
                <div
                  className="bg-[#FFF8F4] rounded-lg p-3 mb-3 cursor-pointer group relative"
                  onClick={() => copyText(item.hook, `hook-${i}`)}
                >
                  <div className="text-xs font-bold text-[#FD5C1E] uppercase tracking-wide mb-1">HOOK</div>
                  <p className="text-sm font-semibold text-[#0D0D0D]">{item.hook}</p>
                  <span className="absolute top-2 right-2 text-xs bg-[#FD5C1E] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {copied === `hook-${i}` ? '✓ Copied!' : 'Copy'}
                  </span>
                </div>
                <div
                  className="bg-gray-50 rounded-lg p-3 cursor-pointer group relative"
                  onClick={() => copyText(item.caption, `cap-${i}`)}
                >
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">CAPTION</div>
                  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{item.caption}</p>
                  <span className="absolute top-2 right-2 text-xs bg-[#0D0D0D] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {copied === `cap-${i}` ? '✓ Copied!' : 'Copy'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
