import { useCategories } from "../../hooks/useCategories";

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) {
    return (
      <section className="filter-section">
        <h2 className="filter-title">Category</h2>

        <p className="filter-status">Loading categories...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="filter-section">
        <h2 className="filter-title">Category</h2>

        <p className="filter-status">Unable to load categories.</p>
      </section>
    );
  }

  return (
    <section className="filter-section">
      <h2 className="filter-title">Category</h2>

      <div className="category-options">
        <label className="filter-option">
          <input
            type="radio"
            name="category"
            value=""
            checked={selectedCategory === ""}
            onChange={() => onCategoryChange("")}
          />

          <span>All products</span>
        </label>

        {categories.map((category) => {
          const categorySlug =
            typeof category === "string" ? category : category.slug;

          const categoryName =
            typeof category === "string" ? category : category.name;

          return (
            <label className="filter-option" key={categorySlug}>
              <input
                type="radio"
                name="category"
                value={categorySlug}
                checked={selectedCategory === categorySlug}
                onChange={() => onCategoryChange(categorySlug)}
              />

              <span>{categoryName}</span>
            </label>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryFilter;
