import Web3Wallet from "./Web3Wallet";
import ExternalAPIs from "./apis/ExternalAPIs";
export default interface IWeb3Context {
    wallet: Web3Wallet;
    extAPIs: ExternalAPIs;
}
