import React, { useState, useEffect } from 'react';
import { Activity, CloudLightning, Wind, MapPin, BellRing, CheckCircle, ChevronRight } from 'lucide-react';

const LiveMonitoring = () => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show notification shortly after component mounts
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="monitoring" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Col: Live Map/Status */}
        <div className="flex-1 bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 border border-slate-800 shadow-[0_0_15px_rgba(34,211,238,0.1)] relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Activity className="text-cyan-400 animate-pulse drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" /> Live Monitoring
            </h2>
            <span className="px-3 py-1 bg-emerald-900/50 text-emerald-400 text-xs font-bold rounded-full border border-emerald-800/50 uppercase tracking-widest flex items-center gap-1 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 rounded-full animate-ping"></span>
              Live Link
            </span>
          </div>

          <div className="bg-slate-950 relative h-64 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center shadow-inner">
            {/* Mock Map Background */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-cyan-900 mix-blend-screen"></div>
            
            <div className="relative z-10 p-4 bg-slate-800/90 backdrop-blur-sm rounded-xl border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)] flex flex-col items-center gap-2 animate-bounce cursor-pointer hover:bg-slate-800 transition-colors">
              <MapPin className="text-cyan-400 w-8 h-8 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="font-bold text-slate-100">Your Zone (Zone 4)</span>
              <span className="text-sm text-slate-400">Koramangala, BLR</span>
            </div>
            
            {/* Severe Weather Indicator on map */}
            <div className="absolute top-8 left-8 p-3 rounded-full bg-red-900/80 text-red-400 shadow-[0_0_20px_rgba(248,113,113,0.5)] border border-red-800 animate-pulse">
              <CloudLightning className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Right Col: Current Sensors & Notifications */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-slate-800 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-sm border-b border-slate-700 pb-2">Sensor Data</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 transition-colors cursor-default group border border-transparent hover:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-900/30 text-red-400 rounded-lg group-hover:bg-red-900/50 transition-colors border border-red-900/50">
                    <CloudLightning className="w-5 h-5 drop-shadow-[0_0_5px_rgba(248,113,113,0.8)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200">Weather</p>
                    <p className="text-xs text-slate-400">65mm/hr Rain Detected</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400 font-bold text-sm bg-red-950 px-2 py-1 rounded border border-red-900/50">Critical</span>
                  <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,1)] animate-pulse"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 transition-colors cursor-default group border border-transparent hover:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-900/30 text-yellow-400 rounded-lg group-hover:bg-yellow-900/50 transition-colors border border-yellow-900/50">
                    <Wind className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200">AQI Data</p>
                    <p className="text-xs text-slate-400">Level: 310 (Hazardous)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-bold text-sm bg-yellow-950 px-2 py-1 rounded border border-yellow-900/50">High</span>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-[0_0_8px_rgba(234,179,8,1)]"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 transition-colors cursor-default group border border-transparent hover:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-900/30 text-cyan-400 rounded-lg group-hover:bg-cyan-900/50 transition-colors border border-cyan-900/50">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200">Delivery Activity</p>
                    <p className="text-xs text-slate-400">Demand: Low (Zone Locked)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold text-sm bg-cyan-950 px-2 py-1 rounded border border-cyan-900/50">Safe</span>
                  <div className="w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,1)]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Payout Notification Section inline */}
          <div className="h-32 relative">
            {showNotification && (
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.4)] border border-cyan-400/50 flex items-center p-6 text-white transform transition-all duration-500 translate-y-0 opacity-100 hover:scale-[1.02] cursor-pointer">
                <div className="flex justify-between w-full items-center">
                  <div className="flex gap-4 items-center">
                    <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.3)] border border-white/30">
                      <BellRing className="w-6 h-6 animate-wiggle text-yellow-300 drop-shadow-[0_0_5px_rgba(253,224,71,0.8)]" />
                    </div>
                    <div>
                      <h4 className="font-bold flex items-center gap-2 text-lg">
                        Instant Claim Approved <CheckCircle className="w-5 h-5 text-emerald-300" />
                      </h4>
                      <p className="text-cyan-50 text-sm mt-1">₹250 credited due to heavy rain disruption in Zone 4.</p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 opacity-60" />
                </div>
              </div>
            )}
            {!showNotification && (
              <div className="h-full flex items-center justify-center text-slate-500 border-2 border-dashed border-slate-700/50 rounded-2xl bg-slate-900/50 font-medium">
                Listening for risk events...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveMonitoring;
