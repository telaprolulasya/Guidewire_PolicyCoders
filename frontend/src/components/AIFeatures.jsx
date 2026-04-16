import React from 'react';
import { ShieldAlert, TrendingDown, TrendingUp, CheckCircle, AlertTriangle, Info, Zap, IndianRupee } from 'lucide-react';

const AIFeatures = ({ mockData }) => {
  // Core Feature 1: AI Risk Score
  const riskScore = 8;
  const riskLevel = 'High';
  
  // Feature 2: Smart Plan Recommendation
  const recommendedPlan = 'Premium';
  const planPrice = '₹40/week';
  
  // Feature 5: Income Loss Tracker
  const expectedIncome = 800;
  const currentIncome = 400;
  const loss = expectedIncome - currentIncome;
  const lossPercent = (loss / expectedIncome) * 100;

  // Feature 9: Confidence Score (AI Feel)
  const confidenceScore = 85;
  const triggerPayout = confidenceScore > 70;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* 1. Risk Score Card with Location Insight */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all group overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <ShieldAlert size={64} className="text-red-500" />
        </div>
        <div className="relative z-10">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-4">Location & Risk</p>
            <div className="mb-2">
                <span className="text-sm font-bold text-slate-900 block leading-tight">Hyderabad – High Risk Today</span>
            </div>
            <div className="flex items-end gap-2 mb-2 mt-4">
                <span className="text-4xl font-black text-slate-900 leading-none">{riskScore}</span>
                <span className="text-sm font-bold text-slate-400 mb-1">/10</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-red-100 text-red-700">
                <TrendingUp size={12} />
                Risk Level: {riskLevel}
            </div>
        </div>
      </div>

      {/* 2. Recommended Plan Badge */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all group overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Zap size={64} className="text-indigo-600" />
        </div>
        <div className="relative z-10">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-4">Smart Recommendation</p>
            <div className="mb-3 mt-4">
                <p className="text-xs text-slate-500 font-bold mb-1">Recommended Plan:</p>
                <span className="text-lg font-black text-slate-900 block leading-tight">{recommendedPlan} Plan {planPrice}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-700 mt-2">
                <CheckCircle size={12} /> Protect against High Risk
            </div>
        </div>
      </div>

      {/* 3. Income Loss Tracker */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all group overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <IndianRupee size={64} className="text-orange-500" />
        </div>
        <div className="relative z-10">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-4">Income Loss Tracker</p>
            <div className="flex flex-col gap-2 mb-3">
                <div className="flex justify-between items-center text-sm font-bold text-slate-600">
                    <span>Expected Income</span>
                    <span className="text-slate-900">₹{expectedIncome}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-600">
                    <span>Current Income</span>
                    <span className="text-slate-900">₹{currentIncome}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-black text-red-500 border-t border-slate-100 pt-2 mt-1">
                    <span>Estimated Loss</span>
                    <span>₹{loss}</span>
                </div>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                <div 
                    className="h-full transition-all duration-1000 bg-red-400"
                    style={{ width: `${lossPercent}%` }}
                ></div>
            </div>
        </div>
      </div>

      {/* 4. Confidence Score Meter */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all group overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Info size={64} className="text-slate-600" />
        </div>
        <div className="relative z-10">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-4">AI Trigger Confidence</p>
            <div className="flex items-end gap-1 mb-2 mt-4">
                <span className="text-4xl font-black text-slate-900 leading-none">{confidenceScore}%</span>
            </div>
            <p className="text-[10px] text-slate-500 font-bold mb-3">Disruption Confidence</p>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                triggerPayout ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
            }`}>
                {triggerPayout ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                {triggerPayout ? 'Verified For Payout' : 'No Action Required'}
            </div>
        </div>
      </div>

    </div>
  );
};

export default AIFeatures;
