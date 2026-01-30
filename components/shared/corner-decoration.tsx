import { Plus } from "lucide-react";
import React, { type FC } from "react";

type CornerPosition = "top-right" | "top-left" | "bottom-left" | "bottom-right";

interface CornerDecorationProps {
  position: CornerPosition;
}

const POSITION_CLASSES: Record<CornerPosition, string> = {
  "top-right": "-top-[0.77rem] -right-[0.77rem]",
  "top-left": "-top-[0.77rem] -left-[0.77rem]",
  "bottom-left": "-bottom-[0.77rem] -left-[0.77rem]",
  "bottom-right": "-bottom-[0.77rem] -right-[0.77rem]",
};

const CornerDecoration: FC<CornerDecorationProps> = ({ position }) => {
  return (
    <div className={`absolute ${POSITION_CLASSES[position]} size-6 z-10`}>
      <Plus
        className="size-6 text-muted-foreground stroke-1"
        aria-hidden="true"
      />
    </div>
  );
};

CornerDecoration.displayName = "CornerDecoration";

export { CornerDecoration };
