import { ImageZoom } from "fumadocs-ui/components/image-zoom";

interface ImageContainerProps {
  src: string[];
  alt: string[];
  width?: number;
  height?: number;
}

const ImageContainer = ({
  src,
  alt,
  width = 150,
  height = 150,
}: ImageContainerProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {src.map((s, index) => (
        <ImageZoom
          key={index}
          src={s}
          alt={alt[index] || "image"}
          width={width}
          height={height}
          className="rounded-lg w-full"
        />
      ))}
    </div>
  );
};

export { ImageContainer };
