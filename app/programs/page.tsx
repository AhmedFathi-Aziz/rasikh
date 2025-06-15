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
            <Link href={`/programs/${program.id}`}>
              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-lg transition-all h-full">
                <h2 className="text-2xl font-semibold mb-4 text-primary/90 group-hover:text-primary transition-colors">
                  {program.title}
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  {program.description}
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-5 w-5 mr-3" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-5 w-5 mr-3" />
                    <span>{program.participants}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Target className="h-5 w-5 mr-3" />
                    <span>{program.goal}</span>
                  </div>
                </div>

                <div className="flex items-center text-primary font-medium">
                  {language === "ar" ? "اعرف المزيد" : "Learn More"}
                  <ArrowRight className={language === "ar" ? "h-4 w-4 mr-2 group-hover:-translate-x-2 transition-transform" : "h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform"} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
} 