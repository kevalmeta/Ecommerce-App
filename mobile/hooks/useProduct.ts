import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/lib/api";
import { Product } from "@/types";

export const useProduct = (productId: string) => {
  const api = useApi();

  return useQuery({
    queryKey: ["product", productId],
    enabled: !!productId,
    queryFn: async () => {
      const { data } = await api.get(`/products/${productId}`);
      // ✅ IMPORTANT: unwrap product
      return {
        ...data.product,
        totalReviews: data.product.totalRatings ?? 0,
      };
    },
  });
};




