"use client"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"

export default function NewsPage() {
  const { t, language } = useLanguage()

  // News section removed
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 py-16 md:py-24 max-w-7xl"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold tracking-wider uppercase text-primary mb-4 block">
          {language === "ar" ? "الأخبار والتحديثات" : t("news_and_updates")}
        </span>
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.2] overflow-visible ${language === "ar" ? "font-extrabold cairo-font text-primary" : "bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"}`}>
          {t("latest_news")}
        </h1>
        <div className="w-24 h-1 bg-primary/20 mx-auto my-8 rounded-full"></div>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {language === "ar"
            ? "لا توجد أخبار حالياً."
            : "There are currently no news or updates."}
        </p>
      </motion.div>
    </motion.section>
  )
} 