'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Card3D from '@/components/Card3D'
import {
  Article,
  Song,
  useArticles,
  useSongs,
  saveArticleToStorage,
  deleteArticleFromStorage,
  saveSongToStorage,
  deleteSongFromStorage,
  authenticateUser,
  isUserAuthenticated,
  logoutUser,
  AUTH_CREDENTIALS,
} from '@/app/lib/store'

export default function DashboardPage() {
  const [authed, setAuthed] = useState<boolean>(false)

  // Login form state
  const [usernameInput, setUsernameInput] = useState('')
  const [passcodeInput, setPasscodeInput] = useState('')
  const [showPasscode, setShowPasscode] = useState(false)
  const [loginError, setLoginError] = useState('')

  // Active tab
  const [activeTab, setActiveTab] = useState<'articles' | 'music'>('articles')
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // Hook data
  const articles = useArticles()
  const songs = useSongs()

  // Article form state
  const [artTitle, setArtTitle] = useState('')
  const [artCategory, setArtCategory] = useState('Architecture')
  const [artCustomCategory, setArtCustomCategory] = useState('')
  const [artReadTime, setArtReadTime] = useState('5 min read')
  const [artDate, setArtDate] = useState('Oct 2026')
  const [artTags, setArtTags] = useState('System Design, Edge AI, Resilience')
  const [artImage, setArtImage] = useState('')
  const [artSnippet, setArtSnippet] = useState('')
  const [artContent, setArtContent] = useState('')

  // Music form state
  const [songTitle, setSongTitle] = useState('')
  const [songArtist, setSongArtist] = useState('Godson Pius')
  const [songRole, setSongRole] = useState('Composer & Vocalist')
  const [songDescription, setSongDescription] = useState('')
  const [songAudioSrc, setSongAudioSrc] = useState('/media/track.mp3')
  const [songCoverImg, setSongCoverImg] = useState('/profPic.png')
  const [songDuration, setSongDuration] = useState('4:15')
  const [songLinktree, setSongLinktree] = useState('https://linktr.ee/godsonpius')

  useEffect(() => {
    setAuthed(isUserAuthenticated())
  }, [])

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackMsg({ text, type })
    setTimeout(() => {
      setFeedbackMsg(null)
    }, 4000)
  }

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    setLoginError('')
    const success = authenticateUser(usernameInput, passcodeInput)
    if (success) {
      setAuthed(true)
      showToast('Welcome back, Godson! Access granted.', 'success')
    } else {
      setLoginError('Invalid username or passcode. Please check credentials.')
    }
  }

  const handleLogout = () => {
    logoutUser()
    setAuthed(false)
    setUsernameInput('')
    setPasscodeInput('')
    showToast('You have been logged out safely.', 'success')
  }

  // Handle Article Image Upload (Local file or URL)
  const handleArticleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setArtImage(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle Cover Image Upload for Song
  const handleSongCoverUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSongCoverImg(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle Song Audio Upload
  const handleSongAudioUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSongAudioSrc(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePublishArticle = (e: FormEvent) => {
    e.preventDefault()
    if (!artTitle.trim() || !artSnippet.trim()) {
      showToast('Article title and summary snippet are required.', 'error')
      return
    }

    const finalCategory = artCategory === 'Custom' ? (artCustomCategory.trim() || 'General') : artCategory
    const tagArray = artTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

    const newArticle: Article = {
      title: artTitle.trim(),
      category: finalCategory,
      date: artDate.trim() || 'Oct 2026',
      readTime: artReadTime.trim() || '5 min read',
      tags: tagArray.length > 0 ? tagArray : ['Engineering'],
      snippet: artSnippet.trim(),
      image: artImage.trim() || undefined,
      content: artContent.trim() || undefined,
    }

    saveArticleToStorage(newArticle)
    showToast(`Published article: "${newArticle.title}"`, 'success')

    // Reset inputs
    setArtTitle('')
    setArtSnippet('')
    setArtContent('')
    setArtImage('')
    setArtCustomCategory('')
  }

  const handlePublishSong = (e: FormEvent) => {
    e.preventDefault()
    if (!songTitle.trim() || !songDescription.trim()) {
      showToast('Song title and description are required.', 'error')
      return
    }

    const newSong: Song = {
      title: songTitle.trim(),
      artist: songArtist.trim() || 'Godson Pius',
      role: songRole.trim() || 'Composer & Vocalist',
      description: songDescription.trim(),
      audioSrc: songAudioSrc.trim() || '/media/track.mp3',
      coverImg: songCoverImg.trim() || '/profPic.png',
      duration: songDuration.trim() || '4:00',
      linktree: songLinktree.trim() || 'https://linktr.ee/godsonpius',
    }

    saveSongToStorage(newSong)
    showToast(`Published music track: "${newSong.title}"`, 'success')

    // Reset inputs
    setSongTitle('')
    setSongDescription('')
  }

  const handleDeleteArticle = (title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteArticleFromStorage(title)
      showToast(`Removed article: "${title}"`, 'success')
    }
  }

  const handleDeleteSong = (title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteSongFromStorage(title)
      showToast(`Removed track: "${title}"`, 'success')
    }
  }


  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between selection:bg-emerald-500/30 selection:text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20 md:pt-36 md:pb-28 w-full flex-1">
        {/* Toast Notification */}
        {feedbackMsg && (
          <div
            className={`fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl border text-xs font-mono shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-300 ${
              feedbackMsg.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-200'
                : 'bg-rose-950/90 border-rose-500/30 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{feedbackMsg.type === 'success' ? '✓' : '⚠️'}</span>
              <span>{feedbackMsg.text}</span>
            </div>
          </div>
        )}

        {/* UNPROTECTED / LOGIN VIEW */}
        {!authed ? (
          <div className="max-w-md mx-auto py-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-neutral-300 mb-4">
                <span>🔒 Protected Creator Portal</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                Dashboard Login
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                Authorized access for Godson Pius to manage essays, technical articles, and music releases.
              </p>
            </div>

            <Card3D depth={6} className="p-6 sm:p-8">
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="text-xs font-mono text-neutral-400 block mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Enter username"
                    autoComplete="username"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono text-neutral-400">
                      Passcode
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPasscode(!showPasscode)}
                      className="text-[11px] font-mono text-neutral-500 hover:text-neutral-300"
                    >
                      {showPasscode ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    required
                    value={passcodeInput}
                    onChange={(e) => setPasscodeInput(e.target.value)}
                    placeholder="Enter passcode"
                    autoComplete="current-password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                  />
                </div>

                {loginError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-400">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  className="expo-btn-primary w-full !py-3 text-xs font-semibold shadow-lg hover:shadow-emerald-500/20"
                >
                  Authenticate & Open Dashboard →
                </button>

                <div className="pt-2 text-center">
                  <Link
                    href="/"
                    className="text-xs font-mono text-neutral-500 hover:text-neutral-300 transition-colors"
                  >
                    ← Return to Homepage
                  </Link>
                </div>
              </form>
            </Card3D>
          </div>
        ) : (
          /* PROTECTED CREATOR DASHBOARD */
          <div>
            {/* Top Bar with user identity and session controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 p-0.5 bg-gradient-to-tr from-emerald-400 to-amber-300">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-950">
                    <Image
                      src="/profPic.png"
                      alt="Godson Pius"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                      Godson’s Creator Studio
                    </h1>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                      Live
                    </span>
                  </div>
                  <p className="text-xs font-mono text-neutral-400 mt-0.5">
                    Logged in as <span className="text-white">@{AUTH_CREDENTIALS.username}</span> · Full Publishing Rights
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/articles"
                  className="expo-btn-secondary !py-1.5 !px-3 text-xs font-mono"
                >
                  View Essays ↗
                </Link>
                <Link
                  href="/music"
                  className="expo-btn-secondary !py-1.5 !px-3 text-xs font-mono"
                >
                  View Music ↗
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-mono transition-all"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Studio Navigation Tabs */}
            <div className="flex items-center gap-2 mb-8">
              <button
                onClick={() => setActiveTab('articles')}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-2 ${
                  activeTab === 'articles'
                    ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                <span>✍️ Article Studio</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeTab === 'articles' ? 'bg-black/20 text-black' : 'bg-white/10 text-white'
                  }`}
                >
                  {articles.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('music')}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-2 ${
                  activeTab === 'music'
                    ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                <span>🎵 Music Releases</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeTab === 'music' ? 'bg-black/20 text-black' : 'bg-white/10 text-white'
                  }`}
                >
                  {songs.length}
                </span>
              </button>
            </div>

            {/* TAB CONTENT: ARTICLES */}
            {activeTab === 'articles' && (
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Form to Add Article */}
                <div className="lg:col-span-7">
                  <Card3D depth={4} className="p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-white">Create New Article</h2>
                      <span className="text-xs font-mono text-emerald-400">Live Sync</span>
                    </div>

                    <form onSubmit={handlePublishArticle} className="space-y-4">
                      <div>
                        <label className="text-xs font-mono text-neutral-400 block mb-1">
                          Article Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={artTitle}
                          onChange={(e) => setArtTitle(e.target.value)}
                          placeholder="e.g. Distributed Edge Intelligence Across Low-Bandwidth Networks"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-mono text-neutral-400 block mb-1">
                            Category
                          </label>
                          <select
                            value={artCategory}
                            onChange={(e) => setArtCategory(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#11141e] border border-white/10 text-sm text-white focus:outline-none focus:border-white/30 font-mono"
                          >
                            <option value="Architecture">Architecture</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Leadership">Leadership</option>
                            <option value="Venture">Venture</option>
                            <option value="Custom">Custom Category...</option>
                          </select>
                        </div>

                        {artCategory === 'Custom' ? (
                          <div>
                            <label className="text-xs font-mono text-neutral-400 block mb-1">
                              Custom Category Name
                            </label>
                            <input
                              type="text"
                              value={artCustomCategory}
                              onChange={(e) => setArtCustomCategory(e.target.value)}
                              placeholder="e.g. Machine Learning"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                            />
                          </div>
                        ) : (
                          <div>
                            <label className="text-xs font-mono text-neutral-400 block mb-1">
                              Estimated Read Time
                            </label>
                            <input
                              type="text"
                              value={artReadTime}
                              onChange={(e) => setArtReadTime(e.target.value)}
                              placeholder="e.g. 5 min read"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                            />
                          </div>
                        )}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-mono text-neutral-400 block mb-1">
                            Publication Date
                          </label>
                          <input
                            type="text"
                            value={artDate}
                            onChange={(e) => setArtDate(e.target.value)}
                            placeholder="e.g. Oct 2026"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono text-neutral-400 block mb-1">
                            Tags (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={artTags}
                            onChange={(e) => setArtTags(e.target.value)}
                            placeholder="e.g. Next.js, AI, Systems"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                          />
                        </div>
                      </div>

                      {/* Optional Image */}
                      <div>
                        <label className="text-xs font-mono text-neutral-400 block mb-1">
                          Optional Article Image (Upload or Image URL)
                        </label>
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleArticleImageUpload}
                            className="w-full text-xs font-mono text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border file:border-white/15 file:text-xs file:bg-white/[0.05] file:text-neutral-200 hover:file:bg-white/[0.1] cursor-pointer"
                          />
                          <input
                            type="text"
                            value={artImage}
                            onChange={(e) => setArtImage(e.target.value)}
                            placeholder="Or paste external image URL (e.g. https://...)"
                            className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                          />
                          {artImage && (
                            <div className="relative h-28 w-full rounded-xl overflow-hidden border border-white/15 mt-2 bg-neutral-900">
                              <img
                                src={artImage}
                                alt="Article preview"
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => setArtImage('')}
                                className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] text-neutral-300 hover:text-white"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-neutral-400 block mb-1">
                          Summary / Snippet *
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={artSnippet}
                          onChange={(e) => setArtSnippet(e.target.value)}
                          placeholder="A high-impact executive summary or hook..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-neutral-400 block mb-1">
                          Full Content / Essay Body (Optional)
                        </label>
                        <textarea
                          rows={5}
                          value={artContent}
                          onChange={(e) => setArtContent(e.target.value)}
                          placeholder="Full markdown/text content for readers when they click into the essay..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="expo-btn-primary w-full !py-3 text-xs font-semibold shadow-lg hover:shadow-emerald-500/20"
                        >
                          Publish Article to Live Site →
                        </button>
                      </div>
                    </form>
                  </Card3D>
                </div>

                {/* Right Side: Live Preview & Existing Articles */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Live Card Preview */}
                  <div>
                    <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                      Live Card Preview
                    </h3>
                    <div className="expo-card p-5 border border-emerald-500/30 bg-emerald-950/10">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                        <span className="text-emerald-400">
                          [{artCategory === 'Custom' ? artCustomCategory || 'Custom' : artCategory}]
                        </span>
                        <span>{artDate} · {artReadTime}</span>
                      </div>

                      {artImage && (
                        <div className="h-32 w-full rounded-xl overflow-hidden mb-3 border border-white/10">
                          <img
                            src={artImage}
                            alt="Card preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <h4 className="text-lg font-semibold text-white leading-snug">
                        {artTitle || 'Untitled Article Preview'}
                      </h4>

                      <p className="text-xs text-neutral-400 mt-2 line-clamp-3">
                        {artSnippet || 'Your summary snippet will appear here in real time as you write.'}
                      </p>

                      <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {artTags
                            .split(',')
                            .map((t) => t.trim())
                            .filter(Boolean)
                            .slice(0, 3)
                            .map((t) => (
                              <span
                                key={t}
                                className="text-[9px] font-mono text-neutral-400 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10"
                              >
                                {t}
                              </span>
                            ))}
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400">Preview Mode</span>
                      </div>
                    </div>
                  </div>

                  {/* Existing Articles Management List */}
                  <div>
                    <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
                      Published Articles ({articles.length})
                    </h3>

                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                      {articles.map((art) => (
                        <div
                          key={art.title}
                          className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-3 hover:border-white/20 transition-all"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                              <span className="text-emerald-400">[{art.category}]</span>
                              <span>{art.date}</span>
                            </div>
                            <h4 className="text-sm font-medium text-white truncate mt-1">
                              {art.title}
                            </h4>
                            <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                              {art.snippet}
                            </p>
                          </div>

                          <button
                            onClick={() => handleDeleteArticle(art.title)}
                            className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-mono border border-rose-500/20 transition-colors shrink-0"
                            title="Delete article"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: MUSIC */}
            {activeTab === 'music' && (
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Form to Add Track */}
                <div className="lg:col-span-7">
                  <Card3D depth={4} className="p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-white">Add Music Track</h2>
                      <span className="text-xs font-mono text-emerald-400">Audio & Brass</span>
                    </div>

                    <form onSubmit={handlePublishSong} className="space-y-4">
                      <div>
                        <label className="text-xs font-mono text-neutral-400 block mb-1">
                          Track Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={songTitle}
                          onChange={(e) => setSongTitle(e.target.value)}
                          placeholder="e.g. My Joy / Ndanyuzwe"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-mono text-neutral-400 block mb-1">
                            Artist / Performer
                          </label>
                          <input
                            type="text"
                            value={songArtist}
                            onChange={(e) => setSongArtist(e.target.value)}
                            placeholder="Godson Pius"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono text-neutral-400 block mb-1">
                            Role / Ensemble
                          </label>
                          <input
                            type="text"
                            value={songRole}
                            onChange={(e) => setSongRole(e.target.value)}
                            placeholder="Composer & Vocalist / Tuba"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-neutral-400 block mb-1">
                          Track Story & Arrangement Description *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={songDescription}
                          onChange={(e) => setSongDescription(e.target.value)}
                          placeholder="Describe the arrangement, inspiration, instrumentation, or spiritual theme..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                        />
                      </div>

                      {/* Cover Image Upload / URL */}
                      <div>
                        <label className="text-xs font-mono text-neutral-400 block mb-1">
                          Album Cover Image
                        </label>
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleSongCoverUpload}
                            className="w-full text-xs font-mono text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border file:border-white/15 file:text-xs file:bg-white/[0.05] file:text-neutral-200 hover:file:bg-white/[0.1] cursor-pointer"
                          />
                          <input
                            type="text"
                            value={songCoverImg}
                            onChange={(e) => setSongCoverImg(e.target.value)}
                            placeholder="Or specify cover image path/URL (e.g. /profPic.png)"
                            className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                          />
                        </div>
                      </div>

                      {/* Audio File Upload / URL */}
                      <div>
                        <label className="text-xs font-mono text-neutral-400 block mb-1">
                          Audio Source (.mp3 upload or URL)
                        </label>
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept="audio/*"
                            onChange={handleSongAudioUpload}
                            className="w-full text-xs font-mono text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border file:border-white/15 file:text-xs file:bg-white/[0.05] file:text-neutral-200 hover:file:bg-white/[0.1] cursor-pointer"
                          />
                          <input
                            type="text"
                            value={songAudioSrc}
                            onChange={(e) => setSongAudioSrc(e.target.value)}
                            placeholder="Or specify audio URL/path (e.g. /media/track.mp3)"
                            className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-mono text-neutral-400 block mb-1">
                            Track Duration
                          </label>
                          <input
                            type="text"
                            value={songDuration}
                            onChange={(e) => setSongDuration(e.target.value)}
                            placeholder="e.g. 4:15"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono text-neutral-400 block mb-1">
                            Linktree / Streaming Link
                          </label>
                          <input
                            type="text"
                            value={songLinktree}
                            onChange={(e) => setSongLinktree(e.target.value)}
                            placeholder="https://linktr.ee/godsonpius"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 font-mono"
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="expo-btn-primary w-full !py-3 text-xs font-semibold shadow-lg hover:shadow-emerald-500/20"
                        >
                          Publish Music Track →
                        </button>
                      </div>
                    </form>
                  </Card3D>
                </div>

                {/* Right Side: Music Live Preview & Current Tracks */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Track Preview */}
                  <div>
                    <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                      Live Music Card Preview
                    </h3>
                    <div className="expo-card p-5 border border-emerald-500/30 bg-emerald-950/10">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 shrink-0">
                          {songCoverImg ? (
                            <img
                              src={songCoverImg}
                              alt="Cover preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">
                              🎵
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <span className="text-[10px] font-mono text-emerald-400 block">
                            {songRole || 'Track'}
                          </span>
                          <h4 className="text-base font-semibold text-white truncate">
                            {songTitle || 'Untitled Track'}
                          </h4>
                          <p className="text-xs text-neutral-400 font-mono">
                            {songArtist || 'Godson Pius'} · {songDuration}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-400 mt-3 line-clamp-2">
                        {songDescription || 'Track arrangement description will appear here...'}
                      </p>

                      <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-400">
                        <span>Audio Source: {songAudioSrc ? 'Linked' : 'None'}</span>
                        <span className="text-emerald-400">Live Preview</span>
                      </div>
                    </div>
                  </div>

                  {/* Current Tracks List */}
                  <div>
                    <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
                      Current Music Library ({songs.length})
                    </h3>

                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                      {songs.map((s) => (
                        <div
                          key={s.title}
                          className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 hover:border-white/20 transition-all"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/15 bg-neutral-900 shrink-0">
                              <img
                                src={s.coverImg}
                                alt={s.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-medium text-white truncate">
                                {s.title}
                              </h4>
                              <p className="text-[11px] font-mono text-neutral-400 truncate">
                                {s.artist} · {s.duration}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteSong(s.title)}
                            className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-mono border border-rose-500/20 transition-colors shrink-0"
                            title="Delete track"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-white/[0.08] py-8 text-center text-xs text-neutral-500 font-mono">
        © 2026 Godson Pius · World Brain Technology Limited · Gabvia. Medmask.
      </footer>
    </div>
  )
}
