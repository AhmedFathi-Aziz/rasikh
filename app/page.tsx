import Hero from "@/components/home/hero"
import FeaturedCourses from "@/components/home/featured-courses"
import AboutPreview from "@/components/home/about-preview"
import ContactCTA from "@/components/home/contact-cta"
import CustomizedTraining from "@/components/home/customized-training"
import NewsSection from "@/components/home/news-section"
import BlogSection from '@/components/home/blog-section'

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <Hero />
      <FeaturedCourses />
      <AboutPreview />
      <CustomizedTraining />
      <NewsSection />
      <BlogSection />
      <ContactCTA />
    </div>
  )
}
