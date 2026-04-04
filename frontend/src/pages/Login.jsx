import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldAlert, ArrowRight, ShieldCheck, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('worker'); // 'worker' or 'admin'
  const [email, setEmail] = useState('ravi@delivery.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setError('');
    if (newRole === 'admin') {
      setEmail('');
      setPassword('');
    } else {
      setEmail('ravi@delivery.com');
      setPassword('password123');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'admin') {
      if (email === 'admin@gmail.com' && password === 'Admin@123') {
        navigate('/admin');
      } else {
        setError('Invalid Admin Credentials.');
      }
    } else {
      navigate('/worker-dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] text-slate-800 p-4 relative overflow-hidden">
      {/* Decorative background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-200/40 to-blue-200/40 blur-3xl -z-10 animate-pulse-soft"></div>
      
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-indigo-50 w-full max-w-md relative z-10 glass">
        
        <div className="flex flex-col items-center mb-8">
           <div className="bg-gradient-to-br from-indigo-600 to-blue-500 text-white p-3 rounded-2xl shadow-lg shadow-indigo-200 mb-4 cursor-pointer" onClick={() => navigate('/')}>
              <ShieldCheck size={36} />
           </div>
           <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-center">Welcome Back</h2>
           <p className="text-sm font-medium text-slate-500 mt-2">Sign in to your GigGuard account</p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
          <button 
            type="button"
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${role === 'worker' ? 'bg-white shadow text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => handleRoleChange('worker')}
          >
            <User size={18} /> Gig Worker
          </button>
          <button 
            type="button"
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${role === 'admin' ? 'bg-white shadow text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => handleRoleChange('admin')}
          >
            <ShieldAlert size={18} /> Administrator
          </button>
        </div>

        {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-semibold text-center">
                {error}
            </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'admin' ? 'admin@gmail.com' : 'user@example.com'}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-semibold text-slate-700">Password</label>
              <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">Forgot password?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 flex justify-center items-center gap-2 mt-6"
          >
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-medium text-slate-500">
          Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline font-bold">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
