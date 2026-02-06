import { Link } from "next-view-transitions";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";

const navLinks = [
  { href: "https://github.com/cedricangulo", label: "github" },
  { href: "https://cdrcangulo.is-a.dev", label: "portfolio" },
  { href: "https://bento.me/cedricc", label: "bento" },
];

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto max-w-5xl px-4 py-4">
        <nav
          className="flex items-center justify-between"
          aria-label="Main navigation"
        >
          <Button asChild variant="ghost" size="sm">
            <Link
              href="/"
              className="text-base font-medium tracking-tight hover:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Home"
            >
              cedric
            </Link>
          </Button>

          <ul className="flex items-center gap-2 list-none">
            {navLinks.map((link) => (
              <li key={link.href} role="none">
                <Button asChild variant="ghost" size="sm">
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    role="menuitem"
                  >
                    {link.label}
                  </Link>
                </Button>
              </li>
            ))}
            <li role="none">
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
