"use client"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export default function CoursesPage() {
  const { t, language } = useLanguage()
  const coursesData = language === "ar"
    ? [
        {
          key: "software_engineering",
          description: t("software_engineering_desc_ar"),
          duration: t("software_engineering_duration_ar"),
          students: "150+",
          level: t("software_engineering_level_ar")
        },
        {
          key: "web_development",
          description: t("web_development_desc_ar"),
          duration: t("web_development_duration_ar"),
          students: "200+",
          level: t("web_development_level_ar")
        },
        {
          key: "mobile_development",
          description: t("mobile_development_desc_ar"),
          duration: t("mobile_development_duration_ar"),
          students: "100+",
          level: t("mobile_development_level_ar")
        },
        {
          key: "kids_programming",
          description: t("kids_programming_desc_ar"),
          duration: t("kids_programming_duration_ar"),
          students: "80+",
          level: t("kids_programming_level_ar")
        },
        {
          key: "competitive_programming",
          description: t("competitive_programming_desc_ar"),
          duration: t("competitive_programming_duration_ar"),
          students: "120+",
          level: t("competitive_programming_level_ar")
        },
        {
          key: "arduino",
          description: t("arduino_desc_ar"),
          duration: t("arduino_duration_ar"),
          students: "90+",
          level: t("arduino_level_ar")
        },
      ]
    : [
        {
          key: "software_engineering",
          description: "Learn software engineering principles, design patterns, and best practices.",
          duration: "12 weeks",
          students: "150+",
          level: "Intermediate to Advanced"
        },
        {
          key: "web_development",
          description: "Master modern web development with HTML, CSS, JavaScript, and popular frameworks.",
          duration: "16 weeks",
          students: "200+",
          level: "Beginner to Advanced"
        },
        {
          key: "mobile_development",
          description: "Build native and cross-platform mobile applications for iOS and Android.",
          duration: "14 weeks",
          students: "100+",
          level: "Intermediate"
        },
        {
          key: "kids_programming",
          description: "Fun and interactive programming courses designed specifically for children.",
          duration: "8 weeks",
          students: "80+",
          level: "Beginner"
        },
        {
          key: "competitive_programming",
          description: "Enhance your problem-solving skills and prepare for programming competitions.",
          duration: "10 weeks",
          students: "120+",
          level: "Advanced"
        },
        {
          key: "arduino",
          description: "Learn electronics and programming with Arduino for interactive projects.",
          duration: "8 weeks",
          students: "90+",
          level: "Beginner to Intermediate"
        },
      ]

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coursesData.map((course, idx) => (
          <motion.div
            key={course.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
            className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-lg transition-all flex flex-col"
          >
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold mb-4 text-primary/90">{t(course.key)}</h2>
              <p className="text-muted-foreground text-lg mb-6">{course.description}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-5 w-5 mr-3" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-5 w-5 mr-3" />
                  <span>{course.students} {language === "ar" ? "طالب" : "Students"}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <BookOpen className="h-5 w-5 mr-3" />
                  <span>{course.level}</span>
                </div>
              </div>
            </div>
            
            <Button className="w-full group">
              {language === "ar" ? "اعرف المزيد" : "Learn More"}
              <ArrowRight className={language === "ar" ? "h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" : "h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"} />
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
} 