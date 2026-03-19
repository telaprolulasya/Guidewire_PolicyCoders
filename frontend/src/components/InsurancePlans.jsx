import React from 'react';
import { CloudRain, ThermometerSun, Wind, ShieldOff, CheckCircle2 } from 'lucide-react';

const ConditionCard = ({ icon: Icon, title, condition, color }) => (
  <div className="flex flex-col h-full bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-[0_0_15px_rgba(34,211,238,0.05)] hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:border-cyan-500/50 transition-all duration-300 group">
    <div>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-${color}-900/30 text-${color}-400 border border-${color}-500/30 group-hover:scale-110 group-hover:bg-${color}-900/50 transition-all duration-300`}>
        <Icon className="w-8 h-8 drop-shadow-[0_0_8px_currentColor]" />
      </div>
      <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
    </div>
    <div className="space-y-4 mt-auto pt-2">
      <div className="flex justify-between items-center text-xs sm:text-sm border-b border-slate-700 pb-2">
        <span className="text-slate-400">Condition</span>
        <span className="font-semibold text-slate-200 bg-slate-800 px-2 py-1 rounded-md border border-slate-600">{condition}</span>
      </div>
      <div className="flex flex-col gap-2 text-xs sm:text-sm">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Payout Calc.</span>
          <span className="font-semibold text-cyan-300 bg-cyan-950 px-2 py-1 rounded-md border border-cyan-900/50">Avg(7-Day) - Today</span>
        </div>
      </div>
    </div>
  </div>
);

const InsurancePlans = () => {
  return (
    <section id="plans" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-900/30 backdrop-blur-sm rounded-[3rem] border border-slate-800 my-12 relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-base text-cyan-400 font-bold tracking-wide uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">Coverage Plans</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
          Complete Protection for Gig Workers
        </p>
        <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">
          Parametric constraints automatically detect disruptions and process instant claims. No paperwork needed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ConditionCard 
          icon={CloudRain} 
          title="Heavy Rain" 
          condition="> 50mm / hr" 
          color="cyan"
        />
        <ConditionCard 
          icon={ThermometerSun} 
          title="Extreme Heat" 
          condition="> 45°C" 
          color="orange"
        />
        <ConditionCard 
          icon={Wind} 
          title="Poor AQI" 
          condition="> 400 AQI" 
          color="yellow"
        />
        <ConditionCard 
          icon={ShieldOff} 
          title="Curfew / Strike" 
          condition="Official Notice" 
          color="red"
        />
      </div>

      <div className="mt-16 bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-cyan-900/50 shadow-[0_0_30px_rgba(34,211,238,0.1)] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-900/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-900/30 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Weekly Premium Plan</h3>
            <p className="text-slate-400">Auto-deducted from your platform wallet. Cancel anytime.</p>
            <ul className="mt-4 space-y-2">
              {['Cover all 4 disruption events', 'Instant automatic payouts to wallet', 'No deductibles, zero waiting period'].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_5px_currentColor]" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-900 rounded-2xl shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition-shadow">
            <span className="text-5xl font-extrabold tracking-tight">₹20</span>
            <span className="text-xl text-slate-800 font-bold">/week</span>
            <button className="mt-6 w-full bg-slate-900 text-cyan-400 font-bold py-3 px-8 rounded-xl hover:bg-slate-800 border border-cyan-400/30 transition-colors shadow-inner">
              Opt-in Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsurancePlans;
