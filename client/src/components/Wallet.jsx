import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

//import "../styles/Wallet.scss";

const Wallet = ({ provider }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [accounts, setAccount] = useState(null);
  const [isConnected, setIsConencted] = useState(false);
  const [walletBalance, setWalletBalance] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(res[0]);
        setIsConencted(true);
      } catch (err) {
        console.log("Error Connecting: ", err);
        setErrorMessage("There was a problem connecting to MetaMask");
      }
    } else {
      setErrorMessage("Please install Metamask browser extension");
    }
  };

  return (
    <div>
      {isConnected ? (
        <div>
          <span>
            Successfully Connected to Wallet : {accounts.slice(0, 4)}...
            {accounts.slice(38, 42)}
          </span>
        </div>
      ) : (
        <div>
            <span>
                Please Connect your wallet to donate.
            </span>
            <button onClick={connectWallet}>Connect Wallet</button>
            {errorMessage && (
                <span>Error: { errorMessage }</span>
            )}
        </div>
      )}
    </div>
  );
};

export default Wallet;
