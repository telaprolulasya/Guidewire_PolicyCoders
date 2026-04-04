import React from 'react';
import { ShieldCheck, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ workerName = "Ravi Kumar", activeTab = "Dashboard", setActiveTab }) => {
  const navigate = useNavigate();

  const tabs = [
    { name: 'Dashboard' },
    { name: 'Policies' },
    { name: 'Claims History' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 tracking-tight font-display">GigGuard</span>
            </div>
          </div>

          <div className="hidden md:flex items-center h-full space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`h-full px-1 flex items-center text-sm font-bold transition-all relative ${
                  activeTab === tab.name 
                    ? 'text-blue-600' 
                    : 'text-slate-500 hover:text-blue-600'
                }`}
              >
                {tab.name}
                {activeTab === tab.name && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full animate-in slide-in-from-bottom-1 duration-300"></div>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-100/80 px-4 py-2 rounded-full border border-slate-200/50 hover:bg-slate-200/50 transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform shadow-md">
                <User size={18} />
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-black text-slate-800 leading-tight">{workerName}</div>
                <div className="text-[10px] text-slate-500 font-bold leading-tight uppercase tracking-widest">Active Coverage</div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
