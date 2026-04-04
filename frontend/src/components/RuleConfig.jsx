import React, { useState, useEffect } from 'react';
import api from '../api';
import { Settings, Zap, Edit2, Play, Save, X, PlusCircle, Trash2, ArrowRight } from 'lucide-react';

const RuleConfig = () => {
    const [rules, setRules] = useState([]);
    const [plans, setPlans] = useState([]);
    const [isAddingRule, setIsAddingRule] = useState(false);
    const [newRule, setNewRule] = useState({
        metric: 'Rain',
        condition: '>',
        threshold: '',
        payout_percentage: ''
    });

    useEffect(() => {
        // Fetch rules
        api.get('/admin/rules').then(res => setRules(res.data)).catch(() => {});
        // Fetch plans
        api.get('/admin/plans').then(res => setPlans(res.data)).catch(() => {});
    }, []);

    // Provide mock fallback data if backend is offline
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
        const ruleToAdd = { 
            id: Date.now(), 
            ...newRule, 
            threshold: Number(newRule.threshold), 
            payout_percentage: Number(newRule.payout_percentage) 
        };
        setRules([ruleToAdd, ...displayRules]);
        setIsAddingRule(false);
        setNewRule({ metric: 'Rain', condition: '>', threshold: '', payout_percentage: '' });
    };

    const handleDeleteRule = (id) => {
        setRules(displayRules.filter(r => r.id !== id));
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Rule Configuration - Core Logic */}
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-[40px] p-8 md:p-10 relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-500 shadow-2xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 relative z-10">
                    <div>
                        <h3 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight font-display">
                            <div className="p-2 bg-yellow-400/10 rounded-xl">
                                <Zap className="text-yellow-400 fill-current" size={24} />
                            </div>
                            Parametric Engine
                        </h3>
                        <p className="text-slate-400 mt-2 font-medium">Define smart contract triggers for automated worker payouts.</p>
                    </div>
                    <button 
                        onClick={() => setIsAddingRule(true)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2 active:scale-95 group/btn"
                    >
                        <PlusCircle size={18} className="group-hover/btn:rotate-90 transition-transform" />
                        New Rule
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {displayRules.map((rule) => (
                        <div key={rule.id} className="bg-slate-900/60 border border-slate-700/50 p-6 rounded-[32px] hover:border-indigo-500/50 hover:bg-slate-900 transition-all duration-300 group/card relative">
                            <div className="flex justify-between items-start mb-6">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    rule.metric === 'Rain' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                                    rule.metric === 'AQI' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                                    'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                                }`}>
                                    {rule.metric} Trigger
                                </span>
                                <button 
                                    onClick={() => handleDeleteRule(rule.id)}
                                    className="p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover/card:opacity-100 transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="flex items-baseline gap-2 my-4">
                                <span className="text-5xl font-black text-white tracking-tighter">{rule.condition}{rule.threshold}</span>
                                <span className="text-slate-500 font-bold text-sm tracking-tight">
                                    {rule.metric === 'Rain' ? 'mm/hr' : (rule.metric === 'AQI' ? 'index' : 'deliveries')}
                                </span>
                            </div>
                            <div className="mt-6 pt-6 border-t border-slate-700/50 flex justify-between items-center">
                                <div>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Contract Payout</p>
                                    <p className="text-xl font-black text-green-400 tracking-tight">{rule.payout_percentage}% <span className="text-[10px] text-slate-600 uppercase">Fixed</span></p>
                                </div>
                                <div className="p-2 bg-slate-800 rounded-xl group-hover/card:bg-indigo-600 transition-colors">
                                    <ArrowRight size={16} className="text-slate-600 group-hover/card:text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Plan Management */}
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-[40px] p-8 relative overflow-hidden shadow-2xl">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h3 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight font-display">
                            <div className="p-2 bg-slate-700/50 rounded-xl font-display">
                                <Settings className="text-slate-400" size={24} />
                            </div>
                            Coverage Plans
                        </h3>
                        <p className="text-slate-400 mt-2 font-medium">Configure subscription tiers and maximum coverage ceilings.</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-700/50">
                                <th className="pb-5 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Tier Name</th>
                                <th className="pb-5 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Weekly Premium</th>
                                <th className="pb-5 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Max Limit</th>
                                <th className="pb-5 px-6 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/30">
                            {displayPlans.map((plan) => (
                                <tr key={plan.id} className="hover:bg-slate-700/10 transition-colors group/row">
                                    <td className="py-6 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-8 rounded-full bg-indigo-500/40 group-hover/row:bg-indigo-500 transition-colors"></div>
                                            <span className="text-lg font-black text-white tracking-tight">{plan.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6 font-bold text-slate-300">₹{plan.price}</td>
                                    <td className="py-6 px-6 font-bold text-slate-300">₹{plan.coverage_limit}</td>
                                    <td className="py-6 px-6 text-right">
                                        <span className="px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-green-500/20">Live</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* New Rule Modal */}
            {isAddingRule && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div 
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setIsAddingRule(false)}
                    ></div>
                    <div className="relative bg-slate-900 border border-slate-700 rounded-[40px] p-10 max-w-lg w-full shadow-[0_0_50px_rgba(79,70,229,0.15)] animate-in zoom-in-95 duration-200">
                        <button 
                            onClick={() => setIsAddingRule(false)}
                            className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-3xl font-black text-white tracking-tight font-display mb-2">Create Rule</h3>
                        <p className="text-slate-500 font-medium text-sm mb-10 uppercase tracking-widest">New parametric logic</p>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Metric</label>
                                    <select 
                                        value={newRule.metric}
                                        onChange={(e) => setNewRule({...newRule, metric: e.target.value})}
                                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
                                    >
                                        <option value="Rain">Rainfall</option>
                                        <option value="AQI">Air Quality</option>
                                        <option value="Orders">Volume</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Logic</label>
                                    <select 
                                        value={newRule.condition}
                                        onChange={(e) => setNewRule({...newRule, condition: e.target.value})}
                                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
                                    >
                                        <option value=">">Greater than</option>
                                        <option value="<">Less than</option>
                                        <option value="=">Equals</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Threshold Value</label>
                                <input 
                                    type="number"
                                    value={newRule.threshold}
                                    onChange={(e) => setNewRule({...newRule, threshold: e.target.value})}
                                    placeholder="Enter limit (e.g. 50)"
                                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Payout Percentage</label>
                                <input 
                                    type="number"
                                    value={newRule.payout_percentage}
                                    onChange={(e) => setNewRule({...newRule, payout_percentage: e.target.value})}
                                    placeholder="Enter % (e.g. 100)"
                                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                                />
                            </div>

                            <button 
                                onClick={handleAddRule}
                                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95 mt-4"
                            >
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
