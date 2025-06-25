"use client"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { FaWhatsapp } from "react-icons/fa"

export default function ContactPage() {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Split name into first and last
    const [firstName, ...rest] = formData.name.trim().split(" ")
    const lastName = rest.join(" ")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName || formData.name,
          lastName: lastName || "",
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }),
      })
      if (res.ok) {
        toast({
          title: language === "ar" ? "تم إرسال الرسالة!" : "Message sent!",
          description: language === "ar"
            ? "سنرد عليك في أقرب وقت ممكن."
            : "We'll get back to you as soon as possible.",
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        toast({
          title: language === "ar" ? "حدث خطأ" : "Error",
          description: language === "ar"
            ? "فشل في إرسال الرسالة."
            : "Failed to send message.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: language === "ar" ? "حدث خطأ" : "Error",
        description: language === "ar"
          ? "فشل في إرسال الرسالة."
          : "Failed to send message.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 py-16">
      <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-primary p-10 md:p-16 text-primary-foreground flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">{t("contact_us")}</h2>
              <p className="mb-8 text-lg opacity-90">
                {t('contact_paragraph') === 'contact_paragraph' && t('contact_us') === 'Contact Us' && language === 'en'
                  ? 'We are here to answer your questions and provide more information about our programs. Reach out and we will get back to you as soon as possible.'
                  : t('contact_paragraph')}
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-1 text-base">Address</h3>
                  <p className="text-sm opacity-90">Dubai</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-base">{t("email")}</h3>
                  <a href="mailto:info@rasikhacademy.com" className="text-sm opacity-90 hover:text-primary transition">info@rasikhacademy.com</a>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-base">Phone</h3>
                  <div className="flex items-center gap-3">
                    <a href="tel:+971525775382" className="text-sm opacity-90 hover:text-primary transition" dir="ltr" style={{ unicodeBidi: 'plaintext' }}>+971 52 577 5382</a>
                    <a href="https://wa.me/971525775382" target="_blank" rel="noopener noreferrer">
                      <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow">
                        <FaWhatsapp className="w-5 h-5" />
                        Let's Talk
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="p-10 md:p-16 bg-white flex items-center justify-center">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6 w-full"
            >
              <div className="mb-6">
                <Input
                  name="name"
                  placeholder={t("name")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="py-3 pl-6 pr-4 text-base"
                />
              </div>
              <div className="mb-6">
                <Input
                  name="email"
                  type="email"
                  placeholder={t("email")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="py-3 pl-6 pr-4 text-base"
                />
              </div>
              <div className="mb-6">
                <Input
                  name="subject"
                  placeholder={t("subject")}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="py-3 pl-6 pr-4 text-base"
                />
              </div>
              <div className="mb-6">
                <textarea
                  name="message"
                  placeholder={t("message")}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full h-32 pl-6 pr-4 py-4 border-2 border-primary/20 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 text-base bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-bold text-lg shadow-md hover:bg-primary/90 transition disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("send_message") + "..." : t("send_message")}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  )
} 