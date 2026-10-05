'use client'

import { useRef, useState, ReactNode } from 'react'

interface Card3DProps {
  children: ReactNode
  className?: string
  contentClassName?: string
  accent?: string
  depth?: number
  glare?: boolean
}

export default function Card3D({
  children,
  className = '',
  contentClassName = '',
  accent = '#10b981',
  depth = 8,
  glare = true,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const rotX = (0.5 - y) * depth
    const rotY = (x - 0.5) * depth

    setTilt({ x: rotX, y: rotY })
    setGlarePos({ x: x * 100, y: y * 100, opacity: 1 })
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
    setGlarePos((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? 6 : 0}px)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative rounded-2xl border transition-all duration-300 ${
        isHovered
          ? 'border-white/25 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.85),_0_0_25px_rgba(16,185,129,0.12)]'
          : 'border-white/[0.1] shadow-[0_12px_30px_-8px_rgba(0,0,0,0.7)]'
      } bg-gradient-to-br from-[#12151e]/85 to-[#090b10]/90 backdrop-blur-xl ${className}`}
    >
      {/* Specular glare overlay */}
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-10"
          style={{
            opacity: glarePos.opacity * 0.35,
            background: `radial-gradient(450px circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.22), transparent 70%)`,
          }}
        />
      )}

      {/* Top 3D specular bevel border */}
      <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10" />

      {/* Card Content with 3D child preservation */}
      <div className={`relative z-0 h-full w-full ${contentClassName}`}>{children}</div>
    </div>
  )
}
