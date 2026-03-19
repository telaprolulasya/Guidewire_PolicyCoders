import React from 'react';
import { UserPlus, Activity, Eye, CheckCircle, IndianRupee, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: "Register",
    desc: "Sign up and opt-in"
  },
  {
    icon: Activity,
    title: "Monitor",
    desc: "We track live data"
  },
  {
    icon: Eye,
    title: "Detect",
    desc: "AI identifies risks"
  },
  {
    icon: CheckCircle,
    title: "Validate",
    desc: "Parametric check"
  },
  {
    icon: IndianRupee,
    title: "Payout",
    desc: "Instant credit!"
  }
];

const WorkflowSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">How PolicyCoders Work</h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400">Autonomous claiming process completely devoid of human intervention.</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 relative">
        {/* Decorative background line (desktop) */}
        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-gradient-to-r from-cyan-900/10 via-cyan-500/50 to-blue-900/10 -z-10 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.3)]"></div>

        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center relative group w-40">
              <div className="w-24 h-24 rounded-full bg-slate-900 border-4 border-slate-800 shadow-[0_0_15px_rgba(34,211,238,0.1)] flex items-center justify-center relative z-10 group-hover:border-cyan-500 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all duration-300">
                <step.icon className="w-10 h-10 text-cyan-400 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300" />
                
                {/* Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-bold border-2 border-slate-900 shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                  {index + 1}
                </div>
              </div>
              <h3 className="mt-6 font-bold text-slate-100 text-lg">{step.title}</h3>
              <p className="text-sm text-center text-slate-400 mt-1">{step.desc}</p>
            </div>
            
            {/* Arrow connecting steps */}
            {index < steps.length - 1 && (
              <div className="hidden md:flex text-cyan-600 animate-pulse drop-shadow-[0_0_8px_rgba(8,145,178,0.6)]">
                <ArrowRight className="w-8 h-8" />
              </div>
            )}
            {/* Mobile arrow */}
            {index < steps.length - 1 && (
              <div className="md:hidden py-4 text-cyan-600 drop-shadow-[0_0_5px_rgba(8,145,178,0.6)]">
                <ArrowRight className="w-8 h-8 rotate-90" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default WorkflowSection;
