import React, { useState } from 'react';
import { ShieldCheck, User, MapPin, Briefcase, IndianRupee, ArrowRight, CheckCircle2, Mail, Lock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
        platform: '',
        avgIncome: '',
        currentIncome: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const apiBase = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';
            const res = await fetch(`${apiBase}/worker`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    avgIncome: parseFloat(formData.avgIncome),
                    currentIncome: parseFloat(formData.currentIncome)
                })
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('currentUser', JSON.stringify(data.worker));
                setSuccess(true);
                setTimeout(() => navigate('/worker-dashboard'), 2000);
            } else {
                console.error('Registration failed:', data.error);
                setError(data.error || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Network error registering worker:', err);
            setError('Could not connect to server. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] bg-purple-100/30 rounded-full blur-[100px]"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <ShieldCheck className="text-blue-600 w-10 h-10" />
                    <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 tracking-tight font-display">GigGuard AI</span>
                </div>
                <h2 className="text-center text-3xl font-black text-slate-900 tracking-tight">Worker Registration</h2>
                <p className="mt-2 text-center text-sm font-bold text-slate-500">
                    Protect your earnings from climate disruptions today.
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-white py-10 px-8 shadow-2xl shadow-blue-100 rounded-[32px] border border-white">
                    {success ? (
                        <div className="text-center py-8 animate-in zoom-in-95 duration-300">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Registration Successful!</h3>
                            <p className="text-slate-500 font-bold">Redirecting to your dashboard...</p>
                        </div>
                    ) : (
                        <>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-6">
                                    {/* Name Field */}
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-blue-600 transition-colors">
                                                <User size={18} />
                                            </div>
                                            <input
                                                type="text" required
                                                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    {/* Email/Pass Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-blue-600 transition-colors">
                                                    <Mail size={18} />
                                                </div>
                                                <input
                                                    type="email" required
                                                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                                                    placeholder="mail@example.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-blue-600 transition-colors">
                                                    <Lock size={18} />
                                                </div>
                                                <input
                                                    type="password" required
                                                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                                                    placeholder="••••••••"
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location Field */}
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Location (City)</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-blue-600 transition-colors">
                                                <MapPin size={18} />
                                            </div>
                                            <input
                                                type="text" required
                                                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                                                placeholder="Mumbai, Bangalore..."
                                                value={formData.location}
                                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    {/* Platform Field */}
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Platform</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-blue-600 transition-colors">
                                                <Briefcase size={18} />
                                            </div>
                                            <input
                                                type="text" required
                                                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                                                placeholder="Uber, Swiggy, Zomato..."
                                                value={formData.platform}
                                                onChange={(e) => setFormData({...formData, platform: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    {/* Income and Balance Row */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Weekly Avg Income</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-blue-600 transition-colors">
                                                    <IndianRupee size={16} />
                                                </div>
                                                <input
                                                    type="number" required
                                                    className="block w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                                                    placeholder="5000"
                                                    value={formData.avgIncome}
                                                    onChange={(e) => setFormData({...formData, avgIncome: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Starting Balance</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-blue-600 transition-colors">
                                                    <IndianRupee size={16} />
                                                </div>
                                                <input
                                                    type="number" required
                                                    className="block w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                                                    placeholder="1000"
                                                    value={formData.currentIncome}
                                                    onChange={(e) => setFormData({...formData, currentIncome: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs font-bold text-red-600">
                                        ⚠️ {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-blue-600 border border-transparent rounded-2xl shadow-xl shadow-blue-200 text-xs font-black text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                                >
                                    {loading ? 'Registering...' : (
                                        <>
                                            Finish Registration
                                            <ArrowRight size={16} />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                                <p className="text-xs font-bold text-slate-500">
                                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
                                </p>
                            </div>
                        </>
                    )}
                </div>
                
                <p className="mt-8 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                    By registering, you agree to our <span className="text-blue-600">Smart Policy Terms</span> and <span className="text-blue-600">AI Data Usage</span>.
                </p>
            </div>
        </div>
    );
};

export default Registration;
