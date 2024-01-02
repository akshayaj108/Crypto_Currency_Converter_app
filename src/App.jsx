import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import { apiUrl } from "./context/link";
import "./App.css";
function App() {
  const [coin, setCoin] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await fetch(`${apiUrl}/fetch`);
        const coins = await data.json();
        console.log(data);

        if (data.ok) {
          setCoin(coins);
        } else {
          throw new Error("Could not get the coin list");
        }
      } catch (error) {
        setErr("Error in API fetching data. Please try after Some time.");
        console.log("Error in API fetching data. Please try after Some time.");
      }
    };
    fetchCoins();
  }, []);

  return (
    <div className="main">
      <h2>Welcome to Crypto World</h2>
      <Form coin={coin} />
      {err && <p style={{ color: "red" }}>{err}</p>}
    </div>
  );
}

export default App;
