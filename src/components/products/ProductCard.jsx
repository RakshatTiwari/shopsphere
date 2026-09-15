import { Link } from "react-router";

function ProductCard({ product }) {
  const {
    id,
    title,
    price,
    rating,
    discountPercentage,
    thumbnail,
    category,
    stock,
  } = product;

  const discount = Math.round(discountPercentage);

  return (
    <article className="product-card">
      <Link
        className="product-card-image-link"
        to={`/products/${id}`}
        aria-label={`View details for ${title}`}
      >
        <div className="product-card-image-wrapper">
          <img
            className="product-card-image"
            src={thumbnail}
            alt={title}
            loading="lazy"
          />

          {discount > 0 && (
            <span className="product-discount">-{discount}%</span>
          )}
        </div>
      </Link>

      <div className="product-card-content">
        <p className="product-category">{category}</p>

        <Link className="product-title" to={`/products/${id}`}>
          {title}
        </Link>

        <div className="product-rating" aria-label={`Rated ${rating} out of 5`}>
          <span aria-hidden="true">★</span>
          <span>{rating.toFixed(1)}</span>
        </div>

        <div className="product-card-footer">
          <span className="product-price">${price.toFixed(2)}</span>

          <span
            className={
              stock > 0
                ? "product-stock in-stock"
                : "product-stock out-of-stock"
            }
          >
            {stock > 0 ? "In stock" : "Out of stock"}
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
