import IWeb3Context from './IWeb3Context';
import Web3Wallet from './Web3Wallet';
import ExternalAPIs from './apis/ExternalAPIs';

export default class Web3Context implements IWeb3Context {
    wallet: Web3Wallet;
    extAPIs: ExternalAPIs;

    constructor() {
        this.wallet = new Web3Wallet();
        this.extAPIs = new ExternalAPIs();
    }
}