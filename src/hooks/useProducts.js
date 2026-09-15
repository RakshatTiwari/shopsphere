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

    queryFn: () => {
      if (search) {
        return searchProducts(search, {
          limit,
          skip,
        });
      }

      if (category) {
        return getProductsByCategory(category, {
          limit,
          skip,
        });
      }

      return getProducts({
        limit,
        skip,
        sortBy,
        order,
      });
    },

    staleTime: 5 * 60 * 1000,
  });
}
