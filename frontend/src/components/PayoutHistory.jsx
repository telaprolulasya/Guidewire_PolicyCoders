import React from 'react';
import { History, Check } from 'lucide-react';

const PayoutHistory = ({ claims }) => {
  const defaultClaims = [
    { date: '2026-03-25', event: 'Heavy Rain disruption', status: 'Credited', amount: '₹200', type: 'Rain' },
    { date: '2026-03-10', event: 'Severe Air Pollution', status: 'Credited', amount: '₹150', type: 'AQI' },
    { date: '2026-02-15', event: 'Disruption Event', status: 'Credited', amount: '₹100', type: 'General' },
  ];

  const data = claims || defaultClaims;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 px-2">
        <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
          <History size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight font-display">Claims History</h3>
          <p className="text-sm text-slate-500 font-bold">Your recent payouts and events</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Event</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Type</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Amount</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.map((claim, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group/row cursor-pointer">
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-slate-800">{claim.date}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-slate-600 group-hover/row:text-blue-600 transition-colors">{claim.event}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg">{claim.type}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="text-sm font-black text-slate-800">{claim.amount}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-100">
                        <Check size={12} strokeWidth={4} /> {claim.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PayoutHistory;
