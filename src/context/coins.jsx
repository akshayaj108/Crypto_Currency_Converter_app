import { createContext } from "react";

const coinContext = createContext(null);

const coinsHandle = {
  coins: [],
  setCoins: () => {},
};
const CoinProvider = ({ children }) => {
  <coinContext.Provider value={coinsHandle}>{children}</coinContext.Provider>;
};
export { coinContext, CoinProvider };
