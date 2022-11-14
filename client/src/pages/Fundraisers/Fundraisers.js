import { ethers } from "ethers";
import React, { useState, useContext, useEffect } from "react";
import Fundraiser_ABI from "../../contract-builds/Fundraiser.json";
import Loader from "../../components/Loader";
import { Context } from "../../Context";
import Card from "./components/Card";

const FundraisersView = () => {
  const [fundraiserDetails, setFundraiserDetails] = useState([]);
  const { fundraisers } = useContext(Context);

  useEffect(() => {
    const getFundraiserDetails = async (_address) => {
      let fundraiser = new ethers.Contract(Fundraiser_ABI, _address);
      let res = await fundraiser.getCardDetails();

      const {
        _title,
        _description,
        _goalAmount,
        _hostName,
        _fundRaiserAddress,
        _fundraiserBalance,
      } = res;

      let cardDetails = {
        title: _title,
        description: _description,
        goalAmount: _goalAmount,
        hostName: _hostName,
        fundraiserAddress: _fundRaiserAddress,
        fundraiserBalance: _fundraiserBalance,
      };

      return cardDetails;
    };

    for (const fundraiser in fundraisers) {
      getFundraiserDetails(
        fundraisers[fundraiser].then((cardDetails) => {
          setFundraiserDetails((prevDetails) => [...prevDetails, cardDetails]);
        })
      );
    }
  }, [fundraisers]);

  const fundraiserCards = fundraiserDetails.map((fundraiser, i) => {
    return (
      <Card
        key={i}
        id={fundraiser.fundraiserAddress}
        title={fundraiser.title}
        hostName={fundraiser.hostName}
        goalAmount={fundraiser.goalAmount}
        description={fundraiser.description}
        fundraiserBalance={fundraiser.fundraiserBalance}
      />
    );
  });

  return (
    <>
      <div className="Fundraisers">
        <div className="Fundraisers__list">
          <Card />
        </div>
      </div>
    </>
  );
};

export default FundraisersView;
/**
 *
 * DATA needed for this page
 *  -> all fundraisers that have been created
 *  -> instance of contract
 *
 *  FundraiserDetails struct {
 *    title:
 *    description:
 *    goalAmount:
 *    hostName:
 *    fundraiserAddr:
 *    fundraiserBalance:
 *    status
 *  }
 *
 *  Render -> <Card detailsObj />
 *
 *
 *  contract calls ->
 *    - getDetails() | getFundraiserDetails()
 *
 *  returns
 *    > goalAmount
 *    > hostName
 *    > title
 *    > description
 *    > fundraiserAddress
 *    > fundraiserBalance
 *
 *  The { hostName } should be renamed to -> organizer
 *
 *
 *  ACTIONS
 *  > onClick -> <button> Donate </button>
 *    -> routes user to fundraiser page
 */
