import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Callout } from "fumadocs-ui/components/callout";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import defaultComponents from "fumadocs-ui/mdx";
import { ImageContainer } from "@/components/shared/image-container";
import { FileCard } from "@/components/shared/file-card";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    img: (props) => <ImageZoom {...(props as any)} />,
    Image: (props) => <ImageZoom {...(props as any)} />,
    File,
    FileCard,
    Files,
    Folder,
    Callout,
    ImageContainer,
    Tab,
    Tabs,
    ...components,
  };
}
