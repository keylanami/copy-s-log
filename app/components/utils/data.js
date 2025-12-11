
export const INITIAL_TRUCKS = [
  { id: "B 9921 XA", load: 22, maxLoad: 20, speed: 75, brakeTemp: 180, location: "Tol Cipularang KM 90", status: "ODOL" },
  { id: "D 1234 ABC", load: 12, maxLoad: 15, speed: 60, brakeTemp: 90, location: "Arteri Padalarang", status: "SAFE" },
  { id: "B 5555 ZZ", load: 30, maxLoad: 20, speed: 95, brakeTemp: 320, location: "Turunan Gombel", status: "CRITICAL" },
  { id: "F 8812 GH", load: 18, maxLoad: 20, speed: 45, brakeTemp: 110, location: "Puncak Pass", status: "SAFE" }
];

export const generateChartData = () => {
  return Array.from({ length: 10 }, (_, i) => ({
    time: `${10 + i}:00`,
    avgTemp: 100 + Math.random() * 50,
    odolCount: Math.floor(Math.random() * 20),
  }));
};