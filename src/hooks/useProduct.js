import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services/productService";

export function useProduct(productId) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    enabled: Boolean(productId),
    staleTime: 5 * 60 * 1000,
  });
}
