'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSongs } from '@/app/lib/store'
import Card3D from './Card3D'

export default function ExpoMusicPreview() {
  const songs = useSongs()
  const song = songs[0]
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

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
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
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
    <section id="music" className="py-20 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-2">
              <span>🎵 Music & Musicianship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Vocalist & Brass Musician
            </h2>
          </div>

          <Link
            href="/music"
            className="expo-btn-secondary !py-2 !px-4 text-xs font-mono mt-4 md:mt-0 self-start md:self-end flex items-center gap-1.5"
          >
            <span>View Full Music Page</span>
            <span>→</span>
          </Link>
        </div>

        {/* 3D Interactive Audio Showcase Card */}
        <Card3D depth={6} className="p-6 sm:p-8">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            {/* Album Cover Art with 3D Depth */}
            <div className="md:col-span-4 flex justify-center md:justify-start">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.8)] group">
                <Image
                  src={song.coverImg}
                  alt={song.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-black/75 border border-white/20 text-white backdrop-blur-md">
                  Single
                </span>
                {isPlaying && (
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-center gap-1">
                    {[35, 75, 100, 50, 85, 40, 90, 65, 30].map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${h}%` }}
                        className="w-1 bg-emerald-400 rounded-full animate-pulse"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Track Info & Quick Controls */}
            <div className="md:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-emerald-400">Featured Release</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-xs font-mono text-neutral-400">Gospel Worship</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold text-white">
                  {song.title}
                </h3>
                <p className="text-sm font-medium text-neutral-300 mt-0.5">
                  {song.artist} <span className="text-neutral-500">·</span> {song.role}
                </p>
                <p className="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed max-w-xl">
                  {song.description} In addition to composing and singing, I play the Tuba in the Rwanda Territorial Band.
                </p>
              </div>

              {/* Scrubber & Player Controls */}
              <div className="mt-6 pt-5 border-t border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-white hover:bg-neutral-200 text-black flex items-center justify-center font-bold text-base transition-transform active:scale-95 shrink-0 shadow-[0_4px_16px_rgba(255,255,255,0.3)]"
                    aria-label={isPlaying ? 'Pause song' : 'Play song'}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>

                  <div className="flex-1 space-y-1">
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
                      className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-neutral-500">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono">
                  <a
                    href={song.audioSrc}
                    download
                    className="expo-btn-secondary !py-1.5 !px-3 text-xs"
                  >
                    Download MP3 ↓
                  </a>
                  <Link
                    href="/music"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    Liner notes & story →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Card3D>

        <audio ref={audioRef} src={song.audioSrc} preload="metadata" />
      </div>
    </section>
  )
}
