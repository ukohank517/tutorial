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

  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log(provider, signer, transactionContract);

  return transactionContract;
};

export const TransactionProvider = ({children}) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [inputFormData, setInputFormData] = useState({
    addressTo: "",
    amount: "",
  })

  const handleChange = (e, name) => {
    setInputFormData((prevInputFormData) => ({
      ...prevInputFormData,
      // [name]: Main.jsのhtmlに、inputの名前(addressToとamountがある)
      [name]: e.target.value,
    }));
  };


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

  // 実際に通貨のやり取りをする
  const sendTransaction = async () => {
    if(!window.ethereum) return alert("please install metamask")
    console.log("sendTransaction");

    const transactionContract = getSmartContract();
    const parsedAmount = ethers.utils.parseEther(inputFormData.amount);

    // ref: https://docs.metamask.io/guide/sending-transactions.html#example
    const transactionParameters = {
      gas: '0x5208', // 21000 GWEI customizable by user during MetaMask confirmation.
      to: inputFormData.addressTo, // Required except during contract publications.
      from: currentAccount, // must match user's active address.
      value: parsedAmount._hex, // Only required to send ether to the recipient from the initiating external account.
    };

    await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    const transactionHash = await transactionContract.addToBlockChain(
      inputFormData.addressTo,
      parsedAmount
    );
    console.log(`loading... ${transactionHash.hash}`);
    await transactionHash.wait();
    console.log(`送金に成功! ${transactionHash.hash}`);
  };

  useEffect(() => {
    checkMetamaskWalletConnected();
  }, []);

  // globalになる
  return <TransactionContext.Provider value={{ connectWallet, sendTransaction, handleChange, inputFormData }}>
    {children}
  </TransactionContext.Provider>
}