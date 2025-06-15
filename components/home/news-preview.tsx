"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"

const newsItems = [
  {
    id: 1,
    title: "news_1_title",
    excerpt: "news_1_excerpt",
    image: "/placeholder.svg?height=200&width=300",
    date: "May 15, 2025",
    category: "news_1_category" as const,
  },
  {
    id: 2,
    title: "news_2_title",
    excerpt: "news_2_excerpt",
    image: "/placeholder.svg?height=200&width=300",
    date: "April 28, 2025",
    category: "news_2_category" as const,
  },
  {
    id: 3,
    title: "news_3_title",
    excerpt: "news_3_excerpt",
    image: "/placeholder.svg?height=200&width=300",
    date: "April 10, 2025",
    category: "news_3_category" as const,
  },
]

export default function NewsPreview() {
  const { t } = useLanguage()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">{t("latest_news")}</h2>
          <p className="text-muted-foreground max-w-2xl">Stay updated with the latest happenings at Rasikh Academy.</p>
        </div>
        <Button variant="ghost" className="mt-4 md:mt-0" asChild>
          <Link href="/news">
            {t("view_all_news")} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {newsItems.map((news) => (
          <motion.div key={news.id} variants={item}>
            <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={news.image || "/placeholder.svg"}
                  alt={news.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary">{t(news.category)}</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{news.date}</span>
                </div>
                <h3 className="font-bold text-lg line-clamp-2">{t(news.title)}</h3>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm line-clamp-3">{t(news.excerpt)}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="p-0" asChild>
                  <Link href={`/news/${news.id}`}>
                    {t("read_more")} <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
