import React, { useContext } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Context } from "../../../Context";

const FundraiserCard = ({
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
    <Card style={{ width: "18rem" }} border="secondary">
      <Card.Body>
        <Card.Title as="h5">Title of Fundraiser</Card.Title>
        <Card.Text>Hosted By: Me</Card.Text>
        <Card.Subtitle className="text-muted">
          Goal Amount: 3000 ETH
          <span>
            {parseInt(goalAmount) > 100000
              ? toEther(goalAmount) + " ETH"
              : goalAmount + " Wei"}
          </span>
        </Card.Subtitle>
        <Card.Text className="mt-2">This is a description of the fudnraiser</Card.Text>
        <Link to={`/donate/${id}`}>
          <Button>Donate</Button>
        </Link>
        <div className="progress-bar"></div>
        <div className="progess" style={{ width: `${progressWidth}%` }}></div>
      </Card.Body>
    </Card>
  );
};

export default FundraiserCard;

/**
 * {description.slice(0,210)}
                {description.length > 200 ? "..." : ""}
 */
