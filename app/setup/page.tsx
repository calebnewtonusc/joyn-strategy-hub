import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Setup Guide — Joyn Strategy Hub',
}

const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <div className="flex gap-5 pb-10 border-b border-gray-100 last:border-0 last:pb-0">
    <div className="shrink-0 w-8 h-8 rounded-full bg-[#FD5C1E] text-white font-black flex items-center justify-center text-sm">{n}</div>
    <div className="flex-1 pt-0.5">
      <h3 className="font-black text-[#0a0a0a] text-lg mb-3">{title}</h3>
      {children}
    </div>
  </div>
)

const Code = ({ children }: { children: string }) => (
  <code className="font-mono text-sm bg-gray-100 text-[#0a0a0a] px-2 py-0.5 rounded">{children}</code>
)

const Block = ({ children }: { children: string }) => (
  <pre className="bg-[#0a0a0a] text-green-400 text-sm font-mono rounded-xl p-4 overflow-x-auto mt-3">{children}</pre>
)

export default function SetupPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-20 pb-20">
      <div className="max-w-2xl mx-auto px-6">

        <div className="mb-10">
          <Link href="/" className="text-xs font-bold text-[#FD5C1E] hover:underline">← Back to Strategy Hub</Link>
        </div>

        <p className="text-xs font-black text-[#FD5C1E] uppercase tracking-[0.2em] mb-3">One-time setup</p>
        <h1 className="text-4xl font-black text-[#0a0a0a] mb-3 leading-tight">Get your team in sync.</h1>
        <p className="text-gray-500 text-lg mb-12 leading-relaxed">
          Right now the app stores data locally in your browser — only you can see your changes.
          Follow these steps to move to Supabase so your whole team shares one live database.
          Takes about 15 minutes.
        </p>

        <div className="space-y-0">

          <Step n={1} title="Create a Supabase project">
            <ol className="space-y-2 text-sm text-gray-600 leading-relaxed">
              <li>Go to <span className="font-mono text-sm">supabase.com</span> → sign up for free</li>
              <li>Click <strong className="text-[#0a0a0a]">New project</strong></li>
              <li>Name it <Code>joyn-strategy-hub</Code> — pick the region closest to your team</li>
              <li>Set a strong database password and save it somewhere safe</li>
              <li>Wait ~2 minutes for the project to provision</li>
            </ol>
          </Step>

          <Step n={2} title="Run the database schema">
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              In your Supabase dashboard, go to <strong className="text-[#0a0a0a]">SQL Editor</strong> → <strong className="text-[#0a0a0a]">New query</strong>.
              Paste the contents of <Code>supabase/schema.sql</Code> from the repo and click <strong className="text-[#0a0a0a]">Run</strong>.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <strong className="font-black">What this does:</strong> Creates the <Code>posts</Code> table and enables real-time sync across your team.
            </div>
          </Step>

          <Step n={3} title="Seed the 28 starter posts">
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              Run this from your terminal (requires Node.js and your <Code>.env.local</Code> set up — see Step 4 first, then come back):
            </p>
            <Block>npm run seed</Block>
            <p className="text-xs text-gray-400 mt-2">To wipe and re-seed: <Code>npm run seed -- --force</Code></p>
          </Step>

          <Step n={4} title="Get your API credentials">
            <ol className="space-y-2 text-sm text-gray-600 leading-relaxed">
              <li>In Supabase dashboard → <strong className="text-[#0a0a0a]">Project Settings</strong> → <strong className="text-[#0a0a0a]">API</strong></li>
              <li>Copy <strong className="text-[#0a0a0a]">Project URL</strong> — this is your <Code>NEXT_PUBLIC_SUPABASE_URL</Code></li>
              <li>Copy the <strong className="text-[#0a0a0a]">anon / public</strong> key — this is your <Code>NEXT_PUBLIC_SUPABASE_ANON_KEY</Code></li>
            </ol>
          </Step>

          <Step n={5} title="Add credentials to Vercel">
            <ol className="space-y-2 text-sm text-gray-600 leading-relaxed mb-4">
              <li>Go to <span className="font-mono text-sm">vercel.com</span> → your <Code>joyn-strategy-hub</Code> project → <strong className="text-[#0a0a0a]">Settings</strong> → <strong className="text-[#0a0a0a]">Environment Variables</strong></li>
              <li>Add two variables:</li>
            </ol>
            <Block>{`NEXT_PUBLIC_SUPABASE_URL     = https://your-project-id.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key-here`}</Block>
            <ol className="space-y-2 text-sm text-gray-600 leading-relaxed mt-4">
              <li>Click <strong className="text-[#0a0a0a]">Save</strong></li>
              <li>Go to <strong className="text-[#0a0a0a]">Deployments</strong> → click the three dots on the latest → <strong className="text-[#0a0a0a]">Redeploy</strong></li>
              <li>Wait ~1 minute, then open the live site — your posts should appear from the database</li>
            </ol>
          </Step>

        </div>

        <div className="mt-12 bg-[#003882] rounded-2xl p-6 text-white">
          <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-3">After setup — action items</p>
          <p className="text-sm text-blue-100 mb-4 leading-relaxed">
            Before posting anything, update these placeholders in the app using the <strong className="text-white">Edit Post</strong> button:
          </p>
          <ul className="space-y-2 text-sm">
            {[
              'Post 12 — Replace [Customer quote] and [Customer Name] with real customers (get written permission)',
              'Post 15 — Replace [Dr. Name] quote with your real medical advisor (get written sign-off first)',
              'Post 22 — Collect real DM stories and written permissions before building this post',
              'Posts 13, 14, 21, 26, 27 — Fill in your actual promo codes in place of [ADD CODE]',
              'Post 6 — Verify JOYN15 is active in your Shopify store',
            ].map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-[#FD5C1E] shrink-0 mt-0.5">→</span>
                <span className="text-blue-100">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-center">
          <Link href="/"
            className="inline-block bg-[#FD5C1E] text-white font-black px-8 py-4 rounded-2xl text-sm hover:bg-[#e54d18] transition-all">
            Back to Strategy Hub →
          </Link>
        </div>

      </div>
    </main>
  )
}
