import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

const extendedSchema = frontmatterSchema.extend({
  description: z.string().optional(),
  draft: z.boolean().optional(),
  date: z.date().optional(),
});

export const docs = defineDocs({
  dir: "content",
  docs: {
    schema: extendedSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      langs: ["js", "jsx", "ts", "tsx", "php"],
    },
  },
});
