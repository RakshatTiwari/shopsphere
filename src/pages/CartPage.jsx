import { Link } from "react-router";
import { useCart } from "../hooks/useCart";

function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="page">
        <section className="cart-empty">
          <p className="page-eyebrow">YOUR CART</p>
          <h1>Your cart is empty.</h1>
          <p>Add products from the catalog and they will appear here.</p>

          <Link className="primary-button" to="/products">
            Continue shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="cart-page-header">
        <div>
          <p className="page-eyebrow">YOUR CART</p>
          <h1>Shopping cart</h1>
          <p className="page-description">
            Review the products you've selected before continuing.
          </p>
        </div>

        <Link className="cart-continue-link" to="/products">
          ← Continue shopping
        </Link>
      </section>

      <section className="cart-layout" aria-label="Shopping cart">
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <Link
                className="cart-item-image-link"
                to={`/products/${item.id}`}
                aria-label={`View ${item.title}`}
              >
                <div className="cart-item-image-wrapper">
                  <img
                    className="cart-item-image"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                </div>
              </Link>

              <div className="cart-item-content">
                <div className="cart-item-main">
                  <Link className="cart-item-title" to={`/products/${item.id}`}>
                    {item.title}
                  </Link>

                  <p className="cart-item-price">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                <div className="cart-item-actions">
                  <div className="cart-quantity-control">
                    <button
                      className="cart-quantity-button"
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      −
                    </button>

                    <span
                      className="cart-quantity-value"
                      aria-label={`Quantity ${item.quantity}`}
                    >
                      {item.quantity}
                    </span>

                    <button
                      className="cart-quantity-button"
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="cart-remove-button"
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <p className="cart-summary-eyebrow">ORDER</p>
          <h2>Order summary</h2>

          <p className="cart-summary-placeholder">
            Cart totals will be calculated here.
          </p>
        </aside>
      </section>
    </main>
  );
}

export default CartPage;
