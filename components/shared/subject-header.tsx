import Link from "next/link";
import type { FC } from "react";
import { formatSubject } from "@/lib/utils";
import { subjectFullNames } from "./course-section";

interface SubjectHeaderProps {
  subject: string;
  title?: string;
  backHref: string;
}

const SubjectHeader: FC<SubjectHeaderProps> = ({
  subject,
  title,
  backHref,
}) => {
  return (
    <>
      <Link href={backHref} className="mx-auto block w-fit">
        &larr; back
      </Link>

      <div className="mx-auto text-center mt-16 pb-3">
        <h3 className="text-2xl tracking-tighter font-semibold">
          {formatSubject(subject)}
        </h3>
        {title ? (
          <h4 className="tracking-tighter font-semibold mt-0">{title}</h4>
        ) : (
          <h4 className="tracking-tighter font-semibold mt-0">
            {subjectFullNames[formatSubject(subject)]}
          </h4>
        )}
      </div>
    </>
  );
};

SubjectHeader.displayName = "SubjectHeader";

export { SubjectHeader };
