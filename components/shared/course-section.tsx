import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const subjectFullNames: { [key: string]: string } = {
  "IT-WST01": "Web Systems and Technologies 1",
  "IT-WST02": "Web Systems and Technologies 2",
  "IT-WST03": "Web Systems and Technologies 3",
  "IT-WST05": "Web Security",
  "IT-PF01": "Object-Oriented Programming 1",
  "IT-PF02": "Object-Oriented Programming 2",
  "IT-HCI01": "Introduction to Human Computer Interaction",
  "IT-IPT01": "Integrative Programming and Technologies 1",
  "IT-IPT02": "Integrative Programming and Technologies 2",
  "CC-104": "Information Management",
  "CC-105": "Applications Development and Emerging Technologies",
};

interface CourseSectionProps {
  subject: string;
  teacher: string;
  section: string;
  laboratoriesLink: string;
  caseStudyLink?: string;
  year: string;
}

const CourseSection: FC<CourseSectionProps> = ({
  subject,
  teacher,
  section,
  laboratoriesLink,
  caseStudyLink,
  year,
}) => {
  const fullSubjectName = subjectFullNames[subject] || subject;
  return (
    <div className="group border border-accent p-8">
      <h2 className="section-heading">
        {subject}
        <span aria-label="section" className="text-metadata">
          section: {section}
        </span>
      </h2>
      <p aria-label="subject" className="sr-only text-sm m-0 transition-all">
        {fullSubjectName}
      </p>
      <p aria-label="academic year" className="text-metadata m-0">
        {year}
      </p>
      <p aria-label="teacher" className="text-metadata m-0 mb-4">
        {teacher}
      </p>
      {caseStudyLink ? (
        <>
          <Tabs defaultValue="laboratories">
            <ScrollArea>
              <TabsList className="mb-3 bg-transparent">
                <TabsTrigger
                  value="laboratories"
                  className="data-[state=active]:bg-muted data-[state=active]:shadow-none"
                >
                  Lab
                </TabsTrigger>
                <TabsTrigger
                  value="case-study"
                  className="data-[state=active]:bg-muted data-[state=active]:shadow-none"
                >
                  Case Study
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <TabsContent className="m-0" value="laboratories" asChild>
              <Link
                className="text-link"
                href={laboratoriesLink}
                aria-label="View laboratory materials"
              >
                View
                <ArrowRight className="inline size-4" aria-hidden="true" />
              </Link>
            </TabsContent>
            <TabsContent className="m-0" value="case-study" asChild>
              <Link
                href={caseStudyLink}
                target="_blank"
                rel="noreferrer"
                className="text-link"
                aria-label={`Open case study: ${caseStudyLink}`}
              >
                {caseStudyLink}
              </Link>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <Link
          href={laboratoriesLink}
          className="text-link"
          aria-label="View laboratory materials"
        >
          View
          <ArrowRight className="inline size-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
};

export { CourseSection };
