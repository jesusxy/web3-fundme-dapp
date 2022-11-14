import React, { useState, useEffect } from "react"
import useFundraiserContract from './hooks/useFundraiserContract';

const Context = React.createContext();

function ContextProvider({children}) {
  const [_provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [fundraisers, setFundraisers] = useState([]);
  const [account, setAccount] = useState(null);
  const {provider, signer, fundraiserContract} = useFundraiserContract();

  useEffect(() => {
    const init = async () => {
      try {
        setAccount(signer);
        setProvider(provider);
        setContract(fundraiserContract);
    
        const fundraiserList = await contract.getAll();
        setFundraisers(fundraiserList);
      } catch(e) {
        alert("Please install Metamask extension to have access to platforms features.");
        console.error(e);
      }

      init();
    }
  }, []);

  const updateFundraisers = async () => {
    const fundraiserList = await contract.getAll();
    setFundraisers(fundraiserList);
  }

  return(
    <Context.Provider
      value={{_provider, contract, account, fundraisers, updateFundraisers}}
    >
      {children}
    </Context.Provider>
  )

}

export { ContextProvider, Context };