import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/products/ProductGrid";
import FilterSidebar from "../components/filters/FilterSidebar";
import SortSelect from "../components/catalog/SortSelect";
import Pagination from "../components/catalog/Pagination";

const PRODUCTS_PER_PAGE = 12;

function ProductsPage() {
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("search")?.trim() || "";

  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, refetch, isFetching } = useProducts({
    category: selectedCategory,
    search: searchTerm,
  });

  const products = useMemo(() => data?.products ?? [], [data]);

  const filteredAndSortedProducts = useMemo(() => {
    const minimumPrice = minPrice === "" ? null : Number(minPrice);
    const maximumPrice = maxPrice === "" ? null : Number(maxPrice);
    const minimumRating = selectedRating === "" ? null : Number(selectedRating);

    const filteredProducts = products.filter((product) => {
      const matchesCategory =
        searchTerm !== ""
          ? selectedCategory === "" || product.category === selectedCategory
          : true;

      const matchesMinimumPrice =
        minimumPrice === null || product.price >= minimumPrice;

      const matchesMaximumPrice =
        maximumPrice === null || product.price <= maximumPrice;

      const matchesRating =
        minimumRating === null || product.rating >= minimumRating;

      return (
        matchesCategory &&
        matchesMinimumPrice &&
        matchesMaximumPrice &&
        matchesRating
      );
    });

    return [...filteredProducts].sort((productA, productB) => {
      switch (sortBy) {
        case "price-low":
          return productA.price - productB.price;

        case "price-high":
          return productB.price - productA.price;

        case "rating":
          return productB.rating - productA.rating;

        case "relevance":
        default:
          return productA.id - productB.id;
      }
    });
  }, [
    products,
    searchTerm,
    selectedCategory,
    minPrice,
    maxPrice,
    selectedRating,
    sortBy,
  ]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / PRODUCTS_PER_PAGE,
  );

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;

    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }, [filteredAndSortedProducts, currentPage]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
    setCurrentPage(1);
  }

  function handleMinPriceChange(value) {
    setMinPrice(value);
    setCurrentPage(1);
  }

  function handleMaxPriceChange(value) {
    setMaxPrice(value);
    setCurrentPage(1);
  }

  function handleRatingChange(rating) {
    setSelectedRating(rating);
    setCurrentPage(1);
  }

  function handleSortChange(sort) {
    setSortBy(sort);
    setCurrentPage(1);
  }

  function handleClearFilters() {
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedRating("");
    setSortBy("relevance");
    setCurrentPage(1);
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
          <p className="page-eyebrow">
            {searchTerm ? "SEARCH RESULTS" : "CATALOG"}
          </p>

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
        <section className="product-details-state">
          <p className="page-eyebrow">
            {searchTerm ? "SEARCH RESULTS" : "CATALOG"}
          </p>

          <h1>Unable to load products.</h1>

          <p className="page-description">
            We couldn't retrieve the catalog right now. Please try again.
          </p>

          <button
            className="primary-button"
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? "Trying again..." : "Try again"}
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="catalog-header">
        <div>
          <p className="page-eyebrow">
            {searchTerm ? "SEARCH RESULTS" : "CATALOG"}
          </p>

          <h1>
            {searchTerm ? `Results for "${searchTerm}"` : "Explore products"}
          </h1>

          <p className="page-description">
            {searchTerm
              ? `Products matching your search for "${searchTerm}".`
              : "Discover products across a wide range of categories."}
          </p>
        </div>

        <p className="catalog-count">
          {filteredAndSortedProducts.length} of {data.total} products
        </p>
      </section>

      <div className="catalog-layout">
        <FilterSidebar
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
          selectedRating={selectedRating}
          onRatingChange={handleRatingChange}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <div className="catalog-results">
          <div className="catalog-toolbar">
            <p className="results-summary">
              Showing{" "}
              {filteredAndSortedProducts.length === 0
                ? 0
                : (currentPage - 1) * PRODUCTS_PER_PAGE + 1}
              –
              {Math.min(
                currentPage * PRODUCTS_PER_PAGE,
                filteredAndSortedProducts.length,
              )}{" "}
              of {filteredAndSortedProducts.length}
            </p>

            <SortSelect sortBy={sortBy} onSortChange={handleSortChange} />
          </div>

          {paginatedProducts.length > 0 ? (
            <>
              <ProductGrid products={paginatedProducts} />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <section className="empty-results">
              <p className="empty-results-eyebrow">
                {searchTerm ? "NO MATCHES" : "NO PRODUCTS"}
              </p>

              <h2>
                {searchTerm
                  ? "No products match your search."
                  : "No products match these filters."}
              </h2>

              <p>
                {searchTerm
                  ? "Try a different search term or adjust your filters."
                  : "Try adjusting your filters to see more products."}
              </p>

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
