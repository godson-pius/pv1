'use client'

import { useEffect, useState } from 'react'
import { articles as defaultArticles, songs as defaultSongs } from './data'

export type Article = {
  title: string
  snippet: string
  date: string
  readTime: string
  tags: string[]
  category: string
  image?: string
  content?: string
}

export type Song = {
  title: string
  artist: string
  role: string
  description: string
  audioSrc: string
  coverImg: string
  duration: string
  linktree: string
}

const ARTICLES_KEY = 'godson_portfolio_articles_v1'
const SONGS_KEY = 'godson_portfolio_songs_v1'
const AUTH_KEY = 'godson_portfolio_auth_token_v1'

export const AUTH_CREDENTIALS = {
  username: 'godsonpius',
  passcode: '079990855708147871946',
}

export function isUserAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(AUTH_KEY) === 'authenticated'
}

export function authenticateUser(user: string, pass: string): boolean {
  if (user.trim().toLowerCase() === AUTH_CREDENTIALS.username && pass.trim() === AUTH_CREDENTIALS.passcode) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, 'authenticated')
    }
    return true
  }
  return false
}

export function logoutUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY)
  }
}

export function getStoredArticles(): Article[] {
  if (typeof window === 'undefined') return defaultArticles
  try {
    const raw = localStorage.getItem(ARTICLES_KEY)
    if (!raw) {
      localStorage.setItem(ARTICLES_KEY, JSON.stringify(defaultArticles))
      return defaultArticles
    }
    return JSON.parse(raw)
  } catch {
    return defaultArticles
  }
}

export function saveArticleToStorage(article: Article): Article[] {
  if (typeof window === 'undefined') return defaultArticles
  const current = getStoredArticles()
  const updated = [article, ...current.filter((a) => a.title.toLowerCase() !== article.title.toLowerCase())]
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(updated))
  window.dispatchEvent(new Event('portfolio-articles-updated'))
  return updated
}

export function deleteArticleFromStorage(title: string): Article[] {
  if (typeof window === 'undefined') return defaultArticles
  const current = getStoredArticles()
  const updated = current.filter((a) => a.title.toLowerCase() !== title.toLowerCase())
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(updated))
  window.dispatchEvent(new Event('portfolio-articles-updated'))
  return updated
}

export function getStoredSongs(): Song[] {
  if (typeof window === 'undefined') return defaultSongs
  try {
    const raw = localStorage.getItem(SONGS_KEY)
    if (!raw) {
      localStorage.setItem(SONGS_KEY, JSON.stringify(defaultSongs))
      return defaultSongs
    }
    return JSON.parse(raw)
  } catch {
    return defaultSongs
  }
}

export function saveSongToStorage(song: Song): Song[] {
  if (typeof window === 'undefined') return defaultSongs
  const current = getStoredSongs()
  const updated = [song, ...current.filter((s) => s.title.toLowerCase() !== song.title.toLowerCase())]
  localStorage.setItem(SONGS_KEY, JSON.stringify(updated))
  window.dispatchEvent(new Event('portfolio-songs-updated'))
  return updated
}

export function deleteSongFromStorage(title: string): Song[] {
  if (typeof window === 'undefined') return defaultSongs
  const current = getStoredSongs()
  const updated = current.filter((s) => s.title.toLowerCase() !== title.toLowerCase())
  localStorage.setItem(SONGS_KEY, JSON.stringify(updated))
  window.dispatchEvent(new Event('portfolio-songs-updated'))
  return updated
}

export function useArticles() {
  const [data, setData] = useState<Article[]>(defaultArticles)

  useEffect(() => {
    setData(getStoredArticles())
    const handler = () => setData(getStoredArticles())
    window.addEventListener('portfolio-articles-updated', handler)
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener('portfolio-articles-updated', handler)
      window.removeEventListener('storage', handler)
    }
  }, [])

  return data
}

export function useSongs() {
  const [data, setData] = useState<Song[]>(defaultSongs)

  useEffect(() => {
    setData(getStoredSongs())
    const handler = () => setData(getStoredSongs())
    window.addEventListener('portfolio-songs-updated', handler)
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener('portfolio-songs-updated', handler)
      window.removeEventListener('storage', handler)
    }
  }, [])

  return data
}
