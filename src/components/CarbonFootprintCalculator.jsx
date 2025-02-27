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

function CarbonFootprintCalculator({ plasticData }) {
  const [amounts, setAmounts] = useState({});
  const [totalPlastics, setTotalPlastics] = useState({});
  const [savedCO2, setSavedCO2] = useState(0);
  const [totalPlasticSaved, setTotalPlasticSaved] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const userId = JSON.parse(localStorage.getItem("id"));

  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await fetch(`https://c6-tracer.vercel.app/${userId}/get_id`);
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        const savedData = data[0].plasticData || {};
        setTotalPlastics(savedData);
        calculateCO2(savedData);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchId();
  }, []);

  const handleChange = (id, value) => {
    setAmounts((prev) => ({ ...prev, [id]: value }));
  };

  const calculateCO2 = (data) => {
    let totalCO2 = 0;
    let totalPlastic = 0;
    plastics.forEach(({ id, co2PerKg }) => {
      const amount = data[id] || 0;
      totalCO2 += amount * co2PerKg;
      totalPlastic += amount;
    });
    setSavedCO2(totalCO2);
    setTotalPlasticSaved(totalPlastic);
  };

  const handleSubmit = async () => {
    try {
      const existingData = JSON.parse(localStorage.getItem("plasticsData")) || {};
      const updatedData = { ...existingData };

      plastics.forEach(({ id }) => {
        if (amounts[id]) {
          updatedData[id] = (updatedData[id] || 0) + amounts[id];
        }
      });

      const response = await fetch(`https://c6-tracer.vercel.app/${userId}/updatePlasticData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        localStorage.setItem("plasticsData", JSON.stringify(updatedData));
        setTotalPlastics(updatedData);
        calculateCO2(updatedData);
        setMessage("Data saved successfully!");
        setAmounts({});
      } else {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Error saving data: " + error.message);
    }
  };

  return (
    <div className="container">
      <motion.div className="card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <h1>♻️ Carbon Footprint Calculator</h1>
        <p>Enter your plastic usage (kg) below:</p>

        {plastics.map(({ id, name, symbol }) => (
          <div key={id} className="input-group">
            <span>{symbol} {name}</span>
            <input type="number" value={amounts[id] || ""} onChange={(e) => handleChange(id, parseFloat(e.target.value) || 0)} />
          </div>
        ))}

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <button onClick={handleSubmit} className="save-button">Save Data</button>
      </motion.div>

      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2>🌍 Your Plastic Collection</h2>
        {plastics.map(({ id, name, symbol, co2PerKg }) => (
          <div key={id} className="summary">
            <span>{symbol} {name}:</span>
            <span>{totalPlastics[id] || 0} kg ({((totalPlastics[id] || 0) * co2PerKg).toFixed(2)} kg CO2)</span>
          </div>
        ))}

        <h2>Total Plastic Saved: {totalPlasticSaved.toFixed(2)} kg</h2>
        <h2>Total CO2 Saved: {savedCO2.toFixed(2)} kg</h2>
      </motion.div>
    </div>
  );
}

export default CarbonFootprintCalculator;

// CSS Styling
const styles = `
/* CSS Styling */

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f5f5f5;
  min-height: auto;
  height: fit-content;
}

.card {
  flex: 1;
  min-width: 280px;
  max-width: 450px;
  padding: 20px;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  text-align: center;
  border: 1px solid #ddd;
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.card h1 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.card h2 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.input-group {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.input-group span {
  font-size: 1rem;
  color: #34495e;
  flex: 1 1 100%;
  margin-bottom: 6px;
}

.input-group input {
  width: 60%;
  padding: 8px;
  border: 2px solid #3498db;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #2c3e50;
  transition: border-color 0.3s ease;
  margin-left: 10px;
}

.input-group input:focus {
  border-color: #2980b9;
  outline: none;
}

.save-button {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.save-button:hover {
  background-color: #2980b9;
}

.summary {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  padding: 8px;
  background-color: #ecf0f1;
  border-radius: 8px;
}

.summary span {
  font-size: 0.9rem;
  color: #34495e;
}

.success {
  color: #27ae60;
  font-size: 0.8rem;
  margin-top: 10px;
}

.error {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
    gap: 1rem;
    
  }

  .card {
    width: 100%;
    padding: 15px;
    min-width: 100%;
  }

  .card h1 {
    font-size: 1.5rem;
  }

  .card h2 {
    font-size: 1.2rem;
  }

  .input-group {
    margin: 8px 0;
    flex-direction: column;
    align-items: flex-start;
  }

  .input-group span {
    font-size: 0.9rem;
  }

  .input-group input {
    width: 100%;
    padding: 6px;
    font-size: 0.8rem;
    margin-top: 4px;
  }

  .save-button {
    padding: 8px;
    font-size: 0.8rem;
  }

  .summary {
    margin: 6px 0;
    padding: 6px;
  }

  .summary span {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0.5rem;
    gap: 0.5rem;
   
  }

  .card {
    width: 100%;
    padding: 10px;
  }

  .card h1 {
    font-size: 1.3rem;
  }

  .card h2 {
    font-size: 1.1rem;
  }

  .input-group {
    flex-direction: column;
    align-items: flex-start;
    margin: 6px 0;
  }

  .input-group span {
    font-size: 0.8rem;
  }

  .input-group input {
    width: 100%;
    padding: 6px;
    font-size: 0.8rem;
    margin-top: 4px;
  }

  .save-button {
    padding: 8px;
    font-size: 0.8rem;
  }

  .summary {
    flex-direction: column;
    align-items: flex-start;
    margin: 4px 0;
    padding: 6px;
  }

  .summary span {
    font-size: 0.8rem;
    margin: 4px 0;
  }
}

`;
document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
