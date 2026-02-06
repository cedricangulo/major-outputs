import { File } from "lucide-react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import React from "react";

function FileCard({
  fileName,
  image,
  filePath,
}: {
  fileName: string;
  image: string;
  filePath: string;
}) {
  return (
    <div className="border flex max-w-80 max-h-14 my-4 rounded-lg overflow-hidden">
      <div className="border-r grid place-items-center">
        {image ? (
          <Image
            src={image}
            alt={fileName}
            width={56}
            height={56}
            className="bg-cover min-w-14"
          />
        ) : (
          <File className="size-6 m-4" />
        )}
      </div>
      <div className="p-2 overflow-hidden truncate">
        <Link href={filePath} target="_blank" rel="noopener noreferrer">
          {fileName}
        </Link>
        <p className="text-xs mt-0">PDF</p>
      </div>
    </div>
  );
}

export { FileCard };
