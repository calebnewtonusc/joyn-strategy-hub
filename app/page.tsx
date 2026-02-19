'use client'
import { useState, useEffect, useRef } from 'react'

// ── constants ─────────────────────────────────────────────────────────────────
const DAY_NAMES   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
const PC: Record<string, string> = { TikTok: '#FD5C1E', Instagram: '#E1306C', Pinterest: '#E60023' }

// ── types ─────────────────────────────────────────────────────────────────────
type Platform = 'TikTok' | 'Instagram' | 'Pinterest'
type PF       = 'All' | Platform
type Post     = {
  id: string
  date: string        // YYYY-MM-DD
  platform: Platform
  format: string
  hook: string
  shoot: string
  caption: string
  warn?: string
  promoCode?: string
}

// ── helpers ───────────────────────────────────────────────────────────────────
function pad(n: number) { return String(n).padStart(2, '0') }
function toDateStr(y: number, m: number, d: number) { return `${y}-${pad(m + 1)}-${pad(d)}` }
function nowDateStr(now: Date) { return toDateStr(now.getFullYear(), now.getMonth(), now.getDate()) }
function newId() { return Date.now().toString(36) + Math.random().toString(36).slice(2) }
function addDays(dateStr: string, n: number) {
  const d = new Date(dateStr + 'T00:00:00')
  d.setDate(d.getDate() + n)
  return toDateStr(d.getFullYear(), d.getMonth(), d.getDate())
}
function formatDisplayDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return `${MONTH_NAMES[m - 1]} ${d}, ${y}`
}

// ── default posts ─────────────────────────────────────────────────────────────
const SEED: Post[] = [
  {
    id:'1', date:'2026-02-01', platform:'Instagram', format:'Announcement Post',
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
    id:'2', date:'2026-02-02', platform:'TikTok', format:'Educational Hook',
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
    id:'3', date:'2026-02-03', platform:'Instagram', format:'Carousel (6 slides)',
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
    id:'4', date:'2026-02-04', platform:'TikTok', format:'Relatable List',
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
    id:'5', date:'2026-02-05', platform:'TikTok', format:'First-Person Story',
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
    id:'6', date:'2026-02-06', platform:'TikTok', format:'Short Hook',
    promoCode: 'JOYN15',
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
    id:'7', date:'2026-02-07', platform:'Instagram', format:'Q&A Prompt',
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
    id:'8', date:'2026-02-08', platform:'TikTok', format:'Tier List',
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
    id:'9', date:'2026-02-09', platform:'TikTok', format:'Before / After',
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
    id:'10', date:'2026-02-10', platform:'TikTok', format:'Educational Warning',
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
    id:'11', date:'2026-02-11', platform:'TikTok', format:'Lifestyle Story',
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
    id:'12', date:'2026-02-12', platform:'Instagram', format:'Quote Card',
    warn: 'Template post — replace every [placeholder] with a real verified customer before posting. Get explicit written permission. Never post fabricated testimonials.',
    promoCode: '[ADD LAUNCH CODE]',
    hook: '"[Customer quote — their own words, their own moment.]" — [Name, Age]',
    shoot: 'Clean quote card on Joyn orange background. Or a warm candid celebration photo with the quote overlaid. Let the real quote do all the work.',
    caption: `"[Customer quote — their own words, their own moment.]" — [Name, Age] 🥂

[1–2 sentences: their background. What they struggled with. How long they lived with it.]

[Their Joyn moment — one specific real detail. Real event. Real time. Real feeling.]

That's why we built this.

Real review. Real customer.

→ Link in bio. Use code [ADD LAUNCH CODE] for 15% off.

#Joyn #CustomerStory #ALDH2 #AlcoholFlush #ConfidenceInACapsule #Testimonial`,
  },
  {
    id:'13', date:'2026-02-13', platform:'Instagram', format:'Cultural Moment',
    promoCode: '[ADD LNY CODE]',
    hook: 'Lunar New Year without the flush — first time ever 🧧',
    shoot: 'Warm LNY aesthetic — red, gold, family celebration. Could be UGC. Post LNY eve for max emotional reach.',
    caption: `Lunar New Year without the flush — first time in my life 🧧

Eight courses. Multiple toasts with the elders. Baijiu and beer and champagne.

Normally I'd be red by soup.
Normally I'd switch to tea early.

This year: Joyn. 2 capsules before dinner.

I stayed present the whole meal. Made every toast. My grandma asked why I seemed so happy.

That's the whole point. 🥂

→ Link in bio. Use code [ADD LNY CODE] for 25% off.

#LunarNewYear #ChineseNewYear #AAPI #ALDH2 #AsianGlow #Joyn #CelebrateFreely`,
  },
  {
    id:'14', date:'2026-02-14', platform:'Instagram', format:"Valentine's Day Post",
    promoCode: '[ADD CODE]',
    hook: "Valentine's Day with confidence you've never had before 💛",
    shoot: "Date night aesthetic — warm restaurant, candlelight, two glasses of wine. Or a bold Joyn orange graphic with the copy. Both work.",
    caption: `Valentine's Day with confidence you've never had before 💛

To everyone who's ever ordered sparkling water on a date because one drink would end the night —

To everyone who's ever timed their flush to avoid the first-kiss moment —

To everyone who's ever wished they could just... be present —

This one's for you.

Two capsules. Thirty minutes. Show up fully.

Happy Valentine's Day. You deserve it. 🍷

Use code [ADD CODE] → link in bio 🧡

#Joyn #ValentinesDay #ALDH2 #AlcoholFlush #ConfidenceInACapsule #DateNight`,
  },
  {
    id:'15', date:'2026-02-15', platform:'TikTok', format:'Expert Review',
    warn: "Template post — replace with a real medical advisor's actual words. Get written sign-off before publishing. Never fabricate expert endorsements — this is an FTC violation.",
    hook: "Asked a doctor to review Joyn — here's what she said 🩺",
    shoot: 'Credible, calm delivery to camera. No lab coat required. Could be voiceover with ingredient text on screen. Do NOT be salesy — let the science speak.',
    caption: `Asked a doctor to review Joyn — here's what she said 🩺

We sent our full formula to [Dr. Name, Credentials — e.g. "Dr. Jane Park, MD, metabolic health"].

Her response:

"[Direct quote — her own words. Get written approval before publishing.]"

We're not a drug. We're not medical advice. But we are built on real science.

Full formula breakdown → link in bio 🔬

#Joyn #DoctorReview #ALDH2 #HealthTok #SupplementTok #Science #AlcoholFlush`,
  },
  {
    id:'16', date:'2026-02-16', platform:'Instagram', format:'Carousel (6 slides)',
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
    id:'17', date:'2026-02-17', platform:'TikTok', format:'Founder Story',
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
    id:'18', date:'2026-02-18', platform:'Instagram', format:'Story Poll',
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
    id:'19', date:'2026-02-19', platform:'TikTok', format:'Selfie Diary',
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
    id:'20', date:'2026-02-20', platform:'Instagram', format:'Founder Feed Post',
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
    id:'21', date:'2026-02-21', platform:'TikTok', format:'Lifestyle Video',
    promoCode: '[ADD CODE]',
    hook: 'Spring break. No flush edition. 🌴',
    shoot: 'Fun, energetic spring break energy. Trending audio. Light and summery edit. Fast cuts. This is an ad-adjacent organic post.',
    caption: `Spring break is almost here and for the first time you don't have to choose between having fun and hiding your face 🌴

No more watching your phone camera to check how red you are.
No more quietly switching to water after one drink.
No more leaving early.

Spring 2026: you're going. You're staying. You're present.

Two capsules. Thirty minutes. That's it.

Use code [ADD CODE] for 15% off → link in bio 🧡

#SpringBreak #AlcoholFlush #ALDH2 #AsianGlow #Joyn #CelebrateFully #ConfidenceInACapsule`,
  },
  {
    id:'22', date:'2026-02-22', platform:'Instagram', format:'Community Spotlight',
    warn: 'Template post — collect real DM stories before building this. Post an Instagram Story asking followers to share their Joyn moment. Get explicit written permission from each person. Then replace every [placeholder] below.',
    hook: "You sent us your stories this month. We can't stop reading them. 🧡",
    shoot: 'Collage of real DM screenshots (with permission) or quote cards on Joyn cream background. Warm, grateful energy. Real names or anonymous — always ask first.',
    caption: `You sent us your stories this month. We can't stop reading them. 🧡

"[Customer quote 1]" — [Name, Age or anonymous]

"[Customer quote 2]" — [Name, Age or anonymous]

"[Customer quote 3]" — [Name, Age or anonymous]

"[Customer quote 4]" — [Name or anonymous]

This is why we built Joyn. Not for the product — for these moments.

Keep sending them. We read every single one.

#Joyn #CommunityStories #ALDH2 #AlcoholFlush #ConfidenceInACapsule #CustomerLove`,
  },
  {
    id:'23', date:'2026-02-23', platform:'TikTok', format:'Ingredient Breakdown',
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
    id:'24', date:'2026-02-24', platform:'Instagram', format:'Milestone Post',
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
    id:'25', date:'2026-02-25', platform:'TikTok', format:'Skeptic Response',
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
    id:'26', date:'2026-02-26', platform:'Instagram', format:'Community CTA',
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
    id:'27', date:'2026-02-27', platform:'TikTok', format:'Entertainment',
    promoCode: '[ADD CODE]',
    hook: "Rating celebrity flush moments they definitely didn't want us to see 😭",
    shoot: 'Entertaining — use publicly available footage or general B-roll. Do NOT name specific individuals without legal review first. Frame everything as solidarity, not mockery.',
    caption: `Rating celebrity flush moments they definitely didn't want us to see 😭

(Solidarity, not mockery — ALDH2 affects everyone regardless of fame or following)

⭐ That awards show toast where someone's face told a whole other story
⭐ Every red carpet open bar moment caught in 4K... front row... cameras everywhere
⭐ The group photo at the after-party that lives rent-free in their heads

The difference between them and you: they had stylists, PRs, and makeup artists on standby.

You just have Joyn.

Code [ADD CODE] → link in bio 🧡

#Joyn #AsianGlow #ALDH2 #TikTokFun #AlcoholFlush #ConfidenceInACapsule #AsianAmerican`,
  },
  {
    id:'28', date:'2026-02-28', platform:'Instagram', format:'Month Wrap-up',
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

// ── small components ──────────────────────────────────────────────────────────
function Copy({ text, label = 'Copy', variant = 'dark' }: { text: string; label?: string; variant?: 'dark'|'orange'|'ghost' }) {
  const [ok, setOk] = useState(false)
  const go = () => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000) }
  const base = 'font-bold rounded-xl transition-all text-sm whitespace-nowrap'
  const v: Record<string, string> = {
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
    <button onClick={go} className={`w-full py-3.5 rounded-xl font-black text-sm tracking-wide transition-all ${ok ? 'bg-green-500 text-white' : 'bg-[#FD5C1E] text-white hover:bg-[#e54d18]'}`}>
      {ok ? '✓ COPIED TO CLIPBOARD' : 'COPY CAPTION'}
    </button>
  )
}

function CopyAll({ text }: { text: string }) {
  const [ok, setOk] = useState(false)
  const go = () => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000) }
  return (
    <button onClick={go} className={`w-full py-3 rounded-xl font-black text-sm tracking-wide transition-all ${ok ? 'bg-green-500 text-white' : 'bg-[#0a0a0a] text-white hover:bg-gray-800'}`}>
      {ok ? '✓ COPIED' : 'COPY ALL HASHTAGS'}
    </button>
  )
}

function Plat({ p }: { p: string }) {
  return (
    <span className="inline-flex items-center text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full text-white" style={{ backgroundColor: PC[p] }}>
      {p}
    </span>
  )
}

function PostedBtn({ id, posted, toggle }: { id: string; posted: Set<string>; toggle: (id: string) => void }) {
  const done = posted.has(id)
  return (
    <button onClick={() => toggle(id)} className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition-all shrink-0 ${done ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'border border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-700'}`}>
      {done ? '✓ Posted' : '○ Mark posted'}
    </button>
  )
}

function WarnBanner({ warn, promoCode }: { warn?: string; promoCode?: string }) {
  return (
    <>
      {warn && (
        <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mt-3">
          <span className="shrink-0 text-sm mt-0.5">⚠️</span>
          <div>
            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-0.5">Before you post</p>
            <p className="text-xs text-amber-800 font-medium leading-relaxed">{warn}</p>
          </div>
        </div>
      )}
      {promoCode && (
        <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl px-4 py-2.5 mt-3">
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-black text-[#FD5C1E] uppercase tracking-widest">Promo Code</span>
            <span className="font-black text-[#0a0a0a] text-sm tracking-wide">{promoCode}</span>
          </div>
          <span className="text-[10px] text-orange-400 font-semibold">Verify active in store before posting</span>
        </div>
      )}
    </>
  )
}

function ShootBrief({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 border-l-[3px] border-[#FD5C1E] bg-orange-50 rounded-r-xl px-4 py-3 mt-3">
      <span className="shrink-0 text-sm">📱</span>
      <p className="text-xs font-semibold leading-relaxed text-[#c44a18]">{text}</p>
    </div>
  )
}

// ── PostEditor modal ──────────────────────────────────────────────────────────
const IL = 'text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5'
const II = 'w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FD5C1E] transition-colors'
const IT = 'w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FD5C1E] transition-colors resize-none'

function PostEditor({ post, onSave, onDelete, onClose, isNew = false }: {
  post: Post; onSave: (p: Post) => void; onDelete?: (id: string) => void
  onClose: () => void; isNew?: boolean
}) {
  const [form, setForm] = useState<Post>({ ...post })
  const up = <K extends keyof Post>(k: K, v: Post[K]) => setForm(f => ({ ...f, [k]: v }))
  const valid = form.date && form.hook.trim() && form.caption.trim()

  return (
    <div className="fixed inset-0 z-50 flex" style={{ fontFamily: 'inherit' }}>
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl flex flex-col">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="font-black text-[#0a0a0a] text-lg">{isNew ? '+ Add Post' : 'Edit Post'}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors">✕</button>
        </div>

        {/* Fields */}
        <div className="px-6 py-6 space-y-5 flex-1">

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className={IL}>Date *</span>
              <input type="date" value={form.date} onChange={e => up('date', e.target.value)} className={II} />
            </label>
            <label className="block">
              <span className={IL}>Format</span>
              <input type="text" value={form.format} onChange={e => up('format', e.target.value)} placeholder="e.g. Reel, Carousel" className={II} />
            </label>
          </div>

          <div>
            <span className={IL}>Platform *</span>
            <div className="flex gap-2">
              {(['TikTok', 'Instagram', 'Pinterest'] as const).map(p => (
                <button key={p} onClick={() => up('platform', p)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${form.platform === p ? 'text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  style={form.platform === p ? { backgroundColor: PC[p] } : undefined}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className={IL}>Hook *</span>
            <input type="text" value={form.hook} onChange={e => up('hook', e.target.value)} placeholder="The opening line that stops the scroll" className={II} />
          </label>

          <label className="block">
            <span className={IL}>Shoot Brief</span>
            <textarea value={form.shoot} onChange={e => up('shoot', e.target.value)} placeholder="What to film, shoot, or design" rows={3} className={IT} />
          </label>

          <label className="block">
            <span className={IL}>Caption *</span>
            <textarea value={form.caption} onChange={e => up('caption', e.target.value)} placeholder="Full caption including hashtags" rows={14} className={IT + ' font-mono text-xs leading-relaxed'} />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className={IL}>Promo Code</span>
              <input type="text" value={form.promoCode ?? ''} onChange={e => up('promoCode', e.target.value || undefined)} placeholder="e.g. JOYN15" className={II} />
            </label>
            <div />
          </div>

          <label className="block">
            <span className={IL}>Pre-Post Warning</span>
            <textarea value={form.warn ?? ''} onChange={e => up('warn', e.target.value || undefined)} placeholder="Reminder before posting (testimonials, approvals...)" rows={2} className={IT} />
          </label>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 pt-4 border-t border-gray-100 space-y-2 sticky bottom-0 bg-white">
          <button onClick={() => { if (valid) { onSave(form); onClose() } }}
            className={`w-full py-3.5 rounded-xl font-black text-sm transition-all ${valid ? 'bg-[#FD5C1E] text-white hover:bg-[#e54d18]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
            {isNew ? 'Add Post' : 'Save Changes'}
          </button>
          {!isNew && onDelete && (
            <button onClick={() => { if (window.confirm('Delete this post? This cannot be undone.')) { onDelete(form.id); onClose() } }}
              className="w-full py-2.5 border border-red-100 text-red-400 rounded-xl font-bold text-sm hover:bg-red-50 transition-all">
              Delete Post
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── NoteArea ──────────────────────────────────────────────────────────────────
function NoteArea({ id, notes, saveNote }: { id: string; notes: Record<string, string>; saveNote: (id: string, t: string) => void }) {
  const [open, setOpen] = useState(false)
  const [val, setVal] = useState(notes[id] ?? '')
  useEffect(() => { setVal(notes[id] ?? '') }, [notes, id])
  const hasNote = !!(notes[id]?.trim())
  return (
    <div className="mt-3 pt-3 border-t border-gray-100">
      <button onClick={() => setOpen(o => !o)} className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors">
        <span className="text-sm">{hasNote ? '📝' : '+'}</span>
        {hasNote ? 'Team note' : 'Add team note'}
        {hasNote && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />}
      </button>
      {open && (
        <textarea value={val} onChange={e => { setVal(e.target.value); saveNote(id, e.target.value) }}
          placeholder="Shoot date, assigned to, approvals needed..."
          className="mt-2 w-full text-xs text-gray-700 leading-relaxed bg-amber-50 border border-amber-100 rounded-xl p-3 min-h-[72px] resize-none focus:outline-none focus:border-amber-300 placeholder-gray-300" />
      )}
    </div>
  )
}

// ── SetupBanner ───────────────────────────────────────────────────────────────
function SetupBanner() {
  const [dismissed, setDismissed] = useState(true)
  useEffect(() => { setDismissed(localStorage.getItem('joyn-setup-done') === '1') }, [])
  if (dismissed) return null
  return (
    <div className="bg-[#003882] border-b border-blue-900">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-5">
        <div className="flex items-start gap-6 flex-wrap">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-3">Before your first post — 4 things to action</p>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-2.5">
              {([
                ['Verify all promo codes', 'Confirm JOYN15 and any [ADD CODE] placeholders are active in your Shopify store'],
                ['Replace [Customer Name] placeholders', 'Posts 12 and 22 — click Edit Post and swap in real customers with permission'],
                ['Replace the doctor quote on Feb 15', 'Click Edit Post → use your real medical advisor\'s words with written approval'],
                ['Add your March posts', 'Use the + Add Post button on any day to build out next month\'s calendar'],
              ] as [string, string][]).map(([title, desc]) => (
                <div key={title} className="flex items-start gap-2">
                  <span className="text-[#FD5C1E] text-xs mt-0.5 shrink-0">→</span>
                  <p className="text-xs text-blue-100 leading-relaxed"><span className="font-bold text-white">{title}:</span> {desc}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => { localStorage.setItem('joyn-setup-done', '1'); setDismissed(true) }}
            className="text-blue-400 text-xs font-bold hover:text-white transition-colors whitespace-nowrap shrink-0 border border-blue-700 hover:border-blue-400 px-4 py-2 rounded-lg">
            Got it — hide this
          </button>
        </div>
      </div>
    </div>
  )
}

// ── static data ───────────────────────────────────────────────────────────────
const HASHTAGS = [
  { name: 'Education & Science', desc: 'For ALDH2 explainers, science content, health education', tags: '#ALDH2 #AlcoholFlush #ALDH2Deficiency #AsianGlow #FlushReaction #HealthTok #SupplementTok #GeneticHealth #HealthEducation #ScienceExplained #AlcoholMetabolism #MedicalFacts' },
  { name: 'AAPI Community', desc: 'For community content, cultural moments, relatable posts', tags: '#AsianAmerican #AAPI #AAPITikTok #AsianAmericanHealth #AsianGlow #EastAsian #AsianAmericanCommunity #AsianTikTok #AsianAmericanProblems #ALDH2 #CulturalHealth #AAPIVoices' },
  { name: 'Lifestyle & Celebration', desc: 'For lifestyle shots, events, nights out', tags: '#CelebrateFreely #ConfidenceInACapsule #FlushFree #NightOut #WeddingSeason #HappyHour #OpenBar #SocialWellness #NoMoreHiding #CelebrationReady #DateNight #GoodVibesOnly' },
  { name: 'Product & Brand', desc: 'For product shots, launch posts, announcements', tags: '#Joyn #JoynSupplement #WomanFounded #USAMade #NaturalSupplement #CleanSupplements #AlcoholFlushSupplement #ALDH2Support #ConfidenceInACapsule #FlushFree #WellnessSupplements' },
  { name: 'TikTok Reach Booster', desc: 'Add to any TikTok to maximize algorithmic reach', tags: '#HealthTok #SupplementTok #WellnessTok #LearnOnTikTok #HealthTips #TikTokMadeMeBuyIt #HealthyLiving #WellnessTips #FYP #ForYouPage #HealthTikTok #Wellness2026' },
  { name: 'Pinterest SEO', desc: 'Keyword phrases for pin descriptions — use these, not hashtags', tags: 'alcohol flush supplement, ALDH2 deficiency remedy, how to stop Asian glow, alcohol flush treatment, Asian flush natural remedy, supplement for alcohol flush, stop face turning red when drinking' },
]

const ADS = [
  { id:1, platform:'Meta', stage:'Awareness', hook: "Your face turns red when you drink. There's a genetic reason — and a real solution.", headline: 'Finally. A real solution for alcohol flush.', body: '600 million people have ALDH2 deficiency — the genetic reason your face turns red when you drink. For years, the only option was Pepcid AC, an antacid used off-label that damages your stomach. Joyn is the first supplement formulated specifically for ALDH2. Woman-founded. USA-made.', cta: 'Learn More', note: 'Target: Asian-American 21–40, wellness, social dining. CPM target <$10.' },
  { id:2, platform:'Meta', stage:'Conversion', hook: 'Stop hiding at celebrations. Start showing up fully.', headline: 'Confidence in a capsule. 15% off your first order.', body: "Joyn supports ALDH2 enzyme activity so you can show up fully — at weddings, work events, first dates, wherever. Take 2 capsules 30 min before drinking. Join thousands of customers living flush-free. Use code JOYN15.", cta: 'Shop Now — Code JOYN15', note: 'Retarget: 50%+ video viewers, site visitors, cart abandoners. CPA target <$35.' },
  { id:3, platform:'Meta', stage:'Retention', hook: 'Never run out. Never miss a celebration.', headline: 'Subscribe & Save 20% — free shipping every bottle.', body: "You've found your answer. Make sure you never run out. Joyn Subscribe & Save: 20% off every order, free shipping, cancel anytime. Confidence in a capsule, every month.", cta: 'Subscribe & Save', note: 'Target: past purchasers only. LTV target >$120.' },
  { id:4, platform:'TikTok', stage:'Awareness', hook: 'POV: You finally have a real answer to alcohol flush', headline: '600M people have ALDH2 deficiency. Joyn was built for them.', body: 'UGC-style. Creator holds Joyn bottle, explains ALDH2 in 15s, cuts to event scene looking confident. Text overlay: "ALDH2 → Alcohol Flush → JOYN." End card: "Link in bio — use code TIKTOK15"', cta: 'Link in Bio — Code TIKTOK15', note: 'In-Feed + Spark Ads on organic posts with >3% engagement. Daily budget: $50–100/day.' },
]

const COLORS = [
  { name: 'Joyn Orange', hex: '#FD5C1E', use: 'CTAs, hero, energy' },
  { name: 'Joyn Red',    hex: '#D72C0D', use: 'Urgency, gradients' },
  { name: 'Navy',        hex: '#003882', use: 'Trust, authority' },
  { name: 'Sky Blue',    hex: '#87ADEF', use: 'Soft accent' },
  { name: 'Cream',       hex: '#FFF8F4', use: 'Page backgrounds' },
  { name: 'Dark',        hex: '#0D0D0D', use: 'Primary text' },
]

const TAGLINES = [
  { line: 'Confidence in a capsule.',              note: 'Primary — use everywhere' },
  { line: 'Reshape the way you celebrate.',        note: 'Brand mission statement' },
  { line: 'Red wine. Not red face.',               note: 'TikTok hooks, short-form' },
  { line: 'More confident nights, brighter mornings.', note: 'Full benefit arc' },
  { line: 'Confidence you can see. Redness you cannot.', note: 'Visual contrast ads' },
  { line: 'Celebrate without limits.',             note: 'Campaign tagline' },
]

// ── page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  // ── state ─────────────────────────────────────────────────────────────────
  const [now,         setNow]         = useState<Date | null>(null)
  const [posts,       setPosts]       = useState<Post[]>([])
  const [posted,      setPosted]      = useState<Set<string>>(new Set())
  const [notes,       setNotes]       = useState<Record<string, string>>({})
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [addingPost,  setAddingPost]  = useState<Post | null>(null)
  const [viewMonth,   setViewMonth]   = useState({ year: 2026, month: 1 })
  const [selDate,     setSelDate]     = useState<string | null>(null)
  const [pf,          setPf]          = useState<PF>('All')
  const [hidePosted,  setHidePosted]  = useState(false)
  const [search,      setSearch]      = useState('')

  // ── init ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const n = new Date()
    setNow(n)
    setViewMonth({ year: n.getFullYear(), month: n.getMonth() })
    try {
      // posts
      const sp = localStorage.getItem('joyn-posts-v2')
      setPosts(sp ? JSON.parse(sp) : SEED)
      // posted
      const sv = localStorage.getItem('joyn-posted')
      if (sv) setPosted(new Set(JSON.parse(sv).map(String)))
      // notes
      const sn = localStorage.getItem('joyn-notes')
      if (sn) setNotes(JSON.parse(sn))
    } catch {
      setPosts(SEED)
    }
  }, [])

  // ── post CRUD ─────────────────────────────────────────────────────────────
  const savePosts = (next: Post[]) => {
    setPosts(next)
    localStorage.setItem('joyn-posts-v2', JSON.stringify(next))
  }
  const updatePost = (p: Post) => savePosts(posts.map(x => x.id === p.id ? p : x))
  const deletePost = (id: string) => savePosts(posts.filter(x => x.id !== id))
  const addPost    = (p: Post) => savePosts([...posts, { ...p, id: newId() }].sort((a, b) => a.date.localeCompare(b.date)))

  const togglePosted = (id: string) => {
    setPosted(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      localStorage.setItem('joyn-posted', JSON.stringify(Array.from(next)))
      return next
    })
  }

  const saveNote = (id: string, text: string) => {
    const next = { ...notes, [id]: text }
    setNotes(next)
    localStorage.setItem('joyn-notes', JSON.stringify(next))
  }

  // ── derived date values ───────────────────────────────────────────────────
  const todayStr = now ? nowDateStr(now) : ''
  const todayPosts = posts.filter(p => p.date === todayStr)
  const upcomingPosts = now ? posts
    .filter(p => p.date > todayStr && p.date <= addDays(todayStr, 6))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5) : []
  const totalPosted  = posted.size
  const totalPosts   = posts.length
  const noteCount    = Object.values(notes).filter(n => n.trim()).length

  // ── calendar ──────────────────────────────────────────────────────────────
  const { year: calYear, month: calMonth } = viewMonth
  const daysInMo  = new Date(calYear, calMonth + 1, 0).getDate()
  const firstDay  = new Date(calYear, calMonth, 1).getDay()
  const monthLabel = `${MONTH_NAMES[calMonth]} ${calYear}`
  const prevMonth = () => setViewMonth(m => m.month === 0  ? { year: m.year - 1, month: 11 } : { year: m.year, month: m.month - 1 })
  const nextMonth = () => setViewMonth(m => m.month === 11 ? { year: m.year + 1, month: 0  } : { year: m.year, month: m.month + 1 })
  const calDayStr = (d: number) => toDateStr(calYear, calMonth, d)
  const monthPosts = posts.filter(p => {
    const [y, m] = p.date.split('-').map(Number)
    return y === calYear && m - 1 === calMonth
  })
  const selPosts = selDate ? posts.filter(p => p.date === selDate) : []
  const totalCells = Math.ceil((firstDay + daysInMo) / 7) * 7

  // ── caption library ───────────────────────────────────────────────────────
  const filteredLib = posts
    .filter(p => pf === 'All' || p.platform === pf)
    .filter(p => !hidePosted || !posted.has(p.id))
    .filter(p => !search || [p.hook, p.caption].some(t => t.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => a.date.localeCompare(b.date))

  // ── blank post for "Add Post" ─────────────────────────────────────────────
  const blankPost = (date?: string): Post => ({
    id: '', date: date ?? todayStr, platform: 'TikTok', format: '', hook: '', shoot: '', caption: '',
  })

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#fafafa]">

      {/* Modals */}
      {editingPost && (
        <PostEditor post={editingPost} onSave={updatePost} onDelete={deletePost}
          onClose={() => setEditingPost(null)} />
      )}
      {addingPost && (
        <PostEditor post={addingPost} onSave={addPost} isNew
          onClose={() => setAddingPost(null)} />
      )}

      <SetupBanner />

      {/* ── TODAY ──────────────────────────────────────────────────────── */}
      <section id="today" className="section-anchor border-b border-gray-100">

        {/* Stats bar */}
        <div className="bg-white border-b border-gray-100 px-6 lg:px-16 py-5">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-[10px] font-black text-[#FD5C1E] uppercase tracking-[0.2em] mb-1">Today</p>
              <h1 className="text-2xl lg:text-3xl font-black text-[#0a0a0a] leading-none">
                {now ? `${['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][now.getDay()]}, ${MONTH_NAMES[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}` : '—'}
              </h1>
            </div>
            <div className="flex items-center gap-5 flex-wrap">
              {noteCount > 0 && (
                <div className="text-right">
                  <div className="text-xl font-black text-[#003882]">{noteCount}</div>
                  <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">notes</div>
                </div>
              )}
              <div className="text-right">
                <div className="text-xl font-black text-[#0a0a0a]">{totalPosted}<span className="text-sm text-gray-300 font-normal">/{totalPosts}</span></div>
                <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">published</div>
              </div>
              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#FD5C1E] rounded-full transition-all duration-500"
                  style={{ width: totalPosts ? `${(totalPosted / totalPosts) * 100}%` : '0%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Posts for today */}
        <div className="px-6 lg:px-16 py-8">
          <div className="max-w-screen-xl mx-auto">

            {todayPosts.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center mb-6">
                {now ? (
                  <>
                    <p className="text-lg font-black text-[#0a0a0a] mb-2">No posts scheduled today.</p>
                    <p className="text-gray-400 text-sm mb-4">Use the calendar below to see what&apos;s coming up, or add a post for today.</p>
                    <button onClick={() => setAddingPost(blankPost(todayStr))}
                      className="bg-[#FD5C1E] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#e54d18] transition-all">
                      + Add Post for Today
                    </button>
                  </>
                ) : (
                  <p className="text-gray-400">Loading...</p>
                )}
              </div>
            )}

            <div className="space-y-4">
              {todayPosts.map(p => (
                <div key={p.id}
                  className={`bg-white rounded-2xl border-l-4 border overflow-hidden transition-all ${posted.has(p.id) ? 'border-l-green-400 border-green-100 opacity-60' : 'border-gray-100'}`}
                  style={!posted.has(p.id) ? { borderLeftColor: PC[p.platform] } : undefined}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4 gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Plat p={p.platform} />
                        {p.format && <span className="text-xs font-semibold text-gray-400">{p.format}</span>}
                        {notes[p.id]?.trim() && <span className="text-[10px] font-black text-[#003882] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wide">Has note</span>}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => setEditingPost(p)} className="text-xs font-bold text-gray-400 hover:text-[#FD5C1E] transition-colors px-2 py-1 border border-gray-200 rounded-lg hover:border-[#FD5C1E]">Edit Post</button>
                        <PostedBtn id={p.id} posted={posted} toggle={togglePosted} />
                      </div>
                    </div>
                    <h2 className="text-xl lg:text-2xl font-black text-[#0a0a0a] mb-3 leading-tight">&ldquo;{p.hook}&rdquo;</h2>
                    <ShootBrief text={p.shoot} />
                    <WarnBanner warn={p.warn} promoCode={p.promoCode} />
                    <div className="mt-4">
                      <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-100">{p.caption}</div>
                      <div className="mt-3">
                        <CopyFull text={p.caption} />
                      </div>
                    </div>
                    <NoteArea id={p.id} notes={notes} saveNote={saveNote} />
                  </div>
                </div>
              ))}
            </div>

            {/* Up Next */}
            {upcomingPosts.length > 0 && (
              <div className="mt-8">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Coming up</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {upcomingPosts.map(u => (
                    <button key={u.id}
                      onClick={() => { setSelDate(u.date); setViewMonth({ year: parseInt(u.date.slice(0,4)), month: parseInt(u.date.slice(5,7))-1 }); document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' }) }}
                      className="bg-white rounded-xl border border-gray-100 p-4 text-left hover:border-[#FD5C1E] transition-all group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black text-gray-400">{formatDisplayDate(u.date).slice(0,-6)}</span>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PC[u.platform] }} />
                      </div>
                      <p className="text-xs font-bold text-[#0a0a0a] leading-snug group-hover:text-[#FD5C1E] transition-colors line-clamp-2">{u.hook}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CALENDAR ───────────────────────────────────────────────────── */}
      <section id="calendar" className="section-anchor px-6 lg:px-16 py-16 bg-[#FFF8F4] border-b border-orange-100">
        <div className="max-w-screen-xl mx-auto">

          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-xs font-black text-[#FD5C1E] uppercase tracking-[0.2em] mb-2">Content Calendar</p>
              <div className="flex items-center gap-3">
                <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-orange-100 hover:border-[#FD5C1E] text-gray-500 hover:text-[#FD5C1E] transition-all text-lg">‹</button>
                <h2 className="text-3xl font-black text-[#0a0a0a]">{monthLabel}</h2>
                <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-orange-100 hover:border-[#FD5C1E] text-gray-500 hover:text-[#FD5C1E] transition-all text-lg">›</button>
                {now && (calYear !== now.getFullYear() || calMonth !== now.getMonth()) && (
                  <button onClick={() => setViewMonth({ year: now.getFullYear(), month: now.getMonth() })}
                    className="text-xs font-bold text-[#FD5C1E] hover:underline">Today</button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {Object.entries({ TikTok: '#FD5C1E', Instagram: '#E1306C', Pinterest: '#E60023' }).map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v }} />{k}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm">
            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-orange-50">
              {DAY_NAMES.map(d => (
                <div key={d} className="py-3 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{d}</div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {Array.from({ length: totalCells }, (_, i) => {
                const dayNum = i - firstDay + 1
                const isValid = dayNum >= 1 && dayNum <= daysInMo
                const ds = isValid ? calDayStr(dayNum) : ''
                const dayPosts = isValid ? monthPosts.filter(p => p.date === ds) : []
                const isToday = ds === todayStr
                const isSel   = ds === selDate
                const allDone = dayPosts.length > 0 && dayPosts.every(p => posted.has(p.id))
                return (
                  <div key={i} className={`min-h-[88px] border-b border-r border-orange-50 last:border-r-0 transition-all ${isValid ? (isSel ? 'ring-2 ring-inset ring-[#FD5C1E]' : '') : 'bg-gray-50/30'}`}>
                    {isValid && (
                      <button className={`w-full h-full p-2.5 text-left ${isToday ? 'bg-orange-50/60' : 'hover:bg-orange-50/40'} transition-all`}
                        onClick={() => setSelDate(ds === selDate ? null : ds)}>
                        <div className={`text-xs font-black mb-1.5 flex items-center gap-1.5 ${isToday ? 'text-[#FD5C1E]' : 'text-gray-300'}`}>
                          {dayNum}
                          {isToday && <span className="text-[9px] bg-[#FD5C1E] text-white px-1.5 py-0.5 rounded font-black leading-none">TODAY</span>}
                          {allDone && <span className="text-[9px] bg-green-500 text-white px-1.5 py-0.5 rounded font-black leading-none">✓</span>}
                        </div>
                        <div className="space-y-0.5">
                          {dayPosts.map(dp => (
                            <div key={dp.id} className="flex items-start gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-[3px] ${posted.has(dp.id) ? 'opacity-30' : ''}`}
                                style={{ backgroundColor: PC[dp.platform] }} />
                              <span className={`text-[10px] leading-tight line-clamp-2 ${posted.has(dp.id) ? 'text-gray-300 line-through' : 'text-gray-500'}`}>{dp.hook}</span>
                            </div>
                          ))}
                        </div>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Add Post CTA below calendar */}
          <div className="mt-3 flex justify-end">
            <button onClick={() => setAddingPost(blankPost(selDate ?? todayStr))}
              className="flex items-center gap-2 text-sm font-bold text-[#FD5C1E] hover:underline">
              + Add Post
            </button>
          </div>

          {/* Expanded day */}
          {selDate && (
            <div className="mt-4 bg-white border-2 border-[#FD5C1E] rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-orange-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="font-black text-[#0a0a0a] text-lg">{formatDisplayDate(selDate)}</h3>
                  {selDate === todayStr && <span className="text-xs bg-[#FD5C1E] text-white px-2.5 py-0.5 rounded-full font-black">TODAY</span>}
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setAddingPost(blankPost(selDate))}
                    className="text-xs font-bold text-[#FD5C1E] border border-orange-200 hover:border-[#FD5C1E] px-3 py-1.5 rounded-lg transition-all">
                    + Add Post
                  </button>
                  <button onClick={() => setSelDate(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors text-lg">×</button>
                </div>
              </div>

              {selPosts.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-400 text-sm mb-4">No posts scheduled for {formatDisplayDate(selDate)}.</p>
                  <button onClick={() => setAddingPost(blankPost(selDate))}
                    className="bg-[#FD5C1E] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#e54d18] transition-all">
                    + Add Post for This Day
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-orange-50">
                  {selPosts.map(p => (
                    <div key={p.id} className="p-6">
                      <div className="flex items-center justify-between mb-4 gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Plat p={p.platform} />
                          {p.format && <span className="text-xs text-gray-400 font-semibold">{p.format}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setEditingPost(p)} className="text-xs font-bold text-gray-400 hover:text-[#FD5C1E] border border-gray-200 hover:border-[#FD5C1E] px-2 py-1 rounded-lg transition-all">Edit</button>
                          <PostedBtn id={p.id} posted={posted} toggle={togglePosted} />
                        </div>
                      </div>
                      <h4 className="font-black text-[#0a0a0a] text-base mb-3 leading-snug">&ldquo;{p.hook}&rdquo;</h4>
                      <ShootBrief text={p.shoot} />
                      <WarnBanner warn={p.warn} promoCode={p.promoCode} />
                      <div className="mt-4">
                        <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed bg-gray-50 rounded-xl p-4 mb-3">{p.caption}</div>
                        <CopyFull text={p.caption} />
                      </div>
                      <NoteArea id={p.id} notes={notes} saveNote={saveNote} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── CAPTION LIBRARY ─────────────────────────────────────────────── */}
      <section id="captions" className="section-anchor px-6 lg:px-16 py-16 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end justify-between mb-2 flex-wrap gap-4">
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Caption Library</p>
              <h2 className="text-4xl font-black text-[#0a0a0a]">{totalPosts} captions. All editable.</h2>
            </div>
            <button onClick={() => setAddingPost(blankPost())}
              className="bg-[#FD5C1E] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#e54d18] transition-all whitespace-nowrap">
              + Add Post
            </button>
          </div>
          <p className="text-gray-400 text-base mb-6">Click Edit Post on any card to change anything — date, platform, caption, everything. Changes save to your browser.</p>

          {/* Search + Filters */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-3">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search captions by hook or copy..."
              className="flex-1 text-sm text-gray-700 placeholder-gray-300 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FD5C1E] transition-colors" />
            <div className="flex items-center gap-2 flex-wrap">
              {(['All', 'TikTok', 'Instagram', 'Pinterest'] as const).map(f => (
                <button key={f} onClick={() => setPf(f)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${pf === f ? 'bg-[#0a0a0a] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                  {f}
                </button>
              ))}
              <div className="w-px h-4 bg-gray-200" />
              <button onClick={() => setHidePosted(h => !h)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${hidePosted ? 'bg-[#FD5C1E] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {hidePosted ? 'Unposted only' : 'Hide posted'}
              </button>
              <span className="text-xs text-gray-400 font-semibold">{filteredLib.length} shown</span>
            </div>
          </div>

          {filteredLib.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg font-bold mb-2">No captions match.</p>
              <button onClick={() => { setSearch(''); setPf('All') }} className="text-sm text-[#FD5C1E] hover:underline">Clear filters</button>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-5">
            {filteredLib.map(cap => (
              <div key={cap.id} className={`bg-white rounded-2xl border-l-4 border overflow-hidden flex flex-col transition-all ${posted.has(cap.id) ? 'border-l-green-400 border-green-100 opacity-50' : 'border-gray-100 hover:border-gray-200'}`}
                style={!posted.has(cap.id) ? { borderLeftColor: PC[cap.platform] } : undefined}>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Plat p={cap.platform} />
                      <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{formatDisplayDate(cap.date)}</span>
                      {cap.format && <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{cap.format}</span>}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => setEditingPost(cap)} className="text-[10px] font-bold text-gray-400 hover:text-[#FD5C1E] border border-gray-200 hover:border-[#FD5C1E] px-2 py-1 rounded-lg transition-all">Edit</button>
                      <PostedBtn id={cap.id} posted={posted} toggle={togglePosted} />
                    </div>
                  </div>
                  <h3 className="font-black text-[#0a0a0a] text-sm leading-snug mb-3">&ldquo;{cap.hook}&rdquo;</h3>
                  {cap.shoot && <ShootBrief text={cap.shoot} />}
                  <WarnBanner warn={cap.warn} promoCode={cap.promoCode} />
                  <div className="mt-3 flex-1 text-sm text-gray-600 whitespace-pre-line leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-100">{cap.caption}</div>
                  <div className="mt-3">
                    <CopyFull text={cap.caption} />
                  </div>
                  <NoteArea id={cap.id} notes={notes} saveNote={saveNote} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HASHTAGS ────────────────────────────────────────────────────── */}
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
                      {raw.slice(0, 8).map(t => (
                        <span key={t.trim()} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full font-mono">{t.trim()}</span>
                      ))}
                      {raw.length > 8 && <span className="text-xs text-gray-400 self-center">+{raw.length - 8} more</span>}
                    </div>
                  </div>
                  <div className="px-5 pb-5"><CopyAll text={set.tags} /></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── ADS ─────────────────────────────────────────────────────────── */}
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

      {/* ── BRAND ───────────────────────────────────────────────────────── */}
      <section id="brand" className="section-anchor px-6 lg:px-16 py-16">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Brand Kit</p>
          <h2 className="text-4xl font-black text-[#0a0a0a] mb-12">How Joyn looks. How Joyn sounds.</h2>
          <div className="grid lg:grid-cols-3 gap-12">

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
            <div className="text-white font-black">JOYN · Social Playbook</div>
            <div className="text-gray-600 text-xs mt-1">{totalPosts} posts · all platforms · copy-ready · editable · saves to your browser</div>
          </div>
          <div className="flex items-center gap-5">
            <button onClick={() => { if (window.confirm('Reset all data to defaults? This will delete any custom posts, edits, and progress.')) { localStorage.clear(); window.location.reload() } }}
              className="text-gray-600 text-xs font-semibold hover:text-gray-400 transition-colors">
              Reset all data
            </button>
            <a href="https://www.joynthefun.com" target="_blank" rel="noopener noreferrer"
              className="text-[#FD5C1E] text-sm font-bold hover:underline">
              joynthefun.com ↗
            </a>
          </div>
        </div>
      </footer>

    </main>
  )
}
