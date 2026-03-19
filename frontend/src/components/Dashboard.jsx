import React from 'react';
import { ShieldAlert, IndianRupee, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

const Dashboard = () => {
  return (
    <section id="dashboard" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Delivery Partner</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Here's your coverage status for this week.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-900/40 text-emerald-400 px-4 py-2 rounded-full font-semibold border border-emerald-800/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Active Coverage</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 shadow-[0_0_15px_rgba(34,211,238,0.1)] border border-slate-800 relative overflow-hidden group hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:border-cyan-500/50 transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <IndianRupee className="w-24 h-24 text-cyan-400" />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-cyan-950 rounded-lg text-cyan-400">
              <IndianRupee className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-300">Weekly Premium</h3>
          </div>
          <p className="text-4xl font-bold text-white mt-4">₹20</p>
          <p className="text-sm text-slate-400 mt-2">Deducted automatically</p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 shadow-[0_0_15px_rgba(168,85,247,0.1)] border border-slate-800 relative overflow-hidden group hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:border-purple-500/50 transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldAlert className="w-24 h-24 text-purple-400" />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-950 rounded-lg text-purple-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-300">Risk Level</h3>
          </div>
          <p className="text-4xl font-bold text-white mt-4 flex items-center gap-3">
            Low <span className="text-sm py-1 px-3 bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 rounded-full">Safe Area</span>
          </p>
          <p className="text-sm text-slate-400 mt-2">Based on current location data</p>
        </div>

        <div className="bg-gradient-to-br from-cyan-600 to-blue-800 rounded-2xl p-6 shadow-[0_0_25px_rgba(34,211,238,0.3)] text-white relative overflow-hidden border border-cyan-500/30">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <TrendingUp className="w-32 h-32" />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-black/20 rounded-lg backdrop-blur-md">
              <TrendingUp className="w-5 h-5 text-cyan-100" />
            </div>
            <h3 className="font-semibold text-cyan-50">Protected Earnings</h3>
          </div>
          <p className="text-4xl font-bold mt-4 text-white">₹4,250</p>
          <p className="text-sm text-cyan-100 mt-2">Estimated earnings secured</p>
        </div>
      </div>

      {/* Simple Stats/Chart Representation */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 shadow-[0_0_15px_rgba(34,211,238,0.05)] border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          Earnings vs <AlertTriangle className="w-5 h-5 text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]" /> Disruptions
        </h3>
        
        {/* Mock Chart Area */}
        <div className="h-64 flex items-end gap-4 justify-between pt-4">
          {[
            { day: 'Mon', earn: 80, dis: 0 },
            { day: 'Tue', earn: 60, dis: 20 },
            { day: 'Wed', earn: 90, dis: 0 },
            { day: 'Thu', earn: 30, dis: 70 }, // High disruption
            { day: 'Fri', earn: 100, dis: 0 },
            { day: 'Sat', earn: 120, dis: 0 },
            { day: 'Sun', earn: 110, dis: 0 },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center flex-1 group">
              <div className="w-full flex justify-center items-end h-48 gap-1 relative">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-12 bg-slate-800 border border-slate-700 text-white text-xs py-1 px-2 rounded-md whitespace-nowrap transition-opacity pointer-events-none z-10 shadow-lg">
                  Earned: ₹{stat.earn * 10}
                  {stat.dis > 0 && <br />}
                  {stat.dis > 0 && <span className="text-yellow-400">Payout: ₹{stat.dis * 10}</span>}
                </div>
                
                {/* Payout Bar (Disruption) */}
                {stat.dis > 0 && (
                  <div 
                    className="w-1/2 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-md hover:brightness-125 transition-all cursor-pointer shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                    style={{ height: `${stat.dis}%` }}
                  ></div>
                )}
                {/* Regular Earnings Bar */}
                <div 
                  className="w-1/2 bg-gradient-to-t from-cyan-600 to-blue-500 rounded-t-md hover:brightness-125 transition-all cursor-pointer shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                  style={{ height: `${stat.earn}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-slate-400 mt-4 group-hover:text-cyan-400 transition-colors">{stat.day}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
