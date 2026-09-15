import { useState } from "react";
import { Link, useParams } from "react-router";
import ProductGallery from "../components/products/ProductGallery";
import { useProduct } from "../hooks/useProduct";
import "./ProductDetailsPage.css";

function ProductDetailsPage() {
  const { productId } = useParams();
  const { data: product, isLoading, isError, error } = useProduct(productId);

  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState("");

  if (isLoading) {
    return (
      <main className="page">
        <section className="product-details-state">
          <p className="page-eyebrow">PRODUCT</p>
          <h1>Loading product...</h1>
          <p>We're retrieving the product details.</p>
        </section>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="page">
        <section className="product-details-state">
          <p className="page-eyebrow">PRODUCT</p>
          <h1>Unable to load product.</h1>
          <p>{error.message}</p>
          <Link className="secondary-button" to="/products">
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
          <p>The requested product could not be found in the catalog.</p>
          <Link className="secondary-button" to="/products">
            Back to products
          </Link>
        </section>
      </main>
    );
  }

  const discountPercentage = Math.round(product.discountPercentage);

  const originalPrice =
    discountPercentage > 0
      ? product.price / (1 - discountPercentage / 100)
      : product.price;

  const isInStock = product.stock > 0;

  function handleDecreaseQuantity() {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
    setCartMessage("");
  }

  function handleIncreaseQuantity() {
    setQuantity((currentQuantity) =>
      Math.min(product.stock, currentQuantity + 1),
    );
    setCartMessage("");
  }

  function handleAddToCart() {
    if (!isInStock) {
      return;
    }

    setCartMessage(
      `${quantity} ${quantity === 1 ? "item" : "items"} ready to add to cart.`,
    );
  }

  return (
    <main className="page">
      <Link className="product-details-back" to="/products">
        ← Back to products
      </Link>

      <section className="product-details">
        <div className="product-details-media">
          <ProductGallery images={product.images} title={product.title} />
        </div>

        <div className="product-details-content">
          <p className="page-eyebrow">{product.category}</p>

          <h1 className="product-details-title">{product.title}</h1>

          {product.brand && (
            <p className="product-details-brand">
              Brand: <strong>{product.brand}</strong>
            </p>
          )}

          <div className="product-details-rating">
            <span className="product-details-rating-value">
              ★ {product.rating.toFixed(1)}
            </span>

            {product.reviews?.length > 0 && (
              <span className="product-details-review-count">
                {product.reviews.length} reviews
              </span>
            )}
          </div>

          <div className="product-details-price">
            <span className="product-details-current-price">
              ${product.price.toFixed(2)}
            </span>

            {discountPercentage > 0 && (
              <>
                <span className="product-details-original-price">
                  ${originalPrice.toFixed(2)}
                </span>

                <span className="product-details-discount">
                  {discountPercentage}% off
                </span>
              </>
            )}
          </div>

          <div
            className={`product-details-stock ${
              isInStock
                ? "product-details-stock-available"
                : "product-details-stock-unavailable"
            }`}
          >
            {isInStock ? `${product.stock} units in stock` : "Out of stock"}
          </div>

          <section className="purchase-controls" aria-label="Purchase options">
            <div className="quantity-section">
              <span className="quantity-label">Quantity</span>

              <div className="quantity-control">
                <button
                  className="quantity-button"
                  type="button"
                  onClick={handleDecreaseQuantity}
                  disabled={!isInStock || quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span
                  className="quantity-value"
                  aria-live="polite"
                  aria-label={`Quantity ${quantity}`}
                >
                  {quantity}
                </span>

                <button
                  className="quantity-button"
                  type="button"
                  onClick={handleIncreaseQuantity}
                  disabled={!isInStock || quantity >= product.stock}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="add-to-cart-button"
              type="button"
              onClick={handleAddToCart}
              disabled={!isInStock}
            >
              {isInStock ? "Add to Cart" : "Out of Stock"}
            </button>

            {cartMessage && (
              <p className="cart-action-message" role="status">
                {cartMessage}
              </p>
            )}
          </section>

          <div className="product-details-description">
            <h2>About this product</h2>
            <p>{product.description}</p>
          </div>

          <div className="product-details-info">
            {product.shippingInformation && (
              <div className="product-details-info-item">
                <span>Shipping</span>
                <strong>{product.shippingInformation}</strong>
              </div>
            )}

            {product.warrantyInformation && (
              <div className="product-details-info-item">
                <span>Warranty</span>
                <strong>{product.warrantyInformation}</strong>
              </div>
            )}

            {product.returnPolicy && (
              <div className="product-details-info-item">
                <span>Returns</span>
                <strong>{product.returnPolicy}</strong>
              </div>
            )}

            {product.minimumOrderQuantity && (
              <div className="product-details-info-item">
                <span>Minimum order</span>
                <strong>{product.minimumOrderQuantity} unit(s)</strong>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetailsPage;
