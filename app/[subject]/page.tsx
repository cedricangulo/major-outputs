import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { subjectFullNames } from "@/components/shared/course-section";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { SubjectHeader } from "@/components/shared/subject-header";
import { getSource } from "@/lib/source";
import { formatSubject } from "@/lib/utils";

// Dynamically import LabCard to reduce initial bundle size
const LabCard = dynamic(
  () =>
    import("@/components/shared/lab-card").then((mod) => ({
      default: mod.LabCard,
    })),
  {
    loading: () => (
      <div className="block p-4 border rounded-lg bg-card animate-pulse">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-32"></div>
          </div>
          <div className="w-4 h-4 bg-muted rounded"></div>
        </div>
        <div className="mt-2 h-3 bg-muted rounded w-full"></div>
        <div className="mt-1 h-3 bg-muted rounded w-3/4"></div>
      </div>
    ),
  },
);

interface LabFrontmatter {
  title: string;
  draft?: boolean;
  description?: string;
  difficulty?: "easy" | "medium" | "hard";
  files?: number;
}

interface Props {
  params: Promise<{
    subject: string;
  }>;
}

function detectContentType(
  url: string,
): "laboratory" | "exercise" | "case-study" | "default" {
  if (url.includes("lab")) return "laboratory";
  if (url.includes("exercise")) return "exercise";
  if (url.includes("case")) return "case-study";
  return "default";
}

export default async function Page({ params }: Props) {
  const { subject } = await params;
  const source = getSource(subject);

  if (!source) {
    return notFound();
  }

  const allPages = source.getPages();

  const filteredLabs = allPages.filter((page) => {
    const frontmatter = page.data as LabFrontmatter;
    return !frontmatter.draft;
  });

  const labCategories = {
    midtermLabs: filteredLabs.filter((lab) => lab.url.includes("/m-")),
    finalLabs: filteredLabs.filter((lab) => lab.url.includes("/f-")),
  };

  const metadata = {
    midtermCount: labCategories.midtermLabs.length,
    finalCount: labCategories.finalLabs.length,
    totalCount: filteredLabs.length,
  };

  return (
    <PageWrapper>
      <SubjectHeader subject={subject} backHref="/" metadata={metadata} />

      <main className="py-12">
        {Object.entries(labCategories).map(([category, labs]) => {
          const hasLabs = filteredLabs.length > 0;

          if (labs.length === 0 && hasLabs) return null;

          const sortedLabs = labs.sort((a, b) => {
            const getNumber = (title: string | undefined) => {
              if (!title) return 0;
              const match = title.match(/\d+/);
              return match ? parseInt(match[0], 10) : 0;
            };
            return getNumber(a.data.title) - getNumber(b.data.title);
          });

          return (
            <section key={category} className="mb-12 last:mb-0">
              <h2 className="text-lg font-semibold tracking-tight mb-6">
                {category === "midtermLabs" ? "Midterms" : "Finals"}
              </h2>
              {sortedLabs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sortedLabs.map((lab) => {
                    const frontmatter = lab.data as LabFrontmatter;
                    return (
                      <LabCard
                        key={lab.url}
                        title={frontmatter.title}
                        href={lab.url}
                        description={frontmatter.description}
                        difficulty={frontmatter.difficulty}
                        contentType={detectContentType(lab.url)}
                        fileCount={frontmatter.files}
                        category={
                          category === "midtermLabs" ? "midterm" : "final"
                        }
                      />
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No laboratory/case problems found.
                </p>
              )}
            </section>
          );
        })}
      </main>
    </PageWrapper>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject } = await params;
  const title = formatSubject(subject);

  return {
    title,
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}&subject=${encodeURIComponent(subjectFullNames[formatSubject(subject)])}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [
        `/api/og?title=${encodeURIComponent(title)}&subject=${encodeURIComponent(subjectFullNames[formatSubject(subject)])}`,
      ],
    },
  };
}
