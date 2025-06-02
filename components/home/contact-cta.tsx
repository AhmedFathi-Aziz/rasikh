"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/components/language-provider"

export default function ContactCTA() {
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
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      })
      setIsSubmitting(false)
    }, 1500)
  }
  
  return (
    <section className="container mx-auto px-4 sm:px-6 py-12">
      <div className="max-w-5xl mx-auto bg-muted rounded-xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-primary p-8 md:p-12 text-primary-foreground">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">{t("contact_us")}</h2>
              <p className="mb-6">
                {t('contact_paragraph') === 'contact_paragraph' && t('contact_us') === 'Contact Us' && language === 'en'
                  ? 'We are here to answer your questions and provide more information about our programs. Reach out and we will get back to you as soon as possible.'
                  : t('contact_paragraph')}
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">{t("address") === "address" && language === "en" ? "Address" : t("address")}</h3>
                  <p className="text-sm opacity-90">Dubai</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">{t("email")}</h3>
                  <p className="text-sm opacity-90">info@rasikhacademy.com</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">{t("phone") === "phone" && language === "en" ? "Phone" : t("phone")}</h3>
                  <p className="text-sm opacity-90">
                    <span dir="ltr" style={{ unicodeBidi: 'plaintext' }}>+971 52 577 5382</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="p-8 md:p-12">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <Input
                  name="name"
                  placeholder={t("name")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder={t("email")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Input
                  name="subject"
                  placeholder={t("subject")}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder={t("message")}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full h-32 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md font-semibold hover:bg-primary/90 transition disabled:opacity-50"
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
