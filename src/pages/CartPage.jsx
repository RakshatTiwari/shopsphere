import { Link } from "react-router";
import { useCart } from "../hooks/useCart";

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartItemCount,
    cartSubtotal,
    shippingCost,
    taxAmount,
    cartTotal,
    amountUntilFreeShipping,
    freeShippingThreshold,
  } = useCart();

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
            {cartItemCount} {cartItemCount === 1 ? "item" : "items"} in your
            cart.
          </p>
        </div>

        <Link className="cart-continue-link" to="/products">
          ← Continue shopping
        </Link>
      </section>

      <section className="cart-layout" aria-label="Shopping cart">
        <div className="cart-items">
          {items.map((item) => {
            const lineTotal = item.price * item.quantity;

            return (
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
                    <Link
                      className="cart-item-title"
                      to={`/products/${item.id}`}
                    >
                      {item.title}
                    </Link>

                    <p className="cart-item-price">
                      {formatCurrency(item.price)} each
                    </p>
                  </div>

                  <div className="cart-item-bottom">
                    <div className="cart-item-actions">
                      <div className="cart-quantity-control">
                        <button
                          className="cart-quantity-button"
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
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
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
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

                    <strong className="cart-item-total">
                      {formatCurrency(lineTotal)}
                    </strong>
                  </div>
                </div>
              </article>
            );
          })}

          <button
            className="cart-clear-button"
            type="button"
            onClick={clearCart}
          >
            Clear cart
          </button>
        </div>

        <aside className="cart-summary">
          <p className="cart-summary-eyebrow">ORDER SUMMARY</p>

          <h2>Order summary</h2>

          <div className="cart-summary-lines">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <strong>{formatCurrency(cartSubtotal)}</strong>
            </div>

            <div className="cart-summary-row">
              <span>Shipping</span>

              <strong>
                {shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}
              </strong>
            </div>

            <div className="cart-summary-row">
              <span>Estimated tax</span>
              <strong>{formatCurrency(taxAmount)}</strong>
            </div>
          </div>

          {amountUntilFreeShipping > 0 ? (
            <p className="free-shipping-message">
              Add {formatCurrency(amountUntilFreeShipping)} more to reach free
              shipping on orders over {formatCurrency(freeShippingThreshold)}.
            </p>
          ) : (
            <p className="free-shipping-message free-shipping-active">
              You qualify for free shipping.
            </p>
          )}

          <div className="cart-summary-total">
            <span>Total</span>
            <strong>{formatCurrency(cartTotal)}</strong>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default CartPage;
