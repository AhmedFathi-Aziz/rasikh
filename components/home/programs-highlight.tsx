"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/language-provider"

type ProgramKey =
  | "competitive_programming"
  | "competitive_programming_description_formal"
  | "comp_prog_feature_1"
  | "comp_prog_feature_2"
  | "comp_prog_feature_3"
  | "comp_prog_feature_4"
  | "comp_prog_feature_5"
  | "kids_programming"
  | "kids_tech_description_formal"
  | "kids_feature_1"
  | "kids_feature_2"
  | "kids_feature_3"
  | "kids_feature_4"
  | "kids_feature_5"
  | "professional_development"
  | "professional_development_description_formal"
  | "prodev_feature_1"
  | "prodev_feature_2"
  | "prodev_feature_3"
  | "prodev_feature_4"
  | "prodev_feature_5";

const programs = [
  {
    id: "competitive-programming",
    title_key: "competitive_programming",
    description_key: "competitive_programming_description_formal",
    image: "/images/icpc.jpg",
    features_keys: [
      "comp_prog_feature_1",
      "comp_prog_feature_2",
      "comp_prog_feature_3",
      "comp_prog_feature_4",
      "comp_prog_feature_5",
    ],
  },
  {
    id: "kids-tech",
    title_key: "kids_programming",
    description_key: "kids_tech_description_formal",
    image: "/images/kids.jpg",
    features_keys: [
      "kids_feature_1",
      "kids_feature_2",
      "kids_feature_3",
      "kids_feature_4",
      "kids_feature_5",
    ],
  },
  {
    id: "professional-development",
    title_key: "professional_development",
    description_key: "professional_development_description_formal",
    image: "/images/software.jpg",
    features_keys: [
      "prodev_feature_1",
      "prodev_feature_2",
      "prodev_feature_3",
      "prodev_feature_4",
      "prodev_feature_5",
    ],
  },
]

export default function ProgramsHighlight() {
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState(programs[0].id)

  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{t("our_programs")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("programs_description")}</p>
        </div>

        <Tabs defaultValue={programs[0].id} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="flex flex-col items-center gap-2 w-full max-w-xs mx-auto mb-16">
              {programs.map((program) => (
                <TabsTrigger key={program.id} value={program.id}>
                  {t(program.title_key as keyof Translations)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {programs.map((program) => (
            <TabsContent key={program.id} value={program.id}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    {t(program.title_key as keyof Translations)}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t(program.description_key as keyof Translations)}
                  </p>
                  {language === "ar" && program.id === "competitive-programming" && (
                    <div className="flex items-start mb-4">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-medium mr-3">
                        1
                      </span>
                      <span dir="rtl">{t("comp_prog_feature_1" as any)}</span>
                    </div>
                  )}
                  <ul className="space-y-3 mb-8">
                    {program.features_keys.map((featureKey, index) => (
                      (language === "ar" && program.id === "competitive-programming" && index === 0) ? null : (
                        <motion.li
                          key={featureKey}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-medium mr-3">
                            {index + 1}
                          </span>
                          <span>{t(featureKey as keyof Translations)}</span>
                        </motion.li>
                      )
                    ))}
                  </ul>

                  <Button asChild>
                    <Link href={`/programs/${program.id}`}>{t("learn_more")}</Link>
                  </Button>
                </div>

                <div className="relative w-full h-[220px] xs:h-[260px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg mt-8 lg:mt-0">
                  <Image
                    src={program.image || "/placeholder.svg"}
                    alt="Program image"
                    fill
                    className={program.id === "competitive-programming" ? "object-contain w-full h-full" : "object-cover w-full h-full"}
                    priority={program.id === "competitive-programming"}
                  />
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
