require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const sweepstakeContract = require("./compile");

const provider = new HDWalletProvider(
  process.env.WALLET_MNEMONIC,
  `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`
);

const web3 = new Web3(provider);

const deploy = async () => {
  // Lets assume the first account of this wallet is the holder
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Cotract(
    JSON.parse(sweepstakeContract.interface)
  )
    .deploy({
      data: sweepstakeContract.bytecode,
    })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract Interface: ", sweepstakeContract.interface);
  console.log("Contract deployed to: ", result.options.address);
};
