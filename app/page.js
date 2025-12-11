// src/app/page.js
'use client';

import { useState } from 'react';
import DriverView from '@/app/components/DriverView';
import HQView from '@/app/components/HqView';

export default function Page() {
  const [viewMode, setViewMode] = useState('selection'); // 'selection', 'driver', 'hq'

  if (viewMode === 'selection') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-white mb-8 tracking-tighter">S-LOG <span className="text-blue-500">SYSTEM</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          
          {/* Card Driver */}
          <button 
            onClick={() => setViewMode('driver')}
            className="group bg-slate-900 hover:bg-blue-900/30 border border-slate-700 hover:border-blue-500 p-10 rounded-2xl transition-all text-left"
          >
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <span className="text-3xl">🚛</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Head Unit (Supir)</h2>
            <p className="text-slate-400">Masuk ke tampilan dashboard kendaraan, navigasi, dan sensor peringatan.</p>
          </button>

          {/* Card HQ */}
          <button 
            onClick={() => setViewMode('hq')}
            className="group bg-slate-900 hover:bg-purple-900/30 border border-slate-700 hover:border-purple-500 p-10 rounded-2xl transition-all text-left"
          >
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <span className="text-3xl">🏢</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Pusat Komando (HQ)</h2>
            <p className="text-slate-400">Monitoring seluruh armada, truk ODOL, dan manajemen pengemudi.</p>
          </button>

        </div>
        <p className="text-slate-600 mt-12 text-sm">S-Log v2.0 - IoT Integrated Logistic System</p>
      </div>
    );
  }

  return (
    <div>
      {/* Tombol Back Kecil di pojok kiri bawah utk dev */}
      <button 
        onClick={() => setViewMode('selection')}
        className="fixed bottom-4 left-4 z-50 bg-slate-800 text-slate-500 text-xs px-2 py-1 rounded opacity-50 hover:opacity-100"
      >
        Switch View
      </button>

      {viewMode === 'driver' ? <DriverView /> : <HQView />}
    </div>
  );
}