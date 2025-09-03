import { Plus } from "lucide-react"

import CourseSection from "@/components/shared/course-section"
import { courseSections } from "@/lib/course-sections"

export default function Home() {
  return (
    <div className="relative grid md:grid-cols-2 lg:grid-cols-3 border p-4">
      <Plus className="absolute -top-[0.77rem] -right-[0.77rem] size-6 text-muted-foreground stroke-1 z-10" />
      <Plus className="absolute -top-[0.77rem] -left-[0.77rem] size-6 text-muted-foreground stroke-1 z-10" />
      <Plus className="absolute -bottom-[0.77rem] -left-[0.77rem] size-6 text-muted-foreground stroke-1 z-10" />
      <Plus className="absolute -bottom-[0.77rem] -right-[0.77rem] size-6 text-muted-foreground stroke-1 z-10" />
      {courseSections.map((course) => (
        <CourseSection
          key={course.subject}
          subject={course.subject}
          year={`A.Y. ${course.year}`}
          teacher={course.teacher}
          section={course.section}
          laboratoriesLink={course.laboratoriesLink}
          caseStudyLink={course.caseStudyLink}
          className={course.className}
        />
      ))}
    </div>
  )
}
