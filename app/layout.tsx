import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Cairo } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/components/language-provider"
import FontWrapper from "@/components/font-wrapper"

const inter = Inter({ subsets: ["latin"] })
const cairo = Cairo({ subsets: ["arabic"] })

export const metadata: Metadata = {
  title: "Rasikh Academy | Professional Training in Dubai",
  description:
    "Professional training academy in Dubai offering courses in software engineering, competitive programming, and children's tech education.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <LanguageProvider>
            <FontWrapper interClass={inter.className} arabicClass={cairo.className}>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </FontWrapper>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
