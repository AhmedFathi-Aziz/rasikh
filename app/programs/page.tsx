"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { ArrowRight, Target, Users, Calendar } from "lucide-react"

export default function ProgramsIndexPage() {
  const { t, language } = useLanguage()
  const programs = language === "ar"
    ? [
        {
          id: "competitive-programming",
          title: t("competitive_programming"),
          description: t("competitive_programming_description_formal"),
          duration: "6 أشهر",
          participants: "20 طالب كحد أقصى",
          goal: "إتقان حل المشكلات الخوارزمية"
        },
        {
          id: "kids-tech",
          title: t("kids_programming"),
          description: t("kids_tech_description_formal"),
          duration: "3 أشهر",
          participants: "الأعمار 8-14",
          goal: "بناء الثقة في التكنولوجيا"
        },
        {
          id: "professional-development",
          title: t("professional_development"),
          description: t("professional_development_description_formal"),
          duration: "4 أشهر",
          participants: "محترفون عاملون",
          goal: "تطوير مسارك المهني"
        },
      ]
    : [
        {
          id: "competitive-programming",
          title: t("Competitive Programming Training"),
          description: t("competitive_programming_description_formal"),
          duration: "6 months",
          participants: "Limited to 20",
          goal: "Master algorithmic problem solving"
        },
        {
          id: "kids-tech",
          title: t("Kids Tech Program"),
          description: t("kids_tech_description_formal"),
          duration: "3 months",
          participants: "Ages 8-14",
          goal: "Build confidence in technology"
        },
        {
          id: "professional-development",
          title: t("professional_development"),
          description: t("professional_development_description_formal"),
          duration: "4 months",
          participants: "Working professionals",
          goal: "Advance your career"
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
          {language === "ar" ? "اكتشف برامجنا" : t("discover_programs")}
        </span>
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.2] overflow-visible ${
            language === "ar"
              ? "font-extrabold cairo-font text-primary"
              : "bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
          }`}
        >
          {t("our_programs")}
        </h1>
        <div className="w-24 h-1 bg-primary/20 mx-auto my-8 rounded-full"></div>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {language === "ar"
            ? "برامج تدريبية متخصصة مصممة لتناسب أهدافك المهنية."
            : "Specialized training programs designed to meet your specific career goals."}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {programs.map((program, idx) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
            className="group relative"
          >
            <div className="bg-card rounded-xl p-4 shadow-2xl hover:shadow-2xl transition-all h-full flex flex-col justify-between">
              <Link href={`/programs/${program.id}`} className="flex-1 block">
                <h2 className="text-lg font-semibold mb-2 text-primary/90 group-hover:text-primary transition-colors">
                  {program.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-3">
                  {program.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className={`flex items-center text-muted-foreground text-sm`}> 
                    <Calendar className={language === "ar" ? "h-4 w-4 ml-2" : "h-4 w-4 mr-2"} />
                    <span>{program.duration}</span>
                  </div>
                  <div className={`flex items-center text-muted-foreground text-sm`}> 
                    <Users className={language === "ar" ? "h-4 w-4 ml-2" : "h-4 w-4 mr-2"} />
                    <span>{program.participants}</span>
                  </div>
                  <div className={`flex items-center text-muted-foreground text-sm`}> 
                    <Target className={language === "ar" ? "h-4 w-4 ml-2" : "h-4 w-4 mr-2"} />
                    <span>{program.goal}</span>
                  </div>
                </div>
                <div className="flex items-center text-primary font-medium mb-2 text-sm">
                  {language === "ar" ? "اعرف المزيد" : "Learn More"}
                  <ArrowRight className={language === "ar" ? "h-3 w-3 mr-2 group-hover:-translate-x-2 transition-transform" : "h-3 w-3 ml-2 group-hover:translate-x-2 transition-transform"} />
                </div>
              </Link>
              <Link
                href={`/contact?course=${encodeURIComponent(program.title)}`}
                className="w-full mt-1 block"
              >
                <button
                  className="w-full py-2 px-4 rounded-lg bg-primary text-white font-bold text-base shadow hover:bg-primary/90 transition-colors"
                  type="button"
                >
                  {language === "ar" ? "سجل الآن" : "Register"}
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
} 