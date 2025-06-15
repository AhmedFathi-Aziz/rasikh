"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import CourseCard from "@/components/home/CourseCard"

interface Course {
  id: string
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  duration: string | null
  durationAr: string | null
  durationEn: string | null
  level: string
  category: string
  image: string
  createdAt: string
  topicsAr: string[]
  topicsEn: string[]
}

export default function CoursesPage() {
  const { t, language } = useLanguage()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isRTL = language === "ar"

  useEffect(() => {
    setLoading(true)
    fetch("/api/courses")
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
          {language === "ar" ? "دوراتنا" : t("our_courses")}
        </span>
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.2] overflow-visible ${
            language === "ar"
              ? "font-extrabold cairo-font text-primary"
              : "bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
          }`}
        >
          {t("featured_courses")}
        </h1>
        <div className="w-24 h-1 bg-primary/20 mx-auto my-8 rounded-full"></div>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {language === "ar"
            ? "استكشف مجموعتنا الشاملة من الدورات التقنية المصممة لمساعدتك على النجاح."
            : "Explore our comprehensive range of technology courses designed to help you succeed."}
        </p>
      </motion.div>

      {loading && (
        <div className="text-center py-8 text-muted-foreground">{t("loading") || "Loading..."}</div>
      )}
      {error && (
        <div className="text-center py-8 text-red-500">{error}</div>
      )}
      {!loading && courses.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">{t("no_courses") || "No courses found."}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, idx) => (
          <CourseCard key={course.id} course={course} index={idx} />
        ))}
      </div>
    </motion.section>
  )
} 