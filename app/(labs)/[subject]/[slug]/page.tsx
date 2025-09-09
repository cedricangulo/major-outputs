import { MDXContent } from "@content-collections/mdx/react"
import {
  allCc104s,
  allCc105s,
  allIthci01s,
  allItipt01s,
  allItipt02s,
  allItpf01s,
  allItpf02s,
  allItwst01s,
  allItwst02s,
} from "content-collections"
// fumadocs components
import { Callout } from "fumadocs-ui/components/callout"
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock"
import { File, Files, Folder } from "fumadocs-ui/components/files"
import { ImageZoom } from "fumadocs-ui/components/image-zoom"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import { Plus } from "lucide-react"
import { Metadata } from "next"

import React from "react"

import Link from "next/link"
import { notFound } from "next/navigation"

import FileCard from "@/components/shared/file-card"
import ImageContainer from "@/components/shared/image-container"
import { Separator } from "@/components/ui/separator"

type Meta = {
  path: string
}

type Lab = {
  _meta: Meta
  title: string
  mdx: string
}

type SubjectKeys =
  | "itwst01"
  | "itwst02"
  | "itpf01"
  | "itpf02"
  | "cc104"
  | "cc105"
  | "ithci01"
  | "itipt01"
  | "itipt02"

const subjectData: Record<SubjectKeys, Lab[]> = {
  itwst01: allItwst01s,
  itwst02: allItwst02s,
  itpf01: allItpf01s,
  itpf02: allItpf02s,
  cc104: allCc104s,
  cc105: allCc105s,
  ithci01: allIthci01s,
  itipt01: allItipt01s,
  itipt02: allItipt02s,
}

export interface PageProps {
  params: Promise<{
    subject: SubjectKeys
    slug: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { subject, slug } = await params
  const formattedSubject = subject.replace(/(it|cc)/, "$1-")
  const labs = subjectData[subject]
  const labItem = labs.find((lab) => lab._meta.path === slug)

  if (!labItem) {
    return notFound()
  }

  return (
    <div className="relative border">
      <Plus className="absolute -top-[0.77rem] -right-[0.77rem] size-6 text-muted-foreground stroke-1 z-10" />
      <Plus className="absolute -top-[0.77rem] -left-[0.77rem] size-6 text-muted-foreground stroke-1 z-10" />
      <Plus className="absolute -bottom-[0.77rem] -left-[0.77rem] size-6 text-muted-foreground stroke-1 z-10" />
      <Plus className="absolute -bottom-[0.77rem] -right-[0.77rem] size-6 text-muted-foreground stroke-1 z-10" />
      <div className="h-8 md:h-10 w-full mb-4 col-start-2 row-span-5 row-start-1 border-b bg-[image:repeating-linear-gradient(315deg,_var(--border)_0,_var(--border)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed" />
      <Link
        href={`/${subject}`}
        className="mx-auto block w-fit"
      >
        &larr; back
      </Link>
      <div className="mx-auto text-center mt-16 pb-12">
        <h2 className="text-2xl tracking-tighter font-semibold">
          {formattedSubject.toUpperCase()}
        </h2>
        <h4 className="tracking-tighter font-semibold mt-0">{labItem.title}</h4>
      </div>
      <div className="h-8 md:h-10 w-full mb-4 mt-12 col-start-2 row-span-5 row-start-1 border-y bg-[image:repeating-linear-gradient(315deg,_var(--border)_0,_var(--border)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed" />
      <div className="px-2 md:px-4">
        <MDXContent
          code={labItem.mdx}
          components={{
            ImageContainer,
            Callout,
            FileCard,
            File,
            Folder,
            Files,
            Tab,
            Tabs,
            pre: (props) => (
              <CodeBlock {...props}>
                <Pre>{props.children}</Pre>
              </CodeBlock>
            ),
            Image: (props) => (
              <ImageZoom
                {...props}
                className="w-full block mx-auto mt-4 rounded-lg"
              />
            ),
            hr: (props) => (
              <Separator
                {...props}
                className="my-4 bg-transparent border-t border-dashed"
              />
            ),
          }}
        />
      </div>
      <div className="h-8 md:h-10 w-full mt-12 col-start-2 row-span-5 row-start-1 border-t bg-[image:repeating-linear-gradient(315deg,_var(--border)_0,_var(--border)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed" />
    </div>
  )
}

export const generateStaticParams = async () => {
  const params = []
  for (const subject in subjectData) {
    const labs = subjectData[subject as SubjectKeys]
    const slugs = labs.map((lab) => ({ subject, slug: lab._meta.path }))
    params.push(...slugs)
  }
  return params
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { subject, slug } = await params
  const formattedSubject = subject.replace(/(it|cc)/, "$1-")
  const labs = subjectData[subject]
  const page = labs.find((lab) => lab._meta.path === slug)

  return {
    title: `${formattedSubject.toUpperCase()} | ${page?.title}`,
  }
}
