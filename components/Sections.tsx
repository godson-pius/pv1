'use client'

import {
  profile, stats, focusAreas, stack, experience, education,
  achievements, building, beliefs, journey
} from '@/app/lib/data'
import Card3D from './Card3D'

export function ExpoAbout() {
  return (
    <section id="about" className="py-20 md:py-28 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
            Background & Foundation
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-2">
            Turning ideas into scalable, usable technology.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed">
            I work across the entire product lifecycle — from discovering the root problem and architecting the database to writing the code, deploying to cloud servers, and iterating with real users.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Story Card with 3D Depth */}
          <div className="lg:col-span-7 xl:col-span-8 h-full flex flex-col">
            <Card3D
              depth={5}
              className="p-6 sm:p-8 h-full flex flex-col justify-between"
              contentClassName="h-full flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Full-Cycle Engineering & Leadership</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  I’m Godson Pius (also known as Godson Azubuike), a founder, full-stack developer, product builder, technology educator, and entrepreneur with <b className="text-white">8+ years of experience</b> building software products across web, mobile, AI, fintech, health, agriculture, and IoT.
                </p>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  My journey started with learning to write code, but over the years it evolved into architecting products, launching startups, mentoring aspiring developers, and exploring how technology creates meaningful impact across Africa and beyond.
                </p>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Currently based in Rwanda studying <b className="text-white">Entrepreneurial Leadership at African Leadership University (ALU)</b>, where I combine technical software engineering with entrepreneurship, leadership, and business strategy.
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <span className="text-xs font-mono text-neutral-400 block mb-2.5">Domain Disciplines:</span>
                <div className="flex flex-wrap gap-1.5">
                  {focusAreas.map((area) => (
                    <span
                      key={area}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </Card3D>
          </div>

          {/* Quick Stats Grid with 3D Depth - vertically aligned with the left card */}
          <div className="lg:col-span-5 xl:col-span-4 grid grid-cols-2 grid-rows-2 gap-4 h-full">
            {stats.map((s) => (
              <Card3D
                key={s.label}
                depth={8}
                className="p-5 text-center h-full flex flex-col justify-center items-center"
                contentClassName="h-full flex flex-col justify-center items-center my-auto"
              >
                <p className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-mono">
                  {s.value}{s.suffix}
                </p>
                <p className="text-xs text-neutral-400 mt-1.5 font-mono">{s.label}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ExpoStack() {
  return (
    <section id="stack" className="py-20 md:py-28 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
            Technical Stack
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-2">
            Tools, frameworks & architectures.
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Battle-tested across production web applications, mobile apps, edge AI, and hardware robotics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stack.map((group) => (
            <Card3D key={group.title} depth={6} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-sm font-mono text-emerald-400">
                    {group.icon}
                  </span>
                  <h3 className="font-semibold text-white text-base">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-neutral-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ExpoJourney() {
  return (
    <section id="journey" className="py-20 md:py-28 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
            Experience & Journey
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-2">
            8+ Years of building & teaching.
          </h2>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {journey.map((step, idx) => (
              <span key={step} className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300">
                  {step}
                </span>
                {idx < journey.length - 1 && <span className="text-neutral-600 font-mono">→</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Timeline with 3D Depth */}
        <div className="space-y-6">
          {experience.map((exp) => (
            <Card3D key={exp.role + exp.org} depth={4} className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                  <p className="text-xs font-mono text-emerald-400 mt-0.5">{exp.org}</p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-neutral-400 self-start sm:self-auto">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
                {exp.text}
              </p>
              <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                {exp.points.map((pt) => (
                  <span key={pt} className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/[0.04] text-neutral-400">
                    {pt}
                  </span>
                ))}
              </div>
            </Card3D>
          ))}
        </div>

        {/* Education & Achievements Grid with 3D Depth */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <Card3D depth={6} className="p-6 sm:p-8">
            <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">Education</p>
            <h3 className="text-lg font-semibold text-white">African Leadership University (ALU)</h3>
            <p className="text-xs font-mono text-neutral-400 mt-0.5">BSc (Hons) Entrepreneurial Leadership · Rwanda</p>
            <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
              Combining technical depth with entrepreneurship, leadership, innovation, business models, and pan-African scalable ventures.
            </p>
            <div className="mt-4 pt-4 border-t border-white/[0.08]">
              <h4 className="text-sm font-semibold text-white">Applied Technology Education</h4>
              <p className="text-xs font-mono text-neutral-400 mt-0.5">Completed in India with distinction · Advanced Diploma (2020)</p>
            </div>
          </Card3D>

          <Card3D depth={6} className="p-6 sm:p-8">
            <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">Recognition</p>
            <div className="space-y-3">
              {achievements.map((ach) => (
                <div key={ach.title} className="flex items-start gap-3">
                  <span className="text-lg">{ach.icon}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{ach.title}</h4>
                    <p className="text-xs text-neutral-400">{ach.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card3D>
        </div>
      </div>
    </section>
  )
}

export function ExpoNow() {
  return (
    <section className="py-20 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
            Active Exploration
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mt-1">
            What I’m building right now.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {building.map((item) => (
            <Card3D key={item.name} depth={7} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">In Progress</span>
                </div>
                <h3 className="font-semibold text-white text-base">{item.name}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">{item.text}</p>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ExpoBeyond() {
  return (
    <section className="py-20 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
            Convictions
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-2">
            What I believe.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card3D depth={5} className="p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-white mb-4">Core Principles</h3>
            <ul className="space-y-3.5">
              {beliefs.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-neutral-300 leading-relaxed">
                  <span className="text-emerald-400 font-mono mt-0.5">✦</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card3D>

          <Card3D depth={5} className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Leadership & Mission</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Beyond coding, I have been actively involved in leadership, youth development, and mentorship. I believe developers should not only learn how to write code, but also learn how to identify real problems, understand users, and build sustainable enterprises.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest">The Mission</p>
              <p className="text-sm font-medium text-white mt-1 leading-relaxed">
                To use technology, entrepreneurship, and leadership to build products that solve meaningful problems and create opportunities for people across Africa and beyond.
              </p>
            </div>
          </Card3D>
        </div>
      </div>
    </section>
  )
}
