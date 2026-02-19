# Joyn Strategy Hub — Team Handoff Guide

**Live site:** https://joyn-strategy-hub.vercel.app
**Repo:** https://github.com/calebnewtonusc/joyn-strategy-hub

---

## What this is

A shared social media strategy tool for the Joyn team. One source of truth — every team member can view, edit, mark posts as published, and leave notes. Changes sync in real time across all devices.

---

## One-time setup (~15 minutes)

### Step 1 — Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → Sign up → **New project**
2. Name: `joyn-strategy-hub` | Region: pick closest to your team
3. Set a strong database password and save it
4. Wait ~2 minutes for the project to provision

### Step 2 — Run the schema

1. In your Supabase dashboard → **SQL Editor** → **New query**
2. Paste the entire contents of `supabase/schema.sql` from the repo
3. Click **Run** — you should see "Success. No rows returned."

### Step 3 — Seed the 28 starter posts

**Option A — SQL (easiest):**
In SQL Editor, run this for each post, or use a bulk insert. The easiest way is to run the seed script:

**Option B — Node script:**
```bash
# Clone the repo, then:
cp .env.local.example .env.local
# Fill in your Supabase credentials (see Step 4)
npm install
npm run seed
```

### Step 4 — Get your API credentials

1. Supabase dashboard → **Project Settings** → **API**
2. Copy **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`
3. Copy **anon / public** key → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 5 — Add credentials to Vercel

1. Go to [vercel.com](https://vercel.com) → your `joyn-strategy-hub` project → **Settings** → **Environment Variables**
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://your-project-id.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `your-anon-key`
3. Click **Save** → **Deployments** → **Redeploy** (pick the latest deployment)
4. Wait ~1 minute → visit the live site — data should now load from Supabase

---

## How to use the app

### Editing posts
Click the **Edit Post** button on any card. A side panel opens where you can change:
- Date, platform, format
- Hook (the opening line)
- Shoot brief (what to film)
- Caption (full copy including hashtags)
- Promo code
- Pre-post warning

Changes save to the database and **sync to all team members instantly**.

### Marking posts as published
Click **○ Mark posted** on any card. It turns green. All team members see it as published.

### Team notes
Click **+ Add team note** on any post. Use this for:
- Shoot reminders ("film Tuesday afternoon")
- Revision notes ("Brynn approved - use this version")
- Approval status ("waiting on doctor sign-off")

Notes sync across devices in real time.

### Adding new posts
Click **+ Add Post** in the calendar header or caption library header. Fill in the fields and click **Add Post**.

### Navigating the calendar
Use the **‹ ›** arrows to move between months. Click any day to see that day's posts. The **Today** section at the top always shows today's scheduled posts.

---

## ⚠️ Action items before your first post

These placeholder items MUST be updated before posting:

| Post # | What to fix |
|--------|-------------|
| **Post 6** | JOYN15 — verify this code is active in your Shopify store |
| **Post 12** | Replace all `[Customer Name]`, `[Customer quote]`, `[ADD LAUNCH CODE]` with real verified content. Get **written permission** from every customer you quote. |
| **Post 13** | Add your Women's History Month promo code in place of `[ADD CODE]` |
| **Post 14** | Add your Spring Season promo code in place of `[ADD CODE]` |
| **Post 15** | Replace `[Dr. Name, Credentials]` and the quote placeholder with your real medical advisor's words. Get **written sign-off before publishing**. Fabricated expert endorsements are an FTC violation. |
| **Post 21** | Add Spring Break promo code in place of `[ADD CODE]` |
| **Post 22** | Collect real DM stories + written permission before building this post. Replace all `[Customer quote]` and `[Name]` placeholders. |
| **Post 26** | Add St. Patrick's Day promo code in place of `[ADD CODE]` |
| **Post 27** | Add promo code in place of `[ADD CODE]` |

**Any post with an orange ⚠️ warning banner is NOT ready to post as-is.**

---

## Adding March (and beyond) posts

February content is pre-loaded. To continue past Feb 28:
1. Click **+ Add Post** in the calendar for any March date
2. Fill in the fields
3. Posts are sorted by date automatically

There's no content limit — the tool works for any month forever.

---

## Sharing with team members

The app has no login. Anyone with the URL can view and edit. Share the Vercel URL with your team and they're set.

If you need to restrict access in the future, add Vercel password protection:
Vercel → Project → Settings → Deployment Protection → Add a password.

---

## Technical notes (for developers)

- **Stack:** Next.js 14, TypeScript, Tailwind CSS, Supabase
- **Repo:** `github.com/calebnewtonusc/joyn-strategy-hub`
- **Realtime:** Supabase Realtime postgres_changes subscription — edits appear on all connected devices within ~1 second
- **Fallback:** If Supabase env vars are not set, app uses localStorage (single-device mode)
- **Seeding:** `npm run seed` or `npm run seed -- --force` to re-seed
- **Local dev:** Copy `.env.local.example` to `.env.local`, fill in credentials, `npm run dev`
