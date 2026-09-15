import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "../services/productService";

export function useProducts({
  limit = 0,
  skip = 0,
  sortBy,
  order,
  category = "",
  search = "",
} = {}) {
  return useQuery({
    queryKey: [
      "products",
      {
        limit,
        skip,
        sortBy,
        order,
        category,
        search,
      },
    ],

    queryFn: ({ signal }) => {
      if (search) {
        return searchProducts(search, {
          limit,
          skip,
          signal,
        });
      }

      if (category) {
        return getProductsByCategory(category, {
          limit,
          skip,
          signal,
        });
      }

      return getProducts({
        limit,
        skip,
        sortBy,
        order,
        signal,
      });
    },

    staleTime: 5 * 60 * 1000,
  });
}
