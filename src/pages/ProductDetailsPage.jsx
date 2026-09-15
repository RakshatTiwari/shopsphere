import { useParams } from "react-router";
import { Link } from "react-router";
import { useProduct } from "../hooks/useProduct";
import "./ProductDetailsPage.css";

function ProductDetailsPage() {
  const { productId } = useParams();

  const { data: product, isLoading, isError, error } = useProduct(productId);

  if (isLoading) {
    return (
      <main className="page">
        <section className="product-details-state">
          <p className="page-eyebrow">PRODUCT</p>
          <h1>Loading product...</h1>
          <p>We're retrieving the product information. Please wait a moment.</p>
        </section>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="page">
        <section className="product-details-state product-details-error">
          <p className="page-eyebrow">PRODUCT</p>

          <h1>Unable to load product.</h1>

          <p>
            {error?.message ||
              "Something went wrong while retrieving this product."}
          </p>

          <Link className="primary-button" to="/products">
            Back to products
          </Link>
        </section>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="page">
        <section className="product-details-state">
          <p className="page-eyebrow">PRODUCT</p>

          <h1>Product not found.</h1>

          <p>We couldn't find a product matching the requested product ID.</p>

          <Link className="primary-button" to="/products">
            Back to products
          </Link>
        </section>
      </main>
    );
  }

  const {
    title,
    description,
    category,
    brand,
    price,
    discountPercentage,
    rating,
    reviews,
    stock,
    availabilityStatus,
    shippingInformation,
    warrantyInformation,
    thumbnail,
  } = product;

  const discount = Math.round(discountPercentage || 0);

  const originalPrice =
    discount > 0 ? price / (1 - discountPercentage / 100) : price;

  const reviewCount = Array.isArray(reviews) ? reviews.length : 0;

  return (
    <main className="page">
      <div className="product-details-breadcrumb">
        <Link to="/products">Products</Link>
        <span aria-hidden="true">/</span>
        <span>{title}</span>
      </div>

      <section className="product-details">
        <div className="product-details-image-section">
          <div className="product-details-image-wrapper">
            {discount > 0 && (
              <span className="product-details-discount">-{discount}%</span>
            )}

            <img
              className="product-details-image"
              src={thumbnail}
              alt={title}
            />
          </div>
        </div>

        <div className="product-details-content">
          <p className="product-details-category">{category}</p>

          <h1 className="product-details-title">{title}</h1>

          {brand && (
            <p className="product-details-brand">
              Brand: <strong>{brand}</strong>
            </p>
          )}

          <div
            className="product-details-rating"
            aria-label={`Rated ${rating} out of 5`}
          >
            <span aria-hidden="true">★</span>
            <strong>{rating.toFixed(1)}</strong>

            {reviewCount > 0 && (
              <span>
                {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
              </span>
            )}
          </div>

          <div className="product-details-price-block">
            <span className="product-details-price">${price.toFixed(2)}</span>

            {discount > 0 && (
              <span className="product-details-original-price">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div
            className={
              stock > 0
                ? "product-details-stock in-stock"
                : "product-details-stock out-of-stock"
            }
          >
            {stock > 0 ? `${stock} units in stock` : "Out of stock"}
          </div>

          {availabilityStatus && (
            <p className="product-details-availability">{availabilityStatus}</p>
          )}

          <div className="product-details-divider" />

          <section className="product-details-section">
            <h2>Description</h2>
            <p>{description}</p>
          </section>

          <section className="product-details-information">
            {shippingInformation && (
              <div className="product-information-item">
                <span className="product-information-label">Shipping</span>
                <span>{shippingInformation}</span>
              </div>
            )}

            {warrantyInformation && (
              <div className="product-information-item">
                <span className="product-information-label">Warranty</span>
                <span>{warrantyInformation}</span>
              </div>
            )}
          </section>

          <Link className="product-details-back-link" to="/products">
            ← Continue shopping
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ProductDetailsPage;
