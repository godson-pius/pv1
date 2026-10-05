'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { profile } from '@/app/lib/data'

export default function ExpoHero() {
  const [copied, setCopied] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    setTilt({ x: x * 10, y: -y * 10 })
  }

  const handleCopyCmd = () => {
    navigator.clipboard.writeText('npx godson-pius --build')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative pt-28 pb-20 md:pt-36 lg:pt-40 md:pb-28 overflow-hidden expo-grid-bg">
      {/* Background ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-neutral-300 mb-6 hover:border-white/20 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for Ventures & Product Architecture</span>
              <span className="text-neutral-500">·</span>
              <span className="text-emerald-400">8+ Years Experience</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.05]">
              Build products that solve{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                real problems.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed">
              I’m <b className="text-white font-medium">Godson Pius</b> (aka Godson Azubuike) — founder, full-stack engineer, and product builder. Studying Entrepreneurial Leadership at ALU Rwanda while deploying software across Africa and beyond.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="expo-btn-primary">
                <span>Explore Featured Work</span>
                <span className="ml-1.5 font-mono">→</span>
              </a>

              <a
                href="/GodsonAzubuike.pdf"
                target="_blank"
                rel="noreferrer"
                className="expo-btn-secondary"
              >
                <span>Download Résumé</span>
                <span className="ml-1.5 text-neutral-500 font-mono">↗</span>
              </a>

              <Link href="/music" className="expo-btn-secondary text-neutral-300 hover:text-white">
                <span>Listen to Music 🎵</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Expo Simulator 3D Frame with profPic */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative w-full max-w-[380px] perspective-[1000px]"
              onPointerMove={handlePointerMove}
              onPointerEnter={() => setIsHovering(true)}
              onPointerLeave={() => {
                setIsHovering(false)
                setTilt({ x: 0, y: 0 })
              }}
            >
              {/* Outer Device Frame (Expo Hardware simulator styling) */}
              <div
                style={{
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale3d(${isHovering ? 1.02 : 1}, ${isHovering ? 1.02 : 1}, 1)`,
                  transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
                className="relative rounded-[2.5rem] p-3 bg-gradient-to-b from-neutral-800/90 via-neutral-900/90 to-neutral-950/90 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              >
                {/* Simulator Speaker / Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full bg-black/80 border border-white/10 z-30 flex items-center justify-center gap-2">
                  <div className="w-10 h-1 rounded-full bg-neutral-800" />
                  <div className="w-2 h-2 rounded-full bg-neutral-900" />
                </div>

                {/* Inner Screen Surface */}
                <div className="relative aspect-[9/13] w-full rounded-[2rem] overflow-hidden bg-black border border-white/10">
                  {/* Portrait */}
                  <Image
                    src="/profPic.png"
                    alt="Godson Pius"
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 pointer-events-none" />

                  {/* Top Live Pill */}
                  <div className="absolute top-7 left-4 right-4 z-20 flex justify-between items-center text-[10px] font-mono text-neutral-300">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
                      9:41 AM
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      BUILDER LIVE
                    </span>
                  </div>

                  {/* Bottom Identity Card inside simulator */}
                  <div className="absolute bottom-4 inset-x-4 z-20 p-4 rounded-2xl bg-neutral-950/80 border border-white/15 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold text-sm">Godson Pius</p>
                        <p className="text-xs text-neutral-400 font-mono">Founder · Full-Stack</p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Kigali, RW
                      </span>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-300 font-mono">
                      <span>🥈 TechX Hackathon</span>
                      <span className="text-neutral-500">·</span>
                      <span>Google Play</span>
                    </div>
                  </div>
                </div>

                {/* Floating telemetry tag 1 */}
                <div className="absolute -top-3 -left-4 z-40 px-3 py-1.5 rounded-xl bg-black/90 border border-white/20 text-[11px] font-mono text-white shadow-xl flex items-center gap-2 backdrop-blur-md">
                  <span className="text-emerald-400">⚡</span>
                  <span>8+ Years Shipping</span>
                </div>

                {/* Floating telemetry tag 2 */}
                <div className="absolute -bottom-3 -right-4 z-40 px-3 py-1.5 rounded-xl bg-black/90 border border-white/20 text-[11px] font-mono text-white shadow-xl flex items-center gap-2 backdrop-blur-md">
                  <span className="text-amber-400">🎓</span>
                  <span>ALU Leader</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expo-Style Proof Bar / Key Metrics */}
        <div className="mt-20 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <p className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">8+ Years</p>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-mono">Full-Stack & Mobile Dev</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">12+ Products</p>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-mono">Shipped to Production</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-semibold text-emerald-400 tracking-tight">2nd / 88</p>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-mono">TechX Hackathon Rwanda</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">Founder</p>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-mono">World Brain Tech · 2020</p>
          </div>
        </div>
      </div>
    </section>
  )
}
