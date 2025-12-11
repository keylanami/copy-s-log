// src/app/components/HQView.jsx
import React, { useState } from 'react';
import { Truck, AlertOctagon, User, Phone, MapPin, Eye } from 'lucide-react';
import { INITIAL_TRUCKS } from './utils/data';

const HQView = () => {
  const [trucks, setTrucks] = useState(INITIAL_TRUCKS);
  const [selectedTruck, setSelectedTruck] = useState(null); // Untuk Modal Detail

  // Helper Check Kondisi
  const checkCondition = (t) => {
    if (t.brakeTemp > 250) return { status: 'BAHAYA', detail: 'Rem Overheat' };
    if (t.tirePressure < 30) return { status: 'WARNING', detail: 'Ban Kempes' };
    if (t.load > t.maxLoad) return { status: 'ODOL', detail: 'Overload' };
    return { status: 'AMAN', detail: '-' };
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 p-6 font-sans">
      <h2 className="text-2xl font-bold mb-6 text-blue-400">COMMAND CENTER ARMADA</h2>

      {/* KPI SIMPLE */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between">
           <div><div className="text-sm text-slate-400">Total Truk Bertugas</div><div className="text-3xl font-bold">142</div></div>
           <Truck className="text-blue-500" size={32} />
        </div>
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between">
           <div><div className="text-sm text-slate-400">Pelanggaran ODOL</div><div className="text-3xl font-bold text-yellow-500">12</div></div>
           <AlertOctagon className="text-yellow-500" size={32} />
        </div>
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between">
           <div><div className="text-sm text-slate-400">Kondisi Buruk (Rem/Ban)</div><div className="text-3xl font-bold text-red-500">5</div></div>
           <AlertOctagon className="text-red-500" size={32} />
        </div>
      </div>

      {/* TABLE MONITORING */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 font-bold">MONITORING ARMADA LIVE</div>
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-900/50 text-slate-400">
            <tr>
              <th className="px-6 py-3">Plat Nomor</th>
              <th className="px-6 py-3">Muatan</th>
              <th className="px-6 py-3">Kondisi Fisik</th>
              <th className="px-6 py-3">Status Utama</th>
              <th className="px-6 py-3">Lokasi</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {trucks.map((truck, idx) => {
              const condition = checkCondition(truck);
              
              return (
                <tr key={idx} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4 font-bold">{truck.id}</td>
                  <td className="px-6 py-4">
                    {truck.load} Ton <span className="text-xs text-slate-400">({truck.cargoType})</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 text-xs">
                        <span className={`px-2 py-1 rounded ${truck.brakeTemp > 250 ? 'bg-red-500/20 text-red-500' : 'bg-slate-700'}`}>Rem: {truck.brakeTemp}°C</span>
                        <span className={`px-2 py-1 rounded ${truck.tirePressure < 30 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-slate-700'}`}>Ban: {truck.tirePressure} PSI</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${condition.status === 'AMAN' ? 'text-green-500' : 'text-red-500'}`}>{condition.status}</span>
                    {condition.status !== 'AMAN' && <div className="text-xs text-red-400">{condition.detail}</div>}
                  </td>
                  <td className="px-6 py-4 text-slate-400 flex items-center gap-1">
                     <MapPin size={12}/> {truck.location}
                  </td>
                  <td className="px-6 py-4">
                    <button 
                        onClick={() => setSelectedTruck(truck)}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs flex items-center gap-1">
                        <Eye size={12}/> Detail
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL DETAIL DRIVER */}
      {selectedTruck && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-600 max-w-md w-full relative">
                <button onClick={() => setSelectedTruck(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">X</button>
                
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Truck className="text-blue-500"/> Detail Armada {selectedTruck.id}</h3>
                
                <div className="space-y-4 bg-slate-900 p-4 rounded-xl mb-4">
                    <div className="flex justify-between border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Pengemudi</span>
                        <span className="font-bold">{selectedTruck.driver}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Kontak</span>
                        <span className="font-bold">{selectedTruck.contact}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-700 pb-2">
                        <span className="text-slate-400">Jenis Muatan</span>
                        <span>{selectedTruck.cargoType}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Live Status</span>
                        <span className="text-green-500 animate-pulse">● Tracking Active</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button className="bg-green-600 hover:bg-green-500 py-2 rounded font-bold flex justify-center items-center gap-2">
                        <Phone size={18}/> Call Driver
                    </button>
                    <button className="bg-red-600 hover:bg-red-500 py-2 rounded font-bold flex justify-center items-center gap-2">
                        <AlertOctagon size={18}/> Report Issue
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default HQView;