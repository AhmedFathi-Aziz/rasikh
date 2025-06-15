import { motion } from "framer-motion";
import { Clock, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";

interface Course {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  duration: string | null;
  durationAr: string | null;
  durationEn: string | null;
  level: string;
  category: string;
  image: string;
  createdAt: string;
  topicsAr: string[];
  topicsEn: string[];
}

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const { language } = useLanguage();
  const isRTL = language === "ar";

  return (
    <motion.div
      key={course.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
      className="bg-card rounded-2xl p-0 shadow-lg border border-border/50 hover:shadow-xl transition-all flex flex-col overflow-hidden max-w-sm mx-auto"
    >
      {/* Course Image/Logo */}
      <div className="w-full h-32 bg-muted overflow-hidden rounded-t-2xl">
        <img
          src={course.image || "/images/default-course.jpg"}
          alt={language === "ar" ? course.titleAr : course.titleEn}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-grow flex flex-col p-4">
        <h2 className="text-lg font-semibold mb-2 text-primary/90 text-center">{language === "ar" ? course.titleAr : course.titleEn}</h2>
        <p className="text-muted-foreground text-sm mb-3 text-center">{language === "ar" ? course.descriptionAr : course.descriptionEn}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-muted-foreground gap-2">
            <Clock className="h-5 w-5" />
            <span>{language === "ar" 
              ? course.durationAr || course.duration || "غير محدد"
              : course.durationEn || course.duration || "Not specified"}</span>
          </div>
          <div className="flex items-center text-muted-foreground gap-2">
            <Users className="h-5 w-5" />
            <span>{language === "ar" 
              ? course.category === "professional" ? "مهني" : "أطفال"
              : course.category.charAt(0).toUpperCase() + course.category.slice(1)}</span>
          </div>
          <div className="flex items-center text-muted-foreground gap-2">
            <BookOpen className="h-5 w-5" />
            <span>{language === "ar"
              ? course.level === "advanced" ? "متقدم" 
              : course.level === "intermediate" ? "متوسط"
              : "مبتدئ"
              : course.level.charAt(0).toUpperCase() + course.level.slice(1)}</span>
          </div>
        </div>
        <div className={`flex gap-2 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button asChild className="w-1/2 group mt-auto">
            <Link href={`/courses/${course.id}`}>
              {language === "ar" ? "تفاصيل الكورس" : "Course Details"}
            </Link>
          </Button>
          <Button asChild className="w-1/2 group mt-auto">
            <Link href={`/courses/${course.id}/register`}>
              {language === "ar" ? "سجل الآن" : "Register Now"}
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
} 