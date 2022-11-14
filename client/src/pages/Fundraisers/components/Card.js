import React, { useContext } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";

import { Context } from "../../../Context";

const Card = ({
  id,
  title,
  hostName,
  goalAmount,
  description,
  fundraiserBalance,
}) => {
  const progressWidth =
    (parseInt(fundraiserBalance) * 100) / parseInt(goalAmount);
  const toEther = (amount) => ethers.utils.formatEther(amount);

  return (
    <div>
      <div>
        <h2>Title of Fundraiser</h2>
        <h2>Hosted By ME</h2>
      </div>
      <h2>
        Goal Amount: 3000 ETH
        <span>
          {parseInt(goalAmount) > 100000
            ? toEther(goalAmount) + " ETH"
            : goalAmount + " Wei"}
        </span>
      </h2>
      <p>This is a description of the fudnraiser</p>
      <Link to={`/donate/${id}`}>
        <button>Donate</button>
      </Link>
      <div className="progress-bar"></div>
      <div className="progess" style={{ width: `${progressWidth}%` }}></div>
    </div>
  );
};

export default Card;

/**
 * {description.slice(0,210)}
                {description.length > 200 ? "..." : ""}
 */
