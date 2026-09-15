import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { WishlistProvider } from "../WishlistContext";
import { useWishlist } from "../../hooks/useWishlist";

const product = {
  id: 1,
  title: "Test Product",
  price: 50,
  thumbnail: "test-image.jpg",
  rating: 4.5,
  category: "test-category",
};

function WishlistConsumer() {
  const {
    items,
    wishlistItemCount,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
  } = useWishlist();

  return (
    <div>
      <span data-testid="item-count">{wishlistItemCount}</span>
      <span data-testid="items">{JSON.stringify(items)}</span>
      <span data-testid="saved">{String(isInWishlist(1))}</span>

      <button type="button" onClick={() => toggleWishlist(product)}>
        Toggle product
      </button>

      <button type="button" onClick={() => removeFromWishlist(1)}>
        Remove product
      </button>

      <button type="button" onClick={clearWishlist}>
        Clear wishlist
      </button>
    </div>
  );
}

function renderWishlist() {
  return render(
    <WishlistProvider>
      <WishlistConsumer />
    </WishlistProvider>,
  );
}

describe("WishlistContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts empty", () => {
    renderWishlist();

    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
    expect(screen.getByTestId("items")).toHaveTextContent("[]");
    expect(screen.getByTestId("saved")).toHaveTextContent("false");
  });

  it("adds and removes a product through toggle", () => {
    renderWishlist();

    fireEvent.click(screen.getByRole("button", { name: "Toggle product" }));

    expect(screen.getByTestId("item-count")).toHaveTextContent("1");
    expect(screen.getByTestId("saved")).toHaveTextContent("true");
    expect(screen.getByTestId("items")).toHaveTextContent(
      '"title":"Test Product"',
    );

    fireEvent.click(screen.getByRole("button", { name: "Toggle product" }));

    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
    expect(screen.getByTestId("saved")).toHaveTextContent("false");
  });

  it("removes a saved product explicitly", () => {
    renderWishlist();

    fireEvent.click(screen.getByRole("button", { name: "Toggle product" }));

    expect(screen.getByTestId("item-count")).toHaveTextContent("1");

    fireEvent.click(screen.getByRole("button", { name: "Remove product" }));

    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
    expect(screen.getByTestId("items")).toHaveTextContent("[]");
  });

  it("clears all saved products", () => {
    renderWishlist();

    fireEvent.click(screen.getByRole("button", { name: "Toggle product" }));

    expect(screen.getByTestId("item-count")).toHaveTextContent("1");

    fireEvent.click(screen.getByRole("button", { name: "Clear wishlist" }));

    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
    expect(screen.getByTestId("items")).toHaveTextContent("[]");
  });
});
