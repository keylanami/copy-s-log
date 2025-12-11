'use client';

import { ShieldAlert } from 'lucide-react';

const SmartGateFeed = ({ gateLogs }) => {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 h-96 flex flex-col">
      <div className="p-4 border-b border-slate-700 bg-slate-800 rounded-t-xl sticky top-0">
        <h3 className="font-semibold flex items-center gap-2">
          <ShieldAlert size={18} className="text-purple-500"/>
          Smart Gate Feed
        </h3>
        <p className="text-xs text-slate-400 mt-1">Gerbang Tol Cikampek Utama</p>
      </div>
      
      {/* USE YOUR CUSTOM SCROLLBAR CLASSES HERE */}
      <div className="p-4 space-y-3 overflow-y-auto flex-1 scrollbar-thin scrollbar-dark">
        {gateLogs.map((log) => (
          <div key={log.id} className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex justify-between items-center animate-in slide-in-from-right fade-in duration-300">
            <div>
              <div className="font-bold text-sm">{log.plat}</div>
              <div className="text-xs text-slate-500">{log.timestamp}</div>
            </div>
            <div className={`text-xs font-bold px-2 py-1 rounded border ${
              log.isSafe 
                ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                : 'bg-red-500/10 text-red-500 border-red-500/20'
            }`}>
              {log.status}
            </div>
          </div>
        ))}
        {gateLogs.length === 0 && <div className="text-center text-slate-500 text-sm py-4">Waiting for traffic...</div>}
      </div>
    </div>
  );
};

export default SmartGateFeed;