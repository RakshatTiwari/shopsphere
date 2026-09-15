const RATING_OPTIONS = [
  {
    value: "",
    label: "Any rating",
  },
  {
    value: "4",
    label: "4.0+",
  },
  {
    value: "3",
    label: "3.0+",
  },
  {
    value: "2",
    label: "2.0+",
  },
];

function RatingFilter({ selectedRating, onRatingChange }) {
  return (
    <section className="filter-section">
      <h2 className="filter-title">Rating</h2>

      <div className="rating-options">
        {RATING_OPTIONS.map((option) => (
          <label className="filter-option" key={option.value || "any"}>
            <input
              type="radio"
              name="rating"
              value={option.value}
              checked={selectedRating === option.value}
              onChange={() => onRatingChange(option.value)}
            />

            <span>
              {option.value ? "★ " : ""}
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}

export default RatingFilter;
