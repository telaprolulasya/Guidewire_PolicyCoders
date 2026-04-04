import React from 'react';
import { Droplets, Wind, Activity, CloudRain, TrendingUp, TrendingDown } from 'lucide-react';

const LiveMonitoring = ({ data }) => {
  const rain = data?.rain || 0;
  const aqi = data?.aqi || 0;
  const orders = data?.orders === "Low" ? 3 : (data?.orders === "Medium" ? 8 : 15);

  const getRainStatus = (v) => v > 50 ? 'Disruption' : (v > 20 ? 'Warning' : 'Normal');
  const getAqiStatus = (v) => v > 300 ? 'Disruption' : (v > 150 ? 'Warning' : 'Normal');
  const getOrderStatus = (v) => v < 5 ? 'Disruption' : (v < 10 ? 'Warning' : 'Normal');

  const rainStatus = getRainStatus(rain);
  const aqiStatus = getAqiStatus(aqi);
  const orderStatus = getOrderStatus(orders);

  // Overall status
  const isDisrupted = rainStatus === 'Disruption' || aqiStatus === 'Disruption' || orderStatus === 'Disruption';
  const isWarning = !isDisrupted && (rainStatus === 'Warning' || aqiStatus === 'Warning' || orderStatus === 'Warning');
  const overallStatus = isDisrupted ? 'Disruption Detected' : (isWarning ? 'Warning' : 'Normal Operations');

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight font-display">Live Signal Monitoring</h3>
          <p className="text-sm text-slate-500 font-bold">Real-time parameters verified by AI</p>
        </div>
        <div className={`px-4 py-2 rounded-2xl flex items-center gap-2.5 border ${
          isDisrupted ? 'bg-red-50 border-red-100 text-red-700' : 
          (isWarning ? 'bg-orange-50 border-orange-100 text-orange-700' : 'bg-green-50 border-green-100 text-green-700')
        }`}>
          <div className={`w-2.5 h-2.5 rounded-full animate-ping ${
            isDisrupted ? 'bg-red-500' : (isWarning ? 'bg-orange-500' : 'bg-green-500')
          }`}></div>
          <span className="text-[10px] font-black uppercase tracking-widest leading-none">
            {overallStatus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Rainfall Card */}
        <div className="relative group/monitor">
          <div className={`relative bg-white rounded-2xl p-6 border transition-all ${
            rainStatus === 'Disruption' ? 'border-red-200 bg-red-50/10' : (rainStatus === 'Warning' ? 'border-orange-200 bg-orange-50/10' : 'border-slate-100')
          }`}>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit mb-4">
              <Droplets size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Rainfall</p>
            <h4 className="text-3xl font-black text-slate-800 tracking-tight">{rain}mm</h4>
            <p className={`text-[10px] font-black mt-4 flex items-center gap-1 uppercase tracking-widest ${
              rainStatus === 'Disruption' ? 'text-red-600' : (rainStatus === 'Warning' ? 'text-orange-600' : 'text-green-600')
            }`}>
              {rainStatus === 'Disruption' ? 'Severe Rain' : (rainStatus === 'Warning' ? 'Moderate Rain' : 'All Clear')}
            </p>
          </div>
        </div>

        {/* AQI Card */}
        <div className="relative group/monitor">
          <div className={`relative bg-white rounded-2xl p-6 border transition-all ${
            aqiStatus === 'Disruption' ? 'border-red-200 bg-red-50/10' : (aqiStatus === 'Warning' ? 'border-orange-200 bg-orange-50/10' : 'border-slate-100')
          }`}>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl w-fit mb-4">
              <Wind size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">AQI Index</p>
            <h4 className="text-3xl font-black text-slate-800 tracking-tight">{aqi}</h4>
            <p className={`text-[10px] font-black mt-4 flex items-center gap-1 uppercase tracking-widest ${
              aqiStatus === 'Disruption' ? 'text-red-600' : (aqiStatus === 'Warning' ? 'text-orange-600' : 'text-green-600')
            }`}>
              {aqiStatus === 'Disruption' ? 'Critical Air' : (aqiStatus === 'Warning' ? 'Unhealthy' : 'Good Quality')}
            </p>
          </div>
        </div>

        {/* Delivery Activity Card */}
        <div className="relative group/monitor">
          <div className={`relative bg-white rounded-2xl p-6 border transition-all ${
            orderStatus === 'Disruption' ? 'border-red-200 bg-red-50/10' : (orderStatus === 'Warning' ? 'border-orange-200 bg-orange-50/10' : 'border-slate-100')
          }`}>
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl w-fit mb-4">
              <Activity size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Activity Drop</p>
            <h4 className="text-3xl font-black text-slate-800 tracking-tight">{data?.orders || "Normal"}</h4>
            <p className={`text-[10px] font-black mt-4 flex items-center gap-1 uppercase tracking-widest ${
              orderStatus === 'Disruption' ? 'text-red-600' : (orderStatus === 'Warning' ? 'text-orange-600' : 'text-green-600')
            }`}>
              {orderStatus === 'Disruption' ? 'High Impact' : (orderStatus === 'Warning' ? 'Minor Delay' : 'Stable')}
            </p>
          </div>
        </div>
      </div>

      {/* Status Detail Bar */}
      <div className={`mt-8 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border transition-all ${
        isDisrupted ? 'bg-red-50 border-red-100' : (isWarning ? 'bg-orange-50 border-orange-100' : 'bg-slate-50 border-slate-100')
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${
            isDisrupted ? 'bg-red-100 text-red-600' : (isWarning ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600')
          }`}>
            <CloudRain size={24} />
          </div>
          <div>
            <p className={`text-sm font-black uppercase tracking-tight ${isDisrupted ? 'text-red-800' : 'text-slate-800'}`}>
              Platform Status: {overallStatus}
            </p>
            <p className="text-xs text-slate-500 font-bold tracking-tight">
              {isDisrupted ? 'Automatic payout triggered. Funds will be credited instantly.' : 
               (isWarning ? 'Climate threshold detected. Monitor earnings for gap protection.' : 'Environmental conditions are stable. No risks detected.')}
            </p>
          </div>
        </div>
        {isDisrupted && (
          <div className="px-6 py-2.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl animate-pulse shadow-lg shadow-red-200">
            Payout Processing
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveMonitoring;
