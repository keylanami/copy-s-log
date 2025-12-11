'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import KPICards from '@/app/components/KPI';
import TemperatureChart from '@/app/components/TempChart';
import FleetTable from '@/app/components/FleetTable';
import SmartGateFeed from '@/app/components/SmartGate';
import MapWidget from '@/app/components/MapWidget';
import { INITIAL_TRUCKS, generateChartData } from '@/app/components/utils/data';

const DashboardPage = () => {
  const [trucks, setTrucks] = useState(INITIAL_TRUCKS);
  const [gateLogs, setGateLogs] = useState([]);
  const [chartData, setChartData] = useState(generateChartData());

  // Real-time Telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks(prevTrucks => prevTrucks.map(t => ({
        ...t,
        speed: Math.max(0, t.speed + (Math.random() * 10 - 5)),
        brakeTemp: Math.max(50, t.brakeTemp + (Math.random() * 15 - 5)),
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Smart Gate Entries
  useEffect(() => {
    const interval = setInterval(() => {
      const isSafe = Math.random() > 0.3;
      const newLog = {
        id: Date.now(),
        plat: `B ${Math.floor(Math.random() * 9000)} ${isSafe ? 'TX' : 'XX'}`,
        timestamp: new Date().toLocaleTimeString(),
        status: isSafe ? 'GREEN LANE' : 'MANUAL CHECK',
        isSafe: isSafe
      };
      setGateLogs(prev => [newLog, ...prev].slice(0, 5));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500/30">
      <Header />
      
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <KPICards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            <TemperatureChart chartData={chartData} />
            <FleetTable trucks={trucks} setTrucks={setTrucks} />
          </div>

         
          <div className="space-y-6">
            <SmartGateFeed gateLogs={gateLogs} />
            <MapWidget />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;


