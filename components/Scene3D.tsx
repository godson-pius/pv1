'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Fixed full-screen 3D ambient canvas: an executive obsidian-emerald core,
 * wireframe orbit rings, floating polyhedra and interactive star field.
 * Reacts dynamically to mouse coordinates and scroll velocity.
 */
export default function Scene3D() {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mount.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x040810, 0.032)
    const camera = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 200)
    camera.position.set(0, 0, 9)

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setSize(el.clientWidth, el.clientHeight)
    el.appendChild(renderer.domElement)

    // ---- Core group (positioned to side so it frames content)
    const core = new THREE.Group()
    scene.add(core)

    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.2, 1),
      new THREE.MeshPhysicalMaterial({
        color: 0x059669,
        metalness: 0.3,
        roughness: 0.15,
        transmission: 0.65,
        thickness: 1.4,
        transparent: true,
        opacity: 0.5,
        flatShading: true,
        emissive: 0x047857,
        emissiveIntensity: 0.5,
      }),
    )
    core.add(ico)

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.55, 2),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.25 }),
    )
    core.add(wire)

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.1, 0.22, 160, 20, 2, 3),
      new THREE.MeshStandardMaterial({
        color: 0x14b8a6,
        metalness: 0.85,
        roughness: 0.2,
        emissive: 0x0f766e,
        emissiveIntensity: 0.45,
      }),
    )
    core.add(knot)

    const ringMat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.45 })
    const rings: THREE.Mesh[] = []
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(3.2 + i * 0.55, 0.012, 8, 160), ringMat)
      ring.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
      core.add(ring)
      rings.push(ring)
    }

    // ---- Floating polyhedra
    const shapes: { m: THREE.Mesh; speed: number; off: number; base: THREE.Vector3 }[] = []
    const geos = [
      new THREE.OctahedronGeometry(0.35),
      new THREE.TetrahedronGeometry(0.4),
      new THREE.BoxGeometry(0.45, 0.45, 0.45),
      new THREE.TorusGeometry(0.28, 0.08, 12, 32),
    ]
    const colors = [0x10b981, 0xf59e0b, 0x14b8a6, 0x34d399, 0xfbbf24]
    const shapeCount = isMobile ? 8 : 20
    for (let i = 0; i < shapeCount; i++) {
      const m = new THREE.Mesh(
        geos[i % geos.length],
        new THREE.MeshStandardMaterial({
          color: colors[i % colors.length],
          metalness: 0.7,
          roughness: 0.25,
          emissive: colors[i % colors.length],
          emissiveIntensity: 0.3,
        }),
      )
      const base = new THREE.Vector3((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 32 - 4, (Math.random() - 0.5) * 12 - 3)
      m.position.copy(base)
      scene.add(m)
      shapes.push({ m, speed: 0.2 + Math.random() * 0.6, off: Math.random() * 10, base })
    }

    // ---- Star field
    const starCount = isMobile ? 600 : 1600
    const pos = new Float32Array(starCount * 3)
    const col = new Float32Array(starCount * 3)
    const c = new THREE.Color()
    for (let i = 0; i < starCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70
      pos[i * 3 + 1] = (Math.random() - 0.5) * 90
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50 - 10
      // Warm gold & emerald green spectrum
      if (Math.random() > 0.4) {
        c.setHSL(0.42 + Math.random() * 0.12, 0.85, 0.7) // emerald/teal
      } else {
        c.setHSL(0.1 + Math.random() * 0.08, 0.85, 0.75) // warm amber gold
      }
      col.set([c.r, c.g, c.b], i * 3)
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ size: 0.06, vertexColors: true, transparent: true, opacity: 0.85, sizeAttenuation: true }),
    )
    scene.add(stars)

    // ---- Ambient & Point Lights
    scene.add(new THREE.AmbientLight(0x064e3b, 0.6))
    const l1 = new THREE.PointLight(0x10b981, 60, 40)
    l1.position.set(6, 4, 6)
    scene.add(l1)

    const l2 = new THREE.PointLight(0xf59e0b, 55, 40)
    l2.position.set(-6, -3, 5)
    scene.add(l2)

    const l3 = new THREE.PointLight(0x14b8a6, 40, 40)
    l3.position.set(0, 6, -4)
    scene.add(l3)

    // ---- Mouse and Scroll Events
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1
    }

    let scroll = 0
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scroll = max > 0 ? window.scrollY / max : 0
    }

    const onResize = () => {
      if (!el) return
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    onScroll()

    const clock = new THREE.Clock()
    let raf = 0
    let smoothScroll = 0

    const render = () => {
      const t = clock.getElapsedTime()
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      smoothScroll += (scroll - smoothScroll) * 0.06

      ico.rotation.x = t * 0.15
      ico.rotation.y = t * 0.2
      wire.rotation.x = -t * 0.1
      wire.rotation.y = -t * 0.12
      knot.rotation.x = t * 0.4
      knot.rotation.y = t * 0.3
      rings.forEach((r, i) => {
        r.rotation.z += 0.002 * (i + 1)
        r.rotation.x += 0.001
      })

      const pulse = 1 + Math.sin(t * 1.5) * 0.03
      core.scale.setScalar(pulse * (1 - smoothScroll * 0.35))

      // core floats gently in background
      const xBase = isMobile ? 0 : 3.4
      core.position.x = xBase * (1 - smoothScroll * 1.6) + Math.sin(smoothScroll * Math.PI * 4) * 2
      core.position.y = -smoothScroll * 22 + 0.3
      core.position.z = -Math.sin(smoothScroll * Math.PI) * 3
      core.rotation.y = mouse.x * 0.5 + smoothScroll * 6
      core.rotation.x = mouse.y * 0.3

      shapes.forEach((s) => {
        s.m.rotation.x += 0.005 * s.speed * 2
        s.m.rotation.y += 0.007 * s.speed * 2
        s.m.position.y = s.base.y + Math.sin(t * s.speed + s.off) * 0.6
        s.m.position.x = s.base.x + Math.cos(t * s.speed * 0.7 + s.off) * 0.4
      })

      stars.rotation.y = t * 0.01 + mouse.x * 0.05
      camera.position.y = -smoothScroll * 22
      camera.position.x = mouse.x * 0.6
      camera.position.y += -mouse.y * 0.4
      camera.lookAt(camera.position.x * 0.3, -smoothScroll * 22, 0)
      l1.position.y = 4 - smoothScroll * 22
      l2.position.y = -3 - smoothScroll * 22
      l3.position.y = 6 - smoothScroll * 22
      stars.position.y = -smoothScroll * 22 * 0.6

      renderer.render(scene, camera)
      if (!reduce) raf = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        if (m.geometry) m.geometry.dispose()
        const mat = m.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
        else mat?.dispose()
      })
      renderer.dispose()
      if (renderer.domElement && el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mount} aria-hidden className="fixed inset-0 -z-10 pointer-events-none" />
}
