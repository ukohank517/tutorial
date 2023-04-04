import { ethers } from "ethers"
import { contractABI, contractAddress } from "../utils/connect";

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