import { createContext, useContext, useState } from "react";

const salesContext = createContext(null);

// creating central data using use context API in react
// sales data available on all pages. and create custom hook function for useSalesRecord for context API

export const SalesContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [salesItem, setSalesItem] = useState({
    salesId: "",
    productName: "",
    quantity: "",
    salesAmount: "",
  });
  

  const localStorageToken = (token) => {
    setToken(token);
    return localStorage.setItem("jwtSAtoken", token);
  };


  return (
    <salesContext.Provider
      value={{
        salesData,
        setSalesData,
        salesItem,
        setSalesItem,
        localStorageToken,
        token,
        setToken,
      }}
    >
      {children}
    </salesContext.Provider>
  );
};

// custom hook

export const useSalesRecord = () => {
  return useContext(salesContext);
};
