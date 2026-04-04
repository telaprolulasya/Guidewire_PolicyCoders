import React, { useState } from 'react';
import { CheckCircle2, Zap, AlertCircle, X } from 'lucide-react';

const plansData = [
  {
    name: 'Basic',
    price: '₹20',
    coverage: ['Rain coverage', 'Basic disruption support'],
    maxPayout: '₹100',
    isPopular: false,
    details: {
      conditions: 'Rainfall > 50mm within 2 hours',
      payoutLimit: '₹500 / month',
      risks: ['Heavy Rain', 'Thunderstorms']
    }
  },
  {
    name: 'Standard',
    price: '₹30',
    coverage: ['Rain + AQI coverage', 'Moderate risk protection'],
    maxPayout: '₹150',
    isPopular: true,
    details: {
      conditions: 'Rain > 30mm or AQI > 300',
      payoutLimit: '₹1,000 / month',
      risks: ['Heavy Rain', 'Air Pollution', 'Heatwaves']
    }
  },
  {
    name: 'Premium',
    price: '₹40',
    coverage: ['All risks covered', 'Max financial protection'],
    maxPayout: '₹200',
    isPopular: false,
    details: {
      conditions: 'Any validated disruption event',
      payoutLimit: '₹2,500 / month',
      risks: ['All Environmental Risks', 'Public Curfews', 'Accident Support']
    }
  },
];

const Plans = ({ activePlan, onPlanSelect, onAlreadySubscribed }) => {
  const [confirmingPlan, setConfirmingPlan] = useState(null);
  const [viewDetails, setViewDetails] = useState(null);

  const handleButtonClick = (plan) => {
    if (plan.name === activePlan) {
      onAlreadySubscribed();
    } else {
      setConfirmingPlan(plan);
    }
  };

  const handleConfirm = () => {
    onPlanSelect(confirmingPlan.name);
    setConfirmingPlan(null);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 h-full relative">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight font-display">Available Protection Plans</h3>
          <p className="text-sm text-slate-500 font-bold">Simple, transparent coverage for your earnings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plansData.map((plan) => (
          <div 
            key={plan.name}
            className={`relative flex flex-col h-full rounded-2xl p-6 border-2 transition-all duration-500 group/plan ${
              plan.name === activePlan 
                ? 'border-blue-600 bg-blue-50/20 shadow-xl shadow-blue-100/50 scale-[1.02] z-10' 
                : 'border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-100 bg-white'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-6 -translate-y-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-lg">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="mb-6">
              <h4 className="text-lg font-black text-slate-800 mb-1 tracking-tight">{plan.name}</h4>
              <div className="flex items-baseline gap-0.5">
                <span className="text-3xl font-black text-slate-900 font-display">{plan.price}</span>
                <span className="text-xs font-black text-slate-400">/week</span>
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-grow">
              {plan.coverage.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span className="text-xs font-bold text-slate-600">{item}</span>
                </div>
              ))}
              <div className="flex items-center gap-2.5">
                <Zap size={16} className="text-blue-500" />
                <span className="text-xs font-bold text-slate-600">Limit: {plan.maxPayout}/claim</span>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => handleButtonClick(plan)}
                className={`w-full py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${
                  plan.name === activePlan
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {plan.name === activePlan ? 'Active Plan' : 'Select Plan'}
              </button>
              
              <button 
                onClick={() => setViewDetails(plan)}
                className="w-full text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-blue-600 transition-colors"
              >
                View Conditions
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Plan Details Modal */}
      {viewDetails && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setViewDetails(null)}></div>
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight font-display mb-6">{viewDetails.name} Coverage Details</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">Conditions for Payout</p>
                <div className="bg-slate-50 p-4 rounded-2xl text-xs font-bold text-slate-700 border border-slate-100">
                  {viewDetails.details.conditions}
                </div>
              </div>
              
              <div>
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">Included Risks</p>
                <div className="flex flex-wrap gap-2">
                  {viewDetails.details.risks.map((risk, i) => (
                    <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100">
                      {risk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                <p className="text-[10px] uppercase font-black text-green-700 tracking-widest mb-1">Max Benefit</p>
                <p className="text-lg font-black text-green-900">{viewDetails.details.payoutLimit}</p>
              </div>
            </div>

            <button 
              onClick={() => setViewDetails(null)}
              className="mt-8 w-full bg-slate-800 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal (Switching) */}
      {confirmingPlan && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setConfirmingPlan(null)}></div>
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight font-display mb-2">Confirm Plan Switch</h3>
              <p className="text-slate-500 font-bold text-sm mb-8 leading-relaxed">
                Switching to the {confirmingPlan.name} plan will update your coverage limits and weekly premium to {confirmingPlan.price}/week.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleConfirm}
                  className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all"
                >
                  Switch Now
                </button>
                <button onClick={() => setConfirmingPlan(null)} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-200 transition-all">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
