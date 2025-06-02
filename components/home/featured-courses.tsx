"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Code, Globe, Smartphone, Gamepad, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"

const courses = [
  {
    id: 1,
    title: "software_engineering",
    description: "Learn software engineering principles, design patterns, and best practices.",
    image: "/images/software.jpg",
    icon: Code,
    level: "Intermediate",
    duration: "12 weeks",
    category: "Professional",
  },
  {
    id: 2,
    title: "web_development",
    description: "Master modern web development with HTML, CSS, JavaScript, and popular frameworks.",
    image: "/images/web.jpg",
    icon: Globe,
    level: "Beginner",
    duration: "8 weeks",
    category: "Professional",
  },
  {
    id: 3,
    title: "mobile_development",
    description: "Build native and cross-platform mobile applications for iOS and Android.",
    image: "/images/android.jpg",
    icon: Smartphone,
    level: "Intermediate",
    duration: "10 weeks",
    category: "Professional",
  },
  {
    id: 4,
    title: "kids_programming",
    description: "Fun and interactive programming courses designed specifically for children.",
    image: "/images/kids.jpg",
    icon: Gamepad,
    level: "Beginner",
    duration: "6 weeks",
    category: "Kids",
  },
  {
    id: 5,
    title: "competitive_programming",
    description: "Enhance your problem-solving skills and prepare for programming competitions.",
    image: "/images/icpc.png",
    icon: Code,
    level: "Advanced",
    duration: "8 weeks",
    category: "Professional",
  },
  {
    id: 6,
    title: "arduino",
    description: "Learn electronics and programming with Arduino for interactive projects.",
    image: "/images/arduino.jpg",
    icon: Cpu,
    level: "Beginner",
    duration: "6 weeks",
    category: "Kids",
  },
]

export default function FeaturedCourses() {
  const { t, language } = useLanguage()
  const [visibleCourses, setVisibleCourses] = useState(4)

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
        {courses.slice(0, visibleCourses).map((course) => (
          <motion.div key={course.id} variants={item}>
            <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={course.image}
                  alt={t(course.title)}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={course.category === "Kids" ? "secondary" : "default"}>
                    {language === "ar"
                      ? course.category === "Kids"
                        ? "أطفال"
                        : "مهني"
                      : course.category}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <course.icon className="h-5 w-5 text-primary" />
                  <span>{t(course.title)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">
                  {language === "ar"
                    ? t(`${course.title}_desc_ar`)
                    : course.description}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">
                      {language === "ar" ? "المستوى:" : "Level:"}
                    </span> {language === "ar" ? t(`${course.title}_level_ar`) : course.level}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">
                      {language === "ar" ? "المدة:" : "Duration:"}
                    </span> {language === "ar" ? t(`${course.title}_duration_ar`) : course.duration}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/courses/${course.id}`}>{t("learn_more")}</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {visibleCourses < courses.length && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={() => setVisibleCourses(courses.length)}>
            Load More Courses
          </Button>
        </div>
      )}
    </section>
  )
}
