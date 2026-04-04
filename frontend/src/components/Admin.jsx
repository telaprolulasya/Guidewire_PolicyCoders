import React from 'react';
import { Users, AlertTriangle, IndianRupee, Activity } from 'lucide-react';

const Admin = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 opacity-60"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-wide">Command Center</h2>
            <p className="text-slate-500 mt-1 text-sm font-medium">Platform overview & real-time alerts</p>
          </div>
          <div className="bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-200 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">System Online</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <Users className="text-blue-500 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-sm text-slate-500 font-medium">Total Active Users</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900">{Number(stats.totalWorkers || 0).toLocaleString()}</h3>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-yellow-200 hover:bg-yellow-50/50 transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <Activity className={stats.activeDisruptions > 0 ? "text-yellow-500 animate-pulse" : "text-slate-400"} />
            </div>
            <p className="text-sm text-slate-500 font-medium">Active Disruptions</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900">{stats.activeDisruptions || 0}</h3>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-green-200 hover:bg-green-50/50 transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <IndianRupee className="text-green-500 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-sm text-slate-500 font-medium">Total Payouts</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900">₹{Number(stats.totalPayouts || 0).toLocaleString()}</h3>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50/50 transition-colors group relative overflow-hidden">
            {stats.fraudAlerts > 0 && <div className="absolute top-0 right-0 w-16 h-16 bg-red-100 rounded-bl-full"></div>}
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className={stats.fraudAlerts > 0 ? "text-red-500 animate-bounce" : "text-slate-400"} />
            </div>
            <p className="text-sm text-slate-500 font-medium">Fraud Alerts</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900">{stats.fraudAlerts || 0}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
