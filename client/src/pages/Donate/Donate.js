import React, { useContext, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useForm } from "react-hook-form"

import Loader from '../../components/Loader';
import TxnLoader from '../../components/TxnLoader';
import '../../styles/Donate.scss';

const DonateView = () => {
  const [fundraiserDetails, setFundraiserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isTxnLoading, setIsTxnLoading] = useState(false);

  const heart = <span>❤</span>

  const toDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`
  }

  const {
    register, 
    handleSubmit,
    reset,
    formState: {errors, isSubmitSuccessful},
  } = useForm();

  const onDonateSubmit = () => {}

  const donationMessage = () => {}

  return (
    <div className="DonateView">
      <div className="DonateView__card">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="DonateView__card-left">
              <div className="DonateView__card-title">Test Fundraiser</div>
              <div className="DonateView__card-description">
                This is a test fundraiser This is a test fundraiser This is a test fundraiser This is a test fundraiser
                This is a test fundraiser This is a test fundraiser This is a test fundraiser This is a test fundraiser
                This is a test fundraiser This is a test fundraiser This is a test fundraiser This is a test fundraiser
              </div>
              <div className="DonateView__card-donors"></div>
            </div>

            <div className="DonateView__card-right">
              <div className="DonateView__card-top">
                <div className="DonateView__card-host">
                  Hosted By: {" "} <span>Organizer Name</span>
                </div>
                <div className="DonateView__card-recipient">
                  Recipient: {""} <span>0xb794f5ea0ba39494ce839613fffba74279579268</span>
                </div>
              </div>

              <div className="DonateView__card-bottom">
                <form onSubmit={handleSubmit(onDonateSubmit)}>
                  <div className="DonateView__card-details">
                    <div className="DonateView__card-goalAmount">
                      Goal Amount: <span>100 ETH</span>
                    </div>
                    <div className="DonateView__card-expiry">
                      Exires On: <span>10/10/2020</span>
                    </div>
                  </div>
                  <input 
                    type="number"
                    name="donationAmount"
                    id="donationAmount"
                    className="DonateView__card-input"
                    placeholder="Donation Amount (wei)"
                  />
                  {errors.donationAmount && (
                    <span>This field is required</span>
                  )}
                  <button type="submit" className="DonateView__submit">Donate</button>
                </form>
              </div>
              
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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