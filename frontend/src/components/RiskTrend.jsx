import React from 'react';
import { BarChart3, TrendingUp, Calendar } from 'lucide-react';

const RiskTrend = () => {
  // Mock trend data
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const values = [20, 45, 30, 85, 40, 60, 25];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight font-display">Risk Analytics</h3>
          <p className="text-sm text-slate-500 font-bold">Regional risk trends for the week</p>
        </div>
        <div className="p-2 bg-slate-50 text-slate-400 rounded-xl">
            <BarChart3 size={20} />
        </div>
      </div>

      <div className="flex-grow flex items-end justify-between gap-2 px-2">
        {values.map((v, i) => (
          <div key={i} className="flex flex-col items-center gap-3 w-full group">
            <div className="relative w-full">
                <div 
                    className={`w-full rounded-lg transition-all duration-700 group-hover:scale-x-110 ${
                        v > 70 ? 'bg-red-400' : (v > 40 ? 'bg-orange-400' : 'bg-blue-400')
                    }`}
                    style={{ height: `${v}%` }}
                ></div>
                {/* Tooltip on hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {v}%
                </div>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{days[i]}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-orange-600">
            <TrendingUp size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Increasing Trend</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
            <Calendar size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">April 2026</span>
        </div>
      </div>
    </div>
  );
};

export default RiskTrend;
