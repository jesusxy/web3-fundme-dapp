import React from "react";

const TxnLoader = () => {
  return(
    <div className="TxnLoader">
      <div className="TxnLoader__loader">
        <svg className="TxnLoader__circle" viewBox="25 25 50 50">
          <circle 
            className="path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
      <p>
        Processing transaction on blockchain.. This may take minute, please be patient.
      </p>
    </div>
  );
}

export default TxnLoader;