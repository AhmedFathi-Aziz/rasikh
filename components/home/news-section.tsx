"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

interface NewsItem {
  id: number
  title_ar: string
  title_en: string
  description_ar: string
  description_en: string
  image: string
  source: string
  sourceUrl: string
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const { language } = useLanguage()

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then(setNews)
  }, [])

  // Filter: show only news with title, description, and image for the current language
  const filteredNews = news.filter(item => {
    const hasTitle = language === "ar" ? item.title_ar : item.title_en
    const hasDesc = language === "ar" ? item.description_ar : item.description_en
    return hasTitle && hasDesc && item.image
  })

  if (!filteredNews.length) return null

  return (
    <section className="container mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-primary text-center">
        {language === "ar" ? "آخر الأخبار" : "Latest News"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNews.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white dark:bg-card rounded-2xl shadow-md border border-border/60 overflow-hidden flex flex-col"
          >
            <img src={item.image} alt={language === "ar" ? item.title_ar : item.title_en} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-bold mb-2 text-primary">
                {language === "ar" ? item.title_ar : item.title_en}
              </h3>
              <p className="text-muted-foreground mb-4 flex-1">
                {language === "ar" ? item.description_ar : item.description_en}
              </p>
              <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline mt-auto">
                {language === "ar" ? `المصدر: ${item.source}` : `Source: ${item.source}`}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 