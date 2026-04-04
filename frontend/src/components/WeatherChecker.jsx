import React, { useState } from 'react';
import { Search, Cloud, Droplets, Wind, Thermometer, MapPin, AlertCircle, Loader2, CloudRain } from 'lucide-react';

const WeatherChecker = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      // Using wttr.in as a free, no-key weather API
      const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
      if (!response.ok) throw new Error('City not found or API error');
      const data = await response.json();
      
      const current = data.current_condition[0];
      const area = data.nearest_area[0];
      
      setWeather({
        temp: current.temp_C,
        condition: current.weatherDesc[0].value,
        humidity: current.humidity,
        wind: current.windspeedKmph,
        location: `${area.areaName[0].value}, ${area.country[0].value}`,
        icon: current.weatherCode
      });
    } catch (err) {
      setError('Could not fetch weather data. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') fetchWeather();
  };

  return (
    <div className="bg-slate-800/50 rounded-[32px] p-8 border border-slate-700 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors duration-500"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
            <Cloud className="text-indigo-400" size={24} />
            Live Weather Intel
          </h3>
          <p className="text-slate-400 text-sm mt-1">Check real-time environmental conditions for risk assessment.</p>
        </div>
        
        <div className="flex w-full md:w-auto items-center gap-3">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search City (e.g., Bangalore)"
              className="w-full bg-slate-900/50 border border-slate-700/50 text-white rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all placeholder:text-slate-600"
            />
          </div>
          <button 
            onClick={fetchWeather}
            disabled={loading}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white rounded-2xl shadow-lg shadow-indigo-600/20 active:scale-95 transition-all text-sm font-bold flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Fetch Info'}
          </button>
        </div>
      </div>

      {weather ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-900/40 rounded-2xl p-5 border border-slate-700/30 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <MapPin size={14} className="text-indigo-400" /> Location
            </div>
            <p className="text-lg font-bold text-white tracking-tight">{weather.location}</p>
          </div>

          <div className="bg-slate-900/40 rounded-2xl p-5 border border-slate-700/30 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <Thermometer size={14} className="text-orange-400" /> Temperature
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white">{weather.temp}°C</span>
              <span className="text-sm font-bold text-slate-500 tracking-tight">{weather.condition}</span>
            </div>
          </div>

          <div className="bg-slate-900/40 rounded-2xl p-5 border border-slate-700/30 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <Droplets size={14} className="text-blue-400" /> Humidity
            </div>
            <p className="text-2xl font-black text-white tracking-tight">{weather.humidity}%</p>
          </div>

          <div className="bg-slate-900/40 rounded-2xl p-5 border border-slate-700/30 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <Wind size={14} className="text-green-400" /> Wind Speed
            </div>
            <p className="text-2xl font-black text-white tracking-tight">{weather.wind} km/h</p>
          </div>
          
          {weather.condition.toLowerCase().includes('rain') && (
            <div className="col-span-full mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center gap-4 text-blue-400">
               <CloudRain size={24} className="animate-bounce" />
               <div>
                  <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">Precipitation Warning</p>
                  <p className="text-sm font-bold opacity-80 uppercase tracking-tight">Heavy rainfall detected in {weather.location}. System rules may trigger payouts.</p>
               </div>
            </div>
          )}
        </div>
      ) : error ? (
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center gap-3 text-red-400">
          <AlertCircle size={20} />
          <span className="text-sm font-bold">{error}</span>
        </div>
      ) : (
        <div className="py-12 border-2 border-dashed border-slate-700/50 rounded-3xl flex flex-col items-center justify-center text-slate-500">
           <Cloud size={48} className="opacity-20 mb-4 animate-float" />
           <p className="text-sm font-bold uppercase tracking-widest">Enter a city to assess weather risk</p>
        </div>
      )}
    </div>
  );
};

export default WeatherChecker;
