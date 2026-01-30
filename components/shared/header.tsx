import Link from "next/link";

import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <header className="container mx-auto max-w-4xl p-4">
      <div className="flex items-center gap-2 font-mono font-medium w-fit mx-auto">
        <Link className="flex items-center gap-2" href="/">
          cedric
        </Link>{" "}
        <span className="text-muted-foreground">|</span>
        <Link
          href="https://github.com/cedricangulo"
          target="_blank"
          rel="noreferrer"
        >
          github
        </Link>
        <span className="text-muted-foreground">|</span>{" "}
        <Link
          href="https://cedricangulo.is-a.dev"
          target="_blank"
          rel="noreferrer"
        >
          portfolio
        </Link>
        <span className="text-muted-foreground">|</span>{" "}
        <Link href="https://bento.me/cedricc" target="_blank" rel="noreferrer">
          bento
        </Link>
        <span className="text-muted-foreground">|</span> <ModeToggle />
      </div>
    </header>
  );
}
