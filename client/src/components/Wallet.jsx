import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import Button from "react-bootstrap/Button";

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
    <div className="mt-5">
      {isConnected ? (
        <div>
          <span>
            Successfully Connected to Wallet : {accounts.slice(0, 4)}...
            {accounts.slice(38, 42)}
          </span>
        </div>
      ) : (
        <div className="mt-4">
          <span>Please Connect your wallet to begin donating.</span>
          <div className="ml-2 mt-3">
            <Button
              variant="outline-light"
              size="md"
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
          </div>
          {errorMessage && <span>Error: {errorMessage}</span>}
        </div>
      )}
    </div>
  );
};

export default Wallet;
