const path = require("path");
const fs = require("fs");
const solc = require("solc");

const input = {
  language: "Solidity",
  sources: {
    "Sweepstake.sol": {
      content: fs.readFileSync(
        path.resolve(__dirname, "contracts", "Sweepstake.sol"),
        "utf8"
      ),
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const bytecode =
  output.contracts["Sweepstake.sol"]["Sweepstake"].evm.bytecode.object;
const abi = output.contracts["Sweepstake.sol"]["Sweepstake"].abi;

module.exports = { bytecode, abi };
