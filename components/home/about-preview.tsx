"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function AboutPreview() {
  const { t, language } = useLanguage()

  const features = [
    t("about_feature_1"),
    t("about_feature_2"),
    t("about_feature_3"),
    t("about_feature_5"),
  ]

  return (
    <section className="container mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={language === "ar" ? "lg:order-2" : ""}
        >
          <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/rasikh-logo.png"
              alt="Rasikh Academy Logo"
              fill
              className="object-contain p-8"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={language === "ar" ? "lg:order-1" : ""}
        >
          <h2 className="text-3xl font-bold tracking-tight mb-2">{t("about_title")}</h2>
          <p className="text-primary font-medium mb-6">{language === "ar" ? "التميز في التدريب المهني" : "Excellence in Professional Training"}</p>
          <p className="text-muted-foreground mb-6">
            {language === "ar"
              ? "تأسست أكاديمية راسخ وتجمع أكثر من 20 عامًا من الخبرة في التدريب المهني وهندسة البرمجيات. مهمتنا هي توفير تعليم وتدريب عالي الجودة للطلاب من جميع الأعمار، من الأطفال إلى المحترفين."
              : "Rasikh Academy brings over 20 years of experience in professional training and software engineering. Our mission is to provide high-quality education and training to students of all ages, from children to professionals."}
          </p>

          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start"
              >
                <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>

          <Button asChild>
            <Link href="/about">{t("learn_more")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
