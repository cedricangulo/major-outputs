import { cache } from "react";

import { docs } from "fumadocs-mdx:collections/server";
import { loader, update } from "fumadocs-core/source";

export const validSubjects = [
  "cc104",
  "cc105",
  "ithci01",
  "itipt01",
  "itipt02",
  "itpf01",
  "itpf02",
  "itwst01",
  "itwst02",
  "itwst03",
  "itwst05",
] as const;

export const getSource = cache(function getSource(subject: string) {
  if (!validSubjects.includes(subject as any)) {
    return null;
  }

  const filteredSource = update(docs.toFumadocsSource())
    .files((files) =>
      files.filter((file) => {
        if (file.type === "meta") return true;
        return file.path.startsWith(`${subject}/`);
      }),
    )
    .build();

  const loader_ = loader({
    baseUrl: "/",
    source: filteredSource,
  });

  const pages = loader_.getPages();

  return loader_;
});

export const getModules = cache(function getModules(subject: string) {
  if (!validSubjects.includes(subject as any)) {
    return null;
  }

  const filteredSource = update(docs.toFumadocsSource())
    .files((files) =>
      files.filter((file) => {
        return file.path.startsWith(`${subject}/modules/`);
      }),
    )
    .build();

  const loader_ = loader({
    baseUrl: "/",
    source: filteredSource,
  });

  const pages = loader_.getPages();

  return loader_;
});
