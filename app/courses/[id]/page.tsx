"use client"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Clock, Users, BookOpen, ArrowLeft } from "lucide-react"

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

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t, language } = useLanguage()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const isRTL = language === "ar"

  useEffect(() => {
    setLoading(true)
    fetch(`/api/courses`)
      .then(res => res.json())
      .then(data => {
        const found = Array.isArray(data) ? data.find((c: Course) => c.id === id) : null
        setCourse(found || null)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to fetch course details")
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <div className="text-center py-16 text-muted-foreground text-xl">{t("loading") || "Loading..."}</div>
  }
  if (error || !course) {
    return <div className="text-center py-16 text-red-500 text-xl">{t("no_courses") || "Course not found."}</div>
  }

  return (
    <div className={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-3xl mx-auto py-10 px-4 sm:px-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className={isRTL ? "ml-auto flex flex-row-reverse gap-2" : "mb-4 flex gap-2"}>
          <ArrowLeft className={isRTL ? "ml-2 h-5 w-5" : "mr-2 h-5 w-5"} />
          {language === "ar" ? "العودة للدورات" : "Back to Courses"}
        </Button>
        {/* Course Image */}
        <div className="w-full h-64 sm:h-80 rounded-3xl overflow-hidden shadow-lg mb-8 flex items-center justify-center bg-muted">
          <img
            src={course.image || "/images/default-course.jpg"}
            alt={language === "ar" ? course.titleAr : course.titleEn}
            className="object-contain w-full h-full"
            style={{ maxHeight: 320 }}
          />
        </div>
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 text-center leading-tight">
          {language === "ar" ? course.titleAr : course.titleEn}
        </h1>
        {/* Info Cards */}
        <div className={`flex flex-wrap justify-center gap-4 mb-8 ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className="flex items-center gap-2 bg-primary/10 rounded-xl px-5 py-3 shadow text-primary font-semibold">
            <Clock className="h-5 w-5" />
            <span>{language === "ar" 
              ? course.durationAr || course.duration || "غير محدد"
              : course.durationEn || course.duration || "Not specified"}</span>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 rounded-xl px-5 py-3 shadow text-primary font-semibold">
            <Users className="h-5 w-5" />
            <span>{language === "ar" 
              ? course.category === "professional" ? "مهني" : "أطفال"
              : course.category.charAt(0).toUpperCase() + course.category.slice(1)}</span>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 rounded-xl px-5 py-3 shadow text-primary font-semibold">
            <BookOpen className="h-5 w-5" />
            <span>{language === "ar"
              ? course.level === "advanced" ? "متقدم" 
              : course.level === "intermediate" ? "متوسط"
              : "مبتدئ"
              : course.level.charAt(0).toUpperCase() + course.level.slice(1)}</span>
          </div>
        </div>
        {/* Description */}
        <div className="bg-card rounded-2xl shadow p-6 text-lg text-muted-foreground leading-relaxed mb-8 text-center">
          {language === "ar" ? course.descriptionAr : course.descriptionEn}
        </div>
        {/* Course Topics */}
        {(language === "ar" ? course.topicsAr : course.topicsEn)?.length > 0 && (
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl shadow p-6 mb-8">
            <h2 className="font-bold text-xl mb-4 text-primary">{language === "ar" ? "محاور الدورة" : "Course Topics"}</h2>
            <ul className="list-disc pl-6 space-y-2 text-lg text-foreground">
              {(language === "ar" ? course.topicsAr : course.topicsEn).map((topic, idx) => (
                <li key={idx} className="transition-all hover:text-primary">{topic}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
} 