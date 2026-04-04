import React from 'react';
import { User, Activity, ShieldCheck, CheckCircle2, Zap, ArrowRight } from 'lucide-react';

const Workflow = () => {
  const steps = [
    { icon: User, title: 'Register', desc: 'Secure signup with profile' },
    { icon: Activity, title: 'Monitor', desc: 'Real-time tracking' },
    { icon: ShieldCheck, title: 'Detect', desc: 'AI identifies issues' },
    { icon: CheckCircle2, title: 'Validate', desc: 'Blockchain verify' },
    { icon: Zap, title: 'Payout', desc: 'Instant transfer' },
  ];

  return (
    <section className="bg-white rounded-[40px] p-8 md:p-14 shadow-sm border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#f1f5f9_0%,transparent_40%)]"></div>
      
      <div className="relative z-10 text-center mb-16">
        <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-2 font-display">How It Works</h3>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Our AI-powered process for instant payouts</p>
      </div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 lg:gap-8">
        {steps.map((step, idx, arr) => (
          <div key={idx} className="flex flex-col items-center group/step cursor-pointer">
            <div className="relative">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 group-hover/step:bg-blue-600 group-hover/step:text-white transition-all duration-500 group-hover/step:scale-110 group-hover/step:rotate-3 shadow-sm group-hover/step:shadow-xl group-hover/step:shadow-blue-200 border border-slate-100">
                <step.icon size={32} />
              </div>
              {idx < arr.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-12 lg:-right-16 translate-x-1/2 -translate-y-1/2 text-slate-200">
                  <ArrowRight size={20} />
                </div>
              )}
            </div>
            <h5 className="mt-6 text-sm font-black text-slate-800 uppercase tracking-widest leading-none mb-2">{step.title}</h5>
            <p className="text-[10px] text-slate-400 font-bold text-center leading-relaxed max-w-[120px]">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Workflow;
