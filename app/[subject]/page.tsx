import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import { PageWrapper } from "@/components/shared/page-wrapper";
import { StripedDivider } from "@/components/shared/striped-divider";
import { SubjectHeader } from "@/components/shared/subject-header";
import { getSource } from "@/lib/source";
import { formatSubject } from "@/lib/utils";

interface Props {
  params: Promise<{
    subject: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { subject } = await params;
  const source = getSource(subject);

  if (!source) {
    return notFound();
  }

  const allPages = source.getPages();

  const filteredLabs = allPages.filter((page) => {
    const frontmatter = page.data as { draft?: boolean };
    return !frontmatter.draft;
  });

  const labCategories = {
    midtermLabs: filteredLabs.filter((lab) => lab.url.includes("/m-")),
    finalLabs: filteredLabs.filter((lab) => lab.url.includes("/f-")),
  };

  const renderLabs = (labs: typeof filteredLabs) =>
    labs
      .sort((a, b) => {
        const getNumber = (title: string | undefined) => {
          if (!title) return 0;
          const match = title.match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        };
        return getNumber(a.data.title) - getNumber(b.data.title);
      })
      .map((lab) => (
        <React.Fragment key={lab.url}>
          <Link href={lab.url}>{lab.data.title}</Link>
        </React.Fragment>
      ));

  return (
    <PageWrapper>
      <StripedDivider variant="top" />
      <SubjectHeader subject={subject} backHref="/" />
      <StripedDivider variant="middle" className="mt-12" />

      {Object.entries(labCategories).map(([category, labs]) => {
        const hasLabs = filteredLabs.length > 0;

        return labs.length > 0 ? (
          <div key={category} className="mt-10 pb-10">
            <h2 className="text-center text-lg tracking-tighter font-semibold mb-6">
              {category === "midtermLabs" ? "Midterm" : "Final"}
            </h2>
            <div className="text-center grid grid-cols-2 md:grid-cols-3 gap-4">
              {renderLabs(labs)}
            </div>
          </div>
        ) : hasLabs ? null : (
          <div key={category} className="mt-10 pb-10">
            <h2 className="text-center text-lg tracking-tighter font-semibold mb-6">
              {category === "midtermLabs" ? "Midterm" : "Final"}
            </h2>
            <p className="text-center text-red-600">
              No laboratory/case problems found.
            </p>
          </div>
        );
      })}
      <StripedDivider variant="bottom" />
    </PageWrapper>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject } = await params;
  return {
    title: formatSubject(subject),
  };
}
