
import React from "react"
import "../../styles/Home.scss"
import logo from "../../assets/eth.png";

import Wallet from "../../components/Wallet";

const Home = ({provider}) => (
  <>
    <div className="Home">
      <div className="Home__content">
        <h1 className="Home__content-title">Web3 Fundm3</h1>
        <Wallet />
      </div>
    </div>
  </>
);

export default Home