import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageWrapper } from "@/components/shared/page-wrapper";
import { StripedDivider } from "@/components/shared/striped-divider";
import { SubjectHeader } from "@/components/shared/subject-header";
import { getSource, validSubjects } from "@/lib/source";
import { formatSubject } from "@/lib/utils";
import { getMDXComponents } from "@/mdx-components";

interface Props {
  params: Promise<{
    subject: string;
    output: string;
  }>;
}

export default async function Page({ params }: Props) {
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

  return (
    <PageWrapper>
      <StripedDivider variant="top" />
      <SubjectHeader
        subject={subject}
        title={page.data.title}
        backHref={`/${subject}`}
      />
      <StripedDivider variant="middle" className="mt-12" />

      <article className="prose prose-slate dark:prose-invert max-w-none px-2 md:px-4 mb-8">
        <MDX components={getMDXComponents()} />
      </article>

      <StripedDivider variant="bottom" />
    </PageWrapper>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject, output } = await params;
  const source = getSource(subject);

  if (!source) {
    return {
      title: "Not Found",
    };
  }

  const page = source.getPage([output]);

  if (!page) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: page.data.title,
    description: page.data.description,
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
