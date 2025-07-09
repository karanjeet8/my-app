// File: src/context/DepositContext.js
import React, { createContext, useState } from "react";

export const DepositContext = createContext();

export const DepositProvider = ({ children }) => {
  const [deposits, setDeposits] = useState([]);
  const [balance, setBalance] = useState(0);
  const [currentUser, setCurrentUser] = useState("user@example.com");

  const addDeposit = (amount, txid) => {
    const deposit = {
      id: "TXN" + Date.now(),
      user: currentUser,
      amount,
      txid,
      date: new Date().toLocaleString(),
    };
    setDeposits((prev) => [deposit, ...prev]);
    setBalance((prev) => prev + parseFloat(amount));
  };

  return (
    <DepositContext.Provider
      value={{ deposits, balance, currentUser, addDeposit }}
    >
      {children}
    </DepositContext.Provider>
  );
};
