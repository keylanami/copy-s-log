// src/app/components/DriverView.jsx
import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Thermometer, Disc, Navigation, Cloud, 
  Bell, CornerUpLeft, Menu, MapPin, Zap
} from 'lucide-react';

const DriverView = () => {
  // Simulasi data real-time
  const [telemetry, setTelemetry] = useState({
    speed: 65,
    maxSpeedLimit: 80,
    topGaugeSpeed: 140, 
    brakeTemp: 120,
    tirePressure: 32,
    load: 22, // Set > 20 agar alert Overload muncul
    maxLoad: 20,
    isRaining: true,
  });

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setTelemetry(prev => ({
        ...prev,
        speed: Math.max(0, Math.min(prev.topGaugeSpeed, prev.speed + (Math.random() * 6 - 3))), 
        brakeTemp: Math.max(50, prev.brakeTemp + (Math.random() * 4 - 2)),
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- CALCULATIONS ---
  const currentSpeed = telemetry.speed || 0;
  const maxLimit = telemetry.maxSpeedLimit || 80; 
  const topGauge = telemetry.topGaugeSpeed || 140;

  // Gauge Logic
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = topGauge > 0 ? (currentSpeed / topGauge) : 0;
  const offset = circumference - (progress * circumference);
  
  // Limit Marker Logic
  const limitPercentage = topGauge > 0 ? (maxLimit / topGauge) : 0.6;
  const limitDashOffset = circumference - (limitPercentage * circumference);

  const isSpeeding = currentSpeed > maxLimit;

  // Alerts Logic
  const alerts = [];
  if (telemetry.load > telemetry.maxLoad) alerts.push({ type: 'warning', msg: 'OVERLOAD DETECTED' });
  if (telemetry.brakeTemp > 250) alerts.push({ type: 'danger', msg: 'BRAKE OVERHEAT' });
  if (currentSpeed > maxLimit) alerts.push({ type: 'danger', msg: 'SPEED LIMIT EXCEEDED' });

  return (
    <div className="bg-[#10172A] min-h-screen text-slate-200 font-sans overflow-hidden selection:bg-cyan-500/30 relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* --- HEADER --- */}
      <header className="fixed top-6 left-6 right-6 z-50 pointer-events-none flex justify-between items-start">
          
          {/* Weather Widget */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4 shadow-2xl pointer-events-auto">
             <div className="bg-blue-500/20 p-2 rounded-full text-blue-400">
                <Cloud size={24} />
             </div>
             <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Cuaca</span>
                <span className="text-base font-bold text-white">Hujan • 28°C</span>
             </div>
          </div>

          {/* Time & Alerts */}
          <div className="flex flex-col items-end gap-3 pointer-events-auto">
             <div className="text-6xl font-black tracking-tighter text-white drop-shadow-2xl tabular-nums leading-none">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </div>
             
             {/* Dynamic Alerts */}
             {alerts.length > 0 && (
                <div className="flex flex-col gap-2 animate-in slide-in-from-right duration-500">
                   {alerts.map((alert, idx) => (
                      <div key={idx} className={`flex items-center gap-3 px-5 py-3 rounded-xl font-bold text-xs shadow-lg border border-white/5 backdrop-blur-md animate-pulse ${
                         alert.type === 'danger' 
                            ? 'bg-red-500/20 text-red-400 border-red-500/50' 
                            : 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                      }`}>
                         <AlertTriangle size={16} /> {alert.msg}
                      </div>
                   ))}
                </div>
             )}
          </div>
      </header>


      {/* --- MAIN GRID --- */}
      <main className="grid grid-cols-12 h-screen pt-28 pb-8 px-8 gap-8 relative z-10">

        {/* --- LEFT COLUMN (3 Cols) --- */}
        <div className="col-span-3 flex flex-col gap-6 h-full">
           
           {/* SPEEDOMETER */}
           <div className="bg-[#0a0a0a] border border-white/5 rounded-[32px] p-6 flex-1 flex flex-col items-center justify-center relative shadow-2xl overflow-hidden group">
              {/* Subtle Gradient BG */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50"></div>
              
              <div className="relative w-64 h-64 flex items-center justify-center">
                 {/* Define Gradients */}
                 <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                    <defs>
                        <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                        <linearGradient id="dangerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#dc2626" />
                        </linearGradient>
                    </defs>
                 </svg>

                 <svg className="w-full h-full transform -rotate-90">
                    {/* Track */}
                    <circle cx="50%" cy="50%" r={radius} stroke="#1e293b" strokeWidth="12" fill="transparent" strokeLinecap="round"/>
                    {/* Progress */}
                    <circle 
                      cx="50%" cy="50%" r={radius} 
                      stroke={isSpeeding ? "url(#dangerGradient)" : "url(#speedGradient)"} 
                      strokeWidth="12" fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                      className="transition-all duration-500 ease-out drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    />
                    {/* Limit Marker */}
                    <circle cx="50%" cy="50%" r={radius} stroke="white" strokeWidth="16" fill="transparent" strokeDasharray={`3 ${circumference}`} strokeDashoffset={limitDashOffset} className="opacity-80 mix-blend-overlay"/>
                 </svg>

                 <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <span className={`text-8xl font-black tracking-tighter tabular-nums leading-none transition-colors duration-300 ${isSpeeding ? 'text-red-500' : 'text-white'}`}>
                       {Math.round(currentSpeed)}
                    </span>
                    <span className="text-slate-500 font-bold text-sm tracking-[0.2em] mt-2">KM/H</span>
                 </div>
              </div>

              {/* Limit Badge */}
              <div className="mt-8 bg-white/5 border border-white/5 px-4 py-2 rounded-full flex items-center gap-3">
                 <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${isSpeeding ? 'bg-red-500 text-red-500 animate-pulse' : 'bg-slate-500 text-slate-500'}`}></div>
                 <span className="text-xs font-bold text-slate-300 tracking-wider">BATAS: {maxLimit}</span>
              </div>
           </div>

           {/* LOAD STATUS */}
           <div className="bg-[#0a0a0a] border border-white/5 rounded-[32px] p-6 h-40 flex flex-col justify-between relative overflow-hidden shadow-lg">
               <div className="flex justify-between items-start z-10">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Beban Muatan</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded font-bold uppercase tracking-wide border border-white/5">Semen Curah</span>
               </div>
               
               <div className="flex items-end justify-between z-10 mb-2">
                  <div className="flex items-baseline gap-2">
                      <span className={`text-5xl font-black tracking-tighter leading-none ${telemetry.load > telemetry.maxLoad ? 'text-red-500' : 'text-white'}`}>
                        {telemetry.load}
                      </span>
                      <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">/ {telemetry.maxLoad} Ton</span>
                  </div>
                  
                  {/* Alert Side-by-Side */}
                  {telemetry.load > telemetry.maxLoad && (
                      <div className="flex items-center gap-1.5 bg-red-500/20 border border-red-500/50 text-red-400 px-3 py-1.5 rounded-lg animate-pulse">
                          <AlertTriangle size={14} />
                          <span className="text-[10px] font-black tracking-wider">OVERLOAD</span>
                      </div>
                  )}
               </div>

               {/* Modern Progress Bar */}
               <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden z-10">
                  <div 
                    className={`h-full transition-all duration-700 rounded-full ${telemetry.load > telemetry.maxLoad ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_#10b981]'}`} 
                    style={{width: `${(telemetry.load/30)*100}%`}}
                  ></div>
               </div>
           </div>
        </div>


        {/* --- CENTER: NAVIGATION MAP (6 Cols) --- */}
        <div className="col-span-6 relative flex flex-col h-full">
            <div className="flex-1 bg-slate-900 rounded-[40px] border border-white/10 overflow-hidden relative shadow-2xl group">
               
               {/* Map Layer */}
               <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/107.6191,-6.9175,15,45,0/800x1000?access_token=YOUR_TOKEN')] bg-cover bg-center opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none"></div>

               {/* Simulated Route Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-96 bg-blue-500/30 blur-2xl rounded-full pointer-events-none"></div>

               {/* Floating Nav Instruction */}
               <div className="absolute top-6 left-6 right-6 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 flex items-center gap-5 z-20 shadow-2xl">
                  <div className="bg-emerald-500 p-3 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                     <CornerUpLeft size={32} className="text-black" strokeWidth={3} />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-3xl font-black text-white tracking-tight leading-none mb-1">200 m</span>
                     <span className="text-sm font-bold text-slate-300 tracking-wide">Belok Kiri ke Jl. Cadas Pangeran</span>
                  </div>
               </div>

               {/* 3D Cursor Concept */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transform -rotate-45">
                  <div className="relative w-16 h-16 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)] z-20">
                     <Navigation size={32} fill="white" className="text-white transform rotate-45" />
                  </div>
                  {/* Ping Animation */}
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50 z-0"></div>
               </div>

               {/* Bottom Floating Stats */}
               <div className="absolute bottom-6 left-6 right-6 flex gap-4 z-20">
                   <div className="flex-1 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                       <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimasi</span>
                           <span className="text-xl font-bold text-white">14:45</span>
                       </div>
                       <div className="text-right">
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Sisa Waktu</span>
                           <span className="text-xl font-bold text-emerald-400">28 mnt</span>
                       </div>
                   </div>
                   
                   <div className="flex-1 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Jarak</span>
                           <span className="text-xl font-bold text-white">4.5 KM</span>
                       </div>
                       <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition text-white">
                           <Menu size={20} />
                       </button>
                   </div>
               </div>
            </div>
        </div>


        {/* --- RIGHT COLUMN (3 Cols) --- */}
        <div className="col-span-3 flex flex-col gap-6 h-full">
            
            {/* Brake Temp */}
            <div className={`flex-1 bg-[#0a0a0a] border rounded-[32px] p-6 relative overflow-hidden flex flex-col justify-center transition-colors duration-500 ${telemetry.brakeTemp > 200 ? 'border-red-500/50 bg-red-950/20' : 'border-white/5'}`}>
               <div className="flex justify-between items-center mb-4 z-10">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                     <Thermometer size={14} /> Suhu Rem
                  </span>
                  <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${telemetry.brakeTemp > 200 ? 'bg-red-500 text-red-500 animate-pulse' : 'bg-emerald-500 text-emerald-500'}`}></div>
               </div>
               
               <div className="z-10">
                  <div className="text-5xl font-black text-white tracking-tighter mb-4">{Math.round(telemetry.brakeTemp)}°</div>
                  
                  {/* Custom Segmented Bar */}
                  <div className="flex gap-1 h-2 w-full">
                     {[...Array(10)].map((_, i) => (
                        <div key={i} className={`flex-1 rounded-sm transition-all duration-300 ${
                           (i/10) * 300 < telemetry.brakeTemp 
                              ? (telemetry.brakeTemp > 200 ? 'bg-red-500 shadow-[0_0_5px_red]' : 'bg-blue-500 shadow-[0_0_5px_blue]') 
                              : 'bg-slate-800'
                        }`}></div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Tire Pressure */}
            <div className={`flex-1 bg-[#0a0a0a] border rounded-[32px] p-6 relative overflow-hidden flex flex-col justify-center ${telemetry.tirePressure < 30 ? 'border-amber-500/50 bg-amber-950/20' : 'border-white/5'}`}>
               <div className="flex justify-between items-center mb-4 z-10">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                     <Disc size={14} /> Tekanan Ban
                  </span>
               </div>
               
               <div className="flex items-baseline gap-2 z-10">
                  <span className="text-5xl font-black text-white tracking-tighter">{telemetry.tirePressure}</span>
                  <span className="text-lg font-bold text-slate-500 tracking-wider">PSI</span>
               </div>
               
               <div className="mt-4 flex items-center gap-2 z-10">
                  <div className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded border border-white/5">Sensor Aktif</div>
                  <div className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">6 Roda</div>
               </div>
            </div>

            {/* SOS Button */}
            <button className="h-24 bg-gradient-to-r from-red-600 to-rose-700 rounded-[28px] shadow-[0_10px_30px_rgba(225,29,72,0.4)] border border-red-400/30 flex items-center justify-center gap-4 group active:scale-95 transition-all">
               <div className="bg-white/20 p-2 rounded-full group-hover:animate-bounce">
                  <Bell size={24} className="text-white" fill="white" />
               </div>
               <div className="flex flex-col items-start leading-none">
                  <span className="text-xl font-black text-white tracking-widest">DARURAT</span>
                  <span className="text-[10px] font-bold text-red-100 uppercase tracking-widest">Tekan 3 Detik</span>
               </div>
            </button>

        </div>

      </main>
    </div>
  );
};

export default DriverView;