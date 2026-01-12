type StarRatingProps = {
  rating: number;
  reviewsCount: number;
  isDark: boolean;
  maxStars?: number;
};

function StarRating({
  rating,
  reviewsCount,
  isDark,
  maxStars = 5,
}: StarRatingProps) {
  const filledStars = Math.round(rating);

  return (
    <div
      className="flex items-center gap-3"
      aria-label={`Rating: ${rating} out of ${maxStars}`}
    >
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: maxStars }).map((_, i) => (
          <span
            key={i}
            className={`text-2xl md:text-3xl transition-colors
              ${
                i < filledStars
                  ? "text-amber-400"
                  : isDark
                  ? "text-gray-600"
                  : "text-gray-300"
              }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Review count */}
      <span
        className={`text-sm md:text-base ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        ({reviewsCount} reviews)
      </span>
    </div>
  );
}

export default StarRating;
