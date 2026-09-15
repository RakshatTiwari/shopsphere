import { useMemo, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/products/ProductGrid";
import FilterSidebar from "../components/filters/FilterSidebar";

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const { data, isLoading, isError, error } = useProducts({
    category: selectedCategory,
  });

  const filteredProducts = useMemo(() => {
    if (!data?.products) {
      return [];
    }

    const minimumPrice = minPrice === "" ? null : Number(minPrice);

    const maximumPrice = maxPrice === "" ? null : Number(maxPrice);

    const minimumRating = selectedRating === "" ? null : Number(selectedRating);

    return data.products.filter((product) => {
      const matchesMinimumPrice =
        minimumPrice === null || product.price >= minimumPrice;

      const matchesMaximumPrice =
        maximumPrice === null || product.price <= maximumPrice;

      const matchesRating =
        minimumRating === null || product.rating >= minimumRating;

      return matchesMinimumPrice && matchesMaximumPrice && matchesRating;
    });
  }, [data, minPrice, maxPrice, selectedRating]);

  function handleClearFilters() {
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedRating("");
  }

  const hasActiveFilters =
    selectedCategory !== "" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    selectedRating !== "";

  if (isLoading) {
    return (
      <main className="page">
        <section className="page-header">
          <p className="page-eyebrow">CATALOG</p>

          <h1>Loading products...</h1>

          <p className="page-description">
            We're retrieving the latest products from the catalog.
          </p>
        </section>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="page">
        <section className="page-header">
          <p className="page-eyebrow">CATALOG</p>

          <h1>Unable to load products.</h1>

          <p className="page-description">{error.message}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="catalog-header">
        <div>
          <p className="page-eyebrow">CATALOG</p>

          <h1>Explore products</h1>

          <p className="page-description">
            Discover products across a wide range of categories.
          </p>
        </div>

        <p className="catalog-count">
          {filteredProducts.length} of {data.total} products
        </p>
      </section>

      <div className="catalog-layout">
        <FilterSidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          selectedRating={selectedRating}
          onRatingChange={setSelectedRating}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <div className="catalog-results">
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <section className="empty-results">
              <p className="empty-results-eyebrow">NO MATCHES</p>

              <h2>No products match these filters.</h2>

              <p>Try adjusting your price range or rating requirements.</p>

              <button
                className="primary-button"
                type="button"
                onClick={handleClearFilters}
              >
                Clear filters
              </button>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

export default ProductsPage;
