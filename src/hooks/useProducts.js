import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";

export function useProducts({ limit = 12, skip = 0, sortBy, order } = {}) {
  return useQuery({
    queryKey: ["products", { limit, skip, sortBy, order }],
    queryFn: () =>
      getProducts({
        limit,
        skip,
        sortBy,
        order,
      }),
  });
}
