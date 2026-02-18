const templateCategories = [
  {
    category: 'Instagram Feed',
    icon: '📸',
    templates: [
      {
        name: 'Product Hero',
        size: '1080×1080',
        desc: 'Bold product shot with gradient overlay and tagline',
        uses: ['New product drops', 'Promotional posts', 'Homepage grid anchor'],
        spec: { bg: '#FD5C1E to #D72C0D', text: 'White', font: 'Inter 900', overlay: 'Gradient 60%' },
        preview: { bg: 'from-[#FD5C1E] to-[#D72C0D]', label: 'CONFIDENCE IN A CAPSULE' }
      },
      {
        name: 'Educational Carousel',
        size: '1080×1080',
        desc: '5-slide carousel for science content with numbered slides',
        uses: ['Content pillar: Education', 'Saves-driving content', 'Algorithm-friendly'],
        spec: { bg: '#003882', text: 'White + #87ADEF', font: 'Inter 700/400', slides: '5 slides min' },
        preview: { bg: 'from-[#003882] to-[#0052CC]', label: '5 THINGS ABOUT FLUSH' }
      },
      {
        name: 'Testimonial Quote',
        size: '1080×1080',
        desc: 'Customer quote over warm cream background with brand typography',
        uses: ['Social proof', 'Trust-building', 'Re-sharing UGC'],
        spec: { bg: '#FFF8F4', text: '#0D0D0D + #FD5C1E accent', font: 'Inter 800 italic', border: '3px orange' },
        preview: { bg: 'from-[#FFF8F4] to-[#FFE8DC]', label: '"Changed my celebrations"' }
      },
      {
        name: 'Before/After Split',
        size: '1080×1080',
        desc: 'Left/right split panel showing flush before vs. confidence after',
        uses: ['High-converting ads', 'Organic proof posts', 'TikTok thumbnails'],
        spec: { bg: 'Split: Gray / Orange', text: 'Contrast labels', font: 'Inter 900' },
        preview: { bg: 'from-gray-300 to-[#FD5C1E]', label: 'BEFORE → AFTER' }
      },
    ]
  },
  {
    category: 'Instagram Stories',
    icon: '📱',
    templates: [
      {
        name: 'Poll Engagement',
        size: '1080×1920',
        desc: 'Story with branded poll sticker prompt for daily engagement',
        uses: ['Algorithm boost', 'Audience research', 'Community building'],
        spec: { bg: '#FFF8F4', text: '#0D0D0D', sticker: 'Native IG poll', cta: 'Vote prompt' },
        preview: { bg: 'from-[#FFF8F4] to-[#FFE8DC]', label: 'Have you tried Joyn?' }
      },
      {
        name: 'Product Launch Story',
        size: '1080×1920',
        desc: 'Countdown + product reveal with swipe-up CTA',
        uses: ['Product launches', 'Flash sales', 'Limited drops'],
        spec: { bg: 'Full bleed orange', text: 'White', animation: 'Countdown sticker', cta: 'Swipe Up' },
        preview: { bg: 'from-[#FD5C1E] to-[#D72C0D]', label: 'NEW DROP TODAY' }
      },
      {
        name: 'UGC Repost Frame',
        size: '1080×1920',
        desc: 'Branded frame for resharing customer content with Joyn branding',
        uses: ['UGC amplification', 'Community spotlight', 'Social proof loop'],
        spec: { bg: 'Transparent/White', border: '4px orange frame', logo: 'Bottom left', watermark: 'Subtle' },
        preview: { bg: 'from-white to-orange-50', label: 'CUSTOMER SPOTLIGHT' }
      },
    ]
  },
  {
    category: 'TikTok',
    icon: '🎵',
    templates: [
      {
        name: 'Hook Title Card',
        size: '1080×1920',
        desc: 'First-frame bold text hook to stop scrolling',
        uses: ['Video openers', 'Educational content', 'POV hooks'],
        spec: { bg: 'Dark overlay on footage', text: 'White 900 weight', size: '48–64px', duration: '0.5–1s' },
        preview: { bg: 'from-[#0D0D0D] to-[#1a1a2e]', label: 'Why your face turns red' }
      },
      {
        name: 'Product Demo Overlay',
        size: '1080×1920',
        desc: 'Lower-third info bar for product demos with CTA',
        uses: ['How-to content', 'Ingredient breakdowns', 'Tutorial videos'],
        spec: { bg: 'Orange bar at bottom', text: 'White', height: '120px', cta: 'Link in bio' },
        preview: { bg: 'from-[#FD5C1E] to-[#D72C0D]', label: 'JOYN CAPSULE — Link in bio' }
      },
      {
        name: 'Before/After Transition',
        size: '1080×1920',
        desc: 'Split-screen transition template for flush transformation content',
        uses: ['Conversion content', 'Top-performing ad creative', 'UGC prompts'],
        spec: { left: 'Gray/muted', right: 'Orange/warm', transition: 'Swipe or wipe', duration: '3–5s' },
        preview: { bg: 'from-gray-600 to-[#FD5C1E]', label: 'THE JOYN DIFFERENCE' }
      },
    ]
  },
  {
    category: 'Paid Ads',
    icon: '💰',
    templates: [
      {
        name: 'Meta Single Image Ad',
        size: '1200×628',
        desc: 'Landscape ad for Facebook/Instagram feed placements',
        uses: ['Cold traffic campaigns', 'Retargeting', 'Conversion campaigns'],
        spec: { bg: 'Orange gradient', text: 'White', headline: '25 chars max', body: '125 chars max', cta: 'Shop Now' },
        preview: { bg: 'from-[#FD5C1E] to-[#D72C0D]', label: 'SHOP NOW → No flush, no shame' }
      },
      {
        name: 'Meta Story Ad',
        size: '1080×1920',
        desc: 'Full-screen story ad with native feel and clear CTA',
        uses: ['Story placements', 'Awareness campaigns', 'Retargeting warm audiences'],
        spec: { bg: 'Immersive full-bleed', safe: '250px top/bottom', cta: 'Swipe Up button', logo: 'Top left' },
        preview: { bg: 'from-[#003882] to-[#FD5C1E]', label: 'SWIPE UP For confidence' }
      },
      {
        name: 'TikTok Spark Ad Frame',
        size: '1080×1920',
        desc: 'Overlay frame to brand organic TikToks as Spark Ads',
        uses: ['Boosting top organic content', 'Whitelist creator ads', 'Performance creative'],
        spec: { overlay: 'Subtle orange border', cta: 'Learn More or Shop', badge: 'Sponsored tag area' },
        preview: { bg: 'from-[#0D0D0D] to-[#FD5C1E]', label: 'SPARK AD — Top organic post' }
      },
    ]
  },
]

const designSystem = [
  { name: 'Primary Orange', hex: '#FD5C1E', rgb: '253, 92, 30' },
  { name: 'Primary Red', hex: '#D72C0D', rgb: '215, 44, 13' },
  { name: 'Navy Blue', hex: '#003882', rgb: '0, 56, 130' },
  { name: 'Light Blue', hex: '#87ADEF', rgb: '135, 173, 239' },
  { name: 'Cream', hex: '#FFF8F4', rgb: '255, 248, 244' },
  { name: 'Dark', hex: '#0D0D0D', rgb: '13, 13, 13' },
]

export default function TemplatesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0D0D0D] via-[#1a1a2e] to-[#003882] px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-white/60 text-sm font-medium mb-6">13 Templates · 4 Platforms</div>
          <h1 className="text-5xl font-black text-white mb-4">Design Templates</h1>
          <p className="text-gray-400 text-lg">
            Reusable, on-brand templates for every social touchpoint. Figma-ready specs included.
          </p>
        </div>
      </section>

      {/* Design System Quick Ref */}
      <section className="py-12 px-6 bg-[#FAFAFA] border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-black text-[#0D0D0D]">Design System Quick Reference</h2>
              <p className="text-sm text-gray-500">Use these exact values in all templates</p>
            </div>
            <div className="text-sm text-gray-400">Font: Inter · All weights</div>
          </div>
          <div className="flex flex-wrap gap-3">
            {designSystem.map((c) => (
              <div key={c.hex} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100">
                <div className="w-8 h-8 rounded-lg border border-gray-100" style={{ backgroundColor: c.hex }}></div>
                <div>
                  <div className="text-sm font-bold text-[#0D0D0D]">{c.name}</div>
                  <div className="text-xs text-gray-400 font-mono">{c.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Categories */}
      {templateCategories.map((cat) => (
        <section key={cat.category} className="py-16 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{cat.icon}</span>
            <h2 className="text-3xl font-black text-[#0D0D0D]">{cat.category}</h2>
            <span className="ml-2 text-sm font-bold text-gray-400">{cat.templates.length} templates</span>
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-[#FD5C1E] to-[#D72C0D] rounded-full mb-8"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cat.templates.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover group">
                <div className={`h-40 bg-gradient-to-br ${t.preview.bg} flex items-center justify-center p-4`}>
                  <div className="text-center">
                    <div className="text-white font-black text-sm leading-tight">{t.preview.label}</div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-black text-[#0D0D0D] text-base">{t.name}</h3>
                    <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded shrink-0 ml-2">{t.size}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{t.desc}</p>

                  <div className="mb-3">
                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">Best for</div>
                    <div className="flex flex-wrap gap-1">
                      {t.uses.map((u) => (
                        <span key={u} className="text-xs px-2 py-0.5 bg-[#FFF8F4] text-[#FD5C1E] rounded-full">{u}</span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-50 pt-3">
                    <div className="text-xs font-bold text-gray-400 uppercase mb-2">Specs</div>
                    <div className="space-y-1">
                      {Object.entries(t.spec).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs">
                          <span className="text-gray-400 capitalize">{k}:</span>
                          <span className="text-gray-700 font-medium text-right max-w-32 truncate" title={String(v)}>{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Figma CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#FD5C1E] to-[#D72C0D]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready to Design?</h2>
          <p className="text-orange-100 text-lg mb-6">
            All templates follow these exact specs. Build them in Figma, Canva, or Adobe Express using the brand system above.
          </p>
          <div className="bg-white/20 rounded-2xl p-6 text-left">
            <div className="text-white font-bold mb-3">Figma Setup Checklist</div>
            <ul className="space-y-2 text-orange-100 text-sm">
              <li>Create color styles: Joyn Orange, Red, Navy, Light Blue, Cream, Dark</li>
              <li>Set up text styles: Display 900, H1 800, H2 700, Body 400, Label 600</li>
              <li>Import Inter font (Google Fonts)</li>
              <li>Create artboards at all specified sizes</li>
              <li>Set up auto-layout grids with 24px margins for feed, 64px safe zones for Stories</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
