import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// App router includes @vercel/og.
// No need to install it.

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const hasSubject = searchParams.has("subject");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";
    const subject = hasSubject
      ? searchParams.get("subject")?.slice(0, 100)
      : "Subject";

    // Load custom fonts
    const geistSansData = await readFile(
      join(process.cwd(), "public/fonts/GeistVF.ttf"),
    );
    const geistMonoData = await readFile(
      join(process.cwd(), "public/fonts/GeistMonoVF.ttf"),
    );

    return new ImageResponse(
      <div tw="relative flex h-full w-full items-center justify-center flex-col bg-white">
        <div tw="text-7xl">{title}</div>
        <div tw="text-3xl text-neutral-500">{subject}</div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Geist",
            data: geistSansData,
            style: "normal",
            // weight: 900,
          },
          {
            name: "Geist Mono",
            data: geistMonoData,
            style: "normal",
            // weight: 400,
          },
        ],
      },
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(`${e.message}`);
    } else {
      console.log(String(e));
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
