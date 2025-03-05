'use client'


import { Inter } from 'next/font/google'
import { TonConnectUIProvider } from '@tonconnect/ui-react' 
import Navbar from '@/components/Navbar'
import './globals.css'
import NavbarBottom from '@/components/NavbarBottom'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const manifestUrl = "https://tomato-rapid-caterpillar-799.mypinata.cloud/ipfs/bafkreia6vkfogcgn6q4m5spt5wfo3l775uykfywpyqgtqmrdgledoluh5u";

  return (
    <html lang="en">
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <body className={inter.className}>
          <Navbar/>
          {children}
          <NavbarBottom/>
        </body>
      </TonConnectUIProvider>
    </html>
  )
}
