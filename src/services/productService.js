import { API_BASE_URL, API_ENDPOINTS } from "../constants/api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(
      `API request failed with status ${response.status}: ${response.statusText}`,
    );
  }

  return response.json();
}

export async function getProducts({
  limit = 12,
  skip = 0,
  sortBy,
  order,
  signal,
} = {}) {
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  if (sortBy) {
    params.set("sortBy", sortBy);
  }

  if (order) {
    params.set("order", order);
  }

  return request(`${API_ENDPOINTS.products}?${params.toString()}`, {
    signal,
  });
}

export async function getProduct(productId, { signal } = {}) {
  return request(API_ENDPOINTS.product(productId), {
    signal,
  });
}

export async function searchProducts(
  query,
  { limit = 12, skip = 0, signal } = {},
) {
  const params = new URLSearchParams({
    q: query,
    limit: String(limit),
    skip: String(skip),
  });

  return request(`${API_ENDPOINTS.searchProducts}?${params.toString()}`, {
    signal,
  });
}

export async function getCategories({ signal } = {}) {
  return request(API_ENDPOINTS.categories, {
    signal,
  });
}

export async function getProductsByCategory(
  category,
  { limit = 12, skip = 0, signal } = {},
) {
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  return request(
    `${API_ENDPOINTS.categoryProducts(category)}?${params.toString()}`,
    {
      signal,
    },
  );
}
