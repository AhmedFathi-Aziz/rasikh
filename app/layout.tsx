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
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
})

const cairo = Cairo({ 
  subsets: ["arabic"],
  display: 'swap',
  preload: true,
  variable: '--font-cairo'
})

export const metadata: Metadata = {
  title: "Rasikh Academy | Professional Training in Dubai | أكاديمية راسخ للتدريب في دبي",
  description:
    "Rasikh Academy is a leading professional training academy in Dubai, offering courses in software engineering, competitive programming, kids tech education, and the Egyptian curriculum for expatriates. أكاديمية راسخ للتدريب المهني في دبي تقدم دورات في هندسة البرمجيات، البرمجة التنافسية، تعليم التكنولوجيا للأطفال، والمنهج المصري للجاليات.",
  keywords: [
    "Rasikh Academy", "أكاديمية راسخ", "training", "professional training", "Dubai", "دبي", "software engineering", "هندسة البرمجيات", "competitive programming", "البرمجة التنافسية", "kids programming", "برمجة للأطفال", "Egyptian curriculum", "المنهج المصري", "Egyptian Club", "النادي المصري", "Ajman", "عجمان", "tech education", "تعليم التكنولوجيا", "دورات دبي", "دورات برمجة دبي"
  ],
  generator: 'v0.dev',
  icons: {
    icon: '/images/rasikh-logo.png',
  },
  openGraph: {
    title: "Rasikh Academy | Professional Training in Dubai | أكاديمية راسخ للتدريب في دبي",
    description: "Rasikh Academy is a leading professional training academy in Dubai, offering courses in software engineering, competitive programming, kids tech education, and the Egyptian curriculum for expatriates.",
    url: "https://rasikh.academy",
    siteName: "Rasikh Academy",
    images: [
      {
        url: "/images/rasikh-logo.png",
        width: 400,
        height: 400,
        alt: "Rasikh Academy Logo"
      }
    ],
    locale: "ar_AE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@rasikhacademy",
    title: "Rasikh Academy | Professional Training in Dubai | أكاديمية راسخ للتدريب في دبي",
    description: "Rasikh Academy is a leading professional training academy in Dubai, offering courses in software engineering, competitive programming, kids tech education, and the Egyptian curriculum for expatriates.",
    images: [
      "/images/rasikh-logo.png"
    ]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      maxImagePreview: "large",
      maxSnippet: -1
    }
  },
  alternates: {
    canonical: "https://rasikh.academy"
  },
  metadataBase: new URL("https://rasikh.academy")
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/rasikh-logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Rasikh Academy, أكاديمية راسخ, training, professional training, Dubai, دبي, software engineering, هندسة البرمجيات, competitive programming, البرمجة التنافسية, kids programming, برمجة للأطفال, Egyptian curriculum, المنهج المصري, Egyptian Club, النادي المصري, Ajman, عجمان, tech education, تعليم التكنولوجيا, دورات دبي, دورات برمجة دبي" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://rasikh.academy" />
        <meta property="og:title" content="Rasikh Academy | Professional Training in Dubai | أكاديمية راسخ للتدريب في دبي" />
        <meta property="og:description" content="Rasikh Academy is a leading professional training academy in Dubai, offering courses in software engineering, competitive programming, kids tech education, and the Egyptian curriculum for expatriates." />
        <meta property="og:image" content="/images/rasikh-logo.png" />
        <meta property="og:url" content="https://rasikh.academy" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_AE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rasikh Academy | Professional Training in Dubai | أكاديمية راسخ للتدريب في دبي" />
        <meta name="twitter:description" content="Rasikh Academy is a leading professional training academy in Dubai, offering courses in software engineering, competitive programming, kids tech education, and the Egyptian curriculum for expatriates." />
        <meta name="twitter:image" content="/images/rasikh-logo.png" />
        <meta name="twitter:site" content="@rasikhacademy" />
        <meta httpEquiv="Content-Language" content="ar" />
      </head>
      <body className={`${inter.variable} ${cairo.variable}`}>
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
        <Analytics />
      </body>
    </html>
  )
}
