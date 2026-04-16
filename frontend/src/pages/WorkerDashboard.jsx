import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import Plans from '../components/Plans';
import LiveMonitoring from '../components/LiveMonitoring';
import AIFeatures from '../components/AIFeatures';
import Workflow from '../components/Workflow';
import RiskTrend from '../components/RiskTrend';
import PayoutHistory from '../components/PayoutHistory';
import { Bell, Zap, Activity, ShieldCheck, History as HistoryIcon, User, CheckCircle2 } from 'lucide-react';

const WorkerDashboard = () => {
  const [showPayout, setShowPayout] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('Basic');
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [worker, setWorker] = useState({ name: 'Ravi Kumar', location: 'Bangalore', role: 'Delivery Partner' });

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        setWorker(JSON.parse(savedUser));
    }
  }, []);

  const plansInfo = {
    'Basic': '₹20',
    'Standard': '₹30',
    'Premium': '₹40'
  };

  const showStatus = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const [aiData, setAiData] = useState({ riskLevel: 'High', riskScore: 8 });

  // Mock data for the demo
  const mockData = {
    rain: 60,
    aqi: 420,
    orders: "Low"
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20 selection:bg-blue-100 selection:text-blue-900">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[120px] animate-pulse-soft"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] bg-purple-100/30 rounded-full blur-[100px] animate-pulse-soft"></div>
      </div>

      <Navbar 
        workerName={worker.name} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 relative">
        
        {/* Global Notification Toast */}
        {notification && (
          <div className={`fixed top-24 right-4 z-[100] animate-in slide-in-from-right-10 fade-in duration-300`}>
            <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
              notification.type === 'success' 
                ? 'bg-white border-green-100 text-green-800' 
                : 'bg-white border-blue-100 text-blue-800'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                notification.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                <CheckCircle2 size={18} />
              </div>
              <p className="text-sm font-black tracking-tight">{notification.msg}</p>
            </div>
          </div>
        )}

        {/* Payout Notification */}
        {showPayout && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-5 shadow-2xl shadow-blue-200 relative overflow-hidden animate-in fade-in slide-in-from-top-6 duration-700 group">
            <div className="absolute top-[-50%] right-[-10%] opacity-15 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
              <Bell size={180} />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-5">
                <div className="flex-shrink-0 w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 animate-pulse shadow-lg group-hover:scale-110 transition-transform">
                  <Zap className="text-white w-7 h-7 fill-current" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-white font-black text-xl tracking-tight font-display">Instant Payout Credited!</h3>
                  <p className="text-blue-100/90 text-sm font-bold tracking-tight">₹200 credited to your account due to heavy rain disruption in Bangalore.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPayout(false)}
                className="px-6 py-2.5 bg-white text-blue-700 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/10"
              >
                Dismiss notification
              </button>
            </div>
          </div>
        )}

        {/* Conditional Rendering based on activeTab */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
            {/* Top Section: Dashboard Profile & Plans */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 h-full">
                <Dashboard 
                  name={worker.name}
                  location={worker.location || 'Bangalore'}
                  role={worker.platform || 'Delivery Partner'}
                  premium={plansInfo[selectedPlan]}
                  riskLevel={aiData?.riskLevel || 'Low'}
                  coverageStatus={`Protected • ${selectedPlan}`}
                  lastPayout="₹200 (Apr 2, 2026)"
                />
              </div>
              <div className="lg:col-span-8 h-full">
                <RiskTrend />
              </div>
            </div>

            {/* AI Insights Section */}
            <AIFeatures mockData={mockData} />

            {/* Live Monitoring Section */}
            <LiveMonitoring data={mockData} />

            {/* Workflow Section (How It Works) */}
            <Workflow />
          </div>
        )}

        {activeTab === 'Policies' && (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
             <Plans 
              activePlan={selectedPlan} 
              onPlanSelect={(plan) => {
                setSelectedPlan(plan);
                showStatus(`Plan upgraded to ${plan} successfully`);
              }}
              onAlreadySubscribed={() => {
                showStatus("You are already subscribed to this plan", "info");
              }}
            />
          </div>
        )}

        {activeTab === 'Claims History' && (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
            <PayoutHistory />
          </div>
        )}

      </main>

      {/* Mobile Bottom Navigation Bar (Floating) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 h-16 bg-white shadow-2xl shadow-blue-200 rounded-3xl border border-blue-50 flex items-center justify-around px-4 z-50">
        <button className="p-2 text-blue-600 transition-transform active:scale-90">
          <ShieldCheck size={24} />
        </button>
        <button className="p-2 text-slate-400 transition-transform active:scale-90">
          <Activity size={24} />
        </button>
        <div className="relative -mt-12">
           <div className="absolute inset-0 bg-blue-400 blur-xl opacity-30 animate-pulse"></div>
           <button className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-xl shadow-blue-200 border-2 border-white transition-transform active:scale-90 active:rotate-12">
             <Zap className="text-white w-6 h-6 fill-current" />
           </button>
        </div>
        <button className="p-2 text-slate-400 transition-transform active:scale-90">
          <HistoryIcon size={24} />
        </button>
        <button className="p-2 text-slate-400 transition-transform active:scale-90">
          <User size={24} />
        </button>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 border-t border-slate-100 pt-12 pb-24 md:pb-12 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
              <ShieldCheck className="text-blue-600 w-5 h-5" />
              <span className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 tracking-tight font-display">GigGuard AI</span>
            </div>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Parametric Insurance for the Next Generation Workforce</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#" className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-blue-600 transition-colors">Help</a>
          </div>
        </div>
        <p className="mt-12 text-slate-300 font-bold text-[10px] uppercase tracking-widest">
          © 2026 GigGuard Platform. All rights reserved. Blockchain verified.
        </p>
      </footer>
    </div>
  );
};

export default WorkerDashboard;
