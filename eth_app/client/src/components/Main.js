import React from 'react'
import { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'

const Main = () => {
  const { connectWallet, sendTransaction, handleChange, inputFormData } = useContext(TransactionContext);

  const handleSubmit = () => {

    if(inputFormData.addressTo === "" || inputFormData.amount === ""){
      return;
    }
    sendTransaction();
  }
  return (
    <div className="mainContainer">
      {/* left */}
      <div className="cryptContainer">
        <h1 className="title">Crypt Card</h1>
        <button className="button">
          <p className="buttonText" onClick={connectWallet}>ウォレット連携</p>
        </button>
      </div>
      {/* right */}
      <div className="inputContainer">
        <input type="text" placeholder="アドレス" name="addressTo" onChange={(e) => handleChange(e, "addressTo")} />
        <input type="number" placeholder="通貨(ETH)" name="amount" step="0.0001" onChange={(e) => handleChange(e, "amount")} />
        <button type="button" onClick={handleSubmit}>送信</button>
      </div>
    </div>
  )
}

export default Main