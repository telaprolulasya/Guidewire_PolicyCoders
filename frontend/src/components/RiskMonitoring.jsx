import React, { useState, useEffect } from 'react';
import api from '../api';
import { CloudRain, Wind, Thermometer, ShieldAlert, AlertTriangle, AlertCircle } from 'lucide-react';

const RiskMonitoring = () => {
    const [riskData, setRiskData] = useState([]);
    const [disruptions, setDisruptions] = useState([]);

    useEffect(() => {
        api.get('/admin/risk').then(res => setRiskData(res.data)).catch(() => {});
        api.get('/admin/disruptions').then(res => setDisruptions(res.data)).catch(() => {});
    }, []);

    const displayRisk = riskData.length ? riskData : [
        { name: 'Mumbai', rain: 120, temp: 28, aqi: 180, riskLevel: 'High' },
        { name: 'Delhi', rain: 10, temp: 42, aqi: 350, riskLevel: 'High' },
        { name: 'Bangalore', rain: 30, temp: 25, aqi: 90, riskLevel: 'Low' },
        { name: 'Hyderabad', rain: 60, temp: 30, aqi: 150, riskLevel: 'Medium' }
    ];

    const displayDisruptions = disruptions.length ? disruptions : [
        { city: 'Mumbai', type: 'Severe Flood', severity: 'Critical' },
        { city: 'Delhi', type: 'Toxic Smog', severity: 'High' }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Active Disruptions Panel */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <h3 className="text-2xl font-bold text-red-400 flex items-center gap-2 mb-6">
                    <AlertTriangle className="animate-pulse" /> Active Disruption Alerts
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {displayDisruptions.map((dis, idx) => (
                        <div key={idx} className="bg-slate-900/80 border border-red-500/40 p-5 rounded-2xl flex justify-between items-center shadow-lg shadow-red-900/20">
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">{dis.city} <span className="text-slate-400 font-normal text-sm">— {dis.severity} Impact</span></h4>
                                <p className="text-red-400 font-medium text-sm uppercase tracking-wider">{dis.type}</p>
                            </div>
                            <div className="h-12 w-12 bg-red-500/20 rounded-full flex items-center justify-center text-red-500">
                                <ShieldAlert size={24} />
                            </div>
                        </div>
                    ))}
                    {displayDisruptions.length === 0 && (
                       <div className="text-green-400 font-medium flex items-center gap-2">
                           <ShieldAlert size={20} className="text-green-400" />
                           No active disruptions worldwide. System nominal.
                       </div>
                    )}
                </div>
            </div>

            {/* City-wise Risk ML Monitoring */}
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-3xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">🌍 AI Risk Telemetry</h3>
                        <p className="text-slate-400 mt-1">Real-time environmental risk scoring from OpenWeather & ML models.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {displayRisk.map((city, idx) => (
                        <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-slate-500 transition-all duration-300">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-white font-bold text-xl">{city.name}</h4>
                                <span className={`px-2 py-1 text-xs font-bold rounded-lg ${city.riskLevel === 'High' ? 'bg-red-500/20 text-red-400' : city.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                                    {city.riskLevel} Risk
                                </span>
                            </div>
                            
                            <div className="space-y-3 mt-5">
                                <div className="flex justify-between items-center text-slate-300">
                                    <span className="flex items-center gap-2 text-sm text-slate-400"><CloudRain size={16} className="text-blue-400" /> Rain</span>
                                    <span className="font-semibold">{city.rain} mm</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-300">
                                    <span className="flex items-center gap-2 text-sm text-slate-400"><Wind size={16} className="text-teal-400" /> AQI</span>
                                    <span className={`font-semibold ${city.aqi > 200 ? 'text-red-400' : ''}`}>{city.aqi}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-300">
                                    <span className="flex items-center gap-2 text-sm text-slate-400"><Thermometer size={16} className="text-orange-400" /> Temp</span>
                                    <span className="font-semibold">{city.temp}°C</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RiskMonitoring;
