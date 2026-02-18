'use client'
import { useState } from 'react'

/* ── Helpers ──────────────────────────────────────────────────── */

function CopyBtn({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setOk(true)
    setTimeout(() => setOk(false), 2000)
  }
  return (
    <button onClick={copy}
      className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
        ok
          ? 'bg-green-50 text-green-600 border-green-200'
          : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-700'
      }`}>
      {ok ? '✓ Copied' : label}
    </button>
  )
}

const P_COLOR: Record<string, string> = { TikTok: '#FD5C1E', Instagram: '#D72C0D', Pinterest: '#003882' }
const P_SHORT: Record<string, string> = { TK: '#FD5C1E', IG: '#D72C0D', PT: '#003882' }
const P_LABEL: Record<string, string> = { TK: 'TikTok', IG: 'Instagram', PT: 'Pinterest' }

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: color }}>
      {label}
    </span>
  )
}

/* ── Data ─────────────────────────────────────────────────────── */

const THIS_WEEK = [
  {
    day: 18,
    platform: 'Instagram',
    type: 'Story Poll',
    hook: 'What celebration are you most excited for?',
    note: 'Story poll: "A wedding" / "Graduation" / "Date night" / "Just a Friday"',
    caption: `What celebration are you most excited for this year? 🎉

Drop it in the comments or vote in our poll 👆

Whether it's a wedding, a birthday, a work win, or just a Friday night that feels like something — you deserve to be fully present for it.

Joyn is here for all of it. 🧡

#Joyn #Celebrate #ALDH2 #ConfidenceInACapsule #CelebrateFreely`,
  },
  {
    day: 19,
    platform: 'TikTok',
    type: 'Video',
    hook: '7 days, 7 celebrations, 0 flush — honest diary',
    note: 'Selfie-diary format. Natural lighting. No hard sell. Authentic energy wins here.',
    caption: `7 days with Joyn — I'm going to be honest 📔

Day 1: Took 2 capsules 30 min before drinks. Less flushing than normal. Cautiously optimistic.

Day 2: Work happy hour. Stayed the whole time. Ordered a second drink.

Day 4: Date night wine with dinner. Checked my face halfway through — normal color.

Day 5: My coworker asked why I seemed more relaxed lately.

Day 7: I cried a little honestly. 15 years of hiding. 7 days.

Not an ad. Just someone who needed this to exist.

#Joyn #AlcoholFlush #ALDH2 #HealthTok #HonestReview #7DayChallenge #ConfidenceInACapsule`,
  },
  {
    day: 20,
    platform: 'Instagram',
    type: 'Feed Post',
    hook: 'Made in the USA. By women. For everyone.',
    note: 'Founder-facing. Personal editorial photo of Brynn or team. No product shots.',
    caption: `We didn't build Joyn to get rich. We built it because we were tired of hiding. 🍷

Tired of showing up to celebrations and quietly managing our faces instead of being present.

Tired of the Reddit threads saying "just take Pepcid" — an antacid used off-label that causes real stomach damage.

Tired of a market full of "hangover cures" that weren't built for us at all.

600 million people deserve a real answer. So we built one.

Woman-founded. USA-made. Formulated for your biology, not against it.

Joyn. Confidence in a capsule. 🧡

#Joyn #WomanFounded #ALDH2 #AlcoholFlush #ConfidenceInACapsule #USAMade`,
  },
]

type Caption = {
  id: number
  platform: 'TikTok' | 'Instagram' | 'Pinterest'
  pillar: string
  hook: string
  caption: string
  note?: string
}

const CAPTIONS: Caption[] = [
  {
    id: 1,
    platform: 'TikTok',
    pillar: 'Education',
    hook: 'Why your face turns red when you drink — the genetic truth nobody told you',
    note: 'Green screen with ALDH2 diagram performs well here. High save rate expected.',
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
    id: 2,
    platform: 'TikTok',
    pillar: 'Entertainment',
    hook: 'Things people with Asian flush relate to (a thread) 😭',
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

Joyn — the first supplement formulated for ALDH2 deficiency.

Comment your most relatable one 👇 I read every comment

#AsianGlow #ALDH2 #AlcoholFlush #AsianAmericanProblems #Joyn #FlushReaction`,
  },
  {
    id: 3,
    platform: 'TikTok',
    pillar: 'Education',
    hook: 'Pepcid for alcohol flush? Your doctor probably doesn\'t know this 😳',
    note: 'High share rate. This one regularly goes viral in the flush community.',
    caption: `Pepcid for alcohol flush? Your doctor probably doesn't know this 😳

Millions of people use H2 blockers (Pepcid, Zantac) off-label to reduce flush.

Here's the problem:
→ They block histamine — masking the red face symptom
→ They DON'T help your body break down acetaldehyde
→ Long-term: stomach ulcers, reduced stomach acid, dependency
→ Never tested or approved for this purpose

And yet it's the #1 advice on Reddit, TikTok, everywhere.

Joyn works differently. Supports ALDH2 enzyme activity — so your body actually processes the acetaldehyde instead of hiding it.

If this helped, share it. Link in bio 🙏

#AlcoholFlush #Pepcid #ALDH2 #AsianGlow #HealthTok #DrinkingTips #Joyn`,
  },
  {
    id: 4,
    platform: 'TikTok',
    pillar: 'Social Proof',
    hook: '7 days with Joyn — honest diary',
    note: 'Selfie-diary format. Authentic lighting. No hard sell.',
    caption: `7 days with Joyn — I'm going to be honest 📔

Day 1: Took 2 capsules 30 min before drinks. Slight flushing, less than normal. Cautiously optimistic.

Day 2: Work happy hour. Stayed the whole time. Ordered a second drink. My coworker asked why I seemed more relaxed.

Day 4: Date night. Ordered wine without the usual anxiety.

Day 5: Checked my face mid-meal. Normal color. Actually stayed at dinner instead of running to the bathroom.

Day 7: I cried a little honestly. 15 years of hiding. 7 days.

Not an ad. Just someone who needed this to exist.

#Joyn #AlcoholFlush #ALDH2 #HealthTok #HonestReview #7DayChallenge #ConfidenceInACapsule`,
  },
  {
    id: 5,
    platform: 'TikTok',
    pillar: 'Founder',
    hook: 'I spent a decade building Joyn because I was tired of hiding',
    caption: `I spent a decade building Joyn because I was tired of hiding 🍷

Every networking event: sparkling water, hoping nobody noticed.
Every wedding toast: a sip and then back to water.
Every first date: counting drinks, watching my face.

Then I learned it was genetic. ALDH2 deficiency. Not just me — 600 million people.

I became obsessed with a real solution. Not Pepcid. Not gimmicks. A supplement actually formulated for this.

Years of development. USA-made. Third-party tested. Woman-founded.

This is Joyn. For every person who's ever hidden. 💛

Link in bio.

#Joyn #WomanFounded #ALDH2 #AlcoholFlush #Founder #SmallBusiness #ConfidenceInACapsule`,
  },
  {
    id: 6,
    platform: 'TikTok',
    pillar: 'Entertainment',
    hook: 'Rating every alcohol flush "cure" from worst to best (HONEST)',
    caption: `Rating every alcohol flush "cure" from worst to best — be honest, you've tried most of these 😅

❌ 5/10 — Cold water on face. Reduces redness for 2 minutes.
❌ 4/10 — Eating a huge meal first. Slows absorption, doesn't fix flush.
❌ 3/10 — Antihistamines. Makes you drowsy, doesn't address acetaldehyde.
⚠️ 2/10 — Pepcid off-label. Masks symptom, real stomach risks.
❌ 1/10 — Just stop drinking. OK sure, thanks.
✅ 9/10 — Joyn. Actually formulated for ALDH2 enzyme activity. First of its kind.

Minus 1 because nothing is perfect and I'm honest.

Link in bio.

#AlcoholFlush #AsianGlow #ALDH2 #FlushRemedies #HealthHacks #Joyn #HealthTok`,
  },
  {
    id: 7,
    platform: 'TikTok',
    pillar: 'Lifestyle',
    hook: 'First date energy when you\'re not hiding your face 💛',
    caption: `First date energy when you're not hiding your face 💛

You know the feeling — ordering a drink and immediately watching your face betray you.

The mental math: "One glass and I'm probably red"
"Do I warn them? Do I just order water?"
"Is it worse to not drink or to turn red?"

With Joyn, I stayed present. I laughed. I actually tasted the wine.

Confidence you can see. Redness you cannot.

#Joyn #ALDH2 #AlcoholFlush #FirstDate #ConfidenceInACapsule #DateNight`,
  },
  {
    id: 8,
    platform: 'TikTok',
    pillar: 'Lifestyle',
    hook: 'Open bar at a wedding with zero anxiety 💒',
    caption: `Open bar at a wedding with zero anxiety 💒

You know the wedding mental math:
→ Getting seated next to people you just met
→ Champagne toast coming
→ Choosing between looking rude (not drinking) or turning red (drinking)

This weekend: took Joyn before the ceremony. Open bar, 4+ hours, multiple toasts, dancing.

Zero flush. Zero hiding. Zero mental math about "how much is too much."

I was just there. Fully. At my friend's wedding. Not managing my face.

That's it. That's the post.

#Joyn #WeddingSeason #OpenBar #ALDH2 #AlcoholFlush #ConfidenceInACapsule`,
  },
  {
    id: 9,
    platform: 'Instagram',
    pillar: 'Education',
    hook: 'Save this. Share it with someone who needs it. 📌',
    note: 'Pair with a 6-slide educational infographic carousel.',
    caption: `Save this. Share it with someone who needs it. 📌

ALDH2 deficiency affects 600 million people — yet most people have never heard of it.

1 in 3 East Asians carry the gene.
Millions more across all backgrounds experience the flush.

For years, the "solution" was Pepcid AC — an antacid, off-label, that damages your stomach over time.

Joyn is the first supplement formulated specifically for ALDH2 deficiency.
Not a mask. A real answer for real biology.

Woman-founded. USA-made. Third-party tested.

→ Link in bio to learn more 🧡

#ALDH2 #AlcoholFlush #AsianGlow #Joyn #HealthEducation #WomanFounded #ConfidenceInACapsule #AAPI`,
  },
  {
    id: 10,
    platform: 'Instagram',
    pillar: 'Social Proof',
    hook: '"I stayed until midnight for the first time." — Sarah, 32',
    caption: `"I stayed until midnight for the first time." — Sarah, 32 🥂

Sarah had been using Pepcid off-label for 8 years. Stomach issues. Always left parties early. Skipped drinks at events where she wanted to stay present.

Two weeks into Joyn, she attended her company holiday party.

She danced. She made every toast. She was the last of her group to leave.

That's why we built this. Not to sell supplements — to give people back their celebrations.

Real review. Real customer. We don't edit these.

→ Link in bio. Use code SARAH15 for 15% off your first order.

#Joyn #CustomerStory #ALDH2 #AlcoholFlush #ConfidenceInACapsule #Testimonial`,
  },
  {
    id: 11,
    platform: 'Instagram',
    pillar: 'Founder',
    hook: 'We didn\'t build Joyn to get rich. We built it because we were tired of hiding.',
    note: 'Personal editorial photo of founder or team. No product shots for this one.',
    caption: `We didn't build Joyn to get rich. We built it because we were tired of hiding. 🍷

Tired of showing up to celebrations and quietly managing our faces instead of being present.

Tired of the Reddit threads saying "just take Pepcid" — an antacid used off-label that causes real stomach damage.

Tired of a market full of "hangover cures" that weren't built for us at all.

600 million people deserve a real answer. So we built one.

Woman-founded. USA-made. Formulated for your biology, not against it.

Joyn. Confidence in a capsule. 🧡

#Joyn #WomanFounded #ALDH2 #AlcoholFlush #ConfidenceInACapsule #USAMade #BuildingWithPurpose`,
  },
  {
    id: 12,
    platform: 'Instagram',
    pillar: 'Lifestyle',
    hook: 'Lunar New Year without the flush — first time ever 🧧',
    caption: `Lunar New Year without the flush — first time in my life 🧧

Eight courses. Multiple toasts with the elders. Baijiu and beer and champagne.

Normally I'd be red by soup.
Normally I'd switch to tea early.
Normally I'd hope nobody noticed.

This year: Joyn. 2 capsules before dinner.

I stayed present the whole meal. I made every toast. I laughed without watching my face.

My grandma asked why I seemed so happy. That's the whole point. 🥂

→ Link in bio. Use code LNY25 for 25% off.

#LunarNewYear #ChineseNewYear #AAPI #ALDH2 #AsianGlow #AlcoholFlush #Joyn #CelebrateFreely`,
  },
  {
    id: 13,
    platform: 'Pinterest',
    pillar: 'Education',
    hook: 'What is ALDH2 deficiency? Complete guide to alcohol flush',
    note: 'Pin to "ALDH2 & Alcohol Flush" board. Use a clean infographic image.',
    caption: `What is ALDH2 deficiency? Your complete guide to understanding alcohol flush and finding real solutions.

ALDH2 deficiency affects 600 million people worldwide — yet most people have never heard of it. This genetic variant causes alcohol flush (often called "Asian glow") and affects 1 in 3 East Asians. Learn what it is, why common remedies like Pepcid are risky, and what actually works.

Save this pin. Visit joynthefun.com to learn about Joyn — the first supplement formulated for ALDH2 deficiency.

alcohol flush supplement, ALDH2 deficiency remedy, how to stop Asian glow, Asian flush natural remedy`,
  },
  {
    id: 14,
    platform: 'Pinterest',
    pillar: 'Lifestyle',
    hook: '25 celebration ideas for people who live flush-free',
    note: 'Pin to "Celebrate Freely" board. Links directly to joynthefun.com.',
    caption: `25 celebration ideas for people who live flush-free — because you deserve to say yes to all of it 🥂

From date nights to work happy hours, weddings to holiday toasts — Joyn gives you back every celebration you used to dread.

Save this board for inspiration. Shop Joyn at joynthefun.com — the first supplement formulated for ALDH2 deficiency.

alcohol flush solution, celebrate without anxiety, flush-free drinking, Asian glow remedy, confidence supplement`,
  },
]

const HASHTAG_SETS = [
  {
    name: 'Education & Science',
    desc: 'For science explainers, ALDH2 content, health education posts',
    tags: '#ALDH2 #AlcoholFlush #ALDH2Deficiency #AsianGlow #FlushReaction #HealthTok #SupplementTok #GeneticHealth #HealthEducation #ScienceExplained #AlcoholMetabolism #MedicalFacts',
  },
  {
    name: 'AAPI Community',
    desc: 'For community-focused content, cultural moments, relatable posts',
    tags: '#AsianAmerican #AAPI #AAPITikTok #AsianAmericanHealth #AsianGlow #EastAsian #AsianAmericanCommunity #AsianTikTok #AsianAmericanProblems #ALDH2 #CulturalHealth #AAPIVoices',
  },
  {
    name: 'Lifestyle & Celebration',
    desc: 'For lifestyle shots, event content, celebration moments',
    tags: '#CelebrateFreely #ConfidenceInACapsule #FlushFree #NightOut #WeddingSeason #HappyHour #OpenBar #SocialWellness #NoMoreHiding #CelebrationReady #DateNight #GoodVibesOnly',
  },
  {
    name: 'Product & Brand',
    desc: 'For product shots, launch posts, brand announcements',
    tags: '#Joyn #JoynSupplement #WomanFounded #USAMade #NaturalSupplement #CleanSupplements #AlcoholFlushSupplement #ALDH2Support #ConfidenceInACapsule #FlushFree #WellnessSupplements',
  },
  {
    name: 'TikTok Reach Booster',
    desc: 'Add to any TikTok post to maximize algorithmic reach',
    tags: '#HealthTok #SupplementTok #WellnessTok #LearnOnTikTok #HealthTips #TikTokMadeMeBuyIt #HealthyLiving #WellnessTips #FYP #ForYouPage #HealthTikTok #Wellness2026',
  },
  {
    name: 'Pinterest SEO',
    desc: 'Paste into pin descriptions — these are keyword phrases, not hashtags',
    tags: 'alcohol flush supplement, ALDH2 deficiency remedy, how to stop Asian glow, alcohol flush treatment, Asian flush natural remedy, supplement for alcohol flush, stop face turning red when drinking',
  },
]

const AD_SETS = [
  {
    id: 1,
    platform: 'Meta',
    stage: 'Awareness',
    name: 'Problem-First Education',
    hook: 'Your face turns red when you drink. There\'s a genetic reason — and a real solution.',
    headline: 'Finally. A real solution for alcohol flush.',
    body: '600 million people have ALDH2 deficiency — the genetic reason your face turns red when you drink. For years, the only option was Pepcid AC, an antacid used off-label that damages your stomach. Joyn is the first supplement formulated specifically for ALDH2. Woman-founded. USA-made.',
    cta: 'Learn More',
    note: 'Target: Asian-American 21–40, wellness, social dining. CPM goal <$10.',
  },
  {
    id: 2,
    platform: 'Meta',
    stage: 'Conversion',
    name: 'Social Proof + Offer',
    hook: 'Stop hiding at celebrations. Start showing up fully.',
    headline: 'Confidence in a capsule. 15% off your first order.',
    body: 'Joyn supports ALDH2 enzyme activity so you can show up fully — at weddings, work events, first dates, wherever. Take 2 capsules 30 min before drinking. Join 10,000+ customers living flush-free. Use code JOYN15.',
    cta: 'Shop Now — Code JOYN15',
    note: 'Retarget: 50%+ video viewers, site visitors, cart abandoners. CPA goal <$35.',
  },
  {
    id: 3,
    platform: 'Meta',
    stage: 'Retention',
    name: 'Subscribe & Save',
    hook: 'Never run out. Never miss a celebration.',
    headline: 'Subscribe & Save 20% — free shipping every bottle.',
    body: 'You\'ve found your answer. Make sure you never run out. Joyn Subscribe & Save: 20% off every order, free shipping, cancel anytime. Confidence in a capsule, every month.',
    cta: 'Subscribe & Save',
    note: 'Target: past purchasers only. LTV goal >$120.',
  },
  {
    id: 4,
    platform: 'TikTok',
    stage: 'Awareness',
    name: 'UGC Science Hook',
    hook: 'POV: You finally have a real answer to alcohol flush',
    headline: '600M people have ALDH2 deficiency. Joyn was built for them.',
    body: 'UGC-style creator holds Joyn bottle, explains ALDH2 in 15 seconds, cuts to event scene looking confident. No hard sell. Text overlay: "ALDH2 Deficiency → Alcohol Flush → JOYN". End: "Link in bio — use code TIKTOK15"',
    cta: 'Link in Bio — TIKTOK15',
    note: 'In-Feed + Spark Ads on organic posts with >3% engagement. Daily budget: $50–100/day.',
  },
]

const CALENDAR = [
  {
    week: 'Week 1', theme: 'Launch + Science',
    days: [
      { day: 1, posts: [{ p: 'IG', hook: 'We\'re live.' }, { p: 'TK', hook: 'POV: You found out why your face turns red' }] },
      { day: 2, posts: [{ p: 'IG', hook: 'Do you get the flush? [poll]' }, { p: 'TK', hook: '600M people have this. Nobody talks about it.' }] },
      { day: 3, posts: [{ p: 'IG', hook: '5 things your doctor never told you [carousel]' }, { p: 'PT', hook: 'What is ALDH2 deficiency? [infographic]' }] },
      { day: 4, posts: [{ p: 'TK', hook: 'Things people with Asian flush relate to 😭' }, { p: 'IG', hook: 'The antacid hack that\'s actually hurting you' }] },
      { day: 5, posts: [{ p: 'IG', hook: 'Meet our first 100 customers' }, { p: 'TK', hook: 'I tried Joyn at my work happy hour' }] },
      { day: 6, posts: [{ p: 'IG', hook: 'Weekend plans incoming. Grab Joyn.' }, { p: 'TK', hook: 'Red wine. Not red face. 🍷' }] },
      { day: 7, posts: [{ p: 'IG', hook: 'Q&A: Ask us anything 👇' }] },
    ],
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
    ],
  },
  {
    week: 'Week 3', theme: 'Community + Founder',
    days: [
      { day: 15, posts: [{ p: 'TK', hook: 'Doctor reacts: Is Joyn actually safe?' }] },
      { day: 16, posts: [{ p: 'IG', hook: 'ALDH2: Why 1 in 3 East Asians carry it [carousel]' }] },
      { day: 17, posts: [{ p: 'TK', hook: 'I built Joyn because I was tired of hiding.' }] },
      { day: 18, posts: [{ p: 'IG', hook: 'What celebration are you most excited for? [story]' }] },
      { day: 19, posts: [{ p: 'TK', hook: '7 days, 7 celebrations, 0 flush — diary' }] },
      { day: 20, posts: [{ p: 'IG', hook: 'Made in the USA. By women. For everyone.' }] },
      { day: 21, posts: [{ p: 'TK', hook: 'Spring break. No flush edition. 🌴' }, { p: 'PT', hook: 'Spring celebrations, zero flush guide' }] },
    ],
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
    ],
  },
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
  { line: 'More confident nights, brighter mornings.', note: 'Full benefit arc' },
  { line: 'Red wine. Not red face.', note: 'TikTok hooks, short-form copy' },
  { line: 'Confidence you can see. Redness you cannot.', note: 'Visual contrast ads' },
  { line: 'Celebrate without limits.', note: 'Campaign tagline' },
]

/* ── Page ─────────────────────────────────────────────────────── */

export default function Home() {
  const [filter, setFilter] = useState<'All' | 'TikTok' | 'Instagram' | 'Pinterest'>('All')
  const [open, setOpen] = useState<number | null>(null)

  const visible = filter === 'All' ? CAPTIONS : CAPTIONS.filter(c => c.platform === filter)

  return (
    <main>

      {/* COVER */}
      <section className="min-h-[80vh] flex flex-col justify-between px-6 lg:px-16 pt-28 pb-16 border-b border-gray-100">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-10">
            Joyn · Social Media Playbook · 2026
          </p>
          <h1 className="text-[clamp(48px,9vw,120px)] font-black leading-[0.9] tracking-tight text-[#0a0a0a] max-w-4xl">
            Reshape<br />
            the way<br />
            you <span className="text-[#FD5C1E]">celebrate.</span>
          </h1>
          <p className="mt-8 text-gray-500 text-lg max-w-xl leading-relaxed">
            A complete content operating system — ready-to-copy captions, hashtag packs, ad copy, and a 30-day calendar. Built for the team. Built for the 600M.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-10 border-t border-gray-100">
          {[
            ['14', 'Ready-to-post captions'],
            ['6', 'Hashtag packs'],
            ['4', 'Complete ad sets'],
            ['30', 'Days fully scheduled'],
          ].map(([n, l]) => (
            <div key={n}>
              <div className="text-3xl lg:text-4xl font-black text-[#0a0a0a]">{n}</div>
              <div className="text-sm text-gray-400 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* THIS WEEK */}
      <section id="today" className="section-anchor px-6 lg:px-16 py-20 bg-[#FFF8F4] border-b border-orange-100">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-xs font-bold text-[#FD5C1E] uppercase tracking-[0.2em] mb-2">This Week</p>
              <h2 className="text-4xl font-black text-[#0a0a0a]">What to post today.</h2>
            </div>
            <span className="text-xs font-bold bg-[#FD5C1E] text-white px-3 py-1.5 rounded-full self-start mt-1">
              Days 18–20 · Feb 18–20
            </span>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {THIS_WEEK.map((post) => (
              <div key={post.day} className="bg-white rounded-2xl border border-orange-100 p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Day {post.day} · {post.type}</span>
                  <Badge label={post.platform} color={P_COLOR[post.platform]} />
                </div>
                <p className="font-bold text-[#0a0a0a] text-[15px] leading-snug flex-1">&ldquo;{post.hook}&rdquo;</p>
                {post.note && (
                  <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 italic">
                    💡 {post.note}
                  </p>
                )}
                <div className="pt-4 border-t border-gray-100">
                  <CopyBtn text={post.caption} label="Copy Full Caption" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPTION BANK */}
      <section id="captions" className="section-anchor px-6 lg:px-16 py-20 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Caption Bank</p>
          <h2 className="text-4xl font-black text-[#0a0a0a] mb-10">Ready-to-post captions.</h2>

          {/* Filter */}
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            {(['All', 'TikTok', 'Instagram', 'Pinterest'] as const).map(f => (
              <button key={f} onClick={() => { setFilter(f); setOpen(null) }}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === f
                    ? 'bg-[#0a0a0a] text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}>
                {f}
              </button>
            ))}
            <span className="text-xs text-gray-400 ml-1">{visible.length} captions</span>
          </div>

          <div className="space-y-2">
            {visible.map((cap) => (
              <div key={cap.id} className="border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 transition-colors">
                {/* Row */}
                <div
                  className="px-5 py-4 flex items-center gap-3 cursor-pointer select-none"
                  onClick={() => setOpen(open === cap.id ? null : cap.id)}>
                  <Badge label={cap.platform} color={P_COLOR[cap.platform]} />
                  <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2.5 py-0.5 rounded-full shrink-0">{cap.pillar}</span>
                  <p className="flex-1 font-semibold text-[#0a0a0a] text-sm leading-snug line-clamp-1">{cap.hook}</p>
                  <span className="text-gray-300 text-xl leading-none shrink-0">{open === cap.id ? '−' : '+'}</span>
                </div>

                {/* Expanded */}
                {open === cap.id && (
                  <div className="border-t border-gray-100 bg-gray-50 px-5 py-5">
                    {cap.note && (
                      <p className="text-xs text-[#FD5C1E] font-semibold mb-4 italic">💡 {cap.note}</p>
                    )}
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed mb-5">
                      {cap.caption}
                    </pre>
                    <div className="flex justify-end">
                      <CopyBtn text={cap.caption} label="Copy Caption + Hashtags" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HASHTAG SETS */}
      <section id="hashtags" className="section-anchor px-6 lg:px-16 py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Hashtag Sets</p>
          <h2 className="text-4xl font-black text-[#0a0a0a] mb-10">Six packs. Copy and go.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HASHTAG_SETS.map((set) => {
              const tagList = set.tags.split(' ')
              return (
                <div key={set.name} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-black text-[#0a0a0a] leading-tight">{set.name}</h3>
                    <CopyBtn text={set.tags} label="Copy All" />
                  </div>
                  <p className="text-xs text-gray-400 mb-4">{set.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tagList.slice(0, 7).map((tag, i) => (
                      <span key={i} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full font-mono">
                        {tag}
                      </span>
                    ))}
                    {tagList.length > 7 && (
                      <span className="text-xs text-gray-400 px-1 py-0.5">+{tagList.length - 7} more</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 30-DAY CALENDAR */}
      <section id="calendar" className="section-anchor px-6 lg:px-16 py-20 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">30-Day Calendar</p>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <h2 className="text-4xl font-black text-[#0a0a0a]">What to post, every day.</h2>
            <div className="flex items-center gap-5">
              {Object.entries(P_LABEL).map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: P_SHORT[k] }}></span>
                  {v}
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[700px] space-y-0">
              {CALENDAR.map((wk) => (
                <div key={wk.week}>
                  <div className="flex items-center gap-4 py-3 border-b border-gray-200">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 w-20 shrink-0">{wk.week}</span>
                    <span className="text-sm font-bold text-[#0a0a0a]">{wk.theme}</span>
                  </div>
                  <div className="grid grid-cols-7 divide-x divide-gray-100">
                    {wk.days.map((d) => (
                      <div key={d.day} className="p-3 min-h-[90px] border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className="text-[11px] font-black text-gray-300 mb-1.5">Day {d.day}</div>
                        <div className="space-y-1.5">
                          {d.posts.map((post, pi) => (
                            <div key={pi}>
                              <div className="text-[10px] font-bold mb-0.5" style={{ color: P_SHORT[post.p] }}>{P_LABEL[post.p]}</div>
                              <div className="text-[11px] text-gray-600 leading-tight">{post.hook}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {wk.days.length % 7 !== 0 && Array.from({ length: 7 - (wk.days.length % 7) }).map((_, i) => (
                      <div key={`pad-${i}`} className="p-3 min-h-[90px] border-b border-gray-100 bg-gray-50/40" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AD COPY */}
      <section id="ads" className="section-anchor px-6 lg:px-16 py-20 bg-[#0a0a0a] border-b border-gray-800">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-[0.2em] mb-3">Ad Copy</p>
          <h2 className="text-4xl font-black text-white mb-4">Four complete ad sets.</h2>
          <p className="text-gray-500 text-lg mb-12">Copy-ready for Meta Ads Manager and TikTok Ads. Brief your designer on the creative direction.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {AD_SETS.map((ad) => (
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
                  ].map((f) => (
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

      {/* BRAND */}
      <section id="brand" className="section-anchor px-6 lg:px-16 py-20">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Brand</p>
          <h2 className="text-4xl font-black text-[#0a0a0a] mb-14">How Joyn looks. How Joyn sounds.</h2>
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Left: Colors + Type */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5">Color Palette — click to copy hex</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {BRAND_COLORS.map(c => (
                  <div key={c.hex} className="group cursor-pointer"
                    onClick={() => navigator.clipboard.writeText(c.hex)}>
                    <div className="h-16 rounded-xl mb-2 relative overflow-hidden" style={{ backgroundColor: c.hex }}>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                        <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
                      </div>
                    </div>
                    <div className="font-bold text-sm text-[#0a0a0a]">{c.name}</div>
                    <div className="text-xs font-mono text-gray-400">{c.hex}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{c.use}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-10 rounded-lg bg-gradient-to-r from-[#FD5C1E] to-[#D72C0D]" />
                <div className="h-10 rounded-lg bg-gradient-to-r from-[#003882] to-[#0052CC]" />
                <div className="h-10 rounded-lg bg-gradient-to-br from-[#FD5C1E] to-[#003882]" />
              </div>

              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5 mt-12">Typography — Inter</h3>
              <div className="space-y-3">
                {[
                  { label: 'Hero — 900 Black', cls: 'text-4xl font-black text-[#0a0a0a] leading-none', text: 'Confidence.' },
                  { label: 'Heading — 800 ExtraBold', cls: 'text-2xl font-extrabold text-[#0a0a0a]', text: 'Reshape the way you celebrate.' },
                  { label: 'Body — 400 Regular', cls: 'text-base text-gray-600', text: 'Formulated for the 600M with ALDH2 deficiency.' },
                  { label: 'Label — 600 SemiBold Uppercase', cls: 'text-xs font-semibold uppercase tracking-[0.2em] text-gray-500', text: 'CONFIDENCE · USA MADE · FLUSH-FREE' },
                ].map(s => (
                  <div key={s.label} className="py-3 border-t border-gray-100">
                    <div className="text-xs text-gray-400 mb-1">{s.label}</div>
                    <p className={s.cls}>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Voice + Taglines */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5">Voice — DO / DON&apos;T</h3>
              <div className="space-y-3 mb-12">
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

              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5">Tagline Bank</h3>
              <div className="space-y-0">
                {TAGLINES.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 py-3.5 border-b border-gray-100 last:border-0">
                    <span className="text-xs font-black text-gray-200 w-5 shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#0a0a0a] truncate">{t.line}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{t.note}</p>
                    </div>
                    {i === 0 && <span className="text-xs bg-[#FD5C1E] text-white px-2 py-0.5 rounded-full font-bold shrink-0">PRIMARY</span>}
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
            <div className="text-white font-black">JOYN · 2026 Social Strategy</div>
            <div className="text-gray-600 text-xs mt-1">Prepared February 2026 · All copy ready to use</div>
          </div>
          <a href="https://www.joynthefun.com" target="_blank" rel="noopener noreferrer"
            className="text-[#FD5C1E] text-sm font-bold hover:underline">
            joynthefun.com ↗
          </a>
        </div>
      </footer>

    </main>
  )
}
