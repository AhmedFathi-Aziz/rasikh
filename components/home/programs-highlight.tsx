"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage, type Translations } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle2 } from "lucide-react"

type Program = {
  id: string;
  title_key: keyof Translations;
  description_key: keyof Translations;
  image: string;
  features: {
    key: keyof Translations;
  }[];
  link: string;
}

const programs: Program[] = [
  {
    id: "kids",
    title_key: "Kids Tech Program",
    description_key: "kids_tech_description_formal",
    image: "/images/kids.jpg",
    features: [
      { key: "kids_feature_1" },
      { key: "kids_feature_2" },
      { key: "kids_feature_3" },
      { key: "kids_feature_4" },
      { key: "kids_feature_5" },
    ],
    link: "/programs/kids",
  },
  {
    id: "competitive",
    title_key: "Competitive Programming Training",
    description_key: "competitive_programming_description_formal",
    image: "/images/icpc.jpg",
    features: [
      { key: "comp_prog_feature_1" },
      { key: "comp_prog_feature_2" },
      { key: "comp_prog_feature_3" },
      { key: "comp_prog_feature_4" },
      { key: "comp_prog_feature_5" },
    ],
    link: "/programs/competitive",
  },
  {
    id: "professional",
    title_key: "professional_development",
    description_key: "professional_development_description_formal",
    image: "/images/software.jpg",
    features: [
      { key: "prodev_feature_1" },
      { key: "prodev_feature_2" },
      { key: "prodev_feature_3" },
      { key: "prodev_feature_4" },
      { key: "prodev_feature_5" },
    ],
    link: "/programs/professional",
  },
]

export default function ProgramsHighlight() {
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState(programs[0].id)
  const isRTL = language === "ar"

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{t("discover_programs")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("programs_description")}</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Tabs defaultValue="kids" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
              {programs.map((program) => (
                <TabsTrigger key={program.id} value={program.id}>
                  {t(program.title_key)}
                </TabsTrigger>
              ))}
            </TabsList>

            {programs.map((program) => (
              <TabsContent key={program.id} value={program.id}>
                <motion.div variants={item}>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-2xl font-bold mb-4">{t(program.title_key)}</h3>
                          <p className="text-muted-foreground mb-6">{t(program.description_key)}</p>
                          <Button asChild>
                            <Link href={program.link}>
                              {t("learn_more")} <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                        <div>
                          <ul className="space-y-4">
                            {program.features.map((feature, index) => (
                              <motion.li
                                key={index}
                                variants={item}
                                className="flex items-start"
                              >
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                <span>{t(feature.key)}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
