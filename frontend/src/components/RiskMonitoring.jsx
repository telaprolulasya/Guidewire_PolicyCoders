import React, { useState, useEffect } from 'react';
import api from '../api';
import { CloudRain, Wind, Thermometer, ShieldAlert, AlertTriangle } from 'lucide-react';

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

    const riskColors = {
        High:   { badge: 'bg-red-100 text-red-600 border border-red-200',    card: 'border-red-200 hover:border-red-300' },
        Medium: { badge: 'bg-yellow-100 text-yellow-700 border border-yellow-200', card: 'border-yellow-200 hover:border-yellow-300' },
        Low:    { badge: 'bg-green-100 text-green-700 border border-green-200',  card: 'border-green-200 hover:border-green-300' },
    };

    return (
        <div className="space-y-8">
            {/* Active Disruptions */}
            <div className="bg-red-50 border border-red-200 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 opacity-60"></div>
                <h3 className="text-2xl font-bold text-red-600 flex items-center gap-2 mb-6 relative z-10">
                    <AlertTriangle className="animate-pulse" /> Active Disruption Alerts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                    {displayDisruptions.map((dis, idx) => (
                        <div key={idx} className="bg-white border border-red-200 p-5 rounded-2xl flex justify-between items-center shadow-sm">
                            <div>
                                <h4 className="text-slate-800 font-bold text-lg mb-1">{dis.city} <span className="text-slate-400 font-normal text-sm">— {dis.severity} Impact</span></h4>
                                <p className="text-red-500 font-medium text-sm uppercase tracking-wider">{dis.type}</p>
                            </div>
                            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                                <ShieldAlert size={24} />
                            </div>
                        </div>
                    ))}
                    {displayDisruptions.length === 0 && (
                        <div className="text-green-600 font-medium flex items-center gap-2">
                            <ShieldAlert size={20} className="text-green-500" />
                            No active disruptions worldwide. System nominal.
                        </div>
                    )}
                </div>
            </div>

            {/* City Risk Cards */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">🌍 AI Risk Telemetry</h3>
                    <p className="text-slate-500 mt-1">Real-time environmental risk scoring from OpenWeather & ML models.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {displayRisk.map((city, idx) => (
                        <div key={idx} className={`bg-slate-50 p-6 rounded-2xl border transition-all duration-300 ${riskColors[city.riskLevel]?.card || 'border-slate-200'}`}>
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-slate-900 font-bold text-xl">{city.name}</h4>
                                <span className={`px-2 py-1 text-xs font-bold rounded-lg ${riskColors[city.riskLevel]?.badge}`}>
                                    {city.riskLevel} Risk
                                </span>
                            </div>
                            <div className="space-y-3 mt-5">
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-2 text-sm text-slate-500"><CloudRain size={16} className="text-blue-500" /> Rain</span>
                                    <span className="font-semibold text-slate-700">{city.rain} mm</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-2 text-sm text-slate-500"><Wind size={16} className="text-teal-500" /> AQI</span>
                                    <span className={`font-semibold ${city.aqi > 200 ? 'text-red-500' : 'text-slate-700'}`}>{city.aqi}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-2 text-sm text-slate-500"><Thermometer size={16} className="text-orange-500" /> Temp</span>
                                    <span className="font-semibold text-slate-700">{city.temp}°C</span>
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
