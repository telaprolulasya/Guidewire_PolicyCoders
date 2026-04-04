import React, { useState, useEffect } from 'react';
import api from '../api';
import { Settings, Zap, PlusCircle, Trash2, ArrowRight, X } from 'lucide-react';

const RuleConfig = () => {
    const [rules, setRules] = useState([]);
    const [plans, setPlans] = useState([]);
    const [isAddingRule, setIsAddingRule] = useState(false);
    const [newRule, setNewRule] = useState({ metric: 'Rain', condition: '>', threshold: '', payout_percentage: '' });

    useEffect(() => {
        api.get('/admin/rules').then(res => setRules(res.data)).catch(() => {});
        api.get('/admin/plans').then(res => setPlans(res.data)).catch(() => {});
    }, []);

    const initialRules = [
        { id: 1, metric: 'Rain', condition: '>', threshold: 50, payout_percentage: 100 },
        { id: 2, metric: 'AQI', condition: '>', threshold: 300, payout_percentage: 50 },
        { id: 3, metric: 'Orders', condition: '<', threshold: 5, payout_percentage: 80 },
    ];
    const displayRules = rules.length ? rules : initialRules;

    const displayPlans = plans.length ? plans : [
        { id: 1, name: 'Basic', price: 20, coverage_limit: 500 },
        { id: 2, name: 'Pro', price: 30, coverage_limit: 1000 },
        { id: 3, name: 'Max', price: 40, coverage_limit: 2000 },
    ];

    const handleAddRule = () => {
        if (!newRule.threshold || !newRule.payout_percentage) return;
        setRules([{ id: Date.now(), ...newRule, threshold: Number(newRule.threshold), payout_percentage: Number(newRule.payout_percentage) }, ...displayRules]);
        setIsAddingRule(false);
        setNewRule({ metric: 'Rain', condition: '>', threshold: '', payout_percentage: '' });
    };

    const metricColors = {
        Rain:   'bg-blue-50 text-blue-600 border border-blue-200',
        AQI:    'bg-purple-50 text-purple-600 border border-purple-200',
        Orders: 'bg-orange-50 text-orange-600 border border-orange-200',
    };

    const inputClass = "w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all appearance-none";

    return (
        <div className="space-y-8">
            {/* Parametric Engine */}
            <div className="bg-white border border-slate-200 rounded-[40px] p-8 md:p-10 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 opacity-60"></div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 relative z-10">
                    <div>
                        <h3 className="text-3xl font-black text-slate-900 flex items-center gap-3 tracking-tight font-display">
                            <div className="p-2 bg-yellow-100 rounded-xl">
                                <Zap className="text-yellow-500 fill-current" size={24} />
                            </div>
                            Parametric Engine
                        </h3>
                        <p className="text-slate-500 mt-2 font-medium">Define smart contract triggers for automated worker payouts.</p>
                    </div>
                    <button
                        onClick={() => setIsAddingRule(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-md shadow-indigo-100 flex items-center gap-2 active:scale-95"
                    >
                        <PlusCircle size={18} /> New Rule
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {displayRules.map((rule) => (
                        <div key={rule.id} className="bg-slate-50 border border-slate-200 p-6 rounded-[32px] hover:border-indigo-300 hover:bg-indigo-50/30 transition-all duration-300 group/card relative">
                            <div className="flex justify-between items-start mb-6">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${metricColors[rule.metric] || metricColors.Rain}`}>
                                    {rule.metric} Trigger
                                </span>
                                <button onClick={() => setRules(displayRules.filter(r => r.id !== rule.id))} className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover/card:opacity-100 transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="flex items-baseline gap-2 my-4">
                                <span className="text-5xl font-black text-slate-900 tracking-tighter">{rule.condition}{rule.threshold}</span>
                                <span className="text-slate-400 font-bold text-sm">{rule.metric === 'Rain' ? 'mm/hr' : rule.metric === 'AQI' ? 'index' : 'deliveries'}</span>
                            </div>
                            <div className="mt-6 pt-6 border-t border-slate-200 flex justify-between items-center">
                                <div>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Contract Payout</p>
                                    <p className="text-xl font-black text-green-600">{rule.payout_percentage}% <span className="text-[10px] text-slate-400 uppercase">Fixed</span></p>
                                </div>
                                <div className="p-2 bg-slate-100 rounded-xl group-hover/card:bg-indigo-600 transition-colors">
                                    <ArrowRight size={16} className="text-slate-400 group-hover/card:text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Coverage Plans */}
            <div className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-slate-100 rounded-xl"><Settings className="text-slate-500" size={24} /></div>
                    <div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight font-display">Coverage Plans</h3>
                        <p className="text-slate-500 font-medium">Configure subscription tiers and maximum coverage ceilings.</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200">
                                {['Tier Name', 'Weekly Premium', 'Max Limit', 'Status'].map(h => (
                                    <th key={h} className={`pb-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ${h === 'Status' ? 'text-right' : ''}`}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {displayPlans.map((plan) => (
                                <tr key={plan.id} className="hover:bg-slate-50 transition-colors group/row">
                                    <td className="py-5 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-8 rounded-full bg-indigo-200 group-hover/row:bg-indigo-500 transition-colors"></div>
                                            <span className="text-lg font-black text-slate-800">{plan.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-4 font-bold text-slate-600">₹{plan.price}</td>
                                    <td className="py-5 px-4 font-bold text-slate-600">₹{plan.coverage_limit}</td>
                                    <td className="py-5 px-4 text-right">
                                        <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-green-200">Live</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Rule Modal */}
            {isAddingRule && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsAddingRule(false)}></div>
                    <div className="relative bg-white border border-slate-200 rounded-[40px] p-10 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
                        <button onClick={() => setIsAddingRule(false)} className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all">
                            <X size={20} />
                        </button>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight font-display mb-1">Create Rule</h3>
                        <p className="text-slate-400 font-medium text-sm mb-8 uppercase tracking-widest">New parametric logic</p>

                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Metric</label>
                                    <select value={newRule.metric} onChange={(e) => setNewRule({...newRule, metric: e.target.value})} className={inputClass}>
                                        <option value="Rain">Rainfall</option>
                                        <option value="AQI">Air Quality</option>
                                        <option value="Orders">Volume</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logic</label>
                                    <select value={newRule.condition} onChange={(e) => setNewRule({...newRule, condition: e.target.value})} className={inputClass}>
                                        <option value=">">Greater than</option>
                                        <option value="<">Less than</option>
                                        <option value="=">Equals</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Threshold Value</label>
                                <input type="number" value={newRule.threshold} onChange={(e) => setNewRule({...newRule, threshold: e.target.value})} placeholder="e.g. 50" className={inputClass} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payout Percentage</label>
                                <input type="number" value={newRule.payout_percentage} onChange={(e) => setNewRule({...newRule, payout_percentage: e.target.value})} placeholder="e.g. 100" className={inputClass} />
                            </div>
                            <button onClick={handleAddRule} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 mt-2">
                                Deploy Rule
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RuleConfig;
