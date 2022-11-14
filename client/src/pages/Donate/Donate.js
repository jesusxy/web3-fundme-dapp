import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";

import Fundraiser_ABI from "../../contract-builds/Fundraiser.json";
import { Context } from "../../Context";

import Loader from "../../components/Loader";
import TxnLoader from "../../components/TxnLoader";
import "../../styles/Donate.scss";

const DonateView = () => {
  const { account } = useContext(Context);
  const [fundraiserDetails, setFundraiserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isTxnLoading, setIsTxnLoading] = useState(false);
  let { fundraiserAddress } = useParams();

  const heart = <span>❤</span>;

  const toDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        donationAmount: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    setIsLoading(true);
    if (!fundraiserAddress.startsWith("0x")) return;

    const getFundraiserDetails = async (_address) => {
      let fundraiser = new ethers.Contract(Fundraiser_ABI, _address);
      let res = await fundraiser.getAllFundraiserDetails();

      const {
        _goalAmount,
        _donors,
        _expiryDate,
        _ongoing,
        _hostName,
        _title,
        _description,
        _hostAddress,
        _recipientAddress,
        _fundraiserAddress,
        _fundraiserBalance,
      } = res;

      let fundraiserDetails = {
        title: _title,
        description: _description,
        goalAmount: ethers.utils.formatEther(_goalAmount),
        donors: _donors - 1,
        expiryDate: _expiryDate,
        ongoing: _ongoing,
        hostName: _hostName,
        hostAddress: _hostAddress,
        recipientAddress: _recipientAddress,
        fundraiserAddress: _fundraiserAddress,
        fundraiserBalance: ethers.utils.formatEther(_fundraiserBalance),
      };

      return fundraiserDetails;
    };

    getFundraiserDetails(fundraiserAddress).then((res) => {
      setFundraiserDetails(res);
      setIsLoading(false);
    });
  }, [fundraiserAddress, isSubmitSuccessful]);

  const onDonateSubmit = async (_data) => {
    setIsTxnLoading(true);
    let { donationAmount } = _data;

    try {
      let fundraiser = new ethers.Contract(Fundraiser_ABI, fundraiserAddress);
      await fundraiser.donate().send({ from: account, value: donationAmount });

      alert("Transaction Successful!");
    } catch (error) {
      alert(`Failed to donate to fundraiser at ${fundraiserAddress}`);
      console.error(error);
    }

    setIsTxnLoading(false);
  };

  const donationMessage = () => {
    switch (fundraiserDetails.donors) {
      case 0:
        return "Be the first to donate for this cause!";
      case 1:
        return `${fundraiserDetails.fundraiserBalance} ETH raiased by a generous human!`;
      default:
        break;
    }

    return `${fundraiserDetails.fundraiserBalance} ETH raised by ${fundraiserDetails.donors} generous humans!`;
  };

  return (
    <div className="DonateView">
      {isTxnLoading ? <TxnLoader /> : ""}
      <div className="DonateView__card">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="DonateView__card-left">
              <div className="DonateView__card-title">
                {fundraiserDetails.title}
              </div>
              <div className="DonateView__card-description">
                {fundraiserDetails.description}
              </div>
              <div className="DonateView__card-donors">
                {donationMessage()} {heart}
              </div>
            </div>

            <div className="DonateView__card-right">
              <div className="DonateView__card-top">
                <div className="DonateView__card-host">
                  Hosted By: <span>{fundraiserDetails.hostName}</span>
                </div>
                <div className="DonateView__card-recipient">
                  Benificiary: {""}
                  <span>{fundraiserDetails.recipientAddress}</span>
                </div>
              </div>

              <div className="DonateView__card-bottom">
                <form onSubmit={handleSubmit(onDonateSubmit)}>
                  <div className="DonateView__card-details">
                    <div className="DonateView__card-goalAmount">
                      Goal Amount:{" "}
                      <span>{fundraiserDetails.goalAmount} ETH</span>
                    </div>
                    <div className="DonateView__card-expiry">
                      Exires On:{" "}
                      <span>{toDate(fundraiserDetails.expiryDate)}</span>
                    </div>
                  </div>
                  <input
                    type="number"
                    name="donationAmount"
                    id="donationAmount"
                    className="DonateView__card-input"
                    placeholder="Donation Amount (wei)"
                    {...register("donationAmount", { required: true })}
                  />
                  {errors.donationAmount && <span>This field is required</span>}
                  <button type="submit" className="DonateView__submit">
                    Donate
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DonateView;

/**
 * Donate page shows the details of the Fundraiser
 * This is where the user will send money to contract
 *
 * Will have a <Card /> with fundraiser details
 * Can also have a column of all donations that are being made to this fundraiser
 *
 * ----- UTIL functions
 *  > toDate
 *
 *
 * ----- CLASS functions | methods
 *  > donationMessage
 *  > onDanteSubmit
 *
 *
 * ----- LIFECYCLE methods
 *  > getFundraiserDetails
 *  > reset()
 *
 *
 * ----- Page STATE variables
 *  > web3
 *  > accounts
 *  > fundraiserDetails
 *  > isLoading
 *  > isTxnLoading
 *  > fundraiserAddress
 *
 * ----- CONTRACT method calls
 *  > addDonation( )
 *  > getAllDetails
 */

/**
 * Column of DONATIONS
 * > SIDEBAR containing all donations that have been made to this contract
 * > would have to listen to event and log the values
 * > STATE variable holding all donations
 * > loop through ARRAY and return details of donator + amount contributed
 *
 *
 *
 */
