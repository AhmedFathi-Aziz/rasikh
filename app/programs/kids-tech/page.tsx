"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function KidsTechPage() {
  const { t } = useLanguage()
  return (
    <section className="container mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{t("kids_programming")}</h1>
      <p className="mb-6 text-lg">{t("kids_tech_description_formal")}</p>
      <ul className="list-disc list-inside space-y-2 mb-8">
        <li>{t("kids_feature_1")}</li>
        <li>{t("kids_feature_2")}</li>
        <li>{t("kids_feature_3")}</li>
        <li>{t("kids_feature_4")}</li>
        <li>{t("kids_feature_5")}</li>
      </ul>
      <div className="text-center">
        <Link href="/contact">{t("contact_us_to_enroll")}</Link>
      </div>
    </section>
  )
} 