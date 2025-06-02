import Hero from "@/components/home/hero"
import FeaturedCourses from "@/components/home/featured-courses"
import AboutPreview from "@/components/home/about-preview"
import ProgramsHighlight from "@/components/home/programs-highlight"
import ContactCTA from "@/components/home/contact-cta"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <Hero />
      <FeaturedCourses />
      <AboutPreview />
      <ProgramsHighlight />
      <ContactCTA />
    </div>
  )
}
