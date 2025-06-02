"use client"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function NewsPage() {
  const { t, language } = useLanguage()

  const newsItems = language === "ar"
    ? [
        {
          title: "تعاون أكاديمية راسخ مع النادي المصري لتدريس المنهج المصري",
          date: "2024-06-01",
          excerpt: "يسر أكاديمية راسخ أن تعلن عن تعاونها المثمر مع النادي المصري لتقديم برنامج تعليمي متميز يهدف إلى تدريس المنهج المصري للجالية المصرية المقيمة، وكذلك للجاليات العربية الراغبة في دراسة المنهج المصري المعتمد.",
          category: "شراكة"
        }
      ]
    : [
        {
          title: "Rasikh Academy Partners with the Egyptian Club to Offer the Egyptian Curriculum",
          date: "2024-06-01",
          excerpt: "Rasikh Academy is pleased to announce a fruitful partnership with the Egyptian Club to deliver a distinguished educational program for the Egyptian community and all Arab communities interested in the accredited Egyptian curriculum.",
          category: "Partnership"
        }
      ];

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
            ? "ابق على اطلاع بآخر الأخبار من أكاديميتنا."
            : "Stay updated with the latest announcements and success stories from our academy."}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {newsItems.map((item, idx) => (
          <Link href={`/news/${idx}`} key={idx} className="contents">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
            className="bg-white dark:bg-card rounded-2xl p-6 md:p-8 shadow-md border border-border/60 hover:shadow-lg transition-all group cursor-pointer flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                {item.category}
              </span>
              <div className="flex items-center text-muted-foreground text-xs">
                <Calendar className="h-4 w-4 mr-1" />
                {language === "ar"
                  ? new Date(item.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })
                  : new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-primary/90 group-hover:text-primary transition-colors">
              {item.title}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-3">
              {item.excerpt}
            </p>
            <div className="flex items-center text-primary font-medium mt-auto">
              {language === "ar" ? "اقرأ المزيد" : t("read_more")}
              <ArrowRight className={language === "ar" ? "h-4 w-4 mr-2" : "h-4 w-4 ml-2"} />
            </div>
          </motion.article>
          </Link>
        ))}
      </div>
    </motion.section>
  )
} 