"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function AboutPreview() {
  const { t, language } = useLanguage()

  const features = language === "ar"
    ? [
        "برامج تدريبية معتمدة وذات اعتراف صناعي",
        "مدربون خبراء بسجلات نجاح مثبتة في مجالاتهم",
        "منهجيات حديثة وبيئات تعلم تفاعلية",
        "دعم شامل للأفراد والمؤسسات"
      ]
    : [
        "Accredited and industry-recognized training programs",
        "Expert trainers with proven track records in their fields",
        "Modern methodologies and interactive learning environments",
        "Comprehensive support for both individuals and organizations"
      ];

  return (
    <section
      className={`container mx-auto px-4 sm:px-6 py-12 ${language === "ar" ? "text-right" : "text-left"}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: language === "ar" ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={language === "ar" ? "lg:order-2" : ""}
        >
          <div className="relative h-[320px] sm:h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl mb-12 bg-white flex items-center justify-center">
            <Image
              src="/images/rasikh-logo.png"
              alt="Rasikh Academy Logo"
              fill
              className="object-contain p-8"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: language === "ar" ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={language === "ar" ? "lg:order-1" : ""}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 leading-tight">
            {language === "ar" ? "عن أكاديمية راسخ" : "About Rasikh Academy"}
          </h2>
          <p className="text-primary font-semibold mb-6 text-lg md:text-xl">
            {language === "ar" ? "التميز في التدريب المهني" : "Excellence in Professional Training"}
          </p>
          <p className="text-muted-foreground mb-8 text-base md:text-lg leading-relaxed">
            {language === "ar"
              ? "تلتزم أكاديمية راسخ بتقديم أعلى معايير الجودة في التدريب المهني والإداري. بخبرة تمتد لعقود، نوفر برامج معتمدة وتجارب تعليمية متطورة تهدف إلى تمكين الأفراد والمؤسسات من تحقيق التميز والريادة في مجالاتهم."
              : "Rasikh Academy is dedicated to delivering the highest standards of quality in professional and administrative training. With decades of experience, we offer accredited programs and advanced learning experiences designed to empower individuals and organizations to achieve excellence and leadership in their fields."}
          </p>

          <ul
            className={`
              grid gap-4 mb-10
              ${language === "ar" ? "text-right mt-16" : "text-left mt-12"}
              sm:grid-cols-2
            `}
          >
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`
                  flex items-center p-4 bg-white rounded-xl shadow border
                  ${language === "ar" ? "flex-row-reverse" : ""}
                `}
              >
                <span className="flex items-center justify-center text-primary mr-4 ml-4 w-10 h-10">
                  <CheckCircle className="h-6 w-6" />
                </span>
                <span className={`text-sm md:text-base ${language === "ar" ? "font-medium" : "font-normal"}`}>{feature}</span>
              </motion.li>
            ))}
          </ul>

          <Button asChild size="lg" className="font-bold px-8 py-2 text-base md:text-lg">
            <Link href="/about">{language === "ar" ? "اعرف المزيد" : t("learn_more")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
