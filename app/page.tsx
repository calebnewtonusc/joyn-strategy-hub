'use client'
import { useState } from 'react'

/* ── utils ───────────────────────────────────────────────────── */

function CopyBtn({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false)
  const go = () => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000) }
  return (
    <button onClick={go} className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
      ok ? 'bg-green-50 text-green-600 border-green-200' : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-[#0a0a0a]'
    }`}>
      {ok ? '✓ Copied' : label}
    </button>
  )
}

const PC: Record<string, string> = { TikTok: '#FD5C1E', Instagram: '#D72C0D', Pinterest: '#003882' }
const PS: Record<string, string> = { TK: '#FD5C1E', IG: '#D72C0D', PT: '#003882' }
const PL: Record<string, string> = { TK: 'TikTok', IG: 'Instagram', PT: 'Pinterest' }

function Chip({ p }: { p: string }) {
  return <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full text-white uppercase tracking-wide" style={{ backgroundColor: PC[p] }}>{p}</span>
}

/* ── data ────────────────────────────────────────────────────── */

// Wednesday Feb 18 is Day 18 of the launch — this is hardcoded as "today"
const TODAY = {
  date: 'Wednesday, February 18',
  dayNum: 18,
  posts: [
    {
      id: 1,
      platform: 'Instagram',
      format: 'Story Poll',
      hook: 'What celebration are you most excited for? 🎉',
      shoot: 'Post a Story with a poll sticker. Options: "A wedding" / "Graduation" / "Date night" / "Just a Friday." Use Joyn orange as the background color.',
      caption: `What celebration are you most excited for this year? 🎉

Drop it in the comments or vote in our poll 👆

Whether it's a wedding, a birthday, a work win, or just a Friday night that feels like something — you deserve to be fully present for it.

Joyn is here for all of it. 🧡

#Joyn #Celebrate #ALDH2 #ConfidenceInACapsule #CelebrateFreely`,
    },
  ],
}

const UPCOMING = [
  {
    date: 'Thu, Feb 19',
    platform: 'TikTok',
    format: 'Selfie Video',
    hook: '7 days with Joyn — honest diary',
    shoot: 'Record short clips over a week and stitch them. Selfie-cam, natural lighting. No script, no hard sell.',
    caption: `7 days with Joyn — I'm going to be honest 📔

Day 1: Took 2 capsules 30 min before drinks. Less flushing than normal. Cautiously optimistic.

Day 2: Work happy hour. Stayed the whole time. Ordered a second drink. My coworker asked why I seemed more relaxed.

Day 4: Date night. Ordered wine without the usual anxiety.

Day 5: Checked my face mid-meal. Normal color. Actually stayed at dinner.

Day 7: I cried a little honestly. 15 years of hiding. 7 days.

Not an ad. Just someone who needed this to exist.

#Joyn #AlcoholFlush #ALDH2 #HealthTok #HonestReview #7DayChallenge #ConfidenceInACapsule`,
  },
  {
    date: 'Fri, Feb 20',
    platform: 'Instagram',
    format: 'Feed Post',
    hook: 'Made in the USA. By women. For everyone.',
    shoot: 'Personal editorial photo of Brynn or the team. No product shots — this post is about the human story behind Joyn.',
    caption: `We didn't build Joyn to get rich. We built it because we were tired of hiding. 🍷

Tired of showing up to celebrations and quietly managing our faces instead of being present.

Tired of the Reddit threads saying "just take Pepcid" — an antacid used off-label that causes real stomach damage.

Tired of a market full of "hangover cures" that weren't built for us at all.

600 million people deserve a real answer. So we built one.

Woman-founded. USA-made. Formulated for your biology, not against it.

Joyn. Confidence in a capsule. 🧡

#Joyn #WomanFounded #ALDH2 #AlcoholFlush #ConfidenceInACapsule #USAMade`,
  },
  {
    date: 'Sat, Feb 21',
    platform: 'TikTok',
    format: 'Lifestyle Video',
    hook: 'Spring break. No flush edition. 🌴',
    shoot: 'Fun, energetic. Spring break / going out energy. Trending audio. Light edit.',
    caption: `Spring break is almost here and for the first time you don't have to choose between having fun and hiding your face 🌴

Two capsules. Thirty minutes. That's it.

Use code SPRING15 for 15% off → link in bio.

#SpringBreak #AlcoholFlush #ALDH2 #AsianGlow #Joyn #CelebrateFully #ConfidenceInACapsule`,
  },
]

// Feb 2026: Feb 1 = Sunday. 28 days. Perfect 4×7 grid.
const FEB_CALENDAR = [
  {
    week: 'Week 1 · Launch + Science',
    days: [
      { n: 1, p: ['IG', 'TK'], hooks: ["We're live.", 'POV: You found out why your face turns red'] },
      { n: 2, p: ['IG', 'TK'], hooks: ['Do you get the flush? [poll]', '600M people have this. Nobody talks about it.'] },
      { n: 3, p: ['IG', 'PT'], hooks: ['5 things your doctor never told you [carousel]', 'What is ALDH2 deficiency? [infographic]'] },
      { n: 4, p: ['TK', 'IG'], hooks: ['Things people with Asian flush relate to 😭', "The antacid hack that's actually hurting you"] },
      { n: 5, p: ['IG', 'TK'], hooks: ['Meet our first 100 customers', 'I tried Joyn at my work happy hour'] },
      { n: 6, p: ['IG', 'TK'], hooks: ['Weekend plans incoming. Grab Joyn.', 'Red wine. Not red face. 🍷'] },
      { n: 7, p: ['IG'], hooks: ['Q&A: Ask us anything 👇'] },
    ],
  },
  {
    week: 'Week 2 · Social Proof',
    days: [
      { n: 8, p: ['TK', 'IG'], hooks: ['Ranking every flush cure from worst to best', 'Every ingredient, every reason [carousel]'] },
      { n: 9, p: ['TK', 'PT'], hooks: ['Before Joyn vs. After Joyn', '25 celebration ideas for people who live flush-free'] },
      { n: 10, p: ['IG', 'TK'], hooks: ['6 celebrations that hit different with Joyn', 'Antacids cause stomach ulcers?? 😳'] },
      { n: 11, p: ['IG', 'TK'], hooks: ['JOYN15 — 15% off [story]', 'First date after finding Joyn hits different'] },
      { n: 12, p: ['IG', 'TK'], hooks: ['"15 years. Finally a real solution." — Sarah', 'Things your friends say vs. the truth'] },
      { n: 13, p: ['IG', 'TK'], hooks: ['Lunar New Year. Celebrate freely. 🧧', 'LNY without the flush for the first time'] },
      { n: 14, p: ['IG'], hooks: ["Valentine's Day — confidence ready 💛"] },
    ],
  },
  {
    week: 'Week 3 · Community + Founder',
    days: [
      { n: 15, p: ['TK'], hooks: ['Doctor reacts: Is Joyn actually safe?'] },
      { n: 16, p: ['IG'], hooks: ['ALDH2: Why 1 in 3 East Asians carry it [carousel]'] },
      { n: 17, p: ['TK'], hooks: ['I built Joyn because I was tired of hiding.'] },
      { n: 18, p: ['IG'], hooks: ['What celebration are you most excited for? [story]'] },
      { n: 19, p: ['TK'], hooks: ['7 days, 7 celebrations, 0 flush — diary'] },
      { n: 20, p: ['IG'], hooks: ['Made in the USA. By women. For everyone.'] },
      { n: 21, p: ['TK', 'PT'], hooks: ['Spring break. No flush edition. 🌴', 'Spring celebrations, zero flush guide'] },
    ],
  },
  {
    week: 'Week 4 · Milestone + Scale',
    days: [
      { n: 22, p: ['IG'], hooks: ['Community spotlight: 10 customers, 10 stories'] },
      { n: 23, p: ['TK'], hooks: ['Joyn ingredient breakdown: what each one does'] },
      { n: 24, p: ['IG', 'TK'], hooks: ['30 days. Thousands of celebrations. 🥂', 'Responding to your biggest doubts about Joyn'] },
      { n: 25, p: ['TK'], hooks: ["I read every skeptical comment so you didn't have to"] },
      { n: 26, p: ['IG'], hooks: ['Community takeover weekend 🔥'] },
      { n: 27, p: ['TK'], hooks: ['Rating celebrity flush moments 😭 (they needed us)'] },
      { n: 28, p: ['IG', 'TK'], hooks: ["Month 1 done. Here's to the 600M. 🥂", 'What I wish I knew about flush at 21'] },
    ],
  },
]

type Cap = { id: number; platform: 'TikTok' | 'Instagram' | 'Pinterest'; type: string; hook: string; shoot: string; caption: string }

const CAPTIONS: Cap[] = [
  {
    id: 1, platform: 'TikTok', type: 'Educational',
    hook: 'Why your face turns red when you drink — the genetic truth nobody told you',
    shoot: 'Green screen with ALDH2 diagram. Keep under 60s. High save rate — this one regularly blows up in the flush community.',
    caption: `Why your face turns red when you drink — the genetic truth nobody told you 🧬

It's called ALDH2 deficiency. 1 in 3 East Asians carry the gene. 600 million people worldwide.

Here's what happens:
→ You drink alcohol
→ Your body converts it to acetaldehyde (toxic)
→ ALDH2 deficiency = your body can't break it down fast enough
→ Acetaldehyde builds up → redness, racing heart, nausea

The "fix" people use? Pepcid AC. An antacid. Off-label. Damages your stomach. Not formulated for this.

We built Joyn — the first supplement designed specifically for ALDH2 deficiency.

Drop "flush" in the comments and I'll DM you the link 👇

#ALDH2 #AlcoholFlush #AsianGlow #HealthTok #SupplementTok #GeneticHealth #Joyn`,
  },
  {
    id: 2, platform: 'TikTok', type: 'Relatable',
    hook: 'Things people with Asian flush relate to (a thread) 😭',
    shoot: 'Text list on screen with trending audio. Cut to your reaction for each one. Aim for comment engagement.',
    caption: `Things people with Asian flush relate to (a thread) 😭

✗ "One drink and my face looks like a tomato"
✗ Googling "alcohol flush remedy" for the 100th time
✗ Ordering club soda at work happy hours
✗ Leaving parties before the toast
✗ Taking Pepcid and worrying about your stomach
✗ Someone asking "are you OK?" when you're just having fun
✗ Skipping champagne at your own celebration

None of us signed up for this.
But now there's actually a real answer.

Joyn — the first supplement formulated for ALDH2.

Comment your most relatable one 👇 I read every comment

#AsianGlow #ALDH2 #AlcoholFlush #AsianAmericanProblems #Joyn #FlushReaction`,
  },
  {
    id: 3, platform: 'TikTok', type: 'Educational',
    hook: "Pepcid for alcohol flush? Your doctor probably doesn't know this 😳",
    shoot: 'Calm, credible delivery. Screenshot Reddit threads as B-roll. This one shares wildly — people DM it to friends.',
    caption: `Pepcid for alcohol flush? Your doctor probably doesn't know this 😳

Millions of people use H2 blockers (Pepcid, Zantac) off-label to reduce flush.

Here's the problem:
→ They block histamine — masking the red face symptom
→ They DON'T help your body break down acetaldehyde
→ Long-term: stomach ulcers, reduced acid, dependency
→ Never tested or approved for this purpose

And yet it's the #1 advice on Reddit and TikTok.

Joyn works differently. Supports ALDH2 enzyme activity — so your body actually processes the acetaldehyde instead of hiding it.

If this helped, share it. Link in bio 🙏

#AlcoholFlush #Pepcid #ALDH2 #AsianGlow #HealthTok #DrinkingTips #Joyn`,
  },
  {
    id: 4, platform: 'TikTok', type: 'Testimonial',
    hook: '7 days with Joyn — honest diary',
    shoot: 'Selfie-cam across 7 real days. Natural lighting, no script. Authentic > polished. This format converts.',
    caption: `7 days with Joyn — I'm going to be honest 📔

Day 1: Took 2 capsules 30 min before drinks. Slight flushing, less than normal. Cautiously optimistic.

Day 2: Work happy hour. Stayed the whole time. Ordered a second drink. My coworker asked why I seemed more relaxed.

Day 4: Date night. Ordered wine without the usual anxiety.

Day 5: Checked my face mid-meal. Normal color. Actually stayed at dinner.

Day 7: I cried a little honestly. 15 years of hiding. 7 days.

Not an ad. Just someone who needed this to exist.

#Joyn #AlcoholFlush #ALDH2 #HealthTok #HonestReview #7DayChallenge #ConfidenceInACapsule`,
  },
  {
    id: 5, platform: 'TikTok', type: 'Founder',
    hook: 'I spent a decade building Joyn because I was tired of hiding',
    shoot: 'Founder-to-camera. No script, personal, emotional. The most powerful content you can make. Just talk.',
    caption: `I spent a decade building Joyn because I was tired of hiding 🍷

Every networking event: sparkling water, hoping nobody noticed.
Every wedding toast: a sip and then back to water.
Every first date: counting drinks, watching my face.

Then I learned it was genetic. ALDH2 deficiency. Not just me — 600 million people.

I became obsessed with a real solution. Not Pepcid. Not gimmicks.

Years of development. USA-made. Third-party tested. Woman-founded.

This is Joyn. For every person who's ever hidden. 💛

#Joyn #WomanFounded #ALDH2 #AlcoholFlush #Founder #ConfidenceInACapsule`,
  },
  {
    id: 6, platform: 'TikTok', type: 'Entertainment',
    hook: 'Rating every alcohol flush "cure" from worst to best (HONEST)',
    shoot: 'On-screen tier list with comedic commentary. Fast-paced cuts. Great for shares and saves.',
    caption: `Rating every alcohol flush "cure" from worst to best — be honest, you've tried most of these 😅

❌ 5/10 — Cold water on face. Reduces redness for 2 minutes.
❌ 4/10 — Eating a huge meal first. Slows absorption, doesn't fix flush.
❌ 3/10 — Antihistamines. Makes you drowsy, doesn't address acetaldehyde.
⚠️ 2/10 — Pepcid off-label. Masks symptom, real stomach risks.
❌ 1/10 — Just stop drinking. OK sure, thanks.
✅ 9/10 — Joyn. Actually formulated for ALDH2 enzyme activity. First of its kind.

Minus 1 because nothing is perfect and I'm honest.

Link in bio.

#AlcoholFlush #AsianGlow #ALDH2 #Joyn #HealthTok`,
  },
  {
    id: 7, platform: 'TikTok', type: 'Lifestyle',
    hook: 'Open bar at a wedding with zero anxiety 💒',
    shoot: 'Cinematic clips from a wedding or night out. Voiceover or text overlay. Aspiration over information.',
    caption: `Open bar at a wedding with zero anxiety 💒

You know the wedding mental math:
→ Getting seated next to people you just met
→ Champagne toast coming
→ Choosing between looking rude (not drinking) or turning red (drinking)

This weekend: Joyn before the ceremony. Open bar, 4+ hours, multiple toasts, dancing.

Zero flush. Zero hiding. Zero mental math.

I was just there. Fully.

#Joyn #WeddingSeason #OpenBar #ALDH2 #AlcoholFlush #ConfidenceInACapsule`,
  },
  {
    id: 8, platform: 'Instagram', type: 'Educational',
    hook: 'Save this. Share it with someone who needs it. 📌',
    shoot: 'Design a 6-slide carousel. Slide 1: bold hook graphic. Slides 2–5: key ALDH2 facts. Slide 6: CTA to joynthefun.com.',
    caption: `Save this. Share it with someone who needs it. 📌

ALDH2 deficiency affects 600 million people — yet most people have never heard of it.

1 in 3 East Asians carry the gene. Millions more across all backgrounds.

For years, the "solution" was Pepcid AC — an antacid, off-label, that damages your stomach.

Joyn is the first supplement formulated specifically for ALDH2 deficiency.
Not a mask. A real answer for real biology.

Woman-founded. USA-made. Third-party tested.

→ Link in bio 🧡

#ALDH2 #AlcoholFlush #AsianGlow #Joyn #HealthEducation #WomanFounded #ConfidenceInACapsule #AAPI`,
  },
  {
    id: 9, platform: 'Instagram', type: 'Testimonial',
    hook: '"I stayed until midnight for the first time." — Sarah, 32',
    shoot: 'Clean orange quote card or a candid celebration photo. The quote does the work. Let it breathe.',
    caption: `"I stayed until midnight for the first time." — Sarah, 32 🥂

Sarah had been using Pepcid off-label for 8 years. Stomach issues. Always left parties early.

Two weeks into Joyn, she attended her company holiday party.

She danced. She made every toast. She was the last of her group to leave.

That's why we built this.

Real review. Real customer.

→ Link in bio. Use code SARAH15 for 15% off.

#Joyn #CustomerStory #ALDH2 #AlcoholFlush #ConfidenceInACapsule #Testimonial`,
  },
  {
    id: 10, platform: 'Instagram', type: 'Founder',
    hook: "We didn't build Joyn to get rich. We built it because we were tired of hiding.",
    shoot: 'Personal editorial photo of Brynn. No product in frame. Warm lighting. This post is about the human story.',
    caption: `We didn't build Joyn to get rich. We built it because we were tired of hiding. 🍷

Tired of showing up to celebrations and quietly managing our faces instead of being present.

Tired of the Reddit threads saying "just take Pepcid."

Tired of a market full of "hangover cures" that weren't built for us at all.

600 million people deserve a real answer. So we built one.

Woman-founded. USA-made. Formulated for your biology, not against it.

Joyn. Confidence in a capsule. 🧡

#Joyn #WomanFounded #ALDH2 #AlcoholFlush #ConfidenceInACapsule #USAMade`,
  },
  {
    id: 11, platform: 'Instagram', type: 'Lifestyle',
    hook: 'Lunar New Year without the flush — first time ever 🧧',
    shoot: 'Warm LNY aesthetic (red, gold, lanterns). Could be UGC. Schedule for Feb 13 (LNY eve).',
    caption: `Lunar New Year without the flush — first time in my life 🧧

Eight courses. Multiple toasts with the elders. Baijiu and beer and champagne.

Normally I'd be red by soup.
Normally I'd switch to tea early.

This year: Joyn. 2 capsules before dinner.

I stayed present the whole meal. Made every toast. My grandma asked why I seemed so happy.

That's the whole point. 🥂

→ Link in bio. Use code LNY25 for 25% off.

#LunarNewYear #ChineseNewYear #AAPI #ALDH2 #AsianGlow #Joyn #CelebrateFreely`,
  },
  {
    id: 12, platform: 'Instagram', type: 'Lifestyle',
    hook: "First date energy when you're not hiding your face 💛",
    shoot: 'Date night aesthetic — warm restaurant, candlelight. Could be a quote card with Joyn cream background.',
    caption: `First date energy when you're not hiding your face 💛

You know the feeling — ordering a drink and immediately watching your face betray you.

The mental math. The anxiety. The second-guessing.

With Joyn, I stayed present. I laughed. I actually tasted the wine.

Confidence you can see. Redness you cannot.

Use code FIRSTDATE for 15% off → link in bio 🧡

#Joyn #ALDH2 #AlcoholFlush #FirstDate #ConfidenceInACapsule #DateNight`,
  },
  {
    id: 13, platform: 'Pinterest', type: 'Educational',
    hook: 'What is ALDH2 deficiency? Your complete guide',
    shoot: 'Tall pin (2:3). White/orange brand colors. Bold title. SEO-rich description. Link to joynthefun.com.',
    caption: `What is ALDH2 deficiency? Your complete guide to understanding alcohol flush and finding real solutions.

ALDH2 deficiency affects 600 million people worldwide. 1 in 3 East Asians carry the gene. For years, the only option was Pepcid — an antacid used off-label that damages your stomach. Joyn is the first supplement formulated specifically for ALDH2. Woman-founded. USA-made.

joynthefun.com

alcohol flush supplement, ALDH2 deficiency remedy, how to stop Asian glow, Asian flush natural remedy, stop face turning red when drinking`,
  },
  {
    id: 14, platform: 'Pinterest', type: 'Lifestyle',
    hook: '25 celebration ideas for living flush-free',
    shoot: 'Aspirational lifestyle collage. Celebrations, toasts, nights out. Link directly to joynthefun.com.',
    caption: `25 celebration ideas for people who live flush-free — because you deserve to say yes to all of it 🥂

From date nights to work happy hours, weddings to holiday toasts. Joyn gives you back every celebration you used to dread.

joynthefun.com — the first supplement formulated for ALDH2 deficiency.

alcohol flush solution, celebrate without anxiety, flush-free drinking, Asian glow remedy, confidence supplement`,
  },
]

const HASHTAGS = [
  { name: 'Education & Science', desc: 'Science explainers, ALDH2 content, health education', tags: '#ALDH2 #AlcoholFlush #ALDH2Deficiency #AsianGlow #FlushReaction #HealthTok #SupplementTok #GeneticHealth #HealthEducation #ScienceExplained #AlcoholMetabolism #MedicalFacts' },
  { name: 'AAPI Community', desc: 'Community content, cultural moments, relatable posts', tags: '#AsianAmerican #AAPI #AAPITikTok #AsianAmericanHealth #AsianGlow #EastAsian #AsianAmericanCommunity #AsianTikTok #AsianAmericanProblems #ALDH2 #CulturalHealth #AAPIVoices' },
  { name: 'Lifestyle & Celebration', desc: 'Lifestyle shots, events, going out', tags: '#CelebrateFreely #ConfidenceInACapsule #FlushFree #NightOut #WeddingSeason #HappyHour #OpenBar #SocialWellness #NoMoreHiding #CelebrationReady #DateNight #GoodVibesOnly' },
  { name: 'Product & Brand', desc: 'Product shots, launch posts, announcements', tags: '#Joyn #JoynSupplement #WomanFounded #USAMade #NaturalSupplement #CleanSupplements #AlcoholFlushSupplement #ALDH2Support #ConfidenceInACapsule #FlushFree #WellnessSupplements' },
  { name: 'TikTok Reach Booster', desc: 'Add to any TikTok to maximize algorithmic reach', tags: '#HealthTok #SupplementTok #WellnessTok #LearnOnTikTok #HealthTips #TikTokMadeMeBuyIt #HealthyLiving #WellnessTips #FYP #ForYouPage #HealthTikTok #Wellness2026' },
  { name: 'Pinterest SEO', desc: 'Keyword phrases for pin descriptions (not hashtags)', tags: 'alcohol flush supplement, ALDH2 deficiency remedy, how to stop Asian glow, alcohol flush treatment, Asian flush natural remedy, supplement for alcohol flush, stop face turning red when drinking' },
]

const ADS = [
  { id: 1, platform: 'Meta', stage: 'Awareness', name: 'Problem-First', hook: "Your face turns red when you drink. There's a genetic reason — and a real solution.", headline: 'Finally. A real solution for alcohol flush.', body: '600 million people have ALDH2 deficiency — the genetic reason your face turns red when you drink. For years, the only option was Pepcid AC, an antacid used off-label that damages your stomach. Joyn is the first supplement formulated specifically for ALDH2. Woman-founded. USA-made.', cta: 'Learn More', note: 'Target: Asian-American 21–40, wellness, social dining. CPM <$10.' },
  { id: 2, platform: 'Meta', stage: 'Conversion', name: 'Social Proof + Offer', hook: 'Stop hiding at celebrations. Start showing up fully.', headline: 'Confidence in a capsule. 15% off your first order.', body: "Joyn supports ALDH2 enzyme activity so you can show up fully — at weddings, work events, first dates, wherever. Take 2 capsules 30 min before drinking. Join thousands of customers living flush-free. Use code JOYN15.", cta: 'Shop Now — Code JOYN15', note: 'Retarget: 50%+ video viewers, site visitors. CPA <$35.' },
  { id: 3, platform: 'Meta', stage: 'Retention', name: 'Subscribe & Save', hook: 'Never run out. Never miss a celebration.', headline: 'Subscribe & Save 20% — free shipping every bottle.', body: "You've found your answer. Make sure you never run out. Joyn Subscribe & Save: 20% off every order, free shipping, cancel anytime.", cta: 'Subscribe & Save', note: 'Target: past purchasers only. LTV >$120.' },
  { id: 4, platform: 'TikTok', stage: 'Awareness', name: 'UGC Science Hook', hook: 'POV: You finally have a real answer to alcohol flush', headline: '600M people have ALDH2 deficiency. Joyn was built for them.', body: 'UGC-style. Creator holds Joyn bottle, explains ALDH2 in 15s, cuts to event looking confident. Text overlay: "ALDH2 → Alcohol Flush → JOYN." End card: "Link in bio — code TIKTOK15"', cta: 'Link in Bio — Code TIKTOK15', note: 'In-Feed + Spark Ads on organic posts >3% engagement. Budget: $50–100/day.' },
]

const BRAND_COLORS = [
  { name: 'Joyn Orange', hex: '#FD5C1E', use: 'CTAs, hero, energy' },
  { name: 'Joyn Red', hex: '#D72C0D', use: 'Urgency, gradients' },
  { name: 'Navy', hex: '#003882', use: 'Trust, authority' },
  { name: 'Sky Blue', hex: '#87ADEF', use: 'Soft accent' },
  { name: 'Cream', hex: '#FFF8F4', use: 'Page backgrounds' },
  { name: 'Dark', hex: '#0D0D0D', use: 'Primary text' },
]

const TAGLINES = [
  { line: 'Confidence in a capsule.', note: 'Primary — use everywhere' },
  { line: 'Reshape the way you celebrate.', note: 'Brand mission statement' },
  { line: 'Red wine. Not red face.', note: 'TikTok hooks, short-form copy' },
  { line: 'More confident nights, brighter mornings.', note: 'Full benefit arc' },
  { line: 'Confidence you can see. Redness you cannot.', note: 'Visual contrast ads' },
  { line: 'Celebrate without limits.', note: 'Campaign tagline' },
]

/* ── page ─────────────────────────────────────────────────────── */

export default function Home() {
  const [pFilter, setPFilter] = useState<'All' | 'TikTok' | 'Instagram' | 'Pinterest'>('All')
  const [tFilter, setTFilter] = useState('All')
  const [selDay, setSelDay] = useState<number | null>(null)

  const types = ['All', ...Array.from(new Set(CAPTIONS.map(c => c.type)))]
  const caps = CAPTIONS
    .filter(c => pFilter === 'All' || c.platform === pFilter)
    .filter(c => tFilter === 'All' || c.type === tFilter)

  const selDayData = selDay ? FEB_CALENDAR.flatMap(w => w.days).find(d => d.n === selDay) : null

  return (
    <main>

      {/* ── DAILY BRIEF ─────────────────────────────────────────── */}
      <section id="today" className="section-anchor bg-[#0a0a0a] pt-24 pb-16 px-6 lg:px-16 border-b border-gray-800">
        <div className="max-w-screen-xl mx-auto">

          {/* Header */}
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4 pt-6">
            <div>
              <p className="text-[#FD5C1E] text-xs font-black uppercase tracking-[0.25em] mb-3">Daily Brief</p>
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-none">
                {TODAY.date.split(',')[0]},<br />
                <span className="text-[#FD5C1E]">{TODAY.date.split(', ')[1]}.</span>
              </h1>
            </div>
            <div className="text-right pb-1">
              <div className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Day</div>
              <div className="text-8xl font-black text-gray-800 leading-none">{TODAY.dayNum}</div>
              <div className="text-[10px] font-black text-gray-700 uppercase tracking-widest">of 30</div>
            </div>
          </div>

          {/* Today's posts */}
          <div className="space-y-4 mb-10">
            {TODAY.posts.map(p => (
              <div key={p.id} className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 lg:p-8">
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <Chip p={p.platform} />
                    <span className="text-xs font-semibold text-gray-600">{p.format}</span>
                  </div>
                  <CopyBtn text={p.caption} label="Copy Full Caption" />
                </div>
                <p className="text-2xl lg:text-3xl font-black text-white mb-5 leading-tight">&ldquo;{p.hook}&rdquo;</p>
                <div className="bg-amber-950/40 border border-amber-800/30 rounded-xl px-4 py-3 mb-6">
                  <p className="text-xs text-amber-400 font-semibold leading-relaxed">📱 What to create: {p.shoot}</p>
                </div>
                <pre className="text-sm text-gray-500 whitespace-pre-wrap font-sans leading-relaxed">{p.caption}</pre>
              </div>
            ))}
          </div>

          {/* Coming up */}
          <div>
            <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-4">Coming Up This Week</p>
            <div className="space-y-0">
              {UPCOMING.map((u, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-white/5 last:border-0">
                  <span className="text-xs font-bold text-gray-600 w-24 shrink-0 pt-0.5">{u.date}</span>
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <Chip p={u.platform} />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-300 font-semibold leading-snug">{u.hook}</p>
                      <p className="text-xs text-gray-600 mt-0.5 leading-snug">{u.format}</p>
                    </div>
                  </div>
                  <CopyBtn text={u.caption} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── FEBRUARY CALENDAR ───────────────────────────────────── */}
      <section id="calendar" className="section-anchor px-6 lg:px-16 py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Content Calendar</p>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <h2 className="text-4xl font-black text-[#0a0a0a]">February 2026.</h2>
            <div className="flex items-center gap-5">
              {Object.entries(PL).map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PS[k] }} />{v}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                <div key={d} className="py-2.5 text-center text-[10px] font-black text-gray-400 tracking-widest">{d}</div>
              ))}
            </div>
            {FEB_CALENDAR.map(wk => (
              <div key={wk.week} className="grid grid-cols-7 divide-x divide-gray-50 border-b border-gray-50 last:border-0">
                {wk.days.map(d => (
                  <button key={d.n}
                    onClick={() => setSelDay(selDay === d.n ? null : d.n)}
                    className={`text-left p-2.5 min-h-[90px] transition-colors border-0 ${
                      d.n === 18
                        ? 'bg-orange-50 hover:bg-orange-100'
                        : selDay === d.n
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-50'
                    } ${selDay === d.n ? 'outline outline-2 outline-[#FD5C1E] outline-offset-[-2px]' : ''}`}>
                    <div className={`text-xs font-black mb-1.5 flex items-center gap-1 ${d.n === 18 ? 'text-[#FD5C1E]' : 'text-gray-300'}`}>
                      {d.n}
                      {d.n === 18 && <span className="text-[9px] bg-[#FD5C1E] text-white px-1 py-0.5 rounded font-bold leading-none">TODAY</span>}
                    </div>
                    <div className="space-y-1">
                      {d.p.map((pl, i) => (
                        <div key={i} className="flex items-start gap-1">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: PS[pl] }} />
                          <span className="text-[10px] text-gray-500 leading-tight line-clamp-2">{d.hooks[i]}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>

          {selDayData && (
            <div className="mt-4 bg-white border border-[#FD5C1E]/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-black text-[#0a0a0a] text-lg">Feb {selDayData.n} — Day {selDayData.n}</h3>
                <button onClick={() => setSelDay(null)} className="text-gray-400 hover:text-gray-700 text-xl w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">×</button>
              </div>
              <div className="space-y-3">
                {selDayData.p.map((pl, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-black uppercase tracking-wide" style={{ color: PS[pl] }}>{PL[pl]}</span>
                    </div>
                    <p className="text-sm font-semibold text-[#0a0a0a]">{selDayData.hooks[i]}</p>
                    <p className="text-xs text-gray-400 mt-2">→ Find the full caption in the Caption Vault below</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CAPTION VAULT ───────────────────────────────────────── */}
      <section id="captions" className="section-anchor px-6 lg:px-16 py-20 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Caption Vault</p>
          <h2 className="text-4xl font-black text-[#0a0a0a] mb-10">14 captions, ready to post.</h2>

          {/* Platform filter */}
          <div className="flex flex-wrap gap-2 mb-3">
            {(['All', 'TikTok', 'Instagram', 'Pinterest'] as const).map(f => (
              <button key={f} onClick={() => setPFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${pFilter === f ? 'bg-[#0a0a0a] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {types.map(t => (
              <button key={t} onClick={() => setTFilter(t)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${tFilter === t ? 'bg-[#FD5C1E] text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                {t}
              </button>
            ))}
            <span className="text-xs text-gray-400 self-center ml-1">{caps.length} results</span>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {caps.map(cap => (
              <div key={cap.id} className="border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 hover:border-gray-200 transition-colors">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Chip p={cap.platform} />
                    <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2.5 py-0.5 rounded-full">{cap.type}</span>
                  </div>
                  <CopyBtn text={cap.caption} label="Copy" />
                </div>
                <p className="font-bold text-[#0a0a0a] text-[15px] leading-snug">&ldquo;{cap.hook}&rdquo;</p>
                <div className="bg-orange-50 rounded-xl px-4 py-3">
                  <p className="text-xs text-[#FD5C1E] font-semibold leading-relaxed">📱 {cap.shoot}</p>
                </div>
                <pre className="text-xs text-gray-500 whitespace-pre-wrap font-sans leading-relaxed border-t border-gray-50 pt-4 flex-1">
                  {cap.caption}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HASHTAGS ────────────────────────────────────────────── */}
      <section id="hashtags" className="section-anchor px-6 lg:px-16 py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Hashtag Sets</p>
          <h2 className="text-4xl font-black text-[#0a0a0a] mb-10">Six packs. Copy and go.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HASHTAGS.map(set => {
              const tags = set.tags.split(', ').length > 1 ? set.tags.split(', ') : set.tags.split(' ')
              return (
                <div key={set.name} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-black text-[#0a0a0a] leading-tight">{set.name}</h3>
                    <CopyBtn text={set.tags} label="Copy All" />
                  </div>
                  <p className="text-xs text-gray-400 mb-4">{set.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.slice(0, 6).map((t, i) => (
                      <span key={i} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full font-mono">{t.trim()}</span>
                    ))}
                    {tags.length > 6 && <span className="text-xs text-gray-400 self-center">+{tags.length - 6}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── ADS ─────────────────────────────────────────────────── */}
      <section id="ads" className="section-anchor px-6 lg:px-16 py-20 bg-[#0a0a0a] border-b border-gray-800">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-[0.2em] mb-3">Ad Copy</p>
          <h2 className="text-4xl font-black text-white mb-4">Four complete ad sets.</h2>
          <p className="text-gray-500 text-lg mb-12">Copy-ready for Meta Ads Manager and TikTok Ads. Each field individually copyable.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {ADS.map(ad => (
              <div key={ad.id} className="bg-white/5 border border-white/10 rounded-2xl p-7">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{ad.platform}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white/70">{ad.stage}</span>
                </div>
                <h3 className="text-lg font-black text-white mb-5">{ad.name}</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Hook', text: ad.hook },
                    { label: 'Headline', text: ad.headline },
                    { label: 'Body', text: ad.body },
                    { label: 'CTA', text: ad.cta },
                  ].map(f => (
                    <div key={f.label} className="border border-white/[0.07] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{f.label}</span>
                        <CopyBtn text={f.text} />
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{f.text}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-gray-600 italic">{ad.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND ───────────────────────────────────────────────── */}
      <section id="brand" className="section-anchor px-6 lg:px-16 py-20">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Brand Kit</p>
          <h2 className="text-4xl font-black text-[#0a0a0a] mb-14">How Joyn looks. How Joyn sounds.</h2>
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Colors */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5">Colors — click to copy hex</h3>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {BRAND_COLORS.map(c => (
                  <div key={c.hex} className="group cursor-pointer" onClick={() => navigator.clipboard.writeText(c.hex)}>
                    <div className="h-14 rounded-xl mb-1.5 relative overflow-hidden" style={{ backgroundColor: c.hex }}>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-gray-400">{c.hex}</div>
                    <div className="text-[11px] text-gray-500">{c.name}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-8 rounded-lg bg-gradient-to-r from-[#FD5C1E] to-[#D72C0D]" />
                <div className="h-8 rounded-lg bg-gradient-to-r from-[#003882] to-[#0052CC]" />
              </div>
              <div className="mt-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Typography — Inter</h3>
                <div className="space-y-3">
                  <div className="py-2 border-t border-gray-100"><div className="text-[10px] text-gray-400 mb-1">Hero — 900 Black</div><p className="text-3xl font-black text-[#0a0a0a] leading-none">Confidence.</p></div>
                  <div className="py-2 border-t border-gray-100"><div className="text-[10px] text-gray-400 mb-1">Heading — 800 ExtraBold</div><p className="text-xl font-extrabold text-[#0a0a0a]">Reshape the way you celebrate.</p></div>
                  <div className="py-2 border-t border-gray-100"><div className="text-[10px] text-gray-400 mb-1">Body — 400 Regular</div><p className="text-sm text-gray-600">Formulated for the 600M with ALDH2 deficiency.</p></div>
                  <div className="py-2 border-t border-gray-100"><div className="text-[10px] text-gray-400 mb-1">Label — 600 Uppercase</div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Confidence · USA Made · Flush-Free</p></div>
                </div>
              </div>
            </div>

            {/* Voice */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5">Voice — DO / DON&apos;T</h3>
              <div className="space-y-3">
                {[
                  ['Confidence in a capsule.', 'We think this might help with redness...'],
                  ['Red wine. Not red face.', 'Please buy our supplement for flush.'],
                  ['You deserve to show up fully.', 'Fix your embarrassing flush reaction.'],
                  ['Formulated for ALDH2 enzyme activity.', "It just works, trust us."],
                ].map(([d, dn], i) => (
                  <div key={i} className="grid grid-cols-2 gap-1.5">
                    <div className="bg-green-50 rounded-xl p-3"><div className="text-[10px] font-bold text-green-600 mb-1">DO</div><p className="text-xs font-semibold text-[#0a0a0a] leading-snug">&ldquo;{d}&rdquo;</p></div>
                    <div className="bg-red-50 rounded-xl p-3"><div className="text-[10px] font-bold text-red-400 mb-1">DON&apos;T</div><p className="text-xs text-gray-400 line-through leading-snug">&ldquo;{dn}&rdquo;</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-[#003882] rounded-2xl p-5 text-white">
                <div className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-2">Positioning</div>
                <p className="text-sm font-semibold leading-relaxed">For young adults (21–40) with ALDH2 deficiency. Joyn is the only proactive, flush-first supplement — woman-founded, USA-made, built for the 600M who&apos;ve been ignored.</p>
              </div>
            </div>

            {/* Taglines */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5">Tagline Bank</h3>
              <div className="space-y-0">
                {TAGLINES.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 py-4 border-b border-gray-100 last:border-0">
                    <span className="text-xs font-black text-gray-200 w-4 shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#0a0a0a] text-sm">{t.line}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{t.note}</p>
                    </div>
                    {i === 0 && <span className="text-[10px] bg-[#FD5C1E] text-white px-1.5 py-0.5 rounded-full font-bold shrink-0">PRIMARY</span>}
                    <CopyBtn text={t.line} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-16 py-10 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-white font-black">JOYN · 2026 Social Playbook</div>
            <div className="text-gray-600 text-xs mt-1">All copy ready to use · Updated February 2026</div>
          </div>
          <a href="https://www.joynthefun.com" target="_blank" rel="noopener noreferrer" className="text-[#FD5C1E] text-sm font-bold hover:underline">joynthefun.com ↗</a>
        </div>
      </footer>

    </main>
  )
}
