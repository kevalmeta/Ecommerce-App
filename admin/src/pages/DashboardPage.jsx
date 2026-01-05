import { useQuery } from "@tanstack/react-query"
import { orderApi, statsApi } from "../lib/api"
import { DollarSignIcon, PackageIcon, ShoppingBagIcon, UsersIcon } from "lucide-react"

function DashboardPage() {
  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.getAll,
  })

  const { data: startsData, isLoading: startsLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: statsApi.getDashboard,
  })

  const recentOrders = ordersData?.orders?.slice(0, 5) || []


  const statsCards = [
    {
      name: "Total Revenue",
      value: startsLoading ? "..." : `$${startsData.totalRevenue.toFixed(2) || 0}`,
      icon: <DollarSignIcon className="w-8 h-8" />
    },
    {
      name: "Total Orders",
      value: startsLoading ? "..." : startsData.totalOrders || 0,
      icon: <ShoppingBagIcon className="w-8 h-8" />
    },
    {
      name: "Total Customers",
      value: startsLoading ? "..." : startsData.totalCustomers || 0,
      icon: <UsersIcon className="w-8 h-8" />
    },
    {
      name: "Total Products",
      value: startsLoading ? "..." : startsData.totalProducts || 0,
      icon: <PackageIcon className="w-8 h-8" />
    },
  
  ]
  return (
    <div className="space-y-6">
      {/* STATS */}
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-100">
        {statsCards.map((stat) => (
          <div key={stat.name} className="stat">
            <div className="stat-figure text-primary">{stat.icon}</div>
            <div className="stat-title">{stat.name}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage