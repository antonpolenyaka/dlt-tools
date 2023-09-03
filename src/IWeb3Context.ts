import IEVMChainData from "./IEVMChainData";
import Web3Wallet from "./Web3Wallet";
import ExternalAPIs from "./apis/ExternalAPIs";

interface IWeb3Context {
  wallet: Web3Wallet;
  extAPIs: ExternalAPIs;
  chainData: IEVMChainData;
}

export default IWeb3Context;