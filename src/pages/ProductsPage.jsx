import { useProducts } from "../hooks/useProducts";

function ProductsPage() {
  const { data, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return (
      <main className="page">
        <section className="page-header">
          <p className="page-eyebrow">CATALOG</p>
          <h1>Loading products...</h1>
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
      <section className="page-header">
        <p className="page-eyebrow">CATALOG</p>

        <h1>Explore products</h1>

        <p className="page-description">
          {data.total} products are available through the catalog API.
        </p>

        <p className="page-description">
          Successfully loaded {data.products.length} products.
        </p>
      </section>
    </main>
  );
}

export default ProductsPage;
