"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

const partners = [
  { id: 1, name: "Egyptian Club Ajman", logo: "/placeholder.svg?height=80&width=200" },
  { id: 2, name: "Dubai Knowledge Park", logo: "/placeholder.svg?height=80&width=200" },
  { id: 3, name: "UAE Ministry of Education", logo: "/placeholder.svg?height=80&width=200" },
  { id: 4, name: "Tech Innovation Hub", logo: "/placeholder.svg?height=80&width=200" },
  { id: 5, name: "Future Skills Academy", logo: "/placeholder.svg?height=80&width=200" },
  { id: 6, name: "Global Education Partners", logo: "/placeholder.svg?height=80&width=200" },
]

export default function Partners() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section ref={containerRef} className="py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-2">{t("our_partners")}</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          {t("partners_description")}
        </p>
      </div>

      <div className="relative w-full">
        <motion.div style={{ x: x }} className="flex space-x-12 py-8">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 h-20 w-48 bg-background rounded-lg shadow-sm flex items-center justify-center p-4"
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={160}
                height={60}
                className="object-contain max-h-full"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
