"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProfessionalDevelopmentPage() {
  const { t } = useLanguage()
  return (
    <section className="container mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{t("professional_development")}</h1>
      <p className="mb-6 text-lg">{t("professional_development_description_formal")}</p>
      <ul className="list-disc list-inside space-y-2 mb-8">
        <li>{t("prodev_feature_1")}</li>
        <li>{t("prodev_feature_2")}</li>
        <li>{t("prodev_feature_3")}</li>
        <li>{t("prodev_feature_4")}</li>
        <li>{t("prodev_feature_5")}</li>
      </ul>
      <div className="text-center">
        <Link href="/contact">{t("contact_us_to_enroll")}</Link>
      </div>
    </section>
  )
} 