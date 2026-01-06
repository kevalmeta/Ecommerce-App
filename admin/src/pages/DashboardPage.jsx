import { useQuery } from "@tanstack/react-query";
import { orderApi, statsApi } from "../lib/api";
import { DollarSignIcon, PackageIcon, ShoppingBagIcon, UsersIcon } from "lucide-react";
import { capitalizeText, formatDate, getOrderStatusBadge } from "../lib/utils";
import PageLoader from "../components/PageLoader";

function DashboardPage() {
  // 1. Fetch data with consistent naming
  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.getAll,
  });

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: statsApi.getDashboard,
  });

  // 2. Early return for loading states to prevent "undefined" errors below
  if (statsLoading || ordersLoading) return <PageLoader />;

  // 3. Robust data extraction with optional chaining
  const recentOrders = ordersData?.orders?.slice(0, 5) || [];

  const statsCards = [
    {
      name: "Total Revenue",
      // Always provide a fallback (0) before calling .toFixed()
      value: `$${(statsData?.totalRevenue || 0).toFixed(2)}`,
      icon: <DollarSignIcon className="w-8 h-8" />,
      color: "text-primary"
    },
    {
      name: "Total Orders",
      value: statsData?.totalOrders || 0,
      icon: <ShoppingBagIcon className="w-8 h-8" />,
      color: "text-secondary"
    },
    {
      name: "Total Customers",
      value: statsData?.totalCustomers || 0,
      icon: <UsersIcon className="w-8 h-8" />,
      color: "text-accent"
    },
    {
      name: "Total Products",
      value: statsData?.totalProducts || 0,
      icon: <PackageIcon className="w-8 h-8" />,
      color: "text-info"
    },
  ];

  return (
    <div className="space-y-6">
      {/* STATS SECTION */}
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-100">
        {statsCards.map((stat) => (
          <div key={stat.name} className="stat">
            <div className={`stat-figure ${stat.color}`}>{stat.icon}</div>
            <div className="stat-title font-medium">{stat.name}</div>
            <div className="stat-value text-2xl lg:text-3xl">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* RECENT ORDERS SECTION */}
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-4 lg:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-xl font-bold">Recent Orders</h2>
            <button className="btn btn-ghost btn-sm">View All</button>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-12 bg-base-200/30 rounded-xl">
              <ShoppingBagIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="text-base-content/60 font-medium">No orders found yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-base-200/50">
                    <th className="rounded-l-lg">Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th className="rounded-r-lg">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="hover">
                      <td className="font-mono text-xs text-primary">
                        #{order._id.slice(-8).toUpperCase()}
                      </td>
                      <td>
                        <div className="font-bold">{order.shippingAddress?.fullName || "Guest User"}</div>
                        <div className="text-xs opacity-50 truncate max-w-[150px]">
                          {order.user?.email || "No email"}
                        </div>
                      </td>
                      <td>
                        <div className="badge badge-ghost badge-sm font-medium">
                          {order.orderItems?.length || 0} item(s)
                        </div>
                      </td>
                      <td className="font-semibold text-base-content">
                        ${(order.totalPrice || 0).toFixed(2)}
                      </td>
                      <td>
                        <div className={`badge ${getOrderStatusBadge(order.status)} border-none text-xs font-bold px-3`}>
                          {capitalizeText(order.status)}
                        </div>
                      </td>
                      <td className="text-sm whitespace-nowrap">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;