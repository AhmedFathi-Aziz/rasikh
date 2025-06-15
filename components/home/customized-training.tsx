"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

export default function CustomizedTraining() {
  const { language } = useLanguage()

  // Use available images for cyber security and software engineering related fields
  const logos = [
    { src: "/images/icpc.png", alt: "Competitive Programming / Cyber Security" },
    { src: "/images/kids.jpg", alt: "Software Engineering" },
    { src: "/images/web.jpg", alt: "Web Development" },
    { src: "/images/mobile.png", alt: "Mobile Development" }
  ]

  return (
    <section
      className={`container mx-auto px-4 sm:px-6 py-12 ${language === "ar" ? "text-right" : "text-left"}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="bg-accent/10 rounded-2xl shadow-lg p-8 md:p-12 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-extrabold mb-4 text-primary text-center"
        >
          {language === "ar" ? "الدورات التدريبية المخصصة" : "Customized Training Courses"}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground mb-8 text-base md:text-lg text-center max-w-2xl"
        >
          {language === "ar"
            ? "نقدم حلولاً تدريبية مصممة خصيصًا لتلبية متطلبات الأفراد والشركات، مع إمكانية تخصيص المحتوى والأهداف بما يتناسب مع احتياجاتكم."
            : "We offer tailored training solutions for individuals and organizations, with fully customizable content and objectives to meet your unique requirements."}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 mb-10"
        >
          {logos.map((logo, idx) => (
            <motion.div
              key={logo.src}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              className="bg-white rounded-xl shadow p-3 flex items-center justify-center h-20 w-32"
            >
              <Image src={logo.src} alt={logo.alt} width={100} height={60} className="object-contain" />
            </motion.div>
          ))}
        </motion.div>
        <Button asChild size="lg" className="font-bold px-8 py-3 text-base md:text-lg shadow-lg animate-bounce-slow">
          <Link href="/in-house-training">
            {language === "ar" ? "اطلب تدريب داخل الشركة" : "Request In-House Training"}
          </Link>
        </Button>
      </div>
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.5s infinite;
        }
      `}</style>
    </section>
  )
} 