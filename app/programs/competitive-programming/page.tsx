"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CompetitiveProgrammingPage() {
  const { t } = useLanguage()
  return (
    <section className="container mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{t("Competitive Programming Training")}</h1>
      <p className="mb-6 text-lg">{t("competitive_programming_description_formal")}</p>
      <ul className="space-y-3 mb-8">
        <li>{t("comp_prog_feature_1")}</li>
        <li>{t("comp_prog_feature_2")}</li>
        <li>{t("comp_prog_feature_3")}</li>
        <li>{t("comp_prog_feature_4")}</li>
        <li>{t("comp_prog_feature_5")}</li>
      </ul>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{t("About the Coaches")}</h2>
        <p>{t("coaches_acpc_icpc_formal")}</p>
      </div>
      <Button asChild>
        <Link href="/contact">{t("Contact Us to Enroll")}</Link>
      </Button>
    </section>
  )
} 