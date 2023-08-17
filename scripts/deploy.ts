import { ethers } from "hardhat";
const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const V2VCommunication = await hre.ethers.getContractFactory("V2VCommunication");
  const v2vCommunication = await V2VCommunication.deploy();

  await v2vCommunication.deployed();

  console.log("V2VCommunication deployed to:", v2vCommunication.address);

  // Save contract address to a file for later use
  const contractAddress = v2vCommunication.address;
  fs.writeFileSync("contract-address.txt", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
