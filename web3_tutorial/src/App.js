import Web3 from "web3"
import React, { useState } from 'react';
import { CONTRACT_ABI, CONTRACT_ADRESS } from "./contract_property"

function App() {
  let provider = window.ethereum || (window.web3 && window.web3.provider) || undefined;
  const [errorMessage, setErrorMessage] = useState();
  const [account, setAccount] = useState(); // const account = web3.eth.getAccounts()[0];
  const [message, setMessage] = useState('getting...')

  async function getMessage(){
    const msg = await contract.methods.message().call();
    setMessage(msg)
  }


  if(provider){
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {
        setAccount(result[0]);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADRESS, {from: account});
  getMessage(contract)

  async function sendMessage (e){
    e.preventDefault();
    const message = document.getElementById("message").value;
    console.log(account, "sent", message)
    await contract.methods.setMessage(message).send({
      from: account
      },
      () => {
        console.log('finished!!!!!');
      } // call back
    ).on('transactionHash', (hash) => {
      console.log('------------transactionHash-----------')
      console.log('hash: ', hash)
      console.log('--------------------------------------')
    }).on('confirmation', (confirmationNumber, receipt) => {
      console.log('-----------confirmation------------')
      console.log('confirmationNumber:', confirmationNumber)
      console.log('receipt:', receipt)
      console.log('-----------------------------------')
    }).on('receipt', (receipt) => {
      console.log('----------receipt----------')
      console.log(receipt)
      console.log('---------------------------')
    }).on('error', ({code, message, stack}) => {
      setErrorMessage(message)
    });
  }
  return (
    <React.Fragment>
      {!provider && (
        <h1> you do not have metamask, please install metamask and reload this page </h1>
      )}
      {provider && (
        <>
          {errorMessage && (
            <>
              <p>!!!!!!!!!!!!!!!!!!!!!!!!!!</p>
              <p> {errorMessage} </p>
              <p>!!!!!!!!!!!!!!!!!!!!!!!!!!</p>
            </>
          )}
          <h1>Simple Storage</h1>
          <form id="form" onSubmit={sendMessage}>
            <input type='text' id = "message"/>
            <input type='submit' value='送信' />
          </form>
          <h2> 最新の値</h2>
          <p>{ message }</p>
      </>
      )}
    </React.Fragment>
  );
}
export default App;
