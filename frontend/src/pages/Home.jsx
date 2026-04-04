import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, Activity, ShieldAlert, ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden pt-20">
      {/* Decorative background Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-indigo-200/40 to-purple-200/40 blur-3xl -z-10 animate-pulse-soft"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tl from-cyan-200/40 to-blue-200/40 blur-3xl -z-10 animate-float"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-500 text-white p-2 rounded-xl shadow-lg shadow-indigo-200">
              <ShieldCheck size={28} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-blue-800 tracking-tight">GigGuard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/login')} className="text-slate-500 font-bold text-sm hover:text-indigo-600 transition-colors uppercase tracking-widest">Sign In</button>
            <button onClick={() => navigate('/register')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all active:scale-95">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 flex flex-col items-center justify-center text-center min-h-[80vh]">
        <div className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-8 animate-fade-in-up">
          <span className="flex items-center gap-2"><Zap size={16} className="text-amber-500 fill-amber-500" /> AI-Powered Parametric Insurance</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 max-w-4xl leading-tight">
          Instant Protection for <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">Gig Workers</span>
        </h1>
        
        <p className="text-xl text-slate-500 mb-12 max-w-2xl leading-relaxed">
          No manual claims. No tedious paperwork. Our AI engine monitors real-time weather and activity data, automatically triggering rapid payouts when disruptions occur.
        </p>


        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-left">
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white shadow-xl shadow-indigo-50 flex flex-col items-start hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl mb-6">
              <Activity size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Real-Time Telemetry</h3>
            <p className="text-slate-500 leading-relaxed">We monitor rainfall, AQI, and aggregate delivery volume in real-time mapping risks to your geographical zones.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white shadow-xl shadow-indigo-50 flex flex-col items-start hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-2xl mb-6">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Automated Smart Contracts</h3>
            <p className="text-slate-500 leading-relaxed">The second a disruption crosses the parametric threshold, the payout logic is executed immediately locally.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white shadow-xl shadow-indigo-50 flex flex-col items-start hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-green-100 text-green-600 p-3 rounded-2xl mb-6">
              <ShieldAlert size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">AI Fraud Prevention</h3>
            <p className="text-slate-500 leading-relaxed">Advanced geofencing and duplicate checks instantly invalidate malicious or location-spoofed claims automatically.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
