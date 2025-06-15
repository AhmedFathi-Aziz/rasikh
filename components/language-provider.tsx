"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// English translations
const enTranslations = {
  // Navigation
  home: "Home",
  about: "About",
  courses: "Courses",
  programs: "Programs",
  news: "News",
  jobs: "Jobs",
  contact: "Contact",
  enroll_now: "Enroll Now",
  news_and_updates: "News & Updates",
  our_courses: "Our Courses",
  loading: "Loading...",
  no_courses: "No courses found.",
  career_opportunities: "Career Opportunities",
  discover_programs: "Discover Our Programs",
  "Kids Tech Program": "Kids Tech Program",
  contact_paragraph: "We're here to answer your questions and provide more information about our programs. Contact us and we'll get back to you as soon as possible.",
  professional_development: "Professional Development",
  about_the_coaches: "About the Coaches",
  contact_us_to_enroll: "Contact Us to Enroll",

  // News categories
  news_1_category: "Partnership",
  news_2_category: "Announcement",
  news_3_category: "Event",

  // News titles and excerpts
  news_1_title: "New Partnership with Tech Leaders",
  news_1_excerpt: "We are excited to announce our new partnership with leading technology companies to enhance our training programs.",
  news_2_title: "Summer Program Registration Open",
  news_2_excerpt: "Registration is now open for our summer programs. Early bird discounts available until May 15th.",
  news_3_title: "Student Success Story",
  news_3_excerpt: "Our student Ahmed won first place in the regional programming competition. Read about his journey with us.",

  // Hero section
  hero_title: "Empowering Future Innovators",
  hero_subtitle:
    "Professional training in software engineering, competitive programming, and children's tech education",
  get_started: "Get Started",
  learn_more: "Learn More",

  // About section
  about_title: "About Rasikh Academy",
  about_subtitle: "Excellence in Professional Training",
  about_description:
    "Rasikh Academy is a distinguished institution with extensive experience in professional training and software engineering. Our mission is to provide high-quality education and training to students of all ages, from children to professionals.",
  our_mission: "Our Mission",
  our_vision: "Our Vision",
  our_values: "Our Values",
  about_us: "About Us",

  // About features
  about_feature_1: "Distinguished instructors with extensive industry experience",
  about_feature_2: "Tailored learning pathways for diverse age groups",
  about_feature_3: "Comprehensive practical training with industry-standard projects",
  about_feature_4: "Optimal class sizes ensuring personalized attention",
  about_feature_5: "State-of-the-art facilities and comprehensive learning resources",

  // Courses section
  featured_courses: "Featured Courses",
  view_all_courses: "View All Courses",
  software_engineering: "Software Engineering",
  web_development: "Web Development",
  mobile_development: "Mobile Development",
  competitive_programming: "Competitive Programming",
  kids_programming: "Kids Programming",
  game_development: "Game Development",
  arduino: "Arduino",

  // Programs section
  our_programs: "Our Programs",
  programs_description: "We offer a variety of programs tailored to different age groups and skill levels.",
  egyptian_curriculum: "Egyptian Curriculum",
  egyptian_curriculum_description:
    "We cooperated with the Egyptian Club in Ajman to teach the Egyptian curriculum to Egyptian and Arab communities.",

  // Programs features
  egyptian_feature_1: "Comprehensive coverage of the Egyptian national curriculum",
  egyptian_feature_2: "Qualified Egyptian teachers with extensive experience",
  egyptian_feature_3: "Interactive learning environment with modern teaching methods",
  egyptian_feature_4: "Regular assessments and progress reports",
  egyptian_feature_5: "Preparation for Egyptian national examinations",

  // News section
  latest_news: "Latest News",
  view_all_news: "View All News",
  read_more: "Read More",

  // Contact section
  contact_us: "Contact Us",
  send_message: "Send Message",
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
  get_in_touch: "Get in Touch",

  // Footer
  footer_description:
    "Rasikh Academy is a professional training institution in Dubai offering courses in software engineering, competitive programming, and children's tech education.",
  quick_links: "Quick Links",
  all_rights_reserved: "All rights reserved.",
  privacy_policy: "Privacy Policy",
  terms_of_service: "Terms of Service",

  // Testimonials
  testimonials: "What Our Students Say",
  testimonial_1_content: "The training at Rasikh Academy has been transformative. The coaches' expertise and personalized approach helped me excel in competitive programming.",
  testimonial_1_name: "Ahmed Hassan",
  testimonial_1_role: "Competitive Programming Student",
  testimonial_2_content: "My children love the Kids Tech Program. The interactive learning environment and engaging projects make learning programming fun and exciting.",
  testimonial_2_name: "Sarah Mohammed",
  testimonial_2_role: "Parent",
  testimonial_3_content: "The professional development program provided me with the skills and confidence to transition into a successful tech career.",
  testimonial_3_name: "Mohammed Ali",
  testimonial_3_role: "Software Engineer",

  // Partners
  our_partners: "Our Partners",
  partners_description: "We collaborate with leading organizations to provide the best educational experience.",

  // Kids features
  kids_feature_1: "Age-appropriate programming concepts and tools",
  kids_feature_2: "Game-based learning approach to maintain engagement",
  kids_feature_3: "Development of logical thinking and problem-solving skills",
  kids_feature_4: "Introduction to coding, robotics, and digital creation",
  kids_feature_5: "Projects that children can showcase to friends and family",

  // Prodev features
  prodev_feature_1: "Industry-relevant curriculum developed with employer input",
  prodev_feature_2: "Hands-on projects that simulate real workplace scenarios",
  prodev_feature_3: "Career counseling and job placement assistance",
  prodev_feature_4: "Networking opportunities with industry professionals",
  prodev_feature_5: "Flexible scheduling options for working professionals",

  about_stat_experience: "years of software engineering experience",
  about_stat_trainers: "Trainers are software engineers in major tech companies",

  // New Competitive Programming Training program features
  comp_prog_feature_1: "Coaches with ACPC and ICPC finals experience",
  comp_prog_feature_2: "Advanced problem-solving techniques",
  comp_prog_feature_3: "Regular mock contests and analysis",
  comp_prog_feature_4: "Personalized feedback and mentoring",
  comp_prog_feature_5: "Preparation for national and international competitions",

  "Competitive Programming Training": "Competitive Programming Training",
  "Intensive training for students aiming to excel in competitive programming. Our coaches have reached ACPC and ICPC finals.": "Intensive training for students aiming to excel in competitive programming. Our coaches have reached ACPC and ICPC finals.",
  "About the Coaches": "About the Coaches",
  "Our coaches have participated in and reached the finals of ACPC and ICPC, bringing world-class experience to our students.": "Our coaches have participated in and reached the finals of ACPC and ICPC, bringing world-class experience to our students.",
  "Contact Us to Enroll": "Contact Us to Enroll",

  competitive_programming_description_formal: "A rigorous program designed to prepare students for national and international programming competitions, led by coaches with ACPC and ICPC finals experience.",
  kids_tech_description_formal: "A specialized technology education program for children aged 7-14, focusing on foundational programming, robotics, and digital skills in an engaging and supportive environment.",
  professional_development_description_formal: "Advanced training programs for professionals seeking to enhance their technical skills or transition into technology careers, with hands-on projects and expert mentorship.",
  coaches_acpc_icpc_formal: "Our coaches have participated in and reached the finals of ACPC and ICPC, bringing world-class experience to our students.",
  academy_name: "Rasikh Academy",

  // Logo (Arabic)
  rasikh_ar: "راسخ",
  academy_ar: "أكاديمية",

  // Course descriptions, levels, durations (Arabic)
  software_engineering_desc_ar: "تعلم مبادئ هندسة البرمجيات، وأنماط التصميم، وأفضل الممارسات.",
  software_engineering_level_ar: "متوسط",
  software_engineering_duration_ar: "12 أسبوعًا",
  web_development_desc_ar: "إتقان تطوير الويب الحديث باستخدام HTML وCSS وJavaScript وأطر العمل الشائعة.",
  web_development_level_ar: "مبتدئ",
  web_development_duration_ar: "8 أسابيع",
  mobile_development_desc_ar: "بناء تطبيقات الجوال الأصلية وعبر المنصات لنظامي iOS وAndroid.",
  mobile_development_level_ar: "متوسط",
  mobile_development_duration_ar: "10 أسابيع",
  kids_programming_desc_ar: "دورات برمجة ممتعة وتفاعلية مصممة خصيصًا للأطفال.",
  kids_programming_level_ar: "مبتدئ",
  kids_programming_duration_ar: "6 أسابيع",
  competitive_programming_desc_ar: "عزز مهاراتك في حل المشكلات واستعد للمسابقات البرمجية.",
  competitive_programming_level_ar: "متقدم",
  competitive_programming_duration_ar: "8 أسابيع",
  arduino_desc_ar: "تعلم الإلكترونيات والبرمجة مع أردوينو لمشاريع تفاعلية.",
  arduino_level_ar: "مبتدئ",
  arduino_duration_ar: "6 أسابيع",

  // Admin section
  admin_dashboard: "Admin Dashboard",
  add_new_course: "Add New Course",
  edit_course: "Edit Course",
  course_title: "Course Title",
  course_description: "Course Description",
  duration: "Duration",
  level: "Level",
  category: "Category",
  image_url: "Image URL",
  save: "Save",
  cancel: "Cancel",
  delete: "Delete",
  students: "Students",
  analytics: "Analytics",
  settings: "Settings",
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  professional: "Professional",
  kids: "Kids",
}

// Arabic translations
const arTranslations = {
  // Navigation
  home: "الرئيسية",
  about: "عن الأكاديمية",
  courses: "الدورات",
  programs: "البرامج",
  news: "الأخبار",
  jobs: "الوظائف",
  contact: "اتصل بنا",
  enroll_now: "سجل الآن",
  news_and_updates: "الأخبار والتحديثات",
  our_courses: "دوراتنا",
  loading: "جاري التحميل...",
  no_courses: "لم يتم العثور على دورات.",
  career_opportunities: "فرص العمل",
  discover_programs: "اكتشف برامجنا",
  "Kids Tech Program": "برنامج التكنولوجيا للأطفال",
  contact_paragraph: "نحن هنا للإجابة على أسئلتكم وتقديم المزيد من المعلومات حول برامجنا. تواصلوا معنا وسنرد عليكم في أقرب وقت ممكن.",
  professional_development: "التدريب المهني",
  about_the_coaches: "عن المدربين",
  contact_us_to_enroll: "تواصل معنا للتسجيل",

  // News categories
  news_1_category: "شراكة",
  news_2_category: "إعلان",
  news_3_category: "فعالية",

  // News titles and excerpts
  news_1_title: "شراكة جديدة مع رواد التكنولوجيا",
  news_1_excerpt: "يسرنا الإعلان عن شراكتنا الجديدة مع شركات التكنولوجيا الرائدة لتعزيز برامجنا التدريبية.",
  news_2_title: "فتح باب التسجيل للبرامج الصيفية",
  news_2_excerpt: "تم فتح باب التسجيل لبرامجنا الصيفية. خصومات للبادرين متاحة حتى 15 مايو.",
  news_3_title: "قصة نجاح طالب",
  news_3_excerpt: "حقق طالبنا أحمد المركز الأول في مسابقة البرمجة الإقليمية. اقرأ عن رحلته معنا.",

  // Hero section
  hero_title: "تمكين مبتكري المستقبل",
  hero_subtitle: "تدريب احترافي في هندسة البرمجيات والبرمجة التنافسية وتعليم التكنولوجيا للأطفال",
  get_started: "ابدأ الآن",
  learn_more: "اعرف المزيد",

  // About section
  about_title: "عن أكاديمية راسخ",
  about_subtitle: "التميز في التدريب المهني",
  about_description:
    "أكاديمية راسخ هي مؤسسة متميزة تتمتع بخبرة واسعة في التدريب المهني وهندسة البرمجيات. تلتزم الأكاديمية بتقديم تعليم وتدريب عالي الجودة يلبي احتياجات مختلف الفئات والأعمار، ويواكب متطلبات سوق العمل المتجددة.",
  our_mission: "مهمتنا",
  our_vision: "رؤيتنا",
  our_values: "قيمنا",
  about_us: "عن الأكاديمية",

  // About features
  about_feature_1: "مدربون متميزون يتمتعون بخبرة واسعة في المجال",
  about_feature_2: "مسارات تعليمية مصممة لمختلف الفئات العمرية",
  about_feature_3: "تدريب عملي شامل مع مشاريع معيارية للصناعة",
  about_feature_4: "حجم فصول مثالي يضمن الاهتمام الفردي",
  about_feature_5: "مرافق وموارد تعليمية متطورة وشاملة",

  // Courses section
  featured_courses: "الدورات المميزة",
  view_all_courses: "عرض جميع الدورات",
  software_engineering: "هندسة البرمجيات",
  web_development: "تطوير الويب",
  mobile_development: "تطوير تطبيقات الجوال",
  competitive_programming: "البرمجة التنافسية",
  kids_programming: "برمجة للأطفال",
  game_development: "تطوير الألعاب",
  arduino: "أردوينو",

  // Programs section
  our_programs: "برامجنا",
  programs_description: "نقدم مجموعة متنوعة من البرامج المصممة لمختلف الفئات العمرية ومستويات المهارة.",
  egyptian_curriculum: "المنهج المصري",
  egyptian_curriculum_description: "تعاونا مع النادي المصري في عجمان لتدريس المنهج المصري للجاليات المصرية والعربية.",

  // Programs features
  egyptian_feature_1: "تغطية شاملة للمنهج المصري الوطني",
  egyptian_feature_2: "معلمون مصريون مؤهلون وذوو خبرة واسعة",
  egyptian_feature_3: "بيئة تعليمية تفاعلية بطرق تدريس حديثة",
  egyptian_feature_4: "تقييمات منتظمة وتقارير تقدم مستمرة",
  egyptian_feature_5: "التحضير للامتحانات الوطنية المصرية",

  // News section
  latest_news: "أحدث الأخبار",
  view_all_news: "عرض جميع الأخبار",
  read_more: "اقرأ المزيد",

  // Contact section
  contact_us: "اتصل بنا",
  send_message: "إرسال رسالة",
  name: "الاسم",
  email: "البريد الإلكتروني",
  subject: "الموضوع",
  message: "الرسالة",
  get_in_touch: "تواصل معنا",

  // Footer
  footer_description:
    "أكاديمية راسخ هي مؤسسة تدريب مهني في دبي تقدم دورات في هندسة البرمجيات والبرمجة التنافسية وتعليم التكنولوجيا للأطفال.",
  quick_links: "روابط سريعة",
  all_rights_reserved: "جميع الحقوق محفوظة.",
  privacy_policy: "سياسة الخصوصية",
  terms_of_service: "شروط الخدمة",

  // Testimonials
  testimonials: "ماذا يقول طلابنا",
  testimonial_1_content: "كان التدريب في أكاديمية راسخ تحويلياً. ساعدت خبرة المدربين ونهجهم الشخصي في تميزي في البرمجة التنافسية.",
  testimonial_1_name: "أحمد حسن",
  testimonial_1_role: "طالب برمجة تنافسية",
  testimonial_2_content: "أطفالي يحبون برنامج التكنولوجيا للأطفال. البيئة التعليمية التفاعلية والمشاريع المشوقة تجعل تعلم البرمجة ممتعاً ومثيراً.",
  testimonial_2_name: "سارة محمد",
  testimonial_2_role: "أم",
  testimonial_3_content: "قدم لي برنامج التطوير المهني المهارات والثقة للانتقال إلى مهنة تقنية ناجحة.",
  testimonial_3_name: "محمد علي",
  testimonial_3_role: "مهندس برمجيات",

  // Partners
  our_partners: "شركاؤنا",
  partners_description: "نتعاون مع مؤسسات رائدة لتقديم أفضل تجربة تعليمية.",

  // Kids features
  kids_feature_1: "مفاهيم وأدوات برمجة مناسبة للأعمار",
  kids_feature_2: "تعلم قائم على الألعاب للحفاظ على التفاعل",
  kids_feature_3: "تنمية التفكير المنطقي ومهارات حل المشكلات",
  kids_feature_4: "مقدمة في البرمجة والروبوتات والإبداع الرقمي",
  kids_feature_5: "مشاريع يمكن للأطفال عرضها للأصدقاء والعائلة",

  // Prodev features
  prodev_feature_1: "مناهج متوافقة مع متطلبات سوق العمل",
  prodev_feature_2: "مشاريع عملية تحاكي سيناريوهات العمل الحقيقية",
  prodev_feature_3: "إرشاد مهني ومساعدة في التوظيف",
  prodev_feature_4: "فرص للتواصل مع محترفي الصناعة",
  prodev_feature_5: "خيارات جدولة مرنة للمهنيين العاملين",

  about_stat_experience: "سنوات من الخبرة في هندسة البرمجيات",
  about_stat_trainers: "المدربون مهندسو برمجيات في شركات تقنية كبرى",

  // New Competitive Programming Training program features
  comp_prog_feature_1: "مدربون شاركوا في نهائيات ACPC وICPC",
  comp_prog_feature_2: "تقنيات متقدمة لحل المشكلات",
  comp_prog_feature_3: "مسابقات تجريبية منتظمة وتحليل شامل",
  comp_prog_feature_4: "توجيه ومتابعة فردية",
  comp_prog_feature_5: "التحضير للمسابقات الوطنية والدولية",

  "Competitive Programming Training": "تدريب البرمجة التنافسية",
  "Intensive training for students aiming to excel in competitive programming. Our coaches have reached ACPC and ICPC finals.": "تدريب مكثف للطلاب الطامحين للتميز في البرمجة التنافسية. مدربونا وصلوا إلى نهائيات ACPC وICPC.",
  "About the Coaches": "عن المدربين",
  "Our coaches have participated in and reached the finals of ACPC and ICPC, bringing world-class experience to our students.": "مدربونا شاركوا في نهائيات ACPC وICPC، ويقدمون خبرة عالمية لطلابنا.",
  "Contact Us to Enroll": "تواصل معنا للتسجيل",

  competitive_programming_description_formal: "برنامج مكثف لإعداد الطلاب للمسابقات البرمجية المحلية والدولية، بإشراف مدربين شاركوا في نهائيات ACPC وICPC.",
  kids_tech_description_formal: "برنامج تعليمي متخصص في التكنولوجيا للأطفال من سن 7 إلى 14 عامًا، يركز على البرمجة والروبوتات والمهارات الرقمية في بيئة تفاعلية وداعمة.",
  professional_development_description_formal: "برامج تدريبية متقدمة للمهنيين الراغبين في تطوير مهاراتهم التقنية أو الانتقال إلى مجالات التكنولوجيا، مع مشاريع عملية وإشراف خبراء.",
  coaches_acpc_icpc_formal: "مدربونا شاركوا في نهائيات ACPC وICPC، ويقدمون خبرة عالمية لطلابنا.",
  academy_name: "Rasikh Academy",

  // Logo (Arabic)
  rasikh_ar: "راسخ",
  academy_ar: "أكاديمية",

  // Course descriptions, levels, durations (Arabic)
  software_engineering_desc_ar: "تعلم مبادئ هندسة البرمجيات، وأنماط التصميم، وأفضل الممارسات.",
  software_engineering_level_ar: "متوسط",
  software_engineering_duration_ar: "12 أسبوعًا",
  web_development_desc_ar: "إتقان تطوير الويب الحديث باستخدام HTML وCSS وJavaScript وأطر العمل الشائعة.",
  web_development_level_ar: "مبتدئ",
  web_development_duration_ar: "8 أسابيع",
  mobile_development_desc_ar: "بناء تطبيقات الجوال الأصلية وعبر المنصات لنظامي iOS وAndroid.",
  mobile_development_level_ar: "متوسط",
  mobile_development_duration_ar: "10 أسابيع",
  kids_programming_desc_ar: "دورات برمجة ممتعة وتفاعلية مصممة خصيصًا للأطفال.",
  kids_programming_level_ar: "مبتدئ",
  kids_programming_duration_ar: "6 أسابيع",
  competitive_programming_desc_ar: "عزز مهاراتك في حل المشكلات واستعد للمسابقات البرمجية.",
  competitive_programming_level_ar: "متقدم",
  competitive_programming_duration_ar: "8 أسابيع",
  arduino_desc_ar: "تعلم الإلكترونيات والبرمجة مع أردوينو لمشاريع تفاعلية.",
  arduino_level_ar: "مبتدئ",
  arduino_duration_ar: "6 أسابيع",

  // Admin section
  admin_dashboard: "لوحة التحكم",
  add_new_course: "إضافة دورة جديدة",
  edit_course: "تعديل الدورة",
  course_title: "عنوان الدورة",
  course_description: "وصف الدورة",
  duration: "المدة",
  level: "المستوى",
  category: "الفئة",
  image_url: "رابط الصورة",
  save: "حفظ",
  cancel: "إلغاء",
  delete: "حذف",
  students: "الطلاب",
  analytics: "التحليلات",
  settings: "الإعدادات",
  beginner: "مبتدئ",
  intermediate: "متوسط",
  advanced: "متقدم",
  professional: "مهني",
  kids: "أطفال",
}

export type Translations = typeof enTranslations
type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof Translations) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Set default language to Arabic
  const [language, setLanguage] = useState<Language>("ar")

  useEffect(() => {
    // Try to load language from localStorage only on mount
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguage(savedLanguage as Language)
    }
    // Set dir attribute on document for RTL support
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: keyof Translations): string => {
    const translations = language === "en" ? enTranslations : arTranslations
    return translations[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function useTranslations() {
  const { t } = useLanguage()
  return t
}
