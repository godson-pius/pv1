'use client'

import Link from 'next/link'
import { useArticles } from '@/app/lib/store'
import Card3D from './Card3D'

export default function ExpoArticlesPreview() {
  const articles = useArticles()
  return (
    <section id="articles" className="py-20 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono text-neutral-300 mb-2">
              <span>✍️ Engineering Essays</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Writing & Thought Leadership
            </h2>
          </div>

          <Link
            href="/articles"
            className="expo-btn-secondary !py-2 !px-4 text-xs font-mono mt-4 md:mt-0 self-start md:self-end flex items-center gap-1.5"
          >
            <span>View All Articles ({articles.length})</span>
            <span>→</span>
          </Link>
        </div>

        {/* 2-column clean cards with 3D depth */}
        <div className="grid md:grid-cols-2 gap-6">
          {articles.slice(0, 4).map((art) => (
            <Link key={art.title} href="/articles" className="block group">
              <Card3D
                depth={6}
                className="p-6 sm:p-7 h-full flex flex-col justify-between group-hover:border-white/25 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span className="text-emerald-400">[{art.category}]</span>
                    <span>{art.date} · {art.readTime}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-white mt-3 group-hover:text-emerald-300 transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed line-clamp-3">
                    {art.snippet}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {art.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-neutral-400 px-2 py-0.5 rounded bg-white/[0.04] border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-neutral-300 group-hover:text-white flex items-center gap-1">
                    Read essay <span>→</span>
                  </span>
                </div>
              </Card3D>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
