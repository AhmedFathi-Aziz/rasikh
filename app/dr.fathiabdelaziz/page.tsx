import Image from "next/image"
import Link from "next/link"
import {
  BarChart3,
  Video,
  BookOpen,
  Award,
  CreditCard,
  Calendar,
  AlertTriangle,
  Gift,
  Sparkles,
  Users,
  FolderOpen,
  HeadphonesIcon,
  Building2,
  ShieldCheck,
  Presentation,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const REGISTRATION_URL = "https://forms.gle/sXHxxf96SKkdfKFx5"

const IMG = { w: 1024, h: 682 }

const trustPoints = [
  {
    icon: Building2,
    title: "بيئات مهنية رفيعة المستوى",
    text: "تدريب وتقديم أمام جهات وفئات مهنية متخصصة.",
  },
  {
    icon: Presentation,
    title: "خبرة ميدانية موثّقة",
    text: "لقطات من جلسات حقيقية في تحليل البيانات والسياسات.",
  },
  {
    icon: ShieldCheck,
    title: "نفس الجودة في الدورة المباشرة",
    text: "أسلوب شرح منظم وتفاعلي كما في القاعات الافتراضية عبر Zoom.",
  },
] as const

const galleryItems = [
  {
    src: "/images/dr-fathi/seminar-data-framework.png",
    alt: "د. فتحي عبد العزيز يقدّم جلسة عن إطار عمل البيانات الذكية في دولة الإمارات أمام مجموعة من المهنيين",
    caption:
      "جلسة تدريبية حول إطار عمل البيانات الذكية في دولة الإمارات العربية المتحدة",
    wide: true,
  },
  {
    src: "/images/dr-fathi/podium.png",
    alt: "د. فتحي عبد العزيز في مناسبة تقديم رسمية أمام شاشة عرض",
    caption: "تقديم في فعاليات وبيئات رسمية ومهنية",
    wide: false,
  },
  {
    src: "/images/dr-fathi/workshop-presenting.png",
    alt: "د. فتحي عبد العزيز يشرح أثناء ورشة عمل مع حاسوب ووسائل عرض",
    caption: "شرح تفاعلي وتطبيق عملي أثناء ورش العمل",
    wide: false,
  },
  {
    src: "/images/dr-fathi/workshop-training.png",
    alt: "د. فتحي عبد العزيز يقدّم عرضاً تدريبياً باستخدام جهاز التحكم عن بُعد",
    caption: "تدريب مكثّف بأسلوب واضح وقريب من احتياجات المتدربين",
    wide: false,
  },
] as const

function GalleryFigure({
  src,
  alt,
  caption,
  wide,
  priority,
}: {
  src: string
  alt: string
  caption: string
  wide?: boolean
  priority?: boolean
}) {
  return (
    <figure
      className={cn(
        "group min-w-0 max-w-full overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md",
        wide && "lg:col-span-3",
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-muted aspect-[1024/682]",
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={IMG.w}
          height={IMG.h}
          sizes={wide ? "(max-width: 768px) 100vw, 1152px" : "(max-width: 768px) 100vw, 33vw"}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          priority={priority}
        />
      </div>
      <figcaption className="border-t border-border/60 bg-muted/30 px-4 py-3 text-center text-sm leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  )
}

export default function DrFathiAbdelazizCoursePage() {
  return (
    <div className="overflow-x-hidden bg-gradient-to-b from-muted/50 via-background to-background">
      <section className="container mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {/* RTL: العمود الأول (النص) يظهر يميناً، الثاني (الصورة) يساراً — بدون order لتفادي الخلل */}
        <div className="mb-10 grid w-full min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0 max-w-full space-y-4">
            <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                <Video className="h-3.5 w-3.5 shrink-0" aria-hidden />
                مباشر عبر Zoom
              </span>
              <span className="rounded-full border border-border bg-card px-3 py-1">
                المستوى الاحترافي
              </span>
              <span className="rounded-full border border-border bg-card px-3 py-1">
                أكاديمية راسخ
              </span>
            </div>

            <h1 className="text-center text-2xl font-extrabold leading-tight text-primary sm:text-start sm:text-3xl md:text-4xl">
              الدورة الاحترافية: تحليل البيانات الإحصائية
              <span className="mt-1 block text-xl font-bold text-foreground sm:text-2xl">
                (SPSS &amp; Excel) بمساعدة الذكاء الاصطناعي التوليدي
              </span>
            </h1>
            <p className="text-center text-lg font-semibold text-foreground sm:text-start">
              د. فتحي عبد العزيز
            </p>
            <p className="text-center text-muted-foreground leading-relaxed sm:text-start">
              مدرب وباحث في المجال الإحصائي وتحليل البيانات — خبرة تدريبية في
              بيئات مهنية ورسومية متعددة.
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button
                asChild
                size="lg"
                className="w-full min-w-0 sm:w-auto sm:min-w-[180px]"
              >
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  التسجيل في الدورة
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full min-w-0 sm:w-auto sm:min-w-[180px]"
              >
                <Link href="/contact">تواصل معنا</Link>
              </Button>
            </div>
          </div>

          <div className="min-w-0 w-full max-w-full">
            <figure className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl ring-1 ring-black/5 dark:ring-white/10 lg:max-w-none">
              <div className="relative aspect-[1024/682] w-full max-w-full">
                <Image
                  src="/images/dr-fathi/classroom.png"
                  alt="د. فتحي عبد العزيز أثناء التدريس والتقديم المهني في قاعة تدريب حديثة"
                  width={IMG.w}
                  height={IMG.h}
                  priority
                  className="h-full w-full object-cover object-center"
                  sizes="(max-width: 1024px) min(100vw, 36rem), 50vw"
                />
              </div>
              <figcaption className="border-t border-border/80 bg-muted/40 px-4 py-3 text-center text-sm text-muted-foreground">
                د. فتحي عبد العزيز — تدريس وتقديم مباشر أمام المتدربين
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mb-10 grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-3">
          {trustPoints.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex gap-3 rounded-xl border border-border/80 bg-card/90 p-4 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-foreground">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Card className="mb-10 border-primary/20 bg-card/90 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <span aria-hidden>📊</span>
              عن القاعة التدريبية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              أهلاً بكم في قاعة التدريب الافتراضية لأكاديمية راسخ. هذه الصفحة
              مخصصة للمشتركين في الدورة التدريبية المباشرة لتحويل البيانات إلى
              قرارات احترافية.
            </p>
          </CardContent>
        </Card>

        <div className="mb-10">
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground md:text-3xl">
            لقطات من الجلسات والخبرة الميدانية
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
            نعرض هنا جزءاً من أعمال د. فتحي في التدريب والتقديم المهني، لتكون
            صورة واضحة عما ينتظركم في الدورة من احتراف وجدية.
          </p>
          <div className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-3">
            {galleryItems.map((item, i) => (
              <GalleryFigure
                key={item.src}
                src={item.src}
                alt={item.alt}
                caption={item.caption}
                wide={item.wide}
                priority={i === 0}
              />
            ))}
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BookOpen className="h-5 w-5 text-primary" aria-hidden />
              مستويات الدورة التدريبية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <p>تنقسم الدورة إلى مستويين: تأسيسي ومتقدم.</p>
            <div>
              <h3 className="mb-3 font-bold text-foreground">
                أولاً: المستوى التأسيسي
              </h3>
              <ul className="list-disc space-y-2 pr-5 marker:text-primary">
                <li>دورة تأهيلية في برنامج MS Excel.</li>
                <li>دورة تأهيلية في برنامج SPSS.</li>
                <li>دورة تأهيلية في مبادئ الإحصاء.</li>
                <li>
                  دورة تأهيلية في الذكاء الاصطناعي (التركيز على هندسة الأسئلة
                  مع الذكاء الاصطناعي التوليدي).
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-bold text-foreground">
                ثانياً: المستوى المتقدم
              </h3>
              <p>
                الدورة الاحترافية في تحليل البيانات الإحصائية باستخدام SPSS
                وMS Excel وبمساعدة الذكاء الاصطناعي التوليدي.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <CreditCard className="h-5 w-5 text-primary" aria-hidden />
              استثمار الدورة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pr-5 text-muted-foreground marker:text-primary">
              <li>سعر المستوى التأسيسي الواحد: 45 دولاراً.</li>
              <li>
                عرض «الباقة الكاملة» (المستويات الأربعة): 119 دولاراً بدلاً من
                180 دولاراً.
              </li>
              <li>خصم للمجموعات (3 أفراد فأكثر): 10٪.</li>
              <li>خصم لأول 50 مشتركاً: 10٪.</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              طرق دفع متعددة تناسب مختلف الدول العربية.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Award className="h-5 w-5 text-primary" aria-hidden />
              الاعتمادات والشهادات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>
              حرصاً من أكاديمية راسخ على دعم ملفكم المهني، يحصل المتدرب على:
            </p>
            <ol className="list-decimal space-y-2 pr-5 marker:font-bold marker:text-primary">
              <li>
                شهادة إتمام معتمدة من الأكاديمية تُمنح مجاناً لمن يجتاز متطلبات
                الدورة والتطبيقات العملية.
              </li>
              <li>
                شهادة دولية موثقة من هيئة المعرفة والتنمية البشرية (KHDA) —
                دبي: اختيارية برسوم إضافية لمن يرغب في توثيق مهاراته بختم حكومي
                معتمد.
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="h-5 w-5 text-primary" aria-hidden />
              مميزات الدورة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pr-5 text-muted-foreground marker:text-primary">
              <li>
                بث مباشر (Zoom): شرح تفاعلي مع إمكانية المداخلات والأسئلة
                اللحظية.
              </li>
              <li>
                تطبيقات واقعية على بيانات حقيقية لزيادة الجاهزية لسوق العمل.
              </li>
              <li>شهادة إتمام من أكاديمية راسخ للتدريب.</li>
              <li>
                مجلد مواد علمية: قواعد بيانات، ملفات Excel جاهزة، ملخصات SPSS.
              </li>
              <li>
                دعم خاص: مراجعة شخصية من د. فتحي لنتائج تحليلاتكم وتصحيح
                المسار.
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="mb-6 grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" aria-hidden />
                جدول اللقاءات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">الأيام:</strong> يتم
                الاتفاق عليها في اجتماع Zoom لاختيار الأنسب للجميع.
              </p>
              <p>
                <strong className="text-foreground">خيارات المدة:</strong> دورة
                مكثفة 3 ساعات في خمسة أيام أسبوعياً حتى اكتمال ساعات الدورة؛ أو
                دورة 1 ساعة يومياً لخمسة أيام أسبوعياً حتى اكتمال الساعات.
              </p>
              <p>
                <strong className="text-foreground">رابط القاعة:</strong> يُرسل
                قبل البدء بساعة.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200/80 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-amber-900 dark:text-amber-100">
                <AlertTriangle className="h-5 w-5" aria-hidden />
                تنبيهات مهمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                يُفضّل الحضور من لابتوب لضمان التطبيق المتزامن مع الشرح.
              </p>
              <p>
                تُوفَّر تسجيلات للمحاضرة للمشتركين فقط لمن فاته الحضور.
              </p>
              <p>
                المجموعة للنقاش التقني والمهني؛ يُمنع التواصل الخاص أو نشر
                إعلانات.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-10 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2 text-xl">
              <Gift className="h-5 w-5 text-primary" aria-hidden />
              موعد البدء وعرض الحجز المبكر
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p className="font-semibold text-foreground">
              المقاعد محدودة — بدأ العد التنازلي!
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">الانطلاق:</strong> السبت،
                  25 أبريل 2026.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">التوقيت:</strong> يُحدَّد
                  بناءً على استطلاع آراء المشاركين.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>احصل على خصم 10٪ لأول 50 مشتركاً.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="rounded-2xl border bg-card p-6 text-center shadow-sm">
          <HeadphonesIcon
            className="mx-auto mb-3 h-8 w-8 text-primary opacity-80"
            aria-hidden
          />
          <p className="mb-4 text-muted-foreground">
            رابط التسجيل في الدورة التدريبية
          </p>
          <Button asChild size="lg" className="mb-3 w-full sm:w-auto">
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              فتح نموذج التسجيل
            </a>
          </Button>
          <p className="break-all text-xs text-muted-foreground">
            <a
              href={REGISTRATION_URL}
              className="underline underline-offset-2 hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {REGISTRATION_URL}
            </a>
          </p>
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <FolderOpen className="h-4 w-4 shrink-0" aria-hidden />
          حقيبة تدريبية كاملة للمشتركين المؤكدين
        </p>
      </section>
    </div>
  )
}
