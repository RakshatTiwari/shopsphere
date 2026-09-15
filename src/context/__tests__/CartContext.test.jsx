import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { CartProvider } from "../CartContext";
import { useCart } from "../../hooks/useCart";

const product = {
  id: 1,
  title: "Test Product",
  price: 50,
  thumbnail: "test-image.jpg",
  stock: 5,
};

function CartConsumer() {
  const {
    items,
    cartItemCount,
    cartSubtotal,
    shippingCost,
    taxAmount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <div>
      <span data-testid="item-count">{cartItemCount}</span>
      <span data-testid="items">{JSON.stringify(items)}</span>
      <span data-testid="subtotal">{cartSubtotal}</span>
      <span data-testid="shipping">{shippingCost}</span>
      <span data-testid="tax">{taxAmount}</span>
      <span data-testid="total">{cartTotal}</span>

      <button type="button" onClick={() => addToCart(product, 2)}>
        Add product
      </button>

      <button type="button" onClick={() => addToCart(product, 10)}>
        Add too many
      </button>

      <button type="button" onClick={() => updateQuantity(1, 3)}>
        Update quantity
      </button>

      <button type="button" onClick={() => removeFromCart(1)}>
        Remove product
      </button>

      <button type="button" onClick={clearCart}>
        Clear cart
      </button>
    </div>
  );
}

function renderCart() {
  return render(
    <CartProvider>
      <CartConsumer />
    </CartProvider>,
  );
}

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with an empty cart", () => {
    renderCart();

    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
    expect(screen.getByTestId("items")).toHaveTextContent("[]");
    expect(screen.getByTestId("subtotal")).toHaveTextContent("0");
    expect(screen.getByTestId("shipping")).toHaveTextContent("0");
    expect(screen.getByTestId("tax")).toHaveTextContent("0");
    expect(screen.getByTestId("total")).toHaveTextContent("0");
  });

  it("adds a product with the requested quantity", () => {
    renderCart();

    fireEvent.click(screen.getByRole("button", { name: "Add product" }));

    expect(screen.getByTestId("item-count")).toHaveTextContent("2");
    expect(screen.getByTestId("items")).toHaveTextContent('"quantity":2');
    expect(screen.getByTestId("subtotal")).toHaveTextContent("100");
  });

  it("does not allow quantity to exceed stock", () => {
    renderCart();

    fireEvent.click(screen.getByRole("button", { name: "Add too many" }));

    expect(screen.getByTestId("item-count")).toHaveTextContent("5");
    expect(screen.getByTestId("items")).toHaveTextContent('"quantity":5');
  });

  it("updates and removes cart items", () => {
    renderCart();

    fireEvent.click(screen.getByRole("button", { name: "Add product" }));

    expect(screen.getByTestId("item-count")).toHaveTextContent("2");

    fireEvent.click(screen.getByRole("button", { name: "Update quantity" }));

    expect(screen.getByTestId("item-count")).toHaveTextContent("3");
    expect(screen.getByTestId("items")).toHaveTextContent('"quantity":3');

    fireEvent.click(screen.getByRole("button", { name: "Remove product" }));

    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
    expect(screen.getByTestId("items")).toHaveTextContent("[]");
  });

  it("clears the entire cart", () => {
    renderCart();

    fireEvent.click(screen.getByRole("button", { name: "Add product" }));
    expect(screen.getByTestId("item-count")).toHaveTextContent("2");

    fireEvent.click(screen.getByRole("button", { name: "Clear cart" }));

    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
    expect(screen.getByTestId("items")).toHaveTextContent("[]");
  });
});
