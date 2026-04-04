import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, ShieldAlert, LayoutDashboard, Sliders, Shield, Play } from 'lucide-react';
import api from '../api';

import Admin from '../components/Admin';
import SimulationPanel from '../components/SimulationPanel';
import RuleConfig from '../components/RuleConfig';
import RiskMonitoring from '../components/RiskMonitoring';
import FraudAndWorkers from '../components/FraudAndWorkers';
import WeatherChecker from '../components/WeatherChecker';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminStats, setAdminStats] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchAdminData = async () => {
    try {
      const adminRes = await api.get('/admin/overview');
      setAdminStats(adminRes.data);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      if (!adminStats) {
        setAdminStats({
          totalWorkers: 1420,
          activePolicies: 1420,
          totalPayouts: 85200,
          activeDisruptions: 2,
          fraudAlerts: 4
        });
      }
    }
  };

  useEffect(() => {
    fetchAdminData();
    const interval = setInterval(fetchAdminData, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleTrigger = () => {
    setIsSimulating(true);
    setTimeout(() => { fetchAdminData(); setIsSimulating(false); }, 800);
  };

  if (!adminStats) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12 overflow-x-hidden pt-[88px]">

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-slate-200 fixed top-0 w-full z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[88px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-2.5 rounded-2xl shadow-lg shadow-indigo-200 cursor-pointer" onClick={() => navigate('/')}>
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight cursor-pointer" onClick={() => navigate('/')}>
                GigGuard AI
              </h1>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mt-0.5">Admin Console</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200">
              <ShieldAlert size={16} className="text-amber-500" />
              <span className="text-sm font-bold text-slate-700">System Admin</span>
            </div>
            <button onClick={() => navigate('/')} className="text-slate-400 hover:text-red-500 transition bg-slate-100 hover:bg-red-50 p-2.5 rounded-full">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="sticky top-28 space-y-2">
            {[
              { id: 'overview', label: 'Dashboard & Risks', icon: <LayoutDashboard size={20} /> },
              { id: 'rules',    label: 'Parametric Config', icon: <Sliders size={20} /> },
              { id: 'payouts',  label: 'Fraud & Workers',   icon: <Shield size={20} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition font-medium border ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 text-indigo-600 border-indigo-200 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 border-transparent'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
            <button
              onClick={() => setActiveTab('simulation')}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition font-medium mt-6 border border-dashed ${
                activeTab === 'simulation'
                  ? 'bg-purple-50 text-purple-600 border-purple-300 shadow-sm'
                  : 'text-slate-400 hover:bg-purple-50 hover:text-purple-600 border-slate-200'
              }`}
            >
              <Play size={20} /> Run Simulation
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 w-full min-w-0">

          {activeTab === 'overview' && (
            <div className="space-y-8 fade-in">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1 font-display">Global Overview</h2>
                <p className="text-slate-500 text-lg">System-wide monitoring of workers, payouts, and risks.</p>
              </div>
              <WeatherChecker />
              <Admin stats={adminStats} />
              <RiskMonitoring />
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-8 fade-in">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Rule Engine & Plans</h2>
                <p className="text-slate-500 text-lg">Configure AI-driven parametric triggers and worker subscription plans.</p>
              </div>
              <RuleConfig />
            </div>
          )}

          {activeTab === 'payouts' && (
            <div className="space-y-8 fade-in">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Trust & Safety</h2>
                <p className="text-slate-500 text-lg">Monitor automated payouts and flag suspicious activities.</p>
              </div>
              <FraudAndWorkers />
            </div>
          )}

          {activeTab === 'simulation' && (
            <div className="space-y-8 fade-in">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Event Simulator (Dev)</h2>
                <p className="text-slate-500 text-lg">Trigger weather or activity events to test the smart contract engine.</p>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/60 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Test Environment</h3>
                  <p className="text-slate-500 mb-8 max-w-2xl">Use these controls to simulate real-world API triggers. The engine will automatically evaluate rules and process mock payouts.</p>
                  <SimulationPanel onTrigger={handleTrigger} isSimulating={isSimulating} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .fade-in { animation: fadeIn 0.4s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
};

export default AdminDashboard;
