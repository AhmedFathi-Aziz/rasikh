"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage, type Translations } from "@/components/language-provider"

type Testimonial = {
  content: keyof Translations;
  name: keyof Translations;
  role: keyof Translations;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    content: "testimonial_1_content",
    name: "testimonial_1_name",
    role: "testimonial_1_role",
    image: "/images/testimonials/student1.jpg",
  },
  {
    content: "testimonial_2_content",
    name: "testimonial_2_name",
    role: "testimonial_2_role",
    image: "/images/testimonials/student2.jpg",
  },
  {
    content: "testimonial_3_content",
    name: "testimonial_3_name",
    role: "testimonial_3_role",
    image: "/images/testimonials/student3.jpg",
  },
]

export default function Testimonials() {
  const { t, language } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const isRTL = language === "ar"

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{t("testimonials")}</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? -100 : 100 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center gap-8"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={testimonials[current].image}
                  alt={t(testimonials[current].name)}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <p className="text-lg mb-6 italic">"{t(testimonials[current].content)}"</p>
                <h4 className="font-bold">{t(testimonials[current].name)}</h4>
                <p className="text-sm text-muted-foreground">{t(testimonials[current].role)}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
