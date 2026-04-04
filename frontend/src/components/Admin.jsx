import React from 'react';
import { Users, AlertTriangle, IndianRupee, Activity } from 'lucide-react';

const Admin = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 text-white border border-gray-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">Command Center</h2>
            <p className="text-gray-400 mt-1 text-sm font-medium">Platform overview & real-time alerts</p>
          </div>
          <div className="bg-gray-800 py-1.5 px-3 rounded-lg border border-gray-700 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">System Online</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800/80 backdrop-blur-md p-5 rounded-xl border border-gray-700 hover:bg-gray-700 transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <Users className="text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-sm text-gray-400 font-medium">Total Active Users</p>
            <h3 className="text-3xl font-bold mt-1 text-gray-100">{Number(stats.totalWorkers || 0).toLocaleString()}</h3>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-md p-5 rounded-xl border border-gray-700 hover:bg-gray-700 transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <Activity className={stats.activeDisruptions > 0 ? "text-yellow-400 animate-pulse" : "text-gray-500"} />
            </div>
            <p className="text-sm text-gray-400 font-medium">Active Disruptions</p>
            <h3 className="text-3xl font-bold mt-1 text-gray-100">{stats.activeDisruptions || 0}</h3>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-md p-5 rounded-xl border border-gray-700 hover:bg-gray-700 transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <IndianRupee className="text-green-400 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-sm text-gray-400 font-medium">Total Payouts</p>
            <h3 className="text-3xl font-bold mt-1 text-gray-100">₹{Number(stats.totalPayouts || 0).toLocaleString()}</h3>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-md p-5 rounded-xl border border-gray-700 hover:bg-gray-700 transition-colors group relative overflow-hidden">
            {stats.fraudAlerts > 0 && <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/20 rounded-bl-full"></div>}
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className={stats.fraudAlerts > 0 ? "text-red-500 animate-bounce" : "text-gray-500"} />
            </div>
            <p className="text-sm text-gray-400 font-medium">Fraud Alerts</p>
            <h3 className="text-3xl font-bold mt-1 text-gray-100">{stats.fraudAlerts || 0}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
