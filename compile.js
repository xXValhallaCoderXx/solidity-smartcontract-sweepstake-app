const path = require("path");
const fs = require("fs")
const solc = require("solc");

const sweepstakeContract = path.resolve(__dirname, "contracts/Sweepstake.sol");
const source = fs.readFileSync(sweepstakeContract, "utf8");

// We only have 1 contract - Lets export directly
module.exports = solc.compile(source, 1).contracts[":Sweepstake"]