'use client';

import { Truck, Scale, Thermometer, CheckCircle, Zap } from 'lucide-react';

const KPICards = () => {
  const cards = [
    {
      title: "Total Armada Aktif",
      value: "1,240",
      icon: <Truck size={20} />,
      color: "blue",
      note: <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><Zap size={12}/> +12% Efficiency</p>
    },
    {
      title: "Pelanggaran ODOL",
      value: "42",
      icon: <Scale size={20} />,
      color: "yellow",
      valueColor: "text-yellow-500",
      note: <p className="text-xs text-slate-500 mt-2">Requires manual weighing</p>
    },
    {
      title: "Bahaya Rem Panas",
      value: "3",
      icon: <Thermometer size={20} />,
      color: "red",
      valueColor: "text-red-500",
      note: <p className="text-xs text-red-400 mt-2 font-medium">Critical Alert!</p>,
      special: true
    },
    {
      title: "Smart Gate Pass",
      value: "94%",
      icon: <CheckCircle size={20} />,
      color: "green",
      valueColor: "text-green-500",
      note: <p className="text-xs text-slate-500 mt-2">Green Lane Utilization</p>
    }
  ];

  const colorClasses = {
    blue: "bg-blue-500/10 text-blue-500",
    yellow: "bg-yellow-500/10 text-yellow-500",
    red: "bg-red-500/10 text-red-500",
    green: "bg-green-500/10 text-green-500"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className={`bg-slate-800 p-4 rounded-xl border border-slate-700 ${card.special ? 'relative overflow-hidden' : ''}`}
        >
          {card.special && (
            <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full -mr-4 -mt-4"></div>
          )}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">{card.title}</p>
              <h3 className={`text-2xl font-bold mt-1 ${card.valueColor || ''}`}>{card.value}</h3>
            </div>
            <div className={`p-2 ${colorClasses[card.color]} rounded-lg`}>
              {card.icon}
            </div>
          </div>
          {card.note}
        </div>
      ))}
    </div>
  );
};

export default KPICards;