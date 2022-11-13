
import React from "react"
import "../../styles/Home.scss"
import logo from "../../assets/eth.png";

/**
 * @TODO add connect wallet button
 */

const Home = ({provider}) => (
  <>
    <div className="Home">
      <div className="Home__content">
        <h1 className="Home__content-title">Web3 Fundm3</h1>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    </div>
  </>
);

const connectWallet = async () => {
    if(window.ethereum) {
      try {
        const res = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
      }

    }
}


export default Home