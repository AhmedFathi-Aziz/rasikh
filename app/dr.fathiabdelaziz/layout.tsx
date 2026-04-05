import type { Metadata } from "next"
import { Cairo } from "next/font/google"

const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
})

const canonical = "https://rasikhacademy.com/dr.fathiabdelaziz"

export const metadata: Metadata = {
  title:
    "الدورة الاحترافية: تحليل البيانات الإحصائية (SPSS & Excel) | د. فتحي عبد العزيز",
  description:
    "دورة مباشرة عبر Zoom: مستوى تأسيسي ومتقدم في Excel وSPSS والإحصاء والذكاء الاصطناعي التوليدي، مع شهادات معتمدة من أكاديمية راسخ وخيار توثيق KHDA.",
  alternates: { canonical },
  openGraph: {
    title:
      "الدورة الاحترافية: تحليل البيانات الإحصائية (SPSS & Excel) — أكاديمية راسخ",
    description:
      "تدريب مباشر مع د. فتحي عبد العزيز: Excel، SPSS، مبادئ الإحصاء، وهندسة الأسئلة مع الذكاء الاصطناعي التوليدي.",
    url: canonical,
    locale: "ar_AE",
    type: "website",
    siteName: "Rasikh Academy",
    images: [
      {
        url: "/images/dr-fathi/classroom.png",
        width: 1024,
        height: 682,
        alt: "د. فتحي عبد العزيز — تدريب مهني",
      },
    ],
  },
}

export default function DrFathiCourseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      dir="rtl"
      lang="ar"
      className={`${cairo.className} min-h-[50vh] overflow-x-hidden`}
    >
      {children}
    </div>
  )
}
