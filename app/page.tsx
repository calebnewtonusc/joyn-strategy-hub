'use client'
import { useState, useEffect } from 'react'

// ── date ──────────────────────────────────────────────────────────────────────
const _now   = new Date()
const _m     = _now.getMonth()   // 1 = Feb
const _y     = _now.getFullYear()
const _d     = _now.getDate()
const IN_FEB = _m === 1 && _y === 2026
const TODAY  = IN_FEB ? _d : 0
const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const TODAY_STR = IN_FEB
  ? `${DAY_NAMES[_now.getDay()]}, February ${_d}`
  : 'February 2026'

// ── components ─────────────────────────────────────────────────────────────
function Copy({ text, label = 'Copy', variant = 'dark' }: {
  text: string; label?: string; variant?: 'dark' | 'orange' | 'ghost'
}) {
  const [ok, setOk] = useState(false)
  const go = () => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000) }
  const base = 'font-bold rounded-xl transition-all text-sm whitespace-nowrap'
  const v = {
    dark:   ok ? 'bg-green-500 text-white px-5 py-2.5' : 'bg-[#0a0a0a] text-white hover:bg-gray-800 px-5 py-2.5',
    orange: ok ? 'bg-green-500 text-white px-5 py-2.5' : 'bg-[#FD5C1E] text-white hover:bg-[#e54d18] px-5 py-2.5',
    ghost:  ok ? 'bg-green-50 text-green-700 border border-green-200 px-4 py-1.5 text-xs' : 'border border-white/20 text-white/60 hover:border-white/40 hover:text-white px-4 py-1.5 text-xs',
  }
  return <button onClick={go} className={`${base} ${v[variant]}`}>{ok ? '✓ Copied' : label}</button>
}

function CopyFull({ text }: { text: string }) {
  const [ok, setOk] = useState(false)
  const go = () => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000) }
  return (
    <button onClick={go} className={`w-full py-3.5 rounded-xl font-black text-sm tracking-wide transition-all ${
      ok ? 'bg-green-500 text-white' : 'bg-[#FD5C1E] text-white hover:bg-[#e54d18]'
    }`}>
      {ok ? '✓ COPIED TO CLIPBOARD' : 'COPY CAPTION'}
    </button>
  )
}

function CopyAll({ text }: { text: string }) {
  const [ok, setOk] = useState(false)
  const go = () => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000) }
  return (
    <button onClick={go} className={`w-full py-3 rounded-xl font-black text-sm tracking-wide transition-all ${
      ok ? 'bg-green-500 text-white' : 'bg-[#0a0a0a] text-white hover:bg-gray-800'
    }`}>
      {ok ? '✓ COPIED' : 'COPY ALL HASHTAGS'}
    </button>
  )
}

const PC: Record<string, string> = { TikTok: '#FD5C1E', Instagram: '#E1306C', Pinterest: '#E60023' }

function Plat({ p }: { p: string }) {
  return (
    <span className="inline-flex items-center text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full text-white"
      style={{ backgroundColor: PC[p] }}>
      {p}
    </span>
  )
}

function PostedBtn({ id, posted, toggle }: { id: number; posted: Set<number>; toggle: (id: number) => void }) {
  const done = posted.has(id)
  return (
    <button onClick={() => toggle(id)} className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition-all shrink-0 ${
      done ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'border border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-700'
    }`}>
      {done ? '✓ Posted' : '○ Mark posted'}
    </button>
  )
}

function ShootBrief({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div className={`flex items-start gap-2 border-l-[3px] border-[#FD5C1E] rounded-r-xl px-4 py-3 ${dark ? 'bg-amber-950/40 border-amber-700/40' : 'bg-orange-50'}`}>
      <span className="shrink-0 text-sm">📱</span>
      <p className={`text-xs font-semibold leading-relaxed ${dark ? 'text-amber-300/90' : 'text-[#c44a18]'}`}>{text}</p>
    </div>
  )
}

// ── data ──────────────────────────────────────────────────────────────────────
type Platform = 'TikTok' | 'Instagram' | 'Pinterest'
type Post = { id: number; day: number; week: 1|2|3|4; platform: Platform; format: string; hook: string; shoot: string; caption: string }

const WEEK_THEMES = ['Launch + Science', 'Social Proof', 'Community + Founder', 'Milestone + Scale']

const POSTS: Post[] = [
  {
    id:1, day:1, week:1, platform:'Instagram', format:'Announcement Post',
    hook: "We're live. 600 million people have been waiting for this.",
    shoot: 'Founder photo or product flat lay on warm Joyn orange surface. This is your launch post — keep it personal and real, not overly produced.',
    caption: `We're live. 🧡

600 million people have been waiting for this.

Joyn is the first supplement formulated specifically for ALDH2 deficiency — the genetic reason 1 in 3 East Asians (and millions more) turn red when they drink.

Woman-founded. USA-made. Third-party tested.

If you've ever left a party early, skipped a toast, or felt embarrassed at a happy hour — this is for you.

Drop a 🧡 if you've been waiting for something like this.

#Joyn #ConfidenceInACapsule #ALDH2 #AlcoholFlush #WomanFounded #Launch #NewBrand`,
  },
  {
    id:2, day:2, week:1, platform:'TikTok', format:'Educational Hook',
    hook: 'Why your face turns red when you drink — the genetic truth nobody told you',
    shoot: 'Green screen with ALDH2 enzyme diagram. Keep under 60s. This is your hero education post — high save + share rate. It blows up.',
    caption: `Why your face turns red when you drink — the genetic truth nobody told you 🧬

It's called ALDH2 deficiency. 1 in 3 East Asians carry the gene. 600 million people worldwide.

Here's what happens:
→ You drink alcohol
→ Your body converts it to acetaldehyde (toxic)
→ ALDH2 deficiency = your body can't break it down fast enough
→ Acetaldehyde builds up → redness, racing heart, nausea

The "fix" people use? Pepcid AC. An antacid. Off-label. Damages your stomach.

We built Joyn — the first supplement designed specifically for ALDH2 deficiency.

Drop "flush" in the comments and I'll DM you the link 👇

#ALDH2 #AlcoholFlush #AsianGlow #HealthTok #SupplementTok #GeneticHealth #Joyn`,
  },
  {
    id:3, day:3, week:1, platform:'Instagram', format:'Carousel (6 slides)',
    hook: 'Save this. Share it with someone who needs it. 📌',
    shoot: 'Slide 1: bold hook on Joyn orange bg. Slides 2–5: one ALDH2 fact each on clean white. Slide 6: CTA + discount code. No fancy design needed — clear > pretty.',
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
    id:4, day:4, week:1, platform:'TikTok', format:'Relatable List',
    hook: 'Things people with Asian flush relate to (a thread) 😭',
    shoot: 'Text list on screen, trending audio, react to each one. High comment + share format. Ask viewers to drop their most relatable one.',
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
    id:5, day:5, week:1, platform:'TikTok', format:'First-Person Story',
    hook: "I tried Joyn at my work happy hour and I'm still processing 😭",
    shoot: 'Selfie cam. Casual, conversational — sitting in a car or at home. No script. Could also be voiceover over office/bar B-roll.',
    caption: `I tried Joyn at my work happy hour and I'm still processing 😭

I've worked at this company for 3 years. I've never had more than one drink at work events.

Not because I don't want to. Because two drinks and my face looks like a fire alarm.

Tuesday: took 2 Joyn capsules 30 min before. Had two glasses of wine. Stayed for 2+ hours.

My manager said "you seem more relaxed lately."

I didn't tell him why. I didn't have to.

#Joyn #WorkHappyHour #ALDH2 #AlcoholFlush #HealthTok #ConfidenceInACapsule`,
  },
  {
    id:6, day:6, week:1, platform:'TikTok', format:'Short Hook',
    hook: 'Red wine. Not red face. 🍷',
    shoot: 'Short, punchy — under 20 seconds. B-roll of someone enjoying wine at dinner, looking relaxed. Text overlay only. No voiceover needed.',
    caption: `Red wine. Not red face. 🍷

The thing about ALDH2 deficiency is that it's not about how much you drink.

One glass of rosé and your face betrays you — because your body processes acetaldehyde slower than it should.

Joyn supports ALDH2 enzyme activity so your body can actually do its job.

Two capsules. Thirty minutes. That's it.

Use code JOYN15 → link in bio 🧡

#Joyn #RedWine #ALDH2 #AlcoholFlush #ConfidenceInACapsule #FlushFree`,
  },
  {
    id:7, day:7, week:1, platform:'Instagram', format:'Q&A Prompt',
    hook: 'Drop your questions about alcohol flush and Joyn below 👇',
    shoot: 'Simple post — Joyn orange background or casual founder photo. Goal is engagement, not aesthetics. Also post a Story asking the same question.',
    caption: `Drop your questions about alcohol flush and Joyn below 👇

We're doing a full Q&A this weekend — no question is too basic, no question is too scientific.

We want to know:
→ When did you first notice the flush?
→ What have you tried before?
→ What do you want to know about Joyn?

Everything gets answered. Every story gets heard.

This community is what we built Joyn for. 🧡

#Joyn #QandA #ALDH2 #AlcoholFlush #Community #AskUsAnything`,
  },
  {
    id:8, day:8, week:2, platform:'TikTok', format:'Tier List',
    hook: 'Rating every alcohol flush "cure" from worst to best (HONEST)',
    shoot: 'On-screen tier list with comedic reaction to each. Fast cuts. Highly shareable — built for saves. Be honest, including about Joyn.',
    caption: `Rating every alcohol flush "cure" from worst to best — be honest, you've tried most of these 😅

❌ 5/10 — Cold water on face. Reduces redness for 2 minutes.
❌ 4/10 — Eating a huge meal first. Slows absorption, doesn't fix flush.
❌ 3/10 — Antihistamines. Makes you drowsy, doesn't help acetaldehyde.
⚠️ 2/10 — Pepcid off-label. Masks the symptom, real stomach risks.
❌ 1/10 — Just stop drinking. OK sure, thanks.
✅ 9/10 — Joyn. Actually formulated for ALDH2 enzyme activity. First of its kind.

Minus 1 because nothing is perfect and I'm honest.

Link in bio.

#AlcoholFlush #AsianGlow #ALDH2 #Joyn #HealthTok #FlushRemedies`,
  },
  {
    id:9, day:9, week:2, platform:'TikTok', format:'Before / After',
    hook: 'Before Joyn vs. After Joyn: The honest version 🔄',
    shoot: 'Split screen or alternating text cards. Keep it real and grounded — no over-the-top claims. The truth is compelling enough.',
    caption: `Before Joyn vs. After Joyn: The honest version 🔄

Before:
→ One drink = watching the clock
→ Happy hours = sparkling water and excuses
→ Weddings = the person who left at 9pm
→ First dates = counting sips
→ Work events = strategic avoidance

After:
→ The full glass
→ The second toast
→ The 1am table at the reception
→ Actually tasting the wine
→ Being present for it

600 million people have ALDH2 deficiency. Most of them don't know it yet.

Drop "flush" in the comments and I'll DM you the link 👇

#Joyn #BeforeAndAfter #ALDH2 #AlcoholFlush #HealthTok #ConfidenceInACapsule`,
  },
  {
    id:10, day:10, week:2, platform:'TikTok', format:'Educational Warning',
    hook: "Pepcid for alcohol flush? Your doctor probably doesn't know this 😳",
    shoot: 'Calm, credible delivery. Show Reddit thread screenshots as B-roll. This one gets shared wildly — doctors will share it too.',
    caption: `Pepcid for alcohol flush? Your doctor probably doesn't know this 😳

Millions of people use H2 blockers (Pepcid, Zantac) off-label to reduce flush.

Here's the problem:
→ They block histamine — masking the red face symptom
→ They DON'T help your body break down acetaldehyde
→ Long-term: stomach ulcers, reduced acid, dependency
→ Never tested or approved for this purpose

And yet it's the #1 advice on Reddit and TikTok.

Joyn works differently. Supports ALDH2 enzyme activity — so your body actually processes the acetaldehyde instead of just hiding it.

If this helped, share it. Link in bio 🙏

#AlcoholFlush #Pepcid #ALDH2 #AsianGlow #HealthTok #DrinkingTips #Joyn`,
  },
  {
    id:11, day:11, week:2, platform:'TikTok', format:'Lifestyle Story',
    hook: 'Open bar at a wedding with zero anxiety 💒',
    shoot: 'Cinematic clips from a wedding or a night out — toasts, dancing, being present. Voiceover or text overlay. Pure aspiration.',
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
    id:12, day:12, week:2, platform:'Instagram', format:'Quote Card',
    hook: '"I stayed until midnight for the first time." — Sarah, 32',
    shoot: 'Clean quote card on Joyn orange background. Or a warm candid celebration photo with the quote overlaid. Let the quote do all the work.',
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
    id:13, day:13, week:2, platform:'Instagram', format:'Cultural Moment',
    hook: 'Lunar New Year without the flush — first time ever 🧧',
    shoot: 'Warm LNY aesthetic — red, gold, family celebration. Could be UGC. Post LNY eve for max emotional reach. Use code LNY25.',
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
    id:14, day:14, week:2, platform:'Instagram', format:"Valentine's Day Post",
    hook: "Valentine's Day with confidence you've never had before 💛",
    shoot: 'Date night aesthetic — warm restaurant, candlelight, two glasses of wine. Or a bold Joyn orange graphic with the copy. Both work. Use code LOVE25.',
    caption: `Valentine's Day with confidence you've never had before 💛

To everyone who's ever ordered sparkling water on a date because one drink would end the night —

To everyone who's ever timed their flush to avoid the first-kiss moment —

To everyone who's ever wished they could just... be present —

This one's for you.

Two capsules. Thirty minutes. Show up fully.

Happy Valentine's Day. You deserve it. 🍷

Use code LOVE25 → link in bio 🧡

#Joyn #ValentinesDay #ALDH2 #AlcoholFlush #ConfidenceInACapsule #DateNight`,
  },
  {
    id:15, day:15, week:3, platform:'TikTok', format:'Expert Review',
    hook: "Asked a doctor to review Joyn — here's what she said 🩺",
    shoot: 'Credible, calm delivery to camera. No lab coat required. Could be voiceover with ingredient text on screen. Do NOT be salesy — let the science speak.',
    caption: `Asked a doctor to review Joyn — here's what she said 🩺

We sent our full formula to a board-certified physician specializing in metabolic health.

Her response:

"The approach of directly supporting ALDH2 enzyme activity is scientifically sound. This is categorically different from the antacid workarounds most people use. The ingredient profile is thoughtfully assembled."

She also said: "I wish more supplements were this transparent about their mechanism."

We're not a drug. We're not medical advice. But we are built on real science.

Full formula breakdown → link in bio 🔬

#Joyn #DoctorReview #ALDH2 #HealthTok #SupplementTok #Science #AlcoholFlush`,
  },
  {
    id:16, day:16, week:3, platform:'Instagram', format:'Carousel (6 slides)',
    hook: 'ALDH2 deficiency — the complete breakdown 🧬',
    shoot: 'Clean educational carousel. Slide 1: bold hook on Joyn orange. Slides 2-5: one fact each. Slide 6: Joyn CTA. White + orange palette. Save rate will be high.',
    caption: `ALDH2 deficiency — the complete breakdown 🧬

Save this. Share it with someone who's been told "just take Pepcid."

Here's everything your doctor probably never told you:

→ What ALDH2 is and why it matters
→ Why 1 in 3 East Asians carry the gene
→ What actually happens in your body when you flush
→ Why Pepcid is the wrong answer
→ What Joyn does differently

600 million people deserve to understand their own biology.

→ Link in bio 🧡

#ALDH2 #AlcoholFlush #AsianGlow #HealthEducation #Joyn #ConfidenceInACapsule #SaveThis`,
  },
  {
    id:17, day:17, week:3, platform:'TikTok', format:'Founder Story',
    hook: 'I spent years building Joyn because I was tired of hiding',
    shoot: 'Founder to camera. No script, no teleprompter. Just talk. This is the most powerful content you can make — authentic founder story converts.',
    caption: `I spent years building Joyn because I was tired of hiding 🍷

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
    id:18, day:18, week:3, platform:'Instagram', format:'Story Poll',
    hook: 'What celebration are you most excited for this year?',
    shoot: 'Post a Story with a poll sticker. Joyn orange background. Poll options: "A wedding" / "Graduation" / "Date night" / "Just a Friday." Also post this as a feed caption for engagement.',
    caption: `What celebration are you most excited for this year? 🎉

Drop it in the comments or vote in our story poll 👆

Whether it's a wedding, a birthday, a work win, or just a Friday night that finally feels like something —

You deserve to be fully present for all of it.

Joyn is here for every single one. 🧡

#Joyn #Celebrate #ALDH2 #ConfidenceInACapsule #CelebrateFreely`,
  },
  {
    id:19, day:19, week:3, platform:'TikTok', format:'Selfie Diary',
    hook: "7 days with Joyn — I'm going to be honest",
    shoot: 'Selfie-cam across 7 real days. Natural lighting. No script. This format converts — authentic > polished. Film Day 1 on Feb 12, post Feb 19.',
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
    id:20, day:20, week:3, platform:'Instagram', format:'Founder Feed Post',
    hook: "We didn't build Joyn to get rich. We built it because we were tired of hiding.",
    shoot: 'Personal editorial photo of Brynn or the team. Warm lighting. No product in frame. This is about the human story, not the product.',
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
    id:21, day:21, week:3, platform:'TikTok', format:'Lifestyle Video',
    hook: 'Spring break. No flush edition. 🌴',
    shoot: 'Fun, energetic spring break energy. Trending audio. Light and summery edit. Fast cuts. This is an ad-adjacent organic post. Use code SPRING15.',
    caption: `Spring break is almost here and for the first time you don't have to choose between having fun and hiding your face 🌴

No more watching your phone camera to check how red you are.
No more quietly switching to water after one drink.
No more leaving early.

Spring 2026: you're going. You're staying. You're present.

Two capsules. Thirty minutes. That's it.

Use code SPRING15 for 15% off → link in bio 🧡

#SpringBreak #AlcoholFlush #ALDH2 #AsianGlow #Joyn #CelebrateFully #ConfidenceInACapsule`,
  },
  {
    id:22, day:22, week:4, platform:'Instagram', format:'Community Spotlight',
    hook: "You sent us your stories this month. We can't stop reading them. 🧡",
    shoot: 'Collage of DM screenshots (with permission) or quote cards on Joyn cream background. Warm, grateful energy. Real names or anonymous — ask first.',
    caption: `You sent us your stories this month. We can't stop reading them. 🧡

"I went to my first work happy hour in 4 years." — Daniel, 29

"I finally said yes to wine at my in-laws' dinner." — Jenny, 34

"I stayed until midnight at my own birthday party for the first time." — Marcus, 27

"My boyfriend doesn't know yet. He just noticed I seem happier." — anonymous

This is why we built Joyn. Not for the product — for these moments.

Keep sending them. We read every single one.

#Joyn #CommunityStories #ALDH2 #AlcoholFlush #ConfidenceInACapsule #CustomerLove`,
  },
  {
    id:23, day:23, week:4, platform:'TikTok', format:'Ingredient Breakdown',
    hook: "Every ingredient in Joyn and exactly why it's there 🔬",
    shoot: 'Green screen or text overlay with ingredient list. Credible, educational tone. High save rate format. Show the bottle.',
    caption: `Every ingredient in Joyn and exactly why it's there 🔬

We're not hiding anything. Let's go through it:

→ Dihydromyricetin (DHM): Studied for supporting alcohol metabolism
→ NAC: Precursor to glutathione, your body's master antioxidant
→ B-vitamins: Support liver metabolic function
→ Milk Thistle: Liver support, used in wellness for centuries
→ Vitamin C: Antioxidant support during oxidative stress

No proprietary blends. No "natural flavors." No hiding behind vague labels.

This is what flush-free actually looks like at the molecular level.

Save this. Full breakdown → link in bio.

#Joyn #Ingredients #ALDH2 #HealthTok #SupplementTok #Transparency #CleanSupplements`,
  },
  {
    id:24, day:24, week:4, platform:'Instagram', format:'Milestone Post',
    hook: '30 days. Thousands of celebrations. 🥂',
    shoot: 'Celebratory and warm. Founder photo, product shot, or a collage of customer moments. This is your month-end moment — make it meaningful.',
    caption: `30 days. Thousands of celebrations. 🥂

When we launched on February 1st, we hoped people would find us.
We didn't know they'd find us this fast.

The stories in our DMs. The reviews. The people saying they finally went to their office party, finally stayed at the wedding, finally had a glass of wine on a first date without counting their heartbeats.

We built Joyn for the 600 million people with ALDH2 deficiency who've been ignored.

Month 1 is done. We're just getting started.

Thank you. 🧡

#Joyn #OneMonth #ALDH2 #AlcoholFlush #ConfidenceInACapsule #ThankYou #WomanFounded`,
  },
  {
    id:25, day:25, week:4, platform:'TikTok', format:'Skeptic Response',
    hook: "I read every skeptical comment about Joyn so you don't have to 😅",
    shoot: 'Fast cuts, text overlay for each objection. Honest and slightly funny. Builds trust by acknowledging doubt head-on.',
    caption: `I read every skeptical comment about Joyn so you don't have to 😅

"It's just a placebo." — The enzyme science disagrees. Look up DHM and ALDH2.

"Just drink less." — The point is choice. Not abstinence.

"Pepcid works fine." — Long-term: stomach ulcers, acid dependency. Not fine.

"Too expensive." — One bottle = one month. Calculate your current Pepcid habit.

"Nothing works for flush." — That's what we thought too.

The skepticism is valid. We earned it by being honest about the science.

Formula transparency → link in bio 🔬

#Joyn #SkepticsWelcome #ALDH2 #HealthTok #AlcoholFlush #ConfidenceInACapsule`,
  },
  {
    id:26, day:26, week:4, platform:'Instagram', format:'Community CTA',
    hook: 'Community weekend 🔥 Send us your story.',
    shoot: 'Simple, energetic post — orange graphic or casual founder video. Goal is to flood the DMs. Maximize engagement above all else.',
    caption: `Community weekend 🔥

We're handing the mic to you.

This weekend: send us your flush stories, your Joyn moments, your before/afters.

Best ones get featured on our feed. Tag us @joynthefun or DM directly.

Everything's anonymous if you want it to be. We know these stories are personal.

But they matter. Every single one.

Drop your story below 👇

#Joyn #CommunityTakeover #ALDH2 #AlcoholFlush #YourStory #ConfidenceInACapsule`,
  },
  {
    id:27, day:27, week:4, platform:'TikTok', format:'Entertainment',
    hook: "Rating celebrity flush moments they definitely didn't want us to see 😭",
    shoot: 'Highly entertaining — find publicly available clips. Add comedic commentary. High share format. Frame it as solidarity, not mockery.',
    caption: `Rating celebrity flush moments they definitely didn't want us to see 😭

(Solidarity, not mockery — these are real people with real ALDH2 deficiency)

⭐ Constance Wu at the SAG Awards — girl, we see you
⭐ Every awards show champagne toast, front row, cameras everywhere
⭐ That viral red-face clip from the Met Gala... you know the one

The difference between them and you: they had stylists, PRs, and makeup artists on standby.

You just have Joyn.

Code CELEB15 → link in bio 🧡

#Joyn #AsianGlow #ALDH2 #TikTokFun #AlcoholFlush #ConfidenceInACapsule #AsianAmerican`,
  },
  {
    id:28, day:28, week:4, platform:'Instagram', format:'Month Wrap-up',
    hook: "Month 1 is done. Here's to the 600M. 🥂",
    shoot: 'Most important post of the month. Emotional, warm. Founder or team photo. Real, personal, not polished. This is the closer.',
    caption: `Month 1 is done. Here's to the 600M. 🥂

February 2026.

We launched a supplement nobody asked us to build — because we needed it ourselves.

In 28 days:
→ Thousands of orders shipped
→ Hundreds of stories in our DMs
→ A community we didn't know we were building

For the person who found us at 2am after a bad night at a dinner party —
For the person who shared us with their college roommate —
For the person who finally stayed until the last dance —

We built this for you.

March is next. Bring your celebrations.

Joyn. Confidence in a capsule. 🧡

#Joyn #OneMonth #ALDH2 #AlcoholFlush #ConfidenceInACapsule #ThankYou #WomanFounded #USAMade`,
  },
]

// ── hashtags ──────────────────────────────────────────────────────────────────
const HASHTAGS = [
  { name: 'Education & Science', desc: 'For ALDH2 explainers, science content, health education', tags: '#ALDH2 #AlcoholFlush #ALDH2Deficiency #AsianGlow #FlushReaction #HealthTok #SupplementTok #GeneticHealth #HealthEducation #ScienceExplained #AlcoholMetabolism #MedicalFacts' },
  { name: 'AAPI Community', desc: 'For community content, cultural moments, relatable posts', tags: '#AsianAmerican #AAPI #AAPITikTok #AsianAmericanHealth #AsianGlow #EastAsian #AsianAmericanCommunity #AsianTikTok #AsianAmericanProblems #ALDH2 #CulturalHealth #AAPIVoices' },
  { name: 'Lifestyle & Celebration', desc: 'For lifestyle shots, events, nights out', tags: '#CelebrateFreely #ConfidenceInACapsule #FlushFree #NightOut #WeddingSeason #HappyHour #OpenBar #SocialWellness #NoMoreHiding #CelebrationReady #DateNight #GoodVibesOnly' },
  { name: 'Product & Brand', desc: 'For product shots, launch posts, announcements', tags: '#Joyn #JoynSupplement #WomanFounded #USAMade #NaturalSupplement #CleanSupplements #AlcoholFlushSupplement #ALDH2Support #ConfidenceInACapsule #FlushFree #WellnessSupplements' },
  { name: 'TikTok Reach Booster', desc: 'Add to any TikTok to maximize algorithmic reach', tags: '#HealthTok #SupplementTok #WellnessTok #LearnOnTikTok #HealthTips #TikTokMadeMeBuyIt #HealthyLiving #WellnessTips #FYP #ForYouPage #HealthTikTok #Wellness2026' },
  { name: 'Pinterest SEO', desc: 'Keyword phrases for pin descriptions — use these, not hashtags', tags: 'alcohol flush supplement, ALDH2 deficiency remedy, how to stop Asian glow, alcohol flush treatment, Asian flush natural remedy, supplement for alcohol flush, stop face turning red when drinking' },
]

// ── ads ───────────────────────────────────────────────────────────────────────
const ADS = [
  {
    id:1, platform:'Meta', stage:'Awareness',
    hook: "Your face turns red when you drink. There's a genetic reason — and a real solution.",
    headline: 'Finally. A real solution for alcohol flush.',
    body: '600 million people have ALDH2 deficiency — the genetic reason your face turns red when you drink. For years, the only option was Pepcid AC, an antacid used off-label that damages your stomach. Joyn is the first supplement formulated specifically for ALDH2. Woman-founded. USA-made.',
    cta: 'Learn More',
    note: 'Target: Asian-American 21–40, wellness, social dining. CPM target <$10.',
  },
  {
    id:2, platform:'Meta', stage:'Conversion',
    hook: 'Stop hiding at celebrations. Start showing up fully.',
    headline: 'Confidence in a capsule. 15% off your first order.',
    body: "Joyn supports ALDH2 enzyme activity so you can show up fully — at weddings, work events, first dates, wherever. Take 2 capsules 30 min before drinking. Join thousands of customers living flush-free. Use code JOYN15.",
    cta: 'Shop Now — Code JOYN15',
    note: 'Retarget: 50%+ video viewers, site visitors, cart abandoners. CPA target <$35.',
  },
  {
    id:3, platform:'Meta', stage:'Retention',
    hook: 'Never run out. Never miss a celebration.',
    headline: 'Subscribe & Save 20% — free shipping every bottle.',
    body: "You've found your answer. Make sure you never run out. Joyn Subscribe & Save: 20% off every order, free shipping, cancel anytime. Confidence in a capsule, every month.",
    cta: 'Subscribe & Save',
    note: 'Target: past purchasers only. LTV target >$120.',
  },
  {
    id:4, platform:'TikTok', stage:'Awareness',
    hook: 'POV: You finally have a real answer to alcohol flush',
    headline: '600M people have ALDH2 deficiency. Joyn was built for them.',
    body: 'UGC-style. Creator holds Joyn bottle, explains ALDH2 in 15s, cuts to event scene looking confident. Text overlay: "ALDH2 → Alcohol Flush → JOYN." End card: "Link in bio — use code TIKTOK15"',
    cta: 'Link in Bio — Code TIKTOK15',
    note: 'In-Feed + Spark Ads on organic posts with >3% engagement. Daily budget: $50–100/day.',
  },
]

// ── brand ─────────────────────────────────────────────────────────────────────
const COLORS = [
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
  { line: 'Red wine. Not red face.', note: 'TikTok hooks, short-form' },
  { line: 'More confident nights, brighter mornings.', note: 'Full benefit arc' },
  { line: 'Confidence you can see. Redness you cannot.', note: 'Visual contrast ads' },
  { line: 'Celebrate without limits.', note: 'Campaign tagline' },
]

// ── page ──────────────────────────────────────────────────────────────────────
type PF = 'All' | Platform

export default function Home() {
  const [posted, setPosted] = useState<Set<number>>(new Set())
  const [sel, setSel] = useState<number | null>(null)
  const [pf, setPf] = useState<PF>('All')
  const [hidePosted, setHidePosted] = useState(false)

  useEffect(() => {
    try {
      const s = localStorage.getItem('joyn-posted')
      if (s) setPosted(new Set(JSON.parse(s)))
    } catch {}
  }, [])

  const togglePosted = (id: number) => {
    setPosted(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      localStorage.setItem('joyn-posted', JSON.stringify(Array.from(next)))
      return next
    })
  }

  const todayPosts  = POSTS.filter(p => p.day === TODAY)
  const upNext      = POSTS.filter(p => p.day > TODAY && p.day <= TODAY + 3)
  const selPosts    = sel ? POSTS.filter(p => p.day === sel) : []
  const weekNum     = IN_FEB ? Math.min(Math.ceil(_d / 7), 4) : 1
  const totalPosted = posted.size

  const filteredLib = POSTS
    .filter(p => pf === 'All' || p.platform === pf)
    .filter(p => !hidePosted || !posted.has(p.id))

  return (
    <main>

      {/* ── TODAY ────────────────────────────────────────────────────── */}
      <section id="today" className="section-anchor">

        {/* Hero */}
        <div className="bg-[#FD5C1E] px-6 lg:px-16 pt-20 pb-10">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <p className="text-white/60 text-xs font-black uppercase tracking-[0.25em] mb-3">
                  {IN_FEB ? `Week ${weekNum} · ${WEEK_THEMES[weekNum - 1]}` : 'February 2026 Playbook'}
                </p>
                <h1 className="text-5xl lg:text-7xl font-black text-white leading-none tracking-tight">
                  {TODAY_STR}
                </h1>
              </div>
              <div className="text-right pb-1">
                <div className="text-5xl lg:text-7xl font-black text-white/20 leading-none">
                  {totalPosted}<span className="text-3xl">/28</span>
                </div>
                <div className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">posts published</div>
                <div className="mt-2 w-44 h-1.5 bg-white/20 rounded-full overflow-hidden ml-auto">
                  <div className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${(totalPosted / 28) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="bg-[#0a0a0a] px-6 lg:px-16 py-10 border-b border-gray-800">
          <div className="max-w-screen-xl mx-auto">

            {!IN_FEB && (
              <div className="border border-white/10 rounded-2xl p-8 text-center">
                <p className="text-white font-black text-xl mb-2">February 2026 Content Playbook</p>
                <p className="text-gray-500 text-sm">28 posts · all platforms · every caption ready to copy</p>
                <p className="text-gray-600 text-xs mt-3">Use the Calendar and Caption Library below to plan your posts.</p>
              </div>
            )}

            {IN_FEB && todayPosts.length === 0 && (
              <div className="border border-white/10 rounded-2xl p-8 text-center">
                <p className="text-white font-black text-xl mb-2">No posts scheduled today.</p>
                <p className="text-gray-500 text-sm">Check the calendar for what's coming up ↓</p>
              </div>
            )}

            <div className="space-y-5">
              {todayPosts.map(p => (
                <div key={p.id} className={`border rounded-2xl overflow-hidden transition-all ${posted.has(p.id) ? 'border-green-800/40' : 'border-white/10'}`}>
                  <div className="px-6 pt-6 pb-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Plat p={p.platform} />
                        <span className="text-xs font-semibold text-gray-500">{p.format}</span>
                      </div>
                      <PostedBtn id={p.id} posted={posted} toggle={togglePosted} />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-black text-white mb-4 leading-tight">
                      &ldquo;{p.hook}&rdquo;
                    </h2>
                    <ShootBrief text={p.shoot} dark />
                    <div className="text-sm text-gray-400 whitespace-pre-line leading-relaxed mt-5 mb-6">
                      {p.caption}
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <CopyFull text={p.caption} />
                  </div>
                </div>
              ))}
            </div>

            {/* Up Next */}
            {IN_FEB && upNext.length > 0 && (
              <div className="mt-8">
                <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-4">Up Next</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {upNext.map(u => (
                    <div key={u.id} className="border border-white/[0.07] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-gray-600">Feb {u.day}</span>
                        <Copy text={u.caption} variant="ghost" label="Copy" />
                      </div>
                      <Plat p={u.platform} />
                      <p className="text-sm text-gray-300 font-semibold mt-3 leading-snug">{u.hook}</p>
                      <p className="text-xs text-gray-600 mt-1">{u.format}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CALENDAR ─────────────────────────────────────────────────── */}
      <section id="calendar" className="section-anchor px-6 lg:px-16 py-16 bg-[#FFF8F4] border-b border-orange-100">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-xs font-black text-[#FD5C1E] uppercase tracking-[0.2em] mb-2">Content Calendar</p>
              <h2 className="text-4xl font-black text-[#0a0a0a]">February 2026.</h2>
            </div>
            <div className="flex items-center gap-4 pb-1">
              {Object.entries({ TikTok: '#FD5C1E', Instagram: '#E1306C', Pinterest: '#E60023' }).map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v }} />{k}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm">
            <div className="grid grid-cols-7 border-b border-orange-50">
              {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => (
                <div key={d} className="py-3 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{d}</div>
              ))}
            </div>
            {[1,2,3,4].map(wi => {
              const weekDays = Array.from({length:7}, (_,i) => (wi-1)*7+i+1)
              return (
                <div key={wi}>
                  <div className="px-4 py-1.5 bg-orange-50/60 border-y border-orange-100/60">
                    <span className="text-[10px] font-black text-[#FD5C1E] uppercase tracking-widest">
                      Week {wi} — {WEEK_THEMES[wi-1]}
                    </span>
                  </div>
                  <div className="grid grid-cols-7 divide-x divide-orange-50">
                    {weekDays.map(dayNum => {
                      const dayPosts = POSTS.filter(p => p.day === dayNum)
                      const allDone  = dayPosts.length > 0 && dayPosts.every(p => posted.has(p.id))
                      return (
                        <button key={dayNum}
                          onClick={() => setSel(sel === dayNum ? null : dayNum)}
                          className={`text-left p-3 min-h-[88px] transition-all border-b border-orange-50 ${
                            dayNum === TODAY ? 'bg-[#FD5C1E]/8' : 'hover:bg-orange-50/50'
                          } ${sel === dayNum ? 'ring-2 ring-inset ring-[#FD5C1E]' : ''}`}>
                          <div className={`text-xs font-black mb-1.5 flex items-center gap-1.5 ${dayNum === TODAY ? 'text-[#FD5C1E]' : 'text-gray-300'}`}>
                            {dayNum}
                            {dayNum === TODAY && <span className="text-[9px] bg-[#FD5C1E] text-white px-1.5 py-0.5 rounded font-black leading-none">TODAY</span>}
                            {allDone && <span className="text-[9px] bg-green-500 text-white px-1.5 py-0.5 rounded font-black leading-none">✓</span>}
                          </div>
                          <div className="space-y-1">
                            {dayPosts.map(dp => (
                              <div key={dp.id} className="flex items-start gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-[3px] transition-opacity ${posted.has(dp.id) ? 'opacity-30' : ''}`}
                                  style={{ backgroundColor: PC[dp.platform] }} />
                                <span className={`text-[10px] leading-tight line-clamp-2 transition-colors ${posted.has(dp.id) ? 'text-gray-300 line-through' : 'text-gray-500'}`}>
                                  {dp.hook}
                                </span>
                              </div>
                            ))}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Expanded day */}
          {sel && selPosts.length > 0 && (
            <div className="mt-4 bg-white border-2 border-[#FD5C1E] rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-orange-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="font-black text-[#0a0a0a] text-lg">February {sel}</h3>
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                    {WEEK_THEMES[selPosts[0].week - 1]}
                  </span>
                </div>
                <button onClick={() => setSel(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors text-lg">
                  ×
                </button>
              </div>
              <div className="divide-y divide-orange-50">
                {selPosts.map(p => (
                  <div key={p.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Plat p={p.platform} />
                        <span className="text-xs text-gray-400 font-semibold">{p.format}</span>
                      </div>
                      <PostedBtn id={p.id} posted={posted} toggle={togglePosted} />
                    </div>
                    <h4 className="font-black text-[#0a0a0a] text-base mb-4 leading-snug">&ldquo;{p.hook}&rdquo;</h4>
                    <ShootBrief text={p.shoot} />
                    <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed mt-4 mb-5">{p.caption}</div>
                    <CopyFull text={p.caption} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {sel && selPosts.length === 0 && (
            <div className="mt-4 bg-white border border-orange-100 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm">No post scheduled for February {sel}.</p>
              <button onClick={() => setSel(null)} className="text-xs text-gray-400 hover:text-gray-600 mt-2 underline">Close</button>
            </div>
          )}
        </div>
      </section>

      {/* ── CAPTION LIBRARY ──────────────────────────────────────────── */}
      <section id="captions" className="section-anchor px-6 lg:px-16 py-16 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Caption Library</p>
          <h2 className="text-4xl font-black text-[#0a0a0a] mb-2">28 captions. Ready to post.</h2>
          <p className="text-gray-400 text-base mb-8">Click any calendar day above to see the full post inline, or browse everything here.</p>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {(['All', 'TikTok', 'Instagram', 'Pinterest'] as const).map(f => (
              <button key={f} onClick={() => setPf(f)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${pf === f ? 'bg-[#0a0a0a] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {f}
              </button>
            ))}
            <div className="w-px h-5 bg-gray-200 mx-1" />
            <button onClick={() => setHidePosted(h => !h)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${hidePosted ? 'bg-[#FD5C1E] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
              {hidePosted ? 'Showing unposted only' : 'Hide posted'}
            </button>
            <span className="text-xs text-gray-400 ml-1">{filteredLib.length} captions</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredLib.map(cap => (
              <div key={cap.id} className={`rounded-2xl border overflow-hidden flex flex-col transition-all ${posted.has(cap.id) ? 'border-green-200 opacity-50' : 'border-gray-100 hover:border-gray-200'}`}>
                <div className="h-1" style={{ backgroundColor: PC[cap.platform] }} />
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Plat p={cap.platform} />
                      <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">Feb {cap.day}</span>
                      <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">{cap.format}</span>
                    </div>
                    <PostedBtn id={cap.id} posted={posted} toggle={togglePosted} />
                  </div>
                  <h3 className="font-black text-[#0a0a0a] text-lg leading-snug">&ldquo;{cap.hook}&rdquo;</h3>
                  <ShootBrief text={cap.shoot} />
                  <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed flex-1">{cap.caption}</div>
                  <CopyFull text={cap.caption} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HASHTAGS ─────────────────────────────────────────────────── */}
      <section id="hashtags" className="section-anchor px-6 lg:px-16 py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Hashtag Sets</p>
          <h2 className="text-4xl font-black text-[#0a0a0a] mb-10">Six packs. Copy and go.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HASHTAGS.map(set => {
              const raw = set.tags.includes(',') ? set.tags.split(', ') : set.tags.split(' ')
              return (
                <div key={set.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
                  <div className="p-5 flex-1">
                    <h3 className="font-black text-[#0a0a0a] mb-1">{set.name}</h3>
                    <p className="text-xs text-gray-400 mb-4">{set.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {raw.slice(0, 8).map((t) => (
                        <span key={t.trim()} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full font-mono">{t.trim()}</span>
                      ))}
                      {raw.length > 8 && <span className="text-xs text-gray-400 self-center">+{raw.length - 8} more</span>}
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <CopyAll text={set.tags} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── ADS ──────────────────────────────────────────────────────── */}
      <section id="ads" className="section-anchor px-6 lg:px-16 py-16 bg-[#0a0a0a] border-b border-gray-800">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-black text-gray-600 uppercase tracking-[0.2em] mb-3">Ad Copy</p>
          <h2 className="text-4xl font-black text-white mb-3">Four complete ad sets.</h2>
          <p className="text-gray-500 text-lg mb-12">Copy-ready for Meta Ads Manager and TikTok Ads.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {ADS.map(ad => (
              <div key={ad.id} className="border border-white/10 rounded-2xl overflow-hidden">
                <div className="bg-white/[0.03] px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white/40 uppercase tracking-widest">{ad.platform}</span>
                    <span className="text-white/20">·</span>
                    <span className="text-xs font-bold text-white/60 bg-white/10 px-2.5 py-0.5 rounded-full">{ad.stage}</span>
                  </div>
                  <Copy text={`Hook: ${ad.hook}\n\nHeadline: ${ad.headline}\n\nBody: ${ad.body}\n\nCTA: ${ad.cta}`} label="Copy Full Set" variant="ghost" />
                </div>
                <div className="p-6 space-y-3">
                  {[
                    { label: 'Hook', text: ad.hook },
                    { label: 'Headline', text: ad.headline },
                    { label: 'Body', text: ad.body },
                    { label: 'CTA', text: ad.cta },
                  ].map(f => (
                    <div key={f.label} className="border border-white/[0.07] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{f.label}</span>
                        <Copy text={f.text} variant="ghost" />
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{f.text}</p>
                    </div>
                  ))}
                </div>
                <div className="px-6 pb-6">
                  <p className="text-xs text-gray-600 italic">{ad.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND ────────────────────────────────────────────────────── */}
      <section id="brand" className="section-anchor px-6 lg:px-16 py-16">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Brand Kit</p>
          <h2 className="text-4xl font-black text-[#0a0a0a] mb-12">How Joyn looks. How Joyn sounds.</h2>
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Colors + Type */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5">Colors — click to copy hex</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {COLORS.map(c => (
                  <button key={c.hex} className="group text-left" onClick={() => navigator.clipboard.writeText(c.hex)}>
                    <div className="h-16 rounded-xl mb-2 relative overflow-hidden" style={{ backgroundColor: c.hex }}>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-gray-500">{c.hex}</div>
                    <div className="text-[11px] text-gray-400 leading-tight">{c.name}</div>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 mb-10">
                <div className="h-8 rounded-lg bg-gradient-to-r from-[#FD5C1E] to-[#D72C0D]" />
                <div className="h-8 rounded-lg bg-gradient-to-r from-[#003882] to-[#0052CC]" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5">Typography — Inter</h3>
              <div className="space-y-3">
                {[
                  { label: 'Hero — Black 900', cls: 'text-3xl font-black text-[#0a0a0a] leading-none', t: 'Confidence.' },
                  { label: 'Heading — ExtraBold 800', cls: 'text-xl font-extrabold text-[#0a0a0a]', t: 'Reshape the way you celebrate.' },
                  { label: 'Body — Regular 400', cls: 'text-sm text-gray-600', t: 'Formulated for the 600M with ALDH2 deficiency.' },
                  { label: 'Label — SemiBold Uppercase', cls: 'text-xs font-semibold uppercase tracking-[0.2em] text-gray-500', t: 'CONFIDENCE · USA MADE · FLUSH-FREE' },
                ].map(s => (
                  <div key={s.label} className="py-2.5 border-t border-gray-100">
                    <div className="text-[10px] text-gray-400 mb-1">{s.label}</div>
                    <p className={s.cls}>{s.t}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5">Voice — DO / DON&apos;T</h3>
              <div className="space-y-3 mb-10">
                {[
                  ['Confidence in a capsule.', 'We think this might help with redness...'],
                  ['Red wine. Not red face.', 'Please buy our supplement for flush.'],
                  ['You deserve to show up fully.', 'Fix your embarrassing flush reaction.'],
                  ['Formulated for ALDH2 enzyme activity.', 'It just works, trust us.'],
                ].map(([d, dn]) => (
                  <div key={d} className="grid grid-cols-2 gap-1.5">
                    <div className="bg-green-50 rounded-xl p-3.5">
                      <div className="text-[10px] font-black text-green-600 mb-1.5">DO</div>
                      <p className="text-xs font-semibold text-[#0a0a0a] leading-snug">&ldquo;{d}&rdquo;</p>
                    </div>
                    <div className="bg-red-50 rounded-xl p-3.5">
                      <div className="text-[10px] font-black text-red-400 mb-1.5">DON&apos;T</div>
                      <p className="text-xs text-gray-400 line-through leading-snug">&ldquo;{dn}&rdquo;</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[#003882] rounded-2xl p-5 text-white">
                <div className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-2">Positioning Statement</div>
                <p className="text-sm font-semibold leading-relaxed">For young adults (21–40) with ALDH2 deficiency. Joyn is the only proactive, flush-first supplement — woman-founded, USA-made, built for the 600M who&apos;ve been ignored by every other brand.</p>
              </div>
            </div>

            {/* Taglines */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5">Tagline Bank</h3>
              <div className="space-y-0">
                {TAGLINES.map((t, i) => (
                  <div key={t.line} className="py-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div className="flex items-start gap-2 flex-1">
                        <span className="text-xs font-black text-gray-200 mt-0.5 shrink-0">{i + 1}</span>
                        <p className="font-bold text-[#0a0a0a] text-sm leading-snug">{t.line}</p>
                      </div>
                      {i === 0 && <span className="text-[10px] bg-[#FD5C1E] text-white px-2 py-0.5 rounded-full font-black shrink-0">PRIMARY</span>}
                    </div>
                    <div className="flex items-center justify-between pl-5">
                      <p className="text-[11px] text-gray-400">{t.note}</p>
                      <Copy text={t.line} variant="ghost" label="Copy" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 lg:px-16 py-10 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-white font-black">JOYN · 2026 Social Playbook</div>
            <div className="text-gray-600 text-xs mt-1">28 posts · all platforms · copy-ready · progress saved in your browser</div>
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
