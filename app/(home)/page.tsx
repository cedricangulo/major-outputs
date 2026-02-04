import { CourseSection } from "@/components/shared/course-section";
import { courseSections } from "@/lib/course-sections";

export default function Home() {
  return (
    <div className="py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courseSections.map((course) => (
          <CourseSection
            key={course.subject}
            subject={course.subject}
            year={`A.Y. ${course.year}`}
            teacher={course.teacher}
            section={course.section}
            laboratoriesLink={course.laboratoriesLink}
            caseStudyLink={course.caseStudyLink}
          />
        ))}
      </div>
    </div>
  );
}
