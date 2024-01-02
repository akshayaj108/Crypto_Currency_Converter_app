import React from "react";
import "../App.css";
import { useState, useEffect, useMemo } from "react";
const Form = ({ coin }) => {
  const [err, setErr] = useState("");
  const [result, setResult] = useState(undefined);
  console.log("props", coin);
  const [formData, setFormData] = useState({
    fromCurrency: "USD",
    toCurrency: "",
    amount: "",
  });

  const handleEvent = (event) => {
    const { name, value } = event.target;
    console.log("form data==", name, " ", value);
    setErr("");
    setFormData({ ...formData, [name]: value });
  };
  //submit handler
  const processSubmit = useMemo(
    async (event) => {
      event.preventDefault();
      console.log(formData);
      const response = await fetch("http://localhost:4500/fetch/convert", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();
      if (!response.ok) {
        setErr(resData.message);
      }
      return setResult(resData);
    },
    [result.result]
  );
  return (
    <form className="formDesign" onSubmit={processSubmit}>
      <label htmlFor="toCurrency">Select Cryptocurrency</label>
      <select
        className="inpSelect"
        name="toCurrency"
        value={formData.toCurrency}
        onChange={handleEvent}
      >
        <option className="inpSelect" value="">
          {" "}
          Crypto Coin
        </option>
        {coin?.map((coinEle) => (
          <option className="inpSelect" key={coinEle.id} value={coinEle.symbol}>
            {coinEle.name}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="fromCurrency">Select Regular Currency</label>
      <select
        className="inpSelect"
        name="fromCurrency"
        value={formData.fromCurrency}
        id=""
        onChange={handleEvent}
      >
        <option className="inpSelect" value="USD">
          USD - US Dollar
        </option>
        <option style={{ margin: "auto" }} className="inpSelect" value="EUR">
          EUR - Euro
        </option>
        <option className="inpSelect" value="INR">
          INR - Ind Rupees
        </option>
      </select>
      <br />
      <label htmlFor="amount">Amount</label>
      <input
        type="text"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleEvent}
      />
      <br />
      <br />
      <input type="submit" />
      {result ? (
        <p className="resultBox">{result.result}</p>
      ) : (
        <p>Fetching Latest Price</p>
      )}
      {err && <p style={{ color: "red" }}>{err}</p>}
    </form>
  );
};

export default Form;
