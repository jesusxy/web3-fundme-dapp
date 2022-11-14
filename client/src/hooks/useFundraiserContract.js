import { ethers } from "ethers";
import FundraiserStore_ABI from '../contract-builds/FundraiserStore.json';

// declare contract address variable
let FUNDRAISER_STORE_CONTRACT_ADDR = "0xfe32190C3962A474d0086208F5883d710Cc75259";

export default function useFundraiserContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const fundraiserContract = new ethers.Contract(FUNDRAISER_STORE_CONTRACT_ADDR, FundraiserStore_ABI, signer);

  return {
    provider, 
    signer,
    fundraiserContract
  }
}