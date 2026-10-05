'use client'

import { FormEventHandler, useRef, useState } from 'react'
import Link from 'next/link'
import emailjs from '@emailjs/browser'
import { profile } from '@/app/lib/data'
import Card3D from './Card3D'

export default function Contact() {
  const form = useRef<HTMLFormElement>(null)
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')

  const send: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setState('sending')
    emailjs.sendForm('service_w75yzjp', 'template_bathl5q', form.current!, 'P2w6wEwYIAeZK8r1g').then(
      () => {
        setState('ok')
        form.current?.reset()
      },
      () => setState('err'),
    )
  }

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
            Let’s Build
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-2">
            Have an idea worth building?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Have a problem technology could solve? Looking to collaborate, partner, invest, or simply connect? Reach out below.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Direct Details Card with 3D Depth */}
          <div className="lg:col-span-5">
            <Card3D depth={6} className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
                  Direct Channels
                </span>
                <h3 className="text-xl font-semibold text-white mt-2">{profile.name}</h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Founder · Full-Stack Developer · Product Builder
                </p>

                <div className="mt-6 space-y-4 text-sm font-mono">
                  <div>
                    <span className="text-xs text-neutral-500 block">Email Address</span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-white hover:text-emerald-400 transition-colors break-all"
                    >
                      {profile.email}
                    </a>
                  </div>

                  <div>
                    <span className="text-xs text-neutral-500 block">Phone / WhatsApp</span>
                    <a
                      href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                      className="text-white hover:text-emerald-400 transition-colors"
                    >
                      {profile.phone}
                    </a>
                  </div>

                  <div>
                    <span className="text-xs text-neutral-500 block">Current Location</span>
                    <p className="text-neutral-300">{profile.location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/[0.08]">
                <span className="text-xs font-mono text-neutral-400 block mb-2">Connect Across Platforms:</span>
                <div className="flex flex-wrap gap-2">
                  {profile.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 hover:text-white hover:border-white/20 transition-all"
                    >
                      {s.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </Card3D>
          </div>

          {/* Contact Message Form with 3D Depth */}
          <div className="lg:col-span-7">
            <Card3D depth={4} className="p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-white mb-2">Send a Message</h3>
              <p className="text-xs text-neutral-400 mb-6 font-mono">
                Direct inbox delivery via secure messaging service.
              </p>

              <form ref={form} onSubmit={send} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-neutral-400 block mb-1.5">
                      Your Name
                    </label>
                    <input
                      required
                      name="user_name"
                      type="text"
                      placeholder="e.g. Alex Chen"
                      autoComplete="name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-neutral-400 block mb-1.5">
                      Email Address
                    </label>
                    <input
                      required
                      name="user_email"
                      type="email"
                      placeholder="alex@company.com"
                      autoComplete="email"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-400 block mb-1.5">
                    Message / Project Brief
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="Tell me about your product, project, or collaboration..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="expo-btn-primary w-full sm:w-auto"
                >
                  {state === 'sending' ? 'Transmitting…' : 'Send Message →'}
                </button>

                <div role="status" className="text-xs font-mono min-h-5 pt-1">
                  {state === 'ok' && (
                    <span className="text-emerald-400">
                      ✓ Message received! I will reply to your email shortly.
                    </span>
                  )}
                  {state === 'err' && (
                    <span className="text-rose-400">
                      Notice: Transmission error. Please email godsonazubuike15@gmail.com directly.
                    </span>
                  )}
                </div>
              </form>
            </Card3D>
          </div>
        </div>

        {/* Exact Footer per User Request */}
        <footer className="mt-20 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-500">
          <div>© 2026 Godson Pius · World Brain Technology Limited · Gabvia. Medmask.</div>
          <Link
            href="/dashboard"
            className="hover:text-neutral-300 transition-colors flex items-center gap-1.5 opacity-60 hover:opacity-100"
          >
            <span>🔒</span>
            <span>Dashboard</span>
          </Link>
        </footer>
      </div>
    </section>
  )
}
