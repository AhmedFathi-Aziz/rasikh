"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"

export default function Footer() {
  const { t, language } = useLanguage()

  const currentYear = new Date().getFullYear()

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-muted py-12 border-t"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className={language === 'ar' ? '' : 'flex items-center'}>
              {language === 'ar' ? (
                <div className="flex flex-col items-start">
                  <span className="text-2xl cairo-font text-primary font-normal">{t('academy_ar')}</span>
                  <span className="text-2xl cairo-font text-primary font-normal">{t('rasikh_ar')}</span>
                </div>
              ) : (
                <>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Rasikh</span>
                  <span className="ml-1 text-sm font-medium text-muted-foreground">Academy</span>
                </>
              )}
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">{t("footer_description")}</p>
            <div className={`flex mt-6 ${language === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">{t("quick_links")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-sm text-muted-foreground hover:text-primary">
                  {t("courses")}
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-sm text-muted-foreground hover:text-primary">
                  {t("programs")}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-sm text-muted-foreground hover:text-primary">
                  {t("news")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">{t("courses")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-sm text-muted-foreground hover:text-primary">
                  {t("software_engineering")}
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-sm text-muted-foreground hover:text-primary">
                  {t("web_development")}
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-sm text-muted-foreground hover:text-primary">
                  {t("mobile_development")}
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {t("competitive_programming")}
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-sm text-muted-foreground hover:text-primary">
                  {t("kids_programming")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">{t("contact_us")}</h3>
            <address className="not-italic">
              <p className="text-sm text-muted-foreground mb-2">
                {language === 'ar' ? (
                  <>
                    <span className="block font-medium">العنوان</span>
                    <span className="block">دبي</span>
                  </>
                ) : (
                  <>
                    <span className="block font-medium">Location</span>
                    <span className="block">Dubai</span>
                  </>
                )}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <span className="block font-medium">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</span>
                <a href="mailto:info@rasikhacademy.com" className="hover:text-primary">
                  info@rasikhacademy.com
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="block font-medium">{language === 'ar' ? 'الهاتف' : 'Phone'}</span>
                <a href="tel:+971525775382" className="hover:text-primary">
                  <span dir="ltr" style={{ unicodeBidi: 'plaintext' }}>+971 52 577 5382</span>
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="w-full flex justify-center items-center">
            <p className={`text-sm text-muted-foreground ${language === 'ar' ? 'cairo-font text-primary font-normal text-center' : 'text-center'}`}>
              {language === 'ar'
                ? <>جميع الحقوق محفوظة. <span>© {currentYear}</span> <span>أكاديمية راسخ.</span></>
                : <>© {currentYear} Rasikh Academy. {t('all_rights_reserved')}</>
              }
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
