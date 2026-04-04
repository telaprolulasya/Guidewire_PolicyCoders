import React from 'react';
import { MapPin, TrendingDown, TrendingUp } from 'lucide-react';

const Dashboard = ({ 
  name = "Ravi Kumar", 
  location = "Bangalore", 
  role = "Delivery Partner", 
  premium = "₹20", 
  riskLevel = "Low", 
  coverageStatus = "Active • All Good",
  lastPayout = "None yet"
}) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-0"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-1 shadow-inner">
            <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden border-2 border-white group-hover:scale-105 transition-transform duration-500">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full shadow-md animate-pulse"></div>
        </div>
        
        <h2 className="text-2xl font-black text-slate-800 tracking-tight font-display">{name}</h2>
        <div className="flex items-center gap-2 text-slate-500 mt-2 font-bold text-sm tracking-tight">
          <MapPin size={16} className="text-blue-500" />
          <span>{location}</span>
          <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
          <span className="text-blue-600 font-black">{role}</span>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 w-full">
          <div className="bg-slate-50/80 rounded-2xl p-4 text-left border border-slate-100/50 hover:border-blue-200 transition-colors group/card">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none mb-1.5">Weekly Premium</p>
            <p className="text-xl font-black text-slate-900 group-hover/card:text-blue-600 transition-colors">{premium}</p>
          </div>
          <div className="bg-slate-50/80 rounded-2xl p-4 text-left border border-slate-100/50 hover:border-blue-200 transition-colors group/card">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none mb-1.5">Risk Level</p>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest mt-0.5 ${
              riskLevel === 'Low' ? 'bg-green-100 text-green-700' : 
              riskLevel === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
            }`}>
              {riskLevel === 'Low' ? <TrendingDown size={12} strokeWidth={3} /> : <TrendingUp size={12} strokeWidth={3} />} {riskLevel}
            </span>
          </div>
          <div className="bg-slate-50/80 rounded-2xl p-4 text-left border border-slate-100/50 hover:border-blue-200 transition-colors group/card">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none mb-1.5">Coverage Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-[11px] font-black text-slate-800 uppercase tracking-tighter">{coverageStatus}</p>
            </div>
          </div>
          <div className="bg-slate-50/80 rounded-2xl p-4 text-left border border-slate-100/50 hover:border-blue-200 transition-colors group/card">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none mb-1.5">Last Payout</p>
            <p className="text-[11px] font-black text-blue-600 uppercase tracking-tighter mt-1">{lastPayout}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
