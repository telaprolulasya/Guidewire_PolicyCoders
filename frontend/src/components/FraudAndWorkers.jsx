import React, { useState, useEffect } from 'react';
import api from '../api';
import { Shield, Fingerprint, MapPin, IndianRupee, Users } from 'lucide-react';

const FraudAndWorkers = () => {
    const [fraud, setFraud] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [payouts, setPayouts] = useState([]);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const displayWorkers = workers.length ? workers : [
        { id: 1042, name: 'Ramesh Patel', city: 'Mumbai', plan_id: 2, status: 'Active' },
        { id: 3021, name: 'Anjali Sharma', city: 'Delhi', plan_id: 3, status: 'Suspended' },
        { id: 4123, name: 'Manoj Kumar', city: 'Bangalore', plan_id: 1, status: 'Active' },
    ];

    const handleInvestigate = (fraudItem) => {
        const workerToView = displayWorkers.find(w => w.id === fraudItem.worker_id || (w._id && w._id.endsWith(fraudItem.worker_id.toString()))) || 
            { id: fraudItem.worker_id, name: "Unknown Worker", city: "Unknown", status: "Suspended" };
        setSelectedWorker(workerToView);
    };

    const handleGenerateReport = (worker) => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            const reportContent = `INCOME REPORT\n-----------------------\nWorker ID: #${worker._id?.slice(-6) || worker.id}\nName: ${worker.name}\nLocation: ${worker.location || worker.city}\nStatus: ${worker.status || 'Active'}\nAverage Income: ₹${worker.avgIncome || '4,500'}/week\n\nGenerated on: ${new Date().toLocaleString()}\nPlatform: GigGuard AI Parametric Insurance`;
            const blob = new Blob([reportContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Income_Report_${worker.name.replace(/\s+/g, '_')}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 1500);
    };

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

    const displayPayouts = payouts.length ? payouts : [
        { id: 9912, worker_id: 4123, amount: 200, reason: 'Heavy Rain Disruption', date: '2 Mins Ago' },
        { id: 9911, worker_id: 1042, amount: 450, reason: 'Severe Pollution', date: '1 Hour Ago' },
    ];

    return (
        <div className="space-y-8">

            {/* Top Row: Fraud & Payouts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Fraud Detection */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-red-100 rounded-xl"><Fingerprint className="text-red-500" /></div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">AI Fraud Detection</h3>
                            <p className="text-slate-400 text-sm">Suspicious activity flags</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {displayFraud.map((f, i) => (
                            <div key={i} className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                                <div className="flex justify-between items-start">
                                    <span className="text-red-500 text-xs font-bold uppercase tracking-wider mb-1 block">Alert Flagged</span>
                                    <span className="text-slate-400 text-xs">{f.reported_date}</span>
                                </div>
                                <p className="text-slate-700 font-medium">{f.reason}</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-xs bg-white text-slate-500 px-2 py-1 rounded-md border border-slate-200">Worker ID #{f.worker_id}</span>
                                    <button onClick={() => handleInvestigate(f)} className="text-xs text-indigo-500 hover:text-indigo-700 font-medium">Investigate</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Payouts */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-100 rounded-xl"><IndianRupee className="text-green-500" /></div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Automated Payouts</h3>
                            <p className="text-slate-400 text-sm">Recently dispersed via smart contract</p>
                        </div>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {displayPayouts.map((p, i) => (
                            <div key={i} className="flex justify-between items-center py-4 hover:bg-slate-50 px-2 rounded-lg transition">
                                <div>
                                    <p className="text-slate-800 font-medium">{p.reason}</p>
                                    <p className="text-slate-400 text-sm mt-0.5">Worker #{p.worker_id} • {p.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-green-600 font-bold text-lg">+₹{p.amount}</p>
                                    <p className="text-slate-400 text-xs">Tx: {p.id}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Worker Directory */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-xl"><Users className="text-blue-500" /></div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Worker Directory</h3>
                        <p className="text-slate-400 text-sm">Manage enrolled gig workers</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200">
                                {['Worker ID', 'Name', 'Location', 'Status', 'Action'].map((h, i) => (
                                    <th key={h} className={`pb-3 px-4 text-slate-400 font-medium text-sm ${i === 4 ? 'text-right' : ''}`}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {displayWorkers.map((w, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-4 font-mono text-slate-400">#{w._id?.slice(-4) || w.id}</td>
                                    <td className="py-4 px-4 font-bold text-slate-800">{w.name}</td>
                                    <td className="py-4 px-4 text-slate-500"><span className="flex items-center gap-1"><MapPin size={14}/> {w.location || w.city}</span></td>
                                    <td className="py-4 px-4">
                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${w.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{w.status}</span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <button onClick={() => setSelectedWorker(w)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-lg font-medium transition">
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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white border border-slate-200 rounded-[32px] w-full max-w-lg shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10"></div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100 shadow-sm">
                                        <Shield size={40} className="text-indigo-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900">{selectedWorker.name}</h3>
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Worker ID: #{selectedWorker._id?.slice(-6) || selectedWorker.id}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedWorker(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-700">
                                    <span className="w-6 h-6 flex items-center justify-center font-bold text-xl">×</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {[
                                    { label: 'Location', icon: <MapPin size={16} className="text-indigo-500" />, value: selectedWorker.location || selectedWorker.city },
                                    { label: 'Platform', icon: <Shield size={16} className="text-indigo-500" />, value: selectedWorker.platform || 'General Delivery' },
                                    { label: 'Avg Income', icon: <IndianRupee size={16} className="text-green-500" />, value: `₹${selectedWorker.avgIncome || '4,500'}/wk` },
                                    { label: 'Status', icon: <div className={`w-2 h-2 rounded-full ${selectedWorker.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>, value: selectedWorker.status || 'Active' },
                                ].map(item => (
                                    <div key={item.label} className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.label}</p>
                                        <div className="flex items-center gap-2 text-slate-700 font-bold">{item.icon} {item.value}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3">
                                <button
                                    disabled={isGenerating}
                                    onClick={() => handleGenerateReport(selectedWorker)}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest py-4 rounded-2xl transition shadow-md shadow-indigo-100 flex items-center justify-center gap-3 disabled:opacity-70"
                                >
                                    {isGenerating ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Generating...</> : <><Shield size={16} /> Generate Income Report</>}
                                </button>
                                <button onClick={() => setSelectedWorker(null)} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest py-4 rounded-2xl transition">
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
