'use client'

import { useState } from 'react'
import { featured, ventures, archive, Project } from '@/app/lib/data'
import Card3D from './Card3D'

export default function ExpoBentoProjects() {
  const [showAllArchive, setShowAllArchive] = useState(false)

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header (Expo style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              Flagship Products & Ventures
            </p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-2">
              Engineered for production.
            </h2>
          </div>
          <p className="text-sm text-neutral-400 mt-4 md:mt-0 max-w-md">
            From consumer mobile applications released on Google Play to offline AI inference and robotics hardware.
          </p>
        </div>

        {/* Bento Grid: 4 Flagship Projects with 3D Tilt */}
        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((p, idx) => (
            <Card3D
              key={p.name}
              depth={7}
              className="p-6 sm:p-8 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-400">0{idx + 1}</span>
                    <span className="text-neutral-600">/</span>
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                      {p.kicker}
                    </span>
                  </div>
                  {p.status && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/[0.06] border border-white/10 text-neutral-300">
                      {p.status}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 mt-4">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {p.name}
                  </h3>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="expo-btn-secondary !py-1 !px-3 text-xs font-mono text-emerald-300 hover:text-white flex items-center gap-1 shrink-0"
                    >
                      <span>{p.link.replace(/^https?:\/\//, '')}</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>

                <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                  {p.description}
                </p>

                {p.highlight && (
                  <div className="mt-4 p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2.5">
                    <span className="text-base">🥈</span>
                    <span className="text-xs font-semibold text-white">{p.highlight}</span>
                  </div>
                )}

                {p.features && (
                  <div className="mt-5 grid sm:grid-cols-2 gap-2">
                    {p.features.slice(0, 6).map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-neutral-300 font-mono">
                        <span className="text-emerald-400">✓</span>
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                {p.vision && (
                  <p className="mt-5 text-xs text-neutral-400 italic border-l border-white/20 pl-3">
                    Vision: {p.vision}
                  </p>
                )}
              </div>

              <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Card3D>
          ))}
        </div>

        {/* Ventures & Ecosystem Section with 3D Depth */}
        <div className="mt-20">
          <div className="mb-8">
            <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              Venture Building & Concepts
            </p>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mt-1">
              Startups & Research Initiatives
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ventures.map((v) => (
              <Card3D
                key={v.name}
                depth={6}
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                    {v.kicker}
                  </span>
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <h4 className="text-xl font-semibold text-white">{v.name}</h4>
                    {v.link && (
                      <a
                        href={v.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        Visit ↗
                      </a>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2.5 leading-relaxed">
                    {v.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {v.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] font-mono text-neutral-400 px-2 py-0.5 rounded bg-white/[0.03]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>

        {/* Client Deployments & Archive */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                Production Releases
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white mt-1">
                Client & Web Applications
              </h3>
            </div>
            <button
              onClick={() => setShowAllArchive(!showAllArchive)}
              className="expo-btn-secondary !py-1.5 !px-3.5 text-xs font-mono"
            >
              {showAllArchive ? 'Collapse' : `View All (${archive.length})`}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(showAllArchive ? archive : archive.slice(0, 4)).map((item) => (
              <Card3D
                key={item.name}
                depth={5}
                className="overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  {item.image && (
                    <div className="relative h-36 w-full bg-neutral-900 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold text-white text-base">{item.name}</h4>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{item.description}</p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1 flex items-center gap-4 text-xs font-mono">
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
                      Live App ↗
                    </a>
                  )}
                  {item.repo && (
                    <a href={item.repo} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white">
                      Source Code
                    </a>
                  )}
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
