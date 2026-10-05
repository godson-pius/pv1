'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Stack', href: '/#stack' },
  { label: 'Music', href: '/music' },
  { label: 'Articles', href: '/articles' },
  { label: 'Journey', href: '/#journey' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        {/* Floating 3D Rounded Glass Capsule */}
        <div
          className={`rounded-full px-3.5 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 flex items-center justify-between relative ${scrolled
            ? 'bg-[#090b11]/85 border-white/[0.22] shadow-[0_20px_50px_rgba(0,0,0,0.85),_0_0_30px_rgba(16,185,129,0.18)] backdrop-blur-2xl'
            : 'bg-[#0b0e17]/70 border-white/[0.16] shadow-[0_12px_36px_rgba(0,0,0,0.65),_inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-xl'
            } border`}
          style={{
            transform: 'translateZ(0)',
          }}
        >
          {/* Subtle top specular glass highlight */}
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

          {/* Logo with 3D profile picture badge */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-emerald-400 via-amber-300 to-teal-300 shadow-[0_4px_12px_rgba(16,185,129,0.35)] group-hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-950 border border-black/40">
                <Image
                  src="/profPic.png"
                  alt="Godson Pius"
                  fill
                  sizes="36px"
                  priority
                  className="object-cover object-top"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-white tracking-tight text-xs sm:text-sm group-hover:text-emerald-300 transition-colors">
                Godson Pius
              </span>
              <span className="text-[9px] uppercase tracking-wider font-mono text-emerald-400/90 leading-none">
                portfolio · v3
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (3D tactile pills) */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || (item.href.startsWith('/#') && pathname === '/')
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${isActive
                    ? 'text-white bg-white/[0.12] border border-white/20 shadow-inner'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.08] hover:border hover:border-white/10'
                    }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href="https://github.com/godson-pius"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/25 hover:bg-white/[0.1] transition-all font-mono shadow-sm"
            >
              <span>GitHub</span>
              <span className="text-neutral-500">↗</span>
            </a>

            {/* <Link
              href="/dashboard"
              title="Creator Studio (Protected)"
              className="text-xs text-neutral-400 hover:text-white p-2 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/25 transition-all flex items-center justify-center"
              aria-label="Dashboard"
            >
              <span>🔒</span>
            </Link> */}

            <Link
              href="/#contact"
              className="expo-btn-primary !py-1.5 !px-3.5 sm:!px-4 text-xs font-semibold shadow-[0_4px_16px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Let’s Talk
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown 3D Glass Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 rounded-3xl p-4 bg-[#0a0d16]/95 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            >
              🔒 Dashboard
            </Link>
            <div className="pt-2 border-t border-white/10 mt-2">
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="block text-center expo-btn-primary w-full py-2.5 text-xs font-semibold"
              >
                Let’s Talk
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
