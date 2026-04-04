import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, ShieldAlert, LayoutDashboard, Sliders, Shield, Play } from 'lucide-react';
import api from '../api';

// Components
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
  const [activeTab, setActiveTab] = useState('overview'); // overview, rules, payouts, simulation

  const fetchAdminData = async () => {
    try {
      const adminRes = await api.get('/admin/overview');
      setAdminStats(adminRes.data);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      // Fallback data if backend is not running yet
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
    setTimeout(() => {
      fetchAdminData();
      setIsSimulating(false);
    }, 800);
  };

  if (!adminStats) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-indigo-500/30 pb-12 overflow-x-hidden pt-[88px]">
      
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[88px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-2.5 rounded-2xl shadow-lg shadow-indigo-500/20 cursor-pointer" onClick={() => navigate('/')}>
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight cursor-pointer" onClick={() => navigate('/')}>
                GigGuard AI
              </h1>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mt-0.5">Admin Console</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 shadow-inner">
                <ShieldAlert size={16} className="text-amber-500" />
                <span className="text-sm font-bold text-slate-200">System Admin</span>
              </div>
              <button 
                onClick={() => navigate('/')} 
                className="text-slate-400 hover:text-red-400 transition bg-slate-800/50 hover:bg-slate-800 p-2.5 rounded-full"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="lg:w-64 flex-shrink-0 space-y-2">
            <nav className="sticky top-28 space-y-2">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition font-medium ${activeTab === 'overview' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-inner' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'}`}
                >
                    <LayoutDashboard size={20} /> Dashboard & Risks
                </button>
                <button 
                  onClick={() => setActiveTab('rules')}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition font-medium ${activeTab === 'rules' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-inner' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'}`}
                >
                    <Sliders size={20} /> Parametric Config
                </button>
                <button 
                  onClick={() => setActiveTab('payouts')}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition font-medium ${activeTab === 'payouts' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-inner' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'}`}
                >
                    <Shield size={20} /> Fraud & Workers
                </button>
                <button 
                  onClick={() => setActiveTab('simulation')}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition font-medium mt-8 border-dashed ${activeTab === 'simulation' ? 'bg-purple-600/10 text-purple-400 border-purple-500/30 shadow-inner' : 'text-slate-500 hover:bg-slate-800 hover:text-purple-400 border-slate-700'}`}
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
                        <h2 className="text-3xl font-black text-white tracking-tight mb-2 font-display">Global Overview</h2>
                        <p className="text-slate-400 text-lg">System-wide monitoring of workers, payouts, and risks.</p>
                    </div>
                    {/* Weather API Integration */}
                    <WeatherChecker />
                    {/* Re-use the existing Admin component here for the top stats */}
                    <Admin stats={adminStats} />
                    <RiskMonitoring />
                </div>
            )}

            {activeTab === 'rules' && (
                <div className="space-y-8 fade-in">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight mb-2">Rule Engine & Plans</h2>
                        <p className="text-slate-400 text-lg">Configure AI-driven parametric triggers and worker subscription plans.</p>
                    </div>
                    <RuleConfig />
                </div>
            )}

            {activeTab === 'payouts' && (
                <div className="space-y-8 fade-in">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight mb-2">Trust & Safety</h2>
                        <p className="text-slate-400 text-lg">Monitor automated payouts and flag suspicious activities.</p>
                    </div>
                    <FraudAndWorkers />
                </div>
            )}

            {activeTab === 'simulation' && (
                <div className="space-y-8 fade-in">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight mb-2">Event Simulator (Dev)</h2>
                        <p className="text-slate-400 text-lg">Trigger weather or activity events to test the smart contract engine.</p>
                    </div>
                    <div className="bg-slate-800/80 rounded-3xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-2">Test Environment</h3>
                            <p className="text-slate-400 mb-8 max-w-2xl">Use these controls to simulate real-world API triggers (e.g., Heavy Rain reported by OpenWeather). The engine will automatically evaluate rules and process mock payouts.</p>
                            <SimulationPanel onTrigger={handleTrigger} isSimulating={isSimulating} />
                        </div>
                    </div>
                </div>
            )}
        </div>
      </main>

      {/* Global CSS for fade-in effect added directly for convenience */}
      <style dangerouslySetInnerHTML={{__html: `
        .fade-in {
            animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default AdminDashboard;
