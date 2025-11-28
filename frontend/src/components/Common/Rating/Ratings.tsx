import { useState } from "react";
import Star from "./Star";

interface ratingProps {
  rating: number;
  size?: number;
  mode?: "default" | "input";
  onChange?: (rating: number) => void;
}

export default function Ratings({
  rating,
  size = 24,
  mode = "default",
  onChange,
}: ratingProps) {
  const [hovered, setHovered] = useState<number>(0);
  const displayRating = (mode === "input" && hovered) ? hovered : rating;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, idx: number) => {
        const starValue = idx + 1;
        const fillLevel = Math.min(Math.max(displayRating - idx, 0), 1);
        return (
          <div
            key={idx}
            onClick={() => mode === "input" && onChange?.(starValue)}
            onMouseEnter={() => mode === "input" && setHovered(starValue)}
            onMouseLeave={() => mode === "input" && setHovered(0)}
            className={mode === "input" ? "cursor-pointer" : ""}
          >
            <Star size={size} fillLevel={fillLevel} />
          </div>
        );
      })}
    </div>
  );
}
