'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

export default function HeroPortrait3D() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    // normalized -1 to +1
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    setCoords({ x, y })
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
    setCoords({ x: 0, y: 0 })
  }

  // Smooth transform calculation
  const rotateX = isHovered ? -coords.y * 14 : 0
  const rotateY = isHovered ? coords.x * 16 : 0
  const glareX = (coords.x + 1) * 50
  const glareY = (coords.y + 1) * 50

  return (
    <div
      className="relative w-full max-w-[440px] aspect-[4/5] mx-auto perspective-[1200px] select-none"
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/25 via-amber-500/15 to-teal-400/20 rounded-[2.5rem] blur-3xl transform -rotate-3 scale-95 opacity-70 animate-pulse duration-[4000ms]" />

      {/* Main 3D Tilted Card */}
      <div
        ref={cardRef}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className="relative w-full h-full rounded-[2.2rem] p-3.5 bg-gradient-to-b from-white/15 via-white/5 to-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] group transform-gpu overflow-visible"
      >
        {/* Dynamic Light Sheen / Holographic glare */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-[2.2rem] pointer-events-none transition-opacity duration-300 opacity-60 z-30"
          style={{
            background: `radial-gradient(550px circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.28), rgba(16, 185, 129, 0.15) 30%, transparent 60%)`,
          }}
        />

        {/* Outer glowing border ring */}
        <div className="absolute -inset-[1px] rounded-[2.3rem] bg-gradient-to-tr from-emerald-500/40 via-amber-400/30 to-teal-400/40 -z-10 pointer-events-none" />

        {/* Inner Portrait Wrapper */}
        <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-[#070b14] border border-white/10 shadow-inner">
          <Image
            src="/profPic.png"
            alt="Godson Pius · Founder & Full-Stack Developer"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 440px"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />

          {/* Vignette & cinematic contrast gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060a12] via-[#060a12]/20 to-transparent opacity-85 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/20 via-transparent to-amber-950/20 pointer-events-none" />

          {/* Floating bottom badge inside portrait */}
          <div className="absolute bottom-5 inset-x-5 z-20">
            <div className="glass px-4 py-3 rounded-2xl border-white/20 bg-slate-950/70 backdrop-blur-md flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Founder & Builder
                </p>
                <h4 className="text-white font-bold text-base mt-0.5">Godson Pius</h4>
              </div>
              <span className="text-[11px] font-mono text-slate-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                Kigali, RW
              </span>
            </div>
          </div>
        </div>

        {/* 3D Floating Layer 1: Top-Left "8+ Years" Pill (Pushed forward in Z-space) */}
        <div
          style={{
            transform: `translateZ(${isHovered ? 45 : 20}px) translateX(${isHovered ? coords.x * 12 : 0}px) translateY(${isHovered ? coords.y * 12 : 0}px)`,
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
          }}
          className="absolute -top-3 -left-3 sm:-left-5 z-40 glass px-3.5 py-2 rounded-2xl border-white/25 bg-[#0b1322]/90 backdrop-blur-xl shadow-xl flex items-center gap-2.5"
        >
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
            8+
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold leading-none">Experience</p>
            <p className="text-xs font-bold text-white leading-tight mt-0.5">Years Shipping</p>
          </div>
        </div>

        {/* 3D Floating Layer 2: Bottom-Right "VunaLink 🥈 2nd Place" Pill */}
        <div
          style={{
            transform: `translateZ(${isHovered ? 50 : 25}px) translateX(${isHovered ? coords.x * -12 : 0}px) translateY(${isHovered ? coords.y * -12 : 0}px)`,
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
          }}
          className="absolute -bottom-3 -right-3 sm:-right-5 z-40 glass px-3.5 py-2.5 rounded-2xl border-white/25 bg-[#0b1322]/90 backdrop-blur-xl shadow-xl flex items-center gap-2.5"
        >
          <div className="text-lg">🥈</div>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold leading-none">TechX Winner</p>
            <p className="text-xs font-bold text-white leading-tight mt-0.5">2nd of 88 Rivals</p>
          </div>
        </div>

        {/* 3D Floating Layer 3: Upper-Right Micro Chip */}
        <div
          style={{
            transform: `translateZ(${isHovered ? 35 : 15}px) translateX(${isHovered ? coords.x * 8 : 0}px)`,
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
          }}
          className="absolute top-8 -right-3 z-40 glass px-3 py-1 rounded-full border-white/20 bg-emerald-500/20 text-emerald-300 text-[11px] font-medium backdrop-blur-md shadow-lg"
        >
          ✦ ALUniverse Leader
        </div>
      </div>
    </div>
  )
}
