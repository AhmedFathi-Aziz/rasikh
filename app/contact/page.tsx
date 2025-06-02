"use client"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const { t, language } = useLanguage()
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 py-16 md:py-24 max-w-7xl"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold tracking-wider uppercase text-primary mb-4 block">
          {language === "ar" ? "تواصل معنا" : t("get_in_touch")}
        </span>
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.2] overflow-visible ${
            language === "ar"
              ? "font-extrabold cairo-font text-primary"
              : "bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
          }`}
        >
          {language === "ar" ? "اتصل بنا" : t("contact_us")}
        </h1>
        <div className="w-24 h-1 bg-primary/20 mx-auto my-8 rounded-full"></div>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {language === "ar"
            ? "نحن هنا للإجابة على أسئلتكم وتقديم المزيد من المعلومات حول برامجنا. تواصلوا معنا وسنرد عليكم في أقرب وقت ممكن."
            : "We're here to help and answer any questions you might have."}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-card rounded-2xl p-8 md:p-12 shadow-sm border border-border/50 hover:shadow-lg transition-all h-full"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-primary/90">{t("academy_name")}</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-lg mb-1">{language === "ar" ? "العنوان" : "Location"}</h3>
                <p className="text-muted-foreground">{language === "ar" ? "دبي" : "Dubai"}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-lg mb-1">{language === "ar" ? "البريد الإلكتروني" : "Email"}</h3>
                <a href="mailto:info@rasikhacademy.com" className="text-primary hover:underline">
                  info@rasikhacademy.com
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-lg mb-1">{language === "ar" ? "الهاتف" : "Phone"}</h3>
                <a href="tel:+971525775382" className="text-primary hover:underline">
                  <span dir="ltr" style={{ unicodeBidi: 'plaintext' }}>+971 52 577 5382</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-card rounded-2xl p-8 md:p-12 shadow-sm border border-border/50 hover:shadow-lg transition-all"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-primary/90">{language === "ar" ? "أرسل رسالة" : "Send us a Message"}</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">{language === "ar" ? "الاسم الأول" : "First Name"}</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">{language === "ar" ? "اسم العائلة" : "Last Name"}</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{language === "ar" ? "البريد الإلكتروني" : "Email"}</label>
              <input type="email" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{language === "ar" ? "الرسالة" : "Message"}</label>
              <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-border bg-background resize-none"></textarea>
            </div>
            <Button className="w-full">
              <Send className={language === "ar" ? "h-4 w-4 ml-2" : "h-4 w-4 mr-2"} />
              {language === "ar" ? "إرسال الرسالة" : "Send Message"}
            </Button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  )
} 