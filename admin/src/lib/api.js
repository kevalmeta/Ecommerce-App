import axiosInstance from "./axios";

export const productApi = {
  getAll: async () => {
    const { data } = await axiosInstance.get("/api/products"); // ✅ Added /api
    return data;
  },

  create: async (formData) => {
    const { data } = await axiosInstance.post("/api/admin/products", formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // For file uploads
      },
    });
    return data;
  },

  update: async ({ id, formData }) => {
    const { data } = await axiosInstance.put(`/api/admin/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  delete: async (productId) => {
    const { data } = await axiosInstance.delete(`/api/admin/products/${productId}`);
    return data;
  },
};

export const orderApi = {
  getAll: async () => {
    const { data } = await axiosInstance.get("/api/admin/orders");
    return data;
  },

  updateStatus: async ({ orderId, status }) => {
    const { data } = await axiosInstance.patch(`/api/admin/orders/${orderId}/status`, { status });
    return data;
  },
};

export const statsApi = {
  getDashboard: async () => {
    const { data } = await axiosInstance.get("/api/admin/stats");
    return data;
  },
};

export const customerApi = {
  getAll: async () => {
    const { data } = await axiosInstance.get("/api/admin/customers");
    return data;
  },
};
