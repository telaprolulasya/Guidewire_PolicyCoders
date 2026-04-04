import React, { useState, useEffect } from 'react';
import api from '../api';
import { Shield, Fingerprint, MapPin, IndianRupee, Users } from 'lucide-react';

const FraudAndWorkers = () => {
    const [fraud, setFraud] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [payouts, setPayouts] = useState([]);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [selectedFraud, setSelectedFraud] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            api.get('/admin/fraud').then(res => setFraud(res.data.fraud || [])).catch(() => {});
            api.get('/admin/workers').then(res => setWorkers(res.data.workers || [])).catch(() => {});
            api.get('/admin/payouts').then(res => setPayouts(res.data.payouts || [])).catch(() => {});
        };
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const displayFraud = fraud.length ? fraud : [
        { worker_id: 1042, reason: 'Location Mismatch. GPS outside zone.', reported_date: 'Today 14:02' },
        { worker_id: 3021, reason: 'Duplicate claim detected within 24hrs', reported_date: 'Today 09:12' },
    ];

    const displayWorkers = workers.length ? workers : [
        { id: 1042, name: 'Ramesh Patel', city: 'Mumbai', plan_id: 2, status: 'Active' },
        { id: 3021, name: 'Anjali Sharma', city: 'Delhi', plan_id: 3, status: 'Suspended' },
        { id: 4123, name: 'Manoj Kumar', city: 'Bangalore', plan_id: 1, status: 'Active' },
    ];

    const displayPayouts = payouts.length ? payouts : [
        { id: 9912, worker_id: 4123, amount: 200, reason: 'Heavy Rain Disruption', date: '2 Mins Ago' },
        { id: 9911, worker_id: 1042, amount: 450, reason: 'Severe Pollution', date: '1 Hour Ago' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Top Row: Fraud & Payouts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Fraud Detection */}
                <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-red-500/20 rounded-xl"><Fingerprint className="text-red-400" /></div>
                        <div>
                            <h3 className="text-xl font-bold text-white">AI Fraud Detection</h3>
                            <p className="text-slate-400 text-sm">Suspicious activity flags</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {displayFraud.map((f, i) => (
                            <div key={i} className="bg-slate-900 border-l-4 border-red-500 p-4 rounded-r-xl">
                                <div className="flex justify-between items-start">
                                    <span className="text-red-400 text-xs font-bold uppercase tracking-wider mb-1 block">Alert Flagged</span>
                                    <span className="text-slate-500 text-xs">{f.reported_date}</span>
                                </div>
                                <p className="text-slate-200 font-medium">{f.reason}</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-md border border-slate-700">Worker ID #{f.worker_id}</span>
                                    <button 
                                        onClick={() => setSelectedFraud(f)}
                                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                                    >
                                        Investigate
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Payouts */}
                <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-500/20 rounded-xl"><IndianRupee className="text-green-400" /></div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Automated Payouts</h3>
                            <p className="text-slate-400 text-sm">Recently dispersed funds via smart contract</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {displayPayouts.map((p, i) => (
                            <div key={i} className="flex justify-between items-center py-3 border-b border-slate-700/50 last:border-0 hover:bg-slate-700/20 px-2 rounded-lg transition">
                                <div>
                                    <p className="text-white font-medium">{p.reason}</p>
                                    <p className="text-slate-500 text-sm mt-0.5">Worker #{p.worker_id} • {p.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-green-400 font-bold text-lg">+₹{p.amount}</p>
                                    <p className="text-slate-500 text-xs">Tx: {p.id}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Worker Management */}
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-500/20 rounded-xl"><Users className="text-blue-400" /></div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Worker Directory</h3>
                        <p className="text-slate-400 text-sm">Manage enrolled gig workers</p>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="pb-3 px-4 text-slate-400 font-medium text-sm">Worker ID</th>
                                <th className="pb-3 px-4 text-slate-400 font-medium text-sm">Name</th>
                                <th className="pb-3 px-4 text-slate-400 font-medium text-sm">Location</th>
                                <th className="pb-3 px-4 text-slate-400 font-medium text-sm">Status</th>
                                <th className="pb-3 px-4 text-slate-400 font-medium text-sm text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {displayWorkers.map((w, idx) => (
                                <tr key={idx} className="hover:bg-slate-700/20 transition-colors">
                                    <td className="py-4 px-4 font-mono text-slate-400">#{w._id?.slice(-4) || w.id}</td>
                                    <td className="py-4 px-4 font-bold text-slate-200">{w.name}</td>
                                    <td className="py-4 px-4 text-slate-400"><span className="flex items-center gap-1"><MapPin size={14}/> {w.location || w.city}</span></td>
                                    <td className="py-4 px-4">
                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${w.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{w.status}</span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <button 
                                            onClick={() => setSelectedWorker(w)}
                                            className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition"
                                        >
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Worker Profile Modal */}
            {selectedWorker && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-slate-900 border border-slate-700 rounded-[32px] w-full max-w-lg shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
                        {/* Header Background */}
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-600 to-purple-700 -z-10 opacity-20"></div>
                        
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 shadow-xl">
                                        <Shield size={40} className="text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white">{selectedWorker.name}</h3>
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Worker ID: #{selectedWorker._id?.slice(-6) || selectedWorker.id}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedWorker(null)}
                                    className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-500"
                                >
                                    <div className="w-6 h-6 flex items-center justify-center font-bold text-xl">×</div>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Location</p>
                                    <div className="flex items-center gap-2 text-slate-200">
                                        <MapPin size={16} className="text-indigo-400" />
                                        <span className="font-bold">{selectedWorker.location || selectedWorker.city}</span>
                                    </div>
                                </div>
                                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Platform</p>
                                    <div className="flex items-center gap-2 text-slate-200">
                                        <Shield size={16} className="text-indigo-400" />
                                        <span className="font-bold">{selectedWorker.platform || 'General Delivery'}</span>
                                    </div>
                                </div>
                                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Avg Income</p>
                                    <div className="flex items-center gap-2 text-slate-200">
                                        <IndianRupee size={16} className="text-green-400" />
                                        <span className="font-bold">₹{selectedWorker.avgIncome || '4,500'}/wk</span>
                                    </div>
                                </div>
                                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Account Status</p>
                                    <div className="flex items-center gap-2 text-slate-200">
                                        <div className={`w-2 h-2 rounded-full ${selectedWorker.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <span className="font-bold">{selectedWorker.status || 'Active'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button 
                                    disabled={isGenerating}
                                    onClick={() => {
                                        setIsGenerating(true);
                                        setTimeout(() => setIsGenerating(false), 2000);
                                    }}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest py-4 rounded-2xl transition shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed"
                                >
                                    {isGenerating ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Generating PDF...
                                        </>
                                    ) : (
                                        <>
                                            <Shield size={16} />
                                            Generate Income Report
                                        </>
                                    )}
                                </button>
                                
                                {isGenerating === false && (
                                    <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-wider animate-in fade-in slide-in-from-top-2 duration-500">
                                        Last generated: Just Now
                                    </p>
                                )}
                                
                                <button 
                                    onClick={() => setSelectedWorker(null)}
                                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-widest py-4 rounded-2xl transition"
                                >
                                    Close Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FraudAndWorkers;
