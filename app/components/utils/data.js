// src/app/components/utils/data.js

export const INITIAL_TRUCKS = [
  { 
    id: "B 9921 XA", 
    driver: "Budi Santoso",
    contact: "0812-3333-4444",
    cargoType: "Semen Curah",
    load: 22, 
    maxLoad: 20, 
    speed: 75, 
    maxSpeed: 80,       // Batas aman
    topGaugeSpeed: 140, // Angka mentok di speedometer (VISUAL)
    brakeTemp: 180, 
    tirePressure: 28, 
    location: "Tol Cipularang KM 90", 
    status: "ODOL" 
  },
  { 
    id: "D 1234 ABC", 
    driver: "Asep Knalpot",
    contact: "0818-5555-6666",
    cargoType: "Elektronik",
    load: 12, 
    maxLoad: 15, 
    speed: 60, 
    maxSpeed: 90,
    topGaugeSpeed: 140, // Tambahkan ini
    brakeTemp: 90, 
    tirePressure: 34, 
    location: "Arteri Padalarang", 
    status: "AMAN" 
  },
  { 
    id: "B 5555 ZZ", 
    driver: "Ujang Galon",
    contact: "0813-7777-8888",
    cargoType: "Air Mineral",
    load: 30, 
    maxLoad: 20, 
    speed: 95, 
    maxSpeed: 80,
    topGaugeSpeed: 140, // Tambahkan ini
    brakeTemp: 320, 
    tirePressure: 32, 
    location: "Turunan Gombel", 
    status: "BAHAYA" 
  },
];

export const generateChartData = () => {
  return Array.from({ length: 10 }, (_, i) => ({
    time: `${10 + i}:00`,
    avgTemp: 100 + Math.random() * 50,
    odolCount: Math.floor(Math.random() * 20),
  }));
};