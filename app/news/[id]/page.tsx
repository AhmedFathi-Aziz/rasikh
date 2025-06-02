"use client"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { FaWhatsapp } from "react-icons/fa"
import { useLanguage } from "@/components/language-provider"

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { language } = useLanguage();

  // For now, only id=0 is supported with static content
  if (id !== "0") {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">الخبر غير متوفر</h1>
        <p>عذراً، لم يتم العثور على تفاصيل هذا الخبر.</p>
      </div>
    )
  }

  // Use local images for the slider
  const images = [
    "/images/school/1.jpeg",
    "/images/school/2.jpeg",
    "/images/school/3.jpeg",
    "/images/school/4.jpeg",
    "/images/school/5.jpeg",
    "/images/school/6.jpeg",
  ];
  const [current, setCurrent] = useState(0);
  const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((current + 1) % images.length);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Content in both languages
  const content = {
    ar: {
      title: "تعاون أكاديمية راسخ مع النادي المصري لتدريس المنهج المصري",
      intro: "يسر أكاديمية راسخ أن تعلن عن تعاونها المثمر مع النادي المصري لتقديم برنامج تعليمي متميز يهدف إلى تدريس المنهج المصري للجالية المصرية المقيمة، وكذلك للجاليات العربية الراغبة في دراسة المنهج المصري المعتمد.",
      objectivesTitle: "يهدف هذا التعاون إلى:",
      objectives: [
        "تلبية احتياجات الأسر المصرية الراغبة في استمرار أبنائهم في الدراسة وفقًا للمنهج المصري.",
        "توفير بيئة تعليمية داعمة تجمع بين الجودة الأكاديمية والرعاية التربوية.",
        "تعزيز الروابط الثقافية والتعليمية بين أبناء الجالية المصرية والعربية.",
      ],
      targetTitle: "الفئة المستهدفة:",
      target: [
        "أبناء الجالية المصرية من مرحلة الروضة إلى الصف الثالث الابتدائي.",
        "أبناء الجاليات العربية الراغبين في دراسة المنهج المصري.",
      ],
      advantagesTitle: "المزايا:",
      advantages: [
        "مناهج مصرية معتمدة.",
        "نخبة من المعلمين المتخصصين.",
        "متابعة مستمرة وتقييم دوري.",
        "بيئة تعليمية محفزة وآمنة.",
        "تنمية الجوانب الفنية (الرسم - الخط العربي - حفظ القرآن الكريم)",
      ],
      whatsappLine: "لمعرفة المزيد أو التسجيل، يرجى التواصل علي واتساب علي الرقم:",
      closing: "معًا نرتقي بمستوى التعليم لأبنائنا في الخارج",
      faqTitle: "الأسئلة الشائعة",
      faq: [
        { q: "أين يقع المركز؟", a: (<><div>يقع المركز في النادي المصري بإمارة عجمان.</div><div className="mt-2"><iframe src="https://www.google.com/maps?q=25.400207,55.463184&z=16&output=embed" width="100%" height="220" style={{border:0, borderRadius:'1rem'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div></>) },
        { q: "ما هي الرسوم الدراسية؟", a: (<div>الرسوم الدراسية تبلغ 4500 درهم للمنهج العربي و5000 درهم لمنهج اللغات.<br/>وفي حال دفع كامل المبلغ في بداية الدراسة يتم خصم 5%</div>) },
        { q: "هل يوجد خصم للإخوة؟", a: "نعم، يوجد خصم 10% للطالب الثاني." },
        { q: "كيف يمكن التسجيل؟", a: "يتم التسجيل من خلال دفع رسوم حجز مقعد بقيمة 250 درهم، وتُخصم من الرسوم الدراسية." },
        { q: "هل يوجد زي مدرسي؟", a: "نعم، يوجد زي مدرسي معتمد (بالرسوم لمن يرغب)." },
        { q: "هل تتوفر خدمة المواصلات؟", a: "نعم، تتوفر خدمة المواصلات للطلاب (بالرسوم لمن يرغب)." },
        { q: "متى يبدأ العام الدراسي؟", a: "يبدأ العام الدراسي في السابع من شهر سبتمبر." },
        { q: "هل يوجد قسم عربي ولغات؟", a: "نعم يوجد." },
        { q: "هل توفرون الكتب الدراسية أم يجب شراؤها؟", a: "نعم، نوفر جميع الكتب الدراسية اللازمة (بالرسوم لمن يرغب)." },
      ],
      dir: "rtl"
    },
    en: {
      title: "Rasikh Academy Partners with the Egyptian Club to Offer the Egyptian Curriculum",
      intro: "Rasikh Academy is pleased to announce a fruitful partnership with the Egyptian Club to deliver a distinguished educational program for the Egyptian community and all Arab communities interested in the accredited Egyptian curriculum.",
      objectivesTitle: "This partnership aims to:",
      objectives: [
        "Meet the needs of Egyptian families wishing their children to continue studying according to the Egyptian curriculum.",
        "Provide a supportive educational environment that combines academic quality and educational care.",
        "Strengthen cultural and educational ties among Egyptian and Arab communities.",
      ],
      targetTitle: "Target Audience:",
      target: [
        "Children of the Egyptian community from all educational stages.",
        "Children of Arab communities wishing to study the Egyptian curriculum.",
      ],
      advantagesTitle: "Advantages:",
      advantages: [
        "Accredited Egyptian curricula.",
        "A selection of specialized teachers.",
        "Continuous follow-up and regular evaluation.",
        "A stimulating and safe educational environment.",
      ],
      whatsappLine: "For more information or to register, please contact us on WhatsApp at:",
      closing: "Together, we elevate the educational level of our children abroad.",
      faqTitle: "Frequently Asked Questions",
      faq: [
        { q: "Where is the center located?", a: "The center is located at the Egyptian Club in Ajman Emirate." },
        { q: "What are the tuition fees?", a: "The tuition fees are 4500 AED for the Arabic curriculum and 5000 AED for the language curriculum." },
        { q: "How can I register?", a: "Registration is done by paying a seat reservation fee of 250 AED, which is deducted from the tuition fees." },
        { q: "Is there a school uniform?", a: "Yes, there is an official school uniform." },
        { q: "Is transportation available?", a: "Yes, transportation service is available for students." },
        { q: "When does the academic year start?", a: "The academic year starts on the 7th of September." },
        { q: "Is there a discount for more than one student?", a: "Yes, there is a 10% discount for the second student." },
        { q: "Is education available in Arabic and other languages?", a: "Yes, education is available in Arabic and other languages." },
        { q: "Do you provide textbooks or should we buy them?", a: "Yes, we provide all the necessary textbooks." },
      ],
      dir: "ltr"
    }
  };
  const c = content[language === "ar" ? "ar" : "en"];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#f1f5f9] py-10 md:py-20"
    >
      <div className={`container mx-auto flex flex-col md:flex-row gap-10 items-center max-w-6xl px-4 sm:px-8`} dir="ltr">
        {/* Image Slider (Left) */}
        <div className="relative w-full md:w-1/2 h-64 md:h-[28rem] overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-2xl border border-gray-100 flex-shrink-0">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              style={{ pointerEvents: idx === current ? 'auto' : 'none' }}
            >
              <Image
                src={img}
                alt={`صورة ${idx + 1}`}
                fill
                className="object-contain w-full h-full"
                priority={idx === 0}
                sizes="(max-width: 768px) 100vw, 55vw"
                draggable={false}
              />
            </div>
          ))}
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-primary rounded-full p-2 shadow-md z-20"
            aria-label="السابق"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-primary rounded-full p-2 shadow-md z-20"
            aria-label="التالي"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full ${idx === current ? 'bg-primary' : 'bg-white/70 border border-primary'}`}
                aria-label={`انتقل إلى الصورة ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        {/* Title and Intro (Right of Slider) */}
        <div className={`w-full md:w-[60%] flex flex-col justify-center items-start ${c.dir === "rtl" ? "text-right" : "text-left"}`} dir={c.dir}>
          <div className="bg-white/90 rounded-3xl shadow-xl border border-primary/10 p-8 md:p-14 w-full max-w-2xl mx-auto mb-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary mb-6 leading-tight tracking-tight" style={{fontFamily: 'Cairo, serif'}}>{c.title}</h1>
            <hr className="border-primary/20 mb-6" />
            <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed">{c.intro}</p>
          </div>
        </div>
      </div>
      {/* Rest of the content below (objectives, target, advantages, closing) */}
      <div className={`container mx-auto w-screen flex flex-col items-start mt-4 max-w-6xl px-4 sm:px-8 ${c.dir === "rtl" ? "text-right" : "text-left"}`} dir={c.dir}>
        <div className="bg-white/95 rounded-3xl shadow-xl border border-primary/10 p-6 md:p-12 w-full">
          <div className="space-y-10">
            {/* Objectives */}
            <div className="bg-primary/5 rounded-xl p-5 md:p-7 border-r-4 border-primary/30">
              <h2 className="text-xl font-bold text-primary mb-3">{c.objectivesTitle}</h2>
              <ul className="list-disc pr-6 pl-6 text-base md:text-lg text-gray-700 space-y-1">
                {c.objectives.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            {/* Target Audience */}
            <div className="bg-gray-50 rounded-xl p-5 md:p-7 border-r-4 border-primary/10">
              <h2 className="text-xl font-bold text-primary mb-3">{c.targetTitle}</h2>
              <ul className="list-disc pr-6 pl-6 text-base md:text-lg text-gray-700 space-y-1">
                {c.target.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            {/* Advantages */}
            <div className="bg-primary/5 rounded-xl p-5 md:p-7 border-r-4 border-primary/30">
              <h2 className="text-xl font-bold text-primary mb-3">{c.advantagesTitle}</h2>
              <ul className="list-disc pr-6 pl-6 text-base md:text-lg text-gray-700 space-y-1">
                {c.advantages.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            {/* Closing */}
            <div className={`pt-6 mt-4 border-t border-gray-200 space-y-3 ${c.dir === "rtl" ? "text-right" : "text-left"}`}>
              <div className={`flex flex-col items-end text-base md:text-lg font-semibold w-full gap-2 ${c.dir === "rtl" ? "text-right" : "text-left"}`}>
                <span className="w-full">{c.whatsappLine}</span>
                <a
                  href="https://wa.me/971525775382"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white font-bold whitespace-nowrap bg-primary hover:bg-primary/90 px-5 py-2 rounded-xl shadow-lg border-2 border-primary text-lg md:text-xl transition-colors"
                  style={{direction: 'ltr'}}
                >
                  <FaWhatsapp className="inline-block text-2xl" />
                  <span dir="ltr" className="whitespace-nowrap">+971 52 577 5382</span>
                </a>
              </div>
              <p className="text-base md:text-lg text-primary font-bold">{c.closing}</p>
            </div>
          </div>
        </div>
      </div>
      {/* FAQ Section */}
      <div className={`container mx-auto w-screen flex flex-col items-start mt-8 max-w-6xl px-4 sm:px-8 ${c.dir === "rtl" ? "text-right" : "text-left"}`} dir={c.dir}>
        <div className="bg-white/95 rounded-3xl shadow-xl border border-primary/10 p-6 md:p-12 w-full">
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-8">{c.faqTitle}</h2>
          <div className="space-y-6">
            {c.faq.map((item, i) => (
              <div key={i}>
                <div className="font-bold text-lg text-primary mb-1">{item.q}</div>
                <div className="text-base md:text-lg text-gray-800 pl-2">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
} 