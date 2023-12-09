import React from 'react'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

//style
import './globals.css'
import { Open_Sans } from 'next/font/google'
import { cn } from '@/lib/utils'

//component
import { ThemeProvider } from '@/components/providers/theme-provider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Communicaiton Application',
  description: 'Generated by create next app',
}

type Children = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Children) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(font.className, 'bg-white dark:bg-[#313338]')}>
          <ThemeProvider
            attribute={'class'}
            defaultTheme={'dark'}
            enableSystem={false}
            storageKey={'discord-theme'}
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}