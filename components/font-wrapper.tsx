"use client"

import React, { useEffect } from "react"
import { useLanguage } from "@/components/language-provider"

interface FontWrapperProps {
  interClass: string
  arabicClass: string
  children: React.ReactNode
}

export default function FontWrapper({ interClass, arabicClass, children }: FontWrapperProps) {
  const { language } = useLanguage()
  const fontClass = language === "ar" ? arabicClass + " cairo-font" : interClass

  useEffect(() => {
    if (language === "ar") {
      // Inject Cairo font from Google Fonts
      if (!document.getElementById("cairo-font-style")) {
        const style = document.createElement("style")
        style.id = "cairo-font-style"
        style.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');\n.cairo-font { font-family: 'Cairo', Arial, Helvetica, sans-serif !important; }`
        document.head.appendChild(style)
      }
    }
  }, [language])

  return <div className={fontClass}>{children}</div>
} 