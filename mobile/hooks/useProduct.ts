import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/lib/api";
import { Product } from "@/types";

// export const useProduct = (productId: string) => {
//   console.log("📦 Fetching product:", productId);
//   const api = useApi();
//   const result = useQuery<Product>({
//     queryKey: ["product", productId],
//     queryFn: async () => {
//       const { data } = await api.get(`/products/${productId}`);
//       console.log("🧾 PRODUCT RESPONSE:", data);
//       return data;
//     },
//     enabled:!!productId
    
//   })
//   return result;
// }/

export const useProduct = (productId: string) => {
  const api = useApi();

  return useQuery({
    queryKey: ["product", productId],
    enabled: !!productId,
    queryFn: async () => {
      const { data } = await api.get(`/products/${productId}`);

      console.log("🧾 PRODUCT RESPONSE:", data);

      // ✅ IMPORTANT: unwrap product
      return {
        ...data.product,
        totalReviews: data.product.totalRatings ?? 0,
      };
    },
  });
};




