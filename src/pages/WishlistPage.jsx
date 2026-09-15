import { Link } from "react-router";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";
import { useFeedback } from "../hooks/useFeedback";

function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showFeedback } = useFeedback();

  function handleRemove(item) {
    removeFromWishlist(item.id);
    showFeedback("Removed from wishlist.", "info");
  }

  function handleClearWishlist() {
    clearWishlist();
    showFeedback("Wishlist cleared.", "info");
  }

  function handleAddToCart(item) {
    if (item.stock <= 0) {
      showFeedback("This product is currently out of stock.", "error");
      return;
    }

    addToCart(item, 1);
    showFeedback("Added to cart.", "success");
  }

  if (items.length === 0) {
    return (
      <main className="page">
        <section className="wishlist-empty">
          <p className="page-eyebrow">WISHLIST</p>

          <h1>Your wishlist is empty.</h1>

          <p>
            Save products you like and come back to them whenever you're ready.
          </p>

          <Link className="primary-button" to="/products">
            Explore products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="wishlist-page-header">
        <div>
          <p className="page-eyebrow">WISHLIST</p>

          <h1>Saved products</h1>

          <p className="page-description">
            {items.length} {items.length === 1 ? "product" : "products"} saved
            for later.
          </p>
        </div>

        <button
          className="wishlist-clear-button"
          type="button"
          onClick={handleClearWishlist}
        >
          Clear wishlist
        </button>
      </section>

      <section className="wishlist-grid" aria-label="Saved products">
        {items.map((item) => (
          <article className="wishlist-card" key={item.id}>
            <Link
              className="wishlist-card-image-link"
              to={`/products/${item.id}`}
            >
              <div className="wishlist-card-image-wrapper">
                <img
                  className="wishlist-card-image"
                  src={item.thumbnail}
                  alt={item.title}
                />
              </div>
            </Link>

            <div className="wishlist-card-content">
              <p className="wishlist-card-category">{item.category}</p>

              <Link className="wishlist-card-title" to={`/products/${item.id}`}>
                {item.title}
              </Link>

              <div className="wishlist-card-meta">
                <strong>${item.price.toFixed(2)}</strong>

                <span>★ {item.rating.toFixed(1)}</span>
              </div>

              <div className="wishlist-card-actions">
                <Link
                  className="wishlist-view-button"
                  to={`/products/${item.id}`}
                >
                  View product
                </Link>

                <button
                  className="wishlist-view-button"
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  disabled={item.stock <= 0}
                >
                  {item.stock <= 0 ? "Out of stock" : "Add to cart"}
                </button>

                <button
                  className="wishlist-remove-button"
                  type="button"
                  onClick={() => handleRemove(item)}
                  aria-label={`Remove ${item.title} from wishlist`}
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default WishlistPage;
