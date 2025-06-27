import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingDisplayProps {
  /** The rating value to display, e.g., 4.5 */
  rating: number;
  /** The total number of stars, defaults to 5 */
  totalStars?: number;
  /** The size of each star icon in pixels, defaults to 20 */
  size?: number;
  /** If true, the component will be interactive, allowing users to select a rating */
  interactive?: boolean;
  /** Callback function that is called when the rating changes in interactive mode */
  onRatingChange?: (newRating: number) => void;
  /** Optional className to apply to the container div */
  className?: string;
}

const StarRatingDisplay: React.FC<StarRatingDisplayProps> = ({
  rating,
  totalStars = 5,
  size = 20,
  interactive = false,
  onRatingChange,
  className,
}) => {
  console.log('StarRatingDisplay loaded');
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayRating = interactive && hoverRating !== null ? hoverRating : rating;

  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null);
    }
  };

  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const starElements = Array.from({ length: totalStars }, (_, i) => {
    const starValue = i + 1;
    let fillPercentage = '0%';
    if (displayRating >= starValue) {
      fillPercentage = '100%';
    } else if (displayRating > i) {
      // This handles the partial star (e.g., 4.5)
      fillPercentage = `${(displayRating - i) * 100}%`;
    }

    return (
      <div
        key={i}
        className={cn("relative", interactive && "cursor-pointer")}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(i)}
        aria-label={interactive ? `Set rating to ${starValue}` : `Rating: ${rating} out of ${totalStars}`}
      >
        {/* Background (empty) star */}
        <Star
          size={size}
          className="text-gray-300"
          fill="currentColor"
        />
        {/* Foreground (filled) star, clipped to the rating */}
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: fillPercentage }}
        >
          <Star
            size={size}
            className="text-yellow-400"
            fill="currentColor"
          />
        </div>
      </div>
    );
  });

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {starElements}
    </div>
  );
};

export default StarRatingDisplay;