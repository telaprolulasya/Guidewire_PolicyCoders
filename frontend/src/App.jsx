import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import InsurancePlans from './components/InsurancePlans';
import LiveMonitoring from './components/LiveMonitoring';
import WorkflowSection from './components/WorkflowSection';
import AIFeatures from './components/AIFeatures';
import Footer from './components/Footer';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} theme={theme} toggleTheme={toggleTheme} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-cyan-900 selection:text-cyan-100 font-sans text-slate-200 transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="space-y-12 pb-12 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-[-1]">
          <div className="absolute top-[10%] left-[-10%] w-[30%] h-[30%] bg-blue-900/20 rounded-full blur-[120px]" />
          <div className="absolute top-[40%] right-[-10%] w-[30%] h-[30%] bg-cyan-900/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] bg-purple-900/10 rounded-full blur-[120px]" />
        </div>

        {/* Dashboard Section */}
        <div className="pt-8">
          <Dashboard />
        </div>

        {/* Live Monitoring Section */}
        <div className="pt-8">
          <LiveMonitoring />
        </div>

        {/* Workflow Section */}
        <div className="pt-16 pb-12">
          <WorkflowSection />
        </div>

        {/* Plans Section */}
        <div className="pt-8">
          <InsurancePlans />
        </div>

        {/* AI Features Section */}
        <div className="pt-16">
          <AIFeatures />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
