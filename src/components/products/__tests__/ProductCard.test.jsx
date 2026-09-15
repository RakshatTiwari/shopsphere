import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import ProductCard from "../ProductCard";

const product = {
  id: 1,
  title: "Test Smartphone",
  price: 299.99,
  rating: 4.5,
  discountPercentage: 10,
  thumbnail: "https://example.com/phone.jpg",
  category: "smartphones",
  stock: 12,
};

function renderProductCard() {
  return render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>,
  );
}

describe("ProductCard", () => {
  it("renders the important product information", () => {
    renderProductCard();

    expect(screen.getByText("Test Smartphone")).toBeInTheDocument();
    expect(screen.getByText("smartphones")).toBeInTheDocument();
    expect(screen.getByText("$299.99")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("-10%")).toBeInTheDocument();
    expect(screen.getByText("In stock")).toBeInTheDocument();
  });

  it("links the product to its details page", () => {
    renderProductCard();

    const productLinks = screen.getAllByRole("link", {
      name: /test smartphone/i,
    });

    expect(productLinks[0]).toHaveAttribute("href", "/products/1");
  });

  it("shows the out-of-stock state", () => {
    const outOfStockProduct = {
      ...product,
      stock: 0,
    };

    render(
      <MemoryRouter>
        <ProductCard product={outOfStockProduct} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Out of stock")).toBeInTheDocument();
  });
});
