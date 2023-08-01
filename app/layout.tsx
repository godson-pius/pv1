import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Raleway, Rubik } from 'next/font/google'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Godson Azubuike',
  description: 'This is Godson Azubuike aka Godson Pius official website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${raleway.className} px-20 pt-7 h-screen bg-[#F2F5F9] dark:bg-[#1d232a]`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
