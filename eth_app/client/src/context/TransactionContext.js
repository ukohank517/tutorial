import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/connect";

export const TransactionContext = createContext();

// スマートコントラクトを取得
// 参考資料：https://docs.ethers.org/v5/getting-started/
const getSmartContract = () => {
  // metamask
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // 署名　
  const signer = provider.getSigner()

  const transactionContract = new ethers.Contract(contractAddress, contractABI, provider);

  console.log(provider, signer, transactionContract);

  return transactionContract;
};

export const TransactionProvider = ({children}) => {
  const [currentAccount, setCurrentAccount] = useState("");


  // メタマスクウォレットと連携しているかどうかを確認
  const checkMetamaskWalletConnected = async () => {
    if(!window.ethereum) return alert("please install metamask")

    // metamaskのドキュメントに記載されてある
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  };

  // メタマスクウォレットと連携する
  const connectWallet = async () => {
    if(!window.ethereum) return alert("please install metamask")

    // メタマスク持ってれば接続
    // https://docs.metamask.io/guide/getting-started.html#basic-considerations
    // Connecting to Metamask
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    console.log(accounts[0]);
    setCurrentAccount(accounts[0]);
  }

  useEffect(() => {
    checkMetamaskWalletConnected();
  }, []);

  // globalになる
  return <TransactionContext.Provider value={{ connectWallet }}>
    {children}
  </TransactionContext.Provider>
}