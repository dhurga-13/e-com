import React from "react";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  CreditCard,
  Package
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  // Fetch real data from the database
  const totalRevenueData = await prisma.order.aggregate({
    _sum: { amount: true },
  });
  const totalRevenue = totalRevenueData._sum.amount || 0;

  const totalOrders = await prisma.order.count();
  const totalCustomers = await prisma.user.count();

  // We could calculate conversion rate, but for now let's just show a static 3.24% or similar mock as it requires analytics
  const conversionRate = 3.24;

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: "+20.1%", // Static for now, as calculating change requires historical data
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: totalOrders.toString(),
      change: "+8.2%",
      trend: "up",
      icon: ShoppingBag,
    },
    {
      title: "Active Customers",
      value: totalCustomers.toString(),
      change: "-3.1%",
      trend: "down",
      icon: Users,
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate}%`,
      change: "+1.2%",
      trend: "up",
      icon: TrendingUp,
    },
  ];

  const dbOrders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      user: true,
      items: {
        include: { product: true }
      }
    }
  });

  const recentOrders = dbOrders.map(order => ({
    id: `#ORD-${order.id.slice(-6).toUpperCase()}`,
    customer: order.user.name,
    product: order.items.length > 0 ? order.items[0].product.name + (order.items.length > 1 ? ` +${order.items.length - 1} more` : '') : 'Unknown Product',
    date: order.createdAt.toLocaleDateString(),
    amount: `₹${order.amount.toFixed(2)}`,
    status: order.status,
  }));

  return (
    <div className="space-y-6">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isUp = stat.trend === "up";
          return (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2d5eff] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${isUp ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                  {isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area (Mockup) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Revenue Overview</h2>
            <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#2d5eff] focus:border-[#2d5eff] block p-2 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Year</option>
            </select>
          </div>
          {/* Mock Chart Area */}
          <div className="h-[300px] w-full rounded-xl bg-gradient-to-tr from-blue-50 via-white to-purple-50 border border-gray-100 flex items-end p-4 gap-2 relative overflow-hidden">
            {/* Background grids */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            {/* Mock Bars */}
            {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2 z-10 group">
                <div 
                  className="w-full max-w-[40px] bg-gradient-to-t from-[#2d5eff] to-blue-400 rounded-t-md opacity-80 group-hover:opacity-100 transition-all duration-300 relative"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ${height * 100}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Recent Activity */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreVertical size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* Activity Item 1 */}
            <div className="flex gap-4 relative">
              <div className="w-0.5 h-full bg-gray-100 absolute left-[19px] top-8 -z-10"></div>
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2d5eff] flex items-center justify-center shrink-0 border-4 border-white">
                <Package size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New order received</p>
                <p className="text-xs text-gray-500 mt-0.5">Check recent orders table below.</p>
                <p className="text-xs text-gray-400 mt-1">Recently</p>
              </div>
            </div>
            
            {/* Activity Item 2 */}
            <div className="flex gap-4 relative">
              <div className="w-0.5 h-full bg-gray-100 absolute left-[19px] top-8 -z-10"></div>
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border-4 border-white">
                <CreditCard size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Payment processed</p>
                <p className="text-xs text-gray-500 mt-0.5">Automated payments processed.</p>
                <p className="text-xs text-gray-400 mt-1">A while ago</p>
              </div>
            </div>

            {/* Activity Item 3 */}
            <div className="flex gap-4 relative">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border-4 border-white">
                <Users size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">System updated</p>
                <p className="text-xs text-gray-500 mt-0.5">Database synced with new schema.</p>
                <p className="text-xs text-gray-400 mt-1">Today</p>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-4 py-2 text-sm font-medium text-[#2d5eff] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            View All Activity
          </button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
          <button className="text-sm font-medium text-[#2d5eff] hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.length > 0 ? (
                recentOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 text-sm">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
