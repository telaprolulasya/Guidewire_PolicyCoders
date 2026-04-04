import React, { useState } from 'react';
import { CloudRain, Wind, ShoppingBag, CheckCircle, AlertTriangle, Zap, Play, Info } from 'lucide-react';
import api from '../api';

const SimulationPanel = ({ onTrigger, isSimulating }) => {
  const [activeSimulation, setActiveSimulation] = useState(null);

  const triggerEvent = async (type, label) => {
    setActiveSimulation(type);
    try {
      let location = 'Bangalore';
      let eventPayload = {};

      if (type === 'rain') {
        eventPayload = { rain: 70, aqi: 120, orders: 10, location };
      } else if (type === 'pollution') {
        eventPayload = { rain: 10, aqi: 420, orders: 12, location };
      } else if (type === 'low_activity') {
        eventPayload = { rain: 0, aqi: 150, orders: 3, location };
      } else if (type === 'normal') {
        eventPayload = { rain: 20, aqi: 150, orders: 15, location };
      }

      await api.post('/admin/trigger-event', eventPayload);
      onTrigger();
    } catch (error) {
      console.error('Trigger error', error);
    } finally {
      setTimeout(() => setActiveSimulation(null), 1000);
    }
  };

  const simulateFraud = async () => {
    setActiveSimulation('fraud');
    try {
      await api.post('/admin/trigger-event', { rain: 80, aqi: 100, orders: 10, location: 'Delhi' });
      // Use existing API structure
      await api.post('/ai/payout', { workerId: '65fa00000000000000001234', disruptionSeverity: 'High' });
      onTrigger();
    } catch (error) {
       onTrigger();
    } finally {
      setTimeout(() => setActiveSimulation(null), 1000);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Climate Disruption Section */}
        <div className="bg-slate-900/40 border border-slate-700/50 rounded-3xl p-6 backdrop-blur-md">
           <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-blue-500/10 rounded-xl"><CloudRain className="text-blue-400" /></div>
             <div>
               <h3 className="text-lg font-bold text-white">Climate Scenarios</h3>
               <p className="text-slate-500 text-xs">Simulate environmental triggers</p>
             </div>
           </div>

           <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => triggerEvent('rain', 'Heavy Rainfall')}
                disabled={isSimulating}
                className="group relative flex items-center justify-between p-4 bg-slate-800/50 hover:bg-blue-600/10 border border-slate-700 hover:border-blue-500/50 rounded-2xl transition-all overflow-hidden"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-700 group-hover:bg-blue-500 group-hover:text-white rounded-xl transition-colors">
                    <CloudRain size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-200">Heavy Rainfall</p>
                    <p className="text-[10px] text-slate-500 font-medium">Trigger 70mm rain event</p>
                  </div>
                </div>
                {activeSimulation === 'rain' && <div className="animate-ping w-2 h-2 rounded-full bg-blue-500"></div>}
              </button>

              <button 
                onClick={() => triggerEvent('pollution', 'Severe AQI')}
                disabled={isSimulating}
                className="group relative flex items-center justify-between p-4 bg-slate-800/50 hover:bg-purple-600/10 border border-slate-700 hover:border-purple-500/50 rounded-2xl transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-700 group-hover:bg-purple-500 group-hover:text-white rounded-xl transition-colors">
                    <Wind size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-200">Severe AQI</p>
                    <p className="text-[10px] text-slate-500 font-medium">Simulate 400+ air index</p>
                  </div>
                </div>
                {activeSimulation === 'pollution' && <div className="animate-ping w-2 h-2 rounded-full bg-purple-500"></div>}
              </button>
           </div>
        </div>

        {/* Economic / Operational Section */}
        <div className="bg-slate-900/40 border border-slate-700/50 rounded-3xl p-6 backdrop-blur-md">
           <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-orange-500/10 rounded-xl"><ShoppingBag className="text-orange-400" /></div>
             <div>
               <h3 className="text-lg font-bold text-white">Market Signals</h3>
               <p className="text-slate-500 text-xs">Simulate activity fluctuations</p>
             </div>
           </div>

           <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => triggerEvent('low_activity', 'Order Drop')}
                disabled={isSimulating}
                className="group relative flex items-center justify-between p-4 bg-slate-800/50 hover:bg-orange-600/10 border border-slate-700 hover:border-orange-500/50 rounded-2xl transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-700 group-hover:bg-orange-500 group-hover:text-white rounded-xl transition-colors">
                    <ShoppingBag size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-200">Low Job Density</p>
                    <p className="text-[10px] text-slate-500 font-medium">Trigger &lt;5 orders/hr signal</p>
                  </div>
                </div>
                {activeSimulation === 'low_activity' && <div className="animate-ping w-2 h-2 rounded-full bg-orange-500"></div>}
              </button>

              <button 
                onClick={() => triggerEvent('normal', 'Normalize')}
                disabled={isSimulating}
                className="group relative flex items-center justify-between p-4 bg-slate-800/50 hover:bg-green-600/10 border border-slate-700 hover:border-green-500/50 rounded-2xl transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-700 group-hover:bg-green-500 group-hover:text-white rounded-xl transition-colors">
                    <CheckCircle size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-200">Reset System</p>
                    <p className="text-[10px] text-slate-500 font-medium">Restore baseline conditions</p>
                  </div>
                </div>
                {activeSimulation === 'normal' && <div className="animate-ping w-2 h-2 rounded-full bg-green-500"></div>}
              </button>
           </div>
        </div>
      </div>

      {/* Safety & Adversarial Section */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white">Trust & Safety Test</h4>
              <p className="text-xs text-slate-500 font-medium">Simulate adversarial location mismatch claim</p>
            </div>
          </div>
          <button 
            onClick={simulateFraud}
            disabled={isSimulating}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-red-900/20 active:scale-95 disabled:opacity-50"
          >
            {activeSimulation === 'fraud' ? 'Evaluating...' : 'Trigger Fraud Simulation'}
          </button>
        </div>
      </div>

      {/* AI Decision Indicator */}
      <div className="p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl flex items-center gap-3">
        <Info size={16} className="text-indigo-400" />
        <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
          The engine automatically evaluates rules locally and persists payouts to the blockchain simulator.
        </p>
      </div>
    </div>
  );
};

export default SimulationPanel;
