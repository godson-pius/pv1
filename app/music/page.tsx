'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useSongs } from '@/app/lib/store'

export default function MusicPage() {
  const songs = useSongs()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const song = songs[selectedIndex] || songs[0]

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // When song changes, reset audio state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      setCurrentTime(0)
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration || 0)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [song?.audioSrc])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false))
      setIsPlaying(true)
    }
  }

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

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
          <span className="text-white">Music</span>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-neutral-300 mb-4">
            <span>🎵 Musicianship & Brass Artistry</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white">
            Worship, Composition & Sound
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 leading-relaxed">
            Beyond engineering and venture building, music is an essential dimension of my life. I am a gospel vocalist, composer, and Tuba player in the Rwanda Territorial Band.
          </p>
        </div>

        {/* Featured Song Main Card */}
        <div className="expo-card p-6 sm:p-10 mb-12">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Album Cover */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
                <Image
                  src={song.coverImg}
                  alt={song.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono uppercase bg-black/75 border border-white/20 text-white backdrop-blur-md">
                  Original Release
                </span>
                {isPlaying && (
                  <div className="absolute bottom-4 inset-x-6 flex items-center justify-center gap-1.5">
                    {[45, 80, 100, 60, 95, 50, 90, 70, 40].map((h, idx) => (
                      <span
                        key={idx}
                        style={{ height: `${h}%` }}
                        className="w-1.5 bg-emerald-400 rounded-full animate-pulse"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Song Meta & Audio Controls */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-emerald-400">Featured Single</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-xs font-mono text-neutral-400">Gospel Worship</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight">
                  {song.title}
                </h2>
                <p className="text-sm sm:text-base font-medium text-neutral-300 mt-1">
                  Written & Performed by <span className="text-white">{song.artist}</span>
                </p>

                <p className="text-sm text-neutral-400 mt-4 leading-relaxed max-w-xl">
                  {song.description} An evocative arrangement combining heartfelt vocals, melodic piano, and rich atmospheric pads exploring faith and perseverance.
                </p>
              </div>

              {/* Scrubber & Player Bar */}
              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-full bg-white hover:bg-neutral-200 text-black flex items-center justify-center font-bold text-xl transition-transform active:scale-95 shrink-0 shadow-lg"
                    aria-label={isPlaying ? 'Pause song' : 'Play song'}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>

                  <div className="flex-1 space-y-1.5">
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      value={currentTime}
                      onChange={(e) => {
                        const target = Number(e.target.value)
                        if (audioRef.current) {
                          audioRef.current.currentTime = target
                          setCurrentTime(target)
                        }
                      }}
                      className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                    <div className="flex justify-between text-xs font-mono text-neutral-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>

                {/* External Actions */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={song.audioSrc}
                    download
                    className="expo-btn-primary !py-2 !px-4 text-xs font-semibold"
                  >
                    Download MP3 (Direct) ↓
                  </a>

                  <a
                    href={song.linktree}
                    target="_blank"
                    rel="noreferrer"
                    className="expo-btn-secondary !py-2 !px-4 text-xs font-semibold"
                  >
                    Stream on Linktree ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Releases & Discography Catalog */}
        {songs.length > 1 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">All Music Releases ({songs.length})</h3>
              <span className="text-xs font-mono text-neutral-400">Click any track to play</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {songs.map((item, idx) => (
                <div
                  key={item.title}
                  onClick={() => setSelectedIndex(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    selectedIndex === idx
                      ? 'bg-emerald-950/20 border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.15)]'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/15 bg-neutral-900 shrink-0">
                      <Image
                        src={item.coverImg}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 font-mono truncate">
                        {item.artist} · {item.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono text-neutral-400">
                      {item.duration}
                    </span>
                    <button
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        selectedIndex === idx && isPlaying
                          ? 'bg-emerald-400 text-black'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                      aria-label="Play track"
                    >
                      {selectedIndex === idx && isPlaying ? '⏸' : '▶'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Brass Musician Feature Card */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="expo-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎺</span>
              <div>
                <h3 className="text-xl font-semibold text-white">Rwanda Territorial Band</h3>
                <p className="text-xs font-mono text-neutral-400">Tuba Player & Brass Section</p>
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Playing the Tuba requires discipline, deep acoustic awareness, and timing within a multi-voice brass ensemble. Performing with the territorial band has cultivated my appreciation for harmonic structure and teamwork.
            </p>
          </div>

          <div className="expo-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎙️</span>
              <div>
                <h3 className="text-xl font-semibold text-white">Worship & Choral Leadership</h3>
                <p className="text-xs font-mono text-neutral-400">Youth & Community Music</p>
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Serving in choral direction and musical mentorship has been a core passion alongside building software. Harmonizing voices and mentoring upcoming vocalists mirrors the collaborative spirit of building software products.
            </p>
          </div>
        </div>

        <audio ref={audioRef} src={song.audioSrc} preload="metadata" />
      </main>

      <footer className="border-t border-white/[0.08] py-8 text-center text-xs text-neutral-500 font-mono">
        © 2026 Godson Pius · World Brain Technology Limited · Gabvia. Medmask.
      </footer>
    </div>
  )
}
