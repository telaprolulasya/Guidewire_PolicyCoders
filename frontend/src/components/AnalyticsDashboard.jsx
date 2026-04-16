import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, Legend
} from 'recharts';

const payoutData = [
  { date: 'Mon', amount: 1200 },
  { date: 'Tue', amount: 2100 },
  { date: 'Wed', amount: 800 },
  { date: 'Thu', amount: 3200 },
  { date: 'Fri', amount: 1500 },
  { date: 'Sat', amount: 4100 },
  { date: 'Sun', amount: 2800 },
];

const riskData = [
  { name: 'Low Risk', value: 450, color: '#10b981' },
  { name: 'Medium Risk', value: 300, color: '#f59e0b' },
  { name: 'High Risk', value: 150, color: '#ef4444' },
];

const disruptionData = [
  { type: 'Rain', count: 45 },
  { type: 'Pollution', count: 32 },
  { type: 'Curfew', count: 15 },
  { type: 'Heatwave', count: 28 },
];

const planData = [
  { name: 'Basic', users: 800, color: '#3b82f6' },
  { name: 'Standard', users: 500, color: '#8b5cf6' },
  { name: 'Premium', users: 200, color: '#ec4899' },
];

const fraudData = [
  { name: 'Normal Claims', value: 950, color: '#6366f1' },
  { name: 'Suspicious', value: 50, color: '#f43f5e' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-100 text-sm">
        <p className="font-semibold text-slate-800">{`${label || payload[0].name}`}</p>
        <p className="text-slate-600">
          {`${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

const AnalyticsDashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payout Trend Graph */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-1">Payout Trend</h3>
          <p className="text-sm text-slate-500 mb-6">This graph helps the admin understand payout trends over time and the impact of recent disruptions.</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={payoutData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `₹${val}`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disruption Type Analysis */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-1">Disruption Types</h3>
          <p className="text-sm text-slate-500 mb-6">Helps identify which external factors impact workers the most frequently.</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={disruptionData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Risk Level Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-1">Risk Levels</h3>
          <p className="text-sm text-slate-500 mb-4">Helps admin understand high-risk zones and adjust pricing strategies accordingly.</p>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={riskData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2 w-full text-xs font-medium text-slate-600">
              {riskData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></span>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plan Usage */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-1">Plan Usage</h3>
          <p className="text-sm text-slate-500 mb-4">Shows distribution of plans to help understand user behavior and optimize offerings.</p>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={planData} cx="50%" cy="50%" innerRadius={0} outerRadius={80} dataKey="users" stroke="white" strokeWidth={2}>
                    {planData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2 w-full text-xs font-medium text-slate-600">
              {planData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></span>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fraud Detection Graph */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-1">Fraud Detection</h3>
          <p className="text-sm text-slate-500 mb-4">Demonstrates system security by monitoring normal versus suspicious claim patterns.</p>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="h-48 w-full relative">
              <div className="absolute inset-0 flex items-center justify-center flex-col z-10 pointer-events-none">
                <span className="text-2xl font-bold text-slate-800">5%</span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Suspicious</span>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={fraudData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" stroke="none" startAngle={90} endAngle={-270}>
                    {fraudData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2 w-full text-xs font-medium text-slate-600">
              {fraudData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></span>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsDashboard;
