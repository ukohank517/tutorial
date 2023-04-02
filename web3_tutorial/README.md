# About

This is a sample job to get contract from ethereum.

the contract is deployed [here](https://sepolia.etherscan.io/tx/0xd1fe6f8f4d2a6363e9c37be396f92af2e5c327ccdb56a48fe751899aa61ca1a2)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Other
contract is deployed by other tool,
the content inside is beyond:
```sol
pragma solidity 0.8.18;

contract SimpleStorage {
    string public message = "Hello Solidity";

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
```
