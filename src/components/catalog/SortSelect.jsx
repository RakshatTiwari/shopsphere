const SORT_OPTIONS = [
  {
    value: "relevance",
    label: "Relevance",
  },
  {
    value: "price-low",
    label: "Price: Low to High",
  },
  {
    value: "price-high",
    label: "Price: High to Low",
  },
  {
    value: "rating",
    label: "Rating",
  },
];

function SortSelect({ sortBy, onSortChange }) {
  return (
    <label className="sort-control">
      <span>Sort by</span>

      <select
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
        aria-label="Sort products"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default SortSelect;
