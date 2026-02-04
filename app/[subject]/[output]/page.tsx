import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageWrapper } from "@/components/shared/page-wrapper";
import { SubjectHeader } from "@/components/shared/subject-header";
import { getSource, validSubjects } from "@/lib/source";
import { formatSubject } from "@/lib/utils";
import { getMDXComponents } from "@/mdx-components";

type Frontmatter = {
  title: string;
  description?: string;
  difficulty?: "easy" | "medium" | "hard";
  files?: number;
};

interface Props {
  params: Promise<{
    subject: string;
    output: string;
  }>;
}
const OutputPage = async ({ params }: Props) => {
  const { subject, output } = await params;
  const source = getSource(subject);

  if (!source) {
    return notFound();
  }

  const page = source.getPage([subject, output]);

  if (!page) {
    return notFound();
  }

  const MDX = page.data.body;
  const frontmatter = page.data as Frontmatter;
  const { description, difficulty, files } = frontmatter;

  return (
    <PageWrapper>
      <SubjectHeader
        subject={subject}
        title={page.data.title}
        backHref={`/${subject}`}
        contentMeta={{
          description,
          difficulty,
          files,
          url: page.url,
        }}
      />

      <article className="prose prose-slate dark:prose-invert max-w-none py-8">
        <MDX components={getMDXComponents()} />
      </article>
    </PageWrapper>
  );
};

OutputPage.displayName = "OutputPage";

export default OutputPage;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject, output } = await params;
  const source = getSource(subject);

  if (!source) {
    return {
      title: "Not Found",
    };
  }

  const page = source.getPage([subject, output]);

  if (!page) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(page.data.title)}&subject=${encodeURIComponent(formatSubject(subject))}`,
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [
        `/api/og?title=${encodeURIComponent(page.data.title)}&subject=${encodeURIComponent(formatSubject(subject))}`,
      ],
    },
  };
}

export const generateStaticParams = async () => {
  const params = [];
  for (const subject of validSubjects) {
    const source = getSource(subject);
    if (source) {
      const pages = source.getPages();
      const slugs = pages.map((page) => ({
        subject,
        output: page.slugs[0],
      }));
      params.push(...slugs);
    }
  }
  return params;
};
