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
      });
    } catch (err) {
      setError('Could not fetch weather data. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <Cloud className="text-indigo-500" size={24} />
            Live Weather Intel
          </h3>
          <p className="text-slate-500 text-sm mt-1">Check real-time environmental conditions for risk assessment.</p>
        </div>

        <div className="flex w-full md:w-auto items-center gap-3">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
              placeholder="Search City (e.g., Bangalore)"
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white rounded-2xl shadow-md shadow-indigo-100 active:scale-95 transition-all text-sm font-bold flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Fetch Info'}
          </button>
        </div>
      </div>

      {weather ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {[
            { icon: <MapPin size={14} className="text-indigo-500" />, label: 'Location', value: weather.location, isLarge: false },
            { icon: <Thermometer size={14} className="text-orange-500" />, label: 'Temperature', value: `${weather.temp}°C`, sub: weather.condition },
            { icon: <Droplets size={14} className="text-blue-500" />, label: 'Humidity', value: `${weather.humidity}%` },
            { icon: <Wind size={14} className="text-green-500" />, label: 'Wind Speed', value: `${weather.wind} km/h` },
          ].map((item) => (
            <div key={item.label} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                {item.icon} {item.label}
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight">{item.value}</p>
              {item.sub && <p className="text-xs text-slate-500 font-medium -mt-2">{item.sub}</p>}
            </div>
          ))}

          {weather.condition.toLowerCase().includes('rain') && (
            <div className="col-span-full mt-2 p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-4 text-blue-600">
              <CloudRain size={24} className="animate-bounce flex-shrink-0" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-1">Precipitation Warning</p>
                <p className="text-sm font-bold text-blue-500">Heavy rainfall detected in {weather.location}. System rules may trigger payouts.</p>
              </div>
            </div>
          )}
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-center gap-3 text-red-500">
          <AlertCircle size={20} />
          <span className="text-sm font-bold">{error}</span>
        </div>
      ) : (
        <div className="py-12 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400">
          <Cloud size={48} className="opacity-30 mb-4" />
          <p className="text-sm font-bold uppercase tracking-widest">Enter a city to assess weather risk</p>
        </div>
      )}
    </div>
  );
};

export default WeatherChecker;
