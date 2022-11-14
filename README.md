# Web3 FundMe dApp

## Idea
Decentralize crowdfunding to avoid Fundraisers being taken down or donations being blocked like the Canadian truckers incident during COVID-19.

## Description
The application essentially provides a decentralized platform where users can create Fundraisers by adding the required details and they can also donate to the existing Fundraisers. 

The donation amount is stored in the smart-contract until the goal set by the organizer is reached or the expiry date set by the organizer has passed. 
If the goal amount is reached before the expiry date, the collected funds are transferred to the beneficiary's address.

## Goals
- Smart contract to 
  - create fundraisers
  - retrieve fundraisers data
  - withdraw
  - emit events (Contract_Created, Funds_Donated, Goal_Reached, Fundraiser_Ended, Fund_Withdraw)
- React UI
  - Home page ( connect wallet ) 
  - Browse page ( view all fundraisers )
  - Fundraiser Page ( view fundraiser by address )
  - Create Fundraiser 

## Future Upgrades | What I would do differently
- Categorize fundraisers
  - Browse by category
- Show log of recent donations to Fundraiser
- Make this a DAO in order to ensure security and provide a way to ban malicious actors out. 
  - Verify that funds are being used for its intended purpose.

## How To Use

- Run ``npm install`` in root directory to install dev dependencies.
- ``cd client/`` to navigate into Front-End directory and run ``npm install`` to install all required node_modules for React App
- Run ``npm run start`` in client directory to start the React App
- Open [http://localhost:3000](http://localhost:3000) in Browser to view the result

## Demo
