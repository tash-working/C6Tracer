import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const plastics = [
  { id: "1", name: "PET", symbol: "♳", co2PerKg: 2.1 },
  { id: "2", name: "HDPE", symbol: "♴", co2PerKg: 1.8 },
  { id: "3", name: "PVC", symbol: "♵", co2PerKg: 3.0 },
  { id: "4", name: "LDPE", symbol: "♶", co2PerKg: 1.7 },
  { id: "5", name: "PP", symbol: "♷", co2PerKg: 1.9 },
  { id: "6", name: "PS", symbol: "♸", co2PerKg: 3.4 },
];

function CarbonFootprint({ plasticData }) {
  const [totalPlastics, setTotalPlastics] = useState({});
  const [savedCO2, setSavedCO2] = useState(0);
  const [totalPlasticSaved, setTotalPlasticSaved] = useState(0);

  useEffect(() => {
    if (plasticData && Object.keys(plasticData).length > 0) {
      setTotalPlastics(plasticData);
      calculateCO2(plasticData);
      console.log("Updated plasticData:", plasticData);
    }
  }, [plasticData]);

  const calculateCO2 = (data) => {
    let totalCO2 = 0;
    let totalPlastic = 0;
    plastics.forEach(({ id, co2PerKg }) => {
      const amount = parseFloat(data[id]) || 0;
      totalCO2 += amount * co2PerKg;
      totalPlastic += amount;
    });
    setSavedCO2(totalCO2);
    setTotalPlasticSaved(totalPlastic);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1.5rem",
        padding: "1.5rem",
        background: "#f5f5f5",
        minHeight: "auto",
        height: "fit-content",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          flex: 1,
          minWidth: "280px",
          maxWidth: "450px",
          padding: "20px",
          background: "white",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
          borderRadius: "15px",
          textAlign: "center",
          border: "1px solid #ddd",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        <h1
          style={{
            fontSize: "1.8rem",
            color: "#2c3e50",
            marginBottom: "1rem",
          }}
        >
          Your Plastic Collection
        </h1>
        {plastics.map(({ id, name, symbol, co2PerKg }) => (
          <div
            key={id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "8px 0",
              padding: "8px",
              backgroundColor: "#ecf0f1",
              borderRadius: "8px",
            }}
          >
            <span style={{ fontSize: "1rem", color: "#34495e" }}>
              {symbol} {name}:
            </span>
            <span style={{ fontSize: "1rem", color: "#34495e" }}>
              {totalPlastics[id] || 0} kg ({((totalPlastics[id] || 0) * co2PerKg).toFixed(2)} kg CO2)
            </span>
          </div>
        ))}
        <h2
          style={{
            fontSize: "1.4rem",
            color: "#2c3e50",
            marginBottom: "1rem",
          }}
        >
          Total Plastic Saved: {totalPlasticSaved.toFixed(2)} kg
        </h2>
        <h2
          style={{
            fontSize: "1.4rem",
            color: "#2c3e50",
            marginBottom: "1rem",
          }}
        >
          Total CO2 Saved: {savedCO2.toFixed(2)} kg
        </h2>
      </motion.div>
    </div>
  );
}

export default CarbonFootprint;
