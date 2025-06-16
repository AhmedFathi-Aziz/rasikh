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
import Script from "next/script"

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
    "Rasikh Academy is a leading professional training academy in Dubai, offering courses in software engineering, competitive programming, kids tech education,  أكاديمية راسخ للتدريب المهني في دبي تقدم دورات في هندسة البرمجيات، البرمجة التنافسية، تعليم التكنولوجيا للأطفال .",
  keywords: [
    "Rasikh Academy", "أكاديمية راسخ", "training", "professional training", "Dubai", "دبي", "software engineering", "هندسة البرمجيات", "competitive programming", "البرمجة التنافسية", "kids programming", "برمجة للأطفال", "tech education", "تعليم التكنولوجيا", "دورات دبي", "دورات برمجة دبي", "Rasikh", "راسخ", "academy", "أكاديمية", "programming courses", "دورات برمجة", "coding academy", "أكاديمية برمجة", "tech training", "تدريب تكنولوجي"
  ],
  generator: 'Next.js',
  applicationName: 'Rasikh Academy',
  authors: [{ name: 'Rasikh Academy' }],
  creator: 'Rasikh Academy',
  publisher: 'Rasikh Academy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/images/rasikh-logo.png',
    apple: '/images/rasikh-logo.png',
  },
  openGraph: {
    title: "Rasikh Academy | Professional Training in Dubai | أكاديمية راسخ للتدريب في دبي",
    description: "Rasikh Academy is a leading professional training academy in Dubai, offering courses in software engineering, competitive programming, kids tech education",
    url: "https://rasikhacademy.com",
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
    type: "website",
    countryName: "United Arab Emirates",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rasikhacademy",
    creator: "@rasikhacademy",
    title: "Rasikh Academy | Professional Training in Dubai | أكاديمية راسخ للتدريب في دبي",
    description: "Rasikh Academy is a leading professional training academy in Dubai, offering courses in software engineering, competitive programming, kids tech education.",
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
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  alternates: {
    canonical: "https://rasikhacademy.com"
  },
  metadataBase: new URL("https://rasikhacademy.com"),
  verification: {
    google: "your-google-site-verification", // Add your Google Search Console verification code
  }
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
        <meta name="keywords" content="Rasikh Academy, أكاديمية راسخ, training, professional training, Dubai, دبي, software engineering, هندسة البرمجيات, competitive programming, البرمجة التنافسية, kids programming, برمجة للأطفال, tech education, تعليم التكنولوجيا, دورات دبي, دورات برمجة دبي" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://rasikhacademy.com" />
        <meta property="og:title" content="Rasikh Academy | Professional Training in Dubai | أكاديمية راسخ للتدريب في دبي" />
        <meta property="og:description" content="Rasikh Academy is a leading professional training academy in Dubai, offering courses in software engineering, competitive programming, kids tech education." />
        <meta property="og:image" content="/images/rasikh-logo.png" />
        <meta property="og:url" content="https://rasikhacademy.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_AE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rasikh Academy | Professional Training in Dubai | أكاديمية راسخ للتدريب في دبي" />
        <meta name="twitter:description" content="Rasikh Academy is a leading professional training academy in Dubai, offering courses in software engineering, competitive programming, kids tech education." />
        <meta name="twitter:image" content="/images/rasikh-logo.png" />
        <meta name="twitter:site" content="@rasikhacademy" />
        <meta httpEquiv="Content-Language" content="ar" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rasikh Academy" />
        <link rel="apple-touch-icon" href="/images/rasikh-logo.png" />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Rasikh Academy",
              "alternateName": "أكاديمية راسخ",
              "url": "https://rasikhacademy.com",
              "logo": "https://rasikhacademy.com/images/rasikh-logo.png",
              "description": "Rasikh Academy is a leading professional training academy in Dubai, offering courses in software engineering, competitive programming, kids tech education.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "addressCountry": "AE"
              },
              "sameAs": [
                "https://twitter.com/rasikhacademy",
                "https://www.facebook.com/rasikhacademy",
                "https://www.instagram.com/rasikhacademy"
              ],
              "offers": {
                "@type": "AggregateOffer",
                "offers": [
                  {
                    "@type": "Offer",
                    "name": "Software Engineering Courses",
                    "description": "Professional software engineering training programs"
                  },
                  {
                    "@type": "Offer",
                    "name": "Competitive Programming",
                    "description": "Advanced competitive programming training"
                  },
                  {
                    "@type": "Offer",
                    "name": "Kids Tech Education",
                    "description": "Technology education programs for children"
                  }
                ]
              }
            })
          }}
        />
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
