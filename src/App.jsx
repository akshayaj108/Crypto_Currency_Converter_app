import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import "./App.css";
function App() {
  const [coin, setCoin] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await fetch("http://localhost:4500/fetch");
        const coins = await data.json();

        setErr("");
        setCoin(coins);
      } catch (error) {
        setErr("Error in API fetching data. Please try after Some time.");
        console.log("Error in API fetching data. Please try after Some time.");
      }
    };
    fetchCoins();
  }, []);
  console.log("error from app==", err);
  return (
    <div className="main">
      <h2>Welcome to Crypto World</h2>
      <Form coin={coin} />
      {err && <p style={{ color: "red" }}>{err}</p>}
    </div>
  );
}

export default App;
