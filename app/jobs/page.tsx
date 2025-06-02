"use client"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function JobsPage() {
  const { t, language } = useLanguage()

  const jobs = [
    language === "ar"
      ? {
          title: "مدرس برمجيات",
          location: "دبي",
          type: "دوام كامل",
          description: "نبحث عن مدرس برمجيات شغوف للانضمام إلى فريقنا المتنامي. يجب أن يمتلك المتقدم مهارات قوية في البرمجة وخبرة في التدريس.",
          requirements: [
            "خبرة لا تقل عن 5 سنوات في تطوير البرمجيات",
            "خبرة سابقة في التدريس أو الإشراف الأكاديمي",
            "مهارات تواصل قوية باللغتين العربية والإنجليزية",
            "درجة البكالوريوس في علوم الحاسوب أو مجال ذي صلة"
          ]
        }
      : {
          title: "Software Instructor",
          location: "Dubai, UAE",
          type: "Full-time",
          description: "We are looking for a passionate software instructor to join our growing team. The ideal candidate will have strong programming skills and teaching experience.",
          requirements: [
            "5+ years of software development experience",
            "Previous teaching or mentoring experience",
            "Strong communication skills in English and Arabic",
            "Bachelor's degree in Computer Science or related field"
          ]
        }
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
          {language === "ar" ? "فرص العمل" : t("career_opportunities")}
        </span>
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.2] overflow-visible ${language === "ar" ? "font-extrabold cairo-font text-primary" : "bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"}`}>
          {t("jobs")}
        </h1>
        <div className="w-24 h-1 bg-primary/20 mx-auto my-8 rounded-full"></div>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {language === "ar"
            ? "انضم إلى فريقنا وساهم في تشكيل مستقبل تعليم التكنولوجيا."
            : "Join our team and help shape the future of technology education."}
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {jobs.map((job, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 md:p-12 shadow-sm border border-border/50 hover:shadow-lg transition-all"
          >
            <div className="flex items-center space-x-4 mb-6">
              <Briefcase className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-2xl font-semibold text-primary/90">{job.title}</h2>
                <div className="flex items-center space-x-4 mt-2 text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{job.type}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-medium mb-3">{language === "ar" ? "الوصف الوظيفي" : "Job Description"}</h3>
                <p className="text-muted-foreground text-lg">{job.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">{language === "ar" ? "المتطلبات" : "Requirements"}</h3>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-3 text-muted-foreground">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button size="lg" className="w-full sm:w-auto">
              {language === "ar" ? "قدّم الآن" : "Apply Now"}
              <ArrowRight className={language === "ar" ? "h-4 w-4 mr-2" : "h-4 w-4 ml-2"} />
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
} 