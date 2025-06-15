"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CompetitiveProgrammingPage() {
  const { t } = useLanguage()
  return (
    <section className="container mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{t("competitive_programming")}</h1>
      <p className="mb-6 text-lg">{t("competitive_programming_description_formal")}</p>
      <ul className="list-disc list-inside space-y-2 mb-8">
        <li>{t("comp_prog_feature_1")}</li>
        <li>{t("comp_prog_feature_2")}</li>
        <li>{t("comp_prog_feature_3")}</li>
        <li>{t("comp_prog_feature_4")}</li>
        <li>{t("comp_prog_feature_5")}</li>
      </ul>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{t("about_the_coaches")}</h2>
        <p>{t("coaches_acpc_icpc_formal")}</p>
      </div>
      <div className="text-center">
        <Link href="/contact">{t("contact_us_to_enroll")}</Link>
      </div>
    </section>
  )
} 