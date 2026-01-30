import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSubject(subject: string): string {
  return subject.toUpperCase().replace(/^(IT|CC)/, "$1-");
}
