"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Code, Globe, Smartphone, Gamepad, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import CourseCard from "@/components/home/CourseCard"

export default function FeaturedCourses() {
  const { t, language } = useLanguage()
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch("/api/courses?limit=4")
      .then(res => res.json())
      .then(data => {
        setCourses(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to fetch courses")
        setLoading(false)
      })
  }, [])

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
          <h2 className="text-3xl font-bold tracking-tight mb-2">{t("featured_courses")}</h2>
          <p className="text-muted-foreground max-w-2xl">
            {language === "ar"
              ? "اكتشف أكثر دوراتنا شهرة المصممة لجميع المستويات."
              : "Discover our most popular courses designed for all skill levels."}
          </p>
        </div>
        <Button variant="ghost" className="mt-4 md:mt-0" asChild>
          <Link href="/courses">
            {t("view_all_courses")} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {loading && <div className="col-span-full text-center py-8 text-muted-foreground">{t("loading") || "Loading..."}</div>}
        {error && <div className="col-span-full text-center py-8 text-red-500">{error}</div>}
        {!loading && !error && courses.slice(0, 4).map((course, idx) => (
          <CourseCard key={course.id} course={course} index={idx} />
        ))}
      </motion.div>

      {courses.length > 4 && (
        <div className="flex justify-center mt-8">
          <Link href="/in-house-training">
            <button
              className="px-10 py-5 bg-black text-white text-xl font-extrabold rounded-2xl shadow-lg flex items-center gap-3 transition-transform transform hover:scale-105 hover:bg-white hover:text-black border-2 border-black animate-bounce-slow"
              style={{ minWidth: '260px', minHeight: '64px' }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-7' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-4.41 0-8-1.79-8-4V6c0-2.21 3.59-4 8-4s8 1.79 8 4v8c0 2.21-3.59 4-8 4z' /></svg>
              {language === "ar" ? "طلب تدريب داخلي" : "Request an In-House Training"}
            </button>
          </Link>
        </div>
      )}
    </section>
  )
}
