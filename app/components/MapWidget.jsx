'use client';

import { MapPin } from 'lucide-react';

const MapWidget = () => {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 h-64 relative flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 group cursor-pointer">
      <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-all"></div>
      <div className="relative z-10 text-center">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
          <MapPin className="text-white" />
        </div>
        <h4 className="font-semibold text-white">Live GPS Tracking</h4>
        <p className="text-xs text-slate-300">Click to expand map view</p>
      </div>
    </div>
  );
};

export default MapWidget;