export const API_BASE_URL = "https://dummyjson.com";

export const API_ENDPOINTS = {
  products: "/products",
  product: (productId) => `/products/${productId}`,
  searchProducts: "/products/search",
  categories: "/products/categories",
  categoryProducts: (category) => `/products/category/${category}`,
};
