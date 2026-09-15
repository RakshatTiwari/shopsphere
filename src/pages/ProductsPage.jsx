import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/products/ProductGrid";
import FilterSidebar from "../components/filters/FilterSidebar";

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data, isLoading, isError, error } = useProducts({
    category: selectedCategory,
  });

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

        <p className="catalog-count">{data.total} products</p>
      </section>

      <div className="catalog-layout">
        <FilterSidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="catalog-results">
          <ProductGrid products={data.products} />
        </div>
      </div>
    </main>
  );
}

export default ProductsPage;
