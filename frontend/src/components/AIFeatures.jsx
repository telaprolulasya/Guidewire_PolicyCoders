import React from 'react';
import { BrainCircuit, Calculator, ShieldCheck } from 'lucide-react';

const AIFeatures = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          Powered by Generative AI
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-slate-400 mx-auto">
          PolicyCoders utilizes state-of-the-art machine learning to dynamically adapt to risks and provide ultra-personalized parametric coverage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 shadow-[0_0_15px_rgba(34,211,238,0.05)] border border-slate-800 group hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:border-cyan-500/50 transition-all duration-300">
          <div className="w-16 h-16 rounded-2xl bg-cyan-900/30 text-cyan-400 flex items-center justify-center mb-6 shadow-sm border border-cyan-500/30 group-hover:bg-cyan-900/50 group-hover:text-cyan-300 transition-colors duration-300">
            <BrainCircuit className="w-8 h-8 drop-shadow-[0_0_8px_currentColor]" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-3">Hyper-local Risk Prediction</h3>
          <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
            Our AI ingests millions of data points, including real-time weather and traffic, to predict disruption probabilities at the micro-zone level.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 shadow-[0_0_15px_rgba(16,185,129,0.05)] border border-slate-800 group hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] hover:border-emerald-500/50 transition-all duration-300">
          <div className="w-16 h-16 rounded-2xl bg-emerald-900/30 text-emerald-400 flex items-center justify-center mb-6 shadow-sm border border-emerald-500/30 group-hover:bg-emerald-900/50 group-hover:text-emerald-300 transition-colors duration-300">
            <Calculator className="w-8 h-8 drop-shadow-[0_0_8px_currentColor]" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-3">Dynamic Pricing Engine</h3>
          <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
            Premiums are not static. Risk levels dynamically adjust pricing, offering gig workers the fairest rate customized to their daily routes and history.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 shadow-[0_0_15px_rgba(168,85,247,0.05)] border border-slate-800 group hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:border-purple-500/50 transition-all duration-300">
          <div className="w-16 h-16 rounded-2xl bg-purple-900/30 text-purple-400 flex items-center justify-center mb-6 shadow-sm border border-purple-500/30 group-hover:bg-purple-900/50 group-hover:text-purple-300 transition-colors duration-300">
            <ShieldCheck className="w-8 h-8 drop-shadow-[0_0_8px_currentColor]" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-3">Instant Fraud Detection</h3>
          <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
            Parametric validation means payouts are based entirely on trusted third-party APIs (weather, GPS). No claims forms, zero human bias, and no fraud.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
