import CategoryFilter from "./CategoryFilter";

function FilterSidebar({ selectedCategory, onCategoryChange }) {
  return (
    <aside className="filter-sidebar" aria-label="Product filters">
      <div className="filter-header">
        <h2>Filters</h2>

        {selectedCategory && (
          <button
            className="filter-reset"
            type="button"
            onClick={() => onCategoryChange("")}
          >
            Clear
          </button>
        )}
      </div>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    </aside>
  );
}

export default FilterSidebar;
