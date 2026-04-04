import React, { useState, useEffect } from 'react';
import { ShieldAlert, TrendingDown, TrendingUp, CheckCircle, AlertTriangle, Info, Zap } from 'lucide-react';

const AIFeatures = ({ mockData }) => {
  const [riskData, setRiskData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [fraudData, setFraudData] = useState(null);
  const [confidenceData, setConfidenceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API calls to backend
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Risk Score
        const riskRes = await fetch(`http://localhost:3000/api/ai/risk?rainfall=${mockData.rain}&aqi=${mockData.aqi}&orders=3`);
        const riskJson = await riskRes.json();
        setRiskData(riskJson);

        // 2. Recommendation
        const recRes = await fetch(`http://localhost:3000/api/ai/recommendation?riskScore=${riskJson.riskScore}&pastDisruptions=2&earningsPattern=stable`);
        const recJson = await recRes.json();
        setRecommendation(recJson);

        // 3. Fraud Detection (Simulated Safe for now)
        const fraudRes = await fetch(`http://localhost:3000/api/ai/fraud?locationMismatch=false&duplicatePayout=false&activityDrop=true`);
        const fraudJson = await fraudRes.json();
        setFraudData(fraudJson);

        // 4. Confidence Score
        const confRes = await fetch(`http://localhost:3000/api/ai/confidence?weatherSeverity=80&aqiSeverity=90&activityDropPercent=75`);
        const confJson = await confRes.json();
        setConfidenceData(confJson);

      } catch (err) {
        console.error("Error fetching AI features:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mockData]);

  if (loading) return (
    <div className="flex items-center justify-center p-12 bg-white rounded-3xl border border-slate-100 shadow-sm animate-pulse">
        <p className="text-slate-400 font-black tracking-widest text-xs uppercase">AI Engine Processing...</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* 1. Risk Score Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all group overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <ShieldAlert size={64} className="text-blue-600" />
        </div>
        <div className="relative z-10">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-4">Risk Intelligence</p>
            <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-black text-slate-900 leading-none">{riskData?.riskScore}</span>
                <span className="text-sm font-bold text-slate-400 mb-1">/10</span>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                riskData?.riskLevel === 'High' ? 'bg-red-100 text-red-700' : 
                riskData?.riskLevel === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
            }`}>
                {riskData?.riskLevel === 'High' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                Level: {riskData?.riskLevel}
            </div>
        </div>
      </div>

      {/* 2. Recommended Plan Badge */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all group overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Zap size={64} className="text-indigo-600" />
        </div>
        <div className="relative z-10">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-4">AI Recommendation</p>
            <div className="mb-3">
                <span className="text-lg font-black text-slate-900 block leading-tight">{recommendation?.recommendedPlan} Plan</span>
                <p className="text-[10px] text-slate-400 font-bold mt-1 line-clamp-1">{recommendation?.reason}</p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-700">
                <CheckCircle size={12} /> Personalized
            </div>
        </div>
      </div>

      {/* 3. Fraud Warning / Status */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all group overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <AlertTriangle size={64} className={fraudData?.status === 'Suspicious' ? 'text-red-600' : 'text-green-600'} />
        </div>
        <div className="relative z-10">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-4">Security Shield</p>
            <div className="flex items-end gap-2 mb-2">
                <span className={`text-xl font-black leading-none ${fraudData?.status === 'Suspicious' ? 'text-red-600' : 'text-green-600'}`}>
                    {fraudData?.status}
                </span>
            </div>
            <div className="bg-slate-50 rounded-xl p-2 mt-2">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-black uppercase text-slate-400">Score</span>
                    <span className="text-[9px] font-black uppercase text-slate-600">{fraudData?.fraudScore}%</span>
                </div>
                <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-1000 ${fraudData?.status === 'Suspicious' ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${fraudData?.fraudScore}%` }}
                    ></div>
                </div>
            </div>
        </div>
      </div>

      {/* 4. Confidence Score Meter */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all group overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Info size={64} className="text-slate-600" />
        </div>
        <div className="relative z-10">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-4">Verification Confidence</p>
            <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl font-black text-slate-900 leading-none">{Math.round(confidenceData?.confidenceScore)}%</span>
            </div>
            <p className="text-[10px] text-slate-500 font-bold mb-3 line-clamp-1">{confidenceData?.message}</p>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                confidenceData?.triggerPayout ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
            }`}>
                {confidenceData?.triggerPayout ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                {confidenceData?.triggerPayout ? 'Verified for Payout' : 'Under Review'}
            </div>
        </div>
      </div>

    </div>
  );
};

export default AIFeatures;
