'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useArticles, Article } from '@/app/lib/store'

export default function ArticlesPage() {
  const articles = useArticles()
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [readingArticle, setReadingArticle] = useState<Article | null>(null)

  const categories = ['All', 'Architecture', 'Engineering', 'Leadership', 'Venture']

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = activeCategory === 'All' || art.category === activeCategory
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-36 md:pb-24 w-full flex-1">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">Articles</span>
        </div>

        {/* Page Header (Expo style) */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-neutral-300 mb-4">
            <span>✍️ Technical Teardowns & Essays</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white">
            Writing & Perspectives
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 leading-relaxed">
            In-depth writings on edge AI architectures, multilingual messaging, pedagogical lessons from mentoring developers, and entrepreneurial leadership across Africa.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-black font-semibold'
                    : 'bg-white/[0.05] text-neutral-400 hover:text-white hover:bg-white/[0.1] border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search essays, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 font-mono"
            />
          </div>
        </div>

        {/* Articles List */}
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center expo-card">
            <p className="text-sm font-mono text-neutral-400">No articles match your search query.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredArticles.map((art) => (
              <div
                key={art.title}
                onClick={() => setReadingArticle(art)}
                className="expo-card p-6 sm:p-8 flex flex-col justify-between hover:border-white/25 transition-all duration-200 cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                    <span className="text-emerald-400">[{art.category}]</span>
                    <span>
                      {art.date} · {art.readTime}
                    </span>
                  </div>

                  {art.image && (
                    <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 border border-white/10 bg-neutral-900">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <h2 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {art.title}
                  </h2>

                  <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                    {art.snippet}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {art.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-neutral-400 px-2 py-0.5 rounded bg-white/[0.04] border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-neutral-300 group-hover:text-white flex items-center gap-1">
                    Read Essay <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Guest Writing & Collaboration Callout */}
        <div className="mt-16 expo-card p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Have a technical topic to discuss or co-author?</h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              I collaborate with founders, researchers, and engineers on topics in African tech infrastructure and systems design.
            </p>
          </div>
          <a
            href="mailto:godsonazubuike15@gmail.com?subject=Article%20Collaboration"
            className="expo-btn-primary shrink-0 text-xs"
          >
            Get in Touch ✉️
          </a>
        </div>

        {/* Article Reader Modal */}
        {readingArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-200">
            <div className="expo-card max-w-2xl w-full p-6 sm:p-10 border border-white/20 bg-neutral-950 shadow-2xl relative max-h-[85vh] overflow-y-auto">
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center text-sm transition-colors"
                aria-label="Close article modal"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                <span>[{readingArticle.category}]</span>
                <span className="text-neutral-600">·</span>
                <span>{readingArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                {readingArticle.title}
              </h2>

              <p className="text-xs text-neutral-500 font-mono mt-1">
                Published by Godson Pius · {readingArticle.date}
              </p>

              {readingArticle.image && (
                <div className="w-full h-56 rounded-2xl overflow-hidden mt-4 border border-white/15 bg-neutral-900">
                  <img
                    src={readingArticle.image}
                    alt={readingArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="mt-6 space-y-4 text-neutral-300 text-sm leading-relaxed border-t border-white/10 pt-6">
                <p className="text-base text-neutral-100 font-medium italic border-l-2 border-emerald-400 pl-4">
                  “{readingArticle.snippet}”
                </p>

                {readingArticle.content ? (
                  <div className="whitespace-pre-line space-y-3">
                    {readingArticle.content}
                  </div>
                ) : (
                  <>
                    <p>
                      Across high-growth African technology environments, building resilient digital products requires thinking beyond ideal Silicon Valley assumptions. Whether addressing network intermittency in rural agriculture with VunaLink or bridging multilingual real-time communication with Gabvia, the core bottleneck is rarely syntax — it is context.
                    </p>

                    <p>
                      True engineering maturity lies in designing systems that tolerate physical and infrastructural constraints gracefully. Offline-first queues, edge machine learning with ONNX Runtime, and automated payment fallbacks transform products from fragile experiments into mission-critical everyday tools.
                    </p>

                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mt-4">
                      <p className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-semibold">
                        Core Architectural Principle
                      </p>
                      <p className="text-xs text-neutral-300 mt-1">
                        Start with the physical, infrastructural, and human constraints of your users before adopting cloud-native complexity. Simplicity and resilience always triumph in the field.
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setReadingArticle(null)}
                  className="expo-btn-primary !py-2 !px-6 text-xs font-semibold"
                >
                  Close Essay
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-white/[0.08] py-8 text-center text-xs text-neutral-500 font-mono">
        © 2026 Godson Pius · World Brain Technology Limited · Gabvia. Medmask.
      </footer>
    </div>
  )
}
