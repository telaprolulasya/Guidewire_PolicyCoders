import React from 'react';
import { ShieldCheck, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950/80 backdrop-blur-md border-t border-slate-800 pt-16 pb-8 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4 group cursor-pointer">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-600 p-2 rounded-xl group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300">
                <ShieldCheck className="h-6 w-6 text-slate-950" />
              </div>
              <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                PolicyCoders
              </span>
            </div>
            <p className="text-slate-400 font-medium text-lg italic tracking-wide">
              "Insuring Income, Not Just Events"
            </p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-cyan-400 hover:drop-shadow-[0_0_5px_currentColor] transition-all">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 hover:drop-shadow-[0_0_5px_currentColor] transition-all">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 hover:drop-shadow-[0_0_5px_currentColor] transition-all">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} PolicyCoders. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-slate-500">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
