const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  // Load the contract address from the file
  const contractAddress = fs.readFileSync("contract-address.txt", "utf-8").trim();

  const V2VCommunication = await hre.ethers.getContractFactory("V2VCommunication");
  const v2vCommunication = await V2VCommunication.attach(contractAddress);

  const messageId = 1;
  const content = "Hello, vehicle communication!";
  
  // Sending a message
  await v2vCommunication.sendMessage(messageId, content);

  console.log("Message sent:", content);

  // Retrieving message count
  const messageCount = await v2vCommunication.getMessageCount(messageId);
  console.log("Message count:", messageCount.toString());

  // Retrieving a specific message
  const messageIndex = 0;
  const [sender, messageContent] = await v2vCommunication.getMessage(messageId, messageIndex);
  console.log("Message details:", "Sender:", sender, "Content:", messageContent);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
