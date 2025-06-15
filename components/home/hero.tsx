"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

export default function Hero() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  const isArabic = language === "ar"

  const heading = isArabic
    ? "إرتقِ بمسيرتك المهنية مع أكاديمية راسخ"
    : "Elevate Your Career with Rasikh Academy"
  const subtitle = isArabic
    ? "اكتسب مهارات ومعارف رائدة في المجال من خلال برامجنا التدريبية الاحترافية في دبي."
    : "Gain industry-leading skills and knowledge through our professional training programs in Dubai."
  const buttonText = isArabic ? "استكشف الدورات" : "Explore Courses"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <div
        className="relative rounded-2xl overflow-hidden shadow-lg min-h-[440px] md:min-h-[520px] flex flex-col justify-end items-start p-6 md:p-10 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 100%), url("/images/hero-1.png")',
          fontFamily: isArabic
            ? 'Cairo, Arial, Helvetica, sans-serif'
            : '"Work Sans", "Noto Sans", sans-serif',
        }}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className={`flex flex-col gap-2 mb-6 ${isArabic ? "text-right cairo-font" : "text-left"}`}>
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl md:font-black md:leading-tight md:tracking-[-0.033em]">
            {heading}
          </h1>
          <h2 className="text-white text-sm font-normal leading-normal md:text-base md:font-normal md:leading-normal">
            {subtitle}
          </h2>
        </div>
        <Link
          href="/courses"
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 md:h-12 md:px-5 bg-[#dce7f3] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em] md:text-base md:font-bold md:leading-normal md:tracking-[0.015em]"
        >
          <span className="truncate">{buttonText}</span>
        </Link>
      </div>
      </div>
  )
}
