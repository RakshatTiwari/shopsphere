import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";

function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  selectedRating,
  onRatingChange,
  onClearFilters,
  hasActiveFilters,
}) {
  return (
    <aside className="filter-sidebar" aria-label="Product filters">
      <div className="filter-header">
        <h2>Filters</h2>

        {hasActiveFilters && (
          <button
            className="filter-reset"
            type="button"
            onClick={onClearFilters}
          >
            Clear
          </button>
        )}
      </div>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />

      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={onMinPriceChange}
        onMaxPriceChange={onMaxPriceChange}
      />

      <RatingFilter
        selectedRating={selectedRating}
        onRatingChange={onRatingChange}
      />
    </aside>
  );
}

export default FilterSidebar;
