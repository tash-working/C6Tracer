import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const plastics = [
  { id: 1, name: "PET", symbol: "♳", co2PerKg: 2.1 },
  { id: 2, name: "HDPE", symbol: "♴", co2PerKg: 1.8 },
  { id: 3, name: "PVC", symbol: "♵", co2PerKg: 3.0 },
  { id: 4, name: "LDPE", symbol: "♶", co2PerKg: 1.7 },
  { id: 5, name: "PP", symbol: "♷", co2PerKg: 1.9 },
  { id: 6, name: "PS", symbol: "♸", co2PerKg: 3.4 },
];

function CarbonFootprintCalculator() {
  const [amounts, setAmounts] = useState({});
  const [savedCO2, setSavedCO2] = useState(0);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("plasticsData")) || {};
    setAmounts(savedData);
    calculateCO2(savedData);
  }, []);

  const handleChange = (id, value) => {
    const updatedAmounts = { ...amounts, [id]: value };
    setAmounts(updatedAmounts);
    calculateCO2(updatedAmounts);
  };

  const calculateCO2 = (data) => {
    let totalCO2 = 0;
    plastics.forEach(({ id, co2PerKg }) => {
      totalCO2 += (data[id] || 0) * co2PerKg;
    });
    setSavedCO2(totalCO2);
  };

  const handleSubmit = () => {
    localStorage.setItem("plasticsData", JSON.stringify(amounts));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "linear-gradient(to bottom right, #a8e6cf, #56cfe1)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: "500px", padding: "20px", background: "white", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", borderRadius: "20px", border: "4px solid #38a169", textAlign: "center" }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#2d3748" }}>♻️ Carbon Footprint Calculator</h1>
        <p style={{ color: "#4a5568" }}>Enter your plastic usage (kg) below:</p>

        {plastics.map(({ id, name, symbol }) => (
          <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#edf2f7", padding: "10px", margin: "10px 0", borderRadius: "10px", border: "1px solid #cbd5e0" }}>
            <span style={{ fontWeight: "bold", color: "#2d3748" }}>{symbol} {name}</span>
            <input
              type="number"
              value={amounts[id] || ""}
              onChange={(e) => handleChange(id, parseFloat(e.target.value) || 0)}
              style={{ width: "60px", padding: "5px", border: "1px solid #a0aec0", borderRadius: "8px", textAlign: "center" }}
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          style={{ marginTop: "10px", padding: "10px 20px", background: "#38a169", color: "white", fontWeight: "bold", borderRadius: "10px", border: "none", cursor: "pointer", transition: "background 0.3s" }}
          onMouseOver={(e) => e.target.style.background = "#2f855a"}
          onMouseOut={(e) => e.target.style.background = "#38a169"}
        >
          Save Data
        </button>

        <div style={{ marginTop: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#2d3748" }}>CO2 Saved: {savedCO2.toFixed(2)} kg</h2>
          <div style={{ width: "100%", background: "#e2e8f0", height: "20px", borderRadius: "10px", marginTop: "10px" }}>
            <motion.div
              style={{ height: "20px", background: "#38a169", borderRadius: "10px" }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(savedCO2, 100)}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CarbonFootprintCalculator;