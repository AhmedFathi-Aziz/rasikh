"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface NewsItem {
  id: number
  title: string
  description: string
  image: string
  source: string
  sourceUrl: string
}

export default function NewsTicker() {
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then(setNews)
  }, [])

  if (!news.length) return null

  return (
    <section className="w-full bg-primary/10 py-4 overflow-hidden">
      <div className="container mx-auto flex items-center gap-4">
        <span className="font-bold text-primary whitespace-nowrap">آخر الأخبار:</span>
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: news.length * 4, ease: "linear" }}
            style={{ willChange: "transform" }}
          >
            {news.map((item) => (
              <Link
                key={item.id}
                href={item.sourceUrl || "#"}
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-1 rounded hover:bg-primary/20 transition-colors"
              >
                <span className="font-semibold text-primary">{item.title}</span>
                <span className="text-xs text-muted-foreground">{item.source}</span>
              </Link>
            ))}
            {/* تكرار الأخبار لجعل الشريط دائماً ممتلئ */}
            {news.map((item) => (
              <Link
                key={"repeat-" + item.id}
                href={item.sourceUrl || "#"}
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-1 rounded hover:bg-primary/20 transition-colors"
              >
                <span className="font-semibold text-primary">{item.title}</span>
                <span className="text-xs text-muted-foreground">{item.source}</span>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 