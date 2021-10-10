require("dotenv").config();
const fs = require("fs");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const { abi, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  process.env.WALLET_MNEMONIC,
  `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`
);

const web3 = new Web3(provider);

const deploy = async () => {
  // Lets assume the first account of this wallet is the holder
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
    })
    .send({ gas: "1000000", from: accounts[0] });

  const address = result.options.address;
  console.log("Contract deployed to: ", address);

  // Write contract to JSON for app to consume
  fs.writeFileSync(
    "sweepstake-contract.json",
    JSON.stringify({ address, abi })
  );
};

deploy();
