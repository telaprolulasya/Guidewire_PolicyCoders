import React, { useState } from 'react';
import { CloudRain, Wind, ShoppingBag, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import api from '../api';

const SimulationPanel = ({ onTrigger, isSimulating }) => {
  const [activeSimulation, setActiveSimulation] = useState(null);

  const triggerEvent = async (type) => {
    setActiveSimulation(type);
    try {
      let location = 'Bangalore';
      let eventPayload = {};
      if (type === 'rain')         eventPayload = { rain: 70, aqi: 120, orders: 10, location };
      else if (type === 'pollution')    eventPayload = { rain: 10, aqi: 420, orders: 12, location };
      else if (type === 'low_activity') eventPayload = { rain: 0,  aqi: 150, orders: 3,  location };
      else if (type === 'normal')       eventPayload = { rain: 20, aqi: 150, orders: 15, location };
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
      await api.post('/ai/payout', { workerId: '65fa00000000000000001234', disruptionSeverity: 'High' });
      onTrigger();
    } catch (error) {
      onTrigger();
    } finally {
      setTimeout(() => setActiveSimulation(null), 1000);
    }
  };

  const ScenarioBtn = ({ type, icon, label, sub, activeColor }) => (
    <button
      onClick={() => triggerEvent(type)}
      disabled={isSimulating}
      className={`group flex items-center justify-between p-4 bg-slate-50 hover:bg-${activeColor}-50 border border-slate-200 hover:border-${activeColor}-200 rounded-2xl transition-all w-full disabled:opacity-50`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-2 bg-white border border-slate-200 group-hover:bg-${activeColor}-100 group-hover:border-${activeColor}-200 rounded-xl transition-colors`}>
          {icon}
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-slate-700">{label}</p>
          <p className="text-[10px] text-slate-400 font-medium">{sub}</p>
        </div>
      </div>
      {activeSimulation === type && <div className={`animate-ping w-2 h-2 rounded-full bg-${activeColor}-500`}></div>}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Climate Section */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-xl"><CloudRain className="text-blue-500" /></div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Climate Scenarios</h3>
              <p className="text-slate-400 text-xs">Simulate environmental triggers</p>
            </div>
          </div>
          <div className="space-y-3">
            <ScenarioBtn type="rain" icon={<CloudRain size={20} className="text-blue-500" />} label="Heavy Rainfall" sub="Trigger 70mm rain event" activeColor="blue" />
            <ScenarioBtn type="pollution" icon={<Wind size={20} className="text-purple-500" />} label="Severe AQI" sub="Simulate 400+ air index" activeColor="purple" />
          </div>
        </div>

        {/* Market Signals */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 rounded-xl"><ShoppingBag className="text-orange-500" /></div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Market Signals</h3>
              <p className="text-slate-400 text-xs">Simulate activity fluctuations</p>
            </div>
          </div>
          <div className="space-y-3">
            <ScenarioBtn type="low_activity" icon={<ShoppingBag size={20} className="text-orange-500" />} label="Low Job Density" sub="Trigger <5 orders/hr signal" activeColor="orange" />
            <ScenarioBtn type="normal" icon={<CheckCircle size={20} className="text-green-500" />} label="Reset System" sub="Restore baseline conditions" activeColor="green" />
          </div>
        </div>
      </div>

      {/* Fraud section */}
      <div className="bg-red-50 border border-red-200 rounded-3xl p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-500 rounded-2xl border border-red-200">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Trust & Safety Test</h4>
              <p className="text-xs text-slate-500 font-medium">Simulate adversarial location mismatch claim</p>
            </div>
          </div>
          <button
            onClick={simulateFraud}
            disabled={isSimulating}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-red-100 active:scale-95 disabled:opacity-50"
          >
            {activeSimulation === 'fraud' ? 'Evaluating...' : 'Trigger Fraud Simulation'}
          </button>
        </div>
      </div>

      {/* Info bar */}
      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center gap-3">
        <Info size={16} className="text-indigo-500 flex-shrink-0" />
        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
          The engine automatically evaluates rules locally and persists payouts to the blockchain simulator.
        </p>
      </div>
    </div>
  );
};

export default SimulationPanel;
