const hre = require("hardhat");

const deploy = async () => {
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transactions deployed to: ", transactions.address);
};

const runDeploy = async () => {
  try{
    await deploy();
    process.exit(0);
  } catch (err){
    console.log(err);
    process.exit(1)
  }
};

runDeploy();