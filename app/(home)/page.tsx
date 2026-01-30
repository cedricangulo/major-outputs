import { CornerDecoration } from "@/components/shared/corner-decoration";
import { CourseSection } from "@/components/shared/course-section";
import { courseSections } from "@/lib/course-sections";

export default function Home() {
  const CORNER_POSITIONS = [
    "top-right",
    "top-left",
    "bottom-left",
    "bottom-right",
  ] as const;

  return (
    <div className="relative">
      {CORNER_POSITIONS.map((position) => (
        <CornerDecoration key={position} position={position} />
      ))}
      <div className="grid grid-cols-1 gap-0 border md:grid-cols-2 lg:grid-cols-3 divide-x divide-accent">
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
