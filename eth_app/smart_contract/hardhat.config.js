require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "goerli",
  solidity: "0.8.4",
  networks: {
    goerli:{
      url: "<alchemyapiのURL>",
      accounts: [
        "<ETH ウォレットの秘密鍵>"
      ]
    }
  }
};
