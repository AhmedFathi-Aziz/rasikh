"use client"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function AboutPage() {
  const { t, language } = useLanguage()
  const features = [
    t("about_feature_1"),
    t("about_feature_2"),
    t("about_feature_3"),
    t("about_feature_4"),
    t("about_feature_5"),
  ]

  const courses = language === "ar"
    ? [
        "الذكاء الاصطناعي (AI)",
        "هندسة البرمجيات",
        "تحليل البيانات وعلوم البيانات",
        "علوم البيانات",
        "نظم المعلومات الجغرافية (GIS)",
        "البرمجة والتطوير"
      ]
    : [
        'Artificial Intelligence (AI)',
        'Software Engineering',
        'Data Analysis & Analytics',
        'Data Science',
        'Geographic Information Systems (GIS)',
        'Programming & Development'
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
          {language === "ar" ? "عن الأكاديمية" : t("about_us")}
        </span>
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.2] overflow-visible ${language === "ar" ? "font-extrabold cairo-font text-primary" : "bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"}`}
        >
          {t("about_title")}
        </h1>
        <div className="w-24 h-1 bg-primary/20 mx-auto my-8 rounded-full"></div>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {t("about_subtitle")}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card rounded-2xl p-8 md:p-12 shadow-sm border border-border/50 mb-16 hover:shadow-lg transition-all"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-primary/90">{language === "ar" ? "مهمتنا" : "Our Mission"}</h2>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            {t("about_description")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card rounded-2xl p-8 md:p-12 shadow-sm border border-border/50 hover:shadow-lg transition-all"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center text-primary/90">
          {language === "ar" ? "الدورات المتاحة" : "Our Course Offerings"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
              className="flex items-center space-x-4 p-6 bg-muted/50 rounded-xl border border-border/30 hover:bg-accent/50 transition-all group cursor-pointer"
            >
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
              <span className="text-muted-foreground text-lg font-medium flex-grow">{course}</span>
              <ArrowRight className={language === "ar" ? "h-5 w-5 text-primary/50 group-hover:text-primary transition-colors mr-2" : "h-5 w-5 text-primary/50 group-hover:text-primary transition-colors"} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
} 