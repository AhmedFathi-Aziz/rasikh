"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

const testimonials = [
  {
    id: 1,
    name: "testimonial_1_name",
    role: "testimonial_1_role",
    image: "/placeholder.svg?height=100&width=100",
    content: "testimonial_1_content",
  },
  {
    id: 2,
    name: "testimonial_2_name",
    role: "testimonial_2_role",
    image: "/placeholder.svg?height=100&width=100",
    content: "testimonial_2_content",
  },
  {
    id: 3,
    name: "testimonial_3_name",
    role: "testimonial_3_role",
    image: "/placeholder.svg?height=100&width=100",
    content: "testimonial_3_content",
  },
  {
    id: 4,
    name: "testimonial_4_name",
    role: "testimonial_4_role",
    image: "/placeholder.svg?height=100&width=100",
    content: "testimonial_4_content",
  },
]

export default function Testimonials() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-2">{t("testimonials")}</h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-8"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-muted rounded-xl p-8 md:p-12 shadow-sm relative"
          >
            <Quote className="absolute top-6 left-6 h-12 w-12 text-primary/10" />

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-background">
                <Image
                  src={testimonials[current].image || "/placeholder.svg"}
                  alt={testimonials[current].name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <p className="text-lg mb-6 italic">"{t(testimonials[current].content)}"</p>
                <h4 className="font-bold">{t(testimonials[current].name)}</h4>
                <p className="text-sm text-muted-foreground">{t(testimonials[current].role)}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-8 gap-2">
          <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous testimonial</span>
          </Button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false)
                  setCurrent(index)
                }}
                className={`h-2 rounded-full transition-all ${
                  current === index ? "w-6 bg-primary" : "w-2 bg-primary/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button variant="outline" size="icon" onClick={next} className="rounded-full">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next testimonial</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
