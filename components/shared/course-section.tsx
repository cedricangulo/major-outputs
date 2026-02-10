import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "next-view-transitions";
import type { FC } from "react";
import * as React from "react";

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
    <article className="group border rounded-lg p-6 bg-card transition-colors hover:border-muted-foreground/30">
      <header className="mb-4">
        <h2
          className="text-lg font-semibold tracking-tight mb-1"
          title={fullSubjectName}
        >
          {subject}
        </h2>
        <p className="sr-only">{fullSubjectName}</p>
        <div className="space-y-0.5">
          <p className="text-sm text-muted-foreground">{year}</p>
          <p className="text-sm text-muted-foreground">{teacher}</p>
          <p className="text-sm text-muted-foreground font-mono">
            Section {section}
          </p>
        </div>
      </header>

      {caseStudyLink ? (
        <Tabs defaultValue="laboratories" className="w-full">
          <ScrollArea className="w-full">
            <TabsList className="h-8 bg-muted/50 p-1 mb-3">
              <TabsTrigger
                value="laboratories"
                className="text-xs h-6 px-3 data-[state=active]:bg-background data-[state=active]:shadow-none"
              >
                Labs
              </TabsTrigger>
              <TabsTrigger
                value="case-study"
                className="text-xs h-6 px-3 data-[state=active]:bg-background data-[state=active]:shadow-none"
              >
                Case Study
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <TabsContent value="laboratories" className="mt-0">
            <Link
              href={laboratoriesLink}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
              aria-label={`View laboratory materials for ${subject}`}
            >
              View materials
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </TabsContent>

          <TabsContent value="case-study" className="mt-0">
            <Link
              href={caseStudyLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded max-w-full truncate"
              aria-label={`Open case study for ${subject} (opens in new tab)`}
            >
              <span className="truncate">{caseStudyLink}</span>
              <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
            </Link>
          </TabsContent>
        </Tabs>
      ) : (
        <Link
          href={laboratoriesLink}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          aria-label={`View laboratory materials for ${subject}`}
        >
          View materials
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      )}
    </article>
  );
};

const MemoizedCourseSection = React.memo(CourseSection);
MemoizedCourseSection.displayName = "CourseSection";

export { CourseSection, MemoizedCourseSection as default };
