import React, {useState, useContext, useEffect} from "react";
import Loader from '../../components/Loader';

const FundraisersView = () => {
  const [fundraiserDetails, setFundraiserDetails] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <>
      <div className="Fundraisers">
        <div className="Fundraisers__list">
          {/**
           * if no fundraisers => render Loader
           * else render list of fundraisers
           */}
        </div>
      </div>
    </>
  )

}

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

