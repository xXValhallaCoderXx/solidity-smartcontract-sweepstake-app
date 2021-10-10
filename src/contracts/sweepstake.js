import web3 from "../web-3";
import sweepstakeContract from "./sweepstake-contract.json";

const {abi ,address} = sweepstakeContract;

export default new web3.eth.Contract(abi, address);