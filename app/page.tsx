'use client'
import { useState, useEffect, useRef, useReducer } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const EASE = [0.22, 1, 0.36, 1] as const

// ── constants ─────────────────────────────────────────────────────────────────
const DAY_NAMES   = ['S','M','T','W','T','F','S']
const DAY_FULL    = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
const PC:       Record<string, string> = { TikTok: '#FD5C1E', Instagram: '#E1306C', Pinterest: '#E60023' }
const PC_LIGHT: Record<string, string> = { TikTok: '#fff4f0', Instagram: '#fdf2f8', Pinterest: '#fff1f2' }
const PC_BORDER:Record<string, string> = { TikTok: '#fdc9b0', Instagram: '#fbb6ce', Pinterest: '#fecaca' }

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
  promo_code?: string
  is_posted: boolean
  note: string
}
type DbRow = Post & { created_at?: string; updated_at?: string }

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
function dbToPost(row: DbRow): Post {
  return {
    id: row.id, date: row.date, platform: row.platform as Platform,
    format: row.format, hook: row.hook, shoot: row.shoot, caption: row.caption,
    warn: row.warn ?? undefined, promo_code: row.promo_code ?? undefined,
    is_posted: row.is_posted ?? false, note: row.note ?? '',
  }
}

// ── seed data ─────────────────────────────────────────────────────────────────
const SEED: Post[] = [
  { id:'1',  date:'2026-02-20', platform:'Instagram', format:'Announcement Post',       is_posted:false, note:'', hook:"We're live. 600 million people have been waiting for this.", shoot:'Founder photo or product flat lay on warm Joyn orange surface. This is your launch post — keep it personal and real, not overly produced.', caption:"We're live. 🧡\n\n600 million people have been waiting for this.\n\nJoyn is the first supplement formulated specifically for ALDH2 deficiency — the genetic reason 1 in 3 East Asians (and millions more) turn red when they drink.\n\nWoman-founded. USA-made. Third-party tested.\n\nIf you've ever left a party early, skipped a toast, or felt embarrassed at a happy hour — this is for you.\n\nDrop a 🧡 if you've been waiting for something like this.\n\n#Joyn #ConfidenceInACapsule #ALDH2 #AlcoholFlush #WomanFounded #Launch #NewBrand" },
  { id:'2',  date:'2026-02-21', platform:'TikTok',    format:'Educational Hook',        is_posted:false, note:'', hook:'Why your face turns red when you drink — the genetic truth nobody told you', shoot:'Green screen with ALDH2 enzyme diagram. Keep under 60s. This is your hero education post — high save + share rate. It blows up.', caption:"Why your face turns red when you drink — the genetic truth nobody told you 🧬\n\nIt's called ALDH2 deficiency. 1 in 3 East Asians carry the gene. 600 million people worldwide.\n\nHere's what happens:\n→ You drink alcohol\n→ Your body converts it to acetaldehyde (toxic)\n→ ALDH2 deficiency = your body can't break it down fast enough\n→ Acetaldehyde builds up → redness, racing heart, nausea\n\nThe \"fix\" people use? Pepcid AC. An antacid. Off-label. Damages your stomach.\n\nWe built Joyn — the first supplement designed specifically for ALDH2 deficiency.\n\nDrop \"flush\" in the comments and I'll DM you the link 👇\n\n#ALDH2 #AlcoholFlush #AsianGlow #HealthTok #SupplementTok #GeneticHealth #Joyn" },
  { id:'3',  date:'2026-02-22', platform:'Instagram', format:'Carousel (6 slides)',      is_posted:false, note:'', hook:'Save this. Share it with someone who needs it. 📌', shoot:'Slide 1: bold hook on Joyn orange bg. Slides 2–5: one ALDH2 fact each on clean white. Slide 6: CTA + discount code. No fancy design needed — clear > pretty.', caption:"Save this. Share it with someone who needs it. 📌\n\nALDH2 deficiency affects 600 million people — yet most people have never heard of it.\n\n1 in 3 East Asians carry the gene. Millions more across all backgrounds.\n\nFor years, the \"solution\" was Pepcid AC — an antacid, off-label, that damages your stomach.\n\nJoyn is the first supplement formulated specifically for ALDH2 deficiency.\nNot a mask. A real answer for real biology.\n\nWoman-founded. USA-made. Third-party tested.\n\n→ Link in bio 🧡\n\n#ALDH2 #AlcoholFlush #AsianGlow #Joyn #HealthEducation #WomanFounded #ConfidenceInACapsule #AAPI" },
  { id:'4',  date:'2026-02-23', platform:'TikTok',    format:'Relatable List',           is_posted:false, note:'', hook:'Things people with Asian flush relate to (a thread) 😭', shoot:'Text list on screen, trending audio, react to each one. High comment + share format. Ask viewers to drop their most relatable one.', caption:"Things people with Asian flush relate to (a thread) 😭\n\n✗ \"One drink and my face looks like a tomato\"\n✗ Googling \"alcohol flush remedy\" for the 100th time\n✗ Ordering club soda at work happy hours\n✗ Leaving parties before the toast\n✗ Taking Pepcid and worrying about your stomach\n✗ Someone asking \"are you OK?\" when you're just having fun\n✗ Skipping champagne at your own celebration\n\nNone of us signed up for this.\nBut now there's actually a real answer.\n\nJoyn — the first supplement formulated for ALDH2.\n\nComment your most relatable one 👇 I read every comment\n\n#AsianGlow #ALDH2 #AlcoholFlush #AsianAmericanProblems #Joyn #FlushReaction" },
  { id:'5',  date:'2026-02-24', platform:'TikTok',    format:'First-Person Story',       is_posted:false, note:'', hook:"I tried Joyn at my work happy hour and I'm still processing 😭", shoot:'Selfie cam. Casual, conversational — sitting in a car or at home. No script. Could also be voiceover over office/bar B-roll.', caption:"I tried Joyn at my work happy hour and I'm still processing 😭\n\nI've worked at this company for 3 years. I've never had more than one drink at work events.\n\nNot because I don't want to. Because two drinks and my face looks like a fire alarm.\n\nTuesday: took 2 Joyn capsules 30 min before. Had two glasses of wine. Stayed for 2+ hours.\n\nMy manager said \"you seem more relaxed lately.\"\n\nI didn't tell him why. I didn't have to.\n\n#Joyn #WorkHappyHour #ALDH2 #AlcoholFlush #HealthTok #ConfidenceInACapsule" },
  { id:'6',  date:'2026-02-25', platform:'TikTok',    format:'Short Hook',               is_posted:false, note:'', promo_code:'JOYN15', hook:'Red wine. Not red face. 🍷', shoot:'Short, punchy — under 20 seconds. B-roll of someone enjoying wine at dinner, looking relaxed. Text overlay only. No voiceover needed.', caption:"Red wine. Not red face. 🍷\n\nThe thing about ALDH2 deficiency is that it's not about how much you drink.\n\nOne glass of rosé and your face betrays you — because your body processes acetaldehyde slower than it should.\n\nJoyn supports ALDH2 enzyme activity so your body can actually do its job.\n\nTwo capsules. Thirty minutes. That's it.\n\nUse code JOYN15 → link in bio 🧡\n\n#Joyn #RedWine #ALDH2 #AlcoholFlush #ConfidenceInACapsule #FlushFree" },
  { id:'7',  date:'2026-02-26', platform:'Instagram', format:'Q&A Prompt',               is_posted:false, note:'', hook:'Drop your questions about alcohol flush and Joyn below 👇', shoot:'Simple post — Joyn orange background or casual founder photo. Goal is engagement, not aesthetics. Also post a Story asking the same question.', caption:"Drop your questions about alcohol flush and Joyn below 👇\n\nWe're doing a full Q&A this weekend — no question is too basic, no question is too scientific.\n\nWe want to know:\n→ When did you first notice the flush?\n→ What have you tried before?\n→ What do you want to know about Joyn?\n\nEverything gets answered. Every story gets heard.\n\nThis community is what we built Joyn for. 🧡\n\n#Joyn #QandA #ALDH2 #AlcoholFlush #Community #AskUsAnything" },
  { id:'8',  date:'2026-02-27', platform:'TikTok',    format:'Tier List',                is_posted:false, note:'', hook:'Rating every alcohol flush "cure" from worst to best (HONEST)', shoot:'On-screen tier list with comedic reaction to each. Fast cuts. Highly shareable — built for saves. Be honest, including about Joyn.', caption:"Rating every alcohol flush \"cure\" from worst to best — be honest, you've tried most of these 😅\n\n❌ 5/10 — Cold water on face. Reduces redness for 2 minutes.\n❌ 4/10 — Eating a huge meal first. Slows absorption, doesn't fix flush.\n❌ 3/10 — Antihistamines. Makes you drowsy, doesn't help acetaldehyde.\n⚠️ 2/10 — Pepcid off-label. Masks the symptom, real stomach risks.\n❌ 1/10 — Just stop drinking. OK sure, thanks.\n✅ 9/10 — Joyn. Actually formulated for ALDH2 enzyme activity. First of its kind.\n\nMinus 1 because nothing is perfect and I'm honest.\n\nLink in bio.\n\n#AlcoholFlush #AsianGlow #ALDH2 #Joyn #HealthTok #FlushRemedies" },
  { id:'9',  date:'2026-02-28', platform:'TikTok',    format:'Before / After',           is_posted:false, note:'', hook:'Before Joyn vs. After Joyn: The honest version 🔄', shoot:'Split screen or alternating text cards. Keep it real and grounded — no over-the-top claims. The truth is compelling enough.', caption:"Before Joyn vs. After Joyn: The honest version 🔄\n\nBefore:\n→ One drink = watching the clock\n→ Happy hours = sparkling water and excuses\n→ Weddings = the person who left at 9pm\n→ First dates = counting sips\n→ Work events = strategic avoidance\n\nAfter:\n→ The full glass\n→ The second toast\n→ The 1am table at the reception\n→ Actually tasting the wine\n→ Being present for it\n\n600 million people have ALDH2 deficiency. Most of them don't know it yet.\n\nDrop \"flush\" in the comments and I'll DM you the link 👇\n\n#Joyn #BeforeAndAfter #ALDH2 #AlcoholFlush #HealthTok #ConfidenceInACapsule" },
  { id:'10', date:'2026-03-01', platform:'TikTok',    format:'Educational Warning',      is_posted:false, note:'', hook:"Pepcid for alcohol flush? Your doctor probably doesn't know this 😳", shoot:'Calm, credible delivery. Show Reddit thread screenshots as B-roll. This one gets shared wildly — doctors will share it too.', caption:"Pepcid for alcohol flush? Your doctor probably doesn't know this 😳\n\nMillions of people use H2 blockers (Pepcid, Zantac) off-label to reduce flush.\n\nHere's the problem:\n→ They block histamine — masking the red face symptom\n→ They DON'T help your body break down acetaldehyde\n→ Long-term: stomach ulcers, reduced acid, dependency\n→ Never tested or approved for this purpose\n\nAnd yet it's the #1 advice on Reddit and TikTok.\n\nJoyn works differently. Supports ALDH2 enzyme activity — so your body actually processes the acetaldehyde instead of just hiding it.\n\nIf this helped, share it. Link in bio 🙏\n\n#AlcoholFlush #Pepcid #ALDH2 #AsianGlow #HealthTok #DrinkingTips #Joyn" },
  { id:'11', date:'2026-03-02', platform:'TikTok',    format:'Lifestyle Story',          is_posted:false, note:'', hook:'Open bar at a wedding with zero anxiety 💒', shoot:'Cinematic clips from a wedding or a night out — toasts, dancing, being present. Voiceover or text overlay. Pure aspiration.', caption:"Open bar at a wedding with zero anxiety 💒\n\nYou know the wedding mental math:\n→ Getting seated next to people you just met\n→ Champagne toast coming\n→ Choosing between looking rude (not drinking) or turning red (drinking)\n\nThis weekend: Joyn before the ceremony. Open bar, 4+ hours, multiple toasts, dancing.\n\nZero flush. Zero hiding. Zero mental math.\n\nI was just there. Fully.\n\n#Joyn #WeddingSeason #OpenBar #ALDH2 #AlcoholFlush #ConfidenceInACapsule" },
  { id:'12', date:'2026-03-03', platform:'Instagram', format:'Quote Card',               is_posted:false, note:'', promo_code:'[ADD LAUNCH CODE]', warn:'Template post — replace every [placeholder] with a real verified customer before posting. Get explicit written permission. Never post fabricated testimonials.', hook:'"[Customer quote — their own words, their own moment.]" — [Name, Age]', shoot:'Clean quote card on Joyn orange background. Or a warm candid celebration photo with the quote overlaid. Let the real quote do all the work.', caption:"\"[Customer quote — their own words, their own moment.]\" — [Name, Age] 🥂\n\n[1–2 sentences: their background. What they struggled with. How long they lived with it.]\n\n[Their Joyn moment — one specific real detail. Real event. Real time. Real feeling.]\n\nThat's why we built this.\n\nReal review. Real customer.\n\n→ Link in bio. Use code [ADD LAUNCH CODE] for 15% off.\n\n#Joyn #CustomerStory #ALDH2 #AlcoholFlush #ConfidenceInACapsule #Testimonial" },
  { id:'13', date:'2026-03-04', platform:'Instagram', format:"Women's History Month",    is_posted:false, note:'', promo_code:'[ADD CODE]', hook:"Woman-founded. For the 600M who've been hiding. 💛", shoot:"Founder to camera or a clean brand graphic. Women's History Month energy — but make it genuine, not performative. This is your brand story moment.", caption:"Woman-founded. For the 600M who've been hiding. 💛\n\nWomen's History Month isn't about a discount.\nIt's about who built this — and why.\n\nA woman with ALDH2 deficiency. A woman who spent years hiding her face at dinner. A woman who decided the 600 million people being ignored deserved a real solution.\n\nJoyn exists because of that moment.\n\nThis month — celebrate freely.\n\n→ Link in bio. Use code [ADD CODE] for 25% off.\n\n#WomensHistoryMonth #WomanFounded #ALDH2 #AlcoholFlush #Joyn #ConfidenceInACapsule #ForThe600M" },
  { id:'14', date:'2026-03-05', platform:'Instagram', format:'Spring Season Post',       is_posted:false, note:'', promo_code:'[ADD CODE]', hook:'Spring is here. So is your confidence. 🌸', shoot:"Bright outdoor aesthetic — patio, first warm day, friends at a rooftop bar. Natural light, layered looks, that first-day-of-spring energy.", caption:"Spring is here. So is your confidence. 🌸\n\nPatio season is back.\n\nThe rooftop bars. The afternoon rosé. The \"let's grab a drink outside\" texts.\n\nAnd for the first time — you're showing up fully.\n\nNo counting drinks. No watching your face in the phone camera. No making excuses to leave early.\n\nTwo capsules. Thirty minutes. Enjoy every minute of it.\n\nThis spring is different. 🧡\n\nUse code [ADD CODE] → link in bio\n\n#Joyn #SpringSeason #ALDH2 #AlcoholFlush #ConfidenceInACapsule #PatioSeason" },
  { id:'15', date:'2026-03-06', platform:'TikTok',    format:'Expert Review',            is_posted:false, note:'', warn:"Template post — replace with a real medical advisor's actual words. Get written sign-off before publishing. Never fabricate expert endorsements — this is an FTC violation.", hook:"Asked a doctor to review Joyn — here's what she said 🩺", shoot:'Credible, calm delivery to camera. No lab coat required. Could be voiceover with ingredient text on screen. Do NOT be salesy — let the science speak.', caption:"Asked a doctor to review Joyn — here's what she said 🩺\n\nWe sent our full formula to [Dr. Name, Credentials — e.g. \"Dr. Jane Park, MD, metabolic health\"].\n\nHer response:\n\n\"[Direct quote — her own words. Get written approval before publishing.]\"\n\nWe're not a drug. We're not medical advice. But we are built on real science.\n\nFull formula breakdown → link in bio 🔬\n\n#Joyn #DoctorReview #ALDH2 #HealthTok #SupplementTok #Science #AlcoholFlush" },
  { id:'16', date:'2026-03-07', platform:'Instagram', format:'Carousel (6 slides)',      is_posted:false, note:'', hook:'ALDH2 deficiency — the complete breakdown 🧬', shoot:'Clean educational carousel. Slide 1: bold hook on Joyn orange. Slides 2-5: one fact each. Slide 6: Joyn CTA. White + orange palette. Save rate will be high.', caption:"ALDH2 deficiency — the complete breakdown 🧬\n\nSave this. Share it with someone who's been told \"just take Pepcid.\"\n\nHere's everything your doctor probably never told you:\n\n→ What ALDH2 is and why it matters\n→ Why 1 in 3 East Asians carry the gene\n→ What actually happens in your body when you flush\n→ Why Pepcid is the wrong answer\n→ What Joyn does differently\n\n600 million people deserve to understand their own biology.\n\n→ Link in bio 🧡\n\n#ALDH2 #AlcoholFlush #AsianGlow #HealthEducation #Joyn #ConfidenceInACapsule #SaveThis" },
  { id:'17', date:'2026-03-08', platform:'TikTok',    format:"International Women's Day", is_posted:false, note:'', hook:"International Women's Day. This one is personal.", shoot:"Founder to camera. No script, no teleprompter. Just talk. IWD is a natural moment to tell the founder story — don't over-produce this, authenticity converts.", caption:"International Women's Day. This one is personal. 💛\n\nI built Joyn because I was tired of hiding.\n\nEvery networking event: sparkling water, hoping nobody noticed.\nEvery wedding toast: a sip and then back to water.\nEvery first date: counting drinks, watching my face.\n\nThen I learned it was genetic. ALDH2 deficiency. Not just me — 600 million people.\n\nI became obsessed with a real solution. Not Pepcid. Not gimmicks.\n\nYears of development. USA-made. Third-party tested. Woman-founded.\n\nThis is Joyn. For every woman who's ever hidden at the table. 💛\n\n#IWD2026 #InternationalWomensDay #WomanFounded #ALDH2 #AlcoholFlush #Joyn #ConfidenceInACapsule" },
  { id:'18', date:'2026-03-09', platform:'Instagram', format:'Story Poll',               is_posted:false, note:'', hook:'What celebration are you most excited for this year?', shoot:'Post a Story with a poll sticker. Joyn orange background. Poll options: "A wedding" / "Graduation" / "Date night" / "Just a Friday." Also post this as a feed caption for engagement.', caption:"What celebration are you most excited for this year? 🎉\n\nDrop it in the comments or vote in our story poll 👆\n\nWhether it's a wedding, a birthday, a work win, or just a Friday night that finally feels like something —\n\nYou deserve to be fully present for all of it.\n\nJoyn is here for every single one. 🧡\n\n#Joyn #Celebrate #ALDH2 #ConfidenceInACapsule #CelebrateFreely" },
  { id:'19', date:'2026-03-10', platform:'TikTok',    format:'Selfie Diary',             is_posted:false, note:'', hook:"7 days with Joyn — I'm going to be honest", shoot:'Selfie-cam across 7 real days. Natural lighting. No script. This format converts — authentic > polished.', caption:"7 days with Joyn — I'm going to be honest 📔\n\nDay 1: Took 2 capsules 30 min before drinks. Less flushing than normal. Cautiously optimistic.\n\nDay 2: Work happy hour. Stayed the whole time. Ordered a second drink. My coworker asked why I seemed more relaxed.\n\nDay 4: Date night. Ordered wine without the usual anxiety.\n\nDay 5: Checked my face mid-meal. Normal color. Actually stayed at dinner.\n\nDay 7: I cried a little honestly. 15 years of hiding. 7 days.\n\nNot an ad. Just someone who needed this to exist.\n\n#Joyn #AlcoholFlush #ALDH2 #HealthTok #HonestReview #7DayChallenge #ConfidenceInACapsule" },
  { id:'20', date:'2026-03-11', platform:'Instagram', format:'Founder Feed Post',        is_posted:false, note:'', hook:"We didn't build Joyn to get rich. We built it because we were tired of hiding.", shoot:'Personal editorial photo of Brynn or the team. Warm lighting. No product in frame. This is about the human story, not the product.', caption:"We didn't build Joyn to get rich. We built it because we were tired of hiding. 🍷\n\nTired of showing up to celebrations and quietly managing our faces instead of being present.\n\nTired of the Reddit threads saying \"just take Pepcid.\"\n\nTired of a market full of \"hangover cures\" that weren't built for us at all.\n\n600 million people deserve a real answer. So we built one.\n\nWoman-founded. USA-made. Formulated for your biology, not against it.\n\nJoyn. Confidence in a capsule. 🧡\n\n#Joyn #WomanFounded #ALDH2 #AlcoholFlush #ConfidenceInACapsule #USAMade" },
  { id:'21', date:'2026-03-12', platform:'TikTok',    format:'Lifestyle Video',          is_posted:false, note:'', promo_code:'[ADD CODE]', hook:'Spring break. No flush edition. 🌴', shoot:'Fun, energetic spring break energy. Trending audio. Light and summery edit. Fast cuts. This is an ad-adjacent organic post.', caption:"Spring break is almost here and for the first time you don't have to choose between having fun and hiding your face 🌴\n\nNo more watching your phone camera to check how red you are.\nNo more quietly switching to water after one drink.\nNo more leaving early.\n\nSpring 2026: you're going. You're staying. You're present.\n\nTwo capsules. Thirty minutes. That's it.\n\nUse code [ADD CODE] for 15% off → link in bio 🧡\n\n#SpringBreak #AlcoholFlush #ALDH2 #AsianGlow #Joyn #CelebrateFully #ConfidenceInACapsule" },
  { id:'22', date:'2026-03-13', platform:'Instagram', format:'Community Spotlight',      is_posted:false, note:'', warn:'Template post — collect real DM stories before building this. Post an Instagram Story asking followers to share their Joyn moment. Get explicit written permission from each person. Then replace every [placeholder] below.', hook:"You sent us your stories this month. We can't stop reading them. 🧡", shoot:'Collage of real DM screenshots (with permission) or quote cards on Joyn cream background. Warm, grateful energy. Real names or anonymous — always ask first.', caption:"You sent us your stories this month. We can't stop reading them. 🧡\n\n\"[Customer quote 1]\" — [Name, Age or anonymous]\n\n\"[Customer quote 2]\" — [Name, Age or anonymous]\n\n\"[Customer quote 3]\" — [Name, Age or anonymous]\n\n\"[Customer quote 4]\" — [Name or anonymous]\n\nThis is why we built Joyn. Not for the product — for these moments.\n\nKeep sending them. We read every single one.\n\n#Joyn #CommunityStories #ALDH2 #AlcoholFlush #ConfidenceInACapsule #CustomerLove" },
  { id:'23', date:'2026-03-14', platform:'TikTok',    format:'Ingredient Breakdown',     is_posted:false, note:'', hook:"Every ingredient in Joyn and exactly why it's there 🔬", shoot:'Green screen or text overlay with ingredient list. Credible, educational tone. High save rate format. Show the bottle.', caption:"Every ingredient in Joyn and exactly why it's there 🔬\n\nWe're not hiding anything. Let's go through it:\n\n→ Dihydromyricetin (DHM): Studied for supporting alcohol metabolism\n→ NAC: Precursor to glutathione, your body's master antioxidant\n→ B-vitamins: Support liver metabolic function\n→ Milk Thistle: Liver support, used in wellness for centuries\n→ Vitamin C: Antioxidant support during oxidative stress\n\nNo proprietary blends. No \"natural flavors.\" No hiding behind vague labels.\n\nThis is what flush-free actually looks like at the molecular level.\n\nSave this. Full breakdown → link in bio.\n\n#Joyn #Ingredients #ALDH2 #HealthTok #SupplementTok #Transparency #CleanSupplements" },
  { id:'24', date:'2026-03-15', platform:'Instagram', format:'Milestone Post',           is_posted:false, note:'', hook:'Four weeks in. Thousands of celebrations. 🥂', shoot:'Celebratory and warm. Founder photo, product shot, or a collage of customer moments. This is your mid-month milestone — make it meaningful.', caption:"Four weeks in. Thousands of celebrations. 🥂\n\nWhen we launched, we hoped people would find us.\nWe didn't know they'd find us this fast.\n\nThe stories in our DMs. The reviews. The people saying they finally went to their office party, finally stayed at the wedding, finally had a glass of wine on a first date without counting their heartbeats.\n\nWe built Joyn for the 600 million people with ALDH2 deficiency who've been ignored.\n\nFour weeks done. We're just getting started.\n\nThank you. 🧡\n\n#Joyn #FourWeeks #ALDH2 #AlcoholFlush #ConfidenceInACapsule #ThankYou #WomanFounded" },
  { id:'25', date:'2026-03-16', platform:'TikTok',    format:'Skeptic Response',         is_posted:false, note:'', hook:"I read every skeptical comment about Joyn so you don't have to 😅", shoot:'Fast cuts, text overlay for each objection. Honest and slightly funny. Builds trust by acknowledging doubt head-on.', caption:"I read every skeptical comment about Joyn so you don't have to 😅\n\n\"It's just a placebo.\" — The enzyme science disagrees. Look up DHM and ALDH2.\n\n\"Just drink less.\" — The point is choice. Not abstinence.\n\n\"Pepcid works fine.\" — Long-term: stomach ulcers, acid dependency. Not fine.\n\n\"Too expensive.\" — One bottle = one month. Calculate your current Pepcid habit.\n\n\"Nothing works for flush.\" — That's what we thought too.\n\nThe skepticism is valid. We earned it by being honest about the science.\n\nFormula transparency → link in bio 🔬\n\n#Joyn #SkepticsWelcome #ALDH2 #HealthTok #AlcoholFlush #ConfidenceInACapsule" },
  { id:'26', date:'2026-03-17', platform:'Instagram', format:"St. Patrick's Day Post",   is_posted:false, note:'', promo_code:'[ADD CODE]', hook:"St. Patrick's Day without the red face 🍀", shoot:"Green aesthetic with Joyn orange accents. Pint glasses, shamrocks, celebration energy. Could be founder/team at a bar or a clean graphic. High-engagement holiday — post early.", caption:"St. Patrick's Day without the red face 🍀\n\nThe one holiday built entirely around drinking.\n\nAnd for 600 million people — the one holiday that used to feel like the most visible version of their condition.\n\nNot this year.\n\nTwo capsules. Thirty minutes. Wear the green.\n\nHappy St. Patrick's Day from Joyn 🧡\n\n→ Link in bio. Use code [ADD CODE] for 25% off.\n\n#StPatricksDay #Joyn #ALDH2 #AlcoholFlush #ConfidenceInACapsule #CelebrateFreely" },
  { id:'27', date:'2026-03-18', platform:'TikTok',    format:'Entertainment',            is_posted:false, note:'', promo_code:'[ADD CODE]', hook:"Rating celebrity flush moments they definitely didn't want us to see 😭", shoot:'Entertaining — use publicly available footage or general B-roll. Do NOT name specific individuals without legal review first. Frame everything as solidarity, not mockery.', caption:"Rating celebrity flush moments they definitely didn't want us to see 😭\n\n(Solidarity, not mockery — ALDH2 affects everyone regardless of fame or following)\n\n⭐ That awards show toast where someone's face told a whole other story\n⭐ Every red carpet open bar moment caught in 4K... front row... cameras everywhere\n⭐ The group photo at the after-party that lives rent-free in their heads\n\nThe difference between them and you: they had stylists, PRs, and makeup artists on standby.\n\nYou just have Joyn.\n\nCode [ADD CODE] → link in bio 🧡\n\n#Joyn #AsianGlow #ALDH2 #TikTokFun #AlcoholFlush #ConfidenceInACapsule #AsianAmerican" },
  { id:'28', date:'2026-03-19', platform:'Instagram', format:'Month Wrap-up',            is_posted:false, note:'', hook:"Month one is a wrap. Here's to the 600M. 🥂", shoot:'Most important post of the month. Emotional, warm. Founder or team photo. Real, personal, not polished. This is the closer.', caption:"Month one is a wrap. Here's to the 600M. 🥂\n\nWe launched a supplement nobody asked us to build — because we needed it ourselves.\n\nIn four weeks:\n→ Thousands of orders shipped\n→ Hundreds of stories in our DMs\n→ A community we didn't know we were building\n\nFor the person who found us at 2am after a bad night at a dinner party —\nFor the person who shared us with their college roommate —\nFor the person who finally stayed until the last dance —\n\nWe built this for you.\n\nMore is coming. Bring your celebrations.\n\nJoyn. Confidence in a capsule. 🧡\n\n#Joyn #OneMonth #ALDH2 #AlcoholFlush #ConfidenceInACapsule #ThankYou #WomanFounded #USAMade" },
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
    <button onClick={go} className={`w-full py-2 rounded-lg text-xs font-medium transition-all ${ok ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-white text-gray-400 border border-gray-200 hover:border-gray-300 hover:text-gray-600'}`}>
      {ok ? 'Copied' : 'Copy caption'}
    </button>
  )
}

function CopyAll({ text }: { text: string }) {
  const [ok, setOk] = useState(false)
  const go = () => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000) }
  return (
    <button onClick={go} className={`w-full py-2 rounded-lg text-xs font-medium transition-all ${ok ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-white text-gray-400 border border-gray-200 hover:border-gray-300 hover:text-gray-600'}`}>
      {ok ? 'Copied' : 'Copy hashtags'}
    </button>
  )
}

function Plat({ p }: { p: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
      style={{
        backgroundColor: PC_LIGHT[p] ?? '#f5f5f5',
        border: `1px solid ${PC_BORDER[p] ?? '#e5e7eb'}`,
        color: PC[p] ?? '#555',
      }}>
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: PC[p] }} />
      {p}
    </span>
  )
}

function PostedBtn({ id, is_posted, toggle }: { id: string; is_posted: boolean; toggle: (id: string) => void }) {
  return (
    <button
      onClick={() => toggle(id)}
      className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all shrink-0 ${is_posted ? 'bg-green-50 text-green-600 border border-green-100' : 'border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'}`}>
      {is_posted ? 'Posted' : 'Mark posted'}
    </button>
  )
}

function WarnBanner({ warn, promo_code }: { warn?: string; promo_code?: string }) {
  return (
    <>
      {warn && (
        <div className="bg-amber-50 border border-amber-100 rounded-lg px-3.5 py-3 mt-3">
          <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wide mb-1">Before you post</p>
          <p className="text-xs text-amber-800 leading-relaxed">{warn}</p>
        </div>
      )}
      {promo_code && (
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] text-gray-400 font-medium">Promo code</span>
          <code className="text-xs font-mono font-semibold text-[#FD5C1E]">{promo_code}</code>
          <span className="text-[9px] text-gray-300 ml-auto">Verify active</span>
        </div>
      )}
    </>
  )
}

function ShootBrief({ text }: { text: string }) {
  return (
    <div className="pl-3 border-l-2 border-gray-200 mt-3">
      <p className="text-[10px] text-gray-400 font-medium mb-0.5">Shoot</p>
      <p className="text-xs text-gray-500 leading-relaxed">{text}</p>
    </div>
  )
}

// ── sync badge ────────────────────────────────────────────────────────────────
function SyncBadge({ active }: { active: boolean }) {
  if (!active) return (
    <span className="text-[10px] text-gray-400 font-medium">Local</span>
  )
  return (
    <div className="flex items-center gap-1.5 text-[10px] font-medium text-green-500">
      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
      Live sync
    </div>
  )
}

// ── PostEditor modal ──────────────────────────────────────────────────────────
const IL = 'text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5'
const II = 'w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FD5C1E] transition-colors'
const IT = 'w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#FD5C1E] transition-colors resize-none'

function PostEditor({ post, onSave, onDelete, onClose, isNew = false }: {
  post: Post; onSave: (p: Post) => void; onDelete?: (id: string) => void
  onClose: () => void; isNew?: boolean
}) {
  const [form,      setForm]      = useState<Post>({ ...post })
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')
  const up = <K extends keyof Post>(k: K, v: Post[K]) => setForm(f => ({ ...f, [k]: v }))
  const valid = form.date && form.hook.trim() && form.caption.trim()

  const handleSave = () => {
    if (!valid || saveState !== 'idle') return
    setSaveState('saving')
    onSave(form)
    setTimeout(() => {
      setSaveState('saved')
      setTimeout(() => { setSaveState('idle'); onClose() }, 700)
    }, 350)
  }

  const saveBtnStyle = saveState === 'saved'
    ? 'bg-green-500 text-white'
    : saveState === 'saving'
    ? 'bg-[#FD5C1E]/70 text-white cursor-wait'
    : valid
    ? 'bg-[#FD5C1E] text-white hover:bg-[#e54d18] btn-brand'
    : 'bg-gray-100 text-gray-400 cursor-not-allowed'

  const saveBtnLabel = saveState === 'saved'
    ? '✓ Saved'
    : saveState === 'saving'
    ? (isNew ? 'Adding...' : 'Saving...')
    : (isNew ? 'Add Post' : 'Save Changes')

  return (
    <div className="fixed inset-0 z-50 flex" style={{ fontFamily: 'inherit' }}>
      <motion.div
        className="flex-1 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />
      <motion.div
        className="w-full sm:max-w-lg bg-white h-full overflow-y-auto shadow-2xl flex flex-col"
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      >
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="font-black text-[#0a0a0a] text-lg">{isNew ? '+ Add Post' : 'Edit Post'}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors">✕</button>
        </div>
        <div className="px-6 py-6 space-y-5 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  style={form.platform === p ? { backgroundColor: PC[p], boxShadow: `0 3px 10px ${PC[p]}50` } : undefined}>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className={IL}>Promo Code</span>
              <input type="text" value={form.promo_code ?? ''} onChange={e => up('promo_code', e.target.value || undefined)} placeholder="e.g. JOYN15" className={II} />
            </label>
            <div />
          </div>
          <label className="block">
            <span className={IL}>Pre-Post Warning</span>
            <textarea value={form.warn ?? ''} onChange={e => up('warn', e.target.value || undefined)} placeholder="Reminder before posting (testimonials, approvals...)" rows={2} className={IT} />
          </label>
        </div>
        <div className="px-6 pb-6 pt-4 border-t border-gray-100 space-y-2 sticky bottom-0 bg-white">
          <button onClick={handleSave}
            className={`w-full py-3.5 rounded-xl font-black text-sm transition-all ${saveBtnStyle}`}>
            {saveBtnLabel}
          </button>
          {!isNew && onDelete && (
            <button onClick={() => { if (window.confirm('Delete this post? This cannot be undone.')) { onDelete(form.id); onClose() } }}
              className="w-full py-2.5 border border-red-100 text-red-400 rounded-xl font-bold text-sm hover:bg-red-50 transition-all">
              Delete Post
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ── NoteArea ──────────────────────────────────────────────────────────────────
function NoteArea({ note, onSave }: { note: string; onSave: (t: string) => void }) {
  const [open, setOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasNote = !!(note?.trim())
  const handleChange = (t: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => onSave(t), 600)
  }
  return (
    <div className="mt-3 pt-3 border-t border-gray-100">
      <button onClick={() => setOpen(o => !o)} className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors">
        <span className="text-gray-300">{hasNote ? '–' : '+'}</span>
        {hasNote ? 'Team note' : 'Add note'}
        {hasNote && <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0" />}
      </button>
      {open && (
        <textarea defaultValue={note} onChange={e => handleChange(e.target.value)}
          placeholder="Shoot date, assigned to, approvals needed..."
          className="mt-2 w-full text-xs text-gray-700 leading-relaxed bg-amber-50 border border-amber-100 rounded-xl p-3 min-h-[72px] resize-none focus:outline-none focus:border-amber-300 placeholder-gray-300" />
      )}
    </div>
  )
}

// ── SetupBanner ───────────────────────────────────────────────────────────────
function SetupBanner({ hasSupabase }: { hasSupabase: boolean }) {
  const [dismissed, setDismissed] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('joyn-setup-done') === '1' : true
  )
  if (dismissed) return null
  return (
    <div className="bg-[#003882] border-b border-blue-900">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-16 py-5">
        <div className="flex items-start gap-6 flex-wrap">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-medium text-blue-300 uppercase tracking-wide mb-3">Before your first post</p>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-2.5">
              {([
                !hasSupabase
                  ? ['Set up team sync', 'Visit /setup to connect Supabase — right now only you can see your edits']
                  : ['Team sync active', 'Changes sync across all team members in real time'],
                ['Verify all promo codes', 'Confirm JOYN15 and any [ADD CODE] placeholders are active in your Shopify store'],
                ['Replace [Customer Name] placeholders', 'Posts 12 and 22 — click Edit Post and swap in real customers with permission'],
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

// ── page reducer ──────────────────────────────────────────────────────────────
type HomeState = {
  now:         Date | null
  posts:       Post[]
  loading:     boolean
  editingPost: Post | null
  addingPost:  Post | null
  viewMonth:   { year: number; month: number }
  selDate:     string | null
  pf:          PF
  hidePosted:  boolean
  search:      string
}

type HomeAction =
  | { type: 'INIT'; now: Date; posts: Post[] }
  | { type: 'SET_POSTS'; posts: Post[] }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_EDITING_POST'; post: Post | null }
  | { type: 'SET_ADDING_POST'; post: Post | null }
  | { type: 'SET_VIEW_MONTH'; year: number; month: number }
  | { type: 'SET_SEL_DATE'; date: string | null }
  | { type: 'SET_PF'; pf: PF }
  | { type: 'SET_HIDE_POSTED'; hide: boolean }
  | { type: 'SET_SEARCH'; search: string }

function homeReducer(state: HomeState, action: HomeAction): HomeState {
  switch (action.type) {
    case 'INIT':
      return { ...state, now: action.now, posts: action.posts,
               viewMonth: { year: action.now.getFullYear(), month: action.now.getMonth() } }
    case 'SET_POSTS':       return { ...state, posts: action.posts }
    case 'SET_LOADING':     return { ...state, loading: action.loading }
    case 'SET_EDITING_POST':return { ...state, editingPost: action.post }
    case 'SET_ADDING_POST': return { ...state, addingPost: action.post }
    case 'SET_VIEW_MONTH':  return { ...state, viewMonth: { year: action.year, month: action.month } }
    case 'SET_SEL_DATE':    return { ...state, selDate: action.date }
    case 'SET_PF':          return { ...state, pf: action.pf }
    case 'SET_HIDE_POSTED': return { ...state, hidePosted: action.hide }
    case 'SET_SEARCH':      return { ...state, search: action.search }
    default:                return state
  }
}

const HOME_INITIAL: HomeState = {
  now:         null,
  posts:       SEED,
  loading:     true,
  editingPost: null,
  addingPost:  null,
  viewMonth:   { year: 2026, month: 1 },
  selDate:     null,
  pf:          'All',
  hidePosted:  false,
  search:      '',
}

// ── page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const USE_SB = !!supabase

  // ── state ─────────────────────────────────────────────────────────────────
  const [state, dispatch] = useReducer(homeReducer, HOME_INITIAL)
  const { now, posts, loading, editingPost, addingPost, viewMonth, selDate, pf, hidePosted, search } = state

  const setNow         = (now: Date) => dispatch({ type: 'INIT', now, posts: state.posts })
  const setPosts       = (posts: Post[]) => dispatch({ type: 'SET_POSTS', posts })
  const setLoading     = (loading: boolean) => dispatch({ type: 'SET_LOADING', loading })
  const setEditingPost = (post: Post | null) => dispatch({ type: 'SET_EDITING_POST', post })
  const setAddingPost  = (post: Post | null) => dispatch({ type: 'SET_ADDING_POST', post })
  const setViewMonth   = (updater: { year: number; month: number } | ((m: { year: number; month: number }) => { year: number; month: number })) => {
    const next = typeof updater === 'function' ? updater(state.viewMonth) : updater
    dispatch({ type: 'SET_VIEW_MONTH', year: next.year, month: next.month })
  }
  const setSelDate     = (date: string | null) => dispatch({ type: 'SET_SEL_DATE', date })
  const setPf          = (pf: PF) => dispatch({ type: 'SET_PF', pf })
  const setHidePosted  = (updater: boolean | ((h: boolean) => boolean)) => {
    const next = typeof updater === 'function' ? updater(state.hidePosted) : updater
    dispatch({ type: 'SET_HIDE_POSTED', hide: next })
  }
  const setSearch      = (search: string) => dispatch({ type: 'SET_SEARCH', search })

  // ── init ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const n = new Date()
    const initPosts = (loadedPosts: Post[]) =>
      dispatch({ type: 'INIT', now: n, posts: loadedPosts })

    if (USE_SB && supabase) {
      // ── Supabase mode ────────────────────────────────────────────────────
      supabase.from('posts').select('*').order('date').then(({ data }) => {
        const loadedPosts = data && data.length > 0 ? data.map(dbToPost) : SEED
        dispatch({ type: 'INIT', now: n, posts: loadedPosts })
        dispatch({ type: 'SET_LOADING', loading: false })
      })

      const channel = supabase.channel('posts-realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, async () => {
          const { data } = await supabase!.from('posts').select('*').order('date')
          if (data) dispatch({ type: 'SET_POSTS', posts: data.map(dbToPost) })
        })
        .subscribe()

      return () => { supabase!.removeChannel(channel) }
    } else {
      // ── localStorage fallback ─────────────────────────────────────────────
      try {
        const sp = localStorage.getItem('joyn-posts-v3')
        if (sp) {
          const parsed = JSON.parse(sp)
          const loadedPosts = parsed.map((p: Post & { promoCode?: string }) => ({
            ...p,
            promo_code: p.promo_code ?? p.promoCode,
            is_posted:  p.is_posted  ?? false,
            note:       p.note       ?? '',
          }))
          initPosts(loadedPosts)
        } else {
          // migrate posted/notes from old format
          const sv = localStorage.getItem('joyn-posted')
          const sn = localStorage.getItem('joyn-notes')
          const oldPosted: Set<string> = sv ? new Set(JSON.parse(sv).map(String)) : new Set()
          const oldNotes: Record<string, string> = sn ? JSON.parse(sn) : {}
          const migrated = SEED.map(p => ({
            ...p,
            is_posted: oldPosted.has(p.id),
            note: oldNotes[p.id] ?? '',
          }))
          initPosts(migrated)
          localStorage.setItem('joyn-posts-v3', JSON.stringify(migrated))
        }
      } catch { initPosts(SEED) }
      dispatch({ type: 'SET_LOADING', loading: false })
    }
  }, [])

  // ── CRUD ──────────────────────────────────────────────────────────────────
  const lsSave = (next: Post[]) => {
    setPosts(next)
    localStorage.setItem('joyn-posts-v3', JSON.stringify(next))
  }

  const updatePost = async (p: Post) => {
    if (USE_SB && supabase) {
      setPosts(posts.map(x => x.id === p.id ? p : x))
      await supabase.from('posts').upsert({
        id: p.id, date: p.date, platform: p.platform, format: p.format,
        hook: p.hook, shoot: p.shoot, caption: p.caption,
        warn: p.warn ?? null, promo_code: p.promo_code ?? null,
        is_posted: p.is_posted, note: p.note,
        updated_at: new Date().toISOString(),
      })
    } else {
      lsSave(posts.map(x => x.id === p.id ? p : x))
    }
  }

  const deletePost = async (id: string) => {
    if (USE_SB && supabase) {
      setPosts(posts.filter(x => x.id !== id))
      await supabase.from('posts').delete().eq('id', id)
    } else {
      lsSave(posts.filter(x => x.id !== id))
    }
  }

  const addPost = async (p: Post) => {
    const np: Post = { ...p, id: newId(), is_posted: false, note: p.note || '' }
    const sorted = [...posts, np].sort((a, b) => a.date.localeCompare(b.date))
    if (USE_SB && supabase) {
      setPosts(sorted)
      await supabase.from('posts').insert({
        id: np.id, date: np.date, platform: np.platform, format: np.format,
        hook: np.hook, shoot: np.shoot, caption: np.caption,
        warn: np.warn ?? null, promo_code: np.promo_code ?? null,
        is_posted: false, note: '',
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      })
    } else {
      lsSave(sorted)
    }
  }

  const togglePosted = async (id: string) => {
    const p = posts.find(x => x.id === id)
    if (p) await updatePost({ ...p, is_posted: !p.is_posted })
  }

  const saveNote = async (id: string, note: string) => {
    const p = posts.find(x => x.id === id)
    if (p) await updatePost({ ...p, note })
  }

  // ── derived ───────────────────────────────────────────────────────────────
  const todayStr     = now ? nowDateStr(now) : ''
  const todayPosts   = posts.filter(p => p.date === todayStr)
  const upcomingPosts = now ? posts
    .filter(p => p.date > todayStr && p.date <= addDays(todayStr, 6))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5) : []
  const totalPosted = posts.filter(p => p.is_posted).length
  const totalPosts  = posts.length
  const noteCount   = posts.filter(p => p.note?.trim()).length

  // ── calendar ──────────────────────────────────────────────────────────────
  const { year: calYear, month: calMonth } = viewMonth
  const daysInMo   = new Date(calYear, calMonth + 1, 0).getDate()
  const firstDay   = new Date(calYear, calMonth, 1).getDay()
  const monthLabel = `${MONTH_NAMES[calMonth]} ${calYear}`
  const prevMonth  = () => setViewMonth(m => m.month === 0  ? { year: m.year - 1, month: 11 } : { year: m.year, month: m.month - 1 })
  const nextMonth  = () => setViewMonth(m => m.month === 11 ? { year: m.year + 1, month: 0  } : { year: m.year, month: m.month + 1 })
  const calDayStr  = (d: number) => toDateStr(calYear, calMonth, d)
  const monthPosts = posts.filter(p => { const [y,m] = p.date.split('-').map(Number); return y === calYear && m - 1 === calMonth })
  const selPosts   = selDate ? posts.filter(p => p.date === selDate) : []
  const totalCells = Math.ceil((firstDay + daysInMo) / 7) * 7

  // ── caption library ───────────────────────────────────────────────────────
  const filteredLib = posts
    .filter(p => pf === 'All' || p.platform === pf)
    .filter(p => !hidePosted || !p.is_posted)
    .filter(p => !search || [p.hook, p.caption].some(t => t.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => a.date.localeCompare(b.date))

  const blankPost = (date?: string): Post => ({
    id: '', date: date ?? todayStr, platform: 'TikTok', format: '', hook: '', shoot: '', caption: '', is_posted: false, note: '',
  })

  // ── render ────────────────────────────────────────────────────────────────
  if (loading) return (
    <main className="min-h-screen bg-[#fafafa] flex items-center justify-center pt-14">
      <motion.div className="text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: EASE }}>
        <div className="w-8 h-8 rounded-full bg-[#FD5C1E] mx-auto mb-4 animate-pulse"
          style={{ boxShadow: '0 4px 16px rgba(253,92,30,0.3)' }} />
        <p className="text-sm text-gray-400 font-medium">Loading strategy hub...</p>
      </motion.div>
    </main>
  )

  return (
    <main className="min-h-screen bg-[#fafafa] pt-14">

      {/* Modals */}
      <AnimatePresence>
        {editingPost && <PostEditor key="edit" post={editingPost} onSave={updatePost} onDelete={deletePost} onClose={() => setEditingPost(null)} />}
        {addingPost  && <PostEditor key="add"  post={addingPost}  onSave={addPost}    isNew              onClose={() => setAddingPost(null)}  />}
      </AnimatePresence>

      <SetupBanner hasSupabase={USE_SB} />

      {/* ── HERO STRIP ────────────────────────────────────────────────── */}
      <div className="bg-[#0a0a0a] px-4 sm:px-6 lg:px-16 py-6 sm:py-8">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-[10px] font-black text-[#FD5C1E] uppercase tracking-[0.2em] mb-1.5">2026 Social Playbook</div>
            <h1 className="text-lg sm:text-2xl font-black text-white leading-tight">
              Confidence in a capsule.
            </h1>
            <p className="text-gray-500 text-xs mt-1">
              {totalPosts} posts · TikTok, Instagram, Pinterest · Feb–Mar 2026
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <SyncBadge active={USE_SB} />
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">
                <span className="font-bold text-white">{totalPosted}</span>/{totalPosts}
                <span className="ml-1 text-gray-600">posted</span>
              </span>
              <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#FD5C1E] rounded-full transition-all duration-700"
                  style={{ width: totalPosts ? `${(totalPosted / totalPosts) * 100}%` : '0%' }} />
              </div>
            </div>
            <Link href="/strategy"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#FD5C1E] border border-[#FD5C1E]/30 hover:border-[#FD5C1E] px-3.5 py-2 rounded-full transition-colors">
              Strategy Deck ↗
            </Link>
          </div>
        </div>
      </div>

      {/* ── TODAY ──────────────────────────────────────────────────────── */}
      <section id="today" className="section-anchor border-b border-gray-100">

        {/* Stats bar */}
        <div className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-16 py-4 sm:py-5">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mb-0.5">Today</div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a0a0a] leading-none">
                {now ? `${DAY_FULL[now.getDay()]}, ${MONTH_NAMES[now.getMonth()]} ${now.getDate()}` : '—'}
              </h2>
            </div>
            <button onClick={() => setAddingPost(blankPost(todayStr))}
              className="flex items-center gap-2 bg-[#FD5C1E] text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#e54d18] btn-brand">
              + Add Post
            </button>
          </div>
        </div>

        {/* Posts for today */}
        <div className="px-4 sm:px-6 lg:px-16 py-6 sm:py-8">
          <div className="max-w-screen-xl mx-auto">
            {todayPosts.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 text-center mb-6">
                {now ? (
                  <>
                    <p className="text-base font-semibold text-[#0a0a0a] mb-2">No posts scheduled today.</p>
                    <p className="text-gray-400 text-sm mb-4">Use the calendar below to see what&apos;s coming up, or add a post for today.</p>
                    <button onClick={() => setAddingPost(blankPost(todayStr))}
                      className="bg-[#FD5C1E] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#e54d18] btn-brand">
                      + Add Post for Today
                    </button>
                  </>
                ) : (
                  <p className="text-gray-400">Loading...</p>
                )}
              </div>
            )}
            <div className="space-y-4">
              {todayPosts.map((p, i) => (
                <motion.div key={p.id}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                  className={`bg-white rounded-2xl border-l-4 border overflow-hidden card-hover ${p.is_posted ? 'border-l-green-400 border-green-100 opacity-60' : 'border-gray-100'}`}
                  style={!p.is_posted ? { borderLeftColor: PC[p.platform] } : undefined}>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-4 gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Plat p={p.platform} />
                        {p.format && <span className="text-xs text-gray-400">{p.format}</span>}
                        {p.note?.trim() && <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => setEditingPost(p)} className="text-xs font-medium text-gray-400 hover:text-[#FD5C1E] transition-colors px-2 py-1 border border-gray-200 rounded-lg hover:border-[#FD5C1E]">Edit</button>
                        <PostedBtn id={p.id} is_posted={p.is_posted} toggle={togglePosted} />
                      </div>
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-[#0a0a0a] mb-3 leading-snug">&ldquo;{p.hook}&rdquo;</h2>
                    <ShootBrief text={p.shoot} />
                    <WarnBanner warn={p.warn} promo_code={p.promo_code} />
                    <div className="mt-4">
                      <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-100">{p.caption}</div>
                      <div className="mt-3"><CopyFull text={p.caption} /></div>
                    </div>
                    <NoteArea note={p.note} onSave={note => saveNote(p.id, note)} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Up Next */}
            {upcomingPosts.length > 0 && (
              <div className="mt-8">
                <p className="text-xs text-gray-400 font-medium mb-3">Coming up</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {upcomingPosts.map((u, i) => (
                    <motion.button key={u.id}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.1 + i * 0.05, ease: EASE }}
                      whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}
                      onClick={() => { setSelDate(u.date); setViewMonth({ year: parseInt(u.date.slice(0,4)), month: parseInt(u.date.slice(5,7))-1 }); document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' }) }}
                      className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 text-left hover:border-[#FD5C1E] transition-colors group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">{formatDisplayDate(u.date).slice(0,-6)}</span>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PC[u.platform] }} />
                      </div>
                      <p className="text-xs font-medium text-[#0a0a0a] leading-snug group-hover:text-[#FD5C1E] transition-colors line-clamp-2">{u.hook}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CALENDAR ───────────────────────────────────────────────────── */}
      <section id="calendar" className="section-anchor px-4 sm:px-6 lg:px-16 py-10 sm:py-16 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3">
                <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-[#FD5C1E] text-gray-400 hover:text-[#FD5C1E] transition-all text-lg">‹</button>
                <h2 className="text-xl sm:text-2xl font-semibold text-[#0a0a0a]">{monthLabel}</h2>
                <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-[#FD5C1E] text-gray-400 hover:text-[#FD5C1E] transition-all text-lg">›</button>
                {now && (calYear !== now.getFullYear() || calMonth !== now.getMonth()) && (
                  <button onClick={() => setViewMonth({ year: now.getFullYear(), month: now.getMonth() })}
                    className="text-xs font-bold text-[#FD5C1E] hover:underline">Today</button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              {Object.entries({ TikTok: '#FD5C1E', Instagram: '#E1306C', Pinterest: '#E60023' }).map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v }} />{k}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="grid grid-cols-7 border-b border-gray-50">
              {DAY_NAMES.map((d, i) => (
                <div key={'dh-' + i} className="py-2 sm:py-3 text-center text-[10px] sm:text-xs font-medium text-gray-300 uppercase tracking-widest">
                  <span className="hidden sm:inline">{DAY_FULL[i]}</span>
                  <span className="sm:hidden">{d}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {Array.from({ length: totalCells }, (_, i) => {
                const dayNum  = i - firstDay + 1
                const isValid = dayNum >= 1 && dayNum <= daysInMo
                const ds      = isValid ? calDayStr(dayNum) : ''
                const dayPosts = isValid ? monthPosts.filter(p => p.date === ds) : []
                const isToday  = ds === todayStr
                const isSel    = ds === selDate
                const allDone  = dayPosts.length > 0 && dayPosts.every(p => p.is_posted)
                return (
                  <div key={'cell-' + i} className={`min-h-[56px] sm:min-h-[88px] border-b border-r border-gray-50 last:border-r-0 transition-all ${isValid ? (isSel ? 'ring-2 ring-inset ring-[#FD5C1E]' : '') : 'bg-gray-50/30'}`}>
                    {isValid && (
                      <button className={`w-full h-full p-1.5 sm:p-2.5 text-left ${isToday ? 'bg-[#FD5C1E]/5' : 'hover:bg-gray-50/60'} transition-all`}
                        onClick={() => setSelDate(ds === selDate ? null : ds)}>
                        <div className={`text-[10px] sm:text-xs font-semibold mb-1 sm:mb-1.5 flex items-center gap-1 ${isToday ? 'text-[#FD5C1E]' : 'text-gray-300'}`}>
                          {dayNum}
                          {isToday && <span className="hidden sm:inline text-[9px] bg-[#FD5C1E] text-white px-1 py-0.5 rounded font-black leading-none">TODAY</span>}
                          {allDone && <span className="text-[9px] bg-green-500 text-white px-1 py-0.5 rounded font-black leading-none">✓</span>}
                        </div>
                        <div className="space-y-0.5">
                          {dayPosts.slice(0, 2).map(dp => (
                            <div key={dp.id} className="flex items-start gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-[3px] ${dp.is_posted ? 'opacity-30' : ''}`}
                                style={{ backgroundColor: PC[dp.platform] }} />
                              <span className={`text-[9px] sm:text-[10px] leading-tight line-clamp-1 ${dp.is_posted ? 'text-gray-300 line-through' : 'text-gray-500'}`}>{dp.hook}</span>
                            </div>
                          ))}
                          {dayPosts.length > 2 && <span className="text-[9px] text-gray-400">+{dayPosts.length - 2}</span>}
                        </div>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button onClick={() => setAddingPost(blankPost(selDate ?? todayStr))}
              className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#FD5C1E] transition-colors">
              + Add Post
            </button>
          </div>

          {selDate && (
            <div className="mt-4 bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-[#0a0a0a] text-base">{formatDisplayDate(selDate)}</h3>
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
                    className="bg-[#FD5C1E] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#e54d18] btn-brand">
                    + Add Post for This Day
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {selPosts.map(p => (
                    <div key={p.id} className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Plat p={p.platform} />
                          {p.format && <span className="text-xs text-gray-400 font-semibold">{p.format}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setEditingPost(p)} className="text-xs font-bold text-gray-400 hover:text-[#FD5C1E] border border-gray-200 hover:border-[#FD5C1E] px-2 py-1 rounded-lg transition-all">Edit</button>
                          <PostedBtn id={p.id} is_posted={p.is_posted} toggle={togglePosted} />
                        </div>
                      </div>
                      <h4 className="font-semibold text-[#0a0a0a] text-sm mb-3 leading-snug">&ldquo;{p.hook}&rdquo;</h4>
                      <ShootBrief text={p.shoot} />
                      <WarnBanner warn={p.warn} promo_code={p.promo_code} />
                      <div className="mt-4">
                        <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed bg-gray-50 rounded-xl p-4 mb-3">{p.caption}</div>
                        <CopyFull text={p.caption} />
                      </div>
                      <NoteArea note={p.note} onSave={note => saveNote(p.id, note)} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── CAPTION LIBRARY ─────────────────────────────────────────────── */}
      <section id="captions" className="section-anchor px-4 sm:px-6 lg:px-16 py-10 sm:py-16 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-[#0a0a0a]">Captions <span className="text-gray-300 font-normal text-xl">({totalPosts})</span></h2>
            <button onClick={() => setAddingPost(blankPost())}
              className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg font-medium text-sm hover:border-[#FD5C1E] hover:text-[#FD5C1E] transition-all whitespace-nowrap">
              + Add Post
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 mb-8 flex flex-col sm:flex-row gap-3">
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
            {filteredLib.map((cap, i) => (
              <motion.div key={cap.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: Math.min(i, 5) * 0.06, ease: EASE }}
                className={`bg-white rounded-2xl border-l-4 border overflow-hidden flex flex-col card-hover ${cap.is_posted ? 'border-l-green-400 border-green-100 opacity-50' : 'border-gray-100'}`}
                style={!cap.is_posted ? { borderLeftColor: PC[cap.platform] } : undefined}>
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Plat p={cap.platform} />
                      <span className="text-xs text-gray-400">{formatDisplayDate(cap.date)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => setEditingPost(cap)} className="text-[10px] font-medium text-gray-400 hover:text-[#FD5C1E] border border-gray-200 hover:border-[#FD5C1E] px-2 py-1 rounded-lg transition-all">Edit</button>
                      <PostedBtn id={cap.id} is_posted={cap.is_posted} toggle={togglePosted} />
                    </div>
                  </div>
                  {cap.format && <p className="text-[10px] text-gray-400 font-medium mb-1.5">{cap.format}</p>}
                  <h3 className="font-semibold text-[#0a0a0a] text-sm leading-snug mb-3">&ldquo;{cap.hook}&rdquo;</h3>
                  {cap.shoot && <ShootBrief text={cap.shoot} />}
                  <WarnBanner warn={cap.warn} promo_code={cap.promo_code} />
                  <div className="mt-3 flex-1 text-sm text-gray-600 whitespace-pre-line leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-100">{cap.caption}</div>
                  <div className="mt-3"><CopyFull text={cap.caption} /></div>
                  <NoteArea note={cap.note} onSave={note => saveNote(cap.id, note)} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HASHTAGS ────────────────────────────────────────────────────── */}
      <section id="hashtags" className="section-anchor px-4 sm:px-6 lg:px-16 py-10 sm:py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0a0a0a] mb-8">Hashtags</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HASHTAGS.map((set, i) => {
              const raw = set.tags.includes(',') ? set.tags.split(', ') : set.tags.split(' ')
              return (
                <motion.div key={set.name}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col card-hover">
                  <div className="p-5 flex-1">
                    <h3 className="font-semibold text-[#0a0a0a] mb-1">{set.name}</h3>
                    <p className="text-xs text-gray-400 mb-4">{set.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {raw.slice(0, 8).map(t => (
                        <span key={t.trim()} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full font-mono">{t.trim()}</span>
                      ))}
                      {raw.length > 8 && <span className="text-xs text-gray-400 self-center">+{raw.length - 8} more</span>}
                    </div>
                  </div>
                  <div className="px-5 pb-5"><CopyAll text={set.tags} /></div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── ADS ─────────────────────────────────────────────────────────── */}
      <section id="ads" className="section-anchor px-4 sm:px-6 lg:px-16 py-10 sm:py-16 bg-[#0a0a0a] border-b border-gray-800">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">Ad Copy</h2>
          <p className="text-gray-500 text-sm mb-10">Meta and TikTok — copy-ready.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {ADS.map(ad => (
              <div key={ad.id} className="border border-white/10 rounded-2xl overflow-hidden">
                <div className="bg-white/[0.03] px-4 sm:px-6 py-4 border-b border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white/40 uppercase tracking-widest">{ad.platform}</span>
                    <span className="text-white/20">·</span>
                    <span className="text-xs font-bold text-white/60 bg-white/10 px-2.5 py-0.5 rounded-full">{ad.stage}</span>
                  </div>
                  <Copy text={`Hook: ${ad.hook}\n\nHeadline: ${ad.headline}\n\nBody: ${ad.body}\n\nCTA: ${ad.cta}`} label="Copy Full Set" variant="ghost" />
                </div>
                <div className="p-4 sm:p-6 space-y-3">
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
                <div className="px-4 sm:px-6 pb-6">
                  <p className="text-xs text-gray-600 italic">{ad.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND ───────────────────────────────────────────────────────── */}
      <section id="brand" className="section-anchor px-4 sm:px-6 lg:px-16 py-10 sm:py-16">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0a0a0a] mb-10">Brand</h2>
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xs font-medium text-gray-400 mb-5">Colors — click to copy hex</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {COLORS.map(c => (
                  <button key={c.hex} className="group text-left" onClick={() => navigator.clipboard.writeText(c.hex)}>
                    <div className="h-14 sm:h-16 rounded-xl mb-2 relative overflow-hidden" style={{ backgroundColor: c.hex }}>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-gray-500">{c.hex}</div>
                    <div className="text-[11px] text-gray-400 leading-tight">{c.name}</div>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10">
                <div className="h-8 rounded-lg bg-gradient-to-r from-[#FD5C1E] to-[#D72C0D]" />
                <div className="h-8 rounded-lg bg-gradient-to-r from-[#003882] to-[#0052CC]" />
              </div>
              <h3 className="text-xs font-medium text-gray-400 mb-5">Typography — Inter</h3>
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
              <h3 className="text-xs font-medium text-gray-400 mb-5">Voice — DO / DON&apos;T</h3>
              <div className="space-y-3 mb-10">
                {[
                  ['Confidence in a capsule.', 'We think this might help with redness...'],
                  ['Red wine. Not red face.', 'Please buy our supplement for flush.'],
                  ['You deserve to show up fully.', 'Fix your embarrassing flush reaction.'],
                  ['Formulated for ALDH2 enzyme activity.', 'It just works, trust us.'],
                ].map(([d, dn]) => (
                  <div key={d} className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
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
              <h3 className="text-xs font-medium text-gray-400 mb-5">Tagline Bank</h3>
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

      <footer className="px-4 sm:px-6 lg:px-16 py-10 sm:py-14 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-6 mb-8 pb-8 border-b border-white/10">
            <div>
              <div className="text-white font-black text-base">Joyn — 2026 Social Playbook</div>
              <div className="text-gray-600 text-xs mt-1">{totalPosts} posts · {USE_SB ? 'team sync active' : 'local mode'} · Confidence in a capsule.</div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Link href="/strategy"
                className="px-4 py-2 border border-white/20 rounded-full text-xs font-bold text-gray-400 hover:border-[#FD5C1E] hover:text-[#FD5C1E] transition-colors">
                Strategy Deck
              </Link>
              <Link href="/brand"
                className="px-4 py-2 border border-white/20 rounded-full text-xs font-bold text-gray-400 hover:border-[#FD5C1E] hover:text-[#FD5C1E] transition-colors">
                Brand Guide
              </Link>
              <button onClick={() => window.print()}
                className="px-4 py-2 bg-[#FD5C1E] rounded-full text-xs font-black text-white hover:bg-[#e54d18] transition-colors">
                Download Strategy
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-5 flex-wrap">
              <a href="https://www.joynthefun.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-500 text-xs font-medium hover:text-gray-300 transition-colors">
                joynthefun.com ↗
              </a>
              <Link href="/setup" className="text-gray-600 text-xs font-medium hover:text-gray-400 transition-colors">Setup</Link>
            </div>
            <button onClick={() => { if (window.confirm('Reset all data? This will delete any custom posts, edits, and progress.')) { localStorage.clear(); window.location.reload() } }}
              className="text-gray-700 text-xs font-medium hover:text-gray-500 transition-colors">
              Reset data
            </button>
          </div>
        </div>
      </footer>

    </main>
  )
}
