import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/lib/api";
import { Product } from "@/types";

const useWishlist = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  const {
    data: wishlist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data } = await api.get<{ wishlist: Product[] }>("/wishlist");
      return data.wishlist;
    },
  });

  // const addToWishlistMutation = useMutation({
  //   mutationFn: async (productId: string) => {
  //     const { data } = await api.post<{ wishlist: string[] }>("/wishlist", { productId });
  //     return data.wishlist;
      
  //   },
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
    
  // });

  const addToWishlistMutation = useMutation({
  mutationFn: async (productId: string) => {
    console.log("🔄 Starting wishlist add");
    console.log("📦 Product ID:", productId);
    console.log("🌐 API Base:", api.defaults.baseURL);
    
    try {
      const response = await api.post("/user/wishlist", { productId });
      console.log("✅ Wishlist add SUCCESS");
      console.log("📊 Response:", response.data);
      return response.data.wishlist;
    } catch (error: any) {
      console.log("❌ Wishlist add FAILED");
      console.log("Status:", error?.response?.status);
      console.log("Data:", error?.response?.data);
      console.log("URL:", error?.config?.url);
      throw error;
    }
  },
  onSuccess: (data) => {
    console.log("✅ Mutation success, invalidating queries");
    queryClient.invalidateQueries({ queryKey: ["wishlist"] });
  },
  onError: (error) => {
    console.log("❌ Mutation error:", error);
  }
});

  const removeFromWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await api.delete<{ wishlist: string[] }>(`/wishlist/${productId}`);
      return data.wishlist;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
  });

  const isInWishlist = (productId: string) => {
    return wishlist?.some((product) => product._id === productId) ?? false;
  };

  const toggleWishlist = (productId: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlistMutation.mutate(productId);
    } else {
      addToWishlistMutation.mutate(productId);
    }
  };

  return {
    wishlist: wishlist || [],
    isLoading,
    isError,
    wishlistCount: wishlist?.length || 0,
    isInWishlist,
    toggleWishlist,
    addToWishlist: addToWishlistMutation.mutate,
    removeFromWishlist: removeFromWishlistMutation.mutate,
    isAddingToWishlist: addToWishlistMutation.isPending,
    isRemovingFromWishlist: removeFromWishlistMutation.isPending,
  };
};

export default useWishlist;