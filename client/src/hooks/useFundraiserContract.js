import { ethers } from "ethers";
// import lottery ABI

// declare contract address variable
let addr = "";
let abi = [];
export default function useFundraiserContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const fundraiserContract = new ethers.Contract(addr, abi, signer);

  return {
    provider, 
    signer,
    fundraiserContract
  }
}