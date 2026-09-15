import { useParams } from "react-router";

function ProductDetailsPage() {
  const { productId } = useParams();

  return (
    <main className="page">
      <section className="page-header">
        <p className="page-eyebrow">PRODUCT</p>

        <h1>Product details</h1>

        <p className="page-description">Product ID: {productId}</p>
      </section>
    </main>
  );
}

export default ProductDetailsPage;
