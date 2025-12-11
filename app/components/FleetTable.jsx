'use client';

import { MapPin } from 'lucide-react';

const StatusBadge = ({ type }) => {
  const styles = {
    SAFE: "bg-green-500/10 text-green-500 border-green-500/20",
    ODOL: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    CRITICAL: "bg-red-500/10 text-red-500 border-red-500/20 animate-pulse"
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[type] || styles.SAFE}`}>
      {type}
    </span>
  );
};

const FleetTable = ({ trucks, setTrucks }) => {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-700 flex justify-between items-center">
        <h3 className="font-semibold">Monitoring Armada Real-Time</h3>
        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Live Updates</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-900/50 text-slate-400">
            <tr>
              <th className="px-6 py-3">ID Truk</th>
              <th className="px-6 py-3">Muatan (Ton)</th>
              <th className="px-6 py-3">Speed</th>
              <th className="px-6 py-3">Suhu Rem</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Lokasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {trucks.map((truck, idx) => {
              const isHot = truck.brakeTemp > 250;
              const isOverload = truck.load > truck.maxLoad;
              
              let status = "SAFE";
              if(isHot && isOverload) status = "CRITICAL";
              else if(isHot || isOverload) status = "ODOL";

              return (
                <tr key={idx} className={`hover:bg-slate-700/50 transition-colors ${status === 'CRITICAL' ? 'bg-red-500/5' : ''}`}>
                  <td className="px-6 py-4 font-medium">{truck.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${isOverload ? 'bg-red-500' : 'bg-blue-500'}`} 
                          style={{ width: `${(truck.load / truck.maxLoad) * 100}%` }}
                        ></div>
                      </div>
                      <span className={isOverload ? 'text-red-400' : 'text-slate-300'}>
                        {truck.load.toFixed(1)} T
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{Math.round(truck.speed)} km/h</td>
                  <td className={`px-6 py-4 font-mono ${isHot ? 'text-red-500 font-bold' : ''}`}>
                    {Math.round(truck.brakeTemp)}°C
                  </td>
                  <td className="px-6 py-4"><StatusBadge type={status} /></td>
                  <td className="px-6 py-4 text-slate-400 flex items-center gap-1">
                    <MapPin size={12}/> {truck.location}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FleetTable;