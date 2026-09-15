import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../services/productService";

export function useSearchProducts(searchTerm) {
  const normalizedSearchTerm = searchTerm.trim();

  return useQuery({
    queryKey: ["products", "search", normalizedSearchTerm],
    queryFn: () => searchProducts(normalizedSearchTerm, { limit: 0 }),
    enabled: Boolean(normalizedSearchTerm),
    staleTime: 5 * 60 * 1000,
  });
}
